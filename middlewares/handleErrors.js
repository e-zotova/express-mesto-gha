const {
  ERROR_CODE_CONFLICT,
  ERROR_CODE_SERVER_ERROR,
  ERROR_MESSAGE_SERVER_ERROR,
} = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  if (err.code === 11000) {
    res
      .status(ERROR_CODE_CONFLICT)
      .send({ message: 'Document already exists in database' });
    return;
  }
  res
    .status(ERROR_CODE_SERVER_ERROR)
    .send({ message: ERROR_MESSAGE_SERVER_ERROR });

  next();
};

module.exports = handleErrors;
