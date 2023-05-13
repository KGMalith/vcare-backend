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
    let user = await Patient.findOne({id:inputs.id});

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid request!'
      });
    }

    if(user.image){
      let respond = await sails.helpers.s3.getObject.with({
        bucket:sails.config.custom.s3_bucket,
        file_name:user.image,
        is_expire:true
      });
      user.image = respond.data;
    }

    //get patient appointments
    let appointments = await PatientAppointment.find({patient_id:inputs.id}).populate('doctor_id');

    //get patient admissions
    let admissions = await PatientAdmission.find({patient_id:inputs.id}).populate('hospital_room');

    let patientDocuments = await PatientDocument.find({patient_id:inputs.id});

    for(let patientDocument of patientDocuments){
      let respond = await sails.helpers.s3.getObject.with({
        bucket:sails.config.custom.s3_bucket,
        file_name:patientDocument.document_URL,
        is_expire:true
      });
      patientDocument.url = respond.data;
    }

    let patientContacts = await PatientEmergencyContact.find({patient_id:inputs.id});

    user.documents = patientDocuments;
    user.contacts = patientContacts;

    //return object
    let data_set = {
      patient:user,
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
