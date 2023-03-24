module.exports = {


  friendlyName: 'Get all admissions patient',


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

    //take patient id
    let patient = await Patient.findOne({id:this.req.user.user_id});

    if(!patient){
      return exits.notFound({
        status:false,
        message:'Invalid request!'
      });
    }

    //get admissions
    let admissions = await PatientAdmission.find({patient_id:this.req.user.user_id}).populate('patient_id').populate('hospital_room');

    // All done.
    return exits.success({
      status:true,
      message:'Admissions generated successfully!',
      data:admissions
    });

  }


};
