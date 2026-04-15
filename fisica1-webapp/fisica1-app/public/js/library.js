// ======= LIBRARY PAGE =======
const FILE_ICONS = { pdf: '📄', doc: '📝', docx: '📝', ppt: '📊', pptx: '📊', txt: '📋', png: '🖼', jpg: '🖼', jpeg: '🖼', link: '🔗', file: '📎' };

async function renderLibrary() {
  const items = await API.get('/library');
  const chapters = ['Todos', ...new Set(items.map(i => i.chapter))];

  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">◉ <span>Biblioteca</span> Virtual</h1>
          <div class="section-subtitle">${items.length} recursos disponibles · Sube y comparte material</div>
        </div>
        <button class="btn btn-primary" onclick="openUploadModal()">+ Subir Recurso</button>
      </div>

      <div class="library-filters" id="lib-filters">
        ${chapters.map((ch, i) => `<button class="filter-btn ${i===0?'active':''}" onclick="filterLib(this,'${ch}')">${ch}</button>`).join('')}
      </div>

      <div id="lib-grid" class="flex flex-col gap-1">
        ${items.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">◉</div>
            <div class="empty-text">La biblioteca está vacía</div>
            <div class="empty-sub">¡Sé el primero en subir material!</div>
            <button class="btn btn-primary mt-2" onclick="openUploadModal()">Subir Material</button>
          </div>` :
        items.map(item => renderLibItem(item)).join('')}
      </div>
    </div>`;
}

function getFileIcon(item) {
  if (item.type === 'link') return '🔗';
  if (item.originalName) {
    const ext = item.originalName.split('.').pop().toLowerCase();
    return FILE_ICONS[ext] || '📎';
  }
  return '📎';
}

function renderLibItem(item) {
  return `
    <div class="lib-card" data-chapter="${item.chapter}">
      <div class="lib-icon">${getFileIcon(item)}</div>
      <div class="lib-info">
        <div class="lib-title">${item.title}</div>
        ${item.description ? `<div class="lib-desc">${item.description}</div>` : ''}
        <div class="lib-meta">
          <span class="badge badge-cyan">${item.chapter}</span>
          <span>👤 ${item.author}</span>
          <span>⬇ ${item.downloads} descargas</span>
          <span>📅 ${timeAgo(item.createdAt)}</span>
          ${item.size ? `<span>💾 ${(item.size/1024).toFixed(1)} KB</span>` : ''}
        </div>
      </div>
      <div class="lib-actions">
        ${item.type === 'link' ? `<a href="${item.url}" target="_blank" class="btn btn-ghost btn-sm" onclick="countDownload('${item.id}')">Abrir →</a>` :
          `<a href="/uploads/${item.filename}" target="_blank" download="${item.originalName}" class="btn btn-primary btn-sm" onclick="countDownload('${item.id}')">Descargar</a>`}
        <button class="btn btn-danger btn-sm" onclick="deleteLibItem('${item.id}')">✕</button>
      </div>
    </div>`;
}

function filterLib(btn, chapter) {
  document.querySelectorAll('#lib-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#lib-grid .lib-card').forEach(card => {
    card.style.display = (chapter === 'Todos' || card.dataset.chapter === chapter) ? 'flex' : 'none';
  });
}

async function countDownload(id) {
  await API.post(`/library/${id}/download`, {});
}

async function deleteLibItem(id) {
  if (!confirm('¿Eliminar este recurso?')) return;
  await API.delete(`/library/${id}`);
  showToast('Recurso eliminado', 'success');
  navigate('/library');
}

function openUploadModal() {
  const chapters = ['Cap. 1 - Vectores','Cap. 2 - Cinemática','Cap. 3 - Estática','Cap. 4 - Dinámica','Cap. 5 - Energía','Cap. 6 - Sistema Partículas','Cap. 7 - Fluidos','Cap. 8 - Ondas','Cap. 9 - Termodinámica','General'];
  openModal(`
    <div style="display:flex;gap:.5rem;margin-bottom:1.5rem" id="upload-tabs">
      <button class="btn btn-primary btn-sm" onclick="switchUploadTab('file',this)">📁 Subir Archivo</button>
      <button class="btn btn-ghost btn-sm" onclick="switchUploadTab('link',this)">🔗 Agregar Enlace</button>
    </div>
    <div class="form-group"><label class="form-label">Título</label><input class="form-control" id="lib-title" placeholder="Nombre del recurso..."></div>
    <div class="form-group"><label class="form-label">Descripción</label><input class="form-control" id="lib-desc" placeholder="Breve descripción (opcional)"></div>
    <div class="form-group"><label class="form-label">Capítulo</label>
      <select class="form-control" id="lib-chapter">${chapters.map(c=>`<option>${c}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Autor</label><input class="form-control" id="lib-author" placeholder="Tu nombre"></div>
    <div id="upload-file-section" class="form-group"><label class="form-label">Archivo (PDF, DOC, PPT, imágenes — máx. 10MB)</label><input type="file" class="form-control" id="lib-file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"></div>
    <div id="upload-link-section" class="form-group" style="display:none"><label class="form-label">URL del recurso</label><input class="form-control" id="lib-url" placeholder="https://..."></div>
    <button class="btn btn-primary w-full" onclick="submitLibUpload()">Subir Recurso</button>
  `, '◉ Subir Recurso');
}

function switchUploadTab(type, btn) {
  document.querySelectorAll('#upload-tabs .btn').forEach(b => { b.className = 'btn btn-ghost btn-sm'; });
  btn.className = 'btn btn-primary btn-sm';
  document.getElementById('upload-file-section').style.display = type === 'file' ? 'block' : 'none';
  document.getElementById('upload-link-section').style.display = type === 'link' ? 'block' : 'none';
}

async function submitLibUpload() {
  const title = document.getElementById('lib-title').value.trim();
  if (!title) { showToast('Título requerido', 'error'); return; }
  const fd = new FormData();
  fd.append('title', title);
  fd.append('description', document.getElementById('lib-desc').value);
  fd.append('chapter', document.getElementById('lib-chapter').value);
  fd.append('author', document.getElementById('lib-author').value || 'Anónimo');
  const fileInput = document.getElementById('lib-file');
  const urlInput = document.getElementById('lib-url');
  if (fileInput && fileInput.files[0]) fd.append('file', fileInput.files[0]);
  if (urlInput && urlInput.value) fd.append('url', urlInput.value);
  await API.postForm('/library/upload', fd);
  closeModal();
  showToast('Recurso subido exitosamente', 'success');
  navigate('/library');
}
