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
    let admission = await PatientAdmission.findOne({id:inputs.id}).populate('hospital_room').populate('patient_id');

    let doctorsList = await PatientAdmissionDoctor.find({select:['doctor_id'],where:{admission_id:inputs.id}});

    let newDoctors = [];
    for(let doctor of doctorsList){
      let doctorObj = await Doctor.findOne({select:['doctor_code','email','first_name','id','image','last_name','mobile'],where:{id:doctor.doctor_id}});
      newDoctors.push(doctorObj);
    }

    let bill = await HospitalBill.findOne({patient_admission:inputs.id});

    admission.doctors = newDoctors;
    admission.bill = bill;

    // All done.
    return exits.success({
      status:true,
      message:'Admission generated successfully!',
      data:admission
    });

  }


};
