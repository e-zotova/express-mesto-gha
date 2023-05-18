const userRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { validateGetUserById, validateUpdateUserInfo } = require('../middlewares/celebrateValidation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', authMiddleware, getUsers);
userRouter.get('/me', authMiddleware, validateGetUserById, getCurrentUser);
userRouter.get('/:userId', authMiddleware, validateGetUserById, getUserById);
userRouter.patch('/me', authMiddleware, validateUpdateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', authMiddleware, validateUpdateUserInfo, updateUserAvatar);

module.exports = userRouter;
