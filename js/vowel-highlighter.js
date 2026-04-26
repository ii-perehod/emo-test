(function () {
  "use strict";

  const VOWELS = new Set(["А", "Е", "И", "О", "У", "Ы", "Э", "Ю", "Я"]);

  function renderHighlightedWord(target, word) {
    target.replaceChildren();
    for (const char of word) {
      if (VOWELS.has(char)) {
        const span = document.createElement("span");
        span.className = "vowel";
        span.textContent = char;
        target.appendChild(span);
      } else {
        target.appendChild(document.createTextNode(char));
      }
    }
  }

  window.VowelHighlighter = { renderHighlightedWord };
})();
