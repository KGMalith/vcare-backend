/* eslint-disable no-unused-vars */
module.exports = {


  friendlyName: 'Get employee',


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
    //check id is valid
    let employee_obj = await Employee.findOne({id:inputs.id});

    if(!employee_obj){
      return exits.notFound({
        status:false,
        message:'Invalid employee id'
      });
    }

    let employee_sql = `SELECT t1.*,t2.user_code,t2.role_id FROM employees t1 `+
    `LEFT JOIN users t2 ON t1.user_id = t2.id WHERE t1.id = ${inputs.id}`;

    let employee = await sails.sendNativeQuery(employee_sql);
    employee = employee.rows[0];

    // All done.
    return exits.success({
      status:true,
      message:'Employee details generated successfully!',
      data:employee
    });
  }
};
