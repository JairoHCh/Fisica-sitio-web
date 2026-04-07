import Link from 'next/link';
import { Rocket, Zap, FlaskConical, LineChart, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Título */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/50">
              Φ
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">UNI Physics Lab</span>
            </div>
          </Link>

          {/* Enlaces de Navegación (Desktop) */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              <NavLink href="/" icon={<Home size={18} />} label="Inicio" />
              <NavLink href="/cinematica" icon={<Rocket size={18} />} label="Cinemática" />
              <NavLink href="/dinamica" icon={<Zap size={18} />} label="Dinámica" />
              <NavLink href="/energia" icon={<FlaskConical size={18} />} label="Energía" />
              <NavLink href="/analisis" icon={<LineChart size={18} />} label="Análisis" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente auxiliar para los botones del Nav
function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}