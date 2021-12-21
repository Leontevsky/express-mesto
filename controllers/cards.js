const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards })) //?
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  Card.create(req.user._id, {name, link, owner })
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
  .then((card) => res.status(200).send({message: "Удалили карточку"}))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then((info) => res.status(200).send({message: "Поставили лайк"}))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }))
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then((info) => res.status(200).send({message: "Поставили лайк"}))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }))
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };