/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'View bill',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError: {
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
    //check bill
    let bill = await HospitalBill.findOne({ id: inputs.id });

    if (!bill) {
      return exits.handleError({
        status: false,
        message: 'Invalid bill Id!'
      });
    }

    //get bill services
    let billServicesList = await HospitalBillService.find({hospital_bill_id:bill.id}).populate('hospital_service_id');

    let serviceList = billServicesList.map((obj)=>{
      return obj.hospital_service_id;
    });

    let returnObj = {
      bill:bill,
      services:serviceList
    };

    // All done.
    return exits.success({
      status:true,
      data:returnObj,
      message:'Hospital bill view successfully!'
    });

  }


};
