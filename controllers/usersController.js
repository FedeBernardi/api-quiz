var jwt = require('jsonwebtoken');
var User = require('../models/users');
var config = require('../config');

function addUser(req, res) {
  var user = req.body;
  User.addUser(user, (err, data) => {
    if(err){
      throw err;
    }
    res.json(data);
  })
}

//All users are returned except the current user.
function getAllUsers(req, res) {
  var currentUser = new RegExp(req.body.username);
  User.getUser(currentUser, (err, data) => {
    if(err){
      throw err;
    }
    res.json(data);
  })
}

function loginUser(req, res) {
  var creds = req.body;

  User.loginUser(creds, (err, data) => {
    if(err){
      throw err;
    }

    if(data.length == 0) {
      res.status(204);
      sendData = {
        error: 'Incorrect username or password'
      };
    } else {
      var username = data[0].username;
      var token = jwt.sign({username}, config.secret, {expiresIn: '10h'});
      sendData = {
        username,
        token
      };
    }

    res.json(sendData);
  })
}

function autoLogin(req, res) {
  var authHeader = req.headers.authorization,
      token = authHeader.split(" ")[1],
      username = getUsernameFromDecodedToken(token),
      sendData;

  User.autoLogin(username, (err, data) => {
    if(err){
      res.status(401);
      throw err;
    }

    if (data.length == 0) {
      res.status(204);
      sendData = {
        error: 'Incorrect username'
      };
    } else {
      sendData = data[0];
    }

    res.json(sendData);
  })
}

// Decodes the given token.
//
// @parameters: String token
// @return: String
function decodeJwt (token) {
    var base64Url = token.split('.')[1],
        base64 = base64Url.replace('-', '+').replace('_', '/'),
        buffer = Buffer(base64, 'base64'),
        json = JSON.parse(buffer);

    return json;
};

// Gets the username from the payload of the token.
//
// @parameters: String token
function getUsernameFromDecodedToken(token) {
  var json = decodeJwt(token);

  return json.username;
}

module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  autoLogin
}