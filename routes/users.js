var express = require('express');

var config = require('../config');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.get('/',usersController.getAllUsers);
usersRouter.post('/login',usersController.loginUser);
usersRouter.post('/',usersController.addUser);

module.exports = {
  usersRouter
};
