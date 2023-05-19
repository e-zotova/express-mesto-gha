const userRouter = require('express').Router();
const { validateUserById, validateUpdateUserInfo, validateUpdateAvatar } = require('../middlewares/celebrateValidation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserById, getUserById);
userRouter.patch('/me', validateUpdateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = userRouter;
