const { verifyJwtToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization is required'));
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Authorization is required'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
