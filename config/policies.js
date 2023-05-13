/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': ['isAuthorized'], //Everything restrict here

  'v-1/users': {
    'sign-in': true,
    'validate-token': true,
  },
  'v-1/patient': {
    'sign-in': true,
    'sign-up':true,
    'forgot-password': true,
    'reset-password':true,
    'validate-token': true,
  },
  'v-1/doctor': {
    'sign-in': true,
    'sign-up':true,
    'forgot-password': true,
    'reset-password':true,
    'validate-token': true,
  },
  'v-1/settings/set-default-role-permissions':true,
};
