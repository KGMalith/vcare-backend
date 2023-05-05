module.exports = {


  friendlyName: 'Update user',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
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

    //check user already exists
    var user = await User.findOne({
      id:inputs.id
    });

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid user id!'
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

    //check new email already taken
    let user_obj = await User.findOne({email:inputs.email, id: { '!=': inputs.id }});

    var doctor_obj = await Doctor.findOne({ email:inputs.email});

    var patient_obj = await Patient.findOne({ email:inputs.email});

    if(user_obj || doctor_obj || patient_obj){
      return exits.handleError({
        status:false,
        message:'Email already taken!'
      });
    }

    //update user
    await User.updateOne({id:inputs.id}).set({
      first_name:inputs.first_name,
      last_name:inputs.last_name,
      role_id:inputs.role_id,
      email:inputs.email
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'User updated successfully!'
    });

  }

};
