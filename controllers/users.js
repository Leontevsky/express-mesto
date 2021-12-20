const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}) // найти вообще всех пользователей и возвращаем их
    .then((users) => res.status(200).send({ data: users })) //?
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const getUser = (req, res) => {
  return User.findById(req.params.id) // найти вообще всех
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователя с таким id нет" });
      }
      res.status(200).send({message: req.params.id, user});
    })
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.status(200).send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
}

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about})
  .then((user) => res.send({ data: user }))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar})
  .then((user) => res.send({ data: user }))
  .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar };

