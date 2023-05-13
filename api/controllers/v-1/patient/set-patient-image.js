module.exports = {


  friendlyName: 'Set patient image',


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
    let patient_obj = await Patient.findOne({id:this.req.user.user_id});

    if(!patient_obj){
      return exits.handleError({
        status:false,
        message:'Invalid patient id'
      });
    }

    //update user
    await Patient.updateOne({id:this.req.user.user_id}).set({
      image:inputs.image_fd,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Patient image uploaded successfully!'
    });
  }
};

