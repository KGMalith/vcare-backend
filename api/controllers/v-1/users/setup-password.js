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
    let user_id = await sails.helpers.other.decrypt(inputs.token);

    //get user object
    let user = await User.findOne({id:user_id, is_signup_completed:sails.config.custom.user_signup_incomplete});
    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid token!'
      });
    }

    //get encrypted password
    let encrypted_password = await sails.helpers.auth.encryptPassword(inputs.password);

    //update user
    await User.updateOne({id:user_id}).set({
      hash_code:null,
      hash_code_expire:null,
      is_signup_completed:sails.config.custom.user_signup_complete,
      password:encrypted_password,
      is_password_reset_requested:sails.config.custom.user_password_reset_request_inactive,
      status:sails.config.custom.user_active,
    });

    // All done.
    return exits.success({
      status:true,
      message:'Account setup successfully!'
    });

  }

};
