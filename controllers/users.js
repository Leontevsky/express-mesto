const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}) // найти вообще всех пользователей и возвращаем их
    .then((users) => res.status(200).send({ data: users })) //?
    .catch((err) => res.status(500).send({ message: `Ошибка ${err.message}` }));
};

const getUser = (req, res) => {
  console.log(req.params.id)
  return User.findById(req.params.id) // найти вообще всех
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователя с таким id нет" });
      }
      res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании пользователя" })
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};


// const createUser = (req, res) => {
//   const { name, about, avatar, email, password } = req.body;
//   User.create({ name, about, avatar, email, password })
//     // вернём записанные в базу данные
//     .then((user) => res.status(200).send({ data: user }))
//     // данные не записались, вернём ошибку
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         res.status(400).send({ message: "Переданы некорректные данные при создании пользователя" })
//       } else { res.status(500).send({ message: error.message })}
//     });
// }

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, { new: true, runValidators: true })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: "Переданы некорректные данные в методы обновления профиля" })
    } else {
      res.status(500).send({ message: `Ошибка ${err.message}` })
    }
  });
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, { new: true, runValidators: true })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      res.status(400).send({
        message: "Переданы некорректные данные в методы обновления аватара",
      });
    } else {
      res.status(500).send({ message: err.message });
    }
  });
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFound("Нет пользователя с таким id");
      } else {
        bcrypt.compare(password, user.password, (error, isValid) => {
          if (error) {
            throw new BadRequest("Неверный запрос");
          }
          if (!isValid) {
            throw new BadAuth("Неправильный пароль");
          }
          if (isValid) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              "secret-key",
            );
            res
              .cookie("jwt", token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              })
              .send({ message: "Неверный логин либо пароль" });
          }
        });
      }
    })
    .catch(() => {
      throw new BadAuth("Ошибка авторизации");
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound("Нет пользователя с таким id");
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest(
          "Переданы некорректные данные в методы получения пользователя",
        );
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = { getUsers, getUser, updateUser, updateAvatar, getCurrentUser };

