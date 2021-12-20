// Поля схемы пользователя:

// директория models/user.js содержит файлы описания схемы пользователя
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  // name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true, //оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  // about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  // avatar — ссылка на аватарку, строка, обязательное поле.
  avatar: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("user", userSchema); // Мы передали методу mongoose.model два аргумента: имя модели и схему, которая описывает будущие документы.
