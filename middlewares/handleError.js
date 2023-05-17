const {
  ERROR_MESSAGE_SERVER_ERROR,
} = require('../utils/constants');

const handleError = (err, req, res, next) => {
  res
    .status(err.status)
    .send({ message: err.status === 500 ? ERROR_MESSAGE_SERVER_ERROR : err.message });

  next();
};

module.exports = handleError;
