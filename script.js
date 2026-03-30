/* ── YEAR ───────────────────────────────────────────────────────────────── */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

/* ── SCROLL PROGRESS ────────────────────────────────────────────────────── */
const bar = document.getElementById('scroll-bar');
if (bar) {
  const updateBar = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
}

/* ── HEADER SCROLL STATE ────────────────────────────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  const tick = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── REVEAL ON SCROLL (staggered) ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.07 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ── ACTIVE NAV ─────────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
if (sections.length && navAnchors.length) {
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach(s => navIO.observe(s));
}

/* ── TYPING ANIMATION ───────────────────────────────────────────────────── */
const roles = [
  'backend systems',
  'distributed pipelines',
  'AI-powered products',
  'scalable infrastructure',
];
const typedEl = document.getElementById('typed-role');
if (typedEl) {
  let i = 0, char = 0, deleting = false;
  function type() {
    const word = roles[i];
    typedEl.textContent = deleting ? word.slice(0, --char) : word.slice(0, ++char);
    if (!deleting && char === word.length) {
      setTimeout(() => { deleting = true; type(); }, 2200);
      return;
    }
    if (deleting && char === 0) {
      deleting = false;
      i = (i + 1) % roles.length;
    }
    setTimeout(type, deleting ? 38 : 78);
  }
  // slight delay so page has loaded
  setTimeout(type, 900);
}

/* ── COUNT-UP ANIMATION ─────────────────────────────────────────────────── */
const countEls = document.querySelectorAll('.stat-num[data-count]');
if (countEls.length) {
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const val = Math.floor(eased * target);
        el.textContent = prefix + val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countIO.observe(el));
}

/* ── 3D TILT ON PROJECT CARDS ───────────────────────────────────────────── */
document.querySelectorAll('.tilt-card').forEach(card => {
  let raf = null;
  card.addEventListener('mousemove', e => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg) translateY(-5px) scale(1.01)`;
    });
  });
  card.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1)';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ── MAGNETIC BUTTONS ───────────────────────────────────────────────────── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.18;
    const y = (e.clientY - r.top  - r.height / 2) * 0.32;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1)';
    btn.style.transform = '';
    setTimeout(() => { btn.style.transition = ''; }, 500);
  });
});
