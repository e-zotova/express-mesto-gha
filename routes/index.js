const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/signin', login);
router.use('/signup', createUser);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Page is not found' });
});

module.exports = router;
