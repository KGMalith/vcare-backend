module.exports = {


  friendlyName: 'Get all patients',


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

    let patients = await Patient.find({select:['patient_code','email','first_name','image','last_name','mobile']});

    for(let patient of patients){
      if(patient.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:patient.image,
          is_expire:true
        });
        patient.image = respond.data;
      }
    }

    return exits.success({
      status:true,
      message:'Patients data generated successfully',
      data:patients
    });

  }


};

