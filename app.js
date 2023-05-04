const express = require('express');
const { PORT = 3000 } = process.env;
const router = require('./routes');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => console.log('Сервер запущен.'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: '64540889914069af10c793d7'
  };

  next();
});
