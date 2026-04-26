(function () {
  "use strict";

  const STORAGE_KEY = "emo-trainer-state";

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
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
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (isValidState(parsed)) {
          return parsed;
        }
      } catch {
        // повреждённое хранилище — пересоздаём ниже
      }
    }
    const fresh = createInitialState();
    saveState(fresh);
    return fresh;
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
