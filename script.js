const intro = document.getElementById("intro");
const universe = document.getElementById("universe");
const envelope = document.getElementById("open-envelope");
const openText = document.getElementById("open-text");
const exploreButton = document.getElementById("explore");
const soundToggle = document.getElementById("sound-toggle");
const soundLabel = document.getElementById("sound-label");
const audio = document.getElementById("piano-audio");
const musicFile = document.getElementById("music-file");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const toLetter = document.getElementById("to-letter");
const restartButton = document.getElementById("restart");
const interactionDock = document.getElementById("interaction-dock");
const wishButton = document.getElementById("wish-button");
const flowerButton = document.getElementById("flower-button");
const wishToast = document.getElementById("wish-toast");
const flowerLayer = document.getElementById("flower-layer");

let pageOpened = false;
let musicObjectUrl = null;
let musicEnabled = false;
let toastTimer = null;

const littleWishes = [
  "Mong hôm nay Mai sẽ nhận được thật nhiều điều dễ thương. ✨",
  "Chúc cậu luôn có đủ tự tin để làm điều mình muốn, và đủ bình yên để nghỉ ngơi khi cần.",
  "Hy vọng hôm nay có ít nhất một chuyện nhỏ khiến cậu cười thật tươi. 🌷",
  "Chúc những cố gắng của cậu rồi sẽ nở hoa vào đúng thời điểm.",
  "Mong cậu gặp nhiều người tử tế, nhiều cơ hội tốt và nhiều ngày thật nhẹ lòng.",
  "Nhắc nhẹ: cậu cũng xứng đáng được quan tâm và chiều chuộng một chút đó :))",
  "Chúc cô gái tên Mai có một ngày 20/10 thật ấm áp. 💌",
  "Nếu hôm nay hơi mệt, mong cậu nhớ rằng nghỉ ngơi cũng là một cách tiến về phía trước.",
  "Gửi cậu một chút may mắn, một chút vui vẻ và một bầu trời toàn điều tốt lành. ☁️",
  "Lời chúc bí mật từ một người mong cậu luôn ổn: cứ vui vẻ là được rồi. ✧"
];

function showRandomWish() {
  const wish = littleWishes[Math.floor(Math.random() * littleWishes.length)];
  wishToast.textContent = wish;
  wishToast.hidden = false;
  wishToast.classList.remove("toast-show");
  // Restart animation on repeated clicks.
  void wishToast.offsetWidth;
  wishToast.classList.add("toast-show");
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    wishToast.classList.remove("toast-show");
    window.setTimeout(() => { wishToast.hidden = true; }, 350);
  }, 4200);
}

function showerFlowers() {
  const symbols = ["🌸", "🌷", "✿", "❀", "♡", "✧"];
  const amount = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 8 :  thirtyTwo();
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "falling-flower";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--fall-duration", `${3.2 + Math.random() * 3.8}s`);
    petal.style.setProperty("--fall-delay", `${Math.random() * 0.8}s`);
    petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    petal.style.setProperty("--spin", `${Math.random() * 540 - 270}deg`);
    petal.style.fontSize = `${16 + Math.random() * 18}px`;
    flowerLayer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  }
}
function thirtyTwo() { return 32; }

function openExperience() {
  if (pageOpened) return;
  pageOpened = true;
  envelope.classList.add("opened");
  openText.disabled = true;
  openText.textContent = "Lá thư đang mở…";
  window.setTimeout(() => {
    intro.classList.remove("active");
    intro.hidden = true;
    universe.hidden = false;
    interactionDock.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      document.querySelectorAll("#universe .reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
          el.classList.add("visible");
        }
      });
      observeReveals();
    });
  }, 850);
}
envelope.addEventListener("click", openExperience);
openText.addEventListener("click", openExperience);

let revealObserver;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll("#universe .reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -35px 0px" });
  document.querySelectorAll("#universe .reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}

wishButton.addEventListener("click", showRandomWish);
flowerButton.addEventListener("click", () => {
  showerFlowers();
  flowerButton.classList.remove("flower-pop");
  void flowerButton.offsetWidth;
  flowerButton.classList.add("flower-pop");
  showRandomWish();
});

exploreButton.addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
});

soundToggle.addEventListener("click", async () => {
  if (!audio.src) {
    musicFile.click();
    return;
  }
  if (musicEnabled) {
    audio.pause();
    musicEnabled = false;
    soundToggle.setAttribute("aria-pressed", "false");
    soundLabel.textContent = "Nhạc: tắt";
  } else {
    try {
      await audio.play();
      musicEnabled = true;
      soundToggle.setAttribute("aria-pressed", "true");
      soundLabel.textContent = "Nhạc: bật";
    } catch {
      soundLabel.textContent = "Chưa phát được";
    }
  }
});

musicFile.addEventListener("change", () => {
  const file = musicFile.files && musicFile.files[0];
  if (!file) return;
  if (musicObjectUrl) URL.revokeObjectURL(musicObjectUrl);
  musicObjectUrl = URL.createObjectURL(file);
  audio.src = musicObjectUrl;
  audio.play().then(() => {
    musicEnabled = true;
    soundToggle.setAttribute("aria-pressed", "true");
    soundLabel.textContent = "Nhạc: bật";
  }).catch(() => {
    musicEnabled = false;
    soundLabel.textContent = "Bấm để phát";
  });
});

// Mini quiz: không có đáp án sai; lựa chọn nào cũng dẫn đến lời nhắn.
const quizResponses = {
  a: "Có lẽ chẳng ai cần phải hoàn hảo cả. Những điều chân thật mới làm người ta nhớ lâu.",
  b: "Tớ cũng nghĩ vậy. Có những nét riêng rất khó gọi tên, nhưng lại khiến một người trở nên đặc biệt.",
  c: "Đôi khi một chuyện nhỏ xíu thôi cũng đủ làm ngày bình thường trở nên đáng nhớ rồi."
};
quizOptions.addEventListener("click", (event) => {
  const button = event.target.closest(".quiz-option");
  if (!button) return;
  quizOptions.querySelectorAll(".quiz-option").forEach(option => {
    option.classList.toggle("selected", option === button);
    option.disabled = true;
  });
  quizFeedback.textContent = quizResponses[button.dataset.answer] || quizResponses.b;
  toLetter.hidden = false;
});
toLetter.addEventListener("click", () => {
  document.getElementById("final-letter").scrollIntoView({ behavior: "smooth" });
});

restartButton.addEventListener("click", () => {
  if (musicEnabled) {
    audio.pause();
    musicEnabled = false;
    soundToggle.setAttribute("aria-pressed", "false");
    soundLabel.textContent = "Nhạc: tắt";
  }
  quizOptions.querySelectorAll(".quiz-option").forEach(option => {
    option.disabled = false;
    option.classList.remove("selected");
  });
  quizFeedback.textContent = "";
  toLetter.hidden = true;
  universe.hidden = true;
  interactionDock.hidden = true;
  wishToast.hidden = true;
  flowerLayer.replaceChildren();
  intro.hidden = false;
  intro.classList.add("active");
  envelope.classList.remove("opened");
  openText.disabled = false;
  openText.innerHTML = 'Mở thư nhé <span>↗</span>';
  pageOpened = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Phím Escape không làm mất nội dung; khi quay lại đầu trang, có thể mở lại từ đầu.
window.addEventListener("beforeunload", () => {
  if (musicObjectUrl) URL.revokeObjectURL(musicObjectUrl);
});
