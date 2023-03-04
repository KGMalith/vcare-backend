module.exports = {


  friendlyName: 'Get all services',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    //service list
    let service_list = await HospitalService.find();

    // All done.
    return exits.success({
      status:true,
      message:'Hospital service generated successfully!',
      data:service_list
    });

  }
};
