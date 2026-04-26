(function () {
  "use strict";

  const { loadState, recordAnswer } = window.TrainerStore;
  const { isAnswerCorrect } = window.AnswerChecker;
  const { bindResetButton } = window.ResetButton;

  const FEEDBACK_DELAY_MS = 700;

  const state = loadState();

  if (state.currentIndex >= state.questions.length) {
    window.location.href = "answers.html";
    return;
  }

  preloadImages(state.questions);
  renderCurrentQuestion();
  bindAnswerForm();
  bindResetButton();

  function preloadImages(questions) {
    for (const question of questions) {
      const preloader = new Image();
      preloader.src = question.image;
    }
  }

  function getCurrentQuestion() {
    return state.questions[state.currentIndex];
  }

  function renderCurrentQuestion() {
    const question = getCurrentQuestion();
    renderStimulus(question);
    renderPrompt(question.correctAnswer);
    updateSteps(state.currentIndex);
    resetForm();
  }

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
    steps.forEach((step, index) => {
      step.classList.remove("step--done", "step--current");
      if (index < activeIndex) {
        step.classList.add("step--done");
      } else if (index === activeIndex) {
        step.classList.add("step--current");
      }
    });
  }

  function resetForm() {
    const input = document.querySelector(".answer-input");
    const submitButton = document.querySelector(".submit-button");
    input.value = "";
    input.disabled = false;
    submitButton.disabled = false;
    submitButton.classList.remove("submit-button--correct");
    input.focus();
  }

  function bindAnswerForm() {
    const form = document.querySelector(".answer-form");
    const input = document.querySelector(".answer-input");
    const submitButton = form.querySelector(".submit-button");
    let submissionLock = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (submissionLock) {
        return;
      }
      submissionLock = true;

      const value = input.value.trim();
      const question = getCurrentQuestion();
      const match = isAnswerCorrect(value, question.correctAnswer);

      submitButton.disabled = true;
      input.disabled = true;
      if (match) {
        submitButton.classList.add("submit-button--correct");
      }

      setTimeout(() => {
        recordAnswer(state, value);
        if (state.currentIndex >= state.questions.length) {
          window.location.href = "answers.html";
        } else {
          renderCurrentQuestion();
          submissionLock = false;
        }
      }, FEEDBACK_DELAY_MS);
    });
  }
})();
