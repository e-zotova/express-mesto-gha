const userRouter = require('express').Router();
const { validateGetUserById, validateUpdateUserInfo } = require('../middlewares/celebrateValidation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', validateGetUserById, getCurrentUser);
userRouter.get('/:userId', validateGetUserById, getUserById);
userRouter.patch('/me', validateUpdateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', validateUpdateUserInfo, updateUserAvatar);

module.exports = userRouter;
