module.exports = {


  friendlyName: 'Get all users',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    //get all users
    let users_list = await User.find();

    // All done.
    return exits.success({
      status:true,
      message:'Users generated successfully!',
      data:users_list
    });
  }

};
