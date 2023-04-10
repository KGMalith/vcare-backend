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
    let permission_list = await RolePermission.find({role_id:inputs.id});

    //structure return obj
    let return_obj = {
      role:role_obj,
      permissions:permission_list
    };

    // All done.
    return exits.success({
      status:true,
      message:'Role details generated successfully',
      data:return_obj
    });

  }


};
