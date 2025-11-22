const button = document.getElementById("soundButton");
const audio = document.getElementById("rikkert");

let fadeOutInterval = null;

// --- START SOUND ---
function startSound() {
  // Cancel any fading
  if (fadeOutInterval) {
    clearInterval(fadeOutInterval);
    fadeOutInterval = null;
  }

  audio.volume = 1;         // make sure volume is full
  audio.currentTime = 0;
  audio.play();
}

// --- FADE OUT OVER 0.3 SECONDS ---
function stopSound() {
  let fadeDuration = 300;        // 300 ms
  let fadeSteps = 15;            // number of volume steps
  let fadeStepTime = fadeDuration / fadeSteps;  // ms per step

  let step = 0;

  fadeOutInterval = setInterval(() => {
    step++;

    // lower volume
    audio.volume = 1 - (step / fadeSteps);

    // when fade is done
    if (step >= fadeSteps) {
      clearInterval(fadeOutInterval);
      fadeOutInterval = null;

      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1; // reset for next play
    }
  }, fadeStepTime);
}

// Mouse events
button.addEventListener("mousedown", startSound);
button.addEventListener("mouseup", stopSound);
button.addEventListener("mouseleave", stopSound);

// Touch events
button.addEventListener("touchstart", startSound);
button.addEventListener("touchend", stopSound);
