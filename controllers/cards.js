const Card = require("../models/card");
const ERROR_CODE_INVALID_INPUT = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;
const ERROR_MESSAGE_SERVER_ERROR = "Server error";

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR })
    );
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;

  Card.create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalud input" });
        return;
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
          return;
      }
    });
};

const deleteCardById = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
        return;
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
        return;
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
        return;
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
        return;
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
        return;
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
        return;
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
        return;
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
        return;
      } else {
        res
          .status(ERROR_CODE_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE_SERVER_ERROR });
        return;
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
