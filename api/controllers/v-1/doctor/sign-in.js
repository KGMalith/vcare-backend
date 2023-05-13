/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Sign in',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError: {
      responseType: 'handleError'
    }
  },


  fn: async function (inputs, exits) {
    const jwt = require('jsonwebtoken');

    //check email is valid
    let user_obj = await Doctor.findOne({ email: inputs.email });

    if (!user_obj) {
      return exits.handleError({
        status: false,
        message: 'Invalid email or password!'
      });
    }

    if (user_obj.is_signup_completed == 0 && user_obj.is_email_confirmation_sent == 1) {
      return exits.handleError({
        status: false,
        message: 'Signup not completed! Please find email in your inbox to continue signup'
      });
    }

    let password_matched = await sails.helpers.auth.comparePassword(user_obj.password, inputs.password);

    if (!password_matched) {
      return exits.handleError({
        status: false,
        message: 'Invalid email or password!'
      });
    }

    //get all permissions related to role
    let permissions = await RolePermission.find({ select: ['permission_id'], where: { role_id: user_obj.role_id, is_active: sails.config.custom.role_permission_active } });

    let permissionArray = permissions.map((obj)=>{
      return obj.permission_id;
    });

    const token_body = {
      user_email: user_obj.email,
      user_role: user_obj.role_id,
      user_id: user_obj.id,
      permissions: permissionArray,
    };

    //generate jwt token
    const json_token = jwt.sign({ result: token_body }, sails.config.custom.jwt_secret);

    //get timezone
    let timezone = await Settings.findOne({type:'TimeZone'});

    const data = {
      user_name: user_obj.first_name + ' ' + user_obj.last_name,
      user_email: user_obj.email,
      user_role: user_obj.role_id,
      permissions: permissionArray,
      timezone:timezone ? timezone.value : null,
      token: json_token
    };

    // All done.
    return exits.success({
      status: true,
      message: 'User signin successfully!',
      data: data
    });

  }

};
