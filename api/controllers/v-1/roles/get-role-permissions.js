module.exports = {


  friendlyName: 'Get role permissions',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //get all roles
    let permissions_sql = `SELECT t1.permission_id as permission_id, t1.role_id as role_id, t2.permission_name,t2.permission_category,t2.permission_desc,t1.is_active FROM role_permissions t1 `+
    `LEFT JOIN permissions t2 ON t1.permission_id = t2.id `+
    `WHERE t1.role_id = ${inputs.id}`;
    var permission_list = await sails.sendNativeQuery(permissions_sql);
    permission_list = permission_list.rows;

    // All done.
    return exits.success({
      status:true,
      message:'Roles generated successfully!',
      data:permission_list
    });
  }
};
