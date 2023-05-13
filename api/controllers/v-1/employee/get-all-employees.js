/* eslint-disable no-unused-vars */
module.exports = {


  friendlyName: 'Get all employees',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //employees list
    let employees = await Employee.find();

    for(let employee of employees){
      if(employee.user_id){
        let userObj = await User.findOne({id:employee.user_id}).populate('role_id');
        employee.user_id = userObj;
      }else{
        employee.user_id = null;
      }

      if(employee.image){
        let respond = await sails.helpers.s3.getObject.with({
          bucket:sails.config.custom.s3_bucket,
          file_name:employee.image,
          is_expire:true
        });
        employee.image = respond.data;
      }
    }

    // All done.
    return exits.success({
      status:true,
      message:'Employee list generated successfully',
      data:employees
    });

  }
};
