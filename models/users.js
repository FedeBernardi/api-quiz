var mongoose = require('mongoose');

//User Schema
var usersSchema = mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  }
});

var User = mongoose.model('User', usersSchema);

// Get Questions

module.exports.getUser = function(callback,limit){
  User.find(callback).limit(limit);
}

module.exports.addUser = function(user, callback){
  User.create(user, callback);
}

module.exports.loginUser = function(credentials, callback){
  var query = {
    username:credentials.username,
    password:credentials.password
  }
  User.find(query, callback);
}
