module.exports = {


  friendlyName: 'Get admission details',


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

    //get appointments
    let admission = await PatientAdmission.find({id:inputs.id}).populate('hospital_room').populate('patient_id');

    let doctors = await PatientAdmissionDoctor.find({admission_id:inputs.id}).populate('doctor_id');

    let bill = await HospitalBill.findOne({patient_admission:inputs.id});

    admission.doctors = doctors;
    admission.bill = bill;

    // All done.
    return exits.success({
      status:true,
      message:'Admission generated successfully!',
      data:admission
    });

  }


};
