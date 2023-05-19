const handleError = (err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.statusCode === 500 ? 'Server error' : err.message });

  return next();
};

module.exports = handleError;
