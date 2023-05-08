const User = require("../models/user");
const ERROR_CODE_INVALID_INPUT = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;
const ERROR_MESSAGE_SERVER_ERROR = "Server error";

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR })
    );
};

const getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: "User is not found" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid id" });
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid input" });
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid input" });
      } else if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid id" });
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid input" });
      } else if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: "Invalid id" });
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
