module.exports = {


  friendlyName: 'Create document',


  description: '',


  inputs: {
    patient_id:{
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

    //check patient exists for user
    let is_exists = await Patient.findOne({id:inputs.patient_id});

    if(!is_exists){
      return exits.notFound({
        status:false,
        message:'Patient profile not found!'
      });
    }

    //generate document code
    let doc_code = await sails.helpers.other.generateId('PAT_DOC');

    //create document
    await PatientDocument.create({
      patient_id:inputs.patient_id,
      document_code:doc_code,
      document_name:inputs.document_name,
      document_desc:inputs.document_desc,
      document_URL:inputs.document_URL,
    });

    // All done.
    return exits.success({
      status:true,
      message:'Patient document created successfully!'
    });

  }
};
