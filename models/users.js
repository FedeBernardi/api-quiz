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

module.exports.getUser = function(currentUser,callback,limit) {
  User.find({username: { $not : currentUser}}, callback).limit(limit);
}

module.exports.addUser = function(user, callback) {
  User.create(user, callback);
}

module.exports.loginUser = function(credentials, callback) {
  var query = {
    username:credentials.username,
    password:credentials.password
  }
  User.find(query, callback);
}

module.exports.autoLogin = function(username, callback) {
  User.find({ username: username }, { password: 0 }, callback);
}
