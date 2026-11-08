import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Package, 
  Dumbbell, 
  Flame, 
  Check, 
  Sparkles, 
  Layers, 
  Target, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Share2,
  FileText,
  Eye,
  Maximize2
} from 'lucide-react';
import { CalisthenicsRoutine, RoutineFocus, HudTheme, Exercise } from '../types/calisthenics';
import { MaskedAthleteIllustration } from './MaskedAthleteIllustration';
import { SavageEmblem } from './SavageEmblem';

interface CarouselTabContentProps {
  routine: CalisthenicsRoutine;
  focus: RoutineFocus;
  theme: HudTheme;
  onOpenModalPreview: () => void;
  onOpenDescriptionModal: () => void;
}

export const CarouselTabContent: React.FC<CarouselTabContentProps> = ({
  routine,
  focus,
  theme,
  onOpenModalPreview,
  onOpenDescriptionModal,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slide' | 'gallery'>('slide');
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<{ current: number; total: number; label: string }>({
    current: 0,
    total: 0,
    label: '',
  });
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '4:5'>('9:16');
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const totalSlides = 1 + (routine?.exercises?.length || 8) + 1; // Cover (1) + Exercises (8) + Summary Recap (1) = 10 slides
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { title, subtitle, circuitRule, restRule, exercises } = routine;

  const themeStyles = {
    orange: {
      border: 'border-[#ff5722]',
      textAccent: 'text-[#ff5722]',
      bgAccent: 'bg-[#ff5722]',
      glow: 'shadow-[0_0_25px_rgba(255,87,34,0.4)]',
      pill: 'bg-[#ff5722]/15 border-[#ff5722]/50 text-[#ff5722]',
      colorHex: '#ff5722',
    },
    green: {
      border: 'border-[#00ff66]',
      textAccent: 'text-[#00ff66]',
      bgAccent: 'bg-[#00ff66]',
      glow: 'shadow-[0_0_25px_rgba(0,255,102,0.3)]',
      pill: 'bg-[#00ff66]/15 border-[#00ff66]/50 text-[#00ff66]',
      colorHex: '#00ff66',
    },
    cyan: {
      border: 'border-[#00e5ff]',
      textAccent: 'text-[#00e5ff]',
      bgAccent: 'bg-[#00e5ff]',
      glow: 'shadow-[0_0_25px_rgba(0,229,255,0.3)]',
      pill: 'bg-[#00e5ff]/15 border-[#00e5ff]/50 text-[#00e5ff]',
      colorHex: '#00e5ff',
    },
    gold: {
      border: 'border-[#ffb700]',
      textAccent: 'text-[#ffb700]',
      bgAccent: 'bg-[#ffb700]',
      glow: 'shadow-[0_0_25px_rgba(255,183,0,0.3)]',
      pill: 'bg-[#ffb700]/15 border-[#ffb700]/50 text-[#ffb700]',
      colorHex: '#ffb700',
    },
  }[theme] || {
    border: 'border-[#ff5722]',
    textAccent: 'text-[#ff5722]',
    bgAccent: 'bg-[#ff5722]',
    glow: 'shadow-[0_0_25px_rgba(255,87,34,0.4)]',
    pill: 'bg-[#ff5722]/15 border-[#ff5722]/50 text-[#ff5722]',
    colorHex: '#ff5722',
  };

  // Capture a single slide as PNG
  const handleDownloadSingleSlide = async (index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    setDownloadingIndex(index);

    try {
      const dataUrl = await toPng(el, {
        quality: 0.98,
        pixelRatio: 2.2,
        backgroundColor: '#07090e',
        skipFonts: true,
      });

      const link = document.createElement('a');
      link.download = `savage-slide-${String(index + 1).padStart(2, '0')}-${routine.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading slide:', err);
    } finally {
      setDownloadingIndex(null);
    }
  };

  // Capture all 10 slides and package into JSZip
  const handleDownloadAllAsZip = async () => {
    setIsZipping(true);
    setZipProgress({ current: 0, total: totalSlides, label: 'Inicializando motor de compresión...' });

    try {
      const zip = new JSZip();
      const folderName = `savage-carrusel-${routine.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
      const folder = zip.folder(folderName) || zip;

      for (let i = 0; i < totalSlides; i++) {
        const el = slideRefs.current[i];
        if (!el) continue;

        const slideName = i === 0 
          ? '01_PORTADA_TITULO' 
          : i === totalSlides - 1 
            ? `${String(totalSlides).padStart(2, '0')}_RESUMEN_FINAL` 
            : `${String(i + 1).padStart(2, '0')}_${(exercises[i - 1]?.name || 'EJERCICIO').replace(/[^a-zA-Z0-9]/g, '_')}`;

        setZipProgress({
          current: i + 1,
          total: totalSlides,
          label: `Generando Slide ${i + 1} de ${totalSlides}: ${slideName.replace(/_/g, ' ')}...`,
        });

        // Ensure images are loaded
        const imgElements = el.querySelectorAll('img');
        await Promise.all(
          Array.from(imgElements).map(async (img) => {
            if (img.complete && img.naturalHeight !== 0) return;
            try { if (img.decode) await img.decode(); } catch (e) {}
          })
        );

        await new Promise((r) => setTimeout(r, 80));

        const dataUrl = await toPng(el, {
          quality: 0.96,
          pixelRatio: 2.2,
          backgroundColor: '#07090e',
          skipFonts: true,
        });

        const base64Data = dataUrl.split(',')[1];
        folder.file(`${slideName}.png`, base64Data, { base64: true });
      }

      setZipProgress({
        current: totalSlides,
        total: totalSlides,
        label: 'Empaquetando archivo .ZIP...',
      });

      // Add a handy Readme text file with TikTok / Instagram copy text
      const captionText = `🔥 SAVAGE BAR METHOD — ${routine.title.toUpperCase()}
⚡ ${routine.subtitle.toUpperCase()}

📋 REGLA DEL CIRCUITO:
• ${routine.circuitRule}
• ${routine.restRule}

💪 ESTACIONES DE LA RUTINA:
${exercises.map((e, idx) => `${idx + 1}. ${e.name} — ${e.sets} | ${e.reps} (${e.load})`).join('\n')}

🎯 ENFOQUE BIOMECÁNICO:
• Atleta: Atleta Savage con pasamontañas táctico negro
• Ejecución estricta sin balanceo, hollow body activo.

#calistenia #calisthenics #savagebarmethod #streetworkout #rutinaencasa #muscleup #frontlever #fitness`;

      folder.file('DESCRIPCION_PARA_PUBLICAR.txt', captionText);

      const content = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setZipProgress((prev) => ({
          ...prev,
          label: `Comprimiendo .ZIP: ${Math.round(metadata.percent)}%`,
        }));
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${folderName}.zip`;
      link.click();

      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff5722', '#ff8a65', '#00ff66', '#ffffff'],
        });
      } catch (e) {}
    } catch (err) {
      console.error('Error generating carrusel zip:', err);
    } finally {
      setIsZipping(false);
      setZipProgress({ current: 0, total: 0, label: '' });
    }
  };

  // Render Slide 0: High-Impact Cover Slide
  const renderCoverSlide = (refIdx: number) => {
    return (
      <div
        ref={(el) => { slideRefs.current[refIdx] = el; }}
        className="w-full h-full bg-[#07090e] text-white flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden select-none border-2 border-orange-500/60 rounded-2xl shadow-2xl"
        style={{
          aspectRatio: aspectRatio === '9:16' ? '9/16' : '4/5',
        }}
      >
        {/* Background tactical HUD grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff5722_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-orange-500/80 p-0.5 bg-black flex items-center justify-center">
              <SavageEmblem size={26} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-orange-400 uppercase block">
                SAVAGE PROTOCOL #513
              </span>
              <span className="text-xs font-orbitron font-extrabold text-white tracking-wide">
                SAVAGE BAR METHOD
              </span>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/60 text-[10px] font-mono font-bold text-orange-300">
            SLIDE 01 / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>

        {/* Center Hero */}
        <div className="relative z-10 my-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/60 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>RUTINA COMPLETA DE CALISTENIA PRO</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-orbitron text-white uppercase tracking-tight leading-none drop-shadow-[0_2px_15px_rgba(255,87,34,0.4)]">
            {title}
          </h2>

          <div className="text-xs sm:text-sm font-teko uppercase tracking-widest text-zinc-300">
            {subtitle}
          </div>

          {/* Featured First Exercise Athlete Preview */}
          {exercises[0] && (
            <div className="w-48 sm:w-56 h-36 sm:h-44 mx-auto rounded-xl overflow-hidden border-2 border-orange-500/50 bg-black/60 shadow-xl relative">
              <MaskedAthleteIllustration
                imageUrl={exercises[0].imageUrl}
                pose={exercises[0].name}
                category={exercises[0].category}
                theme={theme}
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-orange-400 border border-orange-500/40">
                100% UNCLIPPED
              </div>
            </div>
          )}

          {/* Specs pills */}
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Estaciones</span>
              <span className="text-sm font-orbitron font-bold text-white">{exercises.length}</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Rondas</span>
              <span className="text-sm font-orbitron font-bold text-orange-400">3-4 RND</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Nivel</span>
              <span className="text-sm font-orbitron font-bold text-emerald-400">AVANZADO</span>
            </div>
          </div>
        </div>

        {/* Footer Swipe CTA */}
        <div className="relative z-10 border-t border-zinc-800/80 pt-3 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500 text-[10px]">SAVAGE ATHLETE ENGINE</span>
          <div className="flex items-center gap-1.5 text-orange-400 font-bold animate-pulse">
            <span>DESLIZA PARA VER LOS EJERCICIOS</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  };

  // Render Exercise Slide (1 per exercise with giant unclipped photo, sets & reps)
  const renderExerciseSlide = (exercise: Exercise, exerciseIndex: number, refIdx: number) => {
    return (
      <div
        ref={(el) => { slideRefs.current[refIdx] = el; }}
        className="w-full h-full bg-[#07090e] text-white flex flex-col justify-between p-5 sm:p-7 relative overflow-hidden select-none border-2 border-zinc-800 rounded-2xl shadow-2xl"
        style={{
          aspectRatio: aspectRatio === '9:16' ? '9/16' : '4/5',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ff5722_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-600/20 border border-orange-500/60 text-orange-400 font-mono font-black text-xs flex items-center justify-center">
              {String(exerciseIndex + 1).padStart(2, '0')}
            </span>
            <div>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                ESTACIÓN {exerciseIndex + 1} DE {exercises.length}
              </span>
              <span className="text-[11px] font-orbitron font-bold text-white uppercase tracking-wider">
                {exercise.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {exercise.load && exercise.load !== 'Load: 0 Kg' && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[10px] font-mono font-bold text-amber-300">
                ⚖️ {exercise.load}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400">
              SLIDE {String(refIdx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Center: Large High-Resolution Unclipped Athlete Illustration */}
        <div className="relative z-10 flex-1 my-3 flex flex-col justify-center items-center">
          <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-orange-500/40 bg-black/80 shadow-2xl relative flex items-center justify-center p-2">
            <MaskedAthleteIllustration
              imageUrl={exercise.imageUrl}
              pose={exercise.name}
              category={exercise.category}
              theme={theme}
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            />
            {/* Ambient mask guarantee pill */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 border border-orange-500/40 text-[9px] font-mono text-orange-400 flex items-center gap-1">
              <span>🥷 ATLETA MASCARILLA</span>
            </div>
          </div>

          {/* Exercise Title */}
          <div className="w-full text-center mt-3">
            <h3 className="text-lg sm:text-xl font-black font-orbitron text-white uppercase tracking-tight">
              {exercise.name}
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">
              Enfoque muscular: {exercise.muscleTarget || 'Dorsales, core y triceps'}
            </p>
          </div>

          {/* Prominent Sets & Reps Pill (Exactly what the user requested!) */}
          <div className="w-full max-w-xs mx-auto mt-2.5 p-2.5 rounded-xl bg-gradient-to-r from-orange-950/60 via-black to-orange-950/60 border-2 border-orange-500/80 shadow-lg text-center">
            <div className="flex items-center justify-around text-xs font-mono font-black">
              <span className="text-white">
                SERIES: <strong className="text-orange-400 text-sm font-orbitron">{exercise.sets?.replace(/Sets:\s*/i, '') || '4'}</strong>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-white">
                REPS: <strong className="text-orange-400 text-sm font-orbitron">{exercise.reps?.replace(/Reps:\s*/i, '') || '10'}</strong>
              </span>
              {exercise.load && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-400 text-[11px]">
                    {exercise.load.replace(/Load:\s*/i, '')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Technical execution cue */}
          <div className="w-full mt-2.5 p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-300 font-sans leading-relaxed text-center">
            <span className="text-orange-400 font-bold font-mono">CLAVE TÉCNICA: </span>
            {exercise.technicalCue || 'Control excéntrico de 2 segundos y bloqueo completo.'}
          </div>
        </div>

        {/* Slide Footer */}
        <div className="relative z-10 border-t border-zinc-800/80 pt-2.5 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500 text-[10px]">SAVAGE BAR METHOD</span>
          <div className="flex items-center gap-1 text-orange-400 font-bold text-[10.5px]">
            <span>DESLIZA AL SIGUIENTE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  };

  // Render Slide 9: Complete Summary & Call to Action Slide
  const renderSummarySlide = (refIdx: number) => {
    return (
      <div
        ref={(el) => { slideRefs.current[refIdx] = el; }}
        className="w-full h-full bg-[#07090e] text-white flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden select-none border-2 border-emerald-500/60 rounded-2xl shadow-2xl"
        style={{
          aspectRatio: aspectRatio === '9:16' ? '9/16' : '4/5',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#00ff66_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-emerald-400 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <span className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
              RESUMEN COMPLETO DE LA SESIÓN
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-[10px] font-mono font-bold text-emerald-400">
            SLIDE {String(totalSlides).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Center: List of all 8 exercises */}
        <div className="relative z-10 my-auto space-y-3">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black font-orbitron text-white uppercase">
              {title}
            </h3>
            <p className="text-xs font-mono text-emerald-400 font-bold mt-1">
              GUARDA ESTE POST Y COMPÁRTELO CON TU EQUIPO
            </p>
          </div>

          <div className="space-y-1.5 max-h-[320px] overflow-hidden">
            {exercises.map((ex, idx) => (
              <div
                key={ex.id || idx}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded bg-zinc-900 border border-zinc-700 text-orange-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-white truncate max-w-[170px] sm:max-w-[240px]">
                    {ex.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-zinc-400 text-[11px]">{ex.sets} × {ex.reps}</span>
                  {ex.load && ex.load !== 'Load: 0 Kg' && (
                    <span className="text-amber-400 text-[10px]">{ex.load}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center text-xs font-mono text-zinc-300">
            ⚡ {circuitRule} • {restRule}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-zinc-800/80 pt-3 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500 text-[10px]">SAVAGE BAR METHOD</span>
          <span className="text-emerald-400 font-bold text-[11px]">
            ¡A ENTRENAR CON DISCIPLINA!
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 font-sans text-slate-100">
      {/* Carrusel Hub Card */}
      <div className="bg-[#10141f] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        
        {/* Header & Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-orange-400 border border-slate-700 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Estudio de Carrusel (10 Diapositivas)
                </h2>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-orange-400 font-medium">
                  Formato 9:16 / 4:5
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Diapositivas individuales de alta resolución con los ejercicios de la rutina, series, repeticiones y cargas, preparadas para publicar en TikTok, Instagram o exportar en .ZIP.
              </p>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewMode('slide')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'slide'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Diapositiva</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'gallery'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Galería (10)</span>
              </button>
            </div>

            {/* Copy Caption */}
            <button
              onClick={onOpenDescriptionModal}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Copiar Texto</span>
            </button>

            {/* Primary Action: Download All in .ZIP */}
            <button
              onClick={handleDownloadAllAsZip}
              disabled={isZipping}
              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              <Package className={`w-4 h-4 ${isZipping ? 'animate-bounce' : ''}`} />
              <span>{isZipping ? 'Comprimiendo .ZIP...' : 'Descargar Todo (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* ZIP Generation Progress Bar */}
        {isZipping && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-200">
              <span className="font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-orange-400" />
                <span>{zipProgress.label}</span>
              </span>
              <span className="font-mono">{zipProgress.current} / {zipProgress.total}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-orange-500 transition-all duration-200"
                style={{ width: `${(zipProgress.current / zipProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* View Mode 1: Interactive Slide Carousel Viewer */}
        {viewMode === 'slide' && (
          <div className="space-y-4">
            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between bg-[#141926] p-2.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-medium text-xs flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="text-center">
                <span className="text-xs font-semibold text-white block">
                  Diapositiva {currentSlideIndex + 1} de {totalSlides}
                </span>
                <span className="text-[11px] text-slate-400 truncate block max-w-[200px] sm:max-w-none">
                  {currentSlideIndex === 0 
                    ? 'Portada de la Rutina' 
                    : currentSlideIndex === totalSlides - 1 
                      ? 'Resumen Completo Final' 
                      : `${exercises[currentSlideIndex - 1]?.name} (${exercises[currentSlideIndex - 1]?.sets} × ${exercises[currentSlideIndex - 1]?.reps})`}
                </span>
              </div>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))}
                disabled={currentSlideIndex === totalSlides - 1}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-medium text-xs flex items-center gap-1 transition-colors"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Indicators Dots */}
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all rounded-full ${
                    currentSlideIndex === idx
                      ? 'w-6 h-2 bg-orange-500'
                      : 'w-2 h-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Active Slide Display Container */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-full max-w-sm sm:max-w-md shadow-xl relative">
                {currentSlideIndex === 0 && renderCoverSlide(0)}
                {currentSlideIndex > 0 && currentSlideIndex <= exercises.length && (
                  renderExerciseSlide(exercises[currentSlideIndex - 1], currentSlideIndex - 1, currentSlideIndex)
                )}
                {currentSlideIndex === totalSlides - 1 && renderSummarySlide(totalSlides - 1)}
              </div>

              {/* Single Slide Download Action */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingleSlide(currentSlideIndex)}
                  disabled={downloadingIndex === currentSlideIndex}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-orange-400" />
                  <span>
                    {downloadingIndex === currentSlideIndex 
                      ? 'Descargando diapositiva...' 
                      : `Descargar diapositiva #${currentSlideIndex + 1} en PNG`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: 10-Photo Gallery Grid */}
        {viewMode === 'gallery' && (
          <div className="space-y-4">
            <div className="text-center text-xs font-mono text-zinc-400">
              Las 10 imágenes del carrusel generadas con dimensiones amplias, visualizando claramente cada atleta y sus repeticiones.
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 rounded-xl border border-zinc-800 hover:border-orange-500/60 p-2 flex flex-col justify-between gap-2 transition-all group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="font-bold text-orange-400">#{idx + 1}</span>
                    <span className="truncate max-w-[90px]">
                      {idx === 0 ? 'Portada' : idx === totalSlides - 1 ? 'Resumen' : exercises[idx - 1]?.name}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setViewMode('slide');
                    }}
                    className="w-full aspect-[9/16] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform relative p-1"
                  >
                    {idx === 0 ? (
                      <div className="text-center p-2">
                        <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                        <span className="text-[10px] font-orbitron font-bold text-white block">PORTADA</span>
                      </div>
                    ) : idx === totalSlides - 1 ? (
                      <div className="text-center p-2">
                        <Check className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                        <span className="text-[10px] font-orbitron font-bold text-white block">RESUMEN</span>
                      </div>
                    ) : (
                      <MaskedAthleteIllustration
                        imageUrl={exercises[idx - 1]?.imageUrl}
                        pose={exercises[idx - 1]?.name || ''}
                        category={exercises[idx - 1]?.category || ''}
                        theme={theme}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => handleDownloadSingleSlide(idx)}
                    className="w-full py-1 rounded bg-zinc-900 hover:bg-orange-600 text-zinc-300 hover:text-white text-[10px] font-mono font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Descargar PNG</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
