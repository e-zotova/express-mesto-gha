const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const authMiddleware = require('../middlewares/auth');
const { validateCreateUser } = require('../middlewares/celebrateValidation');

router.use('/signin', login);
router.use('/signup', validateCreateUser, createUser);

router.use('/users', authMiddleware, userRouter);
router.use('/cards', authMiddleware, cardRouter);
router.use('/*', authMiddleware, (req, res) => {
  res.status(404).send({ message: 'Page is not found' });
});

module.exports = router;
