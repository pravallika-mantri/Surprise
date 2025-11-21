const gameBoard = document.getElementById("game-board");
const message = document.getElementById("result-message");
const playAgainBtn = document.getElementById("play-again");
const moveOnBtn = document.getElementById("msg"); // ✅ define before using!

// ✅ Sounds
const popSoundSrc = "/static/music/pop.mp3";
const sparkleSound = new Audio("/static/music/sparkle.mp3");

const imageList = [
  "balloon.jpg",
  "ribbon.jpg",
  "heart.jpeg",
  "crown.jpg",
  "Decor.jpg",
  "hug.png",
  "star.png",
  "flowers.jpg",
  "kiss.jpeg",
  "cupcake.webp",
  "chocolate.jpg",
  "teddy.jpg",
  "R.jpg",
  "cute.jpg",
  "hat.webp",
  "pink.jpeg"
];

let cakePosition = 0;
let usedImages = [];
let clickedBoxes = new Set();

function createBoxes() {
  gameBoard.innerHTML = "";
  cakePosition = Math.floor(Math.random() * 16);
  usedImages = [...imageList];
  clickedBoxes.clear();

  message.textContent = "";
  playAgainBtn.style.display = "none";
  moveOnBtn.style.display = "none"; // Hide “Move On” when restarting

  for (let i = 0; i < 16; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.index = i;
    box.addEventListener("click", () => handleClick(i, box));
    gameBoard.appendChild(box);
  }
}

function handleClick(index, box) {
  if (clickedBoxes.has(index)) return;
  clickedBoxes.add(index);
  box.style.pointerEvents = "none";

  const pop = new Audio(popSoundSrc);
  pop.volume = 0.6;
  pop.play().catch(() => {});

  if (index === cakePosition) {
    // 🎂 Found the cake
    box.classList.add("found", "bounce", "sparkle");
    box.style.backgroundImage = "url('/static/images/gamecake.png')";
    message.textContent = "🎉 You found the cake! Happy Birthday! 🎂";

    sparkleSound.currentTime = 0;
    sparkleSound.play().catch(() => {});
    triggerConfetti();
    disableAllBoxes();

    playAgainBtn.style.display = "inline-block";
    moveOnBtn.style.display = "inline-block"; // 🎈 Show Move On button
  } else {
    const randomImg = getUniqueImage();
    if (randomImg) {
      box.style.backgroundImage = `url('/static/images/${randomImg}')`;
      box.style.backgroundSize = "cover";
      box.style.backgroundPosition = "center";
      box.classList.add("pop-in");
    }

    if (clickedBoxes.size === 16) {
      message.textContent = "💖 All images revealed! The cake was hiding somewhere special 🎂";
      playAgainBtn.style.display = "inline-block";
    }
  }
}

function getUniqueImage() {
  if (usedImages.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * usedImages.length);
  const selected = usedImages.splice(randomIndex, 1)[0];
  return selected;
}

function disableAllBoxes() {
  document.querySelectorAll(".box").forEach(box => {
    box.style.pointerEvents = "none";
  });
}

playAgainBtn.addEventListener("click", () => {
  moveOnBtn.style.display = "none"; // Hide “Move On” when replaying
  createBoxes();
});

moveOnBtn.addEventListener("click", () => {
  window.location.href = "/index/"; // ✅ Go back to Django index page
});

// 🎊 Confetti
function triggerConfetti() {
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    setTimeout(() => confetti.remove(), 4000);
  }
}

// ✨ Confetti + animation CSS
const style = document.createElement("style");
style.innerHTML = `
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  top: 0;
  border-radius: 50%;
  animation: fall linear forwards;
  z-index: 1000;
}
@keyframes fall {
  to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.pop-in { animation: popIn 0.4s ease forwards; }
@keyframes popIn { 0%{transform:scale(0);opacity:0;}80%{transform:scale(1.2);opacity:1;}100%{transform:scale(1);} }
.bounce { animation: bounceAnim 1s ease; }
@keyframes bounceAnim { 0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);} }
.sparkle { animation: sparkleGlow 1.5s ease-in-out infinite alternate, shimmer 2s linear infinite; position: relative; }
@keyframes sparkleGlow { 0%{box-shadow:0 0 10px #ff99cc,0 0 20px #ff66b2;}50%{box-shadow:0 0 25px #ffb6c1,0 0 40px #ff4dc4;}100%{box-shadow:0 0 15px #ff99cc,0 0 30px #ff66b2;} }
@keyframes shimmer { 0%{filter:brightness(1);}50%{filter:brightness(1.3);}100%{filter:brightness(1);} }
`;
document.head.appendChild(style);

createBoxes();
