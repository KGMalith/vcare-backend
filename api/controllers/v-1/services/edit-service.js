module.exports = {


  friendlyName: 'Edit service',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    service_desc:{
      type:'string',
      required:true
    },
    service_charge:{
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

    //update service
    await HospitalService.updateOne({id:inputs.id}).set({
      service_desc:inputs.service_desc,
      service_charge:inputs.service_charge
    });

    // All done.
    return exits.success({
      status:true,
      message:'Hospital service updated successfully!'
    });

  }
};
