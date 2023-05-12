/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Pay bill',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    payment_type:{
      type:'number',
      required:true
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


  fn: async function (inputs,exits) {
    //check bill
    let bill = await HospitalBill.findOne({ id: inputs.id }).populate('patient_admission').populate('patient_appointment');

    if (!bill) {
      return exits.handleError({
        status: false,
        message: 'Invalid bill Id!'
      });
    }

    if(bill.status != sails.config.custom.hospital_bill_finalized){
      return exits.handleError({
        status: false,
        message: 'Payment cannot be made for selected bill'
      });
    }

    let patient_id = bill.patient_admission ? bill.patient_admission.patient_id:bill.patient_appointment && bill.patient_appointment.patient_id;

    //send bill email to patient
    let patientObj = await Patient.findOne({ id:patient_id});

    //update bill
    let newBillObj = await HospitalBill.updateOne({id: inputs.id }).set({
      received_amount:bill.grand_total,
      status:sails.config.custom.hospital_bill_paid,
      payment_type:inputs.payment_type
    }).fetch();

    let payment_type = inputs.payment_type == sails.config.custom.cash_payment ? 'Cash':inputs.payment_type == sails.config.custom.card_payment  && 'Card';

    let email_obj = {
      USER_NAME:patientObj.first_name,
      BILL_NO:newBillObj.bill_code,
      PAYMENT_TYPE:payment_type,
      DISCOUNT:newBillObj.discount,
      PAID_AMOUNT:newBillObj.grand_total
    };

    //send email
    await sails.helpers.email.sendEmail.with({
      receiver_email:patientObj.email,
      receiver_name:patientObj.first_name+' '+patientObj.last_name,
      template_id:sails.config.custom.bill_paid,
      params:email_obj
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Hospital bill paid successfully!'
    });

  }


};
