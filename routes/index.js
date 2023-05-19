const router = require('express').Router();
const { errors } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const authMiddleware = require('../middlewares/auth');
const { validateCreateUser, validateLoginUser } = require('../middlewares/celebrateValidation');

router.use('/signin', validateLoginUser, login);
router.use('/signup', validateCreateUser, createUser);

router.use('/users', authMiddleware, userRouter);
router.use('/cards', authMiddleware, cardRouter);
router.use('/*', authMiddleware, (req, res) => {
  res.status(404).send({ message: 'Page is not found' });
});
router.use(errors());

module.exports = router;
