module.exports = {


  friendlyName: 'Get all appointments patient',


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
    //take patient id
    let patient = await Patient.findOne({id:this.req.user.user_id});

    if(!patient){
      return exits.notFound({
        status:false,
        message:'Invalid request!'
      });
    }


    //get appointments
    let appointments = await PatientAppointment.find({patient_id:this.req.user.user_id}).populate('patient_id').populate('doctor_id');

    // All done.
    return exits.success({
      status:true,
      message:'Appointments generated successfully!',
      data:appointments
    });

  }


};
