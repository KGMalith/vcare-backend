/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Add bill services',


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
    otherError:{
      responseType: 'HandleError'
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
      return exits.otherError({
        status:false,
        message:'Bill cannot update!'
      });
    }

    //check service already exists
    let service = await HospitalBillService.findOne({hospital_bill_id:inputs.bill_id,hospital_service_id:inputs.service_id});

    if(service){
      return exits.otherError({
        status:false,
        message:'Service already exists!'
      });
    }

    //check service is active
    let hospital_service = await HospitalService.findOne({id:inputs.service_id});

    if(hospital_service.status == 0){
      return exits.otherError({
        status:false,
        message:'Service not active!'
      });
    }

    //add bill service
    await HospitalBillService.create({
      hospital_bill_id:inputs.bill_id,
      hospital_service_id:inputs.service_id
    });


    // All done.
    return exits.success({
      status:true,
      message:'Hospital bill service added successfully!'
    });

  }

};
