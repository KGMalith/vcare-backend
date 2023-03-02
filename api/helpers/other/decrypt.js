module.exports = {


  friendlyName: 'Decrypt',


  description: 'Decrypt other.',


  inputs: {
    key:{
      type:'string',
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

    const decryptedString = cryptr.decrypt(inputs.key);

    return exits.success(decryptedString);
  }


};

