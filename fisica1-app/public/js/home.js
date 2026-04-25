// ======= HOME PAGE =======
const CHAPTERS = [
  { num: 1, title: "Introducción y Vectores", hours: 5, color: "#00d4ff", topics: "Método científico · Magnitudes · Escalares y Vectores · Suma de vectores · Producto escalar y vectorial" },
  { num: 2, title: "Cinemática", hours: 6, color: "#a855f7", topics: "MRU · MRUV · Caída libre · Movimiento parabólico · Circular · Movimiento relativo" },
  { num: 3, title: "Estática", hours: 7, color: "#ffd23f", topics: "Leyes de Newton · DCL · Equilibrio de partículas · Momento de fuerza · Elasticidad" },
  { num: 4, title: "Dinámica del Punto Material", hours: 4, color: "#00ff88", topics: "Segunda Ley de Newton · Sistemas inerciales · MRU y MRUV dinámico · Fuerzas ficticias" },
  { num: 5, title: "Teoremas de Conservación", hours: 9, color: "#ff6b6b", topics: "Trabajo y energía · Energía cinética y potencial · Conservación · Potencia · Impulso · Choques" },
  { num: 6, title: "Sistema de Partículas", hours: 5, color: "#00d4ff", topics: "Centro de masa · Momento lineal · Impulso · Conservación de energía en sistemas" },
  { num: 7, title: "Fluidos", hours: 4, color: "#a855f7", topics: "Presión · Pascal · Arquímedes · Aplicaciones de fluidos" },
  { num: 8, title: "Vibraciones y Ondas Sonoras", hours: 8, color: "#ffd23f", topics: "Ley de Hooke · MAS · Péndulo · Ondas · Sonido · Intensidad" },
  { num: 9, title: "Temperatura y Termodinámica", hours: 8, color: "#00ff88", topics: "Dilatación térmica · Calor · Fases · Leyes de la termodinámica" }
];

