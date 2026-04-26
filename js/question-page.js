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
    steps.forEach((step, i) => {
      step.classList.remove("step--done", "step--current");
      if (i < activeIndex) {
        step.classList.add("step--done");
      } else if (i === activeIndex) {
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
    let isProcessing = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isProcessing) {
        return;
      }
      isProcessing = true;

      const value = input.value.trim();
      const question = getCurrentQuestion();
      const correct = isAnswerCorrect(value, question.correctAnswer);

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
          renderCurrentQuestion();
          isProcessing = false;
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
