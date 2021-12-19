// Сервер mongo запускают командой mongod или brew services start mongodb-community@4.4 до запуска Node.js:

// подключение express
const express = require("express");
// подключение router
const router = require("./routes/users");
// подключение mongoose
const mongoose = require("mongoose");
//  Настройка порта, который слушает приложение. По умолчанию 3000. Взяли из переменной окружения
const { PORT = 3000, BASE_PATH } = process.env; // или 2 вариант: const PORT = process.env.PORT || 3000
// создание приложения методом express
const app = express();

app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {});

// Прослушиваем подключение на порту 3000
app.listen(PORT, () => {
  console.log("Ссылка на сервер:");
  console.log(BASE_PATH);
  console.log(`Приложение App слушает порт: ${PORT}`);
});
