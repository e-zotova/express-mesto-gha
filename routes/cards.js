const cardRouter = require('express').Router();
const {
  validateCreateCard,
  validateCardById,
} = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateCardById, deleteCardById);
cardRouter.put('/:cardId/likes', validateCardById, likeCard);
cardRouter.delete('/:cardId/likes', validateCardById, dislikeCard);

module.exports = cardRouter;
