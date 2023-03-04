module.exports = {


  friendlyName: 'Add contact',


  description: '',


  inputs: {
    emp_id:{
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
    otherError:{
      responseType: 'HandleError'
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

    //check input data already exists
    let contact = await EmployeeEmergencyContact.find({name:inputs.name.toLowerCase(),emp_id:inputs.emp_id});

    if(contact){
      return exits.otherError({
        status:false,
        message:'Employee enegency contact detail already exists!'
      });
    }

    //create contact
    await EmployeeEmergencyContact.create({
      emp_id:inputs.emp_id,
      name:inputs.name,
      mobile:inputs.mobile,
      relationship:inputs.relationship
    });

    // All done.
    return exits.success({
      status:true,
      message:'Employee enegency contact created successfully!'
    });

  }
};
