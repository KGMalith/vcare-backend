module.exports = {


  friendlyName: 'Create document',


  description: '',


  inputs: {
    emp_id:{
      type:'number',
      required:true
    },
    document_name:{
      type:'string',
      required:true
    },
    document_desc:{
      type:'string',
      allowNull:true
    },
    document_URL:{
      type:'string',
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
    let is_exists = await Employee.findOne({id:inputs.emp_id});

    if(!is_exists){
      return exits.notFound({
        status:false,
        message:'Employee profile not found!'
      });
    }

    //generate document code
    let doc_code = await sails.helpers.other.generateId('EMP_DOC');

    //create document
    await EmployeeDocument.create({
      emp_id:inputs.emp_id,
      document_code:doc_code,
      document_name:inputs.document_name,
      document_desc:inputs.document_desc,
      document_URL:inputs.document_URL,
    });

    // All done.
    return exits.success({
      status:true,
      message:'Employee document created successfully!'
    });

  }
};
