/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'employees',

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

    emp_code: {type:'string', unique:true, required:true},
    user_id: {model:'User'},
    is_user_account_exists:{type:'number', defaultsTo:0},
    first_name: {type:'string', required:true},
    last_name: {type:'string', required:true},
    email: {type:'string', required:true},
    nic: {type:'string', unique:true},
    hired_date: {type:'ref', columnType:'datetime'},
    end_date: {type:'ref', columnType:'datetime'},
    birthday: {type:'ref', columnType:'datetime'},
    personal_mobile: {type:'string', allowNull:true},
    bank: {type:'string', allowNull:true},
    bank_branch: {type:'string', allowNull:true},
    bank_account_no: {type:'string', allowNull:true},
    bank_account_name: {type:'string', allowNull:true},
    home_address: {type:'string'},
    employment_type: {type:'string'},
    image: {type:'string', allowNull:true},
    designation: {type:'string', allowNull:true},
  },

};

