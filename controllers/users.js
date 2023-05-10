const User = require('../models/user');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_SERVER_ERROR,
  ERROR_MESSAGE_SERVER_ERROR,
} = require('../utils/constants');

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
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const createUser = (req, res) => {
  const data = req.body;

  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
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

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
        return;
      }
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
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'User is not found' });
        return;
      }
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
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
