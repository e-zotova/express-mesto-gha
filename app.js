const express = require('express');
const { PORT = 3000 } = process.env;
const router = require('./routes');
const userRouter = require('./users');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => console.log('Сервер запущен.'));

app.use(router);
app.use(userRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
