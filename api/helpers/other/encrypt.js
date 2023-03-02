module.exports = {


  friendlyName: 'Encrypt',


  description: 'Encrypt other.',


  inputs: {
    value:{
      type:'ref',
      required:true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    const Cryptr = require('cryptr');

    const cryptr = new Cryptr(sails.config.custom.encryption_key);

    const encryptedString = cryptr.encrypt(inputs.value);

    return exits.success(encryptedString);
  }


};

