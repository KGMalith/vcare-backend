/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Delete bill services',


  description: '',


  inputs: {
    service_id:{
      type:'number',
      required:true
    },
    bill_id:{
      type:'number',
      required:true
    }
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

    //check bill
    let bill = await HospitalBill.findOne({id:inputs.bill_id});

    if(!bill){
      return exits.notFound({
        status:false,
        message:'Invalid bill Id!'
      });
    }

    if(bill.status != 0){
      return exits.handleError({
        status:false,
        message:'Bill cannot update!'
      });
    }

    //check service already exists
    let service = await HospitalBillService.findOne({hospital_bill_id:inputs.bill_id,hospital_service_id:inputs.service_id});

    if(!service){
      return exits.handleError({
        status:false,
        message:'Service not exists!'
      });
    }

    //delete service
    await HospitalBillService.destroyOne({hospital_bill_id:inputs.bill_id,hospital_service_id:inputs.service_id});

    // All done.
    return exits.success({
      status:true,
      message:'Hospital bill service deleted successfully!'
    });

  }


};
