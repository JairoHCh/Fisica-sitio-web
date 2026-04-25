// ======= QUIZ MODULE =======
let currentQuiz = null, userAnswers = [], quizSubmitted = false, currentQ = 0;
let quizTimer = null, quizSeconds = 0;
let currentQuizId = null;

function initQuizPage() {}

async function renderQuiz() {
  const quizzes = await API.get('/quiz');
  const scores = getQuizScores();
  const icons = { cap1:'⚛', cap2:'🚀', cap3:'⚖', cap4:'🎯', cap5:'⚡', cap7:'💧', cap8:'🌊', cap9:'🌡' };
  const chapterColors = { cap1:'#00d4ff', cap2:'#a855f7', cap3:'#ffd23f', cap4:'#00ff88', cap5:'#ff6b6b', cap7:'#a855f7', cap8:'#ffd23f', cap9:'#00ff88' };

  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">◆ <span>Quiz</span> de Autoevaluación</h1>
          <div class="section-subtitle">${quizzes.length} capítulos disponibles — resultados guardados localmente</div>
        </div>
        ${Object.keys(scores).length ? `<div style="text-align:right">
          <div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3)">TU PROMEDIO</div>
          <div style="font-size:1.8rem;font-family:var(--font-display);color:var(--gold)">${Math.round(Object.values(scores).reduce((a,s)=>a+s.best,0)/Object.keys(scores).length)}%</div>
        </div>` : ''}
      </div>
      <div class="quiz-list">
        ${quizzes.map(q => {
          const score = scores[q.id];
          const color = chapterColors[q.id] || '#00d4ff';
          return `
          <div class="quiz-card" onclick="startQuiz('${q.id}')" style="border-top:3px solid ${color}">
            <div class="quiz-icon">${icons[q.id] || '📚'}</div>
            <div class="quiz-title">${q.title}</div>
            <div class="quiz-info">${q.questions} preguntas · ~${q.questions} min</div>
            ${score ? `
              <div style="background:${score.best>=70?'rgba(0,255,136,0.1)':'rgba(255,210,63,0.1)'};border:1px solid ${score.best>=70?'rgba(0,255,136,0.3)':'rgba(255,210,63,0.3)'};border-radius:6px;padding:.4rem .75rem;margin:.5rem 0;display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:.75rem;color:var(--text2)">Mejor puntaje</span>
                <span style="font-family:var(--font-mono);font-weight:700;color:${score.best>=70?'var(--green)':'var(--gold)'}">${score.best}%</span>
              </div>
              <div style="font-size:.7rem;color:var(--text3);margin-bottom:.25rem">${score.attempts} intento${score.attempts>1?'s':''}</div>
            ` : '<div style="font-size:.75rem;color:var(--text3);margin:.5rem 0">Aún no tomado</div>'}
            <button class="btn btn-sm" style="margin-top:auto;background:${color};color:var(--bg);font-weight:700;border:none;padding:.4rem .9rem;border-radius:6px;cursor:pointer">${score?'Reintentar →':'Iniciar →'}</button>
          </div>`;
        }).join('')}
      </div>
      <div id="quiz-active"></div>
    </div>`;
}

async function startQuiz(id) {
  currentQuizId = id;
  currentQuiz = await API.get(`/quiz/${id}`);
  userAnswers = new Array(currentQuiz.questions.length).fill(null);
  quizSubmitted = false;
  currentQ = 0;
  quizSeconds = 0;
  if (quizTimer) clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    quizSeconds++;
    const el = document.getElementById('quiz-timer');
    if (el) {
      const m = Math.floor(quizSeconds/60).toString().padStart(2,'0');
      const s = (quizSeconds%60).toString().padStart(2,'0');
      el.textContent = `${m}:${s}`;
    }
  }, 1000);
  renderQuizQuestion();
  setTimeout(() => document.getElementById('quiz-active').scrollIntoView({behavior:'smooth'}), 100);
}

function renderQuizQuestion() {
  if (!currentQuiz) return;
  const q = currentQuiz.questions[currentQ];
  const progress = ((currentQ+1)/currentQuiz.questions.length)*100;
  const letters = ['A','B','C','D'];
  document.getElementById('quiz-active').innerHTML = `
    <div class="card quiz-active-card" style="max-width:750px;margin:2rem auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem">
        <span style="font-family:var(--font-mono);font-size:.7rem;color:var(--text2)">${currentQuiz.title}</span>
        <span style="font-family:var(--font-mono);font-size:.8rem;color:var(--gold)">⏱ <span id="quiz-timer">00:00</span></span>
      </div>
      <div class="progress-bar" style="margin-bottom:1.25rem">
        <div class="progress-fill" style="width:${progress}%;transition:width .4s ease"></div>
      </div>
      <div class="quiz-question">
        <div class="question-num">PREGUNTA ${currentQ+1} DE ${currentQuiz.questions.length}</div>
        <div class="question-text">${q.q}</div>
        ${q.options.map((opt,i)=>`
          <button class="option-btn ${userAnswers[currentQ]===i?'selected':''}" onclick="selectAnswer(${i})">
            <span class="option-letter">${letters[i]}</span><span>${opt}</span>
          </button>`).join('')}
      </div>
      <div style="display:flex;gap:.3rem;flex-wrap:wrap;margin:1rem 0">
        ${currentQuiz.questions.map((_,i)=>`
          <div onclick="jumpToQ(${i})" style="width:26px;height:26px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-family:var(--font-mono);cursor:pointer;border:1px solid var(--border);background:${i===currentQ?'var(--cyan)':userAnswers[i]!==null?'rgba(0,212,255,0.15)':'transparent'};color:${i===currentQ?'var(--bg)':userAnswers[i]!==null?'var(--cyan)':'var(--text3)'}">${i+1}</div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.5rem">
        <button class="btn btn-ghost" onclick="prevQuestion()" ${currentQ===0?'disabled':''}>← Anterior</button>
        <span style="font-size:.75rem;color:var(--text3);font-family:var(--font-mono)">${userAnswers.filter(a=>a!==null).length}/${currentQuiz.questions.length} respondidas</span>
        ${currentQ<currentQuiz.questions.length-1
          ?`<button class="btn btn-primary" onclick="nextQuestion()">Siguiente →</button>`
          :`<button class="btn btn-gold" onclick="submitQuiz()">✓ Finalizar Quiz</button>`}
      </div>
    </div>`;
}

function jumpToQ(i) { currentQ=i; renderQuizQuestion(); }

function selectAnswer(i) {
  userAnswers[currentQ]=i;
  document.querySelectorAll('.option-btn').forEach((btn,idx)=>{
    btn.className=`option-btn ${idx===i?'selected':''}`;
  });
}

function nextQuestion() { if(currentQ<currentQuiz.questions.length-1){currentQ++;renderQuizQuestion();} }
function prevQuestion() { if(currentQ>0){currentQ--;renderQuizQuestion();} }

async function submitQuiz() {
  const unanswered = userAnswers.filter(a=>a===null).length;
  if(unanswered>0 && !confirm(`Hay ${unanswered} pregunta(s) sin responder. ¿Finalizar?`)) return;
  userAnswers = userAnswers.map(a=>a===null?-1:a);
  if(quizTimer){clearInterval(quizTimer);quizTimer=null;}
  const allQuizzes = await API.get('/quiz');
  const matchId = allQuizzes.find(q=>q.title===currentQuiz.title)?.id || currentQuizId || 'cap1';
  try {
    const result = await API.post(`/quiz/${matchId}/check`, {answers:userAnswers});
    result.results = result.results.map((r,i)=>({
      ...r,
      question: currentQuiz.questions[i].q,
      userAnswer: userAnswers[i]>=0 ? currentQuiz.questions[i].options[userAnswers[i]] : '(Sin responder)',
      correctAnswer: currentQuiz.questions[i].options[r.correctAnswer]
    }));
    saveQuizScore(matchId, result.score, result.total);
    renderResults(result, matchId);
  } catch(err) { showToast('Error: '+err.message,'error'); }
}

function renderResults(result, quizId) {
  const emoji = result.percentage>=90?'🏆':result.percentage>=70?'✅':result.percentage>=50?'📚':'💪';
  const color = result.percentage>=70?'var(--green)':result.percentage>=50?'var(--gold)':'var(--red)';
  const msg = result.percentage>=90?'¡Dominio excepcional!':result.percentage>=70?'¡Buen trabajo!':result.percentage>=50?'Revisa los temas':'Necesitas estudiar más';
  const timeStr = `${Math.floor(quizSeconds/60)}m ${quizSeconds%60}s`;
  document.getElementById('quiz-active').innerHTML = `
    <div class="card" style="max-width:750px;margin:2rem auto">
      <div class="quiz-results">
        <div class="score-circle" style="border-color:${color};box-shadow:0 0 25px ${color}44">
          <div class="score-pct" style="color:${color}">${result.percentage}%</div>
          <div class="score-label">${result.score}/${result.total}</div>
        </div>
        <div style="font-size:2.5rem;margin:.5rem 0">${emoji}</div>
        <h2 style="font-family:var(--font-display);font-size:1.2rem;color:var(--text)">${msg}</h2>
        <div style="display:flex;gap:1.5rem;justify-content:center;margin-top:.75rem">
          <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3)">TIEMPO</div><div style="color:var(--gold);font-family:var(--font-mono)">${timeStr}</div></div>
          <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3)">CORRECTAS</div><div style="color:var(--green);font-family:var(--font-mono)">${result.score}</div></div>
          <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:.7rem;color:var(--text3)">INCORRECTAS</div><div style="color:var(--red);font-family:var(--font-mono)">${result.total-result.score}</div></div>
        </div>
      </div>
      <div class="divider"></div>
      <div>
        <h3 style="font-family:var(--font-display);font-size:.75rem;color:var(--text2);letter-spacing:.12em;text-transform:uppercase;margin-bottom:1rem">Revisión de Respuestas</h3>
        <div style="display:flex;flex-direction:column;gap:.75rem">
          ${result.results.map((r,i)=>`
            <div style="background:var(--bg2);border:1px solid ${r.correct?'rgba(0,255,136,0.25)':'rgba(255,71,87,0.25)'};border-left:3px solid ${r.correct?'var(--green)':'var(--red)'};border-radius:8px;padding:.9rem 1rem">
              <div style="font-size:.85rem;font-weight:600;color:var(--text);margin-bottom:.5rem">${i+1}. ${r.question}</div>
              <div style="font-size:.8rem;color:${r.correct?'var(--green)':'var(--red)'};margin-bottom:.2rem">${r.correct?'✓':'✗'} Tu respuesta: ${r.userAnswer}</div>
              ${!r.correct?`<div style="font-size:.8rem;color:var(--green)">✓ Correcta: ${r.correctAnswer}</div>`:''}
            </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="startQuiz('${quizId}')">↺ Reintentar</button>
        <button class="btn btn-primary" onclick="navigate('/quiz')">◆ Más Quizzes</button>
        <button class="btn btn-ghost" onclick="navigate('/')">◈ Ver Progreso</button>
      </div>
    </div>`;
}
