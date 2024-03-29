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
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {

    //check employee contact
    let is_exists = await EmployeeEmergencyContact.findOne({id:inputs.id});

    if(!is_exists){
      return exits.handleError({
        status:false,
        message:'Invalid enegency contact id!'
      });
    }

    //delete enegency contact
    await EmployeeEmergencyContact.destroyOne({id:inputs.id});

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Emegency contact deleted successfully!'
    });

  }
};
