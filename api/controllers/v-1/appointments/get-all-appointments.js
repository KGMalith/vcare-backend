module.exports = {


  friendlyName: 'Get all appointments',


  description: '',


  inputs: {

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

    //get appointments
    let appointments = await PatientAppointment.find().populate('patient_id').populate('doctor_id');

    // All done.
    return exits.success({
      status:true,
      message:'Appointments generated successfully!',
      data:appointments
    });

  }


};
