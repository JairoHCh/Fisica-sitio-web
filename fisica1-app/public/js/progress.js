// ======= PROGRESS TRACKING (localStorage) =======
const PROGRESS_KEY = 'fisica1_progress';
const QUIZ_SCORES_KEY = 'fisica1_quiz_scores';
const NOTES_KEY = 'fisica1_notes_count';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function markChapterDone(chapterNum) {
  const p = getProgress();
  p[`cap${chapterNum}`] = { done: true, date: new Date().toISOString() };
  saveProgress(p);
}

function toggleChapterDone(chapterNum) {
  const p = getProgress();
  const key = `cap${chapterNum}`;
  if (p[key] && p[key].done) {
    delete p[key];
  } else {
    p[key] = { done: true, date: new Date().toISOString() };
  }
  saveProgress(p);
  // Re-render progress section if visible
  const pb = document.getElementById('progress-overview');
  if (pb) pb.innerHTML = buildProgressHTML();
}

function getQuizScores() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY)) || {};
  } catch { return {}; }
}

function saveQuizScore(quizId, score, total) {
  const scores = getQuizScores();
  const pct = Math.round((score / total) * 100);
  if (!scores[quizId] || pct > scores[quizId].best) {
    scores[quizId] = { best: pct, score, total, date: new Date().toISOString(), attempts: (scores[quizId]?.attempts || 0) + 1 };
  } else {
    scores[quizId].attempts = (scores[quizId].attempts || 0) + 1;
  }
  localStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(scores));
}

function getOverallStats() {
  const progress = getProgress();
  const scores = getQuizScores();
  const chapsDone = Object.keys(progress).length;
  const quizzesTaken = Object.keys(scores).length;
  const avgScore = quizzesTaken
    ? Math.round(Object.values(scores).reduce((a, s) => a + s.best, 0) / quizzesTaken)
    : 0;
  return { chapsDone, quizzesTaken, avgScore };
}

function buildProgressHTML() {
  const progress = getProgress();
  const scores = getQuizScores();
  const totalChaps = 9;
  const done = Object.keys(progress).length;
  const pct = Math.round((done / totalChaps) * 100);

  const capNames = [
    'Introducción y Vectores', 'Cinemática', 'Estática',
    'Dinámica del Punto', 'Conservación', 'Sistema de Partículas',
    'Fluidos', 'Vibraciones y Ondas', 'Termodinámica'
  ];
  const capColors = ['#00d4ff','#a855f7','#ffd23f','#00ff88','#ff6b6b','#00d4ff','#a855f7','#ffd23f','#00ff88'];

  return `
    <div class="progress-overview">
      <div class="progress-header-row">
        <div>
          <div class="progress-pct">${pct}%</div>
          <div class="progress-label">del curso completado</div>
        </div>
        <div class="progress-ring-wrap">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(0,212,255,0.1)" stroke-width="6"/>
            <circle cx="35" cy="35" r="28" fill="none" stroke="var(--cyan)" stroke-width="6"
              stroke-dasharray="${2 * Math.PI * 28}"
              stroke-dashoffset="${2 * Math.PI * 28 * (1 - pct / 100)}"
              stroke-linecap="round"
              transform="rotate(-90 35 35)"
              style="transition:stroke-dashoffset 1s ease"/>
            <text x="35" y="39" text-anchor="middle" fill="var(--cyan)" font-family="Orbitron" font-size="12" font-weight="700">${done}/${totalChaps}</text>
          </svg>
        </div>
      </div>
      <div class="chapter-progress-list">
        ${capNames.map((name, i) => {
          const key = `cap${i + 1}`;
          const isDone = progress[key]?.done;
          const score = scores[`cap${i+1}`];
          return `
            <div class="chap-prog-item ${isDone ? 'done' : ''}" onclick="toggleChapterDone(${i+1})" title="Clic para marcar/desmarcar">
              <div class="chap-prog-dot" style="background:${isDone ? capColors[i] : 'transparent'};border-color:${capColors[i]}"></div>
              <div class="chap-prog-name">Cap. ${i+1} — ${name}</div>
              ${score ? `<div class="chap-prog-score" style="color:${score.best>=70?'var(--green)':'var(--gold)'}">◆ ${score.best}%</div>` : ''}
              <div class="chap-prog-check">${isDone ? '✓' : ''}</div>
            </div>`;
        }).join('')}
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-top:.75rem;font-size:.7rem" onclick="if(confirm('¿Resetear todo el progreso?')){localStorage.removeItem('${PROGRESS_KEY}');localStorage.removeItem('${QUIZ_SCORES_KEY}');location.reload()}">↺ Resetear progreso</button>
    </div>`;
}
