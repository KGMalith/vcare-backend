module.exports = {


  friendlyName: 'Set doctor image',


  description: '',


  inputs: {
    image_fd:{
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

    //check id is valid
    let doctor_obj = await Doctor.findOne({id:this.req.user.user_id});

    if(!doctor_obj){
      return exits.handleError({
        status:false,
        message:'Invalid doctor id'
      });
    }

    //update user
    await Doctor.updateOne({id:this.req.user.user_id}).set({
      image:inputs.image_fd,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Doctor image uploaded successfully!'
    });
  }
};

