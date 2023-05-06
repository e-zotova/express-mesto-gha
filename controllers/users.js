const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User is not found" });
      } else {
        res.send(user);
      }
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const createUser = (req, res) => {
  const data  = req.body;

  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const updateUserInfo = (req, res) => {

  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => {
      res.send(user)
    })
    .catch(() => res.status(500).send({ message: "Server error" }))
}

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => {
      res.send(user)
    })
    .catch(() => res.status(500).send({ message: "Server error" }))
  }

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
