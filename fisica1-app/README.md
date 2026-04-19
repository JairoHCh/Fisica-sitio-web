# ⚛ Física I — Portal del Estudiante

Aplicativo web completo para el curso de Física 1.

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
fisica1-app/
├── server.js           → Servidor Express principal
├── package.json        → Dependencias Node.js
├── routes/
│   ├── blog.js         → API del Blog
│   ├── forum.js        → API del Foro
│   ├── library.js      → API de Biblioteca
│   ├── notes.js        → API de Notas
│   └── quiz.js         → API de Quiz
├── data/               → Base de datos JSON (auto-generada)
├── uploads/            → Archivos subidos por usuarios
└── public/
    ├── index.html      → SPA principal
    ├── css/
    │   └── styles.css  → Estilos retro-futuristas
    └── js/
        ├── api.js          → Cliente API + utilidades
        ├── particles.js    → Sistema de partículas
        ├── app.js          → Router principal
        ├── home.js         → Página de inicio
        ├── blog.js         → Módulo Blog
        ├── lab.js          → Laboratorio Virtual
        ├── library.js      → Biblioteca Virtual
        ├── forum.js        → Foro Estudiantil
        ├── calculator.js   → Calculadora de Fórmulas
        ├── quiz.js         → Quiz de Autoevaluación
        └── notes.js        → Notas personales
```

## ✨ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🏠 **Inicio** | Hero, capítulos del curso, fórmulas esenciales |
| ✦ **Blog** | Publicar y comentar artículos de física |
| ⚗ **Laboratorio** | 5 simulaciones interactivas con canvas |
| ◉ **Biblioteca** | Subir/descargar PDFs y recursos |
| ❋ **Foro** | Preguntas, respuestas y votos |
| ∑ **Calculadora** | 12 fórmulas con cálculo en tiempo real |
| ◆ **Quiz** | Autoevaluación por capítulo con resultados |
| ✎ **Notas** | Bloc de apuntes personal |

## 🛠 Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: JavaScript Vanilla + HTML5 + CSS3
- **Almacenamiento**: JSON files (sin base de datos)
- **Simulaciones**: Canvas 2D API

## 📦 Dependencias

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5",
  "uuid": "^9.0.0"
}
```
