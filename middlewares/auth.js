const { verifyJwtToken } = require('../utils/jwt');

const { ERROR_CODE_UNAUTHORIZED } = require('../utils/constants');

const handleAuthError = (res) => {
  res
    .status(ERROR_CODE_UNAUTHORIZED)
    .send({ message: 'Authorization is required' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  return next();
};

module.exports = auth;
