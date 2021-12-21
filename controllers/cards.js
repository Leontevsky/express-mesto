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
  // .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
  .catch((err) => {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные в методы создания карточки",
      });
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};


// const deleteCard = (req, res) => {
//   Card.findByIdAndRemove(req.params._id)
//   .then((card) => res.status(200).send({message: "Удалили карточку"}))
//   .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
// }

const deleteCard = (req, res) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.id })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }
      return res.status(200).send("Удалили карточку");
    })
    .catch((err) => {
      if (err.name === "Error") {
        res.status(400).send({
          message: "Переданы некорректные данные в методы удалении карточки",
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};


const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  // .then((info) => res.status(200).send({message: "Поставили лайк"}))
  // .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }))
  .then((data) => {
    if (!data) {
      return res.status(404).send({ message: "Нет данных" });
    }
    return res.status(200).send("Лайк поставлен");
  })
  .catch((err) => {
    if (err.name === "Error") {
      res.status(400).send({
        message: "Переданы некорректные данные для лайка",
      });
    } else {
      res.status(500).send({ message: err.message });
    }
  });
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  // .then((info) => res.status(200).send({message: "Поставили лайк"}))
  // .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }))
  .then((data) => {
    if (!data) {
      return res.status(404).send({ message: "Нет данных" });
    }
    return res.status(200).send("Лайк убран");
  })
  .catch((err) => {
    if (err.name === "CastError") {
      res.status(400).send({
        message: "Переданы некорректные данные для удаления лайка",
      });
    } else {
      res.status(500).send({ message: err.message });
    }
  });
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };