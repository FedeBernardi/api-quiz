var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var config = require('./config');

var questionsRouter = require('./routes/questions'),
    usersRouter = require('./routes/users');

// Connect to Mongoose
mongoose.connect(config.database);
var db = mongoose.connection;

app.use(bodyParser.json());

// CORS configuration in Express
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users',usersRouter.usersRouter);
app.use('/questions',questionsRouter.questionsRouter);

app.listen(3001);

console.log('Running on port 3001');
