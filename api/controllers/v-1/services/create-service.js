module.exports = {


  friendlyName: 'Create service',


  description: '',


  inputs: {
    service_name:{
      type:'string',
      required:true
    },
    service_desc:{
      type:'string',
      required:true
    },
    service_charge:{
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

    //check service name already taken
    let service = await HospitalService.findOne({service_name:inputs.service_name.toLowerCase()});

    if(service){
      return exits.otherError({
        status:false,
        message:'Hospital service name already exists!'
      });
    }

    //generate service code
    let service_code = await sails.helpers.other.generateId('SERV');

    //create service
    await HospitalService.create({
      service_code:service_code,
      service_name:inputs.service_name.toLowerCase(),
      service_desc:inputs.service_desc,
      service_charge:inputs.service_charge
    });

    // All done.
    return exits.success({
      status:true,
      message:'Hospital service created successfully!'
    });

  }
};
