module.exports = {


  friendlyName: 'Get profile',


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
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
  //check current user id exists
    let user = await Doctor.findOne({select:['id','doctor_code','first_name','last_name','nic','image','email','mobile'],where:{id:inputs.id}});

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid request!'
      });
    }

    //get doctor appointments
    let appointments = await PatientAppointment.find({doctor_id:inputs.id}).populate('patient_id');

    //get doctor admissions
    let admissions = await PatientAdmissionDoctor.find({doctor_id:inputs.id}).populate('admission_id');

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
