const btn = document.getElementById('showBtn');
const overlay = document.getElementById('overlay');
const hearts = document.getElementById('hearts');

// ให้ข้อความค่อย ๆ โผล่มาเมื่อ scroll ถึง
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.text, .btn').forEach(el => observer.observe(el));

// Hearts effect
const colors = ["#ff4d6d", "#ff80bf", "#ffcc70", "#70e1f5", "#a18cd1"];
function random(min, max){ return Math.random() * (max - min) + min; }

function spawnHeart(x) {
  const h = document.createElement('div');
  h.className = 'heart';
  const size = random(14, 30);
  h.style.width = h.style.height = size + 'px';
  h.style.left = (x ?? random(0, window.innerWidth)) + 'px';
  h.style.bottom = '-20px';
  h.style.animationDuration = random(4, 7) + 's';
  h.style.background = colors[Math.floor(Math.random()*colors.length)];
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}

function burstHearts(centerX) {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => spawnHeart((centerX ?? window.innerWidth/2) + random(-120, 120)), i * 40);
  }
}

btn.addEventListener('click', (e) => {
  overlay.classList.add('show');
  burstHearts(e.clientX || window.innerWidth/2);
});

// ปิด overlay ด้วยคลิกหรือกด ESC
function hideLove(){ overlay.classList.remove('show'); }
overlay.addEventListener('click', hideLove);
addEventListener('keydown', (e) => { if (e.key === 'Escape') hideLove(); });
