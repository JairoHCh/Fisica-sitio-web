// ======= PHYSICS CALCULATOR =======
const CALCULATORS = [
  {
    id: 'mrv', name: 'MRU — Posición', chapter: 'Cap. 2',
    formula: 'x = x₀ + v · t',
    inputs: [['x₀', 'x0', 'm', 0], ['v', 'v', 'm/s', 10], ['t', 't', 's', 5]],
    calc: ({x0, v, t}) => ({ 'Posición x': `${(parseFloat(x0)+parseFloat(v)*parseFloat(t)).toFixed(4)} m` })
  },
  {
    id: 'mruv', name: 'MRUV — Posición y Velocidad', chapter: 'Cap. 2',
    formula: 'x = x₀ + v₀t + ½at²  |  v = v₀ + at',
    inputs: [['x₀', 'x0', 'm', 0], ['v₀', 'v0', 'm/s', 0], ['a', 'a', 'm/s²', 9.8], ['t', 't', 's', 3]],
    calc: ({x0,v0,a,t}) => {
      const x0f=parseFloat(x0),v0f=parseFloat(v0),af=parseFloat(a),tf=parseFloat(t);
      return { 'Posición x': `${(x0f+v0f*tf+0.5*af*tf*tf).toFixed(4)} m`, 'Velocidad v': `${(v0f+af*tf).toFixed(4)} m/s` };
    }
  },
  {
    id: 'freefall', name: 'Caída Libre', chapter: 'Cap. 2',
    formula: 'h = ½·g·t²  |  v = g·t',
    inputs: [['Altura h₀', 'h', 'm', 45], ['g', 'g', 'm/s²', 9.8]],
    calc: ({h, g}) => {
      const T = Math.sqrt(2*parseFloat(h)/parseFloat(g));
      const v = parseFloat(g)*T;
      return { 'Tiempo de caída': `${T.toFixed(4)} s`, 'Velocidad impacto': `${v.toFixed(4)} m/s` };
    }
  },
  {
    id: 'projectile', name: 'Proyectil — Alcance y Altura', chapter: 'Cap. 2',
    formula: 'R = v₀²sin(2θ)/g  |  H = v₀²sin²θ/(2g)',
    inputs: [['v₀', 'v0', 'm/s', 20], ['θ', 'theta', '°', 45], ['g', 'g', 'm/s²', 9.8]],
    calc: ({v0, theta, g}) => {
      const v=parseFloat(v0), th=parseFloat(theta)*Math.PI/180, gv=parseFloat(g);
      const R = v*v*Math.sin(2*th)/gv, H = v*v*Math.sin(th)*Math.sin(th)/(2*gv), T = 2*v*Math.sin(th)/gv;
      return { 'Alcance R': `${R.toFixed(3)} m`, 'Altura máx. H': `${H.toFixed(3)} m`, 'Tiempo vuelo T': `${T.toFixed(3)} s` };
    }
  },
  {
    id: 'newton2', name: 'Segunda Ley de Newton', chapter: 'Cap. 4',
    formula: 'F = m · a',
    inputs: [['Masa m', 'm', 'kg', 5], ['Aceleración a', 'a', 'm/s²', 2]],
    calc: ({m, a}) => ({ 'Fuerza F': `${(parseFloat(m)*parseFloat(a)).toFixed(4)} N` })
  },
  {
    id: 'ec', name: 'Energía Cinética', chapter: 'Cap. 5',
    formula: 'Ec = ½ · m · v²',
    inputs: [['Masa m', 'm', 'kg', 2], ['Velocidad v', 'v', 'm/s', 5]],
    calc: ({m, v}) => ({ 'Energía cinética': `${(0.5*parseFloat(m)*parseFloat(v)*parseFloat(v)).toFixed(4)} J` })
  },
  {
    id: 'ep', name: 'Energía Potencial', chapter: 'Cap. 5',
    formula: 'Ep = m · g · h',
    inputs: [['Masa m', 'm', 'kg', 2], ['Altura h', 'h', 'm', 10], ['g', 'g', 'm/s²', 9.8]],
    calc: ({m, h, g}) => ({ 'Energía potencial': `${(parseFloat(m)*parseFloat(g)*parseFloat(h)).toFixed(4)} J` })
  },
  {
    id: 'trabajo', name: 'Trabajo de una Fuerza', chapter: 'Cap. 5',
    formula: 'W = F · d · cos(θ)',
    inputs: [['Fuerza F', 'F', 'N', 10], ['Distancia d', 'd', 'm', 5], ['Ángulo θ', 'theta', '°', 0]],
    calc: ({F, d, theta}) => ({ 'Trabajo W': `${(parseFloat(F)*parseFloat(d)*Math.cos(parseFloat(theta)*Math.PI/180)).toFixed(4)} J` })
  },
  {
    id: 'potencia', name: 'Potencia', chapter: 'Cap. 5',
    formula: 'P = W / t = F · v',
    inputs: [['Trabajo W', 'W', 'J', 100], ['Tiempo t', 't', 's', 5]],
    calc: ({W, t}) => ({ 'Potencia P': `${(parseFloat(W)/parseFloat(t)).toFixed(4)} W` })
  },
  {
    id: 'mas', name: 'MAS — Período del Resorte', chapter: 'Cap. 8',
    formula: 'T = 2π√(m/k)',
    inputs: [['Masa m', 'm', 'kg', 1], ['Constante k', 'k', 'N/m', 10]],
    calc: ({m, k}) => {
      const T = 2*Math.PI*Math.sqrt(parseFloat(m)/parseFloat(k));
      return { 'Período T': `${T.toFixed(4)} s`, 'Frecuencia f': `${(1/T).toFixed(4)} Hz`, 'ω': `${Math.sqrt(parseFloat(k)/parseFloat(m)).toFixed(4)} rad/s` };
    }
  },
  {
    id: 'pendulo', name: 'Péndulo Simple — Período', chapter: 'Cap. 8',
    formula: 'T = 2π√(L/g)',
    inputs: [['Longitud L', 'L', 'm', 1], ['g', 'g', 'm/s²', 9.8]],
    calc: ({L, g}) => {
      const T = 2*Math.PI*Math.sqrt(parseFloat(L)/parseFloat(g));
      return { 'Período T': `${T.toFixed(4)} s`, 'Frecuencia f': `${(1/T).toFixed(4)} Hz` };
    }
  },
  {
    id: 'presion', name: 'Presión Hidrostática', chapter: 'Cap. 7',
    formula: 'P = P₀ + ρ·g·h',
    inputs: [['Presión atm P₀', 'P0', 'Pa', 101325], ['Densidad ρ', 'rho', 'kg/m³', 1000], ['Profundidad h', 'h', 'm', 10], ['g', 'g', 'm/s²', 9.8]],
    calc: ({P0, rho, h, g}) => ({
      'Presión total': `${(parseFloat(P0)+parseFloat(rho)*parseFloat(g)*parseFloat(h)).toFixed(2)} Pa`,
      'En atm': `${((parseFloat(P0)+parseFloat(rho)*parseFloat(g)*parseFloat(h))/101325).toFixed(4)} atm`
    })
  },
  // NEW CALCULATORS
  {
    id: 'impulso', name: 'Impulso y Cambio de Momento', chapter: 'Cap. 5',
    formula: 'J = F·Δt = Δp = m·(vf - vi)',
    inputs: [['Masa m', 'm', 'kg', 2], ['Vi', 'vi', 'm/s', 0], ['Vf', 'vf', 'm/s', 10], ['Tiempo Δt', 'dt', 's', 2]],
    calc: ({m, vi, vf, dt}) => {
      const dp = parseFloat(m)*(parseFloat(vf)-parseFloat(vi));
      const F = dp/parseFloat(dt);
      return { 'Impulso J': `${dp.toFixed(4)} N·s`, 'Fuerza media F': `${F.toFixed(4)} N`, 'Δp': `${dp.toFixed(4)} kg·m/s` };
    }
  },
  {
    id: 'colision_elastica', name: 'Colisión Elástica 1D', chapter: 'Cap. 5',
    formula: 'v₁f = (m₁-m₂)v₁i/(m₁+m₂)  |  v₂f = 2m₁v₁i/(m₁+m₂)',
    inputs: [['Masa 1 m₁', 'm1', 'kg', 2], ['Masa 2 m₂', 'm2', 'kg', 3], ['v₁ inicial', 'v1', 'm/s', 5], ['v₂ inicial', 'v2', 'm/s', 0]],
    calc: ({m1, m2, v1, v2}) => {
      const M1=parseFloat(m1), M2=parseFloat(m2), V1=parseFloat(v1), V2=parseFloat(v2);
      const v1f = ((M1-M2)*V1 + 2*M2*V2)/(M1+M2);
      const v2f = ((M2-M1)*V2 + 2*M1*V1)/(M1+M2);
      const Ec_i = 0.5*M1*V1**2 + 0.5*M2*V2**2;
      const Ec_f = 0.5*M1*v1f**2 + 0.5*M2*v2f**2;
      return { 'v₁ final': `${v1f.toFixed(4)} m/s`, 'v₂ final': `${v2f.toFixed(4)} m/s`, 'Ec inicial': `${Ec_i.toFixed(4)} J`, 'Ec final': `${Ec_f.toFixed(4)} J` };
    }
  },
  {
    id: 'gravedad', name: 'Fuerza Gravitacional', chapter: 'Cap. 1',
    formula: 'F = G·m₁·m₂ / r²',
    inputs: [['Masa 1', 'm1', 'kg', 5.97e24], ['Masa 2', 'm2', 'kg', 70], ['Distancia r', 'r', 'm', 6.37e6]],
    calc: ({m1, m2, r}) => {
      const G = 6.674e-11;
      const F = G*parseFloat(m1)*parseFloat(m2)/(parseFloat(r)**2);
      return { 'Fuerza F': `${F.toExponential(4)} N` };
    }
  },
  {
    id: 'ondas', name: 'Velocidad de Onda', chapter: 'Cap. 8',
    formula: 'v = λ·f  |  T = 1/f',
    inputs: [['Longitud de onda λ', 'lambda', 'm', 2], ['Frecuencia f', 'f', 'Hz', 5]],
    calc: ({lambda, f}) => {
      const fv = parseFloat(f);
      return {
        'Velocidad v': `${(parseFloat(lambda)*fv).toFixed(4)} m/s`,
        'Período T': `${(1/fv).toFixed(4)} s`,
        'ω (rad/s)': `${(2*Math.PI*fv).toFixed(4)} rad/s`
      };
    }
  },
  {
    id: 'rozamiento', name: 'Fuerza de Rozamiento', chapter: 'Cap. 3',
    formula: 'Fr = μ·N = μ·m·g·cos(θ)',
    inputs: [['Masa m', 'm', 'kg', 5], ['μ coef. rozamiento', 'mu', '', 0.3], ['Ángulo θ', 'theta', '°', 0], ['g', 'g', 'm/s²', 9.8]],
    calc: ({m, mu, theta, g}) => {
      const th = parseFloat(theta)*Math.PI/180;
      const N = parseFloat(m)*parseFloat(g)*Math.cos(th);
      const Fr = parseFloat(mu)*N;
      const Fnet = parseFloat(m)*parseFloat(g)*Math.sin(th) - Fr;
      const a = Fnet/parseFloat(m);
      return { 'Normal N': `${N.toFixed(4)} N`, 'Rozamiento Fr': `${Fr.toFixed(4)} N`, 'Fuerza neta': `${Fnet.toFixed(4)} N`, 'Aceleración': `${a.toFixed(4)} m/s²` };
    }
  },
  {
    id: 'calor', name: 'Calor y Temperatura', chapter: 'Cap. 9',
    formula: 'Q = m·c·ΔT',
    inputs: [['Masa m', 'm', 'kg', 1], ['Calor específico c', 'c', 'J/(kg·K)', 4186], ['ΔT', 'dT', 'K', 10]],
    calc: ({m, c, dT}) => ({
      'Calor Q': `${(parseFloat(m)*parseFloat(c)*parseFloat(dT)).toFixed(2)} J`,
      'En kJ': `${(parseFloat(m)*parseFloat(c)*parseFloat(dT)/1000).toFixed(4)} kJ`,
      'En kcal': `${(parseFloat(m)*parseFloat(c)*parseFloat(dT)/4184).toFixed(4)} kcal`
    })
  }
];

