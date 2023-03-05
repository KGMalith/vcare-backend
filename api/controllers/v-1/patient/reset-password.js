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
    otherError:{
      responseType: 'HandleError'
    }
  },


  fn: async function (inputs,exits) {
    //decrypt token
    let patient_id = await sails.helpers.other.decrypt(inputs.token);

    //expire all tokens which are less than current time
    let current_timestamp = sails.moment().utc().format('YYYY-MM-DD HH:mm:ss');

    const patients_sql = `SELECT t1.id FROM patients t1 WHERE t1.hash_code_expire < ${current_timestamp}`;
    var patient_id_list = await sails.sendNativeQuery(patients_sql);
    patient_id_list = patient_id_list.rows;

    if(patient_id_list.length > 0){
      for(let patient_id of patient_id_list){
        const patient_update_sql = `UPDATE TABLE patients t1 SET t1.hash_code = NULL,hash_code_expire = NULL WHERE t1.id = ${patient_id}`;
        await sails.sendNativeQuery(patient_update_sql);
      }
    }

    //get patient object
    let patient = await Patient.findOne({id:patient_id,forgot_password_requested:1});
    if(!patient){
      exits.notFound({
        status:false,
        message:'Invalid token!'
      });
    }

    if(patient.hash_code && patient.hash_code_expire  < current_timestamp){
      exits.otherError({
        status:false,
        message:'Token expired!'
      });
    }

    //get encrypted password
    let encrypted_password = await sails.helpers.auth.encryptPassword(inputs.password);

    //update patient
    await Patient.updateOne({id:patient_id}).set({
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
