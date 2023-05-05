/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update profile',


  description: '',


  inputs: {
    first_name:{
      type:'string',
      required:true
    },
    last_name:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true
    },
    nic:{
      type:'string',
      allowNull:true
    },
    mobile:{
      type:'string',
      allowNull:true
    },
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

    //check user id valid
    let user = await Doctor.findOne({id:this.req.user.user_id});

    if(!user){
      return exits.handleError({
        status:false,
        message:'Invalid user!'
      });
    }

    //check email changed
    if(user.email != inputs.email){
      //send email request to validate email
      let hash_code = await sails.helpers.other.encrypt(user.id);
      let hash_code_expire = sails.moment().utc().add(24,'h').format('YYYY-MM-DD HH:mm:ss');

      //update doctor
      await Doctor.updateOne({id:user.id}).set({
        hash_code:hash_code,
        hash_code_expire:hash_code_expire,
        is_signup_completed:0,
        is_email_confirmation_sent:0,
      });

      //send email
      let params = {
        USER_NAME:inputs.first_name+' '+inputs.last_name,
        LINK:`${sails.config.custom.frontend_base_url}doctor/email-verification/${hash_code}`
      };

      let respond = await sails.helpers.email.sendEmail.with({
        receiver_email:inputs.email,
        receiver_name:inputs.first_name+' '+inputs.last_name,
        template_id:sails.config.custom.email_verify,
        params:params
      });

      if(respond.status){
        //update doctor as email sent
        await Doctor.updateOne({id:user.id}).set({
          is_email_confirmation_sent:1,
        });
      }
    }

    //update user
    await Doctor.updateOne({id:user.id}).set({
      first_name:inputs.first_name,
      last_name:inputs.last_name,
      email:inputs.email,
      nic:inputs.nic,
      mobile:inputs.mobile
    });

    // All done.
    return exits.success({
      status:true,
      message:'Profile updated successfully!'
    });

  }
};
