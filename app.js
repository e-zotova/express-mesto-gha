const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const router = require('./routes');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6455017f7f2b12b403f90c6d',
  };

  next();
});

app.use(router);
app.use(helmet());

app.listen(PORT, () => console.log('Server is started.'));
