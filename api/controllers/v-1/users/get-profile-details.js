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
      return exits.handleError({
        status:false,
        message:'Invalid request!'
      });
    }

    if(user.image){
      let respond = await sails.helpers.s3.getObject.with({
        bucket:sails.config.custom.s3_bucket,
        file_name:user.image,
        is_expire:true
      });
      user.image = respond.data;
    }

    var timezone = null;
    //get timezone
    if(this.req.user.user_role == sails.config.custom.admin_role_id){
      var timezone = await Settings.findOne({type:'TimeZone'});
    }

    user.timezone = timezone?timezone.value:null;

    // All done.
    return exits.success({
      status:true,
      message:'Profile details generated successfully!',
      data:user
    });

  }
};
