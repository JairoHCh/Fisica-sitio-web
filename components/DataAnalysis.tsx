"use client";
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UploadCloud } from 'lucide-react';

export default function DataAnalysis() {
  const [data, setData] = useState<{x: number, y: number}[] | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        setData(jsonData);
      } catch (error) {
        alert("Error: Asegúrate de subir un archivo JSON válido con formato [{x: 1, y: 2}, ...]");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-slate-200 h-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UploadCloud className="text-blue-500" />
        Análisis de Datos Experimentales
      </h2>

      <div className="mb-8 p-6 border-2 border-dashed border-slate-700 rounded-lg text-center hover:border-blue-500 transition-colors">
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileUpload}
          className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
        />
        <p className="mt-2 text-xs text-slate-500">Sube un archivo JSON con tus medidas del laboratorio</p>
      </div>

      {data ? (
        <div className="h-80 w-full bg-slate-950 p-4 rounded-lg border border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="x" name="Eje X" stroke="#94a3b8" />
              <YAxis type="number" dataKey="y" name="Eje Y" stroke="#94a3b8" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Scatter name="Datos" data={data} fill="#38bdf8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-slate-600 bg-slate-950 rounded-lg border border-slate-800">
          Esperando datos para graficar...
        </div>
      )}
    </div>
  );
}