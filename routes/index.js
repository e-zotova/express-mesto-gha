const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const authMiddleware = require('../middlewares/auth');
const { validateCreateUser, validateLoginUser } = require('../middlewares/celebrateValidation');

router.use('/signin', validateLoginUser, login);
router.use('/signup', validateCreateUser, createUser);

router.use(authMiddleware);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Page is not found' });
});

module.exports = router;
