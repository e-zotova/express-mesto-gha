
const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;

  Card.create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const deleteCardById = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card is not found" });
      } else {
        res.send(card);
      }
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const likeCard = (req) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

const dislikeCard = (req) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
};