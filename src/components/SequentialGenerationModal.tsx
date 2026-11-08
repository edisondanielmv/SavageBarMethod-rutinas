import React, { useEffect, useState } from 'react';
import { CalisthenicsRoutine, Exercise, RoutineFocus } from '../types/calisthenics';
import { MaskedAthleteIllustration } from './MaskedAthleteIllustration';
import { SavageEmblem } from './SavageEmblem';
import { Flame, CheckCircle2, Dumbbell, Sparkles, Layers, ShieldCheck, Cpu, UserCheck } from 'lucide-react';
import { UNIFIED_ATHLETE_CHARACTER } from '../services/aiGraphicService';

interface SequentialGenerationModalProps {
  isOpen: boolean;
  focus: RoutineFocus;
  exercisesToGenerate: Exercise[];
  currentStationIndex: number;
  completedStationIds: string[];
  isAssemblingMatrix: boolean;
  onCancel?: () => void;
}

export const SequentialGenerationModal: React.FC<SequentialGenerationModalProps> = ({
  isOpen,
  focus,
  exercisesToGenerate,
  currentStationIndex,
  completedStationIds,
  isAssemblingMatrix,
}) => {
  const [pulseScan, setPulseScan] = useState(0);
  const [subStep, setSubStep] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPulseScan((p) => (p + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setSubStep(0);
    const t1 = setTimeout(() => setSubStep(1), 450);
    const t2 = setTimeout(() => setSubStep(2), 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen, currentStationIndex]);

  const stepMessages = [
    '⚡ 1/3 Generating exercise image with AI...',
    '🎭 2/3 Rendering masked muscular athlete executing movement...',
    '🔥 3/3 Calibrating 100% complete framing for 9:16 routine matrix...',
  ];

  if (!isOpen) return null;

  const currentExercise = exercisesToGenerate[currentStationIndex] || exercisesToGenerate[0];
  const totalCount = exercisesToGenerate.length || 8;
  const progressPercent = isAssemblingMatrix
    ? 100
    : Math.round(((completedStationIds.length + 0.5) / totalCount) * 100);

  const focusLabels: Record<RoutineFocus, string> = {
    'pecho': 'CHEST & PUSH',
    'espalda': 'BACK & PULL',
    'brazos': 'ARMS (TRICEPS/BICEPS)',
    'abdomen': 'CORE & ABS',
    'piernas': 'LEGS & POWER',
    'estaticos': 'STATIC SKILLS',
    'todo-el-cuerpo': 'FULL BODY',
    'circuito-resistencia': 'ENDURANCE CIRCUIT',
    'ganadora-peso-lastre': 'MASS BUILDER (100% WEIGHTED)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090b10] border-2 border-[#ff5722] rounded-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(255,87,34,0.45)] font-hud select-none overflow-hidden text-zinc-100 flex flex-col gap-4">
        
        {/* Sci-Fi Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff5722]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff5722]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff5722]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff5722]" />

        {/* Ambient Top Glow in Tomato */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#ff5722]/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#ff5722]/80 bg-black/90 flex items-center justify-center shadow-[0_0_15px_rgba(255,87,34,0.6)] overflow-hidden flex-shrink-0">
              <SavageEmblem size={36} />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#ff5722] uppercase font-bold block leading-none">
                SAVAGE AI STUDIO // SEQUENTIAL PIPELINE
              </span>
              <h2 className="text-sm sm:text-base font-black font-orbitron text-white tracking-wide mt-0.5">
                SYNTHESIZING EXERCISE IMAGES
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ff5722]/15 border border-[#ff5722]/60 text-[#ff5722] text-xs font-mono font-bold shadow-sm">
            <Flame className="w-4 h-4 animate-bounce" />
            <span className="font-orbitron font-black">{completedStationIds.length}/{totalCount} READY</span>
          </div>
        </div>

        {/* Declared Character Anchor Strip */}
        <div className="flex items-center justify-between bg-[#0e1017] border border-[#ff5722]/40 rounded-lg px-3 py-1.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#ff5722]" />
            <span className="text-[10px] text-zinc-400 uppercase font-bold">LOCKED CHARACTER:</span>
            <span className="text-white font-black font-orbitron text-[11px] tracking-wide">
              {UNIFIED_ATHLETE_CHARACTER.codename}
            </span>
          </div>
          <span className="text-[9px] text-emerald-400 font-bold hidden sm:inline">
            ✓ Consistent anatomy across all {totalCount} stations
          </span>
        </div>

        {/* Focus & Telemetry Strip */}
        <div className="flex items-center justify-between bg-black/60 border border-zinc-800/90 rounded-lg px-3 py-1.5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase text-[10px]">SELECTED FOCUS:</span>
            <span className="text-[#ff5722] font-black uppercase">{focusLabels[focus] || focus}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-[#ff5722] animate-spin" />
            <span>CALIBRATING {totalCount}-STATION MATRIX</span>
          </div>
        </div>

        {/* Center Stage: Active Exercise Generation Display */}
        {!isAssemblingMatrix && currentExercise ? (
          <div className="bg-zinc-950/90 border border-[#ff5722]/50 rounded-xl p-3 sm:p-4 relative overflow-hidden shadow-lg">
            
            {/* Scanline Sweep animation */}
            <div
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff5722]/80 to-transparent pointer-events-none z-20"
              style={{ top: `${pulseScan}%` }}
            />

            {/* Station Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#ff5722] text-black font-black font-orbitron text-xs rounded">
                  STATION {currentStationIndex + 1 < 10 ? `0${currentStationIndex + 1}` : currentStationIndex + 1} OF {totalCount < 10 ? `0${totalCount}` : totalCount}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  {currentExercise.category}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#ff5722] font-bold animate-pulse">
                {stepMessages[subStep] || '• GENERATING ATHLETE IMAGE WITH AI...'}
              </span>
            </div>

            {/* Exercise Title */}
            <h3 className="text-lg sm:text-xl font-black text-white font-orbitron uppercase tracking-wide leading-tight">
              {currentExercise.name}
            </h3>

            {/* Details Row: Sets, Reps, Load, Biomechanics */}
            <div className="flex items-center gap-2 mt-1 mb-3 text-xs font-mono text-zinc-300 flex-wrap">
              <span className="text-white font-bold">{currentExercise.sets}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#ff5722] font-black">{currentExercise.reps}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Dumbbell className="w-3 h-3" />
                {currentExercise.load}
              </span>
            </div>

            {/* Athlete Image Box: High Visibility, unclipped 2:1 ratio render */}
            <div className="relative w-full h-36 sm:h-44 rounded-lg bg-[#07080c] border border-[#ff5722]/60 overflow-hidden flex items-center justify-center shadow-inner">
              <MaskedAthleteIllustration
                pose={currentExercise.illustrationKey || currentExercise.name}
                theme="orange"
                load={currentExercise.load}
                category={currentExercise.category}
                imageUrl={currentExercise.imageUrl}
                svgGraphic={currentExercise.aiGraphicSvg}
                className="w-full h-full"
              />

              {/* Status Overlay at bottom of athlete box */}
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-zinc-800 text-[10px] font-mono">
                <span className="text-zinc-300 truncate max-w-[280px]">
                  {currentExercise.technicalCue || 'Strict technical execution with tight hollow body posture.'}
                </span>
                <span className="text-[#ff5722] font-bold shrink-0">100% VISIBILITY</span>
              </div>
            </div>
          </div>
        ) : (
          /* Matrix Assembly Phase */
          <div className="bg-zinc-950/95 border-2 border-[#ff5722] rounded-xl p-6 text-center space-y-3 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#ff5722]/20 border-2 border-[#ff5722] flex items-center justify-center text-[#ff5722] animate-pulse shadow-[0_0_30px_rgba(255,87,34,0.7)]">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-black font-orbitron text-white uppercase tracking-wider">
              ASSEMBLING FULL ROUTINE MATRIX
            </h3>
            <p className="text-xs font-mono text-zinc-300 max-w-md mx-auto">
              Calibrating and fitting each of the 8 masked athlete images into matrix coordinates in vertical 9:16 format (1080x1920)...
            </p>
          </div>
        )}

        {/* 8-Slot Tactical Matrix Visualizer (2 Columns x 4 Rows) */}
        <div>
          <div className="flex items-center justify-between mb-1 text-[10px] font-mono text-zinc-400">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ff5722]" />
              8-SLOT TACTICAL MATRIX (REAL-TIME PLACEMENT):
            </span>
            <span>{completedStationIds.length}/8 GENERATED</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 bg-black/70 border border-zinc-800 rounded-lg p-2">
            {exercisesToGenerate.map((ex, idx) => {
              const isFinished = completedStationIds.includes(ex.id) || idx < currentStationIndex;
              const isCurrent = idx === currentStationIndex && !isAssemblingMatrix;

              return (
                <div
                  key={ex.id || idx}
                  className={`relative rounded border p-1 text-center transition-all ${
                    isFinished
                      ? 'border-emerald-500/80 bg-emerald-950/30'
                      : isCurrent
                      ? 'border-[#ff5722] bg-[#ff5722]/20 shadow-[0_0_12px_rgba(255,87,34,0.6)] animate-pulse'
                      : 'border-zinc-800 bg-zinc-950/60 opacity-60'
                  }`}
                >
                  <div className="text-[8px] font-orbitron font-bold text-zinc-400 mb-0.5">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>

                  <div className="w-full h-8 rounded bg-black/80 overflow-hidden flex items-center justify-center border border-zinc-800/60 my-0.5">
                    {isFinished || isCurrent ? (
                      <MaskedAthleteIllustration
                        pose={ex.illustrationKey || ex.name}
                        theme="orange"
                        load={ex.load}
                        category={ex.category}
                        imageUrl={ex.imageUrl}
                        svgGraphic={ex.aiGraphicSvg}
                        className="w-full h-full"
                      />
                    ) : (
                      <span className="text-[7px] font-mono text-zinc-600">WAIT</span>
                    )}
                  </div>

                  <span className="text-[7px] font-mono uppercase truncate block font-bold text-zinc-300">
                    {isFinished ? '✓ READY' : isCurrent ? 'AI...' : 'WAIT'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="text-zinc-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {isAssemblingMatrix ? 'ASSEMBLING TACTICAL POSTER' : 'PROCESSING ATHLETE POSTURES'}
            </span>
            <span className="font-orbitron font-black text-[#ff5722] text-sm">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-3 bg-zinc-950 border border-[#ff5722]/40 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#e64a19] via-[#ff5722] to-[#ff7043] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,87,34,0.9)] relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full blur-[1px] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-[9px] font-mono text-zinc-500 text-center flex items-center justify-center gap-2 border-t border-zinc-800/80 pt-2">
          <span>SAVAGE BAR METHOD</span>
          <span>•</span>
          <span>8-STATION SEQUENTIAL ENGINE</span>
          <span>•</span>
          <span>9:16 SAFE ZONE</span>
        </div>

      </div>
    </div>
  );
};
