/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Sigin in',


  description: '',


  inputs: {
    email:{
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
    const jwt = require('jsonwebtoken');

    //check email is valid
    let user_obj = await User.findOne({email:inputs.email});

    if(!user_obj){
      return exits.notFound({
        status:false,
        message:'Invalid email or password!'
      });
    }

    if(user_obj.is_signup_completed == 0){
      return exits.otherError({
        status:false,
        message:'Signup not completed! Please find email in your inbox to continue signup'
      });
    }

    if(user_obj.status == sails.config.custom.user_deactivated){
      return exits.otherError({
        status:false,
        message:'Admin deactivated your account!'
      });
    }

    if(user_obj.is_password_reset_requested == 1 && user_obj.hash_code){
      return exits.otherError({
        status:false,
        message:'Admin reset your password! Please check inbox to proceed'
      });
    }

    let password_matched = await sails.helpers.auth.comparePassword(inputs.password,user_obj.password);

    if(!password_matched){
      return exits.otherError({
        status:false,
        message:'Invalid email or password!'
      });
    }

    //get all permissions related to role
    let permissions = await RolePermission.find({select:['permission_id'],where:{role_id:user_obj.role_id,is_active:sails.config.custom.role_permission_active}});

    const token_body = {
      user_email:user_obj.email,
      user_role:user_obj.role_id,
      user_id:user_obj.id,
      permissions:permissions
    };

    //generate jwt token
    const json_token = jwt.sign({result:token_body},sails.config.custom.jwt_secret);

    const data = {
      user_name:user_obj.first_name +' '+user_obj.last_name,
      user_email:user_obj.email,
      user_role:user_obj.role_id,
      token:json_token
    };

    // All done.
    return exits.success({
      status:true,
      message:'User signin successfully!',
      data:data
    });

  }
};
