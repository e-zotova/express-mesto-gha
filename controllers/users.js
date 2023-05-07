const User = require("../models/user");
const ERROR_CODE_INVALID_INPUT = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;
const ERROR_MESSAGE_SERVER_ERROR = "Server error";

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR }));
};

const getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "User validation failed" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const createUser = (req, res) => {
  const data = req.body;

  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "User validation failed" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "User validation failed" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "User validation failed" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
