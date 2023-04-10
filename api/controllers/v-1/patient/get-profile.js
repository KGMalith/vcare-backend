module.exports = {


  friendlyName: 'Get profile',


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

    //check current user id exists
    let user = Patient.findOne({id:this.req.user.user_id});

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid request!'
      });
    }

    //get patient contact
    let patient_contact = await PatientEmergencyContact.find({patient_id:this.req.user.user_id});

    //get patient documents
    let documents = await PatientDocument.find({patient_id:this.req.user.user_id});

    //get patient appointments
    let appointments = await PatientAppointment.find({patient_id:this.req.user.user_id}).populate('doctor_id');

    //get patient admissions
    let admissions = await PatientAdmission.find({patient_id:this.req.user.user_id}).populate('hospital_room');

    //return object
    let data_set = {
      patient:user,
      contact:patient_contact,
      documents:documents,
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
