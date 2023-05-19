const { verifyJwtToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

const handleAuthError = (next) => next(new UnauthorizedError('Authorization is required'));

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(handleAuthError(next));
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    return next(handleAuthError(next));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
