const handleError = (err, req, res, next) => {
  res
    .status(err.status)
    .send({ message: err.status === 500 ? 'Server error' : err.message });

  return next();
};

module.exports = handleError;
