// // подключение express
// const express = require('express');
// создание роутера
const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validationUpdateAvatar,
  validationUpdateProfile,
  validationUserId,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', validationUserId, getUser);
router.patch('/users/me', validationUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

// (req, res) => {
//   res.status(200).send({ message: 'Привет /post!' });
// }

module.exports = router;
