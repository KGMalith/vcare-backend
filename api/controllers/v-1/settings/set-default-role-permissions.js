/* eslint-disable eqeqeq */
module.exports = {


  friendlyName: 'Update timezone',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    //get all permissions
    let permissions = await Permission.find();

    for (let permission of permissions) {
      //save admin roles
      await RolePermission.create({
        role_id: sails.config.custom.admin_role_id,
        permission_id: permission.id,
        is_active: 1
      });

      //save patient roles
      if ((permission.permission_name == 'Update Profile' && permission.permission_category == 'Settings') ||
      (permission.permission_name == 'View Profile' && permission.permission_category == 'Settings') ||
      (permission.permission_name == 'View All Bills' && permission.permission_category == 'Bill') ||
      (permission.permission_name == 'View Bill' && permission.permission_category == 'Bill') ||
      (permission.permission_category == 'Appointments') ||
      (permission.permission_name == 'View Admissions' && permission.permission_category == 'Admissions') ||
      (permission.permission_name == 'View Admission Details' && permission.permission_category == 'Admissions')) {
        await RolePermission.create({
          role_id: sails.config.custom.patient_role_id,
          permission_id: permission.id,
          is_active: 1
        });
      }

      //save doctor roles

      if ((permission.permission_name == 'Update Profile' && permission.permission_category == 'Settings') ||
      (permission.permission_name == 'View Profile' && permission.permission_category == 'Settings') ||
      (permission.permission_name == 'Add Patient Documents' && permission.permission_category == 'Patient') ||
      (permission.permission_name == 'Delete Patient Documents' && permission.permission_category == 'Patient') ||
      (permission.permission_name == 'View Patient Details' && permission.permission_category == 'Patient') ||
      (permission.permission_name == 'View All Patient' && permission.permission_category == 'Patient') ||
      (permission.permission_name == 'View Appointments' && permission.permission_category == 'Appointments') ||
      (permission.permission_name == 'View Appointment Details' && permission.permission_category == 'Appointments') ||
      (permission.permission_name == 'View Admissions' && permission.permission_category == 'Admissions') ||
      (permission.permission_name == 'View Admission Details' && permission.permission_category == 'Admissions')) {
        await RolePermission.create({
          role_id: sails.config.custom.doctor_role_id,
          permission_id: permission.id,
          is_active: 1
        });
      }
    }


    // All done.
    return exits.success({
      status: true,
      message: 'Default role permission saved successfully!',
    });

  }
};

