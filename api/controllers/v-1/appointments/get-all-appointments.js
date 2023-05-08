module.exports = {


  friendlyName: 'Get all appointments',


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

    //get appointments
    let appointments = await PatientAppointment.find().populate('patient_id').populate('doctor_id');

    for(let appointment of appointments){
      if(appointment.patient_id.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:appointment.patient_id.image,
          is_expire:true
        });
        appointment.patient_id.image = respond.data;
      }
      if(appointment.doctor_id.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:appointment.doctor_id.image,
          is_expire:true
        });
        appointment.doctor_id.image = respond.data;
      }
    }

    // All done.
    return exits.success({
      status:true,
      message:'Appointments generated successfully!',
      data:appointments
    });

  }


};
