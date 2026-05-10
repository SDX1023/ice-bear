const sealScreen = document.getElementById('seal-screen');
const letter = document.getElementById('letter');
const bgMusic = document.getElementById('bg-music');
const introMusic = document.getElementById('intro-music');
const musicBtn = document.getElementById('music-toggle');

let hasStartedIntro = false;

sealScreen.addEventListener('click', function() {
  if (!hasStartedIntro) {
    // --- STEP 1: START INTRO MUSIC ---
    if (introMusic) {
      introMusic.volume = 0.6;
      introMusic.play().catch(e => console.log("Playback blocked:", e));
    }
    
    // Change text to let them know it's ready
    const p = sealScreen.querySelector('p');
    if (p) p.textContent = "click again to open";
    
    hasStartedIntro = true;
  } else {
    // --- STEP 2: OPEN THE LETTER ---
    openLetter();
  }
});

function openLetter() {
  // Fade out Intro Music
  if (introMusic) {
    let fadeOut = setInterval(() => {
      if (introMusic.volume > 0.05) {
        introMusic.volume -= 0.05;
      } else {
        introMusic.pause();
        clearInterval(fadeOut);
      }
    }, 50);
  }

  // Visual Transitions
  sealScreen.style.opacity = '0';
  setTimeout(() => {
    sealScreen.style.display = 'none';
    
    // Start Background Music once seal is gone
    if (bgMusic) {
      bgMusic.volume = 0.5;
      bgMusic.play();
    }
    if (musicBtn) musicBtn.style.display = 'block';
  }, 1000);

  setTimeout(() => {
    letter.style.display = 'block';
    setTimeout(() => {
      letter.style.animation = 'fadeUp 1.2s ease forwards';
      letter.style.opacity = '1';
    }, 50);
  }, 800);

  setTimeout(() => {
    setInterval(spawnHeart, 800);
  }, 1200);
}

// Music Toggle Logic
if (musicBtn) {
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents clicking the button from triggering the seal
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = 'Pause Music';
    } else {
      bgMusic.pause();
      musicBtn.textContent = 'Play Music';
    }
  });
}

function spawnHeart() {
  const heart = document.createElement('div');
  heart.textContent = ['♡', '♥', '❤'][Math.floor(Math.random() * 3)];
  heart.style.cssText = `
    position: fixed;
    left: ${Math.random() * 100}vw;
    top: -20px;
    font-size: ${0.8 + Math.random() * 0.8}rem;
    color: #c0392b;
    animation: fall ${4 + Math.random() * 4}s linear forwards;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}