function renderCalculator() {
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">∑ <span>Calculadora</span> de Física</h1>
          <div class="section-subtitle">${CALCULATORS.length} fórmulas interactivas · Cap. 1–9</div>
        </div>
      </div>
      <div class="calc-grid">
        ${CALCULATORS.map(c => renderCalcCard(c)).join('')}
      </div>
    </div>`;
}

function renderCalcCard(c) {
  return `
    <div class="calc-card" id="calc-${c.id}">
      <span class="badge badge-cyan" style="margin-bottom:.5rem">${c.chapter}</span>
      <div class="calc-name">${c.name}</div>
      <div class="calc-formula">${c.formula}</div>
      ${c.inputs.map(([label, name, unit, def]) => `
        <div class="form-group">
          <label class="form-label">${label} (${unit})</label>
          <input type="number" class="form-control" id="c-${c.id}-${name}" value="${def}" step="any"
            oninput="computeCalc('${c.id}')">
        </div>
      `).join('')}
      <div class="calc-result" id="calc-result-${c.id}">— ingresa valores —</div>
    </div>`;
}

function computeCalc(id) {
  const c = CALCULATORS.find(x => x.id === id);
  if (!c) return;
  const values = {};
  for (const [, name] of c.inputs) {
    const el = document.getElementById(`c-${id}-${name}`);
    values[name] = el ? el.value : 0;
  }
  try {
    const result = c.calc(values);
    const resEl = document.getElementById(`calc-result-${id}`);
    resEl.innerHTML = Object.entries(result).map(([k,v]) => `<div style="display:flex;justify-content:space-between;width:100%"><span style="color:var(--text2)">${k}:</span><span style="color:var(--cyan);font-weight:700">${v}</span></div>`).join('');
  } catch (e) {
    document.getElementById(`calc-result-${id}`).textContent = 'Error en cálculo';
  }
}

// Auto-compute on page load
function initCalculators() {
  CALCULATORS.forEach(c => computeCalc(c.id));
}
