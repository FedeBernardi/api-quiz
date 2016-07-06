var User = require('../models/users');

function addUser(req, res){
  var user = req.body;
  User.addUser(user, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  })
}

function getAllUsers(req, res){
  User.getUser(function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  })
}

module.exports = {
  getAllUsers,
  addUser
}