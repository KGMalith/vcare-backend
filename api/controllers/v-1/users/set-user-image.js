module.exports = {


  friendlyName: 'Set user image',


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
    let user_obj = await User.findOne({id:this.req.user.user_id});

    if(!user_obj){
      return exits.handleError({
        status:false,
        message:'Invalid user id'
      });
    }

    //update user
    await User.updateOne({id:this.req.user.user_id}).set({
      image:inputs.image_fd,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'User image uploaded successfully!'
    });
  }
};

