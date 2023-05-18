const cardRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  validateCreateCard,
  validateDeleteCardById,
  validateLikeCard,
  validateDislikeCard,
} = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', authMiddleware, getCards);
cardRouter.post('/', authMiddleware, validateCreateCard, createCard);
cardRouter.delete('/:cardId', authMiddleware, validateDeleteCardById, deleteCardById);
cardRouter.put('/:cardId/likes', authMiddleware, validateLikeCard, likeCard);
cardRouter.delete('/:cardId/likes', authMiddleware, validateDislikeCard, dislikeCard);

module.exports = cardRouter;
