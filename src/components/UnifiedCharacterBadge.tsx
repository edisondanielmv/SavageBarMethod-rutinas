import React, { useState } from 'react';
import { UNIFIED_ATHLETE_CHARACTER } from '../services/aiGraphicService';
import { ShieldCheck, Eye, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SavageEmblem } from './SavageEmblem';

export const UnifiedCharacterBadge: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const character = UNIFIED_ATHLETE_CHARACTER;

  return (
    <>
      {/* Dossier Bar in Generator Controls - Clean, formal, office-grade */}
      <div className="bg-[#10141f] border border-slate-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-slate-200">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-black border border-slate-700 overflow-hidden flex-shrink-0 shadow-sm relative">
            <img
              src="/assets/images/masked_muscle_up_1793886021236.jpg"
              alt="Atleta Savage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top select-none"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wide text-orange-400 uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-orange-500" />
                Atleta de Referencia
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                · Pasamontañas táctico unificado
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-normal truncate">
              {character.codename} <span className="text-slate-400 font-normal text-xs">({character.name})</span>
            </h4>
          </div>
        </div>

        <button
          onClick={() => setIsOpenModal(true)}
          className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-orange-400" />
          <span>Ficha Técnica</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Full Modal Dossier */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#0f131d] border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl font-sans select-none overflow-hidden text-slate-100 flex flex-col gap-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-slate-700 bg-black flex items-center justify-center p-0.5">
                  <SavageEmblem size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-medium text-orange-400 uppercase tracking-wider block">
                    Ficha Técnica Oficial
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Especificación de Atleta Unificado
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpenModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Identificador:</span>
                <span className="text-white font-semibold">{character.codename}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Arquetipo:</span>
                <span className="text-slate-200">{character.archetype}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Consistencia Visual:</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Idéntico en las 8 estaciones del póster y carrusel
                </span>
              </div>
            </div>

            {/* AI Photos Gallery Strip */}
            <div>
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">
                Demostración Biomecánica en Estaciones:
              </span>
              <div className="grid grid-cols-4 gap-2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 bg-black relative">
                  <img src="/assets/images/masked_pullup_test_1793885997917.jpg" alt="Pull-up" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center font-mono py-0.5 text-slate-300">Dominada</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 bg-black relative">
                  <img src="/assets/images/masked_muscle_up_1793886021236.jpg" alt="Muscle-up" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center font-mono py-0.5 text-slate-300">Muscle-Up</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 bg-black relative">
                  <img src="/assets/images/masked_parallel_dips_1793886021648.jpg" alt="Dips" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center font-mono py-0.5 text-slate-300">Fondos</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800 bg-black relative">
                  <img src="/assets/images/masked_freestanding_hspu_1793886020985.jpg" alt="HSPU" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center font-mono py-0.5 text-slate-300">Pino HSPU</span>
                </div>
              </div>
            </div>

            {/* Anatomy Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-2.5 space-y-1">
                <span className="text-orange-400 font-semibold block text-[11px]">
                  Máscara y Rasgos
                </span>
                <p className="text-slate-300">{character.maskAndFace.type}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{character.maskAndFace.eyes}</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-2.5 space-y-1">
                <span className="text-orange-400 font-semibold block text-[11px]">
                  Anatomía Muscular
                </span>
                <p className="text-slate-300">{character.anatomy.physique}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{character.anatomy.chest}</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-2.5 space-y-1">
                <span className="text-orange-400 font-semibold block text-[11px]">
                  Indumentaria Táctica
                </span>
                <p className="text-slate-300">{character.outfit.upperBody}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{character.outfit.trousers}</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-2.5 space-y-1">
                <span className="text-orange-400 font-semibold block text-[11px]">
                  Encuadre y Fondo
                </span>
                <p className="text-slate-300">Fondo de estudio neutro profundo (#06070a) con iluminación de silueta.</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Cuerpo completo visible sin cortes de extremidades.</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs transition-colors"
            >
              Cerrar Especificaciones
            </button>
          </div>
        </div>
      )}
    </>
  );
};
