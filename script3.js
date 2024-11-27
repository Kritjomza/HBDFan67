// เลือกดวงดาวทั้งหมด
const music = document.getElementById('music');
music.muted = false;
music.play();

const stars = document.querySelectorAll('.star');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const closeMessage = document.getElementById('close-message');

// สุ่มตำแหน่งดวงดาว
stars.forEach(star => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  star.style.left = `${x}vw`;
  star.style.top = `${y}vh`;

  // เมื่อคลิกแสดงข้อความ
  star.addEventListener('click', () => {
    const message = star.getAttribute('data-message');
    messageText.textContent = message;
    messageBox.style.display = 'block';
  });
});

// ปิดข้อความ
closeMessage.addEventListener('click', () => {
  messageBox.style.display = 'none';
});
