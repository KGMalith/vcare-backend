module.exports = {


  friendlyName: 'Get all doctors',


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

    let doctors = await Doctor.find({select:['doctor_code','email','first_name','image','last_name','mobile']});

    for(let doctor of doctors){
      if(doctor.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:doctor.image,
          is_expire:true
        });
        doctor.image = respond.data;
      }
    }

    return exits.success({
      status:true,
      message:'Doctors data generated successfully',
      data:doctors
    });

  }


};


