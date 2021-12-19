// подключение express
const express = require('express');
//  Настройка порта, который слушает приложение. По умолчанию 3000. Взяли из переменной окружения
const { PORT = 3000, BASE_PATH } = process.env; // или 2 вариант: const PORT = process.env.PORT || 3000
// создание приложения методом express
const app = express();

// Прослушиваем подключение на порту 3000
app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(process.env);
  console.log(`Приложение App слушает порт: ${PORT}`);
});
