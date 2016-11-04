var jwt = require('jsonwebtoken');
var User = require('../models/users');
var config = require('../config');

function addUser(req, res){
  var user = req.body;
  User.addUser(user, function(err, data){
    if(err){
      throw err;
    }
    res.json(data);
  })
}

//All users are returned except the current user.
function getAllUsers(req, res){
  var currentUser = new RegExp(req.body.username);
  User.getUser(currentUser, function(err, data){
    if(err){
      throw err;
    }
    res.json(data);
  })
}

function loginUser(req, res){
  var creds = req.body;
  User.loginUser(creds, function(err, data){
    if(err){
      throw err;
    }

    if(data.length == 0) {
      sendData = {
        error: 'Incorrect username or password'
      };
      res.status(204);
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

module.exports = {
  getAllUsers,
  addUser,
  loginUser
}