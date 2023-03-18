/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Get timezone',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Timezone',
    },

  },


  fn: async function (inputs,exits) {

    let settings = await Settings.findOne({type:'TimeZone'});
    if(settings){
      time_zone = settings.value;
      return exits.success({
        status:true,
        data:time_zone
      });
    }else{
      return exits.success({
        status:false,
      });
    }
  }
};

