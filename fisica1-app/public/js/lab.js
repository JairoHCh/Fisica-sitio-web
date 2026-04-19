// ======= VIRTUAL LAB =======
const SIMULATIONS = [
  { id: 'projectile', name: 'Movimiento Parabólico', icon: '🚀', desc: 'Analiza trayectorias con velocidad inicial y ángulo de lanzamiento variables.', chapter: 'Cap. 2' },
  { id: 'shm', name: 'Movimiento Armónico Simple', icon: '🌊', desc: 'Simula un sistema masa-resorte con energía cinética y potencial en tiempo real.', chapter: 'Cap. 8' },
  { id: 'pendulum', name: 'Péndulo Simple', icon: '⏱', desc: 'Visualiza la oscilación del péndulo y calcula su período.', chapter: 'Cap. 8' },
  { id: 'freefall', name: 'Caída Libre', icon: '⬇', desc: 'Observa la aceleración gravitacional y calcula posición y velocidad en todo instante.', chapter: 'Cap. 2' },
  { id: 'vectors', name: 'Operaciones Vectoriales', icon: '→', desc: 'Suma y resta vectores visualmente con representación gráfica.', chapter: 'Cap. 1' }
];

let simRunning = false;
let simAnimId = null;

function renderLab() {
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">⚗ <span>Laboratorio</span> Virtual</h1>
          <div class="section-subtitle">Simulaciones interactivas de los temas del curso</div>
        </div>
      </div>
      <div class="sim-grid" id="sim-grid">
        ${SIMULATIONS.map(s => `
          <div class="sim-card" onclick="launchSim('${s.id}')">
            <div class="sim-icon">${s.icon}</div>
            <span class="badge badge-cyan" style="align-self:flex-start">${s.chapter}</span>
            <div class="sim-name">${s.name}</div>
            <div class="sim-desc">${s.desc}</div>
            <button class="btn btn-ghost btn-sm" style="align-self:flex-start;margin-top:auto">Iniciar →</button>
          </div>
        `).join('')}
      </div>
      <div id="sim-active"></div>
    </div>`;
}

function launchSim(id) {
  if (simAnimId) cancelAnimationFrame(simAnimId);
  simRunning = false;
  const container = document.getElementById('sim-active');
  const simFns = { projectile: buildProjectile, shm: buildSHM, pendulum: buildPendulum, freefall: buildFreeFall, vectors: buildVectors };
  container.innerHTML = simFns[id] ? simFns[id]() : '';
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========= PROJECTILE =========
function buildProjectile() {
  return `
    <div class="sim-container active" id="proj-sim">
      <div>
        <button class="btn btn-ghost btn-sm back-btn" onclick="document.getElementById('sim-active').innerHTML='';if(simAnimId)cancelAnimationFrame(simAnimId)">← Cerrar</button>
        <div class="sim-canvas-wrap"><canvas id="proj-canvas" width="500" height="350"></canvas></div>
      </div>
      <div class="sim-controls">
        <div class="sim-title">🚀 Movimiento Parabólico</div>
        <div class="form-group"><label class="form-label">Velocidad inicial (m/s)</label><input type="range" id="proj-v0" min="5" max="50" value="20" oninput="document.getElementById('v0-val').textContent=this.value"><span class="font-mono text-cyan" id="v0-val">20</span> m/s</div>
        <div class="form-group"><label class="form-label">Ángulo (°)</label><input type="range" id="proj-angle" min="1" max="89" value="45" oninput="document.getElementById('ang-val').textContent=this.value"><span class="font-mono text-cyan" id="ang-val">45</span>°</div>
        <div class="form-group"><label class="form-label">g (m/s²)</label><input type="range" id="proj-g" min="1" max="20" value="10" step="0.5" oninput="document.getElementById('g-val').textContent=this.value"><span class="font-mono text-cyan" id="g-val">10</span> m/s²</div>
        <button class="btn btn-primary" onclick="runProjectile()">▶ Lanzar</button>
        <div class="sim-result-box" id="proj-results">
          <div class="result-row"><span class="result-label">Alcance máximo</span><span class="result-val" id="r-range">–</span></div>
          <div class="result-row"><span class="result-label">Altura máxima</span><span class="result-val" id="r-hmax">–</span></div>
          <div class="result-row"><span class="result-label">Tiempo de vuelo</span><span class="result-val" id="r-time">–</span></div>
          <div class="result-row"><span class="result-label">Vx</span><span class="result-val" id="r-vx">–</span></div>
          <div class="result-row"><span class="result-label">Vy (inicial)</span><span class="result-val" id="r-vy">–</span></div>
        </div>
      </div>
    </div>`;
}

function runProjectile() {
  if (simAnimId) cancelAnimationFrame(simAnimId);
  const canvas = document.getElementById('proj-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const v0 = parseFloat(document.getElementById('proj-v0').value);
  const angle = parseFloat(document.getElementById('proj-angle').value) * Math.PI / 180;
  const g = parseFloat(document.getElementById('proj-g').value);
  const vx = v0 * Math.cos(angle), vy0 = v0 * Math.sin(angle);
  const T = 2 * vy0 / g, R = vx * T, H = vy0 * vy0 / (2 * g);
  document.getElementById('r-range').textContent = R.toFixed(2) + ' m';
  document.getElementById('r-hmax').textContent = H.toFixed(2) + ' m';
  document.getElementById('r-time').textContent = T.toFixed(2) + ' s';
  document.getElementById('r-vx').textContent = vx.toFixed(2) + ' m/s';
  document.getElementById('r-vy').textContent = vy0.toFixed(2) + ' m/s';
  const W = canvas.width, H_c = canvas.height;
  const scaleX = (W - 60) / Math.max(R, 1), scaleY = (H_c - 60) / Math.max(H * 2.2, 1);
  const scale = Math.min(scaleX, scaleY);
  const ox = 40, oy = H_c - 30;
  let t = 0, trail = [];
  function frame() {
    ctx.clearRect(0, 0, W, H_c);
    // Grid
    ctx.strokeStyle = '#0d1128'; ctx.lineWidth = 1;
    for (let i = ox; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 20); ctx.lineTo(i, H_c - 20); ctx.stroke(); }
    for (let i = oy; i > 20; i -= 40) { ctx.beginPath(); ctx.moveTo(20, i); ctx.lineTo(W - 20, i); ctx.stroke(); }
    // Axes
    ctx.strokeStyle = '#1e3a5f'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, H_c - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, oy); ctx.lineTo(W - 20, oy); ctx.stroke();
    // Trail
    if (trail.length > 1) {
      ctx.beginPath(); ctx.strokeStyle = 'rgba(0,212,255,0.4)'; ctx.lineWidth = 1.5;
      ctx.moveTo(trail[0].x, trail[0].y);
      trail.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    const x = vx * t, y = vy0 * t - 0.5 * g * t * t;
    if (y >= 0 && t <= T + 0.05) {
      const cx = ox + x * scale, cy = oy - y * scale;
      trail.push({ x: cx, y: cy });
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff'; ctx.shadowBlur = 15; ctx.shadowColor = '#00d4ff'; ctx.fill();
      ctx.shadowBlur = 0;
      // Labels
      ctx.fillStyle = '#7a8eaa'; ctx.font = '10px JetBrains Mono';
      ctx.fillText(`x=${x.toFixed(1)}m`, cx + 10, cy - 5);
      ctx.fillText(`y=${y.toFixed(1)}m`, cx + 10, cy + 12);
      t += 0.03; simAnimId = requestAnimationFrame(frame);
    }
  }
  frame();
}

// ========= SHM =========
function buildSHM() {
  return `
    <div class="sim-container active" id="shm-sim">
      <div>
        <button class="btn btn-ghost btn-sm back-btn" onclick="document.getElementById('sim-active').innerHTML='';if(simAnimId)cancelAnimationFrame(simAnimId)">← Cerrar</button>
        <div class="sim-canvas-wrap"><canvas id="shm-canvas" width="500" height="350"></canvas></div>
      </div>
      <div class="sim-controls">
        <div class="sim-title">🌊 Movimiento Armónico Simple</div>
        <div class="form-group"><label class="form-label">Masa (kg)</label><input type="range" id="shm-m" min="0.1" max="5" step="0.1" value="1" oninput="document.getElementById('m-val').textContent=this.value"><span class="font-mono text-cyan" id="m-val">1</span> kg</div>
        <div class="form-group"><label class="form-label">Constante k (N/m)</label><input type="range" id="shm-k" min="1" max="100" value="20" oninput="document.getElementById('k-val').textContent=this.value"><span class="font-mono text-cyan" id="k-val">20</span> N/m</div>
        <div class="form-group"><label class="form-label">Amplitud (m)</label><input type="range" id="shm-a" min="0.1" max="2" step="0.1" value="1" oninput="document.getElementById('a-val').textContent=this.value"><span class="font-mono text-cyan" id="a-val">1</span> m</div>
        <button class="btn btn-primary" onclick="runSHM()">▶ Iniciar</button>
        <div class="sim-result-box" id="shm-results">
          <div class="result-row"><span class="result-label">Período T</span><span class="result-val" id="s-period">–</span></div>
          <div class="result-row"><span class="result-label">Frecuencia f</span><span class="result-val" id="s-freq">–</span></div>
          <div class="result-row"><span class="result-label">ω (rad/s)</span><span class="result-val" id="s-omega">–</span></div>
          <div class="result-row"><span class="result-label">Ec (J)</span><span class="result-val" id="s-ec">–</span></div>
          <div class="result-row"><span class="result-label">Ep (J)</span><span class="result-val" id="s-ep">–</span></div>
        </div>
      </div>
    </div>`;
}

function runSHM() {
  if (simAnimId) cancelAnimationFrame(simAnimId);
  const canvas = document.getElementById('shm-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const m = parseFloat(document.getElementById('shm-m').value);
  const k = parseFloat(document.getElementById('shm-k').value);
  const A = parseFloat(document.getElementById('shm-a').value);
  const omega = Math.sqrt(k / m);
  const T = 2 * Math.PI / omega;
  const f = 1 / T;
  document.getElementById('s-period').textContent = T.toFixed(3) + ' s';
  document.getElementById('s-freq').textContent = f.toFixed(3) + ' Hz';
  document.getElementById('s-omega').textContent = omega.toFixed(3) + ' rad/s';
  const W = canvas.width, H = canvas.height;
  let t = 0;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    const x = A * Math.cos(omega * t);
    const v = -A * omega * Math.sin(omega * t);
    const Ec = 0.5 * m * v * v, Ep = 0.5 * k * x * x;
    document.getElementById('s-ec').textContent = Ec.toFixed(3) + ' J';
    document.getElementById('s-ep').textContent = Ep.toFixed(3) + ' J';
    const cx = W / 2 + x * 80, cy = H / 2;
    // Ceiling & spring
    ctx.fillStyle = '#1e3a5f'; ctx.fillRect(0, 20, W, 10);
    const springY = cy - 30;
    ctx.strokeStyle = '#7a8eaa'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, springY); ctx.stroke();
    ctx.setLineDash([]);
    // Mass
    ctx.fillStyle = '#0c1020'; ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#00d4ff'; ctx.font = 'bold 10px Orbitron';
    ctx.textAlign = 'center'; ctx.fillText(m + 'kg', cx, cy + 4);
    // Equilibrium line
    ctx.strokeStyle = 'rgba(255,210,63,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(W / 2, 40); ctx.lineTo(W / 2, H - 10); ctx.stroke();
    ctx.setLineDash([]);
    // Energy bars
    const barX = 20, barW = 20, maxH = 100, barY = H - 30;
    ctx.fillStyle = 'rgba(0,212,255,0.2)'; ctx.fillRect(barX, barY - maxH, barW, maxH);
    ctx.fillStyle = '#00d4ff'; const ecH = (Ec / (0.5 * k * A * A)) * maxH;
    ctx.fillRect(barX, barY - ecH, barW, ecH);
    ctx.fillStyle = 'rgba(168,85,247,0.2)'; ctx.fillRect(barX + 25, barY - maxH, barW, maxH);
    ctx.fillStyle = '#a855f7'; const epH = (Ep / (0.5 * k * A * A)) * maxH;
    ctx.fillRect(barX + 25, barY - epH, barW, epH);
    ctx.fillStyle = '#7a8eaa'; ctx.font = '9px JetBrains Mono'; ctx.textAlign = 'center';
    ctx.fillText('Ec', barX + 10, barY + 12); ctx.fillText('Ep', barX + 35, barY + 12);
    t += 0.03; simAnimId = requestAnimationFrame(frame);
  }
  frame();
}

// ========= PENDULUM =========
function buildPendulum() {
  return `
    <div class="sim-container active" id="pend-sim">
      <div>
        <button class="btn btn-ghost btn-sm back-btn" onclick="document.getElementById('sim-active').innerHTML='';if(simAnimId)cancelAnimationFrame(simAnimId)">← Cerrar</button>
        <div class="sim-canvas-wrap"><canvas id="pend-canvas" width="500" height="350"></canvas></div>
      </div>
      <div class="sim-controls">
        <div class="sim-title">⏱ Péndulo Simple</div>
        <div class="form-group"><label class="form-label">Longitud (m)</label><input type="range" id="pend-l" min="0.2" max="3" step="0.1" value="1" oninput="document.getElementById('l-val').textContent=this.value"><span class="font-mono text-cyan" id="l-val">1</span> m</div>
        <div class="form-group"><label class="form-label">Ángulo inicial (°)</label><input type="range" id="pend-a0" min="5" max="60" value="30" oninput="document.getElementById('a0-val').textContent=this.value"><span class="font-mono text-cyan" id="a0-val">30</span>°</div>
        <div class="form-group"><label class="form-label">g (m/s²)</label><input type="range" id="pend-g" min="1" max="25" step="0.5" value="9.8" oninput="document.getElementById('pg-val').textContent=this.value"><span class="font-mono text-cyan" id="pg-val">9.8</span> m/s²</div>
        <button class="btn btn-primary" onclick="runPendulum()">▶ Soltar</button>
        <div class="sim-result-box">
          <div class="result-row"><span class="result-label">Período T</span><span class="result-val" id="p-period">–</span></div>
          <div class="result-row"><span class="result-label">Frecuencia</span><span class="result-val" id="p-freq">–</span></div>
          <div class="result-row"><span class="result-label">Ángulo actual</span><span class="result-val" id="p-angle">–</span></div>
          <div class="result-row"><span class="result-label">Velocidad angular</span><span class="result-val" id="p-omega">–</span></div>
        </div>
      </div>
    </div>`;
}

function runPendulum() {
  if (simAnimId) cancelAnimationFrame(simAnimId);
  const canvas = document.getElementById('pend-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const L = parseFloat(document.getElementById('pend-l').value);
  const a0 = parseFloat(document.getElementById('pend-a0').value) * Math.PI / 180;
  const g = parseFloat(document.getElementById('pend-g').value);
  const T = 2 * Math.PI * Math.sqrt(L / g);
  document.getElementById('p-period').textContent = T.toFixed(3) + ' s';
  document.getElementById('p-freq').textContent = (1 / T).toFixed(3) + ' Hz';
  const W = canvas.width, H = canvas.height;
  const pivot = { x: W / 2, y: 60 };
  const scale = Math.min(W, H) * 0.35 / L;
  let theta = a0, omega = 0, dt = 0.016;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    omega += (-g / L) * Math.sin(theta) * dt;
    theta += omega * dt;
    const bx = pivot.x + L * scale * Math.sin(theta);
    const by = pivot.y + L * scale * Math.cos(theta);
    ctx.fillStyle = '#1e3a5f'; ctx.beginPath(); ctx.arc(pivot.x, pivot.y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#7a8eaa'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pivot.x, pivot.y); ctx.lineTo(bx, by); ctx.stroke();
    ctx.fillStyle = '#00d4ff'; ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2);
    ctx.shadowBlur = 15; ctx.shadowColor = '#00d4ff'; ctx.fill(); ctx.shadowBlur = 0;
    // Equilibrium
    ctx.strokeStyle = 'rgba(255,210,63,0.25)'; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(pivot.x, pivot.y); ctx.lineTo(pivot.x, pivot.y + L * scale + 20); ctx.stroke();
    ctx.setLineDash([]);
    document.getElementById('p-angle').textContent = (theta * 180 / Math.PI).toFixed(2) + '°';
    document.getElementById('p-omega').textContent = omega.toFixed(3) + ' rad/s';
    simAnimId = requestAnimationFrame(frame);
  }
  frame();
}

// ========= FREE FALL =========
function buildFreeFall() {
  return `
    <div class="sim-container active" id="ff-sim">
      <div>
        <button class="btn btn-ghost btn-sm back-btn" onclick="document.getElementById('sim-active').innerHTML='';if(simAnimId)cancelAnimationFrame(simAnimId)">← Cerrar</button>
        <div class="sim-canvas-wrap"><canvas id="ff-canvas" width="500" height="350"></canvas></div>
      </div>
      <div class="sim-controls">
        <div class="sim-title">⬇ Caída Libre</div>
        <div class="form-group"><label class="form-label">Altura (m)</label><input type="range" id="ff-h" min="10" max="200" value="80" oninput="document.getElementById('fh-val').textContent=this.value"><span class="font-mono text-cyan" id="fh-val">80</span> m</div>
        <div class="form-group"><label class="form-label">g (m/s²)</label><input type="range" id="ff-g" min="1" max="25" step="0.5" value="9.8" oninput="document.getElementById('fg-val').textContent=this.value"><span class="font-mono text-cyan" id="fg-val">9.8</span> m/s²</div>
        <button class="btn btn-primary" onclick="runFreeFall()">▶ Soltar</button>
        <div class="sim-result-box">
          <div class="result-row"><span class="result-label">Tiempo</span><span class="result-val" id="ff-t">–</span></div>
          <div class="result-row"><span class="result-label">Posición y</span><span class="result-val" id="ff-y">–</span></div>
          <div class="result-row"><span class="result-label">Velocidad</span><span class="result-val" id="ff-v">–</span></div>
          <div class="result-row"><span class="result-label">Aceleración</span><span class="result-val" id="ff-acc">–</span></div>
          <div class="result-row"><span class="result-label">Tiempo total</span><span class="result-val" id="ff-total">–</span></div>
        </div>
      </div>
    </div>`;
}

function runFreeFall() {
  if (simAnimId) cancelAnimationFrame(simAnimId);
  const canvas = document.getElementById('ff-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const H0 = parseFloat(document.getElementById('ff-h').value);
  const g = parseFloat(document.getElementById('ff-g').value);
  const totalT = Math.sqrt(2 * H0 / g);
  document.getElementById('ff-total').textContent = totalT.toFixed(2) + ' s';
  document.getElementById('ff-acc').textContent = g + ' m/s²';
  const W = canvas.width, CH = canvas.height;
  const oy = CH - 30, ox = W / 2;
  const scale = (CH - 60) / H0;
  let t = 0;
  function frame() {
    ctx.clearRect(0, 0, W, CH);
    ctx.fillStyle = '#0c1020'; ctx.fillRect(0, oy, W, CH - oy);
    ctx.fillStyle = '#1e3a5f'; ctx.fillRect(0, oy - 1, W, 3);
    ctx.fillStyle = '#00ff88'; ctx.font = '9px JetBrains Mono';
    ctx.fillText('Suelo (y=0)', 10, oy - 5);
    if (t <= totalT) {
      const y = H0 - 0.5 * g * t * t;
      const v = g * t;
      const cy = oy - y * scale;
      ctx.fillStyle = '#00d4ff'; ctx.shadowBlur = 15; ctx.shadowColor = '#00d4ff';
      ctx.beginPath(); ctx.arc(ox, cy, 12, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#7a8eaa'; ctx.font = '9px JetBrains Mono';
      ctx.fillText(`y=${y.toFixed(1)}m`, ox + 18, cy);
      ctx.fillText(`v=${v.toFixed(1)}m/s`, ox + 18, cy + 12);
      // Ground line
      ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, cy); ctx.stroke();
      ctx.setLineDash([]);
      document.getElementById('ff-t').textContent = t.toFixed(2) + ' s';
      document.getElementById('ff-y').textContent = y.toFixed(2) + ' m';
      document.getElementById('ff-v').textContent = v.toFixed(2) + ' m/s';
      t += 0.04;
    } else {
      ctx.fillStyle = '#ff4757'; ctx.beginPath(); ctx.arc(ox, oy - 12, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffd23f'; ctx.font = '12px Orbitron'; ctx.textAlign = 'center';
      ctx.fillText('¡IMPACTO!', ox, oy - 35);
      cancelAnimationFrame(simAnimId);
      return;
    }
    simAnimId = requestAnimationFrame(frame);
  }
  frame();
}

// ========= VECTORS =========
function buildVectors() {
  return `
    <div class="sim-container active" id="vec-sim">
      <div>
        <button class="btn btn-ghost btn-sm back-btn" onclick="document.getElementById('sim-active').innerHTML='';if(simAnimId)cancelAnimationFrame(simAnimId)">← Cerrar</button>
        <div class="sim-canvas-wrap"><canvas id="vec-canvas" width="500" height="350"></canvas></div>
      </div>
      <div class="sim-controls">
        <div class="sim-title">→ Operaciones Vectoriales</div>
        <div class="form-group"><label class="form-label" style="color:var(--cyan)">Vector A</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
            <div><label class="form-label" style="font-size:.7rem">Ax</label><input type="number" class="form-control" id="ax" value="3" step="0.5"></div>
            <div><label class="form-label" style="font-size:.7rem">Ay</label><input type="number" class="form-control" id="ay" value="4" step="0.5"></div>
          </div>
        </div>
        <div class="form-group"><label class="form-label" style="color:var(--gold)">Vector B</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
            <div><label class="form-label" style="font-size:.7rem">Bx</label><input type="number" class="form-control" id="bx" value="2" step="0.5"></div>
            <div><label class="form-label" style="font-size:.7rem">By</label><input type="number" class="form-control" id="by" value="-1" step="0.5"></div>
          </div>
        </div>
        <button class="btn btn-primary" onclick="drawVectors()">Calcular</button>
        <div class="sim-result-box">
          <div class="result-row"><span class="result-label">|A|</span><span class="result-val" id="v-ma">–</span></div>
          <div class="result-row"><span class="result-label">|B|</span><span class="result-val" id="v-mb">–</span></div>
          <div class="result-row"><span class="result-label">A+B</span><span class="result-val" id="v-sum">–</span></div>
          <div class="result-row"><span class="result-label">|A+B|</span><span class="result-val" id="v-msum">–</span></div>
          <div class="result-row"><span class="result-label">A·B</span><span class="result-val" id="v-dot">–</span></div>
          <div class="result-row"><span class="result-label">ángulo(A,B)</span><span class="result-val" id="v-ang">–</span></div>
        </div>
      </div>
    </div>`;
}

function drawVectors() {
  const canvas = document.getElementById('vec-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const ax = parseFloat(document.getElementById('ax').value) || 0;
  const ay = parseFloat(document.getElementById('ay').value) || 0;
  const bx = parseFloat(document.getElementById('bx').value) || 0;
  const by = parseFloat(document.getElementById('by').value) || 0;
  const ma = Math.sqrt(ax*ax+ay*ay), mb = Math.sqrt(bx*bx+by*by);
  const sx = ax+bx, sy = ay+by, ms = Math.sqrt(sx*sx+sy*sy);
  const dot = ax*bx+ay*by;
  const ang = Math.acos(Math.max(-1,Math.min(1, dot/(ma*mb)))) * 180/Math.PI;
  document.getElementById('v-ma').textContent = ma.toFixed(2);
  document.getElementById('v-mb').textContent = mb.toFixed(2);
  document.getElementById('v-sum').textContent = `(${sx.toFixed(2)}, ${sy.toFixed(2)})`;
  document.getElementById('v-msum').textContent = ms.toFixed(2);
  document.getElementById('v-dot').textContent = dot.toFixed(2);
  document.getElementById('v-ang').textContent = ang.toFixed(2) + '°';
  const W = canvas.width, H = canvas.height;
  const ox = W/2, oy = H/2;
  const maxComp = Math.max(Math.abs(ax),Math.abs(ay),Math.abs(bx),Math.abs(by),Math.abs(sx),Math.abs(sy),1);
  const scale = Math.min(W,H) * 0.35 / maxComp;
  ctx.clearRect(0, 0, W, H);
  // Grid
  ctx.strokeStyle = '#0d1128'; ctx.lineWidth = 1;
  for (let x = ox % 40; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = oy % 40; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // Axes
  ctx.strokeStyle = '#1e3a5f'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
  ctx.fillStyle = '#4a5568'; ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'center';
  ctx.fillText('+x', W-15, oy-5); ctx.fillText('+y', ox+5, 15);
  function arrow(fromX, fromY, dx, dy, color, label) {
    const toX = fromX + dx * scale, toY = fromY - dy * scale;
    ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(fromX, fromY); ctx.lineTo(toX, toY); ctx.stroke();
    const ang = Math.atan2(fromY - toY, toX - fromX);
    const hw = 9, hl = 15;
    ctx.fillStyle = color; ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - hl*Math.cos(ang) + hw*Math.sin(ang), toY + hl*Math.sin(ang) + hw*Math.cos(ang));
    ctx.lineTo(toX - hl*Math.cos(ang) - hw*Math.sin(ang), toY + hl*Math.sin(ang) - hw*Math.cos(ang));
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = color; ctx.font = 'bold 12px Orbitron'; ctx.textAlign = 'center';
    ctx.fillText(label, toX + 14*Math.cos(ang+Math.PI/2), toY - 14*Math.sin(ang+Math.PI/2));
  }
  arrow(ox, oy, ax, ay, '#00d4ff', 'A');
  arrow(ox, oy, bx, by, '#ffd23f', 'B');
  arrow(ox, oy, sx, sy, '#00ff88', 'R');
  // Parallelogram dashed
  ctx.strokeStyle = 'rgba(0,212,255,0.2)'; ctx.setLineDash([4,4]); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox+ax*scale, oy-ay*scale); ctx.lineTo(ox+sx*scale, oy-sy*scale); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox+bx*scale, oy-by*scale); ctx.lineTo(ox+sx*scale, oy-sy*scale); ctx.stroke();
  ctx.setLineDash([]);
}
