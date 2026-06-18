/* ═══════════════════════════════════════════════
   SMART SCHOOL — Shared JS
   Runs on every page
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL BEHAVIOUR ──
  const nav = document.querySelector('.ss-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── MOBILE HAMBURGER ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── CIRCUIT TRACE ──
  const trace = document.querySelector('.circuit-trace-line');
  const dots  = document.querySelectorAll('.circuit-trace-dot');
  if (trace) {
    const updateTrace = () => {
      const scrolled  = window.scrollY;
      const total     = document.body.scrollHeight - window.innerHeight;
      const pct       = Math.min(scrolled / total, 1);
      const available = window.innerHeight - 64;
      trace.style.height = (pct * available * 3) + 'px';

      // light up dots at section boundaries
      const sections = document.querySelectorAll('.trace-dot-marker');
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && dots[i]) {
          dots[i].classList.add('visible');
          dots[i].style.top = (i * 120 + 60) + 'px';
        }
      });
    };
    window.addEventListener('scroll', updateTrace, { passive: true });
    updateTrace();
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
  }

  // ── QUIZ LOGIC ──
  document.querySelectorAll('.quiz-item').forEach(item => {
    const options   = item.querySelectorAll('.quiz-option');
    const answer    = item.querySelector('.quiz-answer');
    const revealBtn = item.querySelector('.quiz-reveal-btn');
    const correct   = item.dataset.correct;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (item.dataset.answered) return;
        item.dataset.answered = true;

        options.forEach(o => {
          if (o.dataset.value === correct) o.classList.add('correct');
          else o.classList.add('wrong');
        });

        if (answer) answer.style.display = 'block';
        if (revealBtn) revealBtn.style.display = 'none';
      });
    });

    if (revealBtn && answer) {
      revealBtn.addEventListener('click', () => {
        options.forEach(o => {
          if (o.dataset.value === correct) o.classList.add('correct');
          else o.classList.add('wrong');
        });
        answer.style.display = 'block';
        revealBtn.style.display = 'none';
        item.dataset.answered = true;
      });
    }
  });

  // ── GLOSSARY SEARCH ──
  const glossSearch = document.getElementById('glossary-search');
  if (glossSearch) {
    glossSearch.addEventListener('input', () => {
      const q = glossSearch.value.toLowerCase().trim();
      document.querySelectorAll('.glossary-term').forEach(term => {
        const text = term.textContent.toLowerCase();
        term.style.display = text.includes(q) ? '' : 'none';
      });
      document.querySelectorAll('.glossary-letter-group').forEach(group => {
        const visible = [...group.querySelectorAll('.glossary-term')].some(t => t.style.display !== 'none');
        group.style.display = visible ? '' : 'none';
      });
    });
  }

});

// ── SHARED NAV HTML (injected by each page) ──
function renderNav(theme = 'light') {
  const pages = [
    { href: 'index.html',     label: 'Home' },
    { href: 'about.html',     label: 'About' },
    { href: 'glossary.html',  label: 'Glossary' },
    { href: 'resources.html', label: 'Resources' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}">${p.label}</a></li>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  return `
  <nav class="ss-nav ${theme === 'dark' ? 'dark' : ''}">
    <a href="index.html" class="nav-logo">
      <div class="logo-mark">⚡</div>
      <span class="logo-text">Smart<em>School</em></span>
    </a>
    <ul class="nav-links">
      ${links}
      <li><a href="session1.html" class="nav-sessions-btn">📚 Sessions</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="nav-mobile">
    ${mobileLinks}
    <a href="session1.html" style="color:var(--teal-dark);font-weight:700;margin-top:8px;">📚 Sessions →</a>
  </div>`;
}

function renderFooter() {
  return `
  <footer class="ss-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="nav-logo">
            <div class="logo-mark">⚡</div>
            <span class="logo-text">Smart<em style="font-style:normal;color:var(--teal);">School</em></span>
          </div>
          <p>A robotics education programme bringing real engineering skills to Nigerian students — from primary school to secondary.</p>
          <p class="axora-credit">Powered by <strong>Axora Labs</strong> · connecting minds. engineering the future.</p>
        </div>
        <div class="footer-col">
          <h4>Sessions</h4>
          <ul>
            <li><a href="session1.html">Session 1 — Introduction</a></li>
            <li><a href="session2.html">Session 2 — Outputs</a></li>
            <li><a href="session3.html">Session 3 — Sensors</a></li>
            <li><a href="session4.html">Session 4 — Combining</a></li>
            <li><a href="session5.html">Session 5 — Project Day</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Learn</h4>
          <ul>
            <li><a href="about.html">About the Programme</a></li>
            <li><a href="glossary.html">Glossary</a></li>
            <li><a href="resources.html">Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            <li><a href="https://wokwi.com" target="_blank">Wokwi Simulator</a></li>
            <li><a href="https://www.arduino.cc/en/software" target="_blank">Arduino IDE</a></li>
            <li><a href="https://axoralabs.ng" target="_blank">Axora Labs</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Smart School · Government Robotics Education Initiative</p>
        <p>Built with ❤️ by <span>Axora Labs</span></p>
      </div>
    </div>
  </footer>`;
}
