/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Get all bills',


  description: '',


  inputs: {
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
    let bill = await HospitalBill.find();

    if (!bill) {
      return exits.handleError({
        status: false,
        message: 'Invalid bill Id!'
      });
    }

    // All done.
    return exits.success({
      status:true,
      data:bill,
      message:'Hospital bills generated successfully!'
    });

  }

};
