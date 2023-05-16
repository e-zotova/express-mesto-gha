const cardRouter = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', authMiddleware, getCards);
cardRouter.post('/', authMiddleware, createCard);
cardRouter.delete('/:cardId', authMiddleware, deleteCardById);
cardRouter.put('/:cardId/likes', authMiddleware, likeCard);
cardRouter.delete('/:cardId/likes', authMiddleware, dislikeCard);

module.exports = cardRouter;
