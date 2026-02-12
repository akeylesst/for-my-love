const gifStages = [
  "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif", // 0 normal
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif", // 1 confused
  "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif", // 2 pleading
  "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif", // 3 sad
  "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif", // 4 sadder
  "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif", // 5 devastated
  "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif", // 6 very devastated
  "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif", // 7 crying runaway
];

const noMessages = [
  "No",
  "Juhi, are you positive? 🤔",
  "Pookie please... 🥺",
  "But we're soulmates! 😭",
  "I'll be the saddest man ever... 😢",
  "Please say yes??? 💔",
  "Don't do this to me, Juhi...",
  "Last chance! 😭",
  "You can't catch me! 😜",
];

const yesTeasePokes = [
  "Wait, try saying no first... just to see what happens 😏",
  "Go on, hit no... I dare you 👀",
  "You're missing out on the fun 😈",
  "Click no once, Juhi, I promise it's funny 😏",
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = false;

const catGif = document.getElementById("cat-gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const music = document.getElementById("bg-music");
const heartsBg = document.getElementById("hearts-bg");

// Heart Particle System
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart-particle");
  heart.innerHTML = ["❤️", "💖", "✨", "💕", "💍"][
    Math.floor(Math.random() * 5)
  ];
  heart.style.setProperty("--left", Math.random() * 100 + "vw");
  heart.style.setProperty("--duration", Math.random() * 3 + 4 + "s");
  heart.style.setProperty("--size", Math.random() * 1 + 0.5 + "rem");
  heartsBg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 300);

// Audio Handling
music.volume = 0.4;
document.addEventListener(
  "click",
  () => {
    if (!musicPlaying) {
      music.play().catch(() => {});
      musicPlaying = true;
    }
  },
  { once: true },
);

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    document.getElementById("music-toggle").textContent = "🔇";
  } else {
    music.play();
    musicPlaying = true;
    document.getElementById("music-toggle").textContent = "🔊";
  }
}

function handleYesClick() {
  if (!runawayEnabled) {
    const msg =
      yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
    yesTeasedCount++;
    showTeaseMessage(msg);
    return;
  }
  window.location.href = "yes.html";
}

function showTeaseMessage(msg) {
  let toast = document.getElementById("tease-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function handleNoClick() {
  noClickCount++;

  const msgIndex = Math.min(noClickCount, noMessages.length - 1);
  noBtn.textContent = noMessages[msgIndex];

  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${currentSize * 1.2}px`;
  const padY = Math.min(15 + noClickCount * 4, 40);
  const padX = Math.min(45 + noClickCount * 8, 100);
  yesBtn.style.padding = `${padY}px ${padX}px`;

  if (noClickCount >= 2) {
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
    noBtn.style.fontSize = `${Math.max(noSize * 0.9, 10)}px`;
  }

  const gifIndex = Math.min(noClickCount, gifStages.length - 1);
  swapGif(gifStages[gifIndex]);

  if (noClickCount >= 4 && !runawayEnabled) {
    enableRunaway();
    runawayEnabled = true;
  }
}

function swapGif(src) {
  catGif.style.opacity = "0";
  setTimeout(() => {
    catGif.src = src;
    catGif.style.opacity = "1";
  }, 200);
}

function enableRunaway() {
  noBtn.style.position = "fixed";
  noBtn.addEventListener("mouseover", runAway);
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      runAway();
    },
    { passive: false },
  );
}

function runAway() {
  const margin = 50;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;

  const randomX = Math.random() * maxX + margin / 2;
  const randomY = Math.random() * maxY + margin / 2;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transition = "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
}
