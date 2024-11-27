let timer = 60;
let score = 0;
let emojiInterval;
const emojis = ["🌹", "🌝", "🌕", "💗", "🌓", "🌗"]; // สัญลักษณ์ที่ใช้
const gameArea = document.getElementById("gameArea");
const emojiElement = document.getElementById("emoji");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const resultArea = document.getElementById("resultArea");
const resultMessage = document.getElementById("resultMessage");
const retryButton = document.getElementById("retryButton");
const goButton = document.getElementById("goButton");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", resetGame);

function startGame() {
  startButton.classList.add("hidden");
  gameArea.classList.remove("hidden");
  timerElement.textContent = timer;
  score = 0;
  updateScore();
  startTimer();
  showEmoji();
}

function startTimer() {
  const countdown = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer === 0) {
      clearInterval(countdown);
      clearInterval(emojiInterval);
      endGame();
    }
  }, 1000);
}

function showEmoji() {
  emojiInterval = setInterval(() => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    emojiElement.textContent = randomEmoji;

    emojiElement.onclick = () => {
      handleEmojiClick(randomEmoji);
    };
  }, 1000); // เปลี่ยนทุก 1 วินาที
}

function handleEmojiClick(emoji) {
  switch (emoji) {
    case "💗":
      score += 5;
      break;
    case "🌹":
      score += 2;
      break;
    case "🌝":
      score += 1;
      break;
    case "🌕":
      score -= 2;
      break;
    case "🌓":
      score -= 2;
      break;
    case "🌗":
      score += 1;
      break;
  }
  updateScore();
}

function updateScore() {
  scoreElement.textContent = `คะแนน: ${score}`;
}

function endGame() {
  gameArea.classList.add("hidden");
  resultArea.classList.remove("hidden");

  if (score >= 300) {
    resultMessage.textContent = "เก่งมาก! พร้อมไปต่อได้เลย!";
    goButton.classList.remove("hidden");
  } else {
    resultMessage.textContent = "ลองใหม่นะคับบ😘";
    retryButton.classList.remove("hidden");
  }
}

function resetGame() {
  timer = 60;
  score = 0;
  resultArea.classList.add("hidden");
  startButton.classList.remove("hidden");
  goButton.classList.add("hidden");
  retryButton.classList.add("hidden");
}

function endGame() {
    gameArea.classList.add("hidden");
    resultArea.classList.remove("hidden");
  
    if (score >= 300) {
      resultMessage.textContent = "คุณเก่งมาก! พร้อมไปต่อได้เลย!";
      goButton.classList.remove("hidden"); // แสดงปุ่ม Go
      retryButton.classList.add("hidden"); // ซ่อนปุ่ม Retry
    } else {
      resultMessage.textContent = "ลองใหม่นะคับบ😘";
      retryButton.classList.remove("hidden"); // แสดงปุ่ม Retry
      goButton.classList.add("hidden"); // ซ่อนปุ่ม Go
    }
  }
  
