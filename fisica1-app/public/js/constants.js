// ======= PHYSICS CONSTANTS =======
const PHYSICS_CONSTANTS = [
  // Universal
  { symbol: 'c', name: 'Velocidad de la luz en el vacío', value: '2.997 924 58 × 10⁸', unit: 'm/s', category: 'Universal', color: '#00d4ff' },
  { symbol: 'h', name: 'Constante de Planck', value: '6.626 070 15 × 10⁻³⁴', unit: 'J·s', category: 'Universal', color: '#00d4ff' },
  { symbol: 'ħ', name: 'Constante de Planck reducida (h/2π)', value: '1.054 571 817 × 10⁻³⁴', unit: 'J·s', category: 'Universal', color: '#00d4ff' },
  { symbol: 'G', name: 'Constante de gravitación universal', value: '6.674 30 × 10⁻¹¹', unit: 'N·m²/kg²', category: 'Universal', color: '#00d4ff' },
  { symbol: 'k_B', name: 'Constante de Boltzmann', value: '1.380 649 × 10⁻²³', unit: 'J/K', category: 'Universal', color: '#00d4ff' },
  { symbol: 'N_A', name: 'Número de Avogadro', value: '6.022 140 76 × 10²³', unit: 'mol⁻¹', category: 'Universal', color: '#00d4ff' },
  { symbol: 'R', name: 'Constante de los gases ideales', value: '8.314 462 618', unit: 'J/(mol·K)', category: 'Universal', color: '#00d4ff' },
  { symbol: 'σ', name: 'Constante de Stefan-Boltzmann', value: '5.670 374 419 × 10⁻⁸', unit: 'W/(m²·K⁴)', category: 'Universal', color: '#00d4ff' },

  // Mecánica / Gravedad
  { symbol: 'g', name: 'Aceleración gravitacional (Tierra)', value: '9.806 65', unit: 'm/s²', category: 'Mecánica', color: '#a855f7' },
  { symbol: 'M_T', name: 'Masa de la Tierra', value: '5.972 × 10²⁴', unit: 'kg', category: 'Mecánica', color: '#a855f7' },
  { symbol: 'R_T', name: 'Radio de la Tierra (ecuador)', value: '6.378 × 10⁶', unit: 'm', category: 'Mecánica', color: '#a855f7' },
  { symbol: 'M_☉', name: 'Masa del Sol', value: '1.989 × 10³⁰', unit: 'kg', category: 'Mecánica', color: '#a855f7' },
  { symbol: 'R_☉', name: 'Radio del Sol', value: '6.957 × 10⁸', unit: 'm', category: 'Mecánica', color: '#a855f7' },
  { symbol: 'AU', name: 'Unidad Astronómica', value: '1.495 978 707 × 10¹¹', unit: 'm', category: 'Mecánica', color: '#a855f7' },

  // Electromagnetismo
  { symbol: 'e', name: 'Carga elemental', value: '1.602 176 634 × 10⁻¹⁹', unit: 'C', category: 'Electromagnetismo', color: '#ffd23f' },
  { symbol: 'ε₀', name: 'Permitividad del vacío', value: '8.854 187 812 8 × 10⁻¹²', unit: 'F/m', category: 'Electromagnetismo', color: '#ffd23f' },
  { symbol: 'μ₀', name: 'Permeabilidad del vacío', value: '1.256 637 × 10⁻⁶', unit: 'N/A²', category: 'Electromagnetismo', color: '#ffd23f' },
  { symbol: 'k_e', name: 'Constante de Coulomb', value: '8.987 552 × 10⁹', unit: 'N·m²/C²', category: 'Electromagnetismo', color: '#ffd23f' },

  // Atómico
  { symbol: 'm_e', name: 'Masa del electrón', value: '9.109 383 7015 × 10⁻³¹', unit: 'kg', category: 'Atómico', color: '#00ff88' },
  { symbol: 'm_p', name: 'Masa del protón', value: '1.672 621 923 69 × 10⁻²⁷', unit: 'kg', category: 'Atómico', color: '#00ff88' },
  { symbol: 'm_n', name: 'Masa del neutrón', value: '1.674 927 498 04 × 10⁻²⁷', unit: 'kg', category: 'Atómico', color: '#00ff88' },
  { symbol: 'a₀', name: 'Radio de Bohr', value: '5.291 772 109 03 × 10⁻¹¹', unit: 'm', category: 'Atómico', color: '#00ff88' },
  { symbol: 'u', name: 'Unidad de masa atómica', value: '1.660 539 066 60 × 10⁻²⁷', unit: 'kg', category: 'Atómico', color: '#00ff88' },
  { symbol: 'eV', name: 'Electronvolt', value: '1.602 176 634 × 10⁻¹⁹', unit: 'J', category: 'Atómico', color: '#00ff88' },

  // Termodinámica
  { symbol: 'atm', name: 'Presión atmosférica estándar', value: '101 325', unit: 'Pa', category: 'Termodinámica', color: '#ff6b6b' },
  { symbol: 'T₀', name: 'Cero absoluto', value: '0', unit: 'K (−273.15 °C)', category: 'Termodinámica', color: '#ff6b6b' },
  { symbol: 'V_m', name: 'Volumen molar del gas ideal (0°C, 1 atm)', value: '22.413 969 5', unit: 'L/mol', category: 'Termodinámica', color: '#ff6b6b' },
  { symbol: 'c_agua', name: 'Calor específico del agua', value: '4 186', unit: 'J/(kg·K)', category: 'Termodinámica', color: '#ff6b6b' },
  { symbol: 'L_f', name: 'Calor latente de fusión del agua', value: '3.34 × 10⁵', unit: 'J/kg', category: 'Termodinámica', color: '#ff6b6b' },
  { symbol: 'L_v', name: 'Calor latente de vaporización del agua', value: '2.26 × 10⁶', unit: 'J/kg', category: 'Termodinámica', color: '#ff6b6b' },

  // Ondas / Sonido
  { symbol: 'v_s', name: 'Velocidad del sonido en el aire (20°C)', value: '343', unit: 'm/s', category: 'Ondas', color: '#00d4ff' },
  { symbol: 'v_s,agua', name: 'Velocidad del sonido en el agua', value: '1 480', unit: 'm/s', category: 'Ondas', color: '#00d4ff' },
  { symbol: 'I₀', name: 'Umbral de audición', value: '1 × 10⁻¹²', unit: 'W/m²', category: 'Ondas', color: '#00d4ff' },
];

