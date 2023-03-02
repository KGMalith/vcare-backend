module.exports = {


  friendlyName: 'Update profile',


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

    //check email already exists
    var user = await User.findOne({
      id:inputs.id
    });

    if(!user){
      return exits.notFound({
        status:false,
        message:'Invalid user id!'
      });
    }

    //update user
    await User.updateOne({id:inputs.id}).set({
      first_name:inputs.first_name,
      last_name:inputs.last_name
    });

    // All done.
    return exits.success({
      status:true,
      message:'Profile updated successfully!'
    });

  }

};
