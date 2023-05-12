/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Get all bills patient',


  description: '',


  inputs: {
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError: {
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
    //bill array 
    let bills = [];

    //get all patient admissions
    let admissionsList = await PatientAdmission.find({select:['id'],where:{patient_id:this.req.user.user_id}});
    let admissionIdList = admissionsList.map((obj)=>{
      return obj.id;
    });

    //get all patient appointments
    let appointmentsList = await PatientAppointment.find({select:['id'],where:{patient_id:this.req.user.user_id}});
    let appointmentIdList = appointmentsList.map((obj)=>{
      return obj.id;
    });

    //loop admissions and appointments and get bills

    for(let admissionId of admissionIdList){
      let billObj = await HospitalBill.findOne({patient_admission:admissionId});
      bills.push(billObj);
    }

    for(let appointmentId of appointmentIdList){
      let billObj = await HospitalBill.findOne({patient_appointment:appointmentId});
      bills.push(billObj);
    }

    //sort array
    bills.sort((a,b)=>a.id - b.id);

    // All done.
    return exits.success({
      status:true,
      data:bills,
      message:'Hospital bills generated successfully!'
    });

  }


};
