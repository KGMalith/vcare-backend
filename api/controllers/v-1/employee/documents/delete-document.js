module.exports = {


  friendlyName: 'Delete document',


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
    //check employee document exists for user
    let employeeDocument = await EmployeeDocument.findOne({id:inputs.id});

    if(!employeeDocument){
      return exits.handleError({
        status:false,
        message:'Employee document not found!'
      });
    }

    //delete s3 document
    await sails.helpers.s3.deleteObject.with({
      bucket:sails.config.custom.s3_bucket,
      file_name:employeeDocument.document_URL
    });

    //delete document
    await EmployeeDocument.destroyOne({id:inputs.id});

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Employee document deleted successfully!'
    });
  }
};
