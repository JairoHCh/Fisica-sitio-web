// ======= FORUM PAGE =======
async function renderForum() {
  const topics = await API.get('/forum');
  const cats = ['Todas', 'Duda', 'Tip', 'Discusión', 'Recurso'];
  const chapters = ['Todos', ...new Set(topics.map(t => t.chapter))];
  const solved = topics.filter(t => t.solved).length;

  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">❋ <span>Foro</span> Estudiantil</h1>
          <div class="section-subtitle">${topics.length} temas · ${solved} resueltos</div>
        </div>
        <button class="btn btn-primary" onclick="openNewTopicModal()">+ Nueva Pregunta</button>
      </div>
      <div class="forum-layout">
        <div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem">
            ${cats.map((c,i) => `<button class="filter-btn ${i===0?'active':''}" onclick="filterTopics(this,'${c}')">${c}</button>`).join('')}
          </div>
          <div id="topics-list">
            ${topics.length === 0 ? `
              <div class="empty-state">
                <div class="empty-icon">❋</div>
                <div class="empty-text">No hay preguntas todavía</div>
                <button class="btn btn-primary mt-2" onclick="openNewTopicModal()">Hacer pregunta</button>
              </div>` :
            topics.map(t => renderTopicCard(t)).join('')}
          </div>
        </div>
        <aside>
          <div class="sidebar-card">
            <div class="sidebar-title">📊 Estadísticas</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:.5rem">
              ${[['Total','📝',topics.length,'cyan'],['Resueltos','✅',solved,'green'],['Sin resp.','❓',topics.filter(t=>t.answers.length===0).length,'red'],['Preguntas','💬',topics.filter(t=>t.category==='Duda').length,'gold']].map(([l,ic,v,c])=>`
                <div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:.75rem;text-align:center">
                  <div style="font-size:1.2rem">${ic}</div>
                  <div style="font-family:var(--font-display);font-size:1.1rem;color:var(--${c});font-weight:700">${v}</div>
                  <div style="font-size:.7rem;color:var(--text3)">${l}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">🏆 Más Votados</div>
            ${[...topics].sort((a,b)=>b.votes-a.votes).slice(0,4).map(t=>`
              <div style="cursor:pointer;padding:.5rem 0;border-bottom:1px solid var(--border)" onclick="loadTopicDetail('${t.id}')">
                <div style="font-size:.8rem;color:var(--text);font-weight:600">${t.title}</div>
                <div style="font-size:.7rem;color:var(--text3);margin-top:.2rem">▲ ${t.votes} votos</div>
              </div>`).join('')}
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">📚 Por Capítulo</div>
            ${chapters.filter(c=>c!=='Todos').map(ch => {
              const count = topics.filter(t=>t.chapter===ch).length;
              return `<div style="display:flex;justify-content:space-between;align-items:center;padding:.3rem 0;border-bottom:1px solid var(--border)">
                <span style="font-size:.78rem;color:var(--text2)">${ch}</span>
                <span class="badge badge-cyan">${count}</span>
              </div>`;
            }).join('')}
          </div>
        </aside>
      </div>
    </div>`;
}

function renderTopicCard(t) {
  const catColors = { Duda: 'cyan', Tip: 'gold', 'Discusión': 'purple', Recurso: 'green' };
  return `
    <div class="topic-card ${t.solved ? 'solved' : ''}" data-category="${t.category}" onclick="loadTopicDetail('${t.id}')">
      <div class="topic-header">
        <div class="topic-votes">
          <div class="vote-count">${t.votes}</div>
          <div class="vote-label">votos</div>
        </div>
        <div class="topic-body">
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem">
            <span class="badge badge-${catColors[t.category]||'cyan'}">${t.category}</span>
            <span class="badge badge-cyan">${t.chapter}</span>
            ${t.solved ? '<span class="badge badge-green">✓ Resuelto</span>' : ''}
          </div>
          <div class="topic-title">${t.title}</div>
          <div class="topic-excerpt">${t.body.substring(0,180)}${t.body.length>180?'...':''}</div>
        </div>
      </div>
      <div class="topic-footer">
        <div class="tags">${(t.tags||[]).map(tag=>`<span class="tag">#${tag}</span>`).join('')}</div>
        <span style="font-size:.72rem;color:var(--text3);margin-left:auto">
          👤 ${t.author} · 💬 ${t.answers.length} resp. · 👁 ${t.views} · ${timeAgo(t.createdAt)}
        </span>
      </div>
    </div>`;
}

function filterTopics(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#topics-list .topic-card').forEach(card => {
    card.style.display = (cat === 'Todas' || card.dataset.category === cat) ? 'block' : 'none';
  });
}

async function loadTopicDetail(id) {
  const topic = await API.get(`/forum/${id}`);
  const catColors = { Duda: 'cyan', Tip: 'gold', 'Discusión': 'purple', Recurso: 'green' };
  document.getElementById('app').innerHTML = `
    <div class="page-enter">
      <button class="btn btn-ghost back-btn" onclick="navigate('/forum')">← Volver al Foro</button>
      <div class="card">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem">
          <span class="badge badge-${catColors[topic.category]||'cyan'}">${topic.category}</span>
          <span class="badge badge-cyan">${topic.chapter}</span>
          ${topic.solved ? '<span class="badge badge-green">✓ Resuelto</span>' : ''}
        </div>
        <h1 style="font-size:1.5rem;font-weight:700;color:var(--text);margin-bottom:.75rem;line-height:1.3">${topic.title}</h1>
        <div style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:1rem">${topic.body}</div>
        <div class="tags" style="margin-bottom:1rem">${(topic.tags||[]).map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
        <div style="display:flex;align-items:center;gap:1rem;padding-top:.75rem;border-top:1px solid var(--border)">
          <div style="font-size:.8rem;color:var(--text3)">Por <strong style="color:var(--text2)">${topic.author}</strong> · ${formatDate(topic.createdAt)}</div>
          <button class="btn btn-ghost btn-sm" onclick="voteForTopic('${topic.id}')">▲ Votar <span id="vote-count">(${topic.votes})</span></button>
        </div>
      </div>

      <div class="cyber-divider"><span>${topic.answers.length} Respuestas</span></div>

      <div id="answers-list">
        ${topic.answers.length === 0 ? '<div class="empty-state" style="padding:2rem"><div class="empty-icon">💬</div><div class="empty-text">Sé el primero en responder</div></div>' :
          topic.answers.map(a => `
            <div class="answer-card ${a.isAccepted ? 'accepted' : ''}">
              <div style="display:flex;align-items:flex-start;gap:1rem">
                <div style="display:flex;flex-direction:column;align-items:center;gap:.25rem;min-width:40px">
                  ${a.isAccepted ? '<span class="accepted-badge">✓ Aceptada</span>' : ''}
                  <div style="font-family:var(--font-display);font-size:.9rem;font-weight:700;color:var(--text)">▲ ${a.votes}</div>
                </div>
                <div style="flex:1">
                  <div style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:.5rem">${a.text}</div>
                  <div style="font-size:.75rem;color:var(--text3)"><strong style="color:var(--text2)">${a.author}</strong> · ${timeAgo(a.createdAt)}</div>
                </div>
                ${!a.isAccepted ? `<button class="btn btn-ghost btn-sm" onclick="acceptAnswer('${topic.id}','${a.id}')">✓ Aceptar</button>` : ''}
              </div>
            </div>`).join('')}
      </div>

      <div class="cyber-divider"><span>Tu Respuesta</span></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Tu Nombre</label><input class="form-control" id="ans-author" placeholder="Nombre (opcional)"></div>
        <div class="form-group"><label class="form-label">Respuesta</label><textarea class="form-control" id="ans-text" style="min-height:140px" placeholder="Escribe tu respuesta detallada..."></textarea></div>
        <button class="btn btn-primary" onclick="submitAnswer('${topic.id}')">Publicar Respuesta →</button>
      </div>
    </div>`;
}

async function voteForTopic(id) {
  const data = await API.post(`/forum/${id}/vote`, {});
  document.getElementById('vote-count').textContent = `(${data.votes})`;
  showToast('Voto registrado', 'success');
}

async function submitAnswer(topicId) {
  const author = document.getElementById('ans-author').value.trim();
  const text = document.getElementById('ans-text').value.trim();
  if (!text) { showToast('Escribe una respuesta', 'error'); return; }
  await API.post(`/forum/${topicId}/answer`, { author, text });
  document.getElementById('ans-text').value = '';
  showToast('Respuesta publicada', 'success');
  loadTopicDetail(topicId);
}

async function acceptAnswer(topicId, answerId) {
  await API.post(`/forum/${topicId}/answer/${answerId}/accept`, {});
  showToast('¡Respuesta aceptada!', 'success');
  loadTopicDetail(topicId);
}

function openNewTopicModal() {
  const chapters = ['Cap. 1','Cap. 2','Cap. 3','Cap. 4','Cap. 5','Cap. 6','Cap. 7','Cap. 8','Cap. 9','General'];
  const categories = ['Duda', 'Tip', 'Discusión', 'Recurso'];
  openModal(`
    <div class="form-group"><label class="form-label">Título de la pregunta</label><input class="form-control" id="t-title" placeholder="¿Cómo se calcula...?"></div>
    <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-control" id="t-body" style="min-height:120px" placeholder="Describe tu pregunta en detalle..."></textarea></div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Categoría</label><select class="form-control" id="t-cat">${categories.map(c=>`<option>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Capítulo</label><select class="form-control" id="t-chapter">${chapters.map(c=>`<option>${c}</option>`).join('')}</select></div>
    </div>
    <div class="form-group"><label class="form-label">Tu nombre</label><input class="form-control" id="t-author" placeholder="Nombre (opcional)"></div>
    <div class="form-group"><label class="form-label">Tags (separados por coma)</label><input class="form-control" id="t-tags" placeholder="vectores, equilibrio..."></div>
    <button class="btn btn-primary w-full" onclick="submitTopic()">Publicar Pregunta</button>
  `, '❋ Nueva Pregunta');
}

async function submitTopic() {
  const title = document.getElementById('t-title').value.trim();
  const body = document.getElementById('t-body').value.trim();
  if (!title || !body) { showToast('Completa título y descripción', 'error'); return; }
  await API.post('/forum', {
    title, body, author: document.getElementById('t-author').value || 'Anónimo',
    chapter: document.getElementById('t-chapter').value,
    category: document.getElementById('t-cat').value,
    tags: document.getElementById('t-tags').value
  });
  closeModal();
  showToast('Pregunta publicada', 'success');
  navigate('/forum');
}
