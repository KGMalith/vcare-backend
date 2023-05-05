// policies/isAuthorized.js
const jwt = require('jsonwebtoken');
module.exports = async function (req, res, next) {

  // If `req.me` is set, then we know that this request originated
  // from a logged-in user.  So we can safely proceed to the next policy--
  // or, if this is the last policy, the relevant action.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, sails.config.custom.jwt_secret);
      req.user = decodedToken.result;
      return next();
    } catch (error) {
      return res.status(401).send({ status:false, message: 'Invalid token' });
    }
  }else{
    return res.status(401).send({ status:false, message: 'Missing authorization header' });
  }

};
