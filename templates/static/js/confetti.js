document.addEventListener("DOMContentLoaded", () => {
  const partyBtn = document.getElementById("party-btn");
  const bgMusic = document.getElementById("bg-music");
  const partyMusic = document.getElementById("party-music");

  // 🎵 Try autoplay background music when page loads
  bgMusic.volume = 0.4; // soft background
  bgMusic.play().catch(() => {
    console.log("Autoplay blocked — will start on user click");
  });

  // 🎈 Continuous floating balloons
  setInterval(() => createBalloon(), 250);

  function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    balloon.style.animationDuration = `${Math.random() * 3 + 4}s`;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 9000);
  }

  // 🎉 Start party — fade out and switch page
  partyBtn.addEventListener("click", () => {
    // Stop background music and play party track
    bgMusic.pause();
    partyMusic.play().catch(err => console.log("Party music blocked:", err));

    // Fade out the page
    document.body.classList.add("fade-out");

    // Redirect after fade
    setTimeout(() => {
      window.location.href = "/minigame/"; // Django URL
    }, 1500);
  });
});
