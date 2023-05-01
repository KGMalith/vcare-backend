module.exports = {


  friendlyName: 'Get all permissions',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //get all roles
    let permission_list = await Permission.find();

    // All done.
    return exits.success({
      status:true,
      message:'Permissions generated successfully!',
      data:permission_list
    });
  }
};
