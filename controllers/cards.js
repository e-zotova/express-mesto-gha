const Card = require("../models/card");

const handleError = (res, err) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: "Invalid input" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Invalid id" });
  } else if (err.name === "DocumentNotFound") {
    res.status(404).send({ message: "Card is not found" });
  } else {
    res.status(500).send({ message: "Server error" });
  }
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      handleError(res, err);
    });
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;

  Card.create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteCardById = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      handleError(res, err);
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
      handleError(res, err);
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
      handleError(res, err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
