/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update service status',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    status:{
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
    //check id is valied
    let service_obj = await HospitalService.findOne({id:inputs.id});

    if(!service_obj){
      return exits.notFound({
        status:false,
        message:'Invalid service id!'
      });
    }

    //check status is valid
    if(inputs.status != sails.config.custom.hospital_service_active && inputs.status != sails.config.custom.hospital_service_inactive){
      return exits.otherError({
        status:false,
        message:'Invalid status!'
      });
    }

    //check already updated
    if(service_obj.status == inputs.status){
      return exits.otherError({
        status:false,
        message:'Status already updated!'
      });
    }

    //update service status
    await HospitalService.updateOne({id:inputs.id}).set({
      status:inputs.status
    });

    // All done.
    return exits.success({
      status:true,
      message:'Status updated successfully!'
    });

  }


};
