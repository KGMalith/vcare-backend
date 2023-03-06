module.exports = {


  friendlyName: 'Get profile',


  description: '',


  inputs: {

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
  //check current user id exists
    let user = Doctor.findOne({id:this.req.user.user_id});

    if(!user){
      return exits.otherError({
        status:false,
        message:'Invalid request!'
      });
    }

    //get doctor appointments
    let appointments = await PatientAppointment.find({doctor_id:this.req.user.user_id}).populate('patient_id');

    //get doctor admissions
    let admissions = await PatientAdmissionDoctor.find({doctor_id:this.req.user.user_id}).populate('admission_id');

    for(let admission of admissions){
      let patient = await Patient.findOne({id:admission.admission_id.patient_id});
      admission.patient = patient;
    }

    //return object
    let data_set = {
      doctor:user,
      appointments:appointments,
      admissions:admissions
    };

    return exits.success({
      status:true,
      message:'User data generated successfully',
      data:data_set
    });

  }
};
