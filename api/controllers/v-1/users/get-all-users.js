module.exports = {


  friendlyName: 'Get all users',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    //get all users
    let users_list = await User.find().populate('role_id');

    for(let user of users_list){
      if(user.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:user.image,
          is_expire:true
        });
        user.image = respond.data;
      }
    }

    // All done.
    return exits.success({
      status:true,
      message:'Users generated successfully!',
      data:users_list
    });
  }

};
