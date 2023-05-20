const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

const { PORT = 3000 } = process.env;
const router = require('./routes');
const handleErrorMiddleware = require('./middlewares/handleError');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(helmet());
app.use(limiter);
app.use(handleErrorMiddleware);

app.listen(PORT, () => console.log('Server is started.'));
