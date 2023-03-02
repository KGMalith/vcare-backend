/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update role permissions',


  description: '',


  inputs: {
    role_id:{
      type:'number',
      required:true
    },
    permission_id:{
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

    //check role and permission exists
    let role_obj = await Role.findOne({
      id:inputs.role_id
    });

    if(!role_obj){
      return exits.notFound({
        status:false,
        message:'Invalid role id'
      });
    }

    let permission_obj = await Permission.findOne({id:inputs.permission_id});

    if(!permission_obj){
      return exits.notFound({
        status:false,
        message:'Invalid permission id'
      });
    }

    //check permission assigned to role
    let role_permission = await RolePermission.findOne({
      role_id:inputs.role_id,
      permission_id:inputs.permission_id
    });

    if(!role_permission){
      return exits.notFound({
        status:false,
        message:'Permission not assigned for role'
      });
    }

    //check requested status valid
    if(inputs.status != 0 && inputs.status != 1){
      return exits.otherError({
        status:false,
        message:'Invalid request status'
      });
    }

    //update permission state
    await RolePermission.updateOne({
      role_id:inputs.role_id,
      permission_id:inputs.permission_id
    }).set({
      is_active:inputs.status
    });

    // All done.
    return exits.success({
      status:true,
      message:'Role permissions updated successfully'
    });

  }

};
