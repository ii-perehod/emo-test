(function () {
  "use strict";

  const { resetState } = window.TrainerStore;

  function bindResetButton() {
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      resetState();
      window.location.href = "index.html";
    });
  }

  window.ResetButton = { bindResetButton };
})();
