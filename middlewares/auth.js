const { isAuthorized } = require('../utils/jwt');
const { ERROR_CODE_UNAUTHORIZED } = require('../utils/constants');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const isAuth = await isAuthorized(authorization);

  if (!isAuth || !authorization.startsWith('Bearer ')) {
    return res
      .status(ERROR_CODE_UNAUTHORIZED)
      .send({ message: 'Authorization is required' });
  }

  return next();
};

module.exports = auth;
