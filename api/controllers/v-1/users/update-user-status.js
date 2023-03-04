/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update user status',


  description: '',


  inputs: {
    user_id:{
      type:'number',
      required:true
    },
    status:{
      type:'number',
      required:true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    otherError:{
      responseType: 'HandleError'
    }
  },


  fn: async function (inputs,exits) {
    //check user id exists
    let user = await User.findOne({id:inputs.user_id});

    if(!user){
      exits.notFound({
        status:false,
        message:'Invalid user id!'
      });
    }

    //check input status valid
    if(inputs.status !== sails.config.custom.user_active && inputs.status !== sails.config.custom.user_deactivated){
      exits.otherError({
        status:false,
        message:'Invalid status code!'
      });
    }

    //check user account not acivated
    if(user.status === 0){
      exits.otherError({
        status:false,
        message:'User account not activated!'
      });
    }

    //check status already updated
    if(user.status == inputs.status){
      exits.otherError({
        status:false,
        message:'User status already updated!'
      });
    }

    //update user status
    await User.updateOne({id:inputs.user_id}).set({
      status:inputs.status
    });

    let params = {
      USER_NAME:user.first_name+' '+user.last_name,
    };

    if(inputs.status === sails.config.custom.user_active){
      await sails.helpers.email.sendEmail.with({
        receiver_email:user.email,
        receiver_name:user.first_name+' '+user.last_name,
        template_id:sails.config.custom.user_account_reactivated,
        params:params
      });
    }else if(inputs.status === sails.config.custom.user_deactivated){
      await sails.helpers.email.sendEmail.with({
        receiver_email:user.email,
        receiver_name:user.first_name+' '+user.last_name,
        template_id:sails.config.custom.user_account_deactivated,
        params:params
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'User account status updated successfully!'
    });

  }

};
