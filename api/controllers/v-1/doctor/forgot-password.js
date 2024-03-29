module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {
    email:{
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
    //check email is valid
    let user_obj = await Doctor.findOne({email:inputs.email});

    if(!user_obj){
      return exits.handleError({
        status:false,
        message:'There is no user associated with given email!'
      });
    }

    //update doctor
    await Doctor.updateOne({id:user_obj.id}).set({
      hash_code:null,
      hash_code_expire:null,
      forgot_password_requested:0
    });

    let hash_code = await sails.helpers.other.encrypt(user_obj.id);
    let hash_code_expire = sails.moment().utc().add(24,'h').format('YYYY-MM-DD HH:mm:ss');

    //update doctor
    await Doctor.updateOne({id:user_obj.id}).set({
      hash_code:hash_code,
      hash_code_expire:hash_code_expire,
    });

    //send email
    let params = {
      EMAIL:user_obj.email,
      LINK:`${sails.config.custom.frontend_base_url}doctor/reset-password?code=${hash_code}`
    };

    let respond = await sails.helpers.email.sendEmail.with({
      receiver_email:user_obj.email,
      receiver_name:user_obj.first_name+' '+user_obj.last_name,
      template_id:sails.config.custom.forgot_password,
      params:params
    });

    if(respond.status){
      //update doctor as email sent
      await Doctor.updateOne({id:user_obj.id}).set({
        forgot_password_requested:1,
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Email validated successfully!'
    });

  }
};