function renderHome() {
  const stats = getOverallStats();
  const scores = getQuizScores();
  const quizScoresList = Object.entries(scores).slice(0, 3);

  return `
    <div class="page-enter">
      <!-- HERO -->
      <div class="hero">
        <div class="hero-eyebrow">Portal Académico · Física I</div>
        <h1 class="hero-title">
          <div class="line1">Domina la</div>
          <div class="line2">FÍSICA CLÁSICA</div>
        </h1>
        <p class="hero-desc">Tu plataforma de aprendizaje para Física I. Laboratorios virtuales, blog, biblioteca y foro estudiantil en un solo lugar.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="navigate('/lab')">⚗ Abrir Laboratorio</button>
          <button class="btn btn-ghost" onclick="navigate('/quiz')">◆ Tomar Quiz</button>
          <button class="btn btn-ghost" onclick="navigate('/calculator')">∑ Calculadora</button>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">9</div><div class="stat-label">Capítulos</div></div>
          <div class="stat-item"><div class="stat-num">56</div><div class="stat-label">Horas Teóricas</div></div>
          <div class="stat-item"><div class="stat-num">7</div><div class="stat-label">Simulaciones</div></div>
          <div class="stat-item"><div class="stat-num">${stats.chapsDone}</div><div class="stat-label">Caps. Completados</div></div>
        </div>
      </div>

      <!-- MY PROGRESS -->
      <div class="cyber-divider"><span>mi progreso</span></div>
      <div class="grid-2" style="margin-bottom:2rem;align-items:start">
        <div id="progress-overview" class="card">
          ${buildProgressHTML()}
        </div>
        <div class="card">
          <div style="font-family:var(--font-display);font-size:.75rem;color:var(--cyan);margin-bottom:1rem;letter-spacing:.1em">ESTADÍSTICAS RÁPIDAS</div>
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
              <div class="qstat-val" style="color:${stats.avgScore>=70?'var(--green)':'var(--red)'}">${stats.avgScore || '—'}${stats.avgScore ? '%' : ''}</div>
              <div class="qstat-lbl">Promedio en quizzes</div>
            </div>
            <div class="qstat">
              <div class="qstat-val" style="color:var(--purple)">${stats.quizzesTaken >= 4 ? '🏆' : stats.chapsDone >= 5 ? '⭐' : '🔰'}</div>
              <div class="qstat-lbl">Nivel actual</div>
            </div>
          </div>
          ${quizScoresList.length ? `
            <div style="margin-top:1rem">
              <div style="font-size:.72rem;color:var(--text2);font-family:var(--font-mono);margin-bottom:.5rem">MEJORES RESULTADOS</div>
              ${quizScoresList.map(([id, s]) => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:.35rem 0;border-bottom:1px solid var(--border)">
                  <span style="font-size:.8rem;color:var(--text)">${id.replace('cap','Cap. ')}</span>
                  <span style="font-family:var(--font-mono);font-size:.8rem;color:${s.best>=70?'var(--green)':'var(--gold)'}">${s.best}%</span>
                </div>`).join('')}
            </div>` : `<div style="margin-top:1rem;font-size:.8rem;color:var(--text3);text-align:center">Toma un quiz para ver tus resultados aquí</div>`}
          <button class="btn btn-primary btn-sm" style="width:100%;margin-top:1rem" onclick="navigate('/quiz')">◆ Ir a Quizzes</button>
        </div>
      </div>

      <!-- QUICK TOOLS -->
      <div class="cyber-divider"><span>acceso rápido</span></div>
      <div class="grid-4" style="margin-bottom:2rem">
        <div class="card quick-tool-card" onclick="navigate('/blog')">
          <div class="quick-tool-icon">✦</div>
          <div class="font-display" style="font-size:.8rem;color:var(--cyan)">BLOG</div>
          <div class="text-small text-muted mt-1">Artículos de física</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/lab')">
          <div class="quick-tool-icon">⚗</div>
          <div class="font-display" style="font-size:.8rem;color:var(--gold)">LABORATORIO</div>
          <div class="text-small text-muted mt-1">7 simulaciones</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/calculator')">
          <div class="quick-tool-icon">∑</div>
          <div class="font-display" style="font-size:.8rem;color:var(--purple)">CALCULADORA</div>
          <div class="text-small text-muted mt-1">15 fórmulas</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/converter')">
          <div class="quick-tool-icon">∿</div>
          <div class="font-display" style="font-size:.8rem;color:var(--green)">CONVERSOR</div>
          <div class="text-small text-muted mt-1">Unidades físicas</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/constants')">
          <div class="quick-tool-icon">Ω</div>
          <div class="font-display" style="font-size:.8rem;color:var(--cyan)">CONSTANTES</div>
          <div class="text-small text-muted mt-1">Tabla de referencia</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/notes')">
          <div class="quick-tool-icon">✎</div>
          <div class="font-display" style="font-size:.8rem;color:var(--gold)">NOTAS</div>
          <div class="text-small text-muted mt-1">Tu bloc de apuntes</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/forum')">
          <div class="quick-tool-icon">❋</div>
          <div class="font-display" style="font-size:.8rem;color:var(--purple)">FORO</div>
          <div class="text-small text-muted mt-1">Dudas y discusión</div>
        </div>
        <div class="card quick-tool-card" onclick="navigate('/library')">
          <div class="quick-tool-icon">◉</div>
          <div class="font-display" style="font-size:.8rem;color:var(--green)">BIBLIOTECA</div>
          <div class="text-small text-muted mt-1">Recursos y libros</div>
        </div>
      </div>

      <!-- CHAPTERS -->
      <div class="cyber-divider"><span>contenido del curso</span></div>
      <div class="grid-3" style="margin-bottom:2rem">
        ${CHAPTERS.map(ch => {
          const isDone = getProgress()[`cap${ch.num}`]?.done;
          return `
          <div class="chapter-card ${isDone ? 'chapter-done' : ''}" style="border-left:3px solid ${ch.color}" onclick="toggleChapterDone(${ch.num});this.classList.toggle('chapter-done')">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div class="chapter-num" style="color:${ch.color}">CAPÍTULO ${ch.num}</div>
              <div class="chapter-done-badge" style="display:${isDone?'flex':'none'};background:${ch.color}20;color:${ch.color};font-size:.65rem;padding:.15rem .45rem;border-radius:20px;font-family:var(--font-mono)">✓ Completado</div>
            </div>
            <div class="chapter-title">${ch.title}</div>
            <div class="chapter-hours">⏱ ${ch.hours} horas</div>
            <div class="chapter-topics">${ch.topics}</div>
          </div>`;
        }).join('')}
      </div>

      <!-- FORMULA PREVIEW -->
      <div class="cyber-divider"><span>fórmulas esenciales</span></div>
      <div class="grid-3" style="margin-bottom:2rem">
        ${[
          { name: "Movimiento Parabólico", f: "R = v₀² · sin(2θ) / g", color: "#00d4ff" },
          { name: "Energía Cinética", f: "Ec = ½ · m · v²", color: "#ffd23f" },
          { name: "Segunda Ley de Newton", f: "ΣF = m · a", color: "#a855f7" },
          { name: "MAS - Período", f: "T = 2π √(m/k)", color: "#00ff88" },
          { name: "Conservación de Energía", f: "Ec + Ep = cte", color: "#ff6b6b" },
          { name: "Presión Hidrostática", f: "P = P₀ + ρ · g · h", color: "#00d4ff" }
        ].map(f => `
          <div class="card formula-card" onclick="navigate('/calculator')">
            <div style="font-size:.72rem;font-family:var(--font-mono);color:var(--text2);margin-bottom:.4rem">${f.name}</div>
            <div class="formula-display" style="color:${f.color}">${f.f}</div>
            <div style="font-size:.65rem;color:var(--text3);margin-top:.4rem;font-family:var(--font-mono)">→ calcular</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}
