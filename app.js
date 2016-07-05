var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

var Questions = require('./models/questions');
var User = require('./models/users');
// Connect to Mongoose
mongoose.connect('mongodb://localhost/quiz-db');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Please use another ENDPOINT');
});

app.get('/api/questions',function(req, res){
  Questions.getQuestions(function(err, questions){
    if(err){
      throw err;
    }
    res.json(questions);
  })
})

app.post('/api/questions',function(req, res){
  var question = req.body;
  Questions.addQuestion(question, function(err, question){
    if(err){
      throw err;
    }
    res.json(question);
  })
})

app.post('/api/users',function(req, res){
  var user = req.body;
  User.addUser(user, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  })
});


app.get('/api/users',function(req, res){
  User.getUser(function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  })
})


app.listen(3000);

console.log('Running on port 3000');