"use client";
import React from "react";
import dynamic from "next/dynamic";

// Importación dinámica de react-p5 para evitar errores de SSR en Next.js
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

interface SimProps {
  v0: number;
  angulo: number;
}

export default function ParabolicSim({ v0, angulo }: SimProps) {
  let t = 0;
  const g = 9.81;
  const escala = 4; // Para que los metros encajen bien en el canvas

  const setup = (p5: any, canvasParentRef: Element) => {
    // Canvas responsivo al contenedor
    p5.createCanvas(p5.windowWidth > 800 ? 600 : p5.windowWidth - 100, 350).parent(canvasParentRef);
  };

  const draw = (p5: any) => {
    p5.background(15, 23, 42); // Fondo oscuro (Tailwind slate-900)
    
    const rad = (p5.PI / 180) * angulo;
    const vx = v0 * p5.cos(rad);
    const vy = v0 * p5.sin(rad);

    // Dibujar suelo
    p5.stroke(71, 85, 105);
    p5.strokeWeight(2);
    p5.line(0, 300, p5.width, 300);

    // Cinemática con Euler
    const x = vx * t;
    const y = (vy * t) - (0.5 * g * t * t);

    // Dibujar proyectil si está por encima del suelo
    if (y >= 0) {
      p5.noStroke();
      p5.fill(56, 189, 248); // Azul claro
      // Invertimos Y porque en p5.js el eje Y crece hacia abajo
      p5.ellipse(20 + (x * escala), 300 - (y * escala), 15, 15);
      t += 0.05; // Incremento de tiempo
    } else {
      // Reiniciar simulación automáticamente al tocar el suelo
      t = 0; 
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 w-full flex justify-center bg-slate-900">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}