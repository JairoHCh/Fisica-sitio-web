// ======= QUIZ MODULE =======
let currentQuiz = null, userAnswers = [], quizSubmitted = false, currentQ = 0;

async function renderQuiz() {
  const quizzes = await API.get('/quiz');
  const icons = { cap1: '⚛', cap2: '🚀', cap3: '⚖', cap5: '⚡' };
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">◆ <span>Quiz</span> de Autoevaluación</h1>
          <div class="section-subtitle">Pon a prueba tu conocimiento por capítulo</div>
        </div>
      </div>
      <div class="quiz-list">
        ${quizzes.map(q => `
          <div class="quiz-card" onclick="startQuiz('${q.id}')">
            <div class="quiz-icon">${icons[q.id] || '📚'}</div>
            <div class="quiz-title">${q.title}</div>
            <div class="quiz-info">${q.questions} preguntas · ~${q.questions * 1} min</div>
            <button class="btn btn-gold btn-sm" style="margin-top:1rem">Iniciar Quiz →</button>
          </div>
        `).join('')}
      </div>
      <div id="quiz-active"></div>
    </div>`;
}

async function startQuiz(id) {
  currentQuiz = await API.get(`/quiz/${id}`);
  userAnswers = new Array(currentQuiz.questions.length).fill(null);
  quizSubmitted = false;
  currentQ = 0;
  renderQuizQuestion();
  document.getElementById('quiz-active').scrollIntoView({ behavior: 'smooth' });
}

function renderQuizQuestion() {
  if (!currentQuiz) return;
  const q = currentQuiz.questions[currentQ];
  const progress = ((currentQ + 1) / currentQuiz.questions.length) * 100;
  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('quiz-active').innerHTML = `
    <div class="card" style="max-width:700px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
        <span style="font-family:var(--font-mono);font-size:.75rem;color:var(--text2)">${currentQuiz.title}</span>
        <span style="font-family:var(--font-mono);font-size:.75rem;color:var(--text3)">${currentQ+1}/${currentQuiz.questions.length}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <div class="quiz-question">
        <div class="question-num">PREGUNTA ${currentQ+1} DE ${currentQuiz.questions.length}</div>
        <div class="question-text">${q.q}</div>
        ${q.options.map((opt, i) => `
          <button class="option-btn ${userAnswers[currentQ]===i?'selected':''}" onclick="selectAnswer(${i})">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:1rem">
        <button class="btn btn-ghost" onclick="prevQuestion()" ${currentQ===0?'disabled':''}>← Anterior</button>
        ${currentQ < currentQuiz.questions.length - 1
          ? `<button class="btn btn-primary" onclick="nextQuestion()">Siguiente →</button>`
          : `<button class="btn btn-gold" onclick="submitQuiz()">Finalizar Quiz ◆</button>`}
      </div>
    </div>`;
}

function selectAnswer(i) {
  userAnswers[currentQ] = i;
  document.querySelectorAll('.option-btn').forEach((btn, idx) => {
    btn.className = `option-btn ${idx === i ? 'selected' : ''}`;
  });
}

function nextQuestion() {
  if (currentQ < currentQuiz.questions.length - 1) { currentQ++; renderQuizQuestion(); }
}

function prevQuestion() {
  if (currentQ > 0) { currentQ--; renderQuizQuestion(); }
}

async function submitQuiz() {
  if (userAnswers.some(a => a === null)) {
    if (!confirm('Hay preguntas sin responder. ¿Continuar?')) return;
    userAnswers = userAnswers.map(a => a === null ? 0 : a);
  }
  const quizId = Object.keys({cap1:1,cap2:2,cap3:3,cap5:5}).find(k => currentQuiz.title.includes(k.replace('cap','Cap. ').replace('cap1','Cap. 1').replace('cap2','Cap. 2').replace('cap3','Cap. 3').replace('cap5','Cap. 5'))) || 'cap1';
  // Find ID by title
  const allQuizzes = await API.get('/quiz');
  const matchId = allQuizzes.find(q => q.title === currentQuiz.title)?.id;
  const result = await API.post(`/quiz/${matchId || 'cap1'}/check`, { answers: userAnswers });
  renderResults(result);
}

function renderResults(result) {
  const emoji = result.percentage >= 80 ? '🏆' : result.percentage >= 60 ? '✅' : result.percentage >= 40 ? '📚' : '💪';
  const color = result.percentage >= 80 ? 'var(--green)' : result.percentage >= 60 ? 'var(--cyan)' : result.percentage >= 40 ? 'var(--gold)' : 'var(--red)';
  const msg = result.percentage >= 80 ? '¡Excelente dominio del tema!' : result.percentage >= 60 ? '¡Buen trabajo, sigue practicando!' : result.percentage >= 40 ? 'Revisa los temas con más detalle' : 'Necesitas estudiar más este capítulo';
  document.getElementById('quiz-active').innerHTML = `
    <div class="card" style="max-width:700px;margin:0 auto">
      <div class="quiz-results">
        <div class="score-circle" style="border-color:${color}; box-shadow: 0 0 20px ${color}33">
          <div class="score-pct" style="color:${color}">${result.percentage}%</div>
          <div class="score-label">${result.score}/${result.total}</div>
        </div>
        <div style="font-size:2rem;margin:.5rem 0">${emoji}</div>
        <h2 style="font-family:var(--font-display);font-size:1.2rem;color:var(--text)">${msg}</h2>
        <p style="color:var(--text2);font-size:.9rem;margin-top:.5rem">Respondiste ${result.score} de ${result.total} preguntas correctamente</p>
      </div>
      <div class="divider"></div>
      <div style="display:flex;flex-direction:column;gap:.75rem">
        <h3 style="font-family:var(--font-display);font-size:.8rem;color:var(--text2);letter-spacing:.1em;text-transform:uppercase">Revisión de Respuestas</h3>
        ${result.results.map((r, i) => `
          <div style="background:var(--bg2);border:1px solid ${r.correct?'var(--green)':'var(--red)'};border-radius:8px;padding:1rem">
            <div style="font-size:.85rem;font-weight:600;color:var(--text);margin-bottom:.5rem">${i+1}. ${r.question}</div>
            <div style="font-size:.8rem;margin-bottom:.2rem">Tu resp.: <span style="color:${r.correct?'var(--green)':'var(--red)'}">${r.correct?'✓':'✗'} ${r.userAnswer}</span></div>
            ${!r.correct ? `<div style="font-size:.8rem;color:var(--green)">Correcta: ✓ ${r.correctAnswer}</div>` : ''}
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem">
        <button class="btn btn-ghost" onclick="startQuiz('${currentQuiz.id}')">Reintentar</button>
        <button class="btn btn-primary" onclick="navigate('/quiz')">Otro Quiz</button>
      </div>
    </div>`;
}
