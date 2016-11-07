var express = require('express');

var config = require('../config');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.post('/all', usersController.getAllUsers);
usersRouter.post('/login', usersController.loginUser);
usersRouter.post('/registration', usersController.addUser);
usersRouter.post('/auto-login', usersController.autoLogin);

module.exports = {
  usersRouter
};
