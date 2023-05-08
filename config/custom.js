/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  jwt_secret: 'a7pn8JRawzweVdWZ',
  default_password: 'Test123',
  encryption_key: 'd6nKFeuhB5puzMaV',
  sendinblueSecret: '',
  frontend_base_url: 'http://localhost:3000/',


  //sendinblue email templates ids
  user_signup_invitation: 9,
  user_password_reset: 10,
  user_account_deactivated: 11,
  user_account_reactivated: 12,
  welcome: 14,
  email_verify: 15,
  forgot_password: 16,
  patient_appointment_confirmed: 17,
  doctor_new_appointment: 18,
  appointment_cancelled: 19,
  bill_finalised: 20,
  bill_paid: 21,


  //constants
  user_active: 1,
  user_deactivated: -10,
  user_signup_complete: 1,
  user_signup_incomplete: 0,
  user_password_reset_request_active: 1,
  user_password_reset_request_inactive: 0,
  user_invitation_sent: 1,
  user_invitation_not_sent: 1,
  user_account_available: 1,
  user_account_not_available: 0,

  role_permission_active: 1,
  role_permission_deactive: 0,
  admin_role_id: 1,
  patient_role_id: 2,
  doctor_role_id: 3,

  hospital_room_available: 1,
  hospital_room_taken: 10,
  hospital_room_cleaning: 0,
  hospital_room_closed_for_maintenance: -10,
  hospital_room_waiting_for_cleaning: 20,

  hospital_service_active: 1,
  hospital_service_inactive: 0,
  is_apply_to_every_admission_true: 1,
  is_apply_to_every_admission_false: 0,
  is_apply_to_every_appointment_true: 1,
  is_apply_to_every_appointment_false: 0,

  appointment_active: 1,
  appointment_cancel: 0,

  //s3
  s3_key: '',
  s3_secret: '',
  s3_bucket: 'v-care-s3',
  user_images_dir: 'member',
  employee_images_dir: 'member',
  employee_document_dir: 'member',
  patient_images_dir: 'patient',
  patient_document_dir: 'patient',
  doctor_images_dir: 'doctor',
};
