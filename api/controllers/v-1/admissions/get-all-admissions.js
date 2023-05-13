module.exports = {


  friendlyName: 'Get all admissions',


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


  fn: async function (inputs, exits) {

    //get admissions
    let admissions = await PatientAdmission.find().populate('patient_id').populate('hospital_room');

    //get doctors list
    for (let admission of admissions) {
      let doctorsList = await PatientAdmissionDoctor.find({ select: ['doctor_id'], where: { admission_id: admission.id } });

      let newDoctors = [];
      for (let doctor of doctorsList) {
        let doctorObj = await Doctor.findOne({ select: ['doctor_code', 'email', 'first_name', 'id', 'image', 'last_name', 'mobile'], where: { id: doctor.doctor_id } });
        newDoctors.push(doctorObj);
      }
      admission.doctors = newDoctors;

      if (admission.patient_id.image) {
        let respond = await sails.helpers.s3.getObject.with({
          bucket: sails.config.custom.s3_bucket,
          file_name: admission.patient_id.image,
          is_expire: true
        });
        admission.patient_id.image= respond.data;
      }
    }

    // All done.
    return exits.success({
      status: true,
      message: 'Admissions generated successfully!',
      data: admissions
    });

  }


};
