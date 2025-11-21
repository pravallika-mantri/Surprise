document.addEventListener("DOMContentLoaded", () => {
  // 🎵 Create a reusable click sound element
  const clickSound = new Audio("/static/music/click.mp3");
  clickSound.volume = 0.5; // set comfortable volume

  // 🎯 Play click sound whenever any button is clicked
  document.body.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" || event.target.closest("button")) {
      // restart sound so it can play again even if clicked rapidly
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {}); // prevent autoplay error logs
    }
  });
});
