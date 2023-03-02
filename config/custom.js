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
  sendinblueSecret: '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',
  frontend_base_url:'http://localhost:3000/',


  //sendinblue email templates ids
  user_signup_invitation:9,
  user_password_reset:10,
  user_account_deactivated:11,
  user_account_reactivated:12,


  //constants
  user_active:1,
  user_deactivated:-10
};
