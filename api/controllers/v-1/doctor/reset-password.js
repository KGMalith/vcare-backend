/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    token:{
      type:'string',
      required:true
    },
    password:{
      type:'string',
      required:true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
    //decrypt token
    let doctor_id = await sails.helpers.other.decrypt(inputs.token);

    //expire all tokens which are less than current time
    let current_timestamp = sails.moment().utc().format('YYYY-MM-DD HH:mm:ss');

    const doctors_sql = `SELECT t1.id FROM doctors t1 WHERE t1.hash_code_expire < '${current_timestamp}'`;
    var doctor_id_list = await sails.sendNativeQuery(doctors_sql);
    doctor_id_list = doctor_id_list.rows;

    if(doctor_id_list.length > 0){
      for(let doctor_id of doctor_id_list){
        const doctor_update_sql = `UPDATE doctors t1 SET t1.hash_code = NULL, t1.hash_code_expire = NULL WHERE t1.id = ${doctor_id.id}`;
        await sails.sendNativeQuery(doctor_update_sql);
      }
    }

    //get doctor object
    let doctor = await Doctor.findOne({id:doctor_id,forgot_password_requested:1});
    if(!doctor){
      return exits.handleError({
        status:false,
        message:'Invalid token!'
      });
    }

    if(doctor.hash_code && doctor.hash_code_expire  < current_timestamp){
      return exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    if(doctor.forgot_password_requested == 1 && !doctor.hash_code){
      return exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    //get encrypted password
    let encrypted_password = await sails.helpers.auth.encryptPassword(inputs.password);

    //update doctor
    await Doctor.updateOne({id:doctor_id}).set({
      hash_code:null,
      hash_code_expire:null,
      forgot_password_requested:0,
      password:encrypted_password
    });

    // All done.
    return exits.success({
      status:true,
      message:'Password reset successfully!'
    });

  }
};
