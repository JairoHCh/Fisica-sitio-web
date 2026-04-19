const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE = path.join(__dirname, '../data/forum.json');
const read = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

const seed = () => {
  const topics = read();
  if (topics.length === 0) {
    write([
      {
        id: uuidv4(), title: "¿Cómo se calcula el producto vectorial?",
        body: "Tengo dudas sobre el producto vectorial (cruz). ¿Cuál es la regla de la mano derecha y cómo aplico la fórmula del determinante?",
        author: "Miguel Torres", chapter: "Cap. 1", category: "Duda",
        tags: ["vectores", "producto-vectorial"], votes: 8,
        answers: [{ id: uuidv4(), author: "Prof. García", text: "El producto vectorial A×B se calcula como el determinante de la matriz 3x3 con los versores i,j,k en la primera fila. La regla de la mano derecha: apunta los dedos en dirección A, curva hacia B, el pulgar apunta en dirección A×B. El módulo es |A||B|sin(θ).", votes: 5, isAccepted: true, createdAt: new Date(Date.now() - 3600000).toISOString() }],
        views: 34, solved: true, createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: uuidv4(), title: "No entiendo la diferencia entre velocidad media e instantánea",
        body: "En el capítulo de cinemática me confundo: ¿cuándo uso velocidad media y cuándo velocidad instantánea? ¿Son lo mismo en MRU?",
        author: "Ana Ríos", chapter: "Cap. 2", category: "Duda",
        tags: ["cinemática", "velocidad"], votes: 12,
        answers: [], views: 28, solved: false, createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: uuidv4(), title: "Truco para resolver problemas de estática con momentos",
        body: "Comparto un método que me funciona: siempre escoge el punto de momento donde más fuerzas desconocidas concurran. Así reduces ecuaciones. ¿Alguien tiene más tips?",
        author: "Carlos Vega", chapter: "Cap. 3", category: "Tip",
        tags: ["estática", "momentos", "tips"], votes: 15,
        answers: [{ id: uuidv4(), author: "Lucia M.", text: "Excelente tip! También ayuda hacer siempre el DCL antes de cualquier ecuación. Nunca saltarse ese paso.", votes: 7, isAccepted: false, createdAt: new Date(Date.now() - 43200000).toISOString() }],
        views: 52, solved: false, createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]);
  }
};
seed();

router.get('/', (req, res) => {
  const topics = read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(topics);
});

router.get('/:id', (req, res) => {
  const topics = read();
  const topic = topics.find(t => t.id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'Tema no encontrado' });
  topic.views = (topic.views || 0) + 1;
  write(topics);
  res.json(topic);
});

router.post('/', (req, res) => {
  const { title, body, author, chapter, category, tags } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Título y contenido requeridos' });
  const topics = read();
  const newTopic = {
    id: uuidv4(), title, body,
    author: author || 'Anónimo', chapter: chapter || 'General',
    category: category || 'Duda',
    tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
    votes: 0, answers: [], views: 0, solved: false, createdAt: new Date().toISOString()
  };
  topics.unshift(newTopic);
  write(topics);
  res.status(201).json(newTopic);
});

router.post('/:id/vote', (req, res) => {
  const topics = read();
  const topic = topics.find(t => t.id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'No encontrado' });
  topic.votes = (topic.votes || 0) + 1;
  write(topics);
  res.json({ votes: topic.votes });
});

router.post('/:id/answer', (req, res) => {
  const { author, text } = req.body;
  if (!text) return res.status(400).json({ error: 'Respuesta requerida' });
  const topics = read();
  const topic = topics.find(t => t.id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'Tema no encontrado' });
  const answer = { id: uuidv4(), author: author || 'Anónimo', text, votes: 0, isAccepted: false, createdAt: new Date().toISOString() };
  if (!topic.answers) topic.answers = [];
  topic.answers.push(answer);
  write(topics);
  res.status(201).json(answer);
});

router.post('/:id/answer/:aid/accept', (req, res) => {
  const topics = read();
  const topic = topics.find(t => t.id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'No encontrado' });
  topic.answers.forEach(a => a.isAccepted = false);
  const answer = topic.answers.find(a => a.id === req.params.aid);
  if (answer) { answer.isAccepted = true; topic.solved = true; }
  write(topics);
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  let topics = read();
  topics = topics.filter(t => t.id !== req.params.id);
  write(topics);
  res.json({ success: true });
});

module.exports = router;
