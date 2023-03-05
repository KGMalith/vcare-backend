/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Delete role',


  description: '',


  inputs: {
    id:{
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
    //check id is valied
    let role_obj = await Role.findOne({id:inputs.id});

    if(!role_obj){
      return exits.notFound({
        status:false,
        message:'Invalid role id!'
      });
    }

    if(inputs.id == 1 || inputs.id == 2 || inputs.id == 3){
      return exits.otherError({
        status:false,
        message:'You have no permission to delete Admin, Patient, Doctor Roles!'
      });
    }

    //check role assigned to users. if assigned return error
    let users_list = await User.find({
      role_id:inputs.id
    });

    if(users_list.length > 0){
      return exits.otherError({
        status:false,
        message:'Role cannot be delete!. Please remove role from assigned users before delete role'
      });
    }

    //delete role
    await Role.destroyOne({
      id:inputs.id
    });

    await RolePermission.destroy({
      role_id:inputs.id
    });

    // All done.
    return exits.success({
      status:true,
      message:'Role deleted successfully!'
    });

  }
};
