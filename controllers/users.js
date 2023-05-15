const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_SERVER_ERROR,
  ERROR_MESSAGE_SERVER_ERROR,
} = require('../utils/constants');

const createUser = (req, res) => {
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
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(ERROR_CODE_CONFLICT)
          .send({ message: 'User already exists' });
        return;
      }
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then(() => {
          res.send({
            token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }),
          });
        });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'DocumentNotFoundError' || password !== err.password) {
        res
          .status(ERROR_CODE_UNAUTHORIZED)
          .send({ message: 'Incorrect email or password' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(ERROR_CODE_SERVER_ERROR)
      .send({ message: ERROR_MESSAGE_SERVER_ERROR }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
