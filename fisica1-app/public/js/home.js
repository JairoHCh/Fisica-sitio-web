// ======= HOME PAGE =======

const CHAPTERS = [
  {
    num: 1, title: "Introducción y Vectores", hours: 5, color: "#3b82f6",
    topics: "Método científico · Magnitudes y unidades · Escalares y vectores · Suma de vectores · Producto escalar y vectorial"
  },
  {
    num: 2, title: "Cinemática", hours: 6, color: "#8b5cf6",
    topics: "MRU · MRUV · Caída libre · Movimiento parabólico · Movimiento circular · Movimiento relativo"
  },
  {
    num: 3, title: "Estática", hours: 7, color: "#d97706",
    topics: "Leyes de Newton · Diagrama de cuerpo libre · Equilibrio de partículas · Momento de fuerza · Elasticidad"
  },
  {
    num: 4, title: "Dinámica del Punto Material", hours: 4, color: "#22c55e",
    topics: "Segunda Ley de Newton · Sistemas inerciales · Fuerzas de fricción · Fuerzas ficticias"
  },
  {
    num: 5, title: "Teoremas de Conservación", hours: 9, color: "#ef4444",
    topics: "Trabajo y energía · Energía cinética y potencial · Conservación de energía · Potencia · Impulso · Choques elásticos e inelásticos"
  },
  {
    num: 6, title: "Sistema de Partículas", hours: 5, color: "#0ea5e9",
    topics: "Centro de masa · Momento lineal del sistema · Impulso · Conservación de energía en sistemas de partículas"
  },
  {
    num: 7, title: "Fluidos", hours: 4, color: "#6366f1",
    topics: "Presión hidrostática · Principio de Pascal · Principio de Arquímedes · Ecuación de continuidad · Bernoulli"
  },
  {
    num: 8, title: "Vibraciones y Ondas Sonoras", hours: 8, color: "#ec4899",
    topics: "Ley de Hooke · Movimiento armónico simple · Péndulo simple · Ondas mecánicas · Sonido e intensidad sonora"
  },
  {
    num: 9, title: "Temperatura y Termodinámica", hours: 8, color: "#f97316",
    topics: "Dilatación térmica · Calor y capacidad calorífica · Cambios de fase · Primera y segunda ley de la termodinámica"
  }
];

const TOOLS = [
  { id: 'blog',       icon: '✦', label: 'Blog',         sub: 'Artículos y novedades',  color: 'var(--cyan)' },
  { id: 'lab',        icon: '⚗', label: 'Laboratorio',  sub: '7 simulaciones',         color: 'var(--gold)' },
  { id: 'calculator', icon: '∑', label: 'Calculadora',  sub: '13 fórmulas',            color: 'var(--purple)' },
  { id: 'converter',  icon: '⇌', label: 'Conversor',    sub: '10 categorías',          color: 'var(--green)' },
  { id: 'constants',  icon: 'Ω', label: 'Constantes',   sub: '46 constantes físicas',  color: 'var(--cyan)' },
  { id: 'notes',      icon: '✎', label: 'Notas',        sub: 'Apuntes personales',     color: 'var(--gold)' },
  { id: 'forum',      icon: '❋', label: 'Foro',         sub: 'Dudas y discusión',      color: 'var(--purple)' },
  { id: 'library',    icon: '◉', label: 'Biblioteca',   sub: 'Recursos del curso',     color: 'var(--green)' },
];

const FORMULAS = [
  { name: "Movimiento Parabólico",    expr: "R = v₀² · sin(2θ) / g",   color: "#3b82f6" },
  { name: "Energía Cinética",         expr: "Eₖ = ½ · m · v²",         color: "#d97706" },
  { name: "Segunda Ley de Newton",    expr: "ΣF⃗ = m · a⃗",             color: "#8b5cf6" },
  { name: "Período — MAS",            expr: "T = 2π √(m / k)",         color: "#22c55e" },
  { name: "Conservación de Energía",  expr: "Eₖ + Eₚ = constante",     color: "#ef4444" },
  { name: "Presión Hidrostática",     expr: "P = P₀ + ρ · g · h",      color: "#6366f1" },
];

// buildProgressHTML is defined in progress.js — do not redefine here.

