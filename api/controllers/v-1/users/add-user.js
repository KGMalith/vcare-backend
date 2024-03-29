/* eslint-disable no-redeclare */
module.exports = {


  friendlyName: 'Add user',


  description: '',


  inputs: {
    first_name:{
      type:'string',
      required:true
    },
    last_name:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true
    },
    role_id:{
      type:'number',
      required:true
    },
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

    //check email already exists
    var user_obj = await User.findOne({
      email:inputs.email
    });

    var doctor_obj = await Doctor.findOne({ email:inputs.email});

    var patient_obj = await Patient.findOne({ email:inputs.email});

    if(user_obj || doctor_obj || patient_obj){
      return exits.handleError({
        status:false,
        message:'Email already exists!'
      });
    }

    //check id is valied
    let role_obj = await Role.findOne({id:inputs.role_id});

    if(!role_obj){
      return exits.handleError({
        status:false,
        message:'Invalid role id!'
      });
    }

    //generate user code
    let user_code = await sails.helpers.other.generateId('USR');

    //create user
    var user_obj = await User.create({
      user_code:user_code,
      first_name:inputs.first_name,
      last_name:inputs.last_name,
      email:inputs.email,
      role_id:inputs.role_id,
    }).fetch();

    let hash_code = await sails.helpers.other.encrypt(user_obj.id);
    let hash_code_expire = sails.moment().utc().add(24,'h').format('YYYY-MM-DD HH:mm:ss');

    //update user
    await User.updateOne({id:user_obj.id}).set({
      hash_code:hash_code,
      hash_code_expire:hash_code_expire
    });

    //send email
    let params = {
      USER_NAME:inputs.first_name+' '+inputs.last_name,
      ROLE:role_obj.role_name,
      LINK:`${sails.config.custom.frontend_base_url}user/invitation?code=${hash_code}`
    };

    let respond = await sails.helpers.email.sendEmail.with({
      receiver_email:inputs.email,
      receiver_name:inputs.first_name+' '+inputs.last_name,
      template_id:sails.config.custom.user_signup_invitation,
      params:params
    });

    if(respond.status){
      //update user as email sent
      await User.updateOne({id:user_obj.id}).set({
        is_invitation_sent:sails.config.custom.user_invitation_sent,
      });
    }

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'User added to system successfully!'
    });

  }


};
