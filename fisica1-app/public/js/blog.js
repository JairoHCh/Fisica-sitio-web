// ======= BLOG PAGE =======
async function renderBlog() {
  const posts = await API.get('/blog');
  const recentPosts = posts.slice(0, 5);
  const chapters = [...new Set(posts.map(p => p.chapter))];
  const popularPosts = [...posts].sort((a,b) => b.views - a.views).slice(0,5);

  return `
    <div class="page-enter">
      <div class="section-header">
        <div>
          <h1 class="section-title">✦ <span>Blog</span> de Física</h1>
          <div class="section-subtitle">${posts.length} publicaciones · Comparte tu conocimiento</div>
        </div>
        <button class="btn btn-primary" onclick="openNewPostModal()">+ Nuevo Post</button>
      </div>

      <div class="blog-grid">
        <div id="blog-posts">
          ${posts.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">✦</div>
              <div class="empty-text">No hay posts todavía</div>
              <div class="empty-sub">¡Sé el primero en publicar!</div>
              <button class="btn btn-primary mt-2" onclick="openNewPostModal()">Crear Post</button>
            </div>` :
          posts.map(p => renderPostCard(p)).join('')}
        </div>

        <aside>
          <div class="sidebar-card">
            <div class="sidebar-title">⚡ Más Vistos</div>
            ${popularPosts.map(p => `
              <div style="padding:.6rem 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="loadPostDetail('${p.id}')">
                <div style="font-size:.82rem;color:var(--text);font-weight:600;margin-bottom:.2rem">${p.title}</div>
                <div style="font-size:.72rem;color:var(--text3);font-family:var(--font-mono)">${p.views} vistas · ${p.likes} likes</div>
              </div>
            `).join('')}
          </div>
          <div class="sidebar-card">
            <div class="sidebar-title">◈ Por Capítulo</div>
            ${chapters.map(ch => {
              const count = posts.filter(p => p.chapter === ch).length;
              return `<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid var(--border)">
                <span style="font-size:.8rem;color:var(--text2)">${ch}</span>
                <span class="badge badge-cyan">${count}</span>
              </div>`;
            }).join('')}
          </div>
        </aside>
      </div>
    </div>`;
}

function renderPostCard(p) {
  const excerpt = p.content.substring(0, 200) + (p.content.length > 200 ? '...' : '');
  return `
    <div class="blog-post-card" onclick="loadPostDetail('${p.id}')">
      <div class="post-chapter">${p.chapter}</div>
      <div class="post-title">${p.title}</div>
      <div class="tags">${(p.tags||[]).map(t => `<span class="tag">#${t}</span>`).join('')}</div>
      <div class="post-excerpt">${excerpt}</div>
      <div class="post-meta">
        <div class="post-author">Por <strong>${p.author}</strong> · ${timeAgo(p.createdAt)}</div>
        <div class="post-stats">
          <span class="post-stat">👁 ${p.views||0}</span>
          <span class="post-stat">♥ ${p.likes||0}</span>
          <span class="post-stat">💬 ${(p.comments||[]).length}</span>
        </div>
      </div>
    </div>`;
}

async function loadPostDetail(id) {
  const post = await API.get(`/blog/${id}`);
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="page-enter">
      <button class="btn btn-ghost back-btn" onclick="navigate('/blog')">← Volver al Blog</button>
      <div class="card">
        <div class="post-detail-header">
          <div class="post-chapter">${post.chapter}</div>
          <h1 style="font-size:1.8rem;font-weight:700;color:var(--text);margin:.5rem 0;line-height:1.3">${post.title}</h1>
          <div class="tags">${(post.tags||[]).map(t => `<span class="tag">#${t}</span>`).join('')}</div>
          <div class="post-meta" style="margin-top:.75rem">
            <div style="display:flex;align-items:center;gap:.75rem">
              <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${avatarColor(post.author)},var(--purple));display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--bg)">${avatarInitial(post.author)}</div>
              <div><div style="font-size:.85rem;font-weight:600;color:var(--text)">${post.author}</div><div style="font-size:.75rem;color:var(--text3)">${formatDate(post.createdAt)} · ${post.views} vistas</div></div>
            </div>
            <div class="post-stats">
              <button class="btn btn-ghost btn-sm" onclick="likePost('${post.id}')">♥ <span id="like-count">${post.likes}</span> likes</button>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="post-detail-body">${post.content}</div>

        <!-- COMMENTS -->
        <div class="comments-section">
          <h3 style="font-family:var(--font-display);font-size:.9rem;color:var(--text2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:1.5rem">
            💬 Comentarios (${(post.comments||[]).length})
          </h3>
          <div id="comments-list">
            ${(post.comments||[]).length === 0 ? '<div class="text-muted text-small">No hay comentarios aún. ¡Sé el primero!</div>' :
              post.comments.map(c => `
                <div class="comment-item">
                  <div class="comment-avatar" style="background:linear-gradient(135deg,${avatarColor(c.author)},var(--bg3))">${avatarInitial(c.author)}</div>
                  <div class="comment-body">
                    <div><span class="comment-author">${c.author}</span><span class="comment-time">${timeAgo(c.createdAt)}</span></div>
                    <div class="comment-text">${c.text}</div>
                  </div>
                </div>`).join('')}
          </div>
          <div class="divider"></div>
          <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:1rem">
            <div class="grid-2">
              <div class="form-group" style="margin:0"><input class="form-control" id="comment-author" placeholder="Tu nombre (opcional)"></div>
            </div>
            <textarea class="form-control" id="comment-text" placeholder="Escribe tu comentario..." style="min-height:80px"></textarea>
            <button class="btn btn-primary" style="align-self:flex-end" onclick="addComment('${post.id}')">Comentar →</button>
          </div>
        </div>
      </div>
    </div>`;
}

async function likePost(id) {
  const data = await API.post(`/blog/${id}/like`, {});
  document.getElementById('like-count').textContent = data.likes;
  showToast('¡Post valorado!', 'success');
}

async function addComment(postId) {
  const author = document.getElementById('comment-author').value.trim();
  const text = document.getElementById('comment-text').value.trim();
  if (!text) { showToast('Escribe un comentario', 'error'); return; }
  const comment = await API.post(`/blog/${postId}/comment`, { author, text });
  document.getElementById('comment-text').value = '';
  const list = document.getElementById('comments-list');
  list.innerHTML += `
    <div class="comment-item">
      <div class="comment-avatar" style="background:linear-gradient(135deg,${avatarColor(comment.author)},var(--bg3))">${avatarInitial(comment.author)}</div>
      <div class="comment-body">
        <div><span class="comment-author">${comment.author}</span><span class="comment-time">ahora mismo</span></div>
        <div class="comment-text">${comment.text}</div>
      </div>
    </div>`;
  showToast('Comentario publicado', 'success');
}

function openNewPostModal() {
  const chapters = ['Cap. 1 - Vectores','Cap. 2 - Cinemática','Cap. 3 - Estática','Cap. 4 - Dinámica','Cap. 5 - Energía','Cap. 6 - Sistema Partículas','Cap. 7 - Fluidos','Cap. 8 - Ondas','Cap. 9 - Termodinámica','General'];
  openModal(`
    <div class="form-group"><label class="form-label">Título</label><input class="form-control" id="new-title" placeholder="Título del post..."></div>
    <div class="form-group"><label class="form-label">Autor</label><input class="form-control" id="new-author" placeholder="Tu nombre"></div>
    <div class="form-group"><label class="form-label">Capítulo</label>
      <select class="form-control" id="new-chapter">${chapters.map(c=>`<option>${c}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Tags (separados por coma)</label><input class="form-control" id="new-tags" placeholder="vectores, dinámica, energía"></div>
    <div class="form-group"><label class="form-label">Contenido</label><textarea class="form-control" id="new-content" style="min-height:200px" placeholder="Escribe el contenido del post..."></textarea></div>
    <button class="btn btn-primary w-full" onclick="submitPost()">Publicar Post</button>
  `, '✦ Nuevo Post');
}

async function submitPost() {
  const title = document.getElementById('new-title').value.trim();
  const author = document.getElementById('new-author').value.trim();
  const chapter = document.getElementById('new-chapter').value;
  const tags = document.getElementById('new-tags').value;
  const content = document.getElementById('new-content').value.trim();
  if (!title || !content) { showToast('Título y contenido requeridos', 'error'); return; }
  await API.post('/blog', { title, author, chapter, tags, content });
  closeModal();
  showToast('Post publicado exitosamente', 'success');
  navigate('/blog');
}
