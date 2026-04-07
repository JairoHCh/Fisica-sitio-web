"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function EnergiaSim() {
  const [longitud, setLongitud] = useState(200); // en px para el canvas
  const [masa, setMasa] = useState(5);
  const [anguloInicial, setAnguloInicial] = useState(45);

  // Variables físicas reales
  const g = 9.81;
  const L_metros = longitud / 100; // conversión para el cálculo
  
  // Estado de la animación
  let angle = (anguloInicial * Math.PI) / 180;
  let angleV = 0;
  let angleA = 0;

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth > 800 ? 600 : p5.windowWidth - 100, 400).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(10, 15, 25);
    p5.translate(p5.width / 2, 50);

    // Física del péndulo (Ecuación diferencial: α = -(g/L) * sin(θ))
    let force = -(g / L_metros) * p5.sin(angle);
    angleA = force / 20; // factor de suavizado para p5
    angleV += angleA;
    angle += angleV;

    // Fricción mínima para realismo
    angleV *= 0.995;

    // Coordenadas cartesianas del bob
    let x = longitud * p5.sin(angle);
    let y = longitud * p5.cos(angle);

    // Dibujar cuerda
    p5.stroke(100, 116, 139);
    p5.strokeWeight(2);
    p5.line(0, 0, x, y);

    // Dibujar masa
    p5.fill(56, 189, 248);
    p5.noStroke();
    p5.ellipse(x, y, masa * 5, masa * 5);

    // CÁLCULOS DE ENERGÍA PARA EL DASHBOARD VISUAL
    // Altura relativa h = L * (1 - cos(theta))
    const h = L_metros * (1 - Math.cos(angle));
    const v_lineal = angleV * longitud; // aproximación visual
    const Ep = masa * g * h;
    const Ek = 0.5 * masa * Math.pow(angleV * 10, 2); // escalado para visualización

    // Dibujar barras de energía en el canvas
    p5.resetMatrix();
    p5.fill(255);
    p5.textSize(12);
    p5.text("Energía Potencial (U)", 20, 20);
    p5.fill(147, 51, 234); // Violeta
    p5.rect(20, 25, Ep * 10, 10);

    p5.fill(255);
    p5.text("Energía Cinética (K)", 20, 50);
    p5.fill(34, 197, 94); // Verde
    p5.rect(20, 55, Ek * 10, 10);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold">Conservación de la Energía</h2>
        <p className="text-slate-400">Péndulo Simple: Intercambio dinámico entre Ep y Ec.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex gap-6">
            <div className="flex-1">
              <label className="text-xs text-slate-500 uppercase">Longitud (L)</label>
              <input type="range" min="100" max="300" value={longitud} onChange={(e)=>setLongitud(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 uppercase">Ángulo Inicial</label>
              <input type="range" min="10" max="90" value={anguloInicial} onChange={(e)=>setAnguloInicial(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-800">
             <Sketch setup={setup} draw={draw} />
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold border-b border-slate-800 pb-2 text-blue-400">Modelo Matemático</h3>
          <div className="space-y-4 text-sm">
            <p className="text-slate-400 italic">Ecuación del movimiento para ángulos pequeños:</p>
            <BlockMath math={`\frac{d^2\theta}{dt^2} + \frac{g}{L}\theta = 0`} />
            <p className="text-slate-400 italic mt-4">Conservación de Energía:</p>
            <BlockMath math={`E_{mec} = K + U = \text{constante}`} />
            <BlockMath math={`U = mgh = mgL(1 - \cos\theta)`} />
            <BlockMath math={`K = \frac{1}{2}mv^2`} />
          </div>
        </div>
      </div>
    </div>
  );
}