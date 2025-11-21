document.addEventListener("DOMContentLoaded", () => {
  const balloons = document.querySelectorAll(".balloon");
  const secretMessage = document.getElementById("secret-message");
  const sparkleSound = document.getElementById("sound-sparkle");
  const bgMusic = document.getElementById("bg-music");

  // 🎵 Handle autoplay restrictions
  bgMusic.volume = 0;
    setTimeout(() => { bgMusic.volume = 0.4; }, 500);
  bgMusic.play().catch(() => {});
  const startMusic = () => {
    bgMusic.play().catch(() => {});
    document.removeEventListener("click", startMusic);
  };
  document.addEventListener("click", startMusic);

  // 🎈 Random secret balloon
  const randomIndex = Math.floor(Math.random() * balloons.length);
  const secretBalloon = balloons[randomIndex];
  secretBalloon.classList.add("secret-trigger");

  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      if (balloon === secretBalloon) {
        revealSecret(balloon, secretMessage, sparkleSound);
      } else {
        playErrorSound();
        balloon.classList.add("wrong");
        setTimeout(() => balloon.classList.remove("wrong"), 800);
      }
    });
  });
});

function revealSecret(balloon, messageBox, sparkleSound) {
  balloon.classList.add("popped");
  playPopSound();
  sparkleSound.currentTime = 0;
  sparkleSound.play().catch(() => {});
  messageBox.style.display = "block";
  launchMiniConfetti();
}

// ✅ Balloon pop sound
function playPopSound() {
  const audio = new Audio("/static/music/balloon_pop.mp3");
  audio.volume = 1.0;
  audio.play().catch(err => console.log("Pop sound blocked:", err));
}

// ✅ Wrong balloon sound
function playErrorSound() {
  const audio = new Audio("/static/music/error.mp3");
  audio.volume = 1.0;
  audio.play().catch(err => console.log("Error sound blocked:", err));
}

function launchMiniConfetti() {
  const confettiCount = 100;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("mini-confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    confetti.style.backgroundColor = randomColor();
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

function randomColor() {
  const colors = ["#ff70a6", "#ff9770", "#ffd670", "#e9ff70", "#70d6ff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
