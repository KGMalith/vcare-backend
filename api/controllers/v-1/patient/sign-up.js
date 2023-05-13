/* eslint-disable no-redeclare */
module.exports = {


  friendlyName: 'Sign up',


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
    nic:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true
    },
    password:{
      type:'string',
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

    //check email already taken
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

    var patient_obj = await Patient.findOne({ nic:inputs.nic});

    if(patient_obj){
      return exits.handleError({
        status:false,
        message:'Patient NIC already exists!'
      });
    }

    //get encrypted password
    let encrypted_password = await sails.helpers.auth.encryptPassword(inputs.password);

    //generate patient code
    let patient_code = await sails.helpers.other.generateId('PAT');

    //create patient
    var patient_obj = await Patient.create({
      patient_code:patient_code,
      first_name:inputs.first_name,
      last_name:inputs.last_name,
      email:inputs.email,
      password:encrypted_password,
      role_id:sails.config.custom.patient_role_id,
      nic:inputs.nic
    }).fetch();

    let hash_code = await sails.helpers.other.encrypt(patient_obj.id);
    let hash_code_expire = sails.moment().utc().add(24,'h').format('YYYY-MM-DD HH:mm:ss');

    //update patient
    await Patient.updateOne({id:patient_obj.id}).set({
      hash_code:hash_code,
      hash_code_expire:hash_code_expire
    });

    //send email
    let params = {
      USER_NAME:inputs.first_name+' '+inputs.last_name,
      LINK:`${sails.config.custom.frontend_base_url}patient/email-verification?code=${hash_code}`
    };

    let respond = await sails.helpers.email.sendEmail.with({
      receiver_email:inputs.email,
      receiver_name:inputs.first_name+' '+inputs.last_name,
      template_id:sails.config.custom.email_verify,
      params:params
    });

    if(respond.status){
      //update patient as email sent
      await Patient.updateOne({id:patient_obj.id}).set({
        is_email_confirmation_sent:1,
      });
    }

    // All done.
    return exits.success({
      status:true,
      show_message:false,
      message:'Successfully signup to system. You will be receive email to confirm your email address!'
    });

  }


};
