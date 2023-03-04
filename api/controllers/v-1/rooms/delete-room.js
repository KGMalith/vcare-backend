module.exports = {


  friendlyName: 'Delete room',


  description: '',


  inputs: {
    id:{
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
    //check id is valied
    let room_obj = await HospitalRoom.findOne({id:inputs.id});

    if(!room_obj){
      return exits.notFound({
        status:false,
        message:'Invalid room id!'
      });
    }

    //check room assigned to admission. if assigned return error
    let admission_list = await PatientAdmission.find({
      hospital_room:inputs.id
    });

    if(admission_list.length > 0){
      return exits.otherError({
        status:false,
        message:'Room cannot be delete!. Current room used for patient admissions'
      });
    }

    //delete room
    await HospitalRoom.destroyOne({
      id:inputs.id
    });

    // All done.
    return exits.success({
      status:true,
      message:'Room deleted successfully!'
    });

  }
};
