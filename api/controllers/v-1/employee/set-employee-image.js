module.exports = {


  friendlyName: 'Set employee image',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
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
    let employee_obj = await Employee.findOne({id:inputs.id});

    if(!employee_obj){
      return exits.handleError({
        status:false,
        message:'Invalid employee id'
      });
    }

    //update user
    await Employee.updateOne({id:inputs.id}).set({
      image:inputs.image_fd,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Employee image uploaded successfully!'
    });
  }
};

