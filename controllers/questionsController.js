var Questions = require('../models/questions');

function randomQuestions(req, res){
  Questions.getRandomQuestions(function(err, questions){
    if(err){
      throw err;
    }
    res.json(questions);
  })
}

function addQuestion(req, res){
  var question = req.body;
  Questions.addQuestion(question, function(err, question){
    if(err){
      throw err;
    }
    res.json(question);
  })
}

module.exports = {
  randomQuestions,
  addQuestion
};
