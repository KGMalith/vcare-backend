// policies/permission.js
module.exports = async function (req, res, next) {

  // Check if the user has permission to access the controller action
  if (req.userHasPermission) {
    return next();
  }

  // If the user does not have permission, return a 403 Forbidden response
  return res.status(403).send({ message: 'User does not have permission to access this resource' });

};
