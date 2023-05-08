const User = require("../models/user");

const handleError = (res, err) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: "Invalid input" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Invalid id" });
  } else if (err.name === "DocumentNotFoundError") {
    res.status(404).send({ message: "User is not found" });
  } else {
    res.status(500).send({ message: "Server error" });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      handleError(res, err);
    });
};

const getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const createUser = (req, res) => {
  const data = req.body;

  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      handleError(res, err);
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
      handleError(res, err);
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
      handleError(res, err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
