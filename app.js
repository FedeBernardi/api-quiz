var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var questionsController = require('./controllers/questionsController'),
    usersController = require('./controllers/usersController');

var questionsRouter = express.Router(),
    usersRouter = express.Router();

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

questionsRouter.get('/questions', questionsController.randomQuestions);
questionsRouter.post('/questions', questionsController.addQuestion);

app.use('/api',questionsRouter);

usersRouter.get('/users', usersController.getAllUsers);
usersRouter.post('/users/login', usersController.loginUser);
usersRouter.post('/users', usersController.addUser);

app.use('/api',usersRouter);

app.listen(3001);

console.log('Running on port 3001');
