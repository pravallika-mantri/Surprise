const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

const spinSound = document.getElementById("spin-sound");
const winSound = document.getElementById("win-sound");

// 🎵 Background Music Control
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");

let isPlaying = false;

window.addEventListener("load", () => {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      musicIcon.textContent = "⏸️ Pause Music";
    }).catch(() => {
      musicIcon.textContent = "▶️ Play Music";
    });
  }
});

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    isPlaying = true;
    musicIcon.textContent = "⏸️ Pause Music";
  } else {
    music.pause();
    isPlaying = false;
    musicIcon.textContent = "▶️ Play Music";
  }
});

// Emojis for wheel
const emojis = ["🎁", "🌸", "🌟", "💋", "🎶", "🦋", "🫶", "🌹"];

// Corresponding sweet messages
const messages = [
  "You are my favorite part of every single day 💝",
  "Your smile is my favorite kind of sunshine 🌸",
  "You light up my entire galaxy 🌟",
  "Your hugs feel like home 💋",
  "You make my heart dance to its own melody 🎶",
  "You’re my calm after every storm 🦋",
  "You complete my world, perfectly 🫶",
  "You’re my forever kind of person 🌹"
];

const colors = ["#ffb3c6", "#fcd5ce", "#fae1dd", "#f8edeb", "#e8e8e4", "#d8e2dc", "#ffd6a5", "#cdb4db"];
let startAngle = 0;
const arc = Math.PI / (emojis.length / 2);
let spinning = false;

// Draw the wheel (emojis only)
function drawWheel() {
  for (let i = 0; i < emojis.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc, false);
    ctx.lineTo(200, 200);
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#3a0ca3";
    ctx.font = "bold 32px Poppins";
    ctx.fillText(emojis[i], 140, 10);
    ctx.restore();
  }
}

drawWheel();

// Handle spin
spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  result.classList.remove("show");
  spinSound.currentTime = 0;
  spinSound.play();

  let spinTime = 0;
  const spinTimeTotal = Math.random() * 6000 + 6000;
  const spinAngleStart = Math.random() * 15 + 10;

  function rotateWheel() {
    spinTime += 20;
    if (spinTime >= spinTimeTotal) {
      finishSpin();
      return;
    }

    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    requestAnimationFrame(rotateWheel);
  }

  rotateWheel();
});

// Ease-out effect
function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// Finish spin
function finishSpin() {
  winSound.play();
  spinning = false;

  const degrees = (startAngle * 180 / Math.PI) % 360;
  const index = Math.floor((360 - degrees) / (360 / emojis.length)) % emojis.length;

  // 🎯 Highlight winning section
  highlightSection(index);

  result.textContent = messages[index];
  result.classList.add("show");
  nextBtn.style.display = "inline-block";
}

// Highlight selected segment
function highlightSection(index) {
  const angle = startAngle + index * arc;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.arc(200, 200, 200, angle, angle + arc, false);
  ctx.lineTo(200, 200);
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fill();
  ctx.restore();
}

// Next page
nextBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "/letter/";
  }, 1000);
});
