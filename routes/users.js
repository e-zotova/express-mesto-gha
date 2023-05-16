const userRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', authMiddleware, getUsers);
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.get('/:userId', authMiddleware, getUserById);
userRouter.patch('/me', authMiddleware, updateUserInfo);
userRouter.patch('/me/avatar', authMiddleware, updateUserAvatar);

module.exports = userRouter;