function renderHome() {
  const stats = getOverallStats();
  const scores = getQuizScores();
  const quizEntries = Object.entries(scores).slice(0, 3);

  return `
<div class="page-enter">

  <!-- COURSE BANNER -->
  <div class="course-banner">
    <div class="course-banner-inner">
      <div>
        <div class="uni-name">Universidad Nacional de Ingeniería</div>
        <div class="uni-faculty">Facultad de Ciencias · Ciclo 2026-I</div>
      </div>
      <div class="prof-info">
        <div class="prof-label">Docente</div>
        <div class="prof-name">Mg. Percy Victor Cañote Fajardo</div>
      </div>
    </div>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-eyebrow">Mecánica Clásica · Termodinámica · Ondas</div>
    <h1 class="hero-title">
      <span class="line1">Curso de</span>
      <span class="line2">Física I</span>
    </h1>
    <p class="hero-desc">
      Portal académico de apoyo al curso. Laboratorios virtuales, calculadoras de fórmulas,
      quizzes de autoevaluación, foro estudiantil y biblioteca de recursos en un solo lugar.
    </p>
    <div class="hero-actions">
      <button class="btn btn-primary" onclick="navigate('/lab')">⚗ Laboratorio Virtual</button>
      <button class="btn btn-ghost"   onclick="navigate('/quiz')">◆ Autoevaluación</button>
      <button class="btn btn-ghost"   onclick="navigate('/calculator')">∑ Calculadoras</button>
    </div>
    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-num">9</div>
        <div class="stat-label">Capítulos</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">56</div>
        <div class="stat-label">Horas teóricas</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">7</div>
        <div class="stat-label">Simulaciones</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">${stats.chapsDone}</div>
        <div class="stat-label">Completados</div>
      </div>
    </div>
  </div>

  <!-- PROGRESS + STATS -->
  <div class="cyber-divider"><span>mi progreso</span></div>
  <div class="grid-2" style="margin-bottom:2rem;align-items:start">
    <div class="card">
      ${buildProgressHTML()}
    </div>
    <div class="card">
      <div style="font-family:var(--font-mono);font-size:.68rem;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:1rem">Estadísticas rápidas</div>
      <div class="quick-stats-grid">
        <div class="qstat">
          <div class="qstat-val" style="color:var(--cyan)">${stats.chapsDone}/9</div>
          <div class="qstat-lbl">Capítulos completados</div>
        </div>
        <div class="qstat">
          <div class="qstat-val" style="color:var(--gold)">${stats.quizzesTaken}</div>
          <div class="qstat-lbl">Quizzes realizados</div>
        </div>
        <div class="qstat">
          <div class="qstat-val" style="color:${stats.avgScore>=70?'var(--green)':'var(--red)'}">
            ${stats.avgScore ? stats.avgScore + '%' : '—'}
          </div>
          <div class="qstat-lbl">Promedio en quizzes</div>
        </div>
        <div class="qstat">
          <div class="qstat-val" style="color:var(--purple)">
            ${stats.quizzesTaken>=4?'🏆':stats.chapsDone>=5?'⭐':'🔰'}
          </div>
          <div class="qstat-lbl">Nivel actual</div>
        </div>
      </div>
      ${quizEntries.length ? `
        <div style="margin-top:1.25rem">
          <div style="font-family:var(--font-mono);font-size:.67rem;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem">
            Mejores resultados
          </div>
          ${quizEntries.map(([id, s]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:.3rem 0;border-bottom:1px solid var(--border)">
            <span style="font-size:.8rem;color:var(--text)">${id.replace('cap','Cap. ')}</span>
            <span style="font-family:var(--font-mono);font-size:.8rem;color:${s.best>=70?'var(--green)':'var(--gold)'}">${s.best}%</span>
          </div>`).join('')}
        </div>` :
        `<div style="margin-top:1rem;font-size:.78rem;color:var(--text3);text-align:center">
          Toma un quiz para ver tus resultados aquí
        </div>`}
      <button class="btn btn-primary btn-sm w-full mt-2" onclick="navigate('/quiz')">
        ◆ Ir a Quizzes
      </button>
    </div>
  </div>

  <!-- TOOLS GRID -->
  <div class="cyber-divider"><span>herramientas del portal</span></div>
  <div class="grid-4" style="margin-bottom:2rem">
    ${TOOLS.map(t => `
    <div class="card quick-tool-card" onclick="navigate('/${t.id}')">
      <div class="quick-tool-icon">${t.icon}</div>
      <div style="font-size:.82rem;font-weight:700;color:${t.color}">${t.label.toUpperCase()}</div>
      <div class="text-small text-muted mt-1">${t.sub}</div>
    </div>`).join('')}
  </div>

  <!-- CHAPTERS -->
  <div class="cyber-divider"><span>contenido del curso</span></div>
  <div class="grid-3" style="margin-bottom:2rem">
    ${CHAPTERS.map(ch => {
      const isDone = getProgress()[`cap${ch.num}`]?.done;
      return `
      <div class="chapter-card ${isDone?'chapter-done':''}"
           style="border-left:3px solid ${ch.color}"
           onclick="toggleChapterDone(${ch.num});this.classList.toggle('chapter-done');this.querySelector('.chapter-done-badge').style.display=this.classList.contains('chapter-done')?'inline-flex':'none'">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="chapter-num" style="color:${ch.color}">Capítulo ${ch.num}</div>
          <span class="chapter-done-badge"
                style="background:${ch.color}20;color:${ch.color};font-family:var(--font-mono);font-size:.62rem;padding:.12rem .4rem;border-radius:20px">
            ✓ Hecho
          </span>
        </div>
        <div class="chapter-title">${ch.title}</div>
        <div class="chapter-hours">⏱ ${ch.hours} horas</div>
        <div class="chapter-topics">${ch.topics}</div>
      </div>`;
    }).join('')}
  </div>

  <!-- FORMULAS PREVIEW -->
  <div class="cyber-divider"><span>fórmulas esenciales</span></div>
  <div class="grid-3" style="margin-bottom:2.5rem">
    ${FORMULAS.map(f => `
    <div class="card formula-card" onclick="navigate('/calculator')">
      <div style="font-family:var(--font-mono);font-size:.67rem;color:var(--text2);margin-bottom:.35rem">
        ${f.name}
      </div>
      <div class="formula-display" style="color:${f.color}">${f.expr}</div>
      <div style="font-family:var(--font-mono);font-size:.62rem;color:var(--text3);margin-top:.3rem">
        → calcular
      </div>
    </div>`).join('')}
  </div>

  <!-- FOOTER -->
  <footer class="site-footer">
    <strong>Física I</strong> · Universidad Nacional de Ingeniería ·
    Docente: <strong>Mg. Percy Victor Cañote Fajardo</strong> · 2026-I
  </footer>

</div>`;
}
