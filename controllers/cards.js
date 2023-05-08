const Card = require("../models/card");
const ERROR_CODE_INVALID_INPUT = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;
const ERROR_MESSAGE_SERVER_ERROR = "Server error";

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR }));
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
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
      }
    });
};

const deleteCardById = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
      if (!card) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
      if (!card) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: "Card is not found" });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE_INVALID_INPUT).send({ message: "Invalid id" });
      } else {
        res.status(ERROR_CODE_SERVER_ERROR).send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
