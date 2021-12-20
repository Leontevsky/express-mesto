// // подключение express
// const express = require("express");
// создание роутера
const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser); //обновляет профиль
router.patch("/users/me/avatar", updateAvatar); //обновляет аватар

// (req, res) => {
//   res.status(200).send({ message: "Привет /post!" });
// }

module.exports = router;


