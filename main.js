// ── 스크롤 기반 nav 활성화 ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  },
  { rootMargin: '-25% 0px -65% 0px' }
);

sections.forEach((s) => observer.observe(s));

// ── 스킬 바 진입 애니메이션 ──
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach((el) => {
  el.dataset.width = el.style.width;
  el.style.width = '0%';
  skillObserver.observe(el);
});
