module.exports = {


  friendlyName: 'Dashboard',


  description: '',


  inputs: {},


  exits: {

  },


  fn: async function (inputs,exits) {
    let patientCount = await Patient.count();
    let doctorsCount = await Doctor.count();
    let admissionsCount = await PatientAdmission.count();
    let appointmentCount = await PatientAppointment.count();

    let counts = {
      patientCount:patientCount,
      doctorsCount:doctorsCount,
      admissionsCount:admissionsCount,
      appointmentCount:appointmentCount
    };

    // All done.
    return exits.success({
      status:true,
      data:counts,
      message:'Dashboard data generated successfully!',
    });

  }
};
