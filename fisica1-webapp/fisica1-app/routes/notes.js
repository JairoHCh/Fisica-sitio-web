const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE = path.join(__dirname, '../data/notes.json');
const read = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

router.get('/', (req, res) => res.json(read()));

router.post('/', (req, res) => {
  const { title, content, color, chapter } = req.body;
  if (!content) return res.status(400).json({ error: 'Contenido requerido' });
  const notes = read();
  const note = { id: uuidv4(), title: title || 'Sin título', content, color: color || '#1e3a5f', chapter: chapter || 'General', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  notes.unshift(note);
  write(notes);
  res.status(201).json(note);
});

router.put('/:id', (req, res) => {
  const notes = read();
  const idx = notes.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  notes[idx] = { ...notes[idx], ...req.body, updatedAt: new Date().toISOString() };
  write(notes);
  res.json(notes[idx]);
});

router.delete('/:id', (req, res) => {
  write(read().filter(n => n.id !== req.params.id));
  res.json({ success: true });
});

module.exports = router;
