module.exports = {


  friendlyName: 'Get all admissions',


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

    //get admissions
    let admissions = await PatientAdmission.find().populate('patient_id').populate('hospital_room');

    // All done.
    return exits.success({
      status:true,
      message:'Admissions generated successfully!',
      data:admissions
    });

  }


};
