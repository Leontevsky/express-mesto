// директория models/user.js содержит файлы описания схемы пользователя
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  // name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true, //оно должно быть у каждого пользователя, так что имя — обязательное поле
    default: "Жак-Ив Кусто",
  },
  // about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: "Исследователь",
  },
  // avatar — ссылка на аватарку, строка, обязательное поле.
  avatar: {
    type: String,
    required: true,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("user", userSchema); // Мы передали методу mongoose.model два аргумента: имя модели и схему, которая описывает будущие документы.
