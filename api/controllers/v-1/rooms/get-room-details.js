module.exports = {


  friendlyName: 'Get room details',


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
    //check id is valied
    let room_obj = await HospitalRoom.findOne({id:inputs.id});

    if(!room_obj){
      return exits.notFound({
        status:false,
        message:'Invalid room id!'
      });
    }

    //get room details
    let room = await HospitalRoom.findOne({id:inputs.id});

    //get patient admissions assigned to room
    let patient_admissions_sql = `SELECT t1.*,t2.patient_code,t2.first_name,t2.last_name FROM patient_admissions t1 `+
    `LEFT JOIN patients t2 ON t1.patient_id = t2.id `+
    `WHERE t1.hospital_room = ${inputs.id}`;

    var admission_list = await sails.sendNativeQuery(patient_admissions_sql);
    admission_list = admission_list.rows;

    let return_data = {
      room:room,
      admissions:admission_list
    };

    // All done.
    return exits.success({
      status:true,
      message:'Room details generated successfully!',
      data:return_data
    });

  }

};
