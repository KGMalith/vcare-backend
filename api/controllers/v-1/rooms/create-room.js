module.exports = {


  friendlyName: 'Create room',


  description: '',


  inputs: {
    room_number:{
      type:'string',
      required:true
    },
    room_desc:{
      type:'string',
      allowNull:true
    },
    room_charge:{
      type:'string',
      required:true
    },
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

    //check room number exists
    let room = await HospitalRoom.findOne({room_number:inputs.room_number});

    if(room){
      return exits.handleError({
        status:false,
        message:'Room already exists!'
      });
    }

    //create room
    await HospitalRoom.create({
      room_number:inputs.room_number,
      room_desc:inputs.room_desc,
      room_charge:inputs.room_charge,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Room created successfully!'
    });

  }

};
