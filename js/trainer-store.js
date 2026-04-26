(function () {
  "use strict";

  const STORAGE_KEY = "emo-trainer-state";

  function shuffle(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function createInitialState() {
    return {
      questions: shuffle(window.QUESTIONS),
      currentIndex: 0,
      answers: []
    };
  }

  function isValidState(value) {
    return value
      && Array.isArray(value.questions)
      && Array.isArray(value.answers)
      && typeof value.currentIndex === "number";
  }

  function loadState() {
    const storedJson = sessionStorage.getItem(STORAGE_KEY);
    if (storedJson) {
      try {
        const parsedState = JSON.parse(storedJson);
        if (isValidState(parsedState)) {
          return parsedState;
        }
      } catch {
        // повреждённое хранилище — пересоздаём ниже
      }
    }
    const freshState = createInitialState();
    saveState(freshState);
    return freshState;
  }

  function saveState(state) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function resetState() {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  function recordAnswer(state, answer) {
    state.answers.push(answer);
    state.currentIndex += 1;
    saveState(state);
  }

  window.TrainerStore = {
    loadState,
    saveState,
    resetState,
    recordAnswer
  };
})();
