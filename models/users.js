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

var User = module.export = mongoose.model('User', usersSchema);

// Get Questions

module.exports.getUser = function(callback,limit){
  User.find(callback).limit(limit);
}

module.exports.addUser = function(user, callback){
  User.create(user, callback);
}