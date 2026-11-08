import React, { useState } from 'react';
import { CalisthenicsRoutine, RoutineFocus } from '../types/calisthenics';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Hash, 
  Flame, 
  Sparkles, 
  ListOrdered, 
  FileText 
} from 'lucide-react';

interface VideoDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: CalisthenicsRoutine;
  focus: RoutineFocus;
}

export const VideoDescriptionModal: React.FC<VideoDescriptionModalProps> = ({
  isOpen,
  onClose,
  routine,
  focus,
}) => {
  const [copiedType, setCopiedType] = useState<'all' | 'title' | 'description' | 'exercises' | 'hashtags' | null>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'title' | 'description'>('both');

  if (!isOpen) return null;

  const focusLabels: Record<RoutineFocus, string> = {
    pecho: 'CHEST & EXPLOSIVE PUSH',
    espalda: 'BACK & HEAVY PULL',
    brazos: 'ARMS (BICEPS & TRICEPS)',
    abdomen: 'ABDOMEN & ARMORED CORE',
    piernas: 'LEGS & REACTIVE POWER',
    estaticos: 'ELITE STATIC SKILLS',
    'todo-el-cuerpo': 'COMPLETE FULL BODY ROUTINE',
    'circuito-resistencia': 'ENDURANCE & HIGH-VOLUME CIRCUIT',
    'ganadora-peso-lastre': 'WEIGHT GAINER (100% WEIGHTED)',
  };

  const hashtags = [
    '#SavageBarMethod',
    '#Calisthenics',
    '#WeightedCalisthenics',
    '#MuscleUp',
    '#StreetWorkout',
    '#FrontLever',
    '#FullPlanche',
    '#HandstandPushup',
    '#CalisthenicsWorkout',
    '#WorkoutRoutine',
    '#GymTok',
    '#FitnessTok',
    '#StrengthTraining',
    '#FitnessMotivation',
    '#BodyweightTraining',
  ];

  // 1. SEPARATE TITLE
  const titleText = `🔥 SAVAGE BAR METHOD — ${routine.title.toUpperCase()} | ${routine.subtitle.toUpperCase()} 🔥`;

  // 2. SEPARATE EXERCISE BREAKDOWN
  const exercisesText = routine.exercises
    .map((ex, i) => {
      const num = String(i + 1).padStart(2, '0');
      const loadStr = ex.load && ex.load !== '0 Kg' && ex.load !== 'Load: 0 Kg' ? ` | ${ex.load}` : ' | Bodyweight';
      return `${num}. ${ex.name}\n   ➔ ${ex.sets} | ${ex.reps}${loadStr}\n   💡 Technical cue: ${ex.technicalCue}`;
    })
    .join('\n\n');

  // 3. SEPARATE DESCRIPTION (includes exercise breakdown, protocol, progression, and hashtags)
  const descriptionText = `⚡ FOCUS: ${focusLabels[focus] || focus.toUpperCase()}
🎯 ${routine.subtitle.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 EXERCISE BREAKDOWN (SETS & REPS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

${exercisesText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ CIRCUIT PROTOCOL:
• ${routine.circuitRule}
• ${routine.restRule}

📈 PROGRESSION INSTRUCTIONS:
${routine.globalProgressionGuide.map((g) => `• ${g}`).join('\n')}

🏆 METHODOLOGY: SAVAGE BAR METHOD
Save this video, like, and test it on the bars. 💥

${hashtags.join(' ')}`;

  // 4. COMBINED FULL TEXT
  const fullText = `${titleText}\n\n${descriptionText}`;

  const handleCopy = (text: string, type: 'all' | 'title' | 'description' | 'exercises' | 'hashtags') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-[#ff5722] rounded-2xl shadow-[0_0_40px_rgba(255,87,34,0.35)] overflow-hidden flex flex-col max-h-[90vh] font-hud">
        
        {/* Header */}
        <div className="relative px-5 py-3.5 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff5722]/20 border border-[#ff5722] flex items-center justify-center text-[#ff5722]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider font-orbitron flex items-center gap-2">
                <span>SOCIAL MEDIA POST COPY</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff5722]/20 text-[#ff5722] border border-[#ff5722]/40 font-bold">
                  TIKTOK & REELS
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Copy Title and Description separately for video uploads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Copy Action Toolbar */}
        <div className="p-3 bg-zinc-900/80 border-b border-zinc-800 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. COPY TITLE BUTTON */}
            <button
              onClick={() => handleCopy(titleText, 'title')}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-black uppercase font-orbitron tracking-wider flex items-center gap-1.5 transition-all ${
                copiedType === 'title'
                  ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-orange-500/15 border-orange-500/80 text-orange-400 hover:bg-orange-500/30'
              }`}
            >
              {copiedType === 'title' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>TITLE COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY TITLE</span>
                </>
              )}
            </button>

            {/* 2. COPY DESCRIPTION BUTTON */}
            <button
              onClick={() => handleCopy(descriptionText, 'description')}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-black uppercase font-orbitron tracking-wider flex items-center gap-1.5 transition-all ${
                copiedType === 'description'
                  ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-[#ff5722] border-[#ff5722] text-white hover:bg-[#ff6434] shadow-[0_0_12px_rgba(255,87,34,0.4)]'
              }`}
            >
              {copiedType === 'description' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>DESC COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY DESCRIPTION</span>
                </>
              )}
            </button>

            {/* 3. COPY ALL */}
            <button
              onClick={() => handleCopy(fullText, 'all')}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            >
              {copiedType === 'all' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ALL COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>COPY ALL</span>
                </>
              )}
            </button>

            {/* 4. ONLY HASHTAGS */}
            <button
              onClick={() => handleCopy(hashtags.join(' '), 'hashtags')}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-bold text-xs uppercase flex items-center gap-1 transition-all"
            >
              {copiedType === 'hashtags' ? (
                <>
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>TAGS COPIED!</span>
                </>
              ) : (
                <>
                  <Hash className="w-3 h-3 text-cyan-400" />
                  <span>HASHTAGS</span>
                </>
              )}
            </button>
          </div>

          {/* Section view switcher tabs */}
          <div className="flex items-center bg-black/60 p-0.5 rounded-lg border border-zinc-800 text-[11px] font-mono">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-2 py-0.5 rounded ${activeTab === 'both' ? 'bg-[#ff5722] text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('title')}
              className={`px-2 py-0.5 rounded ${activeTab === 'title' ? 'bg-[#ff5722] text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Title
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-2 py-0.5 rounded ${activeTab === 'description' ? 'bg-[#ff5722] text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              Description
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-zinc-300 text-xs sm:text-sm font-mono leading-relaxed select-text bg-[#090a0f]">
          
          {/* SECTION 1: SEPARATE POST TITLE */}
          {(activeTab === 'both' || activeTab === 'title') && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-950/40 via-black to-orange-950/40 border-2 border-orange-500/70 shadow-[0_0_15px_rgba(255,87,34,0.15)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-400 font-orbitron flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>1. POST TITLE (VIDEO TITLE / HOOK)</span>
                </span>
                <button
                  onClick={() => handleCopy(titleText, 'title')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase tracking-wider font-orbitron flex items-center gap-1 transition-all ${
                    copiedType === 'title'
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-orange-500/20 border-orange-500 text-orange-300 hover:bg-orange-500/40'
                  }`}
                >
                  {copiedType === 'title' ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY TITLE</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-black/90 border border-zinc-800 text-white font-bold text-sm font-orbitron select-all leading-snug">
                {titleText}
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Ready to paste directly into TikTok / Reels video title bar</span>
                <span>{titleText.length} chars</span>
              </div>
            </div>
          )}

          {/* SECTION 2: SEPARATE POST DESCRIPTION & HASHTAGS */}
          {(activeTab === 'both' || activeTab === 'description') && (
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-200 font-orbitron flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#ff5722]" />
                  <span>2. POST DESCRIPTION & HASHTAGS (CAPTION)</span>
                </span>
                <button
                  onClick={() => handleCopy(descriptionText, 'description')}
                  className={`px-3 py-1 rounded-lg border text-[11px] font-black uppercase tracking-wider font-orbitron flex items-center gap-1 transition-all ${
                    copiedType === 'description'
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-[#ff5722] border-[#ff5722] text-white hover:bg-[#ff6434]'
                  }`}
                >
                  {copiedType === 'description' ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY DESCRIPTION</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sub-header meta */}
              <div className="text-xs text-zinc-400 font-mono space-y-0.5">
                <p>⚡ Focus: <span className="text-orange-400 font-bold">{focusLabels[focus]}</span></p>
                <p>🎯 Routine Subtitle: <span className="text-zinc-200 font-bold">{routine.subtitle}</span></p>
              </div>

              {/* Exercise breakdown preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5 font-orbitron">
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Station Breakdown ({routine.exercises.length} Stations):</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(exercisesText, 'exercises')}
                    className="text-[10px] text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy Only Stations</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {routine.exercises.map((ex, idx) => (
                    <div
                      key={ex.id || idx}
                      className="p-2.5 rounded-lg bg-black/70 border border-zinc-800/90 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                          <span className="w-4.5 h-4.5 rounded bg-orange-500/20 text-orange-400 text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span>{ex.name}</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[9px] font-bold border border-zinc-700">
                          {ex.category}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10.5px] text-zinc-400">
                        <span className="text-orange-400 font-bold">{ex.sets}</span>
                        <span>•</span>
                        <span className="text-amber-300 font-bold">{ex.reps}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">
                          {ex.load && ex.load !== '0 Kg' && ex.load !== 'Load: 0 Kg' ? ex.load : 'Bodyweight'}
                        </span>
                      </div>

                      <p className="mt-0.5 text-[10.5px] text-zinc-400 italic">
                        💡 <span className="text-zinc-300">{ex.technicalCue}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocol info */}
              <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 text-xs space-y-1">
                <p className="font-bold text-zinc-200">
                  ⚙️ Circuit Protocol:
                </p>
                <p className="text-zinc-400 text-[11px]">
                  • {routine.circuitRule}<br />
                  • {routine.restRule}
                </p>
              </div>

              {/* Hashtags display */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1 font-orbitron">
                    <Hash className="w-3 h-3" />
                    <span>Hashtags ({hashtags.length}):</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(hashtags.join(' '), 'hashtags')}
                    className="text-[10px] text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy Only Hashtags</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {hashtags.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-black/80 border border-zinc-800 text-cyan-300 text-[10.5px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 font-mono text-right">
                {descriptionText.length} characters
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-sans hidden sm:inline">
            Paste separately into TikTok, Instagram Reels, or YouTube Shorts
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
            >
              Close
            </button>
            <button
              onClick={() => handleCopy(titleText, 'title')}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                copiedType === 'title'
                  ? 'bg-emerald-500 border-emerald-400 text-black'
                  : 'bg-orange-500/20 border-orange-500 text-orange-400 hover:bg-orange-500/30'
              }`}
            >
              {copiedType === 'title' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>TITLE COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY TITLE</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleCopy(descriptionText, 'description')}
              className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                copiedType === 'description'
                  ? 'bg-emerald-500 border-emerald-400 text-black'
                  : 'bg-[#ff5722] border-[#ff5722] text-white hover:bg-[#ff6434] shadow-[0_0_15px_rgba(255,87,34,0.4)]'
              }`}
            >
              {copiedType === 'description' ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>DESCRIPTION COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY DESCRIPTION</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
