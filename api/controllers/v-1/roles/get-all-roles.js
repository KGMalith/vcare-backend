module.exports = {


  friendlyName: 'Get all roles',


  description: '',


  inputs: {
    user_count: {
      type: 'ref',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    //get all roles
    let roles_list = await Role.find();

    if (inputs.user_count) {
      for (let role of roles_list) {
        let total_count = 0;
        let doctor_count_sql = `SELECT COUNT(t1.id) as user_count FROM doctors t1 WHERE role_id = ${role.id}`;
        let patient_count_sql = `SELECT COUNT(t1.id) as user_count FROM patients t1 WHERE role_id = ${role.id}`;
        let user_count_sql = `SELECT COUNT(t1.id) as user_count FROM users t1 WHERE role_id = ${role.id}`;

        var doctor_count = await sails.sendNativeQuery(doctor_count_sql);
        doctor_count = doctor_count.rows[0].user_count;

        var patient_count = await sails.sendNativeQuery(patient_count_sql);
        patient_count = patient_count.rows[0].user_count;

        var user_count = await sails.sendNativeQuery(user_count_sql);
        user_count = user_count.rows[0].user_count;

        total_count = doctor_count + patient_count + user_count;
        role.user_count = total_count;
      }
    }

    // All done.
    return exits.success({
      status: true,
      message: 'Roles generated successfully!',
      data: roles_list
    });
  }
};
