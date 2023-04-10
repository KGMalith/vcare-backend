/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Validate token',


  description: '',


  inputs: {
    token:{
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
    var doctors_id_list = await sails.sendNativeQuery(doctors_sql);
    doctors_id_list = doctors_id_list.rows;

    if(doctors_id_list.length > 0){
      for(let doctor_id of doctors_id_list){
        const doctor_update_sql = `UPDATE doctors t1 SET t1.hash_code = NULL, t1.hash_code_expire = NULL WHERE t1.id = ${doctor_id.id}`;
        await sails.sendNativeQuery(doctor_update_sql);
      }
    }

    //get doctor object
    let doctor = await Doctor.findOne({id:doctor_id,is_signup_completed:0});
    if(!doctor){
      return exits.notFound({
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

    if(doctor.is_email_confirmation_sent == 1 && !doctor.hash_code){
      return exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    //update doctor
    let doctor_new_obj =  await Doctor.updateOne({id:doctor_id}).set({
      hash_code:null,
      hash_code_expire:null,
      is_signup_completed:1,
    });

    //send email
    let params = {
      USER_NAME:doctor_new_obj.first_name+' '+doctor_new_obj.last_name,
      ROLE_FUNCTIONS:'appointments arrangements, check assigned patients admissions & appointments etc.',
      LINK:`${sails.config.custom.frontend_base_url}signin-doctor`
    };

    await sails.helpers.email.sendEmail.with({
      receiver_email:doctor_new_obj.email,
      receiver_name:doctor_new_obj.first_name+' '+doctor_new_obj.last_name,
      template_id:sails.config.custom.welcome,
      params:params
    });

    // All done.
    return exits.success({
      status:true,
      message:'Email validated successfully!'
    });
  }
};
