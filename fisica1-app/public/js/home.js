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
          <button class="btn btn-ghost" onclick="navigate('/forum')">❋ Ir al Foro</button>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">9</div><div class="stat-label">Capítulos</div></div>
          <div class="stat-item"><div class="stat-num">56</div><div class="stat-label">Horas Teóricas</div></div>
          <div class="stat-item"><div class="stat-num">5</div><div class="stat-label">Simulaciones</div></div>
          <div class="stat-item"><div class="stat-num">4</div><div class="stat-label">Módulos</div></div>
        </div>
      </div>

      <!-- QUICK TOOLS -->
      <div class="cyber-divider"><span>acceso rápido</span></div>
      <div class="grid-4" style="margin-bottom:2rem">
        <div class="card" style="cursor:pointer;text-align:center" onclick="navigate('/blog')">
          <div style="font-size:2rem;margin-bottom:.5rem">✦</div>
          <div class="font-display" style="font-size:.8rem;color:var(--cyan)">BLOG</div>
          <div class="text-small text-muted mt-1">Artículos de física</div>
        </div>
        <div class="card" style="cursor:pointer;text-align:center" onclick="navigate('/lab')">
          <div style="font-size:2rem;margin-bottom:.5rem">⚗</div>
          <div class="font-display" style="font-size:.8rem;color:var(--gold)">LABORATORIO</div>
          <div class="text-small text-muted mt-1">Simulaciones físicas</div>
        </div>
        <div class="card" style="cursor:pointer;text-align:center" onclick="navigate('/calculator')">
          <div style="font-size:2rem;margin-bottom:.5rem">∑</div>
          <div class="font-display" style="font-size:.8rem;color:var(--purple)">CALCULADORA</div>
          <div class="text-small text-muted mt-1">Fórmulas interactivas</div>
        </div>
        <div class="card" style="cursor:pointer;text-align:center" onclick="navigate('/notes')">
          <div style="font-size:2rem;margin-bottom:.5rem">✎</div>
          <div class="font-display" style="font-size:.8rem;color:var(--green)">NOTAS</div>
          <div class="text-small text-muted mt-1">Tu bloc de apuntes</div>
        </div>
      </div>

      <!-- CHAPTERS -->
      <div class="cyber-divider"><span>contenido del curso</span></div>
      <div class="grid-3" style="margin-bottom:2rem">
        ${CHAPTERS.map(ch => `
          <div class="chapter-card" style="border-left:3px solid ${ch.color}">
            <div class="chapter-num" style="color:${ch.color}">CAPÍTULO ${ch.num}</div>
            <div class="chapter-title">${ch.title}</div>
            <div class="chapter-hours">⏱ ${ch.hours} horas</div>
            <div class="chapter-topics">${ch.topics}</div>
          </div>
        `).join('')}
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
          <div class="card">
            <div style="font-size:.72rem;font-family:var(--font-mono);color:var(--text2);margin-bottom:.4rem">${f.name}</div>
            <div style="font-size:1.1rem;font-family:var(--font-mono);color:${f.color};padding:.5rem;background:var(--bg2);border-radius:6px;text-align:center">${f.f}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}
