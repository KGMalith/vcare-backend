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
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
    //check id is valid
    let employee_obj = await Employee.findOne({id:inputs.id});

    if(!employee_obj){
      return exits.handleError({
        status:false,
        message:'Invalid employee id'
      });
    }

    if(employee_obj.image){
      let respond = await sails.helpers.s3.getObject.with({
        bucket:sails.config.custom.s3_bucket,
        file_name:employee_obj.image,
        is_expire:false
      });
      employee_obj.image_url = respond.data;
    }else{
      employee_obj.image_url = null;
    }

    let employeeDocuments = await EmployeeDocument.find({emp_id:employee_obj.id});

    for(let employeeDocument of employeeDocuments){
      let respond = await sails.helpers.s3.getObject.with({
        bucket:sails.config.custom.s3_bucket,
        file_name:employeeDocument.document_URL,
        is_expire:true
      });
      employeeDocument.url = respond.data;
    }

    let employeeContacts = await EmployeeEmergencyContact.find({emp_id:employee_obj.id});

    employee_obj.documents = employeeDocuments;
    employee_obj.contacts = employeeContacts;

    // All done.
    return exits.success({
      status:true,
      message:'Employee details generated successfully!',
      data:employee_obj
    });
  }
};
