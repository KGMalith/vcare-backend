/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Discharge patient',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
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
    let admission = PatientAdmission.findOne({id:inputs.id});
    if(!admission){
      return exits.notFound({
        status:false,
        message:'Invalid admission Id!'
      });
    }

    if(admission.status != 1){
      return exits.handleError({
        status:false,
        message:'Patient already discharged!'
      });
    }

    //current day utc
    let current_day = sails.moment.utc().format('YYYY-MM-DD HH:mm:ss');

    //update admission
    await PatientAdmission.updateOne({id:inputs.id}).set({
      discharge_date:current_day,
      status:0
    });

    //update room
    await HospitalRoom.updateOne({id:admission.hospital_room}).set({
      room_status:20
    });

    // All done.
    return exits.success({
      status:true,
      message:'Patient discharged successfully!'
    });


  }


};
