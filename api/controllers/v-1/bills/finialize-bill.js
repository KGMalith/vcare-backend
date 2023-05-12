/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
module.exports = {


  friendlyName: 'Finialize bill',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    discount: {
      type: 'number',
      required: true
    },
    type:{
      type: 'string',
      required: true
    }
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
    let total_amount = 0;

    //check bill
    let bill = await HospitalBill.findOne({ id: inputs.id }).populate('patient_admission').populate('patient_appointment');

    if (!bill) {
      return exits.handleError({
        status: false,
        message: 'Invalid bill Id!'
      });
    }

    if(bill.status != sails.config.custom.hospital_bill_pending){
      return exits.handleError({
        status: false,
        message: 'Only pending bills can finalized!'
      });
    }

    //get settings
    let time_zone = null;
    let respond = await sails.helpers.other.getTimezone();
    if (respond.status) {
      time_zone = respond.data;
    } else {
      return exits.handleError({
        status: false,
        message: 'Please setup default timezone!'
      });
    }

    //get all services
    let services = await HospitalBillService.find({ hospital_bill_id: inputs.id });

    let service_array = [];
    //add service charge to total amount
    for (let service of services) {
      let serviceObj = await HospitalService.findOne({ id: service.hospital_service_id });
      total_amount = total_amount + serviceObj.service_charge;
      service_array.push({
        code:serviceObj.service_code,
        name:serviceObj.service_name,
        description:serviceObj.service_desc,
        price:serviceObj.service_charge,
      });
    }

    //check bill is admission then add room charge to bill
    if (bill.patient_admission) {
      let room = await HospitalRoom.findOne({ id: bill.patient_admission.hospital_room });
      total_amount = total_amount + room.room_charge;
      service_array.push({
        code:room.room_number,
        name:'Charges For Room No: '+room.room_number,
        description:room.room_desc,
        price:room.room_charge,
      });
    }

    //calculate discount amount
    let discount = 0;
    if(inputs.type == 'Precentage'){
      discount = parseFloat(((total_amount / 100) * inputs.discount).toFixed(2));
    }else{
      discount = inputs.discount;
    }


    //update hospital bill by adding discount
    let newBillObj = await HospitalBill.updateOne({ id: inputs.id }).set({
      gross_total:total_amount,
      discount: discount,
      grand_total:(total_amount - discount),
      status:20
    }).fetch();

    let patient_id = bill.patient_admission ? bill.patient_admission.patient_id:bill.patient_appointment && bill.patient_appointment.patient_id;

    //send bill email to patient
    let patientObj = await Patient.findOne({ id:patient_id});

    if (bill.patient_admission) {
      //convert to timezone to send email notification
      var converted_start_time = sails.moment(bill.patient_admission.admit_date).tz(time_zone).format('YYYY-MM-DD hh:mm A');
      var converted_end_time = sails.moment(bill.patient_admission.discharge_date).tz(time_zone).format('YYYY-MM-DD hh:mm A');
    } else if (bill.patient_appointment) {
      //convert to timezone to send email notification
      var converted_start_time = sails.moment(bill.patient_appointment.appointment_start_date).tz(time_zone).format('YYYY-MM-DD hh:mm A');
      var converted_end_time = sails.moment(bill.patient_appointment.appointment_end_date).tz(time_zone).format('YYYY-MM-DD hh:mm A');
    }

    let email_obj = {
      USER_NAME:patientObj.first_name,
      FROM:converted_start_time,
      TO:converted_end_time,
      TIMEZONE:time_zone,
      TABLEDATA:service_array,
      SUB_TOTAL:newBillObj.gross_total,
      DISCOUNT:newBillObj.discount,
      TOTAL:newBillObj.grand_total
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:patientObj.email,
      receiver_name:patientObj.first_name+' '+patientObj.last_name,
      template_id:sails.config.custom.bill_finalised,
      params:email_obj
    });


    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Hospital bill finalized successfully!'
    });

  }
};
