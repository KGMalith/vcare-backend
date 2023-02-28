/**
 * Patient.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'patients',

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

    patient_code: {type:'string', required:true},
    first_name: {type:'string', required:true},
    last_name:{type:'string', required:true},
    email: {type:'string', required:true},
    image:{type:'string', allowNull:true},
    password:{type:'string', required:true},
    is_signup_completed:{type:'number', defaultsTo:0},
    hash_code:{type:'string', allowNull:true},
    is_email_confirmation_sent:{type:'number', defaultsTo:0},
    nic:{type:'string'},
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

