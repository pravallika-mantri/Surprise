window.addEventListener("load", () => {

  const canvas = document.getElementById("scratchCanvas");
  const ctx = canvas.getContext("2d");

  const hiddenContent = document.getElementById("hiddenContent");
  const hiddenImage = document.getElementById("hiddenImage");
  const hiddenMessage = document.getElementById("hiddenMessage");

  const revealSound = document.getElementById("revealSound");
  const nextCardBtn = document.getElementById("nextCardBtn");
  const finalBtn = document.getElementById("finalBtn");

  const cards = window.cardData;

  let currentCard = 0;
  let isDrawing = false;
  let revealed = false;

  function setupCard() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    hiddenImage.src = cards[currentCard].img;
    hiddenMessage.textContent = cards[currentCard].msg;
    hiddenContent.style.opacity = "0";

    nextCardBtn.classList.remove("show");
    finalBtn.classList.remove("show");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#bfbfbf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "destination-out";

    revealed = false;

    hiddenContent.style.opacity = "0";
  finalBtn.classList.remove("show");

  if (currentCard < cards.length - 1) {
      nextCardBtn.style.display = "inline-block";
      nextCardBtn.classList.remove("show");
  } else {
      nextCardBtn.style.display = "none";
  }
  }

  setupCard();

  // SCRATCH EVENTS
  function scratch(x, y) {
    if (!isDrawing || revealed) return;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  }

  canvas.addEventListener("mousedown", () => isDrawing = true);
  canvas.addEventListener("mouseup", () => isDrawing = false);
  canvas.addEventListener("mousemove", e => {
    const r = canvas.getBoundingClientRect();
    scratch(e.clientX - r.left, e.clientY - r.top);
  });

  canvas.addEventListener("touchstart", () => isDrawing = true);
  canvas.addEventListener("touchend", () => isDrawing = false);
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    scratch(t.clientX - r.left, t.clientY - r.top);
  });

  function checkReveal() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;

    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) clear++;
    }

    const percent = (clear / (canvas.width * canvas.height)) * 100;

    if (percent > 60 && !revealed) {
      reveal();
    }
  }

  function reveal() {
    revealed = true;

    hiddenContent.style.opacity = "1";
    revealSound.play();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => nextCardBtn.classList.add("show"), 1000);
  }

  nextCardBtn.addEventListener("click", () => {
  currentCard++;

  if (currentCard < cards.length - 1) {
      // Still cards 1–4 → show next
      setupCard();
  }

  else if (currentCard === cards.length - 1) {
      // We reached card 5 → SHOW this card but NO next button
      setupCard();
      nextCardBtn.style.display = "none";
      finalBtn.style.display = "inline-block";
      setTimeout(() => finalBtn.classList.add("show"), 700);
  }
});


  finalBtn.addEventListener("click", () => {
    finalBtn.textContent = "Opening next surprise 🎈...";
    finalBtn.disabled = true;
    setTimeout(() => window.location.href = "/treasure/", 900);
  });

});

// MUSIC FIX
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
    if (music.muted) {
        music.muted = false;
        musicIcon.textContent = "⏸️ Pause Music";
    } else {
        music.muted = true;
        musicIcon.textContent = "▶️ Play Music";
    }
});


