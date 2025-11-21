const pages = document.querySelectorAll(".page");
let currentPage = 0;

const nextBtn = document.getElementById("next-page");
const prevBtn = document.getElementById("prev-page");
const endButtons = document.getElementById("end-buttons");
const prevEndBtn = document.getElementById("prev-end");
const toPuzzleBtn = document.getElementById("to-puzzle");
const flipSound = document.getElementById("flip-sound");

function showPage(index) {
  // Show only the current page
  pages.forEach((p, i) => (p.style.display = i === index ? "flex" : "none"));

  // When NOT on last page
  if (index < pages.length - 1) {
    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.style.display = "inline-block";
    endButtons.style.display = "none";
  }
  // When on last page
  else {
    prevBtn.style.display = "none"; // hide the main footer button
    nextBtn.style.display = "none";
    endButtons.style.display = "block";
  }
}

function flipPage(direction) {
  flipSound.currentTime = 0;
  flipSound.play().catch(() => {});

  if (direction === "next" && currentPage < pages.length - 1) {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  showPage(currentPage);
}

// Button actions
nextBtn.addEventListener("click", () => flipPage("next"));
prevBtn.addEventListener("click", () => flipPage("prev"));
prevEndBtn.addEventListener("click", () => flipPage("prev"));
toPuzzleBtn.addEventListener("click", () => (window.location.href = "/message/"));

// Initial display
showPage(currentPage);

const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0;
setTimeout(() => { bgMusic.volume = 0.4; }, 1000);
