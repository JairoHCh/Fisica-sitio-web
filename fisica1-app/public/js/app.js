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
  // Stop any running sim
  if (typeof simAnimId !== 'undefined' && simAnimId) {
    cancelAnimationFrame(simAnimId);
    simAnimId = null;
  }

  const page = PAGES[path] || PAGES['/'];
  const app = document.getElementById('app');

  // Update URL hash
  window.location.hash = path === '/' ? '' : path;

  // Active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = link.dataset.page;
    const active = (path === '/' || path === '/home') ? lp === 'home'
      : path.includes(lp) && lp !== 'home';
    link.classList.toggle('active', active);
  });

  // Show loader
  app.innerHTML = `
    <div class="page-loader">
      <div class="loader-ring"></div>
      <div class="loader-text">CARGANDO ${page.title.toUpperCase()}...</div>
    </div>`;

  // Close nav on mobile
  document.getElementById('navLinks').classList.remove('open');

  try {
    const html = await page.render();
    if (typeof html === 'string') {
      app.innerHTML = html;
    }
    // Post-render hooks
    if (path === '/calculator') setTimeout(initCalculators, 50);
    if (path === '/converter') setTimeout(initConverter, 50);
    if (path === '/quiz')      setTimeout(initQuizPage, 50);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Navigation error:', err);
    app.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠</div>
        <div class="empty-text">Error al cargar la página</div>
        <div class="empty-sub" style="font-family:var(--font-mono);color:var(--red)">${err.message}</div>
        <button class="btn btn-ghost mt-2" onclick="navigate('/')">← Volver al inicio</button>
      </div>`;
  }

  document.title = `${page.title} · Física I`;
}

// ======= HASH ROUTER =======
function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || '/';
  navigate(hash);
}

window.addEventListener('hashchange', handleHashChange);

// ======= NAV TOGGLE (MOBILE) =======
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

// ======= KEYBOARD SHORTCUTS =======
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  // Ctrl+K or / to search (future)
});

// ======= INIT =======
handleHashChange();

// ======= SCROLL NAVBAR EFFECT =======
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50
    ? 'rgba(4,5,15,0.97)'
    : 'rgba(4,5,15,0.85)';
});
