window.addEventListener("load", () => {
  const heart = document.getElementById("seal");
  const message = document.getElementById("messageBox");
  const scrollSound = document.getElementById("scroll-sound");
  const instruction = document.getElementById("instruction");
  const nextBtn = document.getElementById("nextPage");

  let isOpen = false;

  heart.addEventListener("click", () => {
    // Hide instruction after first click
    instruction.style.opacity = "0";

    if (!isOpen) {
      // ----- OPEN LETTER -----
      heart.classList.remove("closeHeart");
      message.classList.remove("closeMsg");

      heart.classList.add("openHeart");
      message.classList.add("openMsg");

      scrollSound.currentTime = 0;
      scrollSound.play();

      // Show Next Page button after opening
      setTimeout(() => {
        nextBtn.style.opacity = "1";
      }, 2600);

      isOpen = true;
    } else {
      // ----- CLOSE LETTER -----
      heart.classList.remove("openHeart");
      message.classList.remove("openMsg");

      heart.classList.add("closeHeart");
      message.classList.add("closeMsg");

      nextBtn.style.opacity = "0";

      scrollSound.currentTime = 0;
      scrollSound.play();

      // Bring back instruction after closing animation finishes
      setTimeout(() => {
        instruction.style.opacity = "1";
      }, 2600); // Wait until close animation finishes

      isOpen = false;
    }
  });

  // Next page navigation
  nextBtn.addEventListener("click", () => {
    nextBtn.textContent = "Opening next surprise 🎈...";
    nextBtn.disabled = true;
    setTimeout(() => {
      window.location.href = "/scratch/";
    }, 1200);
  });
});
