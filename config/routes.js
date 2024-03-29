/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {},


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //===================== User  Endpoints ====================================

  //Roles
  'POST /api/v1/roles/create-role': { action: 'v-1/roles/create-role' },
  'POST /api/v1/roles/delete-role': { action: 'v-1/roles/delete-role' },
  'POST /api/v1/roles/edit-role': { action: 'v-1/roles/edit-role' },
  'POST /api/v1/roles/get-roles': { action: 'v-1/roles/get-all-roles' },
  'POST /api/v1/roles/get-role': { action: 'v-1/roles/get-role-details' },
  'POST /api/v1/roles/update-role-permissions': { action: 'v-1/roles/update-role-permissions' },
  'POST /api/v1/roles/get-role-permissions': { action: 'v-1/roles/get-role-permissions' },

  //permissions
  'GET /api/v1/permissions/get-permissions': { action: 'v-1/permissions/get-all-permissions' },

  //User
  'POST /api/v1/users/add-user': { action: 'v-1/users/add-user' },
  'GET /api/v1/users/get-users': { action: 'v-1/users/get-all-users' },
  'POST /api/v1/users/setup-password': { action: 'v-1/users/setup-password' },
  'POST /api/v1/users/sign-in': { action: 'v-1/users/sign-in' },
  'POST /api/v1/users/update-profile': { action: 'v-1/users/update-profile' },
  'POST /api/v1/users/update-user-status': { action: 'v-1/users/update-user-status' },
  'POST /api/v1/users/update-user': { action: 'v-1/users/update-user' },
  'POST /api/v1/users/upload-profile-image': { action: 'v-1/users/upload-profile-image' },
  'POST /api/v1/users/validate-token': { action: 'v-1/users/validate-token' },
  'GET /api/v1/users/get-profile-details': { action: 'v-1/users/get-profile-details' },
  'POST /api/v1/users/set-user-image': { action: 'v-1/users/set-user-image' },

  //Rooms
  'POST /api/v1/rooms/create-room': { action: 'v-1/rooms/create-room' },
  'POST /api/v1/rooms/delete-room': { action: 'v-1/rooms/delete-room' },
  'POST /api/v1/rooms/edit-room': { action: 'v-1/rooms/edit-room' },
  'GET /api/v1/rooms/get-all-rooms': { action: 'v-1/rooms/get-all-rooms' },
  'POST /api/v1/rooms/get-room-details': { action: 'v-1/rooms/get-room-details' },
  'POST /api/v1/rooms/update-room-status': { action: 'v-1/rooms/update-room-status' },

  //Services
  'POST /api/v1/services/create-service': { action: 'v-1/services/create-service' },
  'POST /api/v1/services/delete-service': { action: 'v-1/services/delete-service' },
  'POST /api/v1/services/edit-service': { action: 'v-1/services/edit-service' },
  'GET /api/v1/services/get-all-services': { action: 'v-1/services/get-all-services' },
  'POST /api/v1/services/get-service-details': { action: 'v-1/services/get-service-details' },
  'POST /api/v1/services/update-service-status': { action: 'v-1/services/update-service-status' },

  //Employee
  'POST /api/v1/employee/create-employee': { action: 'v-1/employee/create-employee' },
  'POST /api/v1/employee/edit-employee': { action: 'v-1/employee/edit-employee' },
  'POST /api/v1/employee/delete-employee': { action: 'v-1/employee/delete-employee' },
  'GET /api/v1/employee/get-all-employees': { action: 'v-1/employee/get-all-employees' },
  'POST /api/v1/employee/get-employee': { action: 'v-1/employee/get-employee' },
  'POST /api/v1/employee/upload-employee-images': { action: 'v-1/employee/upload-employee-images' },
  'POST /api/v1/employee/set-employee-image': { action: 'v-1/employee/set-employee-image' },

  'POST /api/v1/employee/contact/add-contact': { action: 'v-1/employee/contact/add-contact' },
  'POST /api/v1/employee/contact/delete-contact': { action: 'v-1/employee/contact/delete-contact' },

  'POST /api/v1/employee/documents/create-document': { action: 'v-1/employee/documents/create-document' },
  'POST /api/v1/employee/documents/delete-document': { action: 'v-1/employee/documents/delete-document' },
  'POST /api/v1/employee/documents/upload-document': { action: 'v-1/employee/documents/upload-document' },

  //===================== Patient  Endpoints ====================================

  'POST /api/v1/patient/forgot-password': { action: 'v-1/patient/forgot-password' },
  'POST /api/v1/patient/get-profile': { action: 'v-1/patient/get-profile' },
  'POST /api/v1/patient/reset-password': { action: 'v-1/patient/reset-password' },
  'POST /api/v1/patient/sign-in': { action: 'v-1/patient/sign-in' },
  'POST /api/v1/patient/sign-up': { action: 'v-1/patient/sign-up' },
  'POST /api/v1/patient/update-profile': { action: 'v-1/patient/update-profile' },
  'POST /api/v1/patient/upload-profile-image': { action: 'v-1/patient/upload-profile-image' },
  'POST /api/v1/patient/validate-token': { action: 'v-1/patient/validate-token' },
  'POST /api/v1/patient/add-patient': { action: 'v-1/patient/add-patient' },
  'POST /api/v1/patient/invitation-validate-token': { action: 'v-1/patient/invitation-validate-token' },
  'GET /api/v1/patient/get-profile-details': { action: 'v-1/patient/get-profile-details' },
  'GET /api/v1/patient/get-all-patients': { action: 'v-1/patient/get-all-patients' },
  'POST /api/v1/patient/setup-password': { action: 'v-1/patient/setup-password' },
  'POST /api/v1/patient/set-patient-image': { action: 'v-1/patient/set-patient-image' },

  'POST /api/v1/patient/contact/add-contact': { action: 'v-1/patient/contact/add-contact' },
  'POST /api/v1/patient/contact/delete-contact': { action: 'v-1/patient/contact/delete-contact' },

  'POST /api/v1/patient/documents/create-document': { action: 'v-1/patient/documents/create-document' },
  'POST /api/v1/patient/documents/delete-document': { action: 'v-1/patient/documents/delete-document' },
  'POST /api/v1/patient/documents/upload-document': { action: 'v-1/patient/documents/upload-document' },

  //===================== Doctor  Endpoints ====================================

  'POST /api/v1/doctor/forgot-password': { action: 'v-1/doctor/forgot-password' },
  'POST /api/v1/doctor/get-profile': { action: 'v-1/doctor/get-profile' },
  'POST /api/v1/doctor/reset-password': { action: 'v-1/doctor/reset-password' },
  'POST /api/v1/doctor/sign-in': { action: 'v-1/doctor/sign-in' },
  'POST /api/v1/doctor/sign-up': { action: 'v-1/doctor/sign-up' },
  'POST /api/v1/doctor/update-profile': { action: 'v-1/doctor/update-profile' },
  'POST /api/v1/doctor/upload-profile-image': { action: 'v-1/doctor/upload-profie-image' },
  'POST /api/v1/doctor/validate-token': { action: 'v-1/doctor/validate-token' },
  'POST /api/v1/doctor/set-doctor-image': { action: 'v-1/doctor/set-doctor-image' },
  'GET /api/v1/doctor/get-profile-details': { action: 'v-1/doctor/get-profile-details' },
  'GET /api/v1/doctor/get-all-doctors': { action: 'v-1/doctor/get-all-doctors' },

  //===================== Appointments  Endpoints ====================================

  'POST /api/v1/appointments/add-appointment': { action: 'v-1/appointments/add-appointment' },
  'POST /api/v1/appointments/cancel-appointment-patient': { action: 'v-1/appointments/cancel-appointment-patient' },
  'POST /api/v1/appointments/cancel-appointment': { action: 'v-1/appointments/cancel-appointment' },
  'POST /api/v1/appointments/create-appointment': { action: 'v-1/appointments/create-appointment' },
  'GET /api/v1/appointments/get-all-appointments-patient': { action: 'v-1/appointments/get-all-appointments-patient' },
  'GET /api/v1/appointments/get-all-appointments': { action: 'v-1/appointments/get-all-appointments' },
  'POST /api/v1/appointments/get-appointment-details': { action: 'v-1/appointments/get-appointment-details' },

  //===================== Admission  Endpoints ====================================

  'POST /api/v1/admissions/add-admission': { action: 'v-1/admissions/add-admission' },
  'POST /api/v1/admissions/discharge-patient': { action: 'v-1/admissions/discharge-patient' },
  'POST /api/v1/admissions/get-admission-details': { action: 'v-1/admissions/get-admission-details' },
  'GET /api/v1/admissions/get-all-admissions-patient': { action: 'v-1/admissions/get-all-admissions-patient' },
  'GET /api/v1/admissions/get-all-admissions': { action: 'v-1/admissions/get-all-admissions' },
  'POST /api/v1/admissions/update-admission': { action: 'v-1/admissions/update-admission' },

  //===================== Bill  Endpoints ====================================
  'POST /api/v1/bills/add-bill-services': { action: 'v-1/bills/add-bill-services' },
  'POST /api/v1/bills/delete-bill-services': { action: 'v-1/bills/delete-bill-services' },
  'POST /api/v1/bills/finialize-bill': { action: 'v-1/bills/finialize-bill' },
  'POST /api/v1/bills/pay-bill': { action: 'v-1/bills/pay-bill' },
  'POST /api/v1/bills/view-bill': { action: 'v-1/bills/view-bill' },
  'GET /api/v1/bills/get-all-bills': { action: 'v-1/bills/get-all-bills' },
  'GET /api/v1/bills/get-all-bills-patient': { action: 'v-1/bills/get-all-bills-patient' },

  //settings
  'POST /api/v1/settings/update-timezone': { action: 'v-1/settings/update-timezone' },
  'GET /api/v1/settings/set-default-role-permissions': { action: 'v-1/settings/set-default-role-permissions' },

  //dashboard
  'GET /api/v1/dashboard/dashboard': { action: 'v-1/dashboard/dashboard' },
};
