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
  jwt_secret:'a7pn8JRawzweVdWZ',
  default_password:'Test123',
  aws_key:'',
  aws_secret_key:'',
  aws_user_image_bucket:'',
  aws_employee_image_bucket:'',
  aws_employee_document_bucket:'',
  encryption_key:'d6nKFeuhB5puzMaV',
  sendinblueSecret: '',
  frontend_base_url:'http://localhost:3000/',


  //sendinblue email templates ids
  user_signup_invitation:9,
  user_password_reset:10,
  user_account_deactivated:11,
  user_account_reactivated:12,
  welcome:14,
  email_verify:15,
  forgot_password:16,
  patient_appointment_confirmed:17,
  doctor_new_appointment:18,
  appointment_cancelled:19,


  //constants
  user_active:1,
  user_deactivated:-10,

  role_permission_active:1,
  role_permission_deactive:0,

  hospital_room_available:1,
  hospital_room_taken:10,
  hospital_room_cleaning:0,
  hospital_room_closed_for_maintenance:-10,

  hospital_service_active:1,
  hospital_service_inactive:0,

  appointment_active:1,
  appointment_cancel:0,

  //s3
  s3_key:'',
  s3_secret:'',
  s3_bucket:'',
  user_images_dir:'',
  employee_images_dir:'',
  employee_document_dir:'',
  patient_images_dir:'',
  patient_document_dir:'',
  doctor_images_dir:'',
};
