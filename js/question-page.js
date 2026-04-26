(function () {
  "use strict";

  const { loadState, resetState, recordAnswer } = window.TrainerStore;
  const { isAnswerCorrect } = window.AnswerChecker;

  const FEEDBACK_DELAY_MS = 700;

  const state = loadState();

  if (state.currentIndex >= state.questions.length) {
    window.location.href = "answers.html";
    return;
  }

  const currentQuestion = state.questions[state.currentIndex];

  renderStimulus(currentQuestion);
  renderPrompt(currentQuestion.correctAnswer);
  updateSteps(state.currentIndex);
  bindAnswerForm();
  bindResetButton();

  function renderStimulus(question) {
    const stimulus = document.querySelector(".stimulus");
    stimulus.src = question.image;
    stimulus.alt = question.alt;
  }

  function renderPrompt(correctAnswer) {
    const prompt = document.querySelector(".prompt");
    const word = correctAnswer.charAt(0) + correctAnswer.slice(1).toLowerCase();
    prompt.textContent = `Напечатай: ${word}`;
  }

  function updateSteps(activeIndex) {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step, i) => {
      step.classList.remove("step--done", "step--current");
      if (i < activeIndex) {
        step.classList.add("step--done");
      } else if (i === activeIndex) {
        step.classList.add("step--current");
      }
    });
  }

  function bindAnswerForm() {
    const form = document.querySelector(".answer-form");
    const input = document.querySelector(".answer-input");
    const submitButton = form.querySelector(".submit-button");
    let isProcessing = false;
    input.focus();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isProcessing) {
        return;
      }
      isProcessing = true;

      const value = input.value.trim();
      const correct = isAnswerCorrect(value, currentQuestion.correctAnswer);

      submitButton.disabled = true;
      input.disabled = true;
      if (correct) {
        submitButton.classList.add("submit-button--correct");
      }

      setTimeout(() => {
        recordAnswer(state, value);
        if (state.currentIndex >= state.questions.length) {
          window.location.href = "answers.html";
        } else {
          window.location.reload();
        }
      }, FEEDBACK_DELAY_MS);
    });
  }

  function bindResetButton() {
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      resetState();
      window.location.href = "index.html";
    });
  }
})();
