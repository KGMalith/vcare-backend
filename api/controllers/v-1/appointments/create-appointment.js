/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Create appointment',


  description: '',


  inputs: {
    appointment_date:{
      type:'ref',
      required:true
    },
    doctor_id:{
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
    //take patient id
    let patient = await Patient.findOne({id:this.req.user.user_id});

    if(!patient){
      return exits.notFound({
        status:false,
        message:'Invalid request!'
      });
    }

    let doctor = await Doctor.findOne({id:inputs.doctor_id});

    if(!doctor){
      return exits.notFound({
        status:false,
        message:'Invalid doctor Id!'
      });
    }

    //get settings
    let time_zone = null;
    let respond = await sails.helpers.other.getTimezone();
    if(respond.status){
      time_zone = respond.data;
    }else{
      return exits.notFound({
        status:false,
        message:'Please setup default timezone!'
      });
    }

    //generate Appointment Code
    let appointment_code = await sails.helpers.other.generateId('AP');

    //convert time to utc
    let start_time = sails.moment.utc(inputs.appointment_date).format('YYYY-MM-DD HH:mm:ss');

    let end_time = sails.moment.utc(inputs.appointment_date).add(1,'h').format('YYYY-MM-DD HH:mm:ss');

    //check appointment exists for doctor in time range
    let appointment_check_doctor_sql = `SELECT t1.* FROM patient_appointment t1 WHERE (t1.appointment_start_date BETWEEN ${start_time} AND ${end_time}) OR (t1.appointment_end_date BETWEEN ${start_time} AND ${end_time}) AND t1.doctor_id = ${inputs.doctor_id} AND t1.status = 1`;
    var appointment_check_doctor = sails.sendNativeQuery(appointment_check_doctor_sql);
    appointment_check_doctor = appointment_check_doctor.rows;

    if(appointment_check_doctor.length > 0){
      return exits.handleError({
        status:false,
        message:'Appointment exists for doctor in selected date & time!'
      });
    }

    //check appointment exists for patient in time range
    let appointment_check_patient_sql = `SELECT t1.* FROM patient_appointment t1 WHERE (t1.appointment_start_date BETWEEN ${start_time} AND ${end_time}) OR (t1.appointment_end_date BETWEEN ${start_time} AND ${end_time}) AND t1.patient_id = ${patient.id} AND t1.status = 1`;
    var appointment_check_patient = sails.sendNativeQuery(appointment_check_patient_sql);
    appointment_check_patient = appointment_check_patient.rows;

    if(appointment_check_patient.length > 0){
      return exits.handleError({
        status:false,
        message:'Appointment exists for patient in selected date & time!'
      });
    }

    //create appointment
    let appointment = await PatientAppointment.create({
      appointment_code:appointment_code,
      appointment_start_date:start_time,
      appointment_end_date:end_time,
      patient_id:patient.id,
      doctor_id:doctor.id
    }).fetch();

    //create bill object
    let bill_code = await sails.helpers.other.generateId('BILL');

    let bill  = await HospitalBill.create({
      bill_code:bill_code,
      patient_appointment:appointment.id
    }).fetch();

    //check hospital services apply to every bill
    let services = await HospitalService.find({is_apply_to_every_appointment:1,status:1});

    //create hospital bill services
    if(services.length > 0){
      for(let service of services){
        await HospitalBillService.create({
          hospital_bill_id:bill.id,
          hospital_service_id:service.id
        });
      }
    }

    //convert to timezone to send email notification
    let converted_start_time = sails.moment_tz.tz(start_time,time_zone).format('YYYY-MM-DD HH:mm A');
    let converted_end_time = sails.moment_tz.tz(end_time,time_zone).format('YYYY-MM-DD HH:mm A');

    let patient_email_obj = {
      USER_NAME:patient.first_name,
      DOCTOR_NAME:doctor.first_name+' '+doctor.last_name,
      APPOINTMENT_START_TIME:converted_start_time,
      APPOINTMENT_END_TIME:converted_end_time,
      TIMEZONE:time_zone
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:patient.email,
      receiver_name:patient.first_name+' '+patient.last_name,
      template_id:sails.config.custom.patient_appointment_confirmed,
      params:patient_email_obj
    });

    let doctor_email_obj = {
      USER_NAME:doctor.first_name,
      PATIENT_NAME:patient.first_name+' '+patient.last_name,
      APPOINTMENT_START_TIME:converted_start_time,
      APPOINTMENT_END_TIME:converted_end_time,
      TIMEZONE:time_zone
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:doctor.email,
      receiver_name:doctor.first_name+' '+doctor.last_name,
      template_id:sails.config.custom.doctor_new_appointment,
      params:doctor_email_obj
    });

    // All done.
    return exits.success({
      status:true,
      message:'Appointment created successfully!'
    });

  }
};
