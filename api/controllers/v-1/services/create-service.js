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
    },
    is_apply_to_every_appointment:{
      type:'number',
      required:true
    },
    is_apply_to_every_admission:{
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
      service_charge:inputs.service_charge,
      is_apply_to_every_appointment:inputs.is_apply_to_every_appointment,
      is_apply_to_every_admission:inputs.is_apply_to_every_admission
    });

    // All done.
    return exits.success({
      status:true,
      message:'Hospital service created successfully!'
    });

  }
};
