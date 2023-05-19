const Card = require('../models/card');
const { ERROR_CODE_FORBIDDEN, ERROR_CODE_CONFLICT } = require('../utils/constants');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_NOT_FOUND,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  req.body.owner = req.user.id;

  Card.create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid input' });
      }
      if (err.code === 11000) {
        return res
          .status(ERROR_CODE_CONFLICT)
          .send({ message: 'Document already exists in database' });
      }
      return next(err);
    });
};

const deleteCardById = (req, res, next) => {
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
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_INVALID_INPUT)
          .send({ message: 'Invalid id' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Card is not found' });
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
