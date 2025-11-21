const confettiBtn = document.getElementById("confettiBtn");
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");

let isPlaying = false;

// 🎵 Attempt autoplay after page loads
window.addEventListener("load", () => {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      musicIcon.textContent = "⏸️ Pause Music";
    }).catch(() => {
      // Autoplay blocked — show button for manual start
      console.log("Autoplay blocked. Waiting for user interaction.");
      musicIcon.textContent = "▶️ Play Music";
    });
  }
});

// 🎶 Toggle play/pause
musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      musicIcon.textContent = "⏸️ Pause Music";
    }).catch(err => console.log("Playback failed:", err));
  } else {
    music.pause();
    isPlaying = false;
    musicIcon.textContent = "▶️ Play Music";
  }
});

// 🎊 Confetti trigger (button)
confettiBtn.addEventListener("click", () => {
  triggerConfetti();
});

// 🎊 Confetti animation function
function triggerConfetti() {
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    setTimeout(() => confetti.remove(), 4000);
  }
}

// 🎨 Confetti CSS injection
const style = document.createElement("style");
style.innerHTML = `
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  top: 0;
  border-radius: 50%;
  animation: fall linear forwards;
  z-index: 9999;
}
@keyframes fall {
  to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(style);

// ➡️ Go to next page when clicked
document.getElementById("nextBtn").addEventListener("click", () => {
  window.location.href = "/spin/";

});
