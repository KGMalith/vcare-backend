module.exports = {


  friendlyName: 'Add admission',


  description: '',


  inputs: {
    patient_id:{
      type:'number',
      required:true
    },
    admit_date:{
      type:'ref',
      required:true
    },
    doctors:{
      type:'ref',
      required:true
    },
    room_id:{
      type:'number',
      required:true
    }
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
    let patient = await Patient.findOne({id:inputs.patient_id});

    if(!patient){
      return exits.notFound({
        status:false,
        message:'Invalid patient Id!'
      });
    }

    //check doctors id are valid
    for(let doctor of inputs.doctors){
      let doctorObj = await Doctor.findOne({id:doctor});

      if(!doctorObj){
        return exits.notFound({
          status:false,
          message:'Invalid doctor Id!'
        });
      }
    }

    //check hospital room available
    let room = await HospitalRoom.findOne({id:inputs.room_id,room_status:1});

    if(!room){
      return exits.notFound({
        status:false,
        message:'Room not available!'
      });
    }

    //generate Admission Code
    let admission_code = await sails.helpers.other.generateId('AD');

    //convert admit date to utc
    let admit_date = sails.moment.utc(inputs.admit_date).format('YYYY-MM-DD HH:mm:ss');

    //create admission
    let admission = await PatientAdmission.create({
      admission_code:admission_code,
      admit_date:admit_date,
      hospital_room:inputs.room_id,
      patient_id:inputs.patient_id,
    }).fetch();

    //update room status
    await HospitalRoom.updateOne({id:inputs.room_id}).set({
      room_status:10
    });

    //assign doctors
    for(let doctor of inputs.doctors){
      await PatientAdmissionDoctor.create({
        admission_id:admission.id,
        doctor_id:doctor
      });
    }


    //create bill object
    let bill_code = await sails.helpers.other.generateId('BILL');

    let bill  = await HospitalBill.create({
      bill_code:bill_code,
      patient_admission:admission.id
    }).fetch();

    //check hospital services apply to every bill
    let services = await HospitalService.find({is_apply_to_every_admission:1});

    //create hospital bill services
    if(services.length > 0){
      for(let service of services){
        await HospitalBillService.create({
          hospital_bill_id:bill.id,
          hospital_service_id:service.id
        });
      }
    }

    // All done.
    return exits.success({
      status:true,
      message:'Admission created successfully!'
    });

  }
};
