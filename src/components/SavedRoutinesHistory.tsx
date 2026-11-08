import React, { useState } from 'react';
import { 
  History, 
  RotateCcw, 
  Check, 
  Layers, 
  Trash2, 
  Clock, 
  PlusCircle, 
  Smartphone, 
  X,
  FileText
} from 'lucide-react';
import { CalisthenicsRoutine } from '../types/calisthenics';

interface SavedRoutinesHistoryProps {
  savedRoutines: CalisthenicsRoutine[];
  currentRoutineId: string;
  onSelectRoutine: (routine: CalisthenicsRoutine) => void;
  onOpenCarousel: (routine?: CalisthenicsRoutine) => void;
  onDeleteRoutine: (routineId: string) => void;
  onClearAllRoutines?: () => void;
  onRestorePresets?: () => void;
  onGoToGenerator: () => void;
}

export const SavedRoutinesHistory: React.FC<SavedRoutinesHistoryProps> = ({
  savedRoutines,
  currentRoutineId,
  onSelectRoutine,
  onOpenCarousel,
  onDeleteRoutine,
  onClearAllRoutines,
  onRestorePresets,
  onGoToGenerator,
}) => {
  const maxSlots = 5;
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState<boolean>(false);

  const handleDeleteClick = (id: string) => {
    onDeleteRoutine(id);
    setConfirmDeleteId(null);
  };

  const handleClearAllConfirm = () => {
    if (onClearAllRoutines) {
      onClearAllRoutines();
    }
    setConfirmClearAll(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 font-sans text-slate-100">
      
      {/* Main Header Container */}
      <div className="bg-[#10141f] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-orange-400 border border-slate-700 flex-shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Archivo de Rutinas Guardadas
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-orange-400 font-mono font-medium">
                  {savedRoutines.length} de {maxSlots} ranuras ocupadas
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Historial persistente de tus últimos 5 entrenamientos generados. Puedes cargarlos en el lienzo póster, inspeccionar sus diapositivas o eliminarlos individualmente.
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            {savedRoutines.length > 0 && onClearAllRoutines && (
              <>
                {confirmClearAll ? (
                  <div className="flex items-center gap-1.5 p-1 bg-rose-950/40 border border-rose-800 rounded-lg animate-fadeIn">
                    <span className="text-xs text-rose-300 font-medium px-2">
                      ¿Borrar todas ({savedRoutines.length})?
                    </span>
                    <button
                      onClick={handleClearAllConfirm}
                      className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors"
                    >
                      Sí, vaciar
                    </button>
                    <button
                      onClick={() => setConfirmClearAll(false)}
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClearAll(true)}
                    title="Vaciar todo el historial de rutinas"
                    className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-rose-400 font-medium text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar Historial</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Empty State */}
        {savedRoutines.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <History className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">
                No hay rutinas guardadas en memoria
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                El historial se encuentra vacío. Al generar una nueva rutina con IA, se guardará aquí de forma automática.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={onGoToGenerator}
                className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs transition-colors"
              >
                Ir al Generador
              </button>

              {onRestorePresets && (
                <button
                  onClick={onRestorePresets}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Restaurar Ejemplos Oficiales</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* List of Saved Routines */
          <div className="space-y-3 pt-4">
            {savedRoutines.slice(0, maxSlots).map((routine, idx) => {
              const isActive = routine.id === currentRoutineId || routine.title === currentRoutineId;
              const isLatest = idx === 0;
              const isConfirmingDelete = confirmDeleteId === routine.id;

              return (
                <div
                  key={routine.id || idx}
                  className={`rounded-xl border transition-colors p-4 sm:p-5 relative ${
                    isActive
                      ? 'border-orange-500/60 bg-[#161c2b]'
                      : 'border-slate-800 bg-[#121622] hover:border-slate-700'
                  }`}
                >
                  {/* Card Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isLatest
                          ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isLatest ? 'Más reciente (#1)' : `Ranura #${idx + 1}`}
                      </span>

                      {routine.createdAt && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{new Date(routine.createdAt).toLocaleDateString()} {new Date(routine.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                          <Check className="w-3.5 h-3.5" />
                          <span>Activa en el póster</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Routine Information Row */}
                  <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                          {routine.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 font-medium">
                          {routine.exercises?.length || 8} estaciones
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {routine.subtitle}
                      </p>
                    </div>

                    {/* Action Buttons for this card */}
                    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onSelectRoutine(routine)}
                        disabled={isActive}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                          isActive
                            ? 'bg-slate-800 text-slate-500 cursor-default border border-slate-700'
                            : 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>{isActive ? 'En Visualización' : 'Cargar en Lienzo'}</span>
                      </button>

                      <button
                        onClick={() => {
                          onSelectRoutine(routine);
                          setTimeout(() => onOpenCarousel(routine), 60);
                        }}
                        title="Ver diapositivas de esta rutina"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-orange-400" />
                        <span>Ver Carrusel</span>
                      </button>

                      {/* Delete Action with In-line confirmation */}
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1 p-1 bg-rose-950/40 border border-rose-800 rounded-lg animate-fadeIn">
                          <span className="text-[11px] text-rose-300 px-1 font-medium">
                            ¿Eliminar?
                          </span>
                          <button
                            onClick={() => handleDeleteClick(routine.id)}
                            className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-medium"
                          >
                            Sí
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(routine.id)}
                          title="Eliminar esta rutina del historial"
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Exercises Grid Summary */}
                  <div className="pt-3 border-t border-slate-800/60">
                    <span className="text-[11px] font-medium text-slate-400 block mb-2">
                      Estaciones incluidas en la rutina:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {routine.exercises?.map((ex, exIdx) => (
                        <div
                          key={ex.id || exIdx}
                          className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-1.5 text-xs"
                        >
                          <div className="min-w-0 flex items-center gap-1.5">
                            <span className="text-[10px] text-orange-400 font-mono font-semibold">
                              {exIdx + 1}.
                            </span>
                            <span className="text-slate-200 truncate text-[11px]">
                              {ex.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                            {ex.sets?.replace(/Sets:\s*/i, '')}×{ex.reps?.replace(/Reps:\s*/i, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
