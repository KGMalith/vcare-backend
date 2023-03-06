/**
 * Doctor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'doctors',

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

    doctor_code: {type:'string', unique:true, required:true},
    first_name: {type:'string', required:true},
    last_name:{type:'string', required:true},
    nic:{type:'string', allowNull:true},
    image:{type:'string', allowNull:true},
    email: {type:'string', required:true},
    password:{type:'string', required:true},
    is_signup_completed:{type:'number', defaultsTo:0},
    hash_code:{type:'string', allowNull:true},
    hash_code_expire:{type:'ref',columnType: 'datetime'},
    is_email_confirmation_sent:{type:'number', defaultsTo:0},
    forgot_password_requested:{type:'number', defaultsTo:0},
    mobile: {type:'string', allowNull:true},
    role_id:{model:'Role'}
  },

  customToJson:function (){
    return _.omit(this,[
      'password',
      'hash_code',
    ]);
  }
};

