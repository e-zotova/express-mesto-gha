
const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const createCard = (req, res) => {
  console.log(req.user._id);

  const {name, like}  = req.body;

  Card.create({name, like})
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const deleteCardById = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((cards) => {
      const card = cards.find((item) => item._id === id);

      if (!card) {
        return res.status(404).send({ message: "User is not found" });
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