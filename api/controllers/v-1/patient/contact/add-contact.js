module.exports = {


  friendlyName: 'Add contact',


  description: '',


  inputs: {
    patient_id:{
      type:'number',
      required:true
    },
    name:{
      type:'string',
      required:true
    },
    mobile:{
      type:'string',
      required:true
    },
    relationship:{
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
      return exits.handleError({
        status:false,
        message:'Patient profile not found!'
      });
    }

    //check input data already exists
    let contact = await PatientEmergencyContact.find({name:inputs.name.toLowerCase(),patient_id:inputs.patient_id});

    if(contact){
      return exits.handleError({
        status:false,
        message:'Patient enegency contact detail already exists!'
      });
    }

    //create contact
    await PatientEmergencyContact.create({
      patient_id:inputs.patient_id,
      name:inputs.name,
      mobile:inputs.mobile,
      relationship:inputs.relationship
    });

    // All done.
    return exits.success({
      status:true,
      message:'Patient emergency contact created successfully!'
    });

  }


};
