// подключение express
const express = require("express");
// создание роутера
const router = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  createUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getCurrentUser);
router.post("/users", createUser);

// (req, res) => {
//   res.status(200).send({ message: "Привет /post!" });
// }

module.exports = router;


