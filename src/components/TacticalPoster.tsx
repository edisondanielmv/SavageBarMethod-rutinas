import React from 'react';
import { CalisthenicsRoutine, Exercise } from '../types/calisthenics';
import { MaskedAthleteIllustration } from './MaskedAthleteIllustration';
import { SavageEmblem } from './SavageEmblem';
import { Check, Dumbbell, Heart, MessageCircle, Bookmark, Share2, Music } from 'lucide-react';

interface TacticalPosterProps {
  routine: CalisthenicsRoutine;
  completedExercises: Record<string, boolean>;
  onToggleExercise: (id: string) => void;
  onSelectExercise: (exercise: Exercise) => void;
  posterRef: React.RefObject<HTMLDivElement | null>;
  layoutMode?: 'grid' | 'list';
  showTikTokOverlay?: boolean;
  safeZoneMode?: 'tiktok' | 'full';
}

export const TacticalPoster: React.FC<TacticalPosterProps> = ({
  routine,
  completedExercises,
  onToggleExercise,
  onSelectExercise,
  posterRef,
  showTikTokOverlay = false,
  safeZoneMode = 'tiktok',
}) => {
  const { theme, title, subtitle, circuitRule, restRule, exercises } = routine;

  // Authentic HUD theme palettes
  const themeStyles = {
    orange: {
      border: 'border-[#ff5722]',
      outerGlow: 'shadow-[0_0_35px_rgba(255,87,34,0.55)]',
      textAccent: 'text-[#ff5722]',
      titleGlow: 'drop-shadow-[0_0_16px_rgba(255,87,34,0.95)]',
      bgAccent: 'bg-[#ff5722]',
      cardBorder: 'border-[#ff5722]/60 hover:border-[#ff5722]',
      cardGlow: 'shadow-[0_0_14px_rgba(255,87,34,0.35)]',
      bottomButton: 'border-[#ff5722] text-[#ff5722] bg-[#ff5722]/20 hover:bg-[#ff5722]/35 shadow-[0_0_18px_rgba(255,87,34,0.6)]',
      cornerColor: '#ff5722',
      badgeBorder: 'border-orange-500/80',
    },
    green: {
      border: 'border-[#00ff66]',
      outerGlow: 'shadow-[0_0_25px_rgba(0,255,102,0.3)]',
      textAccent: 'text-[#00ff66]',
      titleGlow: 'drop-shadow-[0_0_10px_rgba(0,255,102,0.7)]',
      bgAccent: 'bg-[#00ff66]',
      cardBorder: 'border-[#00ff66]/40 hover:border-[#00ff66]',
      cardGlow: 'shadow-[0_0_8px_rgba(0,255,102,0.15)]',
      bottomButton: 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10 hover:bg-[#00ff66]/25 shadow-[0_0_12px_rgba(0,255,102,0.4)]',
      cornerColor: '#00ff66',
      badgeBorder: 'border-emerald-500/80',
    },
    cyan: {
      border: 'border-[#00e5ff]',
      outerGlow: 'shadow-[0_0_25px_rgba(0,229,255,0.3)]',
      textAccent: 'text-[#00e5ff]',
      titleGlow: 'drop-shadow-[0_0_10px_rgba(0,229,255,0.7)]',
      bgAccent: 'bg-[#00e5ff]',
      cardBorder: 'border-[#00e5ff]/40 hover:border-[#00e5ff]',
      cardGlow: 'shadow-[0_0_8px_rgba(0,229,255,0.15)]',
      bottomButton: 'border-[#00e5ff] text-[#00e5ff] bg-[#00e5ff]/10 hover:bg-[#00e5ff]/25 shadow-[0_0_12px_rgba(0,229,255,0.4)]',
      cornerColor: '#00e5ff',
      badgeBorder: 'border-cyan-500/80',
    },
    gold: {
      border: 'border-[#ffb700]',
      outerGlow: 'shadow-[0_0_25px_rgba(255,183,0,0.3)]',
      textAccent: 'text-[#ffb700]',
      titleGlow: 'drop-shadow-[0_0_10px_rgba(255,183,0,0.7)]',
      bgAccent: 'bg-[#ffb700]',
      cardBorder: 'border-[#ffb700]/40 hover:border-[#ffb700]',
      cardGlow: 'shadow-[0_0_8px_rgba(255,183,0,0.15)]',
      bottomButton: 'border-[#ffb700] text-[#ffb700] bg-[#ffb700]/10 hover:bg-[#ffb700]/25 shadow-[0_0_12px_rgba(255,183,0,0.4)]',
      cornerColor: '#ffb700',
      badgeBorder: 'border-amber-500/80',
    },
  }[theme];

  const totalExercises = exercises.length;
  const completedCount = exercises.filter((ex) => completedExercises[ex.id]).length;
  const isAllCompleted = totalExercises > 0 && completedCount === totalExercises;

  const isTikTokSafe = safeZoneMode === 'tiktok';

  // Helper to parse and format sets, reps, and load into prominent, high-contrast HUD badges
  const formatExerciseMetrics = (setsStr: string, repsStr: string, loadStr?: string) => {
    // 1. Clean Sets
    let s = (setsStr || '3 Sets').replace(/^Sets:\s*/i, '').trim();
    if (/^\d+$/.test(s)) {
      s = `${s} SETS`;
    } else {
      s = s.toUpperCase();
    }

    // 2. Clean Reps
    let r = (repsStr || '10 Reps').replace(/^Reps:\s*/i, '').trim();
    if (/^\d+$/.test(r)) {
      r = `${r} REPS`;
    } else if (/^\d+-\d+$/.test(r)) {
      r = `${r} REPS`;
    } else {
      r = r.toUpperCase();
    }

    // 3. Clean Load
    let l: string | null = null;
    if (loadStr) {
      const clean = loadStr.replace(/^Load:\s*/i, '').trim();
      if (clean && clean !== '0 Kg' && clean !== '0 kg' && clean !== 'Bodyweight' && clean !== '0') {
        l = clean.toUpperCase();
      }
    }

    return { sets: s, reps: r, load: l };
  };

  return (
    <div
      ref={posterRef}
      id="savage-tactical-poster-canvas"
      className={`relative w-full max-w-[450px] mx-auto aspect-[9/16] bg-[#050609] text-zinc-100 rounded-2xl border-2 ${themeStyles.border} ${themeStyles.outerGlow} overflow-hidden font-hud select-none flex flex-col justify-between shadow-2xl`}
      style={{
        boxShadow: `inset 0 0 40px rgba(0,0,0,0.95), 0 0 30px ${themeStyles.cornerColor}33`,
      }}
    >
      {/* Sci-Fi HUD Outer Corner Brackets */}
      <svg className="absolute top-0 left-0 w-7 h-7 pointer-events-none z-20" viewBox="0 0 28 28">
        <path d="M 0 10 L 0 0 L 10 0" fill="none" stroke={themeStyles.cornerColor} strokeWidth="3" />
        <rect x="2.5" y="2.5" width="2" height="2" fill={themeStyles.cornerColor} />
      </svg>
      <svg className="absolute top-0 right-0 w-7 h-7 pointer-events-none z-20" viewBox="0 0 28 28">
        <path d="M 28 10 L 28 0 L 18 0" fill="none" stroke={themeStyles.cornerColor} strokeWidth="3" />
        <rect x="23.5" y="2.5" width="2" height="2" fill={themeStyles.cornerColor} />
      </svg>
      <svg className="absolute bottom-0 left-0 w-7 h-7 pointer-events-none z-20" viewBox="0 0 28 28">
        <path d="M 0 18 L 0 28 L 10 28" fill="none" stroke={themeStyles.cornerColor} strokeWidth="3" />
        <rect x="2.5" y="23.5" width="2" height="2" fill={themeStyles.cornerColor} />
      </svg>
      <svg className="absolute bottom-0 right-0 w-7 h-7 pointer-events-none z-20" viewBox="0 0 28 28">
        <path d="M 28 18 L 28 28 L 18 28" fill="none" stroke={themeStyles.cornerColor} strokeWidth="3" />
        <rect x="23.5" y="23.5" width="2" height="2" fill={themeStyles.cornerColor} />
      </svg>

      {/* Central Watermark: Official Savage Bar Method Emblem */}
      <div className="absolute inset-0 flex items-center justify-center opacity-8 pointer-events-none z-0">
        <SavageEmblem size={280} className="w-[280px] h-[280px]" />
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />

      {/* =========================================================================
          TIKTOK & REELS CALIBRATED SAFE ZONE CONTAINER:
          - Top spacer (12.5% of HEIGHT): cleanly clears status bar, camera notch, search bar & Friends tab
          - Right padding (14.5%): clears profile avatar, like, comment, bookmark, share buttons
          - Bottom height (16.5%): dedicated dark pedestal for TikTok username, caption & controls
          ========================================================================= */}
      <div 
        className={`relative z-10 w-full h-full flex flex-col justify-between overflow-hidden ${
          isTikTokSafe 
            ? 'pl-[3.5%] pr-[14.5%] pb-0' 
            : 'pt-3 sm:pt-4 px-3 pb-3'
        }`}
      >
        {/* Strictly calibrated top safe spacer: 12.5% of canvas HEIGHT (clears Friends & search icon) */}
        {isTikTokSafe && <div className="w-full flex-shrink-0" style={{ height: '12.5%' }} />}
        
        {/* POSTER HEADER (Placed 100% Below TikTok 'Friends' / 'For You' Tabs & Search Icon) */}
        <header className="text-center flex-shrink-0 mb-1">
          {/* Top Savage Bar Method Branding Row */}
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <div className="w-4 h-4 rounded-full border border-zinc-700 bg-black/90 overflow-hidden flex items-center justify-center shadow-md">
              <SavageEmblem size={16} />
            </div>
            <div className="text-left flex items-center gap-1.5">
              <span className="text-[6.5px] font-mono tracking-widest uppercase text-zinc-400 font-bold block leading-none">
                SAVAGE PROTOCOL
              </span>
              <span className="text-[6px] text-zinc-600 font-mono">•</span>
              <span className={`text-[8px] font-black uppercase tracking-wider ${themeStyles.textAccent} block leading-tight font-orbitron`}>
                SAVAGE BAR METHOD
              </span>
            </div>
          </div>

          {/* Main Routine Title in Neon Orbitron Typography */}
          <h1
            className={`text-sm sm:text-base font-black uppercase tracking-wide font-orbitron ${themeStyles.textAccent} ${themeStyles.titleGlow} leading-none`}
          >
            {title}
          </h1>

          {/* Subtitle & Rules Banner */}
          <div className="mt-0.5 flex items-center justify-center gap-1 flex-wrap">
            <span className="px-1.5 py-0.2 border border-zinc-800 bg-black/90 rounded text-[7px] sm:text-[7.5px] font-extrabold uppercase tracking-widest text-zinc-300 font-teko leading-none">
              {subtitle}
            </span>
            <span className="text-[6.5px] sm:text-[7px] font-mono text-zinc-400 font-semibold uppercase tracking-tight truncate max-w-[210px] leading-none">
              • {circuitRule}
            </span>
          </div>
        </header>

        {/* 8-EXERCISE MATRIX GRID:
            Expanded to 62% of canvas height so character images are large, clear,
            and 100% uncropped with zero obstruction */}
        <main 
          className="grid grid-cols-2 grid-rows-4 gap-1 sm:gap-1.5 my-0.5 overflow-hidden flex-shrink-0" 
          style={{ height: isTikTokSafe ? '62%' : '77%' }}
        >
          {exercises.slice(0, 8).map((exercise) => {
            const isDone = !!completedExercises[exercise.id];
            const orderStr = exercise.order < 10 ? `0${exercise.order}` : `${exercise.order}`;
            const metrics = formatExerciseMetrics(exercise.sets, exercise.reps, exercise.load);

            return (
              <div
                key={exercise.id}
                onClick={() => onSelectExercise(exercise)}
                className={`group relative rounded-xl border ${
                  isDone
                    ? 'border-emerald-500 bg-emerald-950/40'
                    : `${themeStyles.cardBorder} ${themeStyles.cardGlow} bg-[#07090e]`
                } p-1 sm:p-1.5 transition-all duration-150 cursor-pointer flex flex-col justify-between overflow-hidden hover:border-white/90 shadow-lg`}
              >
                {/* 1. Card Top Row: Order Number + Category + Optional Load Badge + Done Checkbox */}
                <div className="flex items-center justify-between mb-0.5 flex-shrink-0 h-3.5">
                  <div className="flex items-center gap-1 min-w-0">
                    <div
                      className={`px-1 py-0.1 rounded text-[6.5px] sm:text-[7px] font-black font-orbitron leading-none ${
                        isDone ? 'bg-emerald-500 text-black' : `${themeStyles.bgAccent} text-black`
                      }`}
                    >
                      {orderStr}
                    </div>
                    <span className="text-[6px] sm:text-[6.5px] font-mono font-bold uppercase tracking-wider text-zinc-400 truncate max-w-[48px] leading-none">
                      {exercise.category}
                    </span>
                    {/* Inline Load badge if weighted */}
                    {metrics.load && (
                      <span className="px-1 py-0.1 bg-black/90 border border-[#ff5722]/80 rounded text-[5.5px] font-mono font-bold text-[#ff5722] flex items-center gap-0.5 leading-none">
                        <Dumbbell className="w-1.5 h-1.5" />
                        <span>{metrics.load}</span>
                      </span>
                    )}
                  </div>

                  {/* Completion Toggle */}
                  <button
                    type="button"
                    title={isDone ? 'Completed' : 'Mark completed'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExercise(exercise.id);
                    }}
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-zinc-700 bg-zinc-900/60 text-transparent hover:border-zinc-500 hover:text-zinc-600'
                    }`}
                  >
                    <Check className="w-2 h-2 stroke-[3]" />
                  </button>
                </div>

                {/* 2. MAX-VISIBILITY Character Illustration Box: Complete uncropped athlete with zero blocking badge */}
                <div className="relative w-full flex-1 min-h-0 rounded-lg bg-[#040507] border border-zinc-800/80 group-hover:border-[#ff5722] flex items-center justify-center overflow-hidden my-0.5 shadow-inner">
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

                {/* 3. Card Bottom Info: Guaranteed unclipped Name & Dedicated Sets/Reps HUD Strip */}
                <div className="flex-shrink-0 pt-0.5 space-y-0.5 text-center leading-none">
                  {/* Exercise Name in High-Contrast White Orbitron */}
                  <h2 className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-tight text-white text-center font-orbitron leading-tight truncate group-hover:text-amber-200 px-0.5">
                    {exercise.name}
                  </h2>

                  {/* PROMINENT SETS & REPS HUD PILL */}
                  <div className="flex items-center justify-center gap-1 bg-black/95 py-0.5 px-1.5 rounded border border-zinc-700/80 shadow-sm">
                    <span className="text-[6px] font-mono text-zinc-400 uppercase font-bold">SETS:</span>
                    <span className="text-[6.5px] sm:text-[7.5px] font-black font-orbitron text-zinc-100 tracking-wider">
                      {metrics.sets.replace(/\s*SETS/i, '')}
                    </span>
                    <span className="text-zinc-600 font-bold text-[6px]">•</span>
                    <span className="text-[6px] font-mono text-zinc-400 uppercase font-bold">REPS:</span>
                    <span className={`text-[6.5px] sm:text-[7.5px] font-black font-orbitron ${themeStyles.textAccent} tracking-wider`}>
                      {metrics.reps.replace(/\s*REPS/i, '')}
                    </span>
                    {metrics.load && (
                      <>
                        <span className="text-zinc-600 font-bold text-[6px]">•</span>
                        <span className="text-[6px] sm:text-[7px] font-mono font-bold text-amber-400">
                          {metrics.load}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </main>

        {/* TACTICAL PROTOCOL STRIP (Positioned Safely Above Caption Zone) */}
        <div className="flex-shrink-0 pt-0.5 pb-0.5 border-t border-zinc-800/80 text-center">
          <div className="flex items-center justify-between text-[7px] sm:text-[7.5px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            <span className="text-zinc-300">
              ⚡ {restRule}
            </span>
            <span className={`font-orbitron font-black ${themeStyles.textAccent}`}>
              {isAllCompleted
                ? 'ALL 8 COMPLETED ✓'
                : completedCount > 0
                ? `${completedCount}/8 DONE`
                : '3-4 ROUNDS PROTOCOL'}
            </span>
          </div>
        </div>

        {/* =========================================================================
            DEDICATED TIKTOK & REELS CAPTION SAFE ZONE PEDESTAL (Bottom 16.5%):
            Reserved exclusively so when you post to TikTok, your video title,
            caption, hashtags, sound ticker and promote buttons sit right here
            WITHOUT OBSTRUCTING ANY EXERCISE OR IMAGE!
            ========================================================================= */}
        {isTikTokSafe && (
          <div className="relative flex-1 min-h-[50px] sm:min-h-[60px] rounded-t-xl bg-gradient-to-b from-zinc-950 via-[#06070a] to-black border-t border-dashed border-zinc-800/80 p-2 flex flex-col justify-between overflow-hidden shadow-inner -mx-1">
            {/* Cyber HUD Grid Background */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            {/* Tactical Pedestal Header */}
            <div className="relative z-10 flex items-center justify-between text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>// TIKTOK & REELS SAFE PEDESTAL</span>
              <span className={`${themeStyles.textAccent} font-bold`}>SAVAGE BAR METHOD</span>
            </div>

            {/* Subtle Guide Watermark for Creator */}
            <div className="relative z-10 text-center my-auto py-1">
              <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider">
                ▼ VIDEO TITLE, CAPTION & HASHTAGS FIT HERE ▼
              </p>
              <p className="text-[6px] font-mono text-zinc-700 tracking-tight mt-0.5">
                Zero cutoff • Guaranteed 100% exercise visibility when published
              </p>
            </div>

            {/* Pedestal Bottom Border */}
            <div className="relative z-10 flex items-center justify-between text-[5.5px] font-mono text-zinc-700 uppercase tracking-widest pt-0.5 border-t border-zinc-900">
              <span>FORMAT: 9:16 (1080X1920)</span>
              <span>SAVAGE ATHLETE AI ENGINE</span>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          AUTHENTIC TIKTOK UI SIMULATOR OVERLAY:
          Directly mirrors the mobile layout from user's published screenshot
          to guarantee that all 8 exercises, titles and cues remain 100% visible!
          ========================================================================= */}
      {showTikTokOverlay && (
        <div className="absolute inset-0 pointer-events-none z-30 select-none flex flex-col justify-between bg-black/15">
          {/* Top Status & TikTok Tabs (Exact Match with user screenshot IMG_4086) */}
          <div className="pt-2 px-3 space-y-1.5">
            {/* Mobile Clock & Status Row */}
            <div className="flex justify-between items-center text-[9px] font-mono text-white/80 px-1">
              <span>09:55</span>
              <div className="flex items-center gap-1.5 text-[8px]">
                <span>📶</span>
                <span>5G</span>
                <span>18% 🔋</span>
              </div>
            </div>

            {/* TikTok Top Header: Avatar on left, 'Friends' in center, Search icon on right */}
            <div className="flex items-center justify-between px-2 pt-0.5 pb-1">
              {/* Left: Avatar with plus badge */}
              <div className="relative w-6 h-6 rounded-full border border-white/80 bg-black flex items-center justify-center">
                <SavageEmblem size={18} />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 text-black text-[7px] font-bold flex items-center justify-center">
                  +
                </div>
              </div>

              {/* Center: Prominent 'Friends' tab */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-white font-sans tracking-tight drop-shadow-md">
                  Friends
                </span>
              </div>

              {/* Right: Search icon */}
              <div className="w-6 h-6 flex items-center justify-center text-white text-sm drop-shadow-md">
                🔍
              </div>
            </div>
          </div>

          {/* Middle Right Column (TikTok Action Buttons) */}
          <div className="absolute right-1.5 bottom-24 flex flex-col items-center gap-2.5 z-40">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-black/90 flex items-center justify-center overflow-hidden shadow-xl">
                <SavageEmblem size={28} />
              </div>
            </div>

            {/* Like Heart Button */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-[8px] font-bold text-white shadow-sm mt-0.5">0</span>
            </div>

            {/* Comment Speech Bubble */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-[7.5px] font-bold text-white shadow-sm mt-0.5">Add 1st</span>
            </div>

            {/* Bookmark Star Button */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <Bookmark className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-[8px] font-bold text-white shadow-sm mt-0.5">0</span>
            </div>

            {/* More dots button */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-[10px] font-black">
                •••
              </div>
            </div>

            {/* Share to WhatsApp Button */}
            <div className="w-6 h-6 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-white text-[10px]">
              💬
            </div>
          </div>

          {/* Bottom TikTok Post Overlay (Exact Match with user screenshot IMG_4086) */}
          <div className="pb-2 px-3 text-left max-w-[310px] space-y-1 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6">
            {/* User Handle & Post Type */}
            <div className="flex items-center gap-1.5 text-[9.5px]">
              <span className="font-bold text-white">SavageBar Method</span>
              <span className="px-1 py-0.2 rounded bg-white/20 text-[7px] text-white font-mono">
                Photo
              </span>
              <span className="text-[8px] text-zinc-400">54s ago</span>
            </div>

            {/* Post Title & Caption */}
            <p className="text-[9px] font-bold text-white leading-tight line-clamp-1">
              🔥 SAVAGE BAR METHOD — {title}
            </p>

            <p className="text-[8px] text-zinc-200 line-clamp-2 leading-snug">
              ⚡ FOCUS: ABDOMEN & ARMORED CORE • {subtitle}... <span className="text-zinc-400 font-bold">more</span>
            </p>

            {/* Share to WhatsApp Pill */}
            <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-zinc-800 text-white text-[8.5px] font-semibold border border-zinc-700 w-fit">
              <span className="text-emerald-400">💬</span>
              <span>Share to WhatsApp</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
