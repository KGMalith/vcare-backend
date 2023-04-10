module.exports = {


  friendlyName: 'Delete employee',


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

    //check employee exists for user
    let is_exists = await Employee.findOne({id:inputs.id});

    if(!is_exists){
      return exits.notFound({
        status:false,
        message:'Invalid employee id'
      });
    }

    let exployee_contacts = await EmployeeEmergencyContact.find();
    if(exployee_contacts.length > 0){
      return exits.handleError({
        status:false,
        message:'Employee profile cannot delete. Remove employee emegency contact details and try again!'
      });
    }

    let exployee_documents = await EmployeeDocument.find();
    if(exployee_documents.length > 0){
      return exits.handleError({
        status:false,
        message:'Employee profile cannot delete. Remove employee documents and try again!'
      });
    }

    //delete employee
    await Employee.destroyOne({id:inputs.id});

    return exits.success({
      status:true,
      message:'Employee profile deleted successfully!'
    });

  }
};
