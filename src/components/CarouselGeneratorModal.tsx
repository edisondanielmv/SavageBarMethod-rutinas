import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  X, 
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
} from 'lucide-react';
import { CalisthenicsRoutine, RoutineFocus, HudTheme, Exercise } from '../types/calisthenics';
import { MaskedAthleteIllustration } from './MaskedAthleteIllustration';
import { SavageEmblem } from './SavageEmblem';

interface CarouselGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine: CalisthenicsRoutine;
  focus: RoutineFocus;
  theme: HudTheme;
  initialMode?: 'preview' | 'download';
}

export const CarouselGeneratorModal: React.FC<CarouselGeneratorModalProps> = ({
  isOpen,
  onClose,
  routine,
  focus,
  theme,
  initialMode = 'preview',
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
  const [copiedCaption, setCopiedCaption] = useState(false);

  const totalSlides = 1 + (routine?.exercises?.length || 8) + 1; // Cover (1) + Exercises (8) + Summary Recap (1) = 10 slides

  // Auto-trigger zip download if requested via initialMode
  React.useEffect(() => {
    if (isOpen && initialMode === 'download') {
      handleDownloadAllAsZip();
    }
  }, [isOpen, initialMode]);

  // Keyboard navigation for carousel slides
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalSlides]);

  // Hidden container holding all slides for clean DOM offscreen capture
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!isOpen) return null;

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
  }[theme];

  // Helper to format exercise metrics
  const cleanMetric = (val: string, fallback: string) => {
    return (val || fallback).replace(/^(Sets|Reps|Load):\s*/i, '').trim().toUpperCase();
  };

  // Generate and download individual slide
  const handleDownloadSingleSlide = async (index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;

    try {
      const dataUrl = await toPng(el, {
        quality: 0.98,
        pixelRatio: 2.2,
        backgroundColor: '#050608',
        skipFonts: true,
      });

      const link = document.createElement('a');
      link.download = `savage-carousel-slide-${String(index + 1).padStart(2, '0')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading single slide:', err);
    }
  };

  // Generate and package entire carousel into a ZIP file
  const handleDownloadAllAsZip = async () => {
    setIsZipping(true);
    setZipProgress({ current: 0, total: totalSlides, label: 'Iniciando generación de slides...' });

    try {
      const zip = new JSZip();
      const folderName = `savage-carrusel-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const zipFolder = zip.folder(folderName) || zip;

      // Render each slide sequentially
      for (let i = 0; i < totalSlides; i++) {
        const el = slideRefs.current[i];
        if (!el) continue;

        let slideName = '';
        if (i === 0) {
          slideName = '01_portada_hook.png';
        } else if (i === totalSlides - 1) {
          slideName = `${String(totalSlides).padStart(2, '0')}_resumen_protocolo_completo.png`;
        } else {
          const ex = exercises[i - 1];
          const cleanExName = ex ? ex.name.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'ejercicio';
          slideName = `${String(i + 1).padStart(2, '0')}_estacion_${cleanExName}.png`;
        }

        setZipProgress({
          current: i + 1,
          total: totalSlides,
          label: `Renderizando slide ${i + 1} de ${totalSlides}: ${slideName.replace('.png', '')}`,
        });

        // Small pause to guarantee DOM paint
        await new Promise((r) => setTimeout(r, 80));

        const dataUrl = await toPng(el, {
          quality: 0.96,
          pixelRatio: 2.0, // Crisp 1080x1920 Full HD
          backgroundColor: '#050608',
          skipFonts: true,
        });

        // Convert base64 dataUrl to pure binary data
        const base64Data = dataUrl.split(',')[1];
        zipFolder.file(slideName, base64Data, { base64: true });
      }

      // Add a handy README with social media copy for posting
      setZipProgress({
        current: totalSlides,
        total: totalSlides,
        label: 'Añadiendo archivo de texto con título, descripción y hashtags...',
      });

      const socialCopy = `🔥 SAVAGE BAR METHOD — ${title.toUpperCase()} | ${subtitle.toUpperCase()}
⚡ PROTOCOLO OFICIAL EN CARRUSEL (DESLIZA PARA VER LOS 8 EJERCICIOS)

📋 ORDEN DE LAS SLIDES EN ESTE ARCHIVO ZIP:
Slide 01: Portada y Gancho del Protocolo
Slide 02 a 09: Las 8 Estaciones con Técnica, Series, Repeticiones y Tips
Slide 10: Resumen Completo y Checklist de Entrenamiento

⚙️ REGLAS DEL CIRCUITO:
• ${circuitRule}
• ${restRule}

💪 DESGLOSE DE EJERCICIOS:
${exercises
  .map((e, idx) => `${idx + 1}. ${e.name} — ${e.sets} | ${e.reps}${e.load ? ` (${e.load})` : ''}\n   Técnica: ${e.technicalCue}`)
  .join('\n\n')}

Hashtags recomendados:
#SavageBarMethod #Calisthenics #Calistenia #StreetWorkout #MuscleUp #FrontLever #Planche #FitnessTok #GymTok #Entrenamiento`;

      zipFolder.file('TEXTO_PUBLICACION_TIKTOK_INSTAGRAM.txt', socialCopy);

      setZipProgress({
        current: totalSlides,
        total: totalSlides,
        label: 'Comprimiendo archivo ZIP...',
      });

      const zipBlob = await zip.generateAsync(
        { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
        (meta) => {
          setZipProgress({
            current: totalSlides,
            total: totalSlides,
            label: `Comprimiendo... ${Math.round(meta.percent)}%`,
          });
        }
      );

      // Trigger instant download
      const filename = `carrusel-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-10-slides.zip`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(zipBlob);
      link.click();
      URL.revokeObjectURL(link.href);

      // Trigger Confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [themeStyles.colorHex, '#ffffff', '#ff9800'],
      });
    } catch (err) {
      console.error('Failed to generate ZIP carousel:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Copy TikTok / Instagram Caption to clipboard
  const handleCopyCaption = () => {
    const text = `🔥 ${title.toUpperCase()} — ${subtitle.toUpperCase()} | SAVAGE BAR METHOD
⚡ Desliza para ver la técnica y parámetros de los 8 ejercicios.
Guarda este carrusel para tu próxima sesión en las barras. 💥

#SavageBarMethod #Calisthenics #StreetWorkout #FitnessTok #GymTok #WorkoutRoutine`;
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-hud select-none">
      <div 
        className="relative w-full max-w-4xl bg-[#090b10] border-2 border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-4 py-3 border-b border-zinc-800/90 bg-gradient-to-r from-zinc-950 via-[#0d1017] to-zinc-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-1.5 rounded-xl ${themeStyles.bgAccent} text-black font-black flex items-center justify-center flex-shrink-0 shadow-md`}>
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-white font-orbitron truncate flex items-center gap-2">
                <span>ESTUDIO DE CARRUSELES (SLIDES)</span>
                <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 font-mono font-bold">
                  10 SLIDES • .ZIP
                </span>
              </h2>
              <p className="text-[11px] text-zinc-400 truncate">
                Imágenes ampliadas y detalladas estación por estación para TikTok, Instagram y YouTube
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* View Mode Switcher: Single Slide vs Full Gallery */}
            <div className="flex items-center bg-black/80 p-0.5 rounded-lg border border-zinc-800 text-[10px] font-mono">
              <button
                onClick={() => setViewMode('slide')}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'slide' ? `${themeStyles.bgAccent} text-black font-bold` : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Slide</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  viewMode === 'gallery' ? `${themeStyles.bgAccent} text-black font-bold` : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Galería ({totalSlides})</span>
              </button>
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="hidden sm:flex items-center bg-black/80 p-0.5 rounded-lg border border-zinc-800 text-[10px] font-mono">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2 py-1 rounded transition-colors ${aspectRatio === '9:16' ? `${themeStyles.bgAccent} text-black font-bold` : 'text-zinc-400 hover:text-white'}`}
              >
                9:16
              </button>
              <button
                onClick={() => setAspectRatio('4:5')}
                className={`px-2 py-1 rounded transition-colors ${aspectRatio === '4:5' ? `${themeStyles.bgAccent} text-black font-bold` : 'text-zinc-400 hover:text-white'}`}
              >
                4:5
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Interactive Viewport */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between gap-4 bg-[#050609]">
          
          {viewMode === 'gallery' ? (
            /* ALL 10 SLIDES GALLERY GRID VIEW */
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
                <span className="font-bold text-white font-orbitron uppercase">
                  Galería de Fotos del Carrusel (10 Diapositivas):
                </span>
                <span className="text-[11px] text-orange-400 font-semibold">
                  Toca cualquier foto para ampliarla y ver sus detalles
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setViewMode('slide');
                    }}
                    className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.03] shadow-lg flex flex-col justify-between ${
                      currentSlideIndex === idx
                        ? `${themeStyles.border} shadow-[0_0_20px_rgba(255,87,34,0.4)]`
                        : 'border-zinc-800 hover:border-zinc-600 bg-[#06070a]'
                    } ${aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}
                  >
                    {/* Scaled Preview */}
                    <div className="w-full h-full pointer-events-none select-none text-[6px]">
                      {renderSlideContent(idx, routine, theme, themeStyles, totalSlides)}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 z-30 backdrop-blur-[1px]">
                      <span className="p-2 rounded-full bg-orange-600 text-white shadow-xl">
                        <Eye className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-black text-white font-orbitron uppercase tracking-wider">
                        Ver Slide #{idx + 1}
                      </span>
                    </div>

                    {/* Slide Tag */}
                    <div className="absolute top-1 left-1 z-20 px-1.5 py-0.5 rounded bg-black/90 border border-zinc-700 text-[8px] font-mono font-bold text-white shadow-md">
                      {idx === 0 ? 'Portada' : idx === totalSlides - 1 ? 'Resumen' : `Estación 0${idx}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* SINGLE SLIDE STAGE */
            <>
              <div className="relative w-full flex items-center justify-center">
                
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className="absolute left-1 sm:left-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-black border border-zinc-700 text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Slide Frame (Strict 9:16 or 4:5 ratio) */}
                <div 
                  className={`relative ${
                    aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[62vh] sm:max-h-[65vh]' : 'aspect-[4/5] max-h-[62vh] sm:max-h-[65vh]'
                  } w-auto rounded-2xl overflow-hidden border-2 ${themeStyles.border} ${themeStyles.glow} shadow-2xl bg-[#050608] flex flex-col justify-between`}
                >
                  {/* CURRENT ACTIVE SLIDE CONTENT */}
                  {renderSlideContent(currentSlideIndex, routine, theme, themeStyles, totalSlides)}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))}
                  disabled={currentSlideIndex === totalSlides - 1}
                  className="absolute right-1 sm:right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-black border border-zinc-700 text-white disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Indicator & Quick Thumbnail Navigator */}
              <div className="w-full flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="font-bold text-white font-orbitron">
                    Slide {currentSlideIndex + 1} de {totalSlides}:
                  </span>
                  <span className={`${themeStyles.textAccent} font-bold`}>
                    {currentSlideIndex === 0 
                      ? 'Portada y Gancho de Entrada' 
                      : currentSlideIndex === totalSlides - 1 
                      ? 'Resumen Completo del Protocolo' 
                      : `Estación ${currentSlideIndex}: ${exercises[currentSlideIndex - 1]?.name}`}
                  </span>
                </div>

                {/* Thumbnail Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold transition-all flex items-center gap-1 ${
                        currentSlideIndex === idx
                          ? `${themeStyles.bgAccent} text-black shadow-md scale-105`
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <span>{idx === 0 ? 'Portada' : idx === totalSlides - 1 ? 'Resumen' : `#${idx}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Footer */}
        <div className="px-4 py-3 border-t border-zinc-800 bg-[#07090e] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCaption}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5 text-orange-400" />}
              <span>{copiedCaption ? '¡Copiado!' : 'Copiar Texto para Post'}</span>
            </button>

            <button
              onClick={() => handleDownloadSingleSlide(currentSlideIndex)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Descargar esta Slide (PNG)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Action: Download All as ZIP */}
            <button
              onClick={handleDownloadAllAsZip}
              disabled={isZipping}
              className={`px-5 py-2.5 rounded-xl font-black text-xs font-orbitron uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
                isZipping
                  ? 'bg-zinc-800 text-zinc-400 cursor-wait'
                  : 'bg-gradient-to-r from-orange-600 via-[#ff5722] to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:scale-[1.02] active:scale-95'
              }`}
            >
              <Package className={`w-4 h-4 ${isZipping ? 'animate-spin' : ''}`} />
              <span>{isZipping ? 'GENERANDO ZIP...' : 'DESCARGAR CARRUSEL (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Zipping Progress Overlay */}
        {isZipping && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin mb-4" />
            <h3 className="text-base sm:text-lg font-black text-white font-orbitron uppercase tracking-wide">
              Generando Carrusel en Alta Resolución (1080x1920)
            </h3>
            <p className="text-xs text-orange-400 font-mono mt-1 mb-4">
              {zipProgress.label}
            </p>
            <div className="w-64 bg-zinc-900 rounded-full h-2.5 border border-zinc-800 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
                style={{ width: `${(zipProgress.current / zipProgress.total) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-2">
              Slide {zipProgress.current} de {zipProgress.total} procesadas
            </span>
          </div>
        )}

        {/* =========================================================================
            OFFSCREEN RENDER ENCLAVE:
            Renders all 10 slides into the DOM so html-to-image can capture
            pixel-perfect 1080x1920 full-HD PNG images with zero visual distortion.
            ========================================================================= */}
        <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-100 flex flex-col gap-10">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              style={{ width: '1080px', height: '1920px' }}
              className="bg-[#050608] text-zinc-100 font-hud select-none flex flex-col justify-between overflow-hidden relative"
            >
              {renderSlideContent(idx, routine, theme, themeStyles, totalSlides, true)}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// SLIDE RENDERER FUNCTION:
// Produces 3 types of slides:
// 1. Cover Slide (Hook, Branding, Title, Rules overview)
// 2. Individual Station Slide (Huge image, detailed cues, muscle targets, progression tip)
// 3. Recap Slide (Full 8-exercise matrix, rounds & rest summary, call to action)
// =========================================================================
function renderSlideContent(
  index: number,
  routine: CalisthenicsRoutine,
  theme: HudTheme,
  themeStyles: any,
  totalSlides: number,
  isExport = false
) {
  const { title, subtitle, circuitRule, restRule, exercises } = routine;
  const isCover = index === 0;
  const isRecap = index === totalSlides - 1;
  const exerciseIndex = index - 1;
  const exercise = !isCover && !isRecap ? exercises[exerciseIndex] : null;

  // Base font sizing scaler for export (1080x1920) vs interactive preview
  const titleClass = isExport ? 'text-4xl' : 'text-xs sm:text-sm';
  const subtitleClass = isExport ? 'text-2xl' : 'text-[9.5px] sm:text-[10px]';
  const bodyClass = isExport ? 'text-xl' : 'text-[8.5px] sm:text-[9.5px]';

  // SLIDE 1: COVER SLIDE (PORTADA / HOOK)
  if (isCover) {
    return (
      <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#080a10] via-[#050608] to-black overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* Central Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <SavageEmblem size={isExport ? 450 : 160} />
        </div>

        {/* Top Branding Row */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-zinc-700 bg-black flex items-center justify-center">
              <SavageEmblem size={isExport ? 32 : 18} />
            </div>
            <div>
              <span className="text-[7.5px] sm:text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest block leading-none">
                SAVAGE PROTOCOL
              </span>
              <span className={`text-[9px] sm:text-xs font-black uppercase tracking-wider ${themeStyles.textAccent} font-orbitron block leading-tight`}>
                SAVAGE BAR METHOD
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] sm:text-[9.5px] font-mono text-zinc-400 font-bold">
            01 / {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
          </span>
        </div>

        {/* Main Cover Hook */}
        <div className="relative z-10 my-auto text-center space-y-3 px-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/40 text-[8px] sm:text-[10px] font-bold text-orange-400 font-mono tracking-wider uppercase">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>FULL CALISTHENICS CAROUSEL</span>
          </div>

          <h1 className={`font-black uppercase tracking-wide font-orbitron ${themeStyles.textAccent} leading-none ${isExport ? 'text-6xl' : 'text-base sm:text-xl'}`}>
            {title}
          </h1>

          <p className={`font-extrabold uppercase tracking-wider text-zinc-200 font-teko leading-tight ${isExport ? 'text-3xl' : 'text-xs sm:text-sm'}`}>
            {subtitle}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-1.5 max-w-[320px] mx-auto pt-2">
            <div className="p-2 rounded-xl bg-black/80 border border-zinc-800 text-center">
              <span className="text-[7px] sm:text-[8px] font-mono text-zinc-500 block uppercase">ESTACIONES</span>
              <span className="text-xs sm:text-sm font-black text-white font-orbitron">8 EJERCICIOS</span>
            </div>
            <div className="p-2 rounded-xl bg-black/80 border border-zinc-800 text-center">
              <span className="text-[7px] sm:text-[8px] font-mono text-zinc-500 block uppercase">VOLUMEN</span>
              <span className={`text-xs sm:text-sm font-black ${themeStyles.textAccent} font-orbitron`}>3-4 ROUNDS</span>
            </div>
            <div className="p-2 rounded-xl bg-black/80 border border-zinc-800 text-center">
              <span className="text-[7px] sm:text-[8px] font-mono text-zinc-500 block uppercase">DESCANSO</span>
              <span className="text-xs sm:text-sm font-black text-amber-400 font-orbitron">CONTROLADO</span>
            </div>
          </div>
        </div>

        {/* Bottom Call-to-Action Bar */}
        <div className="relative z-10 pt-2 border-t border-zinc-800/80 text-center space-y-1">
          <div className={`flex items-center justify-center gap-1.5 ${themeStyles.textAccent} font-black font-orbitron uppercase tracking-widest text-[9px] sm:text-xs animate-pulse`}>
            <span>DESLIZA PARA VER LA RUTINA COMPLETA</span>
            <span>➔</span>
          </div>
          <span className="text-[7px] sm:text-[8px] font-mono text-zinc-600 uppercase tracking-widest block">
            FORMATO VERTICAL 9:16 • SAVAGE ATHLETE ENGINE
          </span>
        </div>
      </div>
    );
  }

  // SLIDE 10: RECAP & SUMMARY SLIDE (RESUMEN / CHECKLIST / OUTRO)
  if (isRecap) {
    return (
      <div className="relative w-full h-full flex flex-col justify-between p-3.5 sm:p-5 bg-gradient-to-b from-[#080a10] via-[#050608] to-black overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className={`w-4 h-4 ${themeStyles.textAccent}`} />
            <span className="text-[8.5px] sm:text-[10px] font-black font-orbitron text-white uppercase tracking-wider">
              RESUMEN COMPLETO DEL PROTOCOLO
            </span>
          </div>
          <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-[7.5px] sm:text-[8.5px] font-mono text-zinc-400 font-bold">
            {totalSlides} / {totalSlides}
          </span>
        </div>

        {/* 8-Exercise Recap Table */}
        <div className="relative z-10 flex-1 my-2 flex flex-col justify-between overflow-hidden">
          <div className="space-y-1 sm:space-y-1.5 overflow-hidden">
            {exercises.slice(0, 8).map((ex, idx) => (
              <div 
                key={ex.id || idx}
                className="flex items-center justify-between p-1.5 rounded-lg bg-black/80 border border-zinc-800/90 text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-4 h-4 rounded text-[8px] font-black font-orbitron ${themeStyles.bgAccent} text-black flex items-center justify-center flex-shrink-0`}>
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[9.5px] font-black text-white font-orbitron uppercase block truncate">
                      {ex.name}
                    </span>
                    <span className="text-[6.5px] sm:text-[7.5px] font-mono text-zinc-400 uppercase">
                      {ex.category} {ex.load && ex.load !== '0 Kg' && ex.load !== 'Bodyweight' ? `• ${ex.load}` : ''}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 pl-2">
                  <span className={`text-[7.5px] sm:text-[8.5px] font-black font-orbitron ${themeStyles.textAccent} block`}>
                    {ex.sets.replace(/Sets:\s*/i, '')} × {ex.reps.replace(/Reps:\s*/i, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Protocol Rules Callout */}
          <div className="mt-2 p-2 rounded-xl bg-orange-950/20 border border-orange-500/40 text-center space-y-0.5">
            <span className="text-[7.5px] sm:text-[8.5px] font-mono text-orange-400 font-bold uppercase block">
              ⚡ {circuitRule}
            </span>
            <span className="text-[7px] sm:text-[7.5px] font-mono text-zinc-400 block">
              ⏱️ {restRule}
            </span>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="relative z-10 pt-2 border-t border-zinc-800/80 text-center space-y-1 flex-shrink-0">
          <p className="text-[8.5px] sm:text-[10px] font-black uppercase text-white font-orbitron tracking-wider">
            GUARDA ESTE POST Y PRUÉBALO EN LAS BARRAS
          </p>
          <div className="flex items-center justify-center gap-2 text-[7.5px] font-mono text-zinc-500">
            <span>@SavageBarMethod</span>
            <span>•</span>
            <span>TikTok | Instagram | YouTube</span>
          </div>
        </div>
      </div>
    );
  }

  // SLIDES 2 TO 9: DEDICATED STATION DETAIL SLIDE
  if (!exercise) return null;

  const stationNum = exerciseIndex + 1;
  const stationStr = stationNum < 10 ? `0${stationNum}` : `${stationNum}`;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-4 bg-gradient-to-b from-[#090b10] via-[#050608] to-black overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* 1. Station Slide Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-1.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black font-orbitron ${themeStyles.bgAccent} text-black leading-none`}>
            ESTACIÓN {stationStr} DE 08
          </span>
          <span className="text-[7px] sm:text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            {exercise.category}
          </span>
        </div>

        <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-[7px] sm:text-[8px] font-mono text-zinc-400 font-bold">
          {index + 1} / {totalSlides}
        </span>
      </div>

      {/* 2. Exercise Title & Load Banner */}
      <div className="relative z-10 my-1 text-center flex-shrink-0">
        <h2 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-orbitron leading-tight drop-shadow-md">
          {exercise.name}
        </h2>
        {exercise.load && exercise.load !== '0 Kg' && exercise.load !== 'Load: 0 Kg' && (
          <div className="mt-0.5 inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-orange-500/20 border border-orange-500/60 text-[7px] sm:text-[8px] font-mono font-bold text-orange-400">
            <Dumbbell className="w-2.5 h-2.5" />
            <span>CARGA / LASTRE: {exercise.load.replace(/^Load:\s*/i, '')}</span>
          </div>
        )}
      </div>

      {/* 3. HERO ATHLETE ILLUSTRATION: Enormous, uncropped, high-resolution movement view */}
      <div className="relative w-full flex-1 min-h-[140px] rounded-xl overflow-hidden bg-black border-2 border-zinc-800/90 shadow-2xl my-1 group">
        <MaskedAthleteIllustration
          pose={exercise.illustrationKey || exercise.name}
          theme={theme}
          load={exercise.load}
          category={exercise.category}
          imageUrl={exercise.imageUrl}
          svgGraphic={exercise.aiGraphicSvg}
          className="w-full h-full"
        />

        {/* Floating Technique Tag */}
        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-zinc-700 text-[6.5px] sm:text-[7.5px] font-mono font-bold text-zinc-300 shadow-md">
          TÉCNICA ESTRICTA
        </div>
      </div>

      {/* 4. Detailed HUD Metrics Grid (4 Key Indicators) */}
      <div className="relative z-10 grid grid-cols-3 gap-1 my-1 flex-shrink-0">
        <div className="p-1.5 rounded-lg bg-black/90 border border-zinc-800 text-center">
          <span className="text-[6.5px] sm:text-[7px] font-mono text-zinc-500 block uppercase font-bold">SERIES</span>
          <span className="text-[9px] sm:text-[11px] font-black text-white font-orbitron">
            {exercise.sets.replace(/^Sets:\s*/i, '')}
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-black/90 border border-zinc-800 text-center">
          <span className="text-[6.5px] sm:text-[7px] font-mono text-zinc-500 block uppercase font-bold">REPETICIONES</span>
          <span className={`text-[9px] sm:text-[11px] font-black ${themeStyles.textAccent} font-orbitron`}>
            {exercise.reps.replace(/^Reps:\s*/i, '')}
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-black/90 border border-zinc-800 text-center">
          <span className="text-[6.5px] sm:text-[7px] font-mono text-zinc-500 block uppercase font-bold">DESCANSO</span>
          <span className="text-[9px] sm:text-[11px] font-black text-amber-400 font-orbitron">
            60-90S
          </span>
        </div>
      </div>

      {/* 5. Step-by-Step Technical Instructions Box */}
      <div className="relative z-10 p-2 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-left space-y-1 flex-shrink-0">
        <div className="flex items-center gap-1 text-[7px] sm:text-[7.5px] font-mono text-zinc-400 font-bold uppercase">
          <Target className="w-2.5 h-2.5 text-orange-400" />
          <span>MÚSCULO OBJETIVO: <span className="text-zinc-200">{exercise.muscleTarget || 'Cuerpo Completo & Core'}</span></span>
        </div>

        <p className="text-[7.5px] sm:text-[8.5px] text-zinc-300 leading-snug font-mono italic">
          💡 <span className="text-white font-semibold">{exercise.technicalCue}</span>
        </p>

        {exercise.progressionTip && (
          <p className="text-[7px] sm:text-[7.5px] text-orange-300/90 leading-tight font-mono">
            🔥 Pro Tip: {exercise.progressionTip}
          </p>
        )}
      </div>

      {/* 6. Slide Footer */}
      <div className="relative z-10 pt-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider flex-shrink-0">
        <span>SAVAGE BAR METHOD</span>
        <span className={`${themeStyles.textAccent} font-bold`}>DESLIZA PARA SIGUIENTE ➔</span>
      </div>
    </div>
  );
}