let constFilter = 'all';
let constSearch = '';

function renderConstants() {
  const categories = [...new Set(PHYSICS_CONSTANTS.map(c => c.category))];
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">Ω <span>Constantes</span> Físicas</h1>
          <div class="section-subtitle">${PHYSICS_CONSTANTS.length} constantes fundamentales de referencia</div>
        </div>
      </div>

      <!-- SEARCH & FILTER -->
      <div class="const-toolbar">
        <input type="text" class="form-control" id="const-search" placeholder="🔍 Buscar constante..." oninput="filterConstants()" style="max-width:320px">
        <div class="const-filter-tabs">
          <button class="const-cat-btn active" data-cat="all" onclick="setCatFilter('all',this)">Todas</button>
          ${categories.map(cat => `<button class="const-cat-btn" data-cat="${cat}" onclick="setCatFilter('${cat}',this)">${cat}</button>`).join('')}
        </div>
      </div>

      <!-- CONSTANTS TABLE -->
      <div class="card" style="margin-top:1rem;overflow-x:auto">
        <table class="const-table" id="const-table">
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Constante</th>
              <th>Valor</th>
              <th>Unidad</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody id="const-tbody">
            ${buildConstantsRows()}
          </tbody>
        </table>
      </div>

      <!-- USEFUL FORMULAS USING CONSTANTS -->
      <div class="cyber-divider" style="margin-top:2rem"><span>fórmulas que usan estas constantes</span></div>
      <div class="grid-3" style="margin-bottom:2rem">
        ${[
          { formula: 'F = G·m₁·m₂ / r²', name: 'Ley de Gravitación Universal', consts: ['G'] },
          { formula: 'E = h·f = h·c/λ', name: 'Energía de un Fotón', consts: ['h','c'] },
          { formula: 'F = k_e·q₁·q₂ / r²', name: 'Ley de Coulomb', consts: ['k_e'] },
          { formula: 'PV = nRT', name: 'Ley del Gas Ideal', consts: ['R'] },
          { formula: 'E_c = ½m_e·v²', name: 'Energía del Electrón', consts: ['m_e'] },
          { formula: 'E = mc²', name: 'Equivalencia Masa-Energía', consts: ['c'] }
        ].map(f => `
          <div class="card formula-card">
            <div style="font-size:.72rem;font-family:var(--font-mono);color:var(--text2);margin-bottom:.4rem">${f.name}</div>
            <div class="formula-display" style="color:var(--cyan)">${f.formula}</div>
            <div style="margin-top:.5rem;display:flex;gap:.3rem;flex-wrap:wrap">
              ${f.consts.map(c => `<span class="badge badge-cyan" style="font-size:.6rem">${c}</span>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function buildConstantsRows() {
  return PHYSICS_CONSTANTS
    .filter(c => {
      const matchCat = constFilter === 'all' || c.category === constFilter;
      const q = constSearch.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q) || c.unit.toLowerCase().includes(q);
      return matchCat && matchSearch;
    })
    .map(c => `
      <tr class="const-row" onclick="copyConstant('${c.value} ${c.unit}', '${c.name}')" title="Clic para copiar">
        <td><span class="const-symbol" style="color:${c.color}">${c.symbol}</span></td>
        <td class="const-name">${c.name}</td>
        <td><span class="const-value font-mono">${c.value}</span></td>
        <td><span class="const-unit">${c.unit}</span></td>
        <td><span class="badge" style="background:${c.color}18;color:${c.color};border-color:${c.color}40;font-size:.6rem">${c.category}</span></td>
      </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text3);padding:2rem">No se encontraron constantes</td></tr>';
}

function filterConstants() {
  constSearch = document.getElementById('const-search').value;
  document.getElementById('const-tbody').innerHTML = buildConstantsRows();
}

function setCatFilter(cat, btn) {
  constFilter = cat;
  document.querySelectorAll('.const-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('const-tbody').innerHTML = buildConstantsRows();
}

function copyConstant(value, name) {
  navigator.clipboard.writeText(value).then(() => {
    showToast(`✓ Copiado: ${name}`, 'success');
  }).catch(() => {
    showToast(value, 'info');
  });
}
