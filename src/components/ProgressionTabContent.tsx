import React from 'react';
import { CalisthenicsRoutine } from '../types/calisthenics';
import { TrendingUp, Flame, Trophy, Share2, CheckCircle2, Download } from 'lucide-react';

interface ProgressionTabContentProps {
  routine: CalisthenicsRoutine;
  onOpenDescriptionModal: () => void;
}

export const ProgressionTabContent: React.FC<ProgressionTabContentProps> = ({
  routine,
  onOpenDescriptionModal,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 font-sans text-slate-100 animate-fadeIn">
      {/* Blueprint Header */}
      <div className="bg-[#10141f] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-slate-800 text-orange-400 border border-slate-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Protocolo de Progresión & Normas de Publicación
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sobrecarga progresiva estructurada sin estancamiento y especificaciones para plataformas sociales
            </p>
          </div>
        </div>

        {/* 6-Week Overload Steps */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Plan de Sobrecarga Progresiva (6 Semanas): {routine.title}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {routine.globalProgressionGuide.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#141926] border border-slate-800 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-md bg-slate-800 text-orange-400 font-mono font-semibold text-xs flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calisthenics Skill Hierarchy */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Jerarquía de Habilidades Calisténicas (Estándares Savage)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">Nivel Mundial</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>1. Full Planche</span>
                <span className="font-mono text-[10px] text-slate-500">0.001%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Potencia escapular máxima, protracción pura y torque con codos bloqueados.
              </p>
            </div>

            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>2. One-Arm Pull-Up</span>
                <span className="font-mono text-[10px] text-slate-500">0.01%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fuerza de tracción unilateral estricta sin balanceo ni impulso.
              </p>
            </div>

            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>3. Human Flag</span>
                <span className="font-mono text-[10px] text-slate-500">0.1%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Control de la cadena lateral oblicua y equilibrio simétrico empuje-tracción.
              </p>
            </div>

            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>4. Front Lever</span>
                <span className="font-mono text-[10px] text-slate-500">0.5%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fuerza isométrica dorsal horizontal y activación rígida de core posterior.
              </p>
            </div>

            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>5. Handstand Push-Up</span>
                <span className="font-mono text-[10px] text-slate-500">0.5%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Empuje vertical libre en pino con propiocepción y control total del equilibrio.
              </p>
            </div>

            <div className="p-3 bg-[#141926] rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>6. Bar Muscle-Up</span>
                <span className="font-mono text-[10px] text-slate-500">1.0%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Transición explosiva desde tracción hollow body hasta fondo en barra recta.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Optimization Rules */}
        <div className="p-4 rounded-xl bg-[#141926] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-orange-500" />
              <span>Pautas de Publicación en Redes Sociales (TikTok, Reels, Shorts)</span>
            </h4>
            <button
              onClick={onOpenDescriptionModal}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              Ver Texto & Hashtags
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs">Margen Superior Seguro (17%)</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  El título de la rutina y las primeras estaciones nunca quedan obstruidos por la barra de búsqueda de TikTok o indicadores del dispositivo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs">Margen Inferior Seguro (20%)</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  El pie de la composición tiene un pedestal de separación para evitar que la descripción y los botones nativos tapen los ejercicios 07 y 08.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs">Resolución Full HD 1080×1920</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  Exportación de póster 9:16 nativo con pixel ratio 2.4 para máxima nitidez en pantallas móviles de alta densidad.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs">Formato Carrusel en Archivo .ZIP</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  Publicar las 10 diapositivas individuales incrementa significativamente el tiempo de permanencia y las métricas de interacción.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Source Code Backup */}
        <div className="p-4 rounded-xl bg-[#141926] border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                <span>Copia de Seguridad y Repositorio</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                  Sincronizado
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Descarga una copia comprimida del código fuente completo para tu archivo personal
              </p>
            </div>

            <a
              href="/api/download-project-zip"
              download="savage-bar-method-source-backup.zip"
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>Descargar Proyecto (.ZIP)</span>
            </a>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed space-y-1">
            <p>
              Tu repositorio remoto se encuentra configurado en <code className="text-slate-300 font-mono">github.com/edisondanielmv/SavageBarMethod-rutinas.git</code>.
            </p>
            <p className="text-[11px] text-slate-500">
              Si utilizas navegadores móviles con bloqueo de ventanas emergentes (como Brave en iOS), puedes descargar el archivo .ZIP de respaldo directamente con el botón anterior.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
