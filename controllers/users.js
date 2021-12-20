const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}) // найти вообще всех пользователей и возвращаем их
    .then((users) => res.status(200).send({ data: users })) //?
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

// const getCurrentUser = (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => res.send({ data: user }))
//     .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
// };

const getCurrentUser = (req, res) => {
  return User.findOne({ id: req.params.id }) // найти вообще всех
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователя с таким id нет" });
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

// const getCurrentUser = (req, res) => {
//   res.status(200).send({ message: "Привет!", userId: req.params.userId });
// };

const createUser = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar  })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(err => res.status(500).send({ message: `Ошибка ${err.message}` }));
}



module.exports = { getUsers, getCurrentUser, createUser };
