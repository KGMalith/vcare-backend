module.exports = {


  friendlyName: 'Get role details',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
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
    //check id is valied
    let role_obj = await Role.findOne({id:inputs.id});

    if(!role_obj){
      return exits.notFound({
        status:false,
        message:'Invalid role id!'
      });
    }

    //get all permissions link to role
    let role_permissions = await RolePermission.find({role_id:inputs.id}).populate('permission_id');

    let permission_list = [];
    for(let role_permission of role_permissions){
      permission_list.push(role_permission.permission_id);
    }

    role_obj.permissions = permission_list;

    // All done.
    return exits.success({
      status:true,
      message:'Role details generated successfully',
      data:role_obj
    });

  }


};
