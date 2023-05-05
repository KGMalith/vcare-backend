/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update admission',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    doctors: {
      type: 'ref',
      required: true
    },
    room_id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError: {
      responseType: 'handleError'
    }
  },


  fn: async function (inputs, exits) {

    let admission = PatientAdmission.findOne({ id: inputs.id });
    if (!admission) {
      return exits.handleError({
        status: false,
        message: 'Invalid admission Id!'
      });
    }

    if (admission.hospital_room != inputs.room_id) {
      //check hospital room available
      let room = await HospitalRoom.findOne({ id: inputs.room_id, room_status: 1 });

      if (!room) {
        return exits.handleError({
          status: false,
          message: 'Room not available!'
        });
      }

      //update previous room status
      await HospitalRoom.updateOne({ id: admission.hospital_room }).set({
        room_status: 20
      });

      //update room
      await PatientAdmission.updateOne({ id: inputs.id }).set({
        hospital_room: inputs.room_id
      });


      //update new room status
      await HospitalRoom.updateOne({ id: inputs.room_id }).set({
        room_status: 10
      });
    }

    //delete doctors and add new records
    await PatientAdmissionDoctor.destroy({ admission_id: inputs.id });

    //assign doctors
    for (let doctor of inputs.doctors) {
      await PatientAdmissionDoctor.create({
        admission_id: inputs.id,
        doctor_id: doctor
      });
    }

    // All done.
    return exits.success({
      status: true,
      message: 'Patient admission updated successfully!'
    });

  }
};
