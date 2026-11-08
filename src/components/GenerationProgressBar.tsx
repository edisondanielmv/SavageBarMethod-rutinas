import React, { useEffect, useState } from 'react';
import { Sparkles, Activity, ShieldCheck, Flame } from 'lucide-react';
import { RoutineFocus } from '../types/calisthenics';
import { SavageEmblem } from './SavageEmblem';

interface GenerationProgressBarProps {
  isGenerating: boolean;
  focus: RoutineFocus;
  exerciseCount: number;
}

const STAGES = [
  { threshold: 15, text: 'INICIALIZANDO MOTOR SAVAGE AI & BIOMECÁNICA...' },
  { threshold: 35, text: 'CALIBRANDO ENFOQUE Y CADENCIA DE REPETICIONES...' },
  { threshold: 60, text: 'PROCESANDO ATLETA ENMASCARADO DE CUERPO COMPLETO...' },
  { threshold: 85, text: 'AJUSTANDO ZONAS SEGURAS DE TIKTOK (IPHONE 13 PRO MAX)...' },
  { threshold: 98, text: 'GENERANDO GRÁFICOS DEL ATLETA EN COLOR TOMATE SAVAGE...' },
  { threshold: 100, text: '¡RUTINA TÁCTICA OPTIMIZADA!' },
];

export const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
  isGenerating,
  focus,
  exerciseCount,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      return;
    }

    setProgress(5);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        // Smooth progressive simulation with small random jitter
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 95);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  const currentStage = STAGES.find((s) => progress <= s.threshold) || STAGES[STAGES.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#090b10] border-2 border-[#ff5722] rounded-xl p-6 shadow-[0_0_50px_rgba(255,87,34,0.45)] font-hud select-none overflow-hidden">
        {/* Outer Corner Tech Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff5722]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff5722]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff5722]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff5722]" />

        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#ff5722]/25 blur-3xl pointer-events-none" />

        {/* Header with Savage Logo & Animated Flame */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#ff5722]/60 bg-black/80 flex items-center justify-center shadow-[0_0_12px_rgba(255,87,34,0.5)] overflow-hidden">
              <SavageEmblem size={32} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#ff5722] uppercase font-bold block leading-none">
                SAVAGE ENGINE // v4.2
              </span>
              <h3 className="text-base font-black font-orbitron text-zinc-100 tracking-wide">
                GENERANDO RUTINA CON IA
              </h3>
            </div>
          </div>
          <Flame className="w-5 h-5 text-[#ff5722] animate-bounce" />
        </div>

        {/* Focus & Exercise Count Telemetry */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/60 border border-zinc-800 rounded p-2 text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block">ENFOQUE</span>
            <span className="text-xs font-bold text-[#ff5722] font-teko uppercase tracking-wider">
              {focus.replace('-', ' ')}
            </span>
          </div>
          <div className="bg-black/60 border border-zinc-800 rounded p-2 text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block">ESTACIONES</span>
            <span className="text-xs font-bold text-zinc-200 font-teko uppercase tracking-wider">
              {exerciseCount} EJERCICIOS (MÁX 8)
            </span>
          </div>
        </div>

        {/* Real Progress Bar */}
        <div className="relative mb-2">
          {/* Header row with percentage */}
          <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
            <span className="text-zinc-400 flex items-center gap-1 font-bold">
              <Activity className="w-3 h-3 text-[#ff5722] animate-spin" />
              SINTETIZANDO GRÁFICOS CON IA
            </span>
            <span className="font-orbitron font-black text-[#ff5722] text-sm">
              {progress}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-3 bg-zinc-950 border border-[#ff5722]/40 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#e64a19] via-[#ff5722] to-[#ff7043] rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(255,87,34,0.8)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Scanline light reflection on progress head */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full blur-[1px] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Current Tactical Status Stage Description */}
        <div className="mt-3 py-2 px-3 bg-zinc-950/80 border border-zinc-800/80 rounded text-center">
          <p className="text-[10px] font-mono text-zinc-300 font-semibold uppercase tracking-wider animate-pulse">
            {currentStage.text}
          </p>
        </div>

        {/* Footer Brand Note */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[9px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Atleta Enmascarado HD
          </span>
          <span>Formato iPhone 13 Pro Max</span>
        </div>
      </div>
    </div>
  );
};
