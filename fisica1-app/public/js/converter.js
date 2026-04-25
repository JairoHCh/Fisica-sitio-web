// ======= UNIT CONVERTER =======
const UNIT_CATEGORIES = {
  longitud: {
    name: 'Longitud', icon: '📏',
    units: {
      km:  { name: 'Kilómetro (km)',     factor: 1000 },
      m:   { name: 'Metro (m)',          factor: 1 },
      cm:  { name: 'Centímetro (cm)',    factor: 0.01 },
      mm:  { name: 'Milímetro (mm)',     factor: 0.001 },
      um:  { name: 'Micrómetro (μm)',    factor: 1e-6 },
      nm:  { name: 'Nanómetro (nm)',     factor: 1e-9 },
      ft:  { name: 'Pie (ft)',           factor: 0.3048 },
      in:  { name: 'Pulgada (in)',       factor: 0.0254 },
      mi:  { name: 'Milla (mi)',         factor: 1609.344 },
      AU:  { name: 'Unidad Astronómica', factor: 1.496e11 },
      ly:  { name: 'Año luz (ly)',       factor: 9.461e15 }
    }
  },
  masa: {
    name: 'Masa', icon: '⚖',
    units: {
      kg:  { name: 'Kilogramo (kg)',  factor: 1 },
      g:   { name: 'Gramo (g)',      factor: 0.001 },
      mg:  { name: 'Miligramo (mg)', factor: 1e-6 },
      t:   { name: 'Tonelada (t)',   factor: 1000 },
      lb:  { name: 'Libra (lb)',     factor: 0.453592 },
      oz:  { name: 'Onza (oz)',      factor: 0.0283495 },
      u:   { name: 'Unidad de masa atómica (u)', factor: 1.66054e-27 }
    }
  },
  tiempo: {
    name: 'Tiempo', icon: '⏱',
    units: {
      s:   { name: 'Segundo (s)',    factor: 1 },
      ms:  { name: 'Milisegundo (ms)', factor: 0.001 },
      us:  { name: 'Microsegundo (μs)', factor: 1e-6 },
      min: { name: 'Minuto (min)',  factor: 60 },
      h:   { name: 'Hora (h)',      factor: 3600 },
      d:   { name: 'Día (d)',       factor: 86400 },
      sem: { name: 'Semana',       factor: 604800 },
      yr:  { name: 'Año (yr)',      factor: 3.156e7 }
    }
  },
  velocidad: {
    name: 'Velocidad', icon: '🚀',
    units: {
      ms:   { name: 'm/s',          factor: 1 },
      kmh:  { name: 'km/h',         factor: 1/3.6 },
      mph:  { name: 'mph',          factor: 0.44704 },
      ft_s: { name: 'ft/s',         factor: 0.3048 },
      kn:   { name: 'Nudo (kn)',    factor: 0.514444 },
      mach: { name: 'Mach',         factor: 340.29 },
      c:    { name: 'Vel. de luz (c)', factor: 2.998e8 }
    }
  },
  fuerza: {
    name: 'Fuerza', icon: '💪',
    units: {
      N:   { name: 'Newton (N)',    factor: 1 },
      kN:  { name: 'Kilonewton (kN)', factor: 1000 },
      dyn: { name: 'Dina (dyn)',   factor: 1e-5 },
      lbf: { name: 'Libra-fuerza (lbf)', factor: 4.44822 },
      kgf: { name: 'Kilogramo-fuerza (kgf)', factor: 9.80665 }
    }
  },
  energia: {
    name: 'Energía', icon: '⚡',
    units: {
      J:    { name: 'Joule (J)',      factor: 1 },
      kJ:   { name: 'Kilojulio (kJ)', factor: 1000 },
      MJ:   { name: 'Megajulio (MJ)', factor: 1e6 },
      cal:  { name: 'Caloría (cal)',  factor: 4.184 },
      kcal: { name: 'Kilocaloría (kcal)', factor: 4184 },
      eV:   { name: 'Electronvolt (eV)', factor: 1.602e-19 },
      keV:  { name: 'Kiloelectronvolt (keV)', factor: 1.602e-16 },
      Wh:   { name: 'Vatiohora (Wh)', factor: 3600 },
      kWh:  { name: 'kWh',           factor: 3.6e6 },
      BTU:  { name: 'BTU',           factor: 1055.06 }
    }
  },
  presion: {
    name: 'Presión', icon: '🌡',
    units: {
      Pa:   { name: 'Pascal (Pa)',    factor: 1 },
      kPa:  { name: 'Kilopascal (kPa)', factor: 1000 },
      MPa:  { name: 'Megapascal (MPa)', factor: 1e6 },
      atm:  { name: 'Atmósfera (atm)', factor: 101325 },
      bar:  { name: 'Bar',           factor: 1e5 },
      mmHg: { name: 'mmHg (Torr)',   factor: 133.322 },
      psi:  { name: 'PSI (lb/in²)', factor: 6894.76 }
    }
  },
  potencia: {
    name: 'Potencia', icon: '🔋',
    units: {
      W:   { name: 'Vatio (W)',       factor: 1 },
      kW:  { name: 'Kilovatio (kW)',  factor: 1000 },
      MW:  { name: 'Megavatio (MW)',  factor: 1e6 },
      hp:  { name: 'Caballo de fuerza (hp)', factor: 745.7 },
      cal_s: { name: 'cal/s',        factor: 4.184 },
      BTU_h: { name: 'BTU/h',        factor: 0.29307 }
    }
  },
  temperatura: {
    name: 'Temperatura', icon: '🌡',
    special: true,
    units: {
      C:  { name: 'Celsius (°C)' },
      K:  { name: 'Kelvin (K)' },
      F:  { name: 'Fahrenheit (°F)' },
      R:  { name: 'Rankine (°R)' }
    }
  },
  angulo: {
    name: 'Ángulo', icon: '📐',
    units: {
      rad: { name: 'Radián (rad)', factor: 1 },
      deg: { name: 'Grado (°)',   factor: Math.PI / 180 },
      rev: { name: 'Revolución',  factor: 2 * Math.PI },
      grad:{ name: 'Gradián',     factor: Math.PI / 200 },
      arcmin: { name: 'Minuto de arco', factor: Math.PI / 10800 },
      arcsec: { name: 'Segundo de arco', factor: Math.PI / 648000 }
    }
  }
};

