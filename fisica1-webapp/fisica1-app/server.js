const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Initialize data files
['blog', 'forum', 'library', 'notes'].forEach(name => {
  const file = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify([]));
});

// Routes
app.use('/api/blog', require('./routes/blog'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/library', require('./routes/library'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/quiz', require('./routes/quiz'));

// Fallback: serve SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Física 1 WebApp iniciada`);
});
