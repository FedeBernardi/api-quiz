//The number of questions per game.
const MAX_QUESTIONS = 6;
//The number of questions in the Data Base.
const QUESTIONS_IN_DB = 20;

var mongoose = require('mongoose');

//Question Schema
var questionSchema = mongoose.Schema({
  _id: {
    type: Number,
    require: true
  },
  question:{
    type: String,
    require: true
  },
  answers:{
    type: Array,
    require: true
  },
  correctAnswer: {
    type: Number,
    require: true
  }
});

var Question = module.export = mongoose.model('Question', questionSchema);

// Get ALL Questions 
module.exports.getQuestions = function(callback,limit){
  Question.find(callback).limit(limit);
}


//Get Random questions for every game
module.exports.getRandomQuestions = function(callback){
  var query = {$or: []};
  var flag = true;
  var randArray = [];
  var randNum;
  while (flag){
    randNum = Math.floor((Math.random() * QUESTIONS_IN_DB));

    if (randArray.indexOf(randNum) === -1){
      query.$or.push({_id: randNum});
      randArray.push(randNum);
      flag = query.$or.length === MAX_QUESTIONS ? false : true;
    }
  }

  Question.find(query, callback);
}

//Makeing easy to add questions. Not an option in the React-Quiz App.
module.exports.addQuestion = function(question, callback){
  Question.create(question, callback);
}
