const express = require('express');
const router = express.Router();

const quizzes = {
  "cap1": {
    title: "Capítulo 1: Vectores y Mediciones",
    questions: [
      { q: "¿Cuál es el módulo del vector v = (3, 4) m/s?", options: ["5 m/s", "7 m/s", "1 m/s", "12 m/s"], correct: 0 },
      { q: "El producto escalar A·B = |A||B|cos(θ). ¿Qué valor tiene si los vectores son perpendiculares?", options: ["0", "|A||B|", "-|A||B|", "1"], correct: 0 },
      { q: "¿Cuántas cifras significativas tiene 0.00304?", options: ["3", "5", "6", "2"], correct: 0 },
      { q: "El producto vectorial A×B produce:", options: ["Un escalar", "Un vector perpendicular a A y B", "Un vector paralelo a A", "Un número complejo"], correct: 1 },
      { q: "El orden de magnitud de 4500 es:", options: ["10³", "10⁴", "10²", "10⁵"], correct: 0 }
    ]
  },
  "cap2": {
    title: "Capítulo 2: Cinemática",
    questions: [
      { q: "En MRU, la aceleración es:", options: ["Cero", "Constante positiva", "Variable", "Negativa"], correct: 0 },
      { q: "¿Cuál es la ecuación de posición en MRUV?", options: ["x = x₀ + v₀t + ½at²", "x = v·t", "x = x₀ + at", "v = x/t"], correct: 0 },
      { q: "Un objeto cae desde el reposo. ¿Cuánto tarda en caer 45m? (g=10m/s²)", options: ["3 s", "2 s", "4.5 s", "9 s"], correct: 0 },
      { q: "El ángulo de lanzamiento para máximo alcance en movimiento parabólico es:", options: ["45°", "30°", "60°", "90°"], correct: 0 },
      { q: "En movimiento circular uniforme, la aceleración centrípeta apunta:", options: ["Hacia el centro", "Tangencialmente", "Hacia afuera", "Verticalmente"], correct: 0 }
    ]
  },
  "cap3": {
    title: "Capítulo 3: Estática",
    questions: [
      { q: "La primera condición de equilibrio establece que ΣF =", options: ["0", "ma", "mg", "P"], correct: 0 },
      { q: "El momento de una fuerza respecto a un punto depende de:", options: ["La fuerza y el brazo de momento", "Solo la magnitud de la fuerza", "Solo la distancia", "La masa del cuerpo"], correct: 0 },
      { q: "El módulo de Young mide:", options: ["Rigidez a la tracción/compresión", "Resistencia al corte", "Resistencia a la compresión volumétrica", "Peso específico"], correct: 0 },
      { q: "Para equilibrio de un cuerpo rígido se necesitan:", options: ["ΣF=0 y ΣM=0", "Solo ΣF=0", "Solo ΣM=0", "ΣF=ma"], correct: 0 },
      { q: "Si un cuerpo rígido es sometido a solo dos fuerzas y está en equilibrio, estas deben ser:", options: ["Iguales, opuestas y colineales", "Iguales y paralelas", "Perpendiculares", "En el mismo sentido"], correct: 0 }
    ]
  },
  "cap5": {
    title: "Capítulo 5: Energía y Conservación",
    questions: [
      { q: "La energía cinética de un cuerpo de masa m y velocidad v es:", options: ["½mv²", "mv²", "mgh", "½mv"], correct: 0 },
      { q: "El trabajo realizado por una fuerza conservativa en un ciclo cerrado es:", options: ["0", "Positivo", "Negativo", "Depende de la trayectoria"], correct: 0 },
      { q: "La potencia se define como:", options: ["Trabajo/tiempo", "Fuerza × tiempo", "Energía × tiempo", "Masa × aceleración"], correct: 0 },
      { q: "En una colisión perfectamente elástica se conservan:", options: ["Cantidad de movimiento y energía cinética", "Solo cantidad de movimiento", "Solo energía cinética", "Masa y velocidad"], correct: 0 },
      { q: "La unidad de energía en el SI es:", options: ["Joule (J)", "Newton (N)", "Watt (W)", "Pascal (Pa)"], correct: 0 }
    ]
  }
};

router.get('/', (req, res) => {
  const list = Object.entries(quizzes).map(([id, q]) => ({ id, title: q.title, questions: q.questions.length }));
  res.json(list);
});

router.get('/:id', (req, res) => {
  const quiz = quizzes[req.params.id];
  if (!quiz) return res.status(404).json({ error: 'Quiz no encontrado' });
  res.json(quiz);
});

router.post('/:id/check', (req, res) => {
  const quiz = quizzes[req.params.id];
  if (!quiz) return res.status(404).json({ error: 'Quiz no encontrado' });
  const { answers } = req.body;
  let score = 0;
  const results = quiz.questions.map((q, i) => {
    const correct = answers[i] === q.correct;
    if (correct) score++;
    return { question: q.q, userAnswer: q.options[answers[i]], correctAnswer: q.options[q.correct], correct };
  });
  res.json({ score, total: quiz.questions.length, percentage: Math.round((score / quiz.questions.length) * 100), results });
});

module.exports = router;
