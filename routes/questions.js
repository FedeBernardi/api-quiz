var express = require('express'),
    questionsController = require('../controllers/questionsController');

var questionsRouter = express.Router();

questionsRouter.get('/', questionsController.randomQuestions);
questionsRouter.post('/', questionsController.addQuestion);

module.exports = {
  questionsRouter
};
