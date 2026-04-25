// ======= API CLIENT =======
const API = {
  base: '/api',
  async get(endpoint) {
    const res = await fetch(`${this.base}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async post(endpoint, body) {
    const res = await fetch(`${this.base}${endpoint}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async postForm(endpoint, formData) {
    const res = await fetch(`${this.base}${endpoint}`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
  async delete(endpoint) {
    const res = await fetch(`${this.base}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
};

// ======= TOAST NOTIFICATIONS =======
function showToast(message, type = 'info') {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'toastIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ======= MODAL =======
function openModal(content, title = '') {
  const overlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = title ? `<h3 class="modal-title">${title}</h3>${content}` : content;
  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ======= TIME UTILITIES =======
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return 'ahora mismo';
  if (min < 60) return `hace ${min}m`;
  if (hr < 24) return `hace ${hr}h`;
  if (day < 7) return `hace ${day}d`;
  return new Date(dateStr).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ======= AVATAR COLORS =======
function avatarColor(name) {
  const colors = ['#00d4ff', '#a855f7', '#ffd23f', '#00ff88', '#ff4757'];
  let hash = 0;
  for (let c of (name || 'A')) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function avatarInitial(name) {
  return (name || 'A').charAt(0).toUpperCase();
}

// ======= TOAST SYSTEM =======
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ======= MODAL SYSTEM =======
function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('modalContent').innerHTML = '';
}
document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.getElementById('modalClose')?.addEventListener('click', closeModal);
