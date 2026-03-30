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

// ── 개인 프로젝트 인라인 확장 토글 ──
document.querySelectorAll('.side-chip').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const panel = document.getElementById(targetId);
    if (!panel) return;

    const isOpen = panel.classList.contains('open');

    // 같은 timeline-item 내 열린 패널 닫기
    const parent = btn.closest('.timeline-content');
    parent.querySelectorAll('.side-expand.open').forEach((p) => {
      p.classList.remove('open');
    });
    parent.querySelectorAll('.side-chip[aria-expanded="true"]').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
    });

    // 클릭한 패널 토글 (이미 열려있었으면 닫기만)
    if (!isOpen) {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
