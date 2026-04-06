"use client";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { calcularTrayectoria, PHYSICS_CONSTANTS } from '../lib/physics';

interface CalcProps {
  v0: number;
  angulo: number;
}

export default function PhysicsCalculator({ v0, angulo }: CalcProps) {
  const resultados = calcularTrayectoria(v0, angulo);
  const { g } = PHYSICS_CONSTANTS;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-slate-200">
      <h3 className="text-xl font-semibold mb-4 text-white">Desarrollo Analítico</h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-400 mb-2">1. Descomposición de la velocidad:</p>
          <BlockMath math={`v_{0x} = v_0 \\cos(\\theta) = ${v0} \\cos(${angulo}^\\circ) = ${resultados.vx.toFixed(2)} \\text{ m/s}`} />
          <BlockMath math={`v_{0y} = v_0 \\sin(\\theta) = ${v0} \\sin(${angulo}^\\circ) = ${resultados.vy.toFixed(2)} \\text{ m/s}`} />
        </div>

        <div>
          <p className="text-sm text-slate-400 mb-2">2. Tiempo total de vuelo ($t$):</p>
          <BlockMath math={`t = \\frac{2 v_{0y}}{g} = \\frac{2(${resultados.vy.toFixed(2)})}{${g}} = ${resultados.tiempoVuelo.toFixed(2)} \\text{ s}`} />
        </div>

        <div>
          <p className="text-sm text-slate-400 mb-2">3. Alcance máximo horizontal ($R$):</p>
          <BlockMath math={`R = v_{0x} \\cdot t = ${resultados.vx.toFixed(2)} \\cdot ${resultados.tiempoVuelo.toFixed(2)} = ${resultados.alcanceMax.toFixed(2)} \\text{ m}`} />
        </div>
      </div>
    </div>
  );
}