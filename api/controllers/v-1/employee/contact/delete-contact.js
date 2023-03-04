module.exports = {


  friendlyName: 'Delete contact',


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

    //check employee contact
    let is_exists = await EmployeeEmergencyContact.findOne({id:inputs.id});

    if(!is_exists){
      return exits.notFound({
        status:false,
        message:'Invalid enegency contact id!'
      });
    }

    //delete enegency contact
    await EmployeeEmergencyContact.destroyOne({id:inputs.id});

    // All done.
    return exits.success({
      status:true,
      message:'Emegency contact deleted successfully!'
    });

  }
};
