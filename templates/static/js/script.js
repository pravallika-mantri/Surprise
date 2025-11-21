// js/script.js
document.addEventListener('DOMContentLoaded', function() {

  // CDN for canvas-confetti
  const CONFETTI_URL = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";

  // Ensure confetti library is available
  function ensureConfetti() {
    return new Promise((resolve) => {
      if (typeof window.confetti === 'function') return resolve();

      const existing = Array.from(document.getElementsByTagName('script'))
        .find(s => s.src && s.src.includes('canvas-confetti'));
      if (existing) {
        if (existing.readyState === 'loaded' || existing.readyState === 'complete') return resolve();
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => resolve());
        return;
      }

      const s = document.createElement('script');
      s.src = CONFETTI_URL;
      s.onload = () => resolve();
      s.onerror = () => {
        console.warn('Could not load canvas-confetti from CDN.');
        resolve();
      };
      document.head.appendChild(s);
    });
  }

  // ---------- Slideshow ----------// ===== Slideshow Logic =====
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change every 3s
}

  // ---------- Music control ----------
  const audio = document.getElementById('birthday-music');
  const musicBtn = document.getElementById('music-control');

  function updateMusicButton() {
    if (!musicBtn || !audio) return;
    musicBtn.textContent = audio.paused ? '▶️ Play Music' : '⏸️ Pause Music';
  }

  if (musicBtn && audio) {
    updateMusicButton();
    musicBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(updateMusicButton).catch(err => {
          console.warn('Play prevented by browser:', err);
          updateMusicButton();
        });
      } else {
        audio.pause();
        updateMusicButton();
      }
    });
    audio.addEventListener('play', updateMusicButton);
    audio.addEventListener('pause', updateMusicButton);
  }

  // ---------- Confetti button ----------
  document.getElementById("confetti-btn").addEventListener("click", () => {
  const slideshow = document.querySelector(".slideshow-container");
  const rect = slideshow.getBoundingClientRect();

  confetti({
    particleCount: 1000,
    spread: 8000,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    }
  });
});

  // ---------- Auto confetti on load ----------
  ensureConfetti().then(() => {
    if (typeof confetti === 'function') {
      const duration = 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 9,
          startVelocity: 90,
          spread: 5000,
          origin: { y: Math.random() * 1.0 },
          colors: ['#ff80b5', '#d580ff', '#7c4dff', '#ff4d94', '#c084fc']
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  });

  // ---------- Sparkles ----------
  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
  }
  setInterval(createSparkle, 300);

  // ---------- Ensure message visible ----------
  const msg = document.getElementById('surprise-message');
  if (msg) setTimeout(() => msg.style.opacity = 1, 1000);

}); // end DOMContentLoaded


// ---------- Secret Button ----------
const secretBtn = document.getElementById("secret-btn");
if (secretBtn) {
  secretBtn.addEventListener("click", () => {
    // Add a quick glow before redirecting
    secretBtn.style.boxShadow = "0 0 25px 5px rgba(255, 105, 180, 0.8)";
    secretBtn.style.transform = "scale(1.1)";

    setTimeout(() => {
      window.location.href = "/secret/"; // Redirect after small animation
    }, 600);
  });
}
