var express = require('express'),
    expressJWT = require('express-jwt');

var config = require('../config');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.use(expressJWT({ secret: config.secret }).unless({ path: ['/users/login'] }));

usersRouter.get('/',usersController.getAllUsers);
usersRouter.post('/login',usersController.loginUser);
usersRouter.post('/',usersController.addUser);

module.exports = {
  usersRouter
};
