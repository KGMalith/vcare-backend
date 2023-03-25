module.exports = function(permissionNumber) {
  return function(req, res, next) {
    if (req.user && req.user.permissions && req.user.permissions.includes(permissionNumber)) {
      return next();
    } else {
      return res.status(403).send({ message: 'User does not have permission to access this resource' });
    }
  };
};
