
const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".nav-dot")];
const pageNumber = document.getElementById("page-number");
const bottomNav = document.getElementById("bottom-nav");

const photoSources = [
  "image/1.jpg.jpeg",
  "image/2.jpg.jpeg",
  "image/3.jp.jpeg",
  "image/4.jpg.jpeg",
  "image/5.jpg.jpeg",
  "image/6.jpg.jpeg",
  "image/7.jpg.jpeg",
  "image/8.jpg.jpeg",
  "image/9.jpg.jpeg",
  "image/10.jpg.jpeg",
  "image/11.jpg.jpeg",
  "image/12.jpg.jpeg",
  "image/13.jpg.jpeg"
];

let currentPage = 0;
let currentPhoto = 0;
let unlocked = false;

function showPage(index) {
  if (!unlocked && index !== 0) return;

  currentPage = Math.max(0, Math.min(index, pages.length - 1));

  pages.forEach((page, i) => {
    page.classList.toggle("active", i === currentPage);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === currentPage);
  });

  pageNumber.textContent =
    `${String(currentPage + 1).padStart(2, "0")} / 06`;

  bottomNav.style.display =
    currentPage === 0 && !unlocked ? "none" : "flex";

  if (currentPage !== 3) {
    document.querySelectorAll(".video-card video").forEach(video => {
      video.pause();
    });
  }

  if (currentPage === 4) {
    document.getElementById("letter-content").scrollTop = 0;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// PASSWORD SHOW / HIDE
const passwordInput = document.getElementById("password");

document.getElementById("toggle-password").addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  document.getElementById("toggle-password").textContent =
    hidden ? "◎" : "◉";
});

// SECRET PASSWORD
document.getElementById("password-form").addEventListener("submit", event => {
  event.preventDefault();

  const entered = passwordInput.value.trim().toLowerCase();
  const error = document.getElementById("password-error");

  if (entered === "ajay,garima") {
    unlocked = true;
    error.textContent = "";

    document.querySelector(".heart-lock span").textContent = "♡";
    document.querySelector(".heart-lock").style.boxShadow =
      "0 0 55px #ff7899aa";

    birthdaySparkles(25);
    setTimeout(() => showPage(1), 450);
  } else {
    error.textContent = "Wrong secret, bachaa! Try again 🥺";
    passwordInput.value = "";
    passwordInput.focus();
  }
});

// PAGE NAVIGATION
document.querySelectorAll(".next-button").forEach(button => {
  button.addEventListener("click", () => showPage(currentPage + 1));
});

document.querySelectorAll(".back-button").forEach(button => {
  button.addEventListener("click", () => showPage(currentPage - 1));
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    if (unlocked) showPage(Number(dot.dataset.go));
  });
});

// PHOTO VIEWER
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCount = document.getElementById("lightbox-count");

function openPhoto(index) {
  currentPhoto = (index + photoSources.length) % photoSources.length;
  lightboxImage.src = photoSources[currentPhoto];
  lightboxCount.textContent =
    `${String(currentPhoto + 1).padStart(2, "0")} / ${photoSources.length}`;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePhoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    openPhoto(Number(card.dataset.photo));
  });
});

document.getElementById("close-lightbox").addEventListener("click", closePhoto);
document.getElementById("prev-photo").addEventListener("click", () => {
  openPhoto(currentPhoto - 1);
});
document.getElementById("next-photo").addEventListener("click", () => {
  openPhoto(currentPhoto + 1);
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closePhoto();
});

// KEYBOARD SHORTCUTS
document.addEventListener("keydown", event => {
  if (lightbox.classList.contains("open")) {
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowRight") openPhoto(currentPhoto + 1);
    if (event.key === "ArrowLeft") openPhoto(currentPhoto - 1);
    return;
  }

  if (!unlocked) return;

  if (event.key === "ArrowRight" && currentPage < 5) {
    showPage(currentPage + 1);
  }

  if (event.key === "ArrowLeft" && currentPage > 1) {
    showPage(currentPage - 1);
  }
});

// BACKGROUND SPARKLES
const sparkleContainer = document.getElementById("sparkles");

for (let i = 0; i < 26; i++) {
  const star = document.createElement("span");
  star.className = "twinkle";
  star.textContent = i % 2 === 0 ? "✦" : "✧";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.fontSize = `${8 + Math.random() * 12}px`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  sparkleContainer.appendChild(star);
}

function birthdaySparkles(amount = 20) {
  for (let i = 0; i < amount; i++) {
    const star = document.createElement("span");
    star.className = "twinkle";
    star.textContent = ["♥", "♡", "✦", "✧", "🎀"][Math.floor(Math.random() * 5)];
    star.style.position = "fixed";
    star.style.zIndex = "50";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 90}%`;
    star.style.fontSize = `${14 + Math.random() * 20}px`;
    star.style.animationDuration = "1.5s";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2500);
  }
}

// FINAL BIRTHDAY MAGIC
document.getElementById("wish-button").addEventListener("click", () => {
  const rain = document.getElementById("heart-rain");
  const symbols = ["♥", "♡", "🎀", "✦", "💋", "🧸"];

  birthdaySparkles(35);

  for (let i = 0; i < 45; i++) {
    const heart = document.createElement("span");
    heart.className = "rain-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${13 + Math.random() * 25}px`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;

    rain.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }

  document.getElementById("final-note").textContent =
    "UMAAAAHHH! HAPPY BIRTHDAY, MERA BUBUUUU! 💋❤️";

  const button = document.getElementById("wish-button");
  button.innerHTML = "ALL MY PYAAR, JUST FOR YOU ♥";
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = 'Tap for birthday magic <span>✦</span>';
    button.disabled = false;
  }, 4000);
});

// REPLAY THE WHOLE STORY
document.getElementById("replay-button").addEventListener("click", () => {
  document.getElementById("final-note").textContent =
    "LOTS OF KISSES FOR MY BUBU ♥";
  showPage(0);
});

// IMAGE FALLBACK
document.querySelectorAll(".photo-card img").forEach((img, index) => {
  img.addEventListener("error", () => {
    img.alt = "Image not found — check your file name";
    img.style.opacity = "0.2";
    img.parentElement.style.background = "#301720";
    img.parentElement.title = `Check this path: ${photoSources[index]}`;
  }, { once: true });
});

// START ON PASSWORD PAGE
showPage(0);
