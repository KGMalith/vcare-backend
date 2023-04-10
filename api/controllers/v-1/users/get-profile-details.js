/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Get profile details',


  description: '',


  inputs: {

  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {

    //check email already exists
    var user = await User.findOne({
      id:this.req.user.user_id
    });

    if(!user){
      return exits.notFound({
        status:false,
        message:'Invalid request!'
      });
    }

    var settings = null;
    //get settings
    if(this.req.user.user_role == 1){
      var settings = await Settings.find();
    }

    user.settings = settings;

    // All done.
    return exits.success({
      status:true,
      message:'Profile details generated successfully!',
      data:user
    });

  }
};
