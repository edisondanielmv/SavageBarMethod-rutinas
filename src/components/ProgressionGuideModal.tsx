import React from 'react';
import { CalisthenicsRoutine } from '../types/calisthenics';
import { X, TrendingUp, ShieldCheck, Flame, Trophy, Award, Zap } from 'lucide-react';

interface ProgressionGuideModalProps {
  routine: CalisthenicsRoutine;
  isOpen: boolean;
  onClose: () => void;
}

export const ProgressionGuideModal: React.FC<ProgressionGuideModalProps> = ({
  routine,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-zinc-950 border-2 border-zinc-700 rounded-2xl shadow-2xl overflow-hidden font-hud text-zinc-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-white font-orbitron">
                SAVAGE PROGRESSION SYSTEM
              </h2>
              <p className="text-xs text-zinc-400">
                Actionable guidelines to advance session to session without plateaus or injury
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Routine specific progression */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-400 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span>Progressive Overload Blueprint for: {routine.title}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {routine.globalProgressionGuide.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-md bg-orange-600/30 text-orange-400 border border-orange-500/40 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calisthenics Skill Hierarchy */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-200 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Advanced Skills Hierarchy (The Calisthenics Elite)</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">SAVAGE STANDARD</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>#1 FULL PLANCHE</span>
                  <span className="font-mono text-[10px]">0.001% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Maximum shoulder power, protraction, and locked-elbow torque.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>#2 ONE-ARM PULL-UP</span>
                  <span className="font-mono text-[10px]">0.01% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Pure unilateral strict pulling power without momentum or swing.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>#3 HUMAN FLAG</span>
                  <span className="font-mono text-[10px]">0.1% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Lateral chain control, obliques, and antagonistic push-pull balance.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>#4 FRONT LEVER</span>
                  <span className="font-mono text-[10px]">0.5% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Horizontal lat isometric strength and rigid posterior core bracing.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>#5 HANDSTAND PUSH-UP</span>
                  <span className="font-mono text-[10px]">0.5% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Freestanding vertical pressing power and proprioceptive balance.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>#6 BAR MUSCLE-UP</span>
                  <span className="font-mono text-[10px]">1.0% WORLDWIDE</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Explosive synchronized transition from hollow pull to straight bar dip.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Rules for Progression */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Savage Bar Method Progressive Overload Commandments</span>
            </h4>
            <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-zinc-200">Density Overload:</strong> Before adding extra weight or reps, trim rest intervals between rounds from 5 minutes down to 3 minutes.
              </li>
              <li>
                <strong className="text-zinc-200">Volume Overload:</strong> Add 1 repetition per set every 2 sessions once you complete current targets with clean joint lockouts.
              </li>
              <li>
                <strong className="text-zinc-200">Intensity Overload:</strong> On weighted stations (+10kg, +15kg, +25kg), increase load by small increments (1.25kg to 2.5kg) to protect elbow connective tissue.
              </li>
              <li>
                <strong className="text-zinc-200">Mandatory Deload:</strong> Every 4 to 6 weeks, take a 1-week deload at 50% training volume for deep central nervous system regeneration.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs font-orbitron"
          >
            UNDERSTOOD • TIME TO TRAIN
          </button>
        </div>
      </div>
    </div>
  );
};
