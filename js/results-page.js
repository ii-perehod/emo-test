(function () {
  "use strict";

  const { loadState, resetState } = window.TrainerStore;
  const { renderHighlightedWord } = window.VowelHighlighter;
  const { isAnswerCorrect } = window.AnswerChecker;

  const state = loadState();

  renderResultsTable(state);
  bindResetButton();

  function renderResultsTable(currentState) {
    const tbody = document.querySelector(".results tbody");
    tbody.replaceChildren();

    currentState.questions.forEach((question, i) => {
      if (i >= currentState.answers.length) {
        return;
      }
      const userAnswer = currentState.answers[i];
      const row = createResultRow({
        number: i + 1,
        question: question,
        userAnswer: userAnswer,
        isCorrect: isAnswerCorrect(userAnswer, question.correctAnswer)
      });
      tbody.appendChild(row);
    });
  }

  function createResultRow(data) {
    const row = document.createElement("tr");
    row.appendChild(createNumberCell(data.number));
    row.appendChild(createImageCell(data.question));
    row.appendChild(createWordCell(data.question.correctAnswer));
    row.appendChild(createWordCell(data.userAnswer.toUpperCase()));
    row.appendChild(createMarkCell(data.isCorrect));
    return row;
  }

  function createNumberCell(number) {
    const cell = document.createElement("td");
    cell.textContent = String(number);
    return cell;
  }

  function createImageCell(question) {
    const cell = document.createElement("td");
    const img = document.createElement("img");
    const sizeModifier = question.imageSize === "lg" ? " results__image--lg" : "";
    img.className = `results__image${sizeModifier}`;
    img.src = question.image;
    img.alt = question.alt;
    cell.appendChild(img);
    return cell;
  }

  function createWordCell(word) {
    const cell = document.createElement("td");
    renderHighlightedWord(cell, word);
    return cell;
  }

  function createMarkCell(isCorrect) {
    const cell = document.createElement("td");
    cell.className = isCorrect ? "results__mark" : "results__mark results__mark--wrong";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", isCorrect ? "Верно" : "Ошибка");

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", isCorrect ? "#icon-check" : "#icon-cross");

    svg.appendChild(use);
    cell.appendChild(svg);
    return cell;
  }

  function bindResetButton() {
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      resetState();
      window.location.href = "index.html";
    });
  }
})();
