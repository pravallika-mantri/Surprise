window.addEventListener("DOMContentLoaded", () => {
  const treasures = document.querySelectorAll(".treasure");
  const foundMessage = document.getElementById("foundMessage");
  const foundSound = document.getElementById("found-sound");
  const progress = document.getElementById("progress");
  const nextBtn = document.getElementById("nextPage");

  let foundCount = 0;
  const total = treasures.length;

  progress.style.visibility = "hidden";

  treasures.forEach(treasure => {
    treasure.addEventListener("click", () => {
      if (!treasure.classList.contains("found")) {
        treasure.classList.add("found");
        foundCount++;
        foundSound.currentTime = 0;
        foundSound.play();

        if (foundCount === 1) progress.style.visibility = "visible";

        const left = total - foundCount;
        if (left > 0) {
          progress.textContent = `${left} left...`;
          progress.style.transform = "scale(1.2)";
          setTimeout(() => (progress.style.transform = "scale(1)"), 300);
        } else {
          progress.textContent = `🎉 All treasures found!`;
          setTimeout(() => {
            foundMessage.style.display = "block";
          }, 500);
        }
      }
    });
  });

  nextBtn.addEventListener("click", () => {
    nextBtn.textContent = "Opening Your surprise 🥹...";
    nextBtn.disabled = true;
    setTimeout(() => {
      window.location.href = "/poem/";
    }, 1200);
  });
});
