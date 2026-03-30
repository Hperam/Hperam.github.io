/* ═══════════════════════════════════════════════════════
   PAGE LOADER
═══════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('done'), 650);
});

/* ═══════════════════════════════════════════════════════
   YEAR
═══════════════════════════════════════════════════════ */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // expand ring on hoverable elements
  document.querySelectorAll('a, button, .hover-link, .skill-chip, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ═══════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════ */
const bar = document.getElementById('scroll-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const t = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = t > 0 ? (window.scrollY / t * 100) + '%' : '0%';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════
   HEADER SCROLL STATE
═══════════════════════════════════════════════════════ */
const hdr = document.getElementById('site-header');
if (hdr) {
  const tick = () => hdr.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ═══════════════════════════════════════════════════════
   HERO CANVAS — floating particles
═══════════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const N = 55;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  function rand(a, b) { return a + Math.random() * (b - a); }

  for (let i = 0; i < N; i++) {
    particles.push({
      x: rand(0, 1), y: rand(0, 1),
      r: rand(1, 2.5),
      vx: rand(-0.00012, 0.00012),
      vy: rand(-0.00012, 0.00012),
      o: rand(0.15, 0.55),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // connections
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      const px = pi.x * W, py = pi.y * H;
      for (let j = i + 1; j < particles.length; j++) {
        const pj = particles[j];
        const qx = pj.x * W, qy = pj.y * H;
        const d = Math.hypot(px - qx, py - qy);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(qx, qy);
          ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 140)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // dots
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129,140,248,${p.o})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════════════════
   SCROLL PARALLAX ON HERO ORBS
═══════════════════════════════════════════════════════ */
(function () {
  const orbs = document.querySelectorAll('.orb[data-parallax]');
  if (!orbs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach(o => {
      const speed = parseFloat(o.dataset.parallax);
      o.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════════════
   HERO NAME LINE REVEAL
═══════════════════════════════════════════════════════ */
(function () {
  const name = document.querySelector('.hero-name');
  if (!name) return;
  // slight delay after loader
  setTimeout(() => name.classList.add('lines-visible'), 800);
})();

/* ═══════════════════════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════════════════════ */
const revEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      setTimeout(() => el.classList.add('visible'), parseInt(el.dataset.delay || 0, 10));
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.07 });
  revEls.forEach(el => io.observe(el));
} else {
  revEls.forEach(el => el.classList.add('visible'));
}

/* ═══════════════════════════════════════════════════════
   ACTIVE NAV
═══════════════════════════════════════════════════════ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
if (sections.length && navAnchors.length) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' }).observe(...sections);
  sections.forEach(s => new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' }).observe(s));
}

/* ═══════════════════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════════════════ */
(function () {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const words = ['backend systems', 'distributed pipelines', 'AI-powered products', 'scalable infrastructure'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    if (!deleting && ci === word.length) { setTimeout(() => { deleting = true; type(); }, 2400); return; }
    if (deleting && ci === 0)           { deleting = false; wi = (wi + 1) % words.length; }
    setTimeout(type, deleting ? 35 : 75);
  }
  setTimeout(type, 1200);
})();

/* ═══════════════════════════════════════════════════════
   COUNT-UP STATS
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = parseFloat(el.dataset.count);
    const pre    = el.dataset.prefix  || '';
    const suf    = el.dataset.suffix  || '';
    let start = null;
    const dur = 1800;
    (function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const v = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + (Number.isInteger(target) ? Math.floor(v * target) : (v * target).toFixed(1)) + suf;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = pre + target + suf;
    })(performance.now());
    el.closest('[data-count]');
  }, { threshold: 0.7 }).observe(el);
});

/* ═══════════════════════════════════════════════════════
   3D TILT ON PROJECT CARDS
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card => {
  let raf = null;
  card.addEventListener('mousemove', e => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateY(-6px) scale(1.015)`;
    });
  });
  card.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.transition = 'transform 550ms cubic-bezier(0.16,1,0.3,1), box-shadow 550ms cubic-bezier(0.16,1,0.3,1)';
    card.style.transform  = '';
    setTimeout(() => { card.style.transition = ''; }, 600);
  });
});

/* ═══════════════════════════════════════════════════════
   SPOTLIGHT — gradient follows cursor inside card
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.spotlight').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--sx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--sy', (e.clientY - r.top)  + 'px');
    card.style.setProperty('--sopacity', '1');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--sopacity', '0');
  });
});

/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * 0.2;
    const dy = (e.clientY - r.top  - r.height / 2) * 0.32;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1)';
    btn.style.transform  = '';
    setTimeout(() => { btn.style.transition = ''; }, 550);
  });
});
