// ======= NOTES MODULE =======
const NOTE_COLORS = [
  { bg: '#0d2137', border: '#1a4a7a', label: 'Azul' },
  { bg: '#1a0d2e', border: '#4a1a7a', label: 'Morado' },
  { bg: '#1a1a0d', border: '#4a4a1a', label: 'Dorado' },
  { bg: '#0d1a14', border: '#1a4a2a', label: 'Verde' },
  { bg: '#1a0d0d', border: '#4a1a1a', label: 'Rojo' },
  { bg: '#0d1a2e', border: '#1a3a5f', label: 'Navy' }
];

async function renderNotes() {
  const notes = await API.get('/notes');
  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">✎ <span>Mis</span> Notas</h1>
          <div class="section-subtitle">${notes.length} notas guardadas · Tu espacio personal</div>
        </div>
        <button class="btn btn-primary" onclick="openNewNoteModal()">+ Nueva Nota</button>
      </div>
      <div id="notes-grid" class="notes-grid">
        ${notes.length === 0 ? `
          <div class="empty-state" style="grid-column:1/-1">
            <div class="empty-icon">✎</div>
            <div class="empty-text">No tienes notas todavía</div>
            <div class="empty-sub">Crea notas para tus apuntes de clase</div>
            <button class="btn btn-primary mt-2" onclick="openNewNoteModal()">Crear Nota</button>
          </div>` :
        notes.map(n => renderNoteCard(n)).join('')}
      </div>
    </div>`;
}

function renderNoteCard(n) {
  const colorObj = NOTE_COLORS[parseInt(n.id?.charCodeAt(0) || 0) % NOTE_COLORS.length];
  return `
    <div class="note-card" style="background:${colorObj.bg};border-color:${colorObj.border}" onclick="openEditNoteModal('${n.id}','${escapeAttr(n.title)}','${escapeAttr(n.content)}','${n.chapter||'General'}')">
      <div class="note-actions" onclick="event.stopPropagation()">
        <button class="btn btn-danger btn-icon btn-sm" onclick="deleteNote('${n.id}')">✕</button>
      </div>
      <div class="note-title">${n.title}</div>
      <div class="note-content">${n.content}</div>
      <div class="note-chapter">📌 ${n.chapter || 'General'} · ${timeAgo(n.updatedAt || n.createdAt)}</div>
    </div>`;
}

function escapeAttr(str) {
  return (str || '').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function openNewNoteModal() {
  const chapters = ['General','Cap. 1 - Vectores','Cap. 2 - Cinemática','Cap. 3 - Estática','Cap. 4 - Dinámica','Cap. 5 - Energía','Cap. 6 - Sistema Partículas','Cap. 7 - Fluidos','Cap. 8 - Ondas','Cap. 9 - Termodinámica'];
  openModal(`
    <div class="form-group"><label class="form-label">Título</label><input class="form-control" id="n-title" placeholder="Ej: Fórmulas de Cinemática..."></div>
    <div class="form-group"><label class="form-label">Capítulo</label>
      <select class="form-control" id="n-chapter">${chapters.map(c=>`<option>${c}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Contenido</label>
      <textarea class="form-control" id="n-content" style="min-height:200px" placeholder="Escribe tus apuntes aquí...
Puedes incluir fórmulas, resúmenes, etc."></textarea>
    </div>
    <button class="btn btn-primary w-full" onclick="submitNote()">💾 Guardar Nota</button>
  `, '✎ Nueva Nota');
}

function openEditNoteModal(id, title, content, chapter) {
  const realContent = content.replace(/\\n/g, '\n');
  const chapters = ['General','Cap. 1 - Vectores','Cap. 2 - Cinemática','Cap. 3 - Estática','Cap. 4 - Dinámica','Cap. 5 - Energía','Cap. 6 - Sistema Partículas','Cap. 7 - Fluidos','Cap. 8 - Ondas','Cap. 9 - Termodinámica'];
  openModal(`
    <div class="form-group"><label class="form-label">Título</label><input class="form-control" id="ne-title" value="${title.replace(/\\'/g,"'")}"></div>
    <div class="form-group"><label class="form-label">Capítulo</label>
      <select class="form-control" id="ne-chapter">${chapters.map(c=>`<option ${c===chapter?'selected':''}>${c}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Contenido</label>
      <textarea class="form-control" id="ne-content" style="min-height:200px">${realContent}</textarea>
    </div>
    <div style="display:flex;gap:.75rem">
      <button class="btn btn-primary" style="flex:1" onclick="updateNote('${id}')">💾 Actualizar</button>
      <button class="btn btn-danger" onclick="deleteNote('${id}')">🗑 Eliminar</button>
    </div>
  `, '✎ Editar Nota');
}

async function submitNote() {
  const title = document.getElementById('n-title').value.trim();
  const content = document.getElementById('n-content').value.trim();
  const chapter = document.getElementById('n-chapter').value;
  if (!content) { showToast('El contenido es requerido', 'error'); return; }
  await API.post('/notes', { title: title || 'Sin título', content, chapter });
  closeModal();
  showToast('Nota guardada', 'success');
  navigate('/notes');
}

async function updateNote(id) {
  const title = document.getElementById('ne-title').value.trim();
  const content = document.getElementById('ne-content').value.trim();
  const chapter = document.getElementById('ne-chapter').value;
  if (!content) { showToast('El contenido es requerido', 'error'); return; }
  const res = await fetch(`/api/notes/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title || 'Sin título', content, chapter })
  });
  if (!res.ok) { showToast('Error al actualizar', 'error'); return; }
  closeModal();
  showToast('Nota actualizada', 'success');
  navigate('/notes');
}

async function deleteNote(id) {
  closeModal();
  if (!confirm('¿Eliminar esta nota?')) return;
  await API.delete(`/notes/${id}`);
  showToast('Nota eliminada', 'success');
  navigate('/notes');
}
