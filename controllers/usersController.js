var User = require('../models/users');

function addUser(req, res){
  var user = req.body;
  User.addUser(user, function(err, data){
    if(err){
      throw err;
    }
    res.json(data);
  })
}

function getAllUsers(req, res){
  User.getUser(function(err, data){
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
    res.json(data);
  })
}

module.exports = {
  getAllUsers,
  addUser,
  loginUser
}