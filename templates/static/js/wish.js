const btn = document.getElementById("submit-btn");
const sparkleSound = document.getElementById("sparkle-sound");
const input = document.getElementById("wish-input");

btn.addEventListener("click", () => {
  const wish = input.value.trim();

  if (!wish) {
    input.placeholder = "🌟 Don't forget to make your wish!";
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 600);
    return;
  }

  sparkleSound.currentTime = 0;
  sparkleSound.play().catch(() => {});

  triggerSparkle(btn);

  // disable and fade out
  btn.disabled = true;
  setTimeout(() => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "/cake3d/";
    }, 1000);
  }, 2000);
});

function triggerSparkle(target) {
  const rect = target.getBoundingClientRect();
  const container = document.createElement("div");
  container.classList.add("sparkle-container");
  document.body.appendChild(container);

  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 60;
    sparkle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;

    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1200);
  }

  setTimeout(() => container.remove(), 1300);
}