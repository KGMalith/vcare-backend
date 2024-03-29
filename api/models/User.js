/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'users',

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

    user_code:{type:'string', unique:true, required:true},
    first_name: {type:'string', required:true},
    last_name: {type:'string', required:true},
    email: {type:'string', required:true},
    image:{type:'string', allowNull:true},
    password:{type:'string', allowNull:true},
    is_signup_completed:{type:'number', defaultsTo:0},
    hash_code:{type:'string', allowNull:true},
    hash_code_expire:{type:'ref',columnType: 'datetime'},
    is_password_reset_requested:{type:'number', defaultsTo:0},
    is_invitation_sent:{type:'number', defaultsTo:0},
    role_id:{model:'Role'}, //Admin ->1 Patient->2 Doctor->3
    status:{type:'number', defaultsTo:0},
  },

  customToJson:function (){
    return _.omit(this,[
      'password',
      'hash_code',
    ]);
  }
};

