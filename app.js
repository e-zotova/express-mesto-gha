const express = require("express");
const { PORT = 3000 } = process.env;
const router = require("./routes");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.listen(PORT, () => console.log("Сервер запущен."));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "6455017f7f2b12b403f90c6d",
  };

  next();
});

app.use(router);
