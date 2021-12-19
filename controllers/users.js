const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({}) // найти вообще всех
    .then((users) => res.status(200).send({ data: users })) //?
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const getCurrentUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

// const getCurrentUser = (req, res) => {
//   User.find({}) // найти вообще всех
//     .then((users) => users.find((user) => user.id === req.params.id))
//     .then((user) => {
//       if (!user) {
//         res.status(404).send({ message: "Пользователя с таким id нет" });
//       }
//       res.status(200).send(user);
//     })
//     .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
// };

// const getCurrentUser = (req, res) => {
//   res.status(200).send({ message: "Привет!", userId: req.params.userId });
// };

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

module.exports = { getUsers, getCurrentUser, createCard };
