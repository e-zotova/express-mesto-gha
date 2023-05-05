const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((users) => {
      const user = users.find((item) => item._id === id);

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

const updateUserInfo = () => User.findByIdAndUpdate(

)

const updateUserAvatar = () => User.findByIdAndUpdate(

)

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar
};
