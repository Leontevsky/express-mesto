// Сервер mongo запускают командой mongod или
// brew services start mongodb-community@4.4 до запуска Node.js:

// подключение express
const express = require('express');
// подключение mongoose
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// подключение router
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  validationLogin,
  validationCreateUser,
} = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
//  Настройка порта, который слушает приложение. По умолчанию 3000. Взяли из переменной окружения
const { PORT = 3000 } = process.env;
// или 2 вариант: const PORT = process.env.PORT || 3000
// создание приложения методом express
const app = express();
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use(() => {
  throw new NotFound('Роутер не найден');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

// Прослушиваем подключение на порту 3000
app.listen(PORT, () => {
  // console.log('Ссылка на сервер:');
  // console.log(BASE_PATH);
  // console.log(`Приложение App слушает порт: ${PORT}`);
});
