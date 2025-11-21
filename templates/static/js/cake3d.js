// Stars background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.3,
    speed: 0.1 + Math.random() * 0.2,
    alpha: Math.random()
  });
}
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  }
  requestAnimationFrame(animateStars);
}
animateStars();

// Music - play instantly with guaranteed start
const music = document.getElementById("bg-music");

// Preload aggressively
music.preload = "auto";

// Ensure playback rate and volume are normal
music.playbackRate = 1.0;
music.volume = 1.0;

function playMusicImmediately() {
  // Start right away
  music.play().catch(() => {
    // If browser blocks autoplay, wait for first click or key press
    const startOnInteraction = () => {
      music.play();
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    document.addEventListener("click", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
  });
}

// Call immediately when page is ready
if (document.readyState === "complete") {
  playMusicImmediately();
} else {
  window.addEventListener("load", playMusicImmediately);
}



// Knife & popup logic
const knife = document.getElementById("knife");
const cutBtn = document.getElementById("cut-btn");
const popupBox = document.getElementById("popup-box");
const funBtn = document.getElementById("fun-btn");

cutBtn.addEventListener("click", () => {
  knife.classList.add("active");
  setTimeout(() => {
    showConfetti();
  }, 1000);
  setTimeout(() => {
    knife.style.left = "120%";
    knife.style.opacity = "0";
  }, 2500);
  cutBtn.disabled = true;
  cutBtn.style.opacity = "0.6";
  setTimeout(() => {
    popupBox.style.display = "flex";
  }, 3500);
});

// Confetti
function showConfetti() {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.left = Math.random() * window.innerWidth + "px";
    c.style.top = "0px";
    c.style.background = ["#ff99cc", "#ffcc66", "#ffffff", "#99ffcc"][Math.floor(Math.random() * 4)];
    c.style.animationDuration = 2 + Math.random() * 3 + "s";
    container.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// Floating hearts
const heartsContainer = document.getElementById("hearts-container");
function createHeart() {
  const heart = document.createElement("div");
  heart.textContent = ["💖", "💫", "✨", "💝"][Math.floor(Math.random() * 4)];
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.opacity = 0.6;
  heart.style.animation = `rise ${5 + Math.random() * 5}s linear forwards`;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 1000);

const style = document.createElement("style");
style.innerHTML = `@keyframes rise { to { transform: translateY(-110vh); opacity: 0; }}`;
document.head.appendChild(style);

// “Fun again” button redirects to confetti page
funBtn.addEventListener("click", () => {
  window.location.href = "/gift/"; // your confetti page URL
});
