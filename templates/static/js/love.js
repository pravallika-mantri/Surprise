const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Move "No" button randomly when hovered
noBtn.addEventListener("mouseover", () => {
  const x = Math.floor(Math.random() * 300) - 150;
  const y = Math.floor(Math.random() * 200) - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// When user clicks "Yes"
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  gifResult.play();
});
window.addEventListener("click", function () {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic.paused) {
    bgMusic.play();
  }
});
