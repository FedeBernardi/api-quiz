var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressJWT = require('express-jwt');

var config = require('./config');

var questionsController = require('./controllers/questionsController'),
    usersController = require('./controllers/usersController');

var questionsRouter = express.Router(),
    usersRouter = express.Router();

app.use(bodyParser.json());
//Applying expressJWT middleware
//THIS IS NOT WORKING, NEEDS TO BE CHECKED
app.use(expressJWT({ secret: config.secret }).unless({ path: ['api/users/login'] }));

// Connect to Mongoose
mongoose.connect(config.database);
var db = mongoose.connection;



// CORS configuration in Express
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

usersRouter.get('/users', usersController.getAllUsers);
usersRouter.post('/users/login', usersController.loginUser);
usersRouter.post('/users', usersController.addUser);

app.use('/api',usersRouter);


questionsRouter.get('/questions', questionsController.randomQuestions);
questionsRouter.post('/questions', questionsController.addQuestion);

app.use('/api',questionsRouter);



app.listen(3001);

console.log('Running on port 3001');
