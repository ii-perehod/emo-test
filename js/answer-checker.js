(function () {
  "use strict";

  function isAnswerCorrect(userAnswer, correctAnswer) {
    return userAnswer.trim().toUpperCase() === correctAnswer.toUpperCase();
  }

  window.AnswerChecker = { isAnswerCorrect };
})();
