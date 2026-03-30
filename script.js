/* ─── YEAR ──────────────────────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── SCROLL PROGRESS BAR ───────────────────────────────────────────────── */
const scrollBar = document.getElementById('scroll-bar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ─── HEADER SCROLL EFFECT ──────────────────────────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── REVEAL ON SCROLL ──────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ─── ACTIVE NAV LINK ───────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--text)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));
}
