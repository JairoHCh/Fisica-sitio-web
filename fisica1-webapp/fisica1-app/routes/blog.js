const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FILE = path.join(__dirname, '../data/blog.json');
const read = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

// Seed with initial posts if empty
const seedBlog = () => {
  const posts = read();
  if (posts.length === 0) {
    write([
      {
        id: uuidv4(), title: "Introducción a los Vectores en Física",
        content: "Los vectores son magnitudes que poseen tanto módulo como dirección y sentido. Son fundamentales para describir fuerzas, velocidades y aceleraciones. Un vector se representa geométricamente como una flecha donde la longitud indica el módulo y la punta indica el sentido.\n\nEn física, trabajamos con vectores en 2D y 3D. Las operaciones fundamentales son: suma (regla del paralelogramo), producto escalar (da un escalar) y producto vectorial (da un vector perpendicular).\n\nEjemplo: Si un objeto tiene velocidad v=(3,4) m/s, su módulo es |v|=√(9+16)=5 m/s.",
        author: "Prof. García", chapter: "Cap. 1 - Vectores",
        tags: ["vectores", "introduccion", "fundamentos"],
        likes: 12, comments: [], createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), views: 45
      },
      {
        id: uuidv4(), title: "Movimiento Parabólico: Análisis Completo",
        content: "El movimiento parabólico es la combinación de un MRU horizontal y un MRUV vertical (con g=9.8 m/s²).\n\nEcuaciones fundamentales:\n- x(t) = v₀·cos(θ)·t\n- y(t) = v₀·sen(θ)·t - ½g·t²\n- vx = v₀·cos(θ) (constante)\n- vy = v₀·sen(θ) - g·t\n\nAlcance máximo: R = v₀²·sen(2θ)/g\nAltura máxima: H = v₀²·sen²(θ)/(2g)\nTiempo de vuelo: T = 2·v₀·sen(θ)/g\n\nEl ángulo óptimo para máximo alcance es θ=45°.",
        author: "Prof. García", chapter: "Cap. 2 - Cinemática",
        tags: ["cinematica", "parabólico", "projectil"],
        likes: 18, comments: [], createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), views: 67
      },
      {
        id: uuidv4(), title: "Leyes de Newton y sus Aplicaciones",
        content: "Las tres leyes de Newton son el fundamento de la mecánica clásica:\n\n1ª Ley (Inercia): Un cuerpo permanece en reposo o movimiento uniforme si la fuerza neta es cero. ΣF=0\n\n2ª Ley (Fundamental): La aceleración es proporcional a la fuerza neta. ΣF=ma\n\n3ª Ley (Acción-Reacción): Por cada fuerza existe una fuerza igual y contraria.\n\nAplicaciones comunes: plano inclinado, Atwood, fricción, movimiento circular. El diagrama de cuerpo libre (DCL) es esencial para resolver problemas.",
        author: "Estudiante Pérez", chapter: "Cap. 3 - Estática / Cap. 4 - Dinámica",
        tags: ["newton", "dinámica", "fuerzas"],
        likes: 25, comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(), views: 89
      }
    ]);
  }
};
seedBlog();

// GET all posts
router.get('/', (req, res) => {
  const posts = read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(posts);
});

// GET single post
router.get('/:id', (req, res) => {
  const posts = read();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  post.views = (post.views || 0) + 1;
  write(posts);
  res.json(post);
});

// POST create post
router.post('/', (req, res) => {
  const { title, content, author, chapter, tags } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Título y contenido requeridos' });
  const posts = read();
  const newPost = {
    id: uuidv4(), title, content,
    author: author || 'Anónimo', chapter: chapter || 'General',
    tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
    likes: 0, comments: [], views: 0, createdAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  write(posts);
  res.status(201).json(newPost);
});

// POST like
router.post('/:id/like', (req, res) => {
  const posts = read();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  post.likes = (post.likes || 0) + 1;
  write(posts);
  res.json({ likes: post.likes });
});

// POST comment
router.post('/:id/comment', (req, res) => {
  const { author, text } = req.body;
  if (!text) return res.status(400).json({ error: 'Comentario requerido' });
  const posts = read();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  const comment = { id: uuidv4(), author: author || 'Anónimo', text, createdAt: new Date().toISOString() };
  if (!post.comments) post.comments = [];
  post.comments.push(comment);
  write(posts);
  res.status(201).json(comment);
});

// DELETE post
router.delete('/:id', (req, res) => {
  let posts = read();
  posts = posts.filter(p => p.id !== req.params.id);
  write(posts);
  res.json({ success: true });
});

module.exports = router;
