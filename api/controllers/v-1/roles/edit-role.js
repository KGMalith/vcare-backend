/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Edit role',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    role_name:{
      type:'string',
      required:true
    },
    role_desc:{
      type:'string',
      required:true
    },
    permissions:{
      type:'ref',
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
    //check id is valied
    let role_obj = await Role.findOne({id:inputs.id});

    if(!role_obj){
      return exits.handleError({
        status:false,
        message:'Invalid role id!'
      });
    }

    if(inputs.id == sails.config.custom.admin_role_id){
      return exits.handleError({
        status:false,
        message:'You have no permission to update Admin Role!'
      });
    }

    //update role
    await Role.updateOne({id:inputs.id}).set({
      role_name:inputs.role_name,
      role_desc:inputs.role_desc
    });

    //delete all permissions and create new
    await RolePermission.destroy({
      role_id:inputs.id
    });

    for(let permission of inputs.permissions){
      await RolePermission.create({
        role_id:inputs.id,
        permission_id:permission
      });
    }

    // All done.
    return exits.success({
      status:true,
      show_message:true,
      message:'Role updated successfully!'
    });
  }
};
