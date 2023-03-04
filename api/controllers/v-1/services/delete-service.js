module.exports = {


  friendlyName: 'Delete service',


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

    //check service assigned to bill. if assigned return error
    let bill_service_list = await HospitalBillService.find({
      hospital_service_id:inputs.id
    });

    if(bill_service_list.length > 0){
      return exits.otherError({
        status:false,
        message:'Service cannot be delete!. Current service used for billing'
      });
    }

    //delete service
    await HospitalBillService.destroyOne({
      id:inputs.id
    });

    // All done.
    return exits.success({
      status:true,
      message:'Hospital service deleted successfully!'
    });

  }
};
