const Card = require('../models/card');

const {
  ERROR_CODE_INVALID_INPUT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_SERVER_ERROR,
  ERROR_MESSAGE_SERVER_ERROR,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res
      .status(ERROR_CODE_SERVER_ERROR)
      .send({ message: ERROR_MESSAGE_SERVER_ERROR }));
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
          .send({ message: 'Invalud input' });
        return;
      }
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
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
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
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
      res
        .status(ERROR_CODE_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE_SERVER_ERROR });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
