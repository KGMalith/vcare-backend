/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update room status',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    status:{
      type:'number',
      required:true
    }
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

    //check status is valid
    if(inputs.status != sails.config.custom.hospital_room_available && inputs.status != sails.config.custom.hospital_room_taken && inputs.status != sails.config.custom.hospital_room_cleaning && inputs.status != sails.config.custom.hospital_room_closed_for_maintenance && inputs.status != sails.config.custom.hospital_room_waiting_for_cleaning){
      return exits.handleError({
        status:false,
        message:'Invalid status!'
      });
    }

    //check already updated
    if(room_obj.room_status == inputs.status){
      return exits.handleError({
        status:false,
        message:'Status already updated!'
      });
    }

    //check room is assigned for admission and patient not discharged
    let admissionObj = await PatientAdmission.findOne({hospital_room:room_obj.id,status:sails.config.custom.admission_active});
    if(admissionObj){
      return exits.handleError({
        status:false,
        message:'Room Status Cannot Update. Room Occupied in admission!'
      });
    }

    //update room status
    await HospitalRoom.updateOne({id:inputs.id}).set({
      room_status:inputs.status
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Status updated successfully!'
    });

  }
};
