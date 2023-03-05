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
    otherError:{
      responseType: 'HandleError'
    }
  },


  fn: async function (inputs,exits) {
    //check patient document exists for user
    let is_exists = await PatientDocument.findOne({id:inputs.id});

    if(!is_exists){
      return exits.notFound({
        status:false,
        message:'Employee document not found!'
      });
    }

    //delete document
    await PatientDocument.destroyOne({id:inputs.id});

    // All done.
    return exits.success({
      status:true,
      message:'Patient document deleted successfully!'
    });
  }


};
