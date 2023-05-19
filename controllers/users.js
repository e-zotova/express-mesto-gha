const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { getJwtToken } = require('../utils/jwt');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then(() => {
      res.status(201).send({
        email,
        name,
        about,
        avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
      }
      if (err.code === 11000) {
        return res
          .status(ERROR_CODE_CONFLICT)
          .send({ message: 'Document already exists in database' });
      }
      return next(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(ERROR_CODE_UNAUTHORIZED)
        .send({ message: err.message });
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid data' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
      }
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
      }
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
