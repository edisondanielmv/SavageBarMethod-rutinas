import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  FileText, 
  Eye, 
  X, 
  Layers, 
  History,
  ShieldCheck
} from 'lucide-react';
import { CalisthenicsRoutine } from '../types/calisthenics';

interface RoutineReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: CalisthenicsRoutine;
  onViewPoster: () => void;
  onOpenDescription: () => void;
  onDownloadPoster: () => void;
  onOpenCarousel?: () => void;
  onViewSaved?: () => void;
}

export const RoutineReadyModal: React.FC<RoutineReadyModalProps> = ({
  isOpen,
  onClose,
  routine,
  onViewPoster,
  onOpenDescription,
  onDownloadPoster,
  onOpenCarousel,
  onViewSaved,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-150 font-sans">
      <div className="relative w-full max-w-lg bg-[#0f131d] border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl select-none overflow-hidden text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 mb-2.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono tracking-wider text-orange-400 uppercase font-semibold block">
            Generación Exitosa
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
            Rutina Calisténica Ensamblada
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Composición 9:16 calibrada para TikTok, Instagram Reels & YouTube Shorts
          </p>
        </div>

        {/* Routine Summary Card */}
        <div className="bg-[#141926] border border-slate-800 rounded-xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Nombre de Rutina</span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {routine.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Estaciones</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-xs font-semibold text-orange-400 font-mono">
                {routine.exercises.length} Ejercicios
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase block">Enfoque</span>
              <span className="text-slate-200 font-medium truncate block">{routine.subtitle}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase block">Estructura</span>
              <span className="text-slate-200 font-medium truncate block">{routine.circuitRule}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Atleta unificado visible de cuerpo completo sin cortes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              <span>Nombres completos, series, repeticiones y cargas legibles</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Main Button: View Poster */}
          <button
            onClick={() => {
              onClose();
              onViewPoster();
            }}
            className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs bg-orange-600 hover:bg-orange-500 text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Póster en Lienzo</span>
          </button>

          <div className="grid grid-cols-3 gap-2">
            {onOpenCarousel && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCarousel();
                }}
                className="py-2 px-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>Carrusel</span>
              </button>
            )}

            {onViewSaved && (
              <button
                onClick={() => {
                  onClose();
                  onViewSaved();
                }}
                className="py-2 px-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Historial</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onDownloadPoster();
              }}
              className="py-2 px-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>PNG 9:16</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
