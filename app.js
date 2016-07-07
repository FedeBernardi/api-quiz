var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var questionsController = require('./controllers/questionsController'),
    usersController = require('./controllers/usersController');

app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/quiz-db');
var db = mongoose.connection;

// CORS configuration in Express
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/questions', questionsController.randomQuestions);
app.post('/api/questions', questionsController.addQuestion);

app.get('/api/users', usersController.getAllUsers);
app.post('/api/users/login', usersController.loginUser);
app.post('/api/users', usersController.addUser);


app.listen(3001);

console.log('Running on port 3001');
