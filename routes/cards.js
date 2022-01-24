const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validationCardId,
  validationCreateCard,
} = require('../middlewares/validation');

router.get('/cards', getCards); // возвращает все карточки
router.post('/cards', validationCreateCard, createCard); // создаёт карточку
router.delete('/cards/:cardId', validationCardId, deleteCard); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', validationCardId, likeCard); // поставить лайк карточке
router.delete('/cards/:cardId/likes', validationCardId, dislikeCard); // убрать лайк с карточки

module.exports = router;
