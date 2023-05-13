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
    let patient_id = await sails.helpers.other.decrypt(inputs.token);

    //expire all tokens which are less than current time
    let current_timestamp = sails.moment().utc().format('YYYY-MM-DD HH:mm:ss');

    const patients_sql = `SELECT t1.id FROM patients t1 WHERE t1.hash_code_expire < '${current_timestamp}'`;
    var patient_id_list = await sails.sendNativeQuery(patients_sql);
    patient_id_list = patient_id_list.rows;

    if(patient_id_list.length > 0){
      for(let patient_id of patient_id_list){
        const patient_update_sql = `UPDATE patients t1 SET t1.hash_code = NULL, t1.hash_code_expire = NULL WHERE t1.id = ${patient_id.id}`;
        await sails.sendNativeQuery(patient_update_sql);
      }
    }

    //get patient object
    let patient = await Patient.findOne({id:patient_id,is_signup_completed:sails.config.custom.patient_signup_incomplete});
    if(!patient){
      return exits.handleError({
        status:false,
        message:'Invalid token!'
      });
    }

    if(patient.hash_code && patient.hash_code_expire  < current_timestamp){
      return exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    if(patient.is_invitation_sent == sails.config.custom.patient_invitation_sent && !patient.hash_code){
      return exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Token validated successfully!'
    });

  }

};
