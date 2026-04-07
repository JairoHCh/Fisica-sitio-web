import Link from 'next/link';
import { Rocket, Zap, FlaskConical, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-5xl text-white shadow-2xl shadow-blue-900/50 mb-8">
        Φ
      </div>
      <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
        Bienvenido al <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Laboratorio Virtual</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-12">
        Plataforma interactiva para el análisis, simulación y comprobación de leyes físicas mediante métodos computacionales.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        <HomeCard href="/cinematica" icon={<Rocket size={24}/>} title="Cinemática" desc="Movimiento Parabólico" color="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/50" />
        <HomeCard href="/dinamica" icon={<Zap size={24}/>} title="Dinámica" desc="Leyes de Newton y Fricción" color="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-500/50" />
        <HomeCard href="/energia" icon={<FlaskConical size={24}/>} title="Energía" desc="Conservación y Péndulos" color="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50" />
        <HomeCard href="/analisis" icon={<LineChart size={24}/>} title="Análisis de Datos" desc="Gráficas y Regresiones" color="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/50" />
      </div>
    </div>
  );
}

function HomeCard({ href, icon, title, desc, color }: any) {
  return (
    <Link href={href} className={`flex items-center gap-4 p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${color}`}>
      <div className="p-3 bg-slate-900/50 rounded-lg">{icon}</div>
      <div className="text-left">
        <h3 className="font-bold text-lg text-slate-200">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </Link>
  );
}