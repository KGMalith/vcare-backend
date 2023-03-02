module.exports = {


  friendlyName: 'Create role',


  description: 'Create role',


  inputs: {
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
    otherError:{
      responseType: 'HandleError'
    }
  },


  fn: async function (inputs,exits) {
    //check requested permission id in the database
    let invalid_id_list = [];

    for(let permission of inputs.permissions){
      var permission_sql = 'SELECT t1.* FROM permissions t1 WHERE t1.id = '+permission;
      var permission_value = await sails.sendNativeQuery(permission_sql);
      permission_value = permission_value.rows;

      if(!permission_value || permission_value.length < 1){
        invalid_id_list.push(permission);
      }
    }

    //return error if invalid id exists
    if(invalid_id_list.length > 0){
      return exits.otherError({
        status:false,
        message:'Invalid Permission Values!'
      });
    }

    //create role
    let role_obj = await Role.create({
      role_name:inputs.role_name,
      role_desc:inputs.role_desc
    }).fetch();

    //save permissions according to role

    for(let permission of inputs.permissions){
      await RolePermission.create({
        role_id:role_obj.id,
        permission_id:permission
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Role created successfully!'
    });
  }
};
