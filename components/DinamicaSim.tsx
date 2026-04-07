"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

// Importamos p5 dinámicamente para evitar problemas con Next.js SSR
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function DinamicaSim() {
  const [angulo, setAngulo] = useState(30);
  const [masa, setMasa] = useState(10);
  const [muK, setMuK] = useState(0.2); // Coeficiente de fricción cinética

  const g = 9.81;
  const anguloRad = (angulo * Math.PI) / 180;
  
  // Cálculos físicos
  const peso = masa * g;
  const pesoX = peso * Math.sin(anguloRad);
  const pesoY = peso * Math.cos(anguloRad);
  const normal = pesoY;
  const friccion = muK * normal;
  
  // Si la fuerza en X es mayor que la fricción, se mueve. Si no, aceleración es 0.
  const fuerzaNeta = pesoX > friccion ? pesoX - friccion : 0;
  const aceleracion = fuerzaNeta / masa;

  // Variables para la simulación visual
  let t = 0;

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth > 800 ? 600 : p5.windowWidth - 100, 350).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(15, 23, 42); // slate-900
    
    // Configurar el origen en la esquina inferior izquierda
    p5.translate(50, 300);
    
    // Dibujar el plano inclinado
    p5.stroke(148, 163, 184); // slate-400
    p5.strokeWeight(2);
    p5.fill(30, 41, 59); // slate-800
    
    const base = 450;
    const altura = base * p5.tan((angulo * p5.PI) / 180);
    p5.triangle(0, 0, base, 0, 0, -altura);

    // Cinemática del bloque deslizante (x = v0*t + 0.5*a*t^2)
    // Aceleración visual escalada
    const x = 0.5 * aceleracion * p5.pow(t, 2) * 10; 
    
    // Rotar el sistema de coordenadas al ángulo del plano para dibujar el bloque fácilmente
    p5.rotate((angulo * p5.PI) / 180);
    
    const size = 40;
    // Si el bloque llega al final del plano, reiniciamos el tiempo
    const hipotenusa = base / p5.cos((angulo * p5.PI) / 180);
    if (x > hipotenusa - size || aceleracion === 0) {
      if (aceleracion > 0) t = 0; 
    }

    // Dibujar el bloque
    p5.translate(x, -size);
    p5.fill(248, 113, 113); // red-400
    p5.noStroke();
    p5.rect(0, 0, size, size, 4);

    // Dibujar Vectores de Fuerza (solo visuales)
    p5.strokeWeight(2);
    const centroX = size / 2;
    const centroY = size / 2;

    // Vector Normal (hacia arriba perpendicular al plano)
    p5.stroke(56, 189, 248); // sky-400
    p5.line(centroX, centroY, centroX, centroY - 50);
    
    // Vector Fricción (hacia atrás paralelo al plano)
    if (fuerzaNeta > 0) {
      p5.stroke(250, 204, 21); // yellow-400
      p5.line(centroX, centroY, centroX - 40, centroY);
    }

    // Deshacer la rotación para dibujar el vector del Peso (hacia abajo real)
    p5.rotate(-(angulo * p5.PI) / 180);
    p5.stroke(167, 139, 250); // violet-400
    p5.line(centroX, centroY, centroX, centroY + 60);

    // Incrementar tiempo solo si hay aceleración
    if (aceleracion > 0) t += 0.05;
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Plano Inclinado con Rozamiento</h2>
        <p className="text-slate-400 mt-2">Segunda Ley de Newton: Observa cómo las fuerzas interactúan sobre una masa en declive.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controles y Simulación */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Ángulo ($\theta$): <span className="text-blue-400">{angulo}°</span>
              </label>
              <input 
                type="range" min="10" max="75" value={angulo} 
                onChange={(e) => setAngulo(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Masa ($m$): <span className="text-blue-400">{masa} kg</span>
              </label>
              <input 
                type="range" min="1" max="50" value={masa} 
                onChange={(e) => setMasa(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Fricción ($\mu_k$): <span className="text-blue-400">{muK}</span>
              </label>
              <input 
                type="range" min="0" max="1" step="0.05" value={muK} 
                onChange={(e) => setMuK(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700 w-full flex justify-center bg-slate-900">
            <Sketch setup={setup} draw={draw} />
          </div>
        </div>

        {/* Desarrollo Analítico */}
        <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700 text-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-slate-700 pb-2">Resolución Paso a Paso</h3>
          
          <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
            <div>
              <p className="text-sm text-slate-400 mb-2">1. Descomposición del Peso ($W = mg$):</p>
              <BlockMath math={`W_x = mg \\sin(\\theta) = ${pesoX.toFixed(2)} \\text{ N}`} />
              <BlockMath math={`W_y = mg \\cos(\\theta) = ${pesoY.toFixed(2)} \\text{ N}`} />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">2. Fuerza Normal ($N$):</p>
              <p className="text-xs text-slate-500 mb-1">Como no hay movimiento en el eje Y perpendicular al plano:</p>
              <BlockMath math={`N = W_y = ${normal.toFixed(2)} \\text{ N}`} />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">3. Fuerza de Fricción ($f_k$):</p>
              <BlockMath math={`f_k = \\mu_k \\cdot N = ${muK} \\cdot ${normal.toFixed(2)} = ${friccion.toFixed(2)} \\text{ N}`} />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">4. Aceleración del sistema ($a$):</p>
              <BlockMath math={`\\sum F_x = m \\cdot a`} />
              <BlockMath math={`W_x - f_k = m \\cdot a`} />
              {fuerzaNeta > 0 ? (
                 <BlockMath math={`a = \\frac{${pesoX.toFixed(2)} - ${friccion.toFixed(2)}}{${masa}} = ${aceleracion.toFixed(2)} \\text{ m/s}^2`} />
              ) : (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded text-sm text-red-300 text-center">
                  La fuerza de fricción es mayor o igual a la componente del peso en X. <strong>El bloque no se mueve ($a = 0$).</strong>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}