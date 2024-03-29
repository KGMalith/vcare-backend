/**
 * HospitalBill.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'hospital_bills',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    bill_code: {type:'string', unique:true, required:true},
    gross_total: {type:'number', defaultsTo:0},
    discount: {type:'number', defaultsTo:0},
    received_amount: {type:'number', defaultsTo:0},
    grand_total: {type:'number', defaultsTo:0},
    status: {type:'number', defaultsTo:sails.config.custom.hospital_bill_pending}, //0-> pending, 10->paid, -10 -> cancelled, 20 ->bill finalized
    patient_admission:{model:'PatientAdmission'},
    patient_appointment:{model:'PatientAppointment'},
    payment_type:{type:'number',defaultsTo:sails.config.custom.cash_payment}, //0-> cash, 1-> card
  },

};

