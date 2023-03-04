module.exports = {


  friendlyName: 'Get all rooms',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    //get all rooms
    let room_list = await HospitalRoom.find();

    // All done.
    return exits.success({
      status:true,
      message:'Rooms generated successfully!',
      data:room_list,
    });

  }
};
