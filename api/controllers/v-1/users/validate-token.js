/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Validate token',


  description: '',


  inputs: {
    token:{
      type:'string',
      required:true
    }
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
    //decrypt token
    let user_id = await sails.helpers.other.decrypt(inputs.token);

    //expire all tokens which are less than current time
    let current_timestamp = sails.moment().utc().format('YYYY-MM-DD HH:mm:ss');

    const users_sql = `SELECT t1.id FROM users t1 WHERE t1.hash_code_expire < ${current_timestamp}`;
    var user_id_list = await sails.sendNativeQuery(users_sql);
    user_id_list = user_id_list.rows;

    if(user_id_list.length > 0){
      for(let user_id of user_id_list){
        const user_update_sql = `UPDATE TABLE users t1 SET t1.hash_code = NULL,hash_code_expire = NULL WHERE t1.id = ${user_id}`;
        await sails.sendNativeQuery(user_update_sql);
      }
    }

    //get user object
    let user = await User.findOne({id:user_id});
    if(!user){
      exits.notFound({
        status:false,
        message:'Invalid token!'
      });
    }

    if(user.hash_code && user.hash_code_expire  < current_timestamp){
      exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    if(user.is_invitation_sent == 1 && !user.hash_code){
      exits.handleError({
        status:false,
        message:'Token expired!'
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Token validated successfully!'
    });

  }

};
