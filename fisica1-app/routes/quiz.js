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
      { q: "El orden de magnitud de 4500 es:", options: ["10³", "10⁴", "10²", "10⁵"], correct: 0 },
      { q: "Si A = (2, -1, 3) y B = (1, 4, -2), ¿cuál es A + B?", options: ["(3, 3, 1)", "(1, 5, -5)", "(3, -5, 1)", "(2, -4, -6)"], correct: 0 },
      { q: "El ángulo que forma el vector (1, √3) con el eje +x es:", options: ["60°", "30°", "45°", "90°"], correct: 0 },
      { q: "¿Cuál de los siguientes es un vector?", options: ["Temperatura", "Desplazamiento", "Tiempo", "Energía"], correct: 1 }
    ]
  },
  "cap2": {
    title: "Capítulo 2: Cinemática",
    questions: [
      { q: "En MRU, la aceleración es:", options: ["Cero", "Constante positiva", "Variable", "Negativa"], correct: 0 },
      { q: "¿Cuál es la ecuación de posición en MRUV?", options: ["x = x₀ + v₀t + ½at²", "x = v·t", "x = x₀ + at", "v = x/t"], correct: 0 },
      { q: "Un objeto cae desde el reposo. ¿Cuánto tarda en caer 45m? (g=10m/s²)", options: ["3 s", "2 s", "4.5 s", "9 s"], correct: 0 },
      { q: "El ángulo de lanzamiento para máximo alcance en movimiento parabólico es:", options: ["45°", "30°", "60°", "90°"], correct: 0 },
      { q: "En movimiento circular uniforme, la aceleración centrípeta apunta:", options: ["Hacia el centro", "Tangencialmente", "Hacia afuera", "Verticalmente"], correct: 0 },
      { q: "Un auto acelera de 0 a 20 m/s en 5 s. Su aceleración es:", options: ["4 m/s²", "100 m/s²", "25 m/s²", "0.25 m/s²"], correct: 0 },
      { q: "La velocidad en la cima de la trayectoria parabólica es:", options: ["Solo la componente horizontal", "Cero", "Solo la componente vertical", "La misma que al inicio"], correct: 0 },
      { q: "¿Qué representa el área bajo una curva v-t?", options: ["Desplazamiento", "Aceleración", "Fuerza", "Energía"], correct: 0 }
    ]
  },
  "cap3": {
    title: "Capítulo 3: Estática",
    questions: [
      { q: "La primera condición de equilibrio establece que ΣF =", options: ["0", "ma", "mg", "P"], correct: 0 },
      { q: "El momento de una fuerza respecto a un punto depende de:", options: ["La fuerza y el brazo de momento", "Solo la magnitud de la fuerza", "Solo la distancia", "La masa del cuerpo"], correct: 0 },
      { q: "El módulo de Young mide:", options: ["Rigidez a la tracción/compresión", "Resistencia al corte", "Resistencia a la compresión volumétrica", "Peso específico"], correct: 0 },
      { q: "Para equilibrio de un cuerpo rígido se necesitan:", options: ["ΣF=0 y ΣM=0", "Solo ΣF=0", "Solo ΣM=0", "ΣF=ma"], correct: 0 },
      { q: "Si un cuerpo rígido es sometido a solo dos fuerzas y está en equilibrio, estas deben ser:", options: ["Iguales, opuestas y colineales", "Iguales y paralelas", "Perpendiculares", "En el mismo sentido"], correct: 0 },
      { q: "Un peso de 100 N cuelga del extremo de una palanca de 2 m. El momento respecto al fulcro es:", options: ["200 N·m", "50 N·m", "100 N·m", "400 N·m"], correct: 0 },
      { q: "La condición ΣMo = 0 se llama:", options: ["Segunda condición de equilibrio", "Primera condición de equilibrio", "Ley de Newton", "Principio de D'Alembert"], correct: 0 }
    ]
  },
  "cap4": {
    title: "Capítulo 4: Dinámica del Punto",
    questions: [
      { q: "La Segunda Ley de Newton establece:", options: ["ΣF = ma", "F = mv", "ΣF = 0", "F = m/a"], correct: 0 },
      { q: "Si la masa de un objeto se duplica y la fuerza neta permanece constante, la aceleración:", options: ["Se reduce a la mitad", "Se duplica", "Permanece igual", "Se cuadruplica"], correct: 0 },
      { q: "¿Cuál es la unidad de fuerza en el SI?", options: ["Newton (N)", "Joule (J)", "Pascal (Pa)", "Watt (W)"], correct: 0 },
      { q: "La fuerza de reacción de la Tercera Ley de Newton actúa sobre:", options: ["El otro cuerpo", "El mismo cuerpo", "El suelo siempre", "El cuerpo de mayor masa"], correct: 0 },
      { q: "Un objeto de 5 kg tiene una aceleración de 3 m/s². La fuerza neta es:", options: ["15 N", "8 N", "1.67 N", "2 N"], correct: 0 },
      { q: "En un ascensor que sube con aceleración a, el peso aparente es:", options: ["m(g+a)", "m(g-a)", "mg", "ma"], correct: 0 },
      { q: "La fuerza normal sobre una superficie horizontal para un objeto de masa m es:", options: ["mg", "0", "m·a", "Depende de la velocidad"], correct: 0 }
    ]
  },
  "cap5": {
    title: "Capítulo 5: Energía y Conservación",
    questions: [
      { q: "La energía cinética de un cuerpo de masa m y velocidad v es:", options: ["½mv²", "mv²", "mgh", "½mv"], correct: 0 },
      { q: "El trabajo realizado por una fuerza conservativa en un ciclo cerrado es:", options: ["0", "Positivo", "Negativo", "Depende de la trayectoria"], correct: 0 },
      { q: "La potencia se define como:", options: ["Trabajo/tiempo", "Fuerza × tiempo", "Energía × tiempo", "Masa × aceleración"], correct: 0 },
      { q: "En una colisión perfectamente elástica se conservan:", options: ["Cantidad de movimiento y energía cinética", "Solo cantidad de movimiento", "Solo energía cinética", "Masa y velocidad"], correct: 0 },
      { q: "La unidad de energía en el SI es:", options: ["Joule (J)", "Newton (N)", "Watt (W)", "Pascal (Pa)"], correct: 0 },
      { q: "Un objeto de 2 kg cae 5 m. Su energía potencial perdida es (g=9.8):", options: ["98 J", "49 J", "19.6 J", "10 J"], correct: 0 },
      { q: "¿Qué es el Teorema Trabajo-Energía?", options: ["Wtotal = ΔEc", "W = Fs", "W = mgh", "Wtotal = Fnet"], correct: 0 },
      { q: "En colisión perfectamente inelástica:", options: ["Los objetos quedan unidos", "Se conserva Ec", "Los objetos rebotan con e=1", "No se conserva el momento"], correct: 0 }
    ]
  },
  "cap7": {
    title: "Capítulo 7: Fluidos",
    questions: [
      { q: "El principio de Arquímedes establece que la fuerza de empuje es igual a:", options: ["El peso del fluido desplazado", "El peso del objeto", "El volumen sumergido", "La densidad del fluido"], correct: 0 },
      { q: "La presión en un fluido estático a profundidad h es:", options: ["P₀ + ρgh", "ρgh", "P₀", "ρg/h"], correct: 0 },
      { q: "El principio de Pascal establece que la presión en un fluido encerrado:", options: ["Se transmite íntegramente a toda la masa", "Disminuye con la profundidad", "Solo actúa verticalmente", "Es proporcional a la velocidad"], correct: 0 },
      { q: "Un objeto flota si su densidad media es:", options: ["Menor que la del fluido", "Mayor que la del fluido", "Igual que la del fluido", "Independiente del fluido"], correct: 0 },
      { q: "La ecuación de continuidad A₁v₁ = A₂v₂ se aplica a:", options: ["Flujo incompresible", "Solo gases", "Solo líquidos en reposo", "Flujo turbulento"], correct: 0 }
    ]
  },
  "cap8": {
    title: "Capítulo 8: Vibraciones y Ondas",
    questions: [
      { q: "En MAS, la aceleración es proporcional a:", options: ["El desplazamiento y opuesta a él", "La velocidad", "La energía", "La masa"], correct: 0 },
      { q: "El período del péndulo simple T = 2π√(L/g) depende de:", options: ["La longitud y g", "La masa del péndulo", "La amplitud", "El material del hilo"], correct: 0 },
      { q: "¿Cuál es la relación entre período T y frecuencia f?", options: ["T = 1/f", "T = f", "T = 2πf", "T = f²"], correct: 0 },
      { q: "La velocidad de propagación de una onda es:", options: ["v = λ·f", "v = λ/f", "v = f/λ", "v = λ + f"], correct: 0 },
      { q: "En el efecto Doppler, cuando la fuente se acerca al observador, la frecuencia percibida:", options: ["Aumenta", "Disminuye", "Permanece igual", "Se anula"], correct: 0 },
      { q: "En MAS, la energía total del sistema es:", options: ["Constante e igual a ½kA²", "Solo cinética", "Solo potencial", "Proporcional a la velocidad"], correct: 0 }
    ]
  },
  "cap9": {
    title: "Capítulo 9: Termodinámica",
    questions: [
      { q: "La primera Ley de la Termodinámica establece:", options: ["ΔU = Q - W", "Q = W", "ΔU = 0 siempre", "W = ΔU + Q"], correct: 0 },
      { q: "En un proceso isotérmico:", options: ["La temperatura es constante", "El calor es cero", "El volumen es constante", "La presión es constante"], correct: 0 },
      { q: "La escala absoluta de temperatura es:", options: ["Kelvin", "Celsius", "Fahrenheit", "Rankine"], correct: 0 },
      { q: "0 K equivale a:", options: ["-273.15 °C", "0 °C", "100 °C", "-100 °C"], correct: 0 },
      { q: "El calor específico del agua es aproximadamente:", options: ["4186 J/(kg·K)", "1000 J/(kg·K)", "100 J/(kg·K)", "9.8 J/(kg·K)"], correct: 0 },
      { q: "La Segunda Ley de la Termodinámica implica que:", options: ["La entropía del universo siempre aumenta", "El calor fluye de frío a caliente", "La energía se crea en procesos", "Toda la energía es convertible en trabajo"], correct: 0 },
      { q: "En un proceso adiabático:", options: ["Q = 0", "W = 0", "ΔU = 0", "T = cte"], correct: 0 }
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
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'Respuestas inválidas' });
  let score = 0;
  const results = quiz.questions.map((q, i) => {
    const correct = answers[i] === q.correct;
    if (correct) score++;
    return { correct, correctAnswer: q.correct, explanation: q.explanation || null };
  });
  res.json({ score, total: quiz.questions.length, percentage: Math.round(score / quiz.questions.length * 100), results });
});

module.exports = router;
