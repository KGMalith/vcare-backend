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
    var user = await Doctor.findOne({
      id:this.req.user.user_id
    });

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid request!'
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Profile details generated successfully!',
      data:user
    });

  }
};
