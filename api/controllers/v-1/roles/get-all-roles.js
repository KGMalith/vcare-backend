module.exports = {


  friendlyName: 'Get all roles',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //get all roles
    let roles_list = await Role.find();

    // All done.
    return exits.success({
      status:true,
      message:'Roles generated successfully!',
      data:roles_list
    });
  }
};
