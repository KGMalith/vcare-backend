module.exports = {


  friendlyName: 'Encrypt password',


  description: '',


  inputs: {
    password:{
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
    const {genSaltSync,hashSync} = require('bcrypt');

    //encrypt password
    let salt = genSaltSync(10);
    let encrypted_password = hashSync(inputs.password,salt);

    return exits.success(encrypted_password);
  }

};

