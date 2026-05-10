// ======= MAIN APP ROUTER =======
const PAGES = {
  '/':           { render: renderHome,        title: 'Inicio' },
  '/home':       { render: renderHome,        title: 'Inicio' },
  '/blog':       { render: renderBlog,        title: 'Blog' },
  '/lab':        { render: renderLab,         title: 'Laboratorio' },
  '/library':    { render: renderLibrary,     title: 'Biblioteca' },
  '/forum':      { render: renderForum,       title: 'Foro' },
  '/calculator': { render: renderCalculator,  title: 'Calculadora' },
  '/converter':  { render: renderConverter,   title: 'Conversor' },
  '/constants':  { render: renderConstants,   title: 'Constantes' },
  '/quiz':       { render: renderQuiz,        title: 'Quiz' },
  '/notes':      { render: renderNotes,       title: 'Notas' }
};

async function navigate(path) {
  // Stop any running simulation
  if (typeof simAnimId !== 'undefined' && simAnimId) {
    cancelAnimationFrame(simAnimId);
    simAnimId = null;
  }

  const page = PAGES[path] || PAGES['/'];
  const app  = document.getElementById('app');

  window.location.hash = path === '/' ? '' : path;

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = link.dataset.page;
    const active = (path === '/' || path === '/home')
      ? lp === 'home'
      : path.includes(lp) && lp !== 'home';
    link.classList.toggle('active', active);
  });

  // Loading state
  app.innerHTML = `
    <div class="page-loader">
      <div class="loader-ring"></div>
      <div class="loader-text">cargando ${page.title.toLowerCase()}...</div>
    </div>`;

  document.getElementById('navLinks').classList.remove('open');

  try {
    const html = await page.render();
    if (typeof html === 'string') app.innerHTML = html;

    if (path === '/calculator') setTimeout(initCalculators, 50);
    if (path === '/converter')  setTimeout(initConverter, 50);
    if (path === '/quiz')       setTimeout(initQuizPage, 50);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Navigation error:', err);
    app.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠</div>
        <div class="empty-text">Error al cargar la página</div>
        <div class="empty-sub" style="font-family:var(--font-mono);color:var(--red);font-size:.8rem">${err.message}</div>
        <button class="btn btn-ghost mt-2" onclick="navigate('/')">← Volver al inicio</button>
      </div>`;
  }

  document.title = `${page.title} · Física I — UNI`;
}

// ======= HASH ROUTER =======
function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || '/';
  navigate(hash);
}
window.addEventListener('hashchange', handleHashChange);

// ======= MOBILE NAV TOGGLE =======
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/' + (link.dataset.page === 'home' ? '' : link.dataset.page));
  });
});

// ======= DARK / LIGHT THEME TOGGLE =======
const THEME_KEY = 'fisica1-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '🌙';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Load saved theme
(function() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
})();

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// ======= KEYBOARD SHORTCUTS =======
document.addEventListener('keydown', (e) => {
  // Escape → close modal / close mobile nav
  if (e.key === 'Escape') {
    closeModal();
    document.getElementById('navLinks').classList.remove('open');
  }

  // Ctrl+D → toggle dark mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    toggleTheme();
  }

  // Skip if inside an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  // Number keys 1-9 → navigate to chapter quiz
  if (!e.ctrlKey && !e.metaKey && !e.altKey && /^[1-9]$/.test(e.key)) {
    navigate('/quiz');
  }

  // Shortcuts: h=home, b=blog, l=lab, f=forum, c=calculator, q=quiz, n=notes
  const shortcuts = { h:'/', b:'/blog', l:'/lab', f:'/forum', c:'/calculator', q:'/quiz', n:'/notes', r:'/library' };
  if (!e.ctrlKey && !e.metaKey && !e.altKey && shortcuts[e.key]) {
    navigate(shortcuts[e.key]);
  }
});

// ======= SCROLL NAVBAR EFFECT =======
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const scrolled = window.scrollY > 50;
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  if (theme === 'dark') {
    nav.style.background = scrolled ? 'rgba(7,12,24,0.98)' : 'rgba(7,12,24,0.94)';
  } else {
    nav.style.background = scrolled ? 'rgba(244,247,252,0.98)' : 'rgba(244,247,252,0.94)';
  }
}, { passive: true });

// ======= INIT =======
handleHashChange();
