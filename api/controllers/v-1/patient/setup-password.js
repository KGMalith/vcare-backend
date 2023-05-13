module.exports = {


  friendlyName: 'Setup password',


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
    let patient_id = await sails.helpers.other.decrypt(inputs.token);

    //get patient object
    let patient = await Patient.findOne({id:patient_id, is_signup_completed:sails.config.custom.patient_signup_incomplete});
    if(!patient){
      return exits.handleError({
        status:false,
        message:'Invalid token!'
      });
    }

    //get encrypted password
    let encrypted_password = await sails.helpers.auth.encryptPassword(inputs.password);

    //update patient
    await Patient.updateOne({id:patient_id}).set({
      hash_code:null,
      hash_code_expire:null,
      is_signup_completed:sails.config.custom.patient_signup_complete,
      password:encrypted_password,
      forgot_password_requested:0,
    });

    // All done.
    return exits.success({
      status:true,
      message:'Account setup successfully!'
    });

  }

};
