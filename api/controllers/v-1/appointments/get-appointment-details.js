module.exports = {


  friendlyName: 'Get appointment details',


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

    //get appointments
    let appointment = await PatientAppointment.find({id:inputs.id}).populate('patient_id').populate('doctor_id');

    // All done.
    return exits.success({
      status:true,
      message:'Appointments generated successfully!',
      data:appointment
    });

  }
};
