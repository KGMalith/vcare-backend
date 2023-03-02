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
  'GET /api/v1/roles/get-role': { action: 'v-1/roles/get-role-details' },
  'DELETE /api/v1/roles/delete-role': { action: 'v-1/roles/delete-role' },
  'POST /api/v1/roles/edit-role': { action: 'v-1/roles/edit-role' },
  'POST /api/v1/roles/update-role-permissions': { action: 'v-1/roles/update-role-permissions' },

  //User
  'POST /api/v1/users/add-user': { action: 'v-1/users/add-user' },
};
