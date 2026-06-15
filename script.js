/* ── Year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Hamburger ── */
const ham = document.querySelector('.hamburger');
const mob = document.getElementById('mobile-menu');
ham.addEventListener('click', () => {
  const open = ham.classList.toggle('open');
  ham.setAttribute('aria-expanded', open);
  if (open) { mob.classList.add('active'); }
  else { mob.classList.remove('active'); }
});
mob.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { mob.classList.remove('active'); ham.classList.remove('open'); ham.setAttribute('aria-expanded', false); });
});

/* ── Typing animation ── */
const phrases = ['Fullstack Developer.', 'Problem Solver.', 'Builder.', 'Python Enthusiast.'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typing-line');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function type() {
  if (prefersReduced) { el.textContent = phrases[0]; el.innerHTML += '<span class="cursor" aria-hidden="true"></span>'; return; }
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    el.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1400); return; }
    setTimeout(type, 70);
  } else {
    ci--;
    el.textContent = phrase.slice(0, ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); return; }
    setTimeout(type, 38);
  }
  if (!deleting) el.innerHTML = el.textContent + '<span class="cursor" aria-hidden="true"></span>';
}
type();

/* ── Intersection Observer ── */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      /* skill bars */
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => obs.observe(r));

/* ── Particles ── */
(function() {
  if (prefersReduced) return;
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, pts;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    init();
  }
  function init() {
    pts = Array.from({length: 55}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random()
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${p.a * 0.55})`;
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 110) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ── Form ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const st = document.getElementById('form-status');
  st.style.display = 'block';
  st.textContent = '✓ Message sent! I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => { st.style.display = 'none'; }, 5000);
}
