"use client";
import { useState } from "react";
import ParabolicSim from "../../components/ParabolicSim";
import PhysicsCalculator from "../../components/PhysicsCalculator";

export default function CinematicaPage() {
  const [velocidad, setVelocidad] = useState(20);
  const [angulo, setAngulo] = useState(45);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Movimiento Parabólico</h1>
        <p className="text-slate-400 mt-2">Ajusta las variables iniciales para observar la trayectoria.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Velocidad Inicial ($v_0$): <span className="text-blue-400">{velocidad} m/s</span>
              </label>
              <input type="range" min="5" max="50" value={velocidad} onChange={(e) => setVelocidad(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Ángulo de Disparo ($\theta$): <span className="text-blue-400">{angulo}°</span>
              </label>
              <input type="range" min="10" max="85" value={angulo} onChange={(e) => setAngulo(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
          </div>
          <ParabolicSim v0={velocidad} angulo={angulo} />
        </div>
        <div className="lg:col-span-1">
          <PhysicsCalculator v0={velocidad} angulo={angulo} />
        </div>
      </div>
    </div>
  );
}