module.exports = {


  friendlyName: 'Cancel appointment patient',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
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

    let appointment = PatientAppointment.findOne({id:inputs.id,patient_id:this.req.user.user_id}).populate('patient_id').populate('doctor_id');
    if(!appointment){
      return exits.handleError({
        status:false,
        message:'Appointment not found!'
      });
    }

    //get settings
    let time_zone = null;
    let respond = await sails.helpers.other.getTimezone();
    if(respond.status){
      time_zone = respond.data;
    }else{
      return exits.handleError({
        status:false,
        message:'Please setup default timezone!'
      });
    }

    //current day utc
    let current_day = sails.moment.utc().format('YYYY-MM-DD HH:mm:ss');

    if(appointment.appointment_start_date < current_day){
      return exits.handleError({
        status:false,
        message:'Past appointments cannot cancelled!'
      });
    }

    //cancel appointment
    await PatientAppointment.updateOne({id:inputs.id,patient_id:this.req.user.user_id}).set({
      status:sails.config.custom.appointment_cancel
    });

    //cancel bill
    await HospitalBill.updateOne({patient_appointment:inputs.id}).set({
      status:-10
    });

    //convert to timezone to send email notification
    let converted_start_time = sails.moment_tz.tz(appointment.appointment_start_date,time_zone).format('YYYY-MM-DD HH:mm A');
    let converted_end_time = sails.moment_tz.tz(appointment.appointment_end_date,time_zone).format('YYYY-MM-DD HH:mm A');

    //send appoinment cancel emails

    let patient_email_obj = {
      USER_NAME:appointment.patient_id.first_name,
      APPOINT_USER:'doctor '+appointment.doctor_id.first_name+' '+appointment.doctor_id.last_name,
      APPOINTMENT_START_TIME:converted_start_time,
      APPOINTMENT_END_TIME:converted_end_time,
      TIMEZONE:time_zone
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:appointment.patient_id.email,
      receiver_name:appointment.patient_id.first_name+' '+appointment.patient_id.last_name,
      template_id:sails.config.custom.appointment_cancelled,
      params:patient_email_obj
    });

    let doctor_email_obj = {
      USER_NAME:appointment.doctor_id.first_name,
      APPOINT_USER:'patient '+appointment.patient_id.first_name+' '+appointment.patient_id.last_name,
      APPOINTMENT_START_TIME:converted_start_time,
      APPOINTMENT_END_TIME:converted_end_time,
      TIMEZONE:time_zone
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:appointment.doctor_id.email,
      receiver_name:appointment.doctor_id.first_name+' '+appointment.doctor_id.last_name,
      template_id:sails.config.custom.appointment_cancelled,
      params:doctor_email_obj
    });

    // All done.
    return exits.success({
      status:true,
      message:'Appointment cancelled successfully!'
    });

  }
};
