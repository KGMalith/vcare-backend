module.exports = {


  friendlyName: 'Update timezone',


  description: '',


  inputs: {
    timeZone:{
      type:'ref',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {

    //update timezone
    await Settings.updateOne({type:'TimeZone'}).set({
      value:inputs.timeZone
    });

    // All done.
    return exits.success({
      status:true,
      message:'Timezone updated successfully!',
    });

  }
};
