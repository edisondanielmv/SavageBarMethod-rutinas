import React, { useState } from 'react';
import { Exercise, HudTheme } from '../types/calisthenics';
import { MaskedAthleteIllustration } from './MaskedAthleteIllustration';
import { X, Volume2, CheckCircle2, TrendingUp, AlertTriangle, Dumbbell, ShieldCheck, Edit3 } from 'lucide-react';

interface ExerciseModalProps {
  exercise: Exercise | null;
  theme: HudTheme;
  isCompleted: boolean;
  onClose: () => void;
  onToggleCompleted: (id: string) => void;
  onUpdateExercise: (updated: Exercise) => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  theme,
  isCompleted,
  onClose,
  onToggleCompleted,
  onUpdateExercise,
}) => {
  if (!exercise) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedSets, setEditedSets] = useState(exercise.sets);
  const [editedReps, setEditedReps] = useState(exercise.reps);
  const [editedLoad, setEditedLoad] = useState(exercise.load);

  // Audio coaching reading technical cues
  const speakTechnicalCue = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${exercise.name}. ${exercise.technicalCue}. Progression: ${exercise.progressionTip}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSaveEdit = () => {
    onUpdateExercise({
      ...exercise,
      sets: editedSets,
      reps: editedReps,
      load: editedLoad,
    });
    setIsEditing(false);
  };

  const themeColors = {
    orange: 'text-[#ff5722] border-[#ff5722] bg-[#ff5722]/10',
    green: 'text-emerald-400 border-emerald-400 bg-emerald-500/10',
    cyan: 'text-cyan-400 border-cyan-400 bg-cyan-500/10',
    gold: 'text-amber-400 border-amber-400 bg-amber-500/10',
  }[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border-2 border-zinc-700 rounded-2xl shadow-2xl overflow-hidden font-hud text-zinc-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/70">
          <div className="flex items-center gap-2.5">
            <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${themeColors}`}>
              EXERCISE #{exercise.order < 10 ? `0${exercise.order}` : exercise.order}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              {exercise.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={speakTechnicalCue}
              title="Listen to technical audio coaching"
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual & Title Hero */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            {/* Muscular Masked Athlete Illustration */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-zinc-950 border border-zinc-800 p-2 flex-shrink-0 flex items-center justify-center shadow-inner">
              <MaskedAthleteIllustration
                pose={exercise.illustrationKey || exercise.name}
                theme={theme}
                load={exercise.load}
                category={exercise.category}
                imageUrl={exercise.imageUrl}
                svgGraphic={exercise.aiGraphicSvg}
                className="w-full h-full"
              />
            </div>

            {/* Exercise Overview */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                SAVAGE BAR METHOD • ADVANCED EXERCISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-orbitron text-white leading-tight">
                {exercise.name}
              </h2>
              <p className="text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Key muscles: </span>
                {exercise.muscleTarget}
              </p>

              {/* Sets & Reps pill container */}
              {!isEditing ? (
                <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-mono font-bold text-zinc-200">
                    {exercise.sets}
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-mono font-bold text-orange-400">
                    {exercise.reps}
                  </span>
                  {exercise.load && (
                    <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" />
                      {exercise.load}
                    </span>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs flex items-center gap-1 px-2"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
              ) : (
                <div className="pt-2 space-y-2 bg-zinc-950 p-3 rounded-lg border border-zinc-700">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-zinc-400">Sets</label>
                      <input
                        value={editedSets}
                        onChange={(e) => setEditedSets(e.target.value)}
                        className="w-full px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-zinc-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400">Reps</label>
                      <input
                        value={editedReps}
                        onChange={(e) => setEditedReps(e.target.value)}
                        className="w-full px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-zinc-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400">Load / Weight</label>
                      <input
                        value={editedLoad}
                        onChange={(e) => setEditedLoad(e.target.value)}
                        className="w-full px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-zinc-200 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-2 py-1 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technical Execution Breakdown (Brief Technical Description) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-200 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Technical Execution & Biomechanics (Proper Form)</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300 leading-relaxed">
              <p>{exercise.technicalCue}</p>
            </div>
          </div>

          {/* Session Progression Guidance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-200 uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span>Instructions for Session Progression</span>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/20 to-zinc-900/60 border border-orange-500/20 text-sm text-zinc-300 leading-relaxed">
              <p>{exercise.progressionTip}</p>
            </div>
          </div>

          {/* Form Rules & Common Mistakes */}
          <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-400">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-200 block mb-0.5">Golden Savage Rule:</span>
              Strict form always comes before ego. If you lose body alignment or joint lockout, terminate the set and apply the prescribed regression.
            </div>
          </div>
        </div>

        {/* Modal Footer with Completion Toggle */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <button
            onClick={() => onToggleCompleted(exercise.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-black hover:bg-emerald-500 shadow-lg'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'EXERCISE COMPLETED ✓' : 'MARK AS COMPLETED'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs sm:text-sm font-semibold text-zinc-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
