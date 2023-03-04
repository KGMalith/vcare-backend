module.exports = {


  friendlyName: 'Get service details',


  description: '',


  inputs: {
    id:{
      type:'number',
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
    //check id is valied
    let service_obj = await HospitalService.findOne({id:inputs.id});

    if(!service_obj){
      return exits.notFound({
        status:false,
        message:'Invalid service id!'
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Service details generated successfully!',
      data:service_obj
    });

  }
};
