// директория models/card.js содержит файлы описания схемы карточки
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  // name — имя карточки, строка от 2 до 30 символов, обязательное поле;
  name: {
    type: String,
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  // link — ссылка на картинку, строка, обязательно поле.
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Невалидный link',
    },
  },
  // owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // likes — список лайк-их пост пользователей, массив ObjectId,
  // по умолчанию — пустой массив (поле default);
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  // createdAt — дата создания, тип Date, значение по умолчанию Date.now.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema); // Мы передали методу mongoose.model два аргумента: имя модели и схему, которая описывает будущие документы.
