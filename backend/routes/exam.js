const express = require('express');
const Question = require('../models/Question');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/questions', protect, async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
  res.json(questions);
});

router.post('/submit', protect, async (req, res) => {
  const { answers } = req.body;
  const questionIds = Object.keys(answers);
  const questions = await Question.find({ _id: { $in: questionIds } });
  let score = 0;
  questions.forEach((q) => {
    if (answers[q._id] === q.correctIndex) score++;
  });
  res.json({ score });
});

module.exports = router;
