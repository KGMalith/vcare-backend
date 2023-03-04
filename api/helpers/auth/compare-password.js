module.exports = {


  friendlyName: 'Compare password',


  description: '',


  inputs: {
    password:{ //database password
      type:'string',
      required:true
    },
    matching_password:{ //user entered password
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
    const {compareSync} = require('bcrypt');

    //match password
    let password_match_result = compareSync(inputs.matching_password,inputs.password);

    return exits.success(password_match_result);
  }
};