let currentCat = 'longitud';

function convertTemp(value, from, to) {
  let celsius;
  switch(from) {
    case 'C': celsius = value; break;
    case 'K': celsius = value - 273.15; break;
    case 'F': celsius = (value - 32) * 5/9; break;
    case 'R': celsius = (value - 491.67) * 5/9; break;
  }
  switch(to) {
    case 'C': return celsius;
    case 'K': return celsius + 273.15;
    case 'F': return celsius * 9/5 + 32;
    case 'R': return (celsius + 273.15) * 9/5;
  }
}

function doConvert() {
  const cat = UNIT_CATEGORIES[currentCat];
  const value = parseFloat(document.getElementById('conv-input').value);
  const fromUnit = document.getElementById('conv-from').value;
  const toUnit = document.getElementById('conv-to').value;
  if (isNaN(value)) return;

  let result;
  if (cat.special) {
    result = convertTemp(value, fromUnit, toUnit);
  } else {
    const toBase = value * cat.units[fromUnit].factor;
    result = toBase / cat.units[toUnit].factor;
  }

  // Format nicely
  let formatted;
  if (Math.abs(result) >= 1e6 || (Math.abs(result) < 0.001 && result !== 0)) {
    formatted = result.toExponential(6);
  } else {
    formatted = parseFloat(result.toFixed(8)).toString();
  }

  document.getElementById('conv-result').innerHTML = `
    <div class="conv-result-value">${formatted}</div>
    <div class="conv-result-unit">${cat.units[toUnit].name}</div>`;

  // Show all conversions
  const allDiv = document.getElementById('conv-all');
  if (allDiv) {
    const entries = Object.entries(cat.units).filter(([k]) => k !== fromUnit);
    allDiv.innerHTML = entries.map(([key, u]) => {
      let r;
      if (cat.special) r = convertTemp(value, fromUnit, key);
      else r = (value * cat.units[fromUnit].factor) / u.factor;
      let rFmt;
      if (Math.abs(r) >= 1e6 || (Math.abs(r) < 0.001 && r !== 0)) rFmt = r.toExponential(4);
      else rFmt = parseFloat(r.toFixed(6)).toString();
      return `<div class="conv-all-row"><span class="conv-all-unit">${u.name}</span><span class="conv-all-val">${rFmt}</span></div>`;
    }).join('');
  }
}

function swapUnits() {
  const f = document.getElementById('conv-from');
  const t = document.getElementById('conv-to');
  [f.value, t.value] = [t.value, f.value];
  doConvert();
}

function selectCategory(catKey) {
  currentCat = catKey;
  const cat = UNIT_CATEGORIES[catKey];
  document.querySelectorAll('.conv-cat-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-cat="${catKey}"]`)?.classList.add('active');

  const unitKeys = Object.keys(cat.units);
  const opts = unitKeys.map(k => `<option value="${k}">${cat.units[k].name}</option>`).join('');

  document.getElementById('conv-from').innerHTML = opts;
  document.getElementById('conv-to').innerHTML = opts;
  document.getElementById('conv-to').selectedIndex = 1;
  document.getElementById('conv-input').value = 1;
  doConvert();
}

function renderConverter() {
  const cats = Object.entries(UNIT_CATEGORIES);
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">∿ <span>Conversor</span> de Unidades</h1>
          <div class="section-subtitle">Convierte entre unidades del Sistema Internacional y más</div>
        </div>
      </div>

      <!-- CATEGORY TABS -->
      <div class="conv-cat-tabs">
        ${cats.map(([key, c]) => `
          <button class="conv-cat-btn ${key === 'longitud' ? 'active' : ''}" data-cat="${key}" onclick="selectCategory('${key}')">
            <span>${c.icon}</span><span>${c.name}</span>
          </button>`).join('')}
      </div>

      <!-- MAIN CONVERTER -->
      <div class="conv-main card" style="margin:1.5rem 0">
        <div class="conv-row">
          <div class="conv-input-group">
            <label class="form-label">Valor</label>
            <input type="number" id="conv-input" class="form-control conv-big-input" value="1" step="any" oninput="doConvert()">
          </div>
          <div class="conv-select-group">
            <label class="form-label">De</label>
            <select id="conv-from" class="form-control" onchange="doConvert()"></select>
          </div>
          <button class="btn btn-ghost conv-swap-btn" onclick="swapUnits()" title="Intercambiar">⇄</button>
          <div class="conv-select-group">
            <label class="form-label">A</label>
            <select id="conv-to" class="form-control" onchange="doConvert()"></select>
          </div>
        </div>
        <div id="conv-result" class="conv-result-box">
          <div class="conv-result-value">—</div>
        </div>
      </div>

      <!-- ALL CONVERSIONS -->
      <div class="card">
        <div class="section-subtitle" style="margin-bottom:1rem;font-family:var(--font-display);font-size:.75rem;letter-spacing:.1em;color:var(--cyan)">TABLA DE CONVERSIONES</div>
        <div id="conv-all" class="conv-all-grid"></div>
      </div>
    </div>`;
}

function initConverter() {
  selectCategory('longitud');
}
