const Card = require('../models/card');
const handleErrors = require('../middlewares/handleErrors');
const { ERROR_CODE_FORBIDDEN } = require('../utils/constants');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, req, res));
};

const createCard = (req, res) => {
  req.body.owner = req.user._id;

  Card.create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
        return;
      }
      handleErrors(err, req, res);
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user.id) {
        res
          .status(ERROR_CODE_FORBIDDEN)
          .send({ message: 'Authorization is required' });
      }
      return card.deleteOne();
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
        return;
      }
      handleErrors(err, req, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
        return;
      }
      handleErrors(err, req, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
        return;
      }
      handleErrors(err, req, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
