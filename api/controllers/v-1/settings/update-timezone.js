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

    //find timezone
    let timezone = await Settings.findOne({type:'TimeZone'});

    if(timezone){
      //update timezone
      await Settings.updateOne({type:'TimeZone'}).set({
        value:inputs.timeZone
      });
    }else{
      //create timezone
      await Settings.create({
        type:'TimeZone',
        value:inputs.timeZone
      });
    }

    // All done.
    return exits.success({
      status:true,
      message:'Timezone updated successfully!',
    });

  }
};
