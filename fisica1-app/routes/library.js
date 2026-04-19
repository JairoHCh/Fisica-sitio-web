const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const FILE = path.join(__dirname, '../data/library.json');
const read = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

const seed = () => {
  const items = read();
  if (items.length === 0) {
    write([
      {
        id: uuidv4(), title: "Formulario Completo de Física 1",
        description: "Resumen de todas las fórmulas del curso: cinemática, dinámica, energía, ondas y termodinámica.",
        chapter: "Todos los capítulos", type: "link",
        url: "https://www.fisicalab.com/formulario", author: "Prof. García",
        downloads: 45, createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      {
        id: uuidv4(), title: "Tabla de Integrales y Derivadas para Física",
        description: "Referencia matemática esencial para resolver problemas de física con cálculo.",
        chapter: "Cap. 1 - Introducción", type: "link",
        url: "https://www.integral-table.com", author: "Biblioteca",
        downloads: 23, createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ]);
  }
};
seed();

router.get('/', (req, res) => {
  const items = read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(items);
});

router.post('/upload', upload.single('file'), (req, res) => {
  const { title, description, chapter, author } = req.body;
  if (!title) return res.status(400).json({ error: 'Título requerido' });
  const items = read();
  const newItem = {
    id: uuidv4(), title, description: description || '',
    chapter: chapter || 'General', author: author || 'Anónimo',
    type: req.file ? 'file' : 'link',
    filename: req.file ? req.file.filename : null,
    originalName: req.file ? req.file.originalname : null,
    url: req.body.url || null,
    size: req.file ? req.file.size : null,
    downloads: 0, createdAt: new Date().toISOString()
  };
  items.unshift(newItem);
  write(items);
  res.status(201).json(newItem);
});

router.post('/:id/download', (req, res) => {
  const items = read();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  item.downloads = (item.downloads || 0) + 1;
  write(items);
  res.json({ downloads: item.downloads });
});

router.delete('/:id', (req, res) => {
  const items = read();
  const item = items.find(i => i.id === req.params.id);
  if (item && item.filename) {
    const filePath = path.join(__dirname, '../uploads', item.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  write(items.filter(i => i.id !== req.params.id));
  res.json({ success: true });
});

module.exports = router;
