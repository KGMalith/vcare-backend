module.exports = {


  friendlyName: 'Edit room',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
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

    //check id is valied
    let room_obj = await HospitalRoom.findOne({id:inputs.id});

    if(!room_obj){
      return exits.handleError({
        status:false,
        message:'Invalid room id!'
      });
    }

    //update room
    await HospitalRoom.updateOne({id:inputs.id}).set({
      room_number:inputs.room_number,
      room_desc:inputs.room_desc,
      room_charge:inputs.room_charge,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Room updated successfully!'
    });

  }
};
