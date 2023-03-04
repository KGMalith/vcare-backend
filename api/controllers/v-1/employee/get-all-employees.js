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
    let employee_list_sql =  `SELECT t1.*,t2.user_code,t2.role_id FROM employees t1 `+
    `LEFT JOIN users t2 ON t1.user_id = t2.id `;

    let employees = await sails.sendNativeQuery(employee_list_sql);
    employees = employees.rows;


    // All done.
    return exits.success({
      status:true,
      message:'Employee list generated successfully',
      data:employees
    });

  }
};
