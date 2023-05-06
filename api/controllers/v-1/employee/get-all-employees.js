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
    }

    // All done.
    return exits.success({
      status:true,
      message:'Employee list generated successfully',
      data:employees
    });

  }
};
