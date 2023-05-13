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
    //check patient document exists for user
    let patientDocument = await PatientDocument.findOne({id:inputs.id});

    if(!patientDocument){
      return exits.handleError({
        status:false,
        message:'Employee document not found!'
      });
    }

    //delete s3 document
    await sails.helpers.s3.deleteObject.with({
      bucket:sails.config.custom.s3_bucket,
      file_name:patientDocument.document_URL
    });

    //delete document
    await PatientDocument.destroyOne({id:inputs.id});

    // All done.
    return exits.success({
      status:true,
      message:'Patient document deleted successfully!'
    });
  }


};
