import React, { useState, useRef } from 'react';
import { CalisthenicsRoutine, Exercise, HudTheme, RoutineFocus } from './types/calisthenics';
import { PRESET_ROUTINES } from './data/presetRoutines';
import { generateDynamicRoutine, EXERCISE_TEMPLATES } from './data/routineGenerator';
import { TacticalPoster } from './components/TacticalPoster';
import { RoutineGeneratorControls } from './components/RoutineGeneratorControls';
import { ExerciseModal } from './components/ExerciseModal';
import { ExportPreviewModal } from './components/ExportPreviewModal';
import { VideoDescriptionModal } from './components/VideoDescriptionModal';
import { SequentialGenerationModal } from './components/SequentialGenerationModal';
import { RoutineReadyModal } from './components/RoutineReadyModal';
import { CarouselGeneratorModal } from './components/CarouselGeneratorModal';
import { SavedRoutinesHistory } from './components/SavedRoutinesHistory';
import { generateAIGraphicForExercise } from './services/aiGraphicService';
import { getAIImageForExercise } from './services/aiImageRegistry';
import { SavageEmblem } from './components/SavageEmblem';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Sparkles, 
  Download, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  FileText,
  Layers,
  History,
  Smartphone,
} from 'lucide-react';

import { NavigationMenu, AppTab } from './components/NavigationMenu';
import { CarouselTabContent } from './components/CarouselTabContent';

export default function App() {
  // Navigation Menu Tab state: exactly 3 tabs: 'generator' | 'poster' | 'saved'
  const [activeTab, setActiveTab] = useState<AppTab>('generator');

  // Presentation format inside the Poster tab: 'poster' (9:16 single poster) | 'carousel' (10-slide deck)
  const [posterPresentationMode, setPosterPresentationMode] = useState<'poster' | 'carousel'>('poster');

  // Persistent storage for the last 5 generated routines
  const [savedRoutines, setSavedRoutines] = useState<CalisthenicsRoutine[]>(() => {
    try {
      const rawV2 = localStorage.getItem('savage_saved_routines_v2');
      if (rawV2) {
        const parsed = JSON.parse(rawV2);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
      const rawV1 = localStorage.getItem('savage_saved_routines_v1');
      if (rawV1) {
        const parsed = JSON.parse(rawV1);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 5);
        }
      }
    } catch (e) {
      console.warn('Could not read saved routines from localStorage:', e);
    }
    // Default seed with official presets so the slots are populated
    const seed = PRESET_ROUTINES.slice(0, 2);
    try {
      localStorage.setItem('savage_saved_routines_v2', JSON.stringify(seed));
    } catch (e) {}
    return seed;
  });

  // Current active routine (defaults to most recently saved routine or official Savage Tomato)
  const tomatoPreset = PRESET_ROUTINES.find((p) => p.theme === 'orange') || PRESET_ROUTINES[0];
  const [currentRoutine, setCurrentRoutine] = useState<CalisthenicsRoutine>(() => {
    try {
      const rawV2 = localStorage.getItem('savage_saved_routines_v2');
      if (rawV2) {
        const parsed = JSON.parse(rawV2);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      }
      const rawV1 = localStorage.getItem('savage_saved_routines_v1');
      if (rawV1) {
        const parsed = JSON.parse(rawV1);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      }
    } catch (e) {}
    return tomatoPreset;
  });

  // Delete a routine from the 5 saved slots
  const handleDeleteSavedRoutine = (routineId: string) => {
    setSavedRoutines((prev) => {
      const updated = prev.filter((r) => r.id !== routineId);
      try {
        localStorage.setItem('savage_saved_routines_v2', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to update localStorage:', err);
      }
      return updated;
    });
    showToast('Rutina eliminada del historial', 'info');
  };

  // Clear all routines from saved history
  const handleClearAllSavedRoutines = () => {
    setSavedRoutines([]);
    try {
      localStorage.setItem('savage_saved_routines_v2', JSON.stringify([]));
    } catch (err) {
      console.warn('Failed to clear localStorage:', err);
    }
    showToast('Todas las rutinas guardadas han sido eliminadas', 'info');
  };

  // Restore official starter preset routines
  const handleRestoreStarterPresets = () => {
    const seed = PRESET_ROUTINES.slice(0, 2);
    setSavedRoutines(seed);
    try {
      localStorage.setItem('savage_saved_routines_v2', JSON.stringify(seed));
    } catch (e) {}
    showToast('Rutinas oficiales de ejemplo restauradas', 'success');
  };
  
  // Generation configuration state (standardized to 8 exercises for full name visibility)
  const [exerciseCount, setExerciseCount] = useState<number>(() => currentRoutine.exercises.length || 8);
  const [theme, setTheme] = useState<HudTheme>(() => currentRoutine.theme || 'orange');
  const [focus, setFocus] = useState<RoutineFocus>('todo-el-cuerpo');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showTikTokOverlay, setShowTikTokOverlay] = useState<boolean>(false);
  const [safeZoneMode, setSafeZoneMode] = useState<'tiktok' | 'full'>('tiktok');

  // Interactive Workout Tracker state
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  
  // History of recently generated exercises to guarantee non-repeating routines
  const [recentExerciseNames, setRecentExerciseNames] = useState<string[]>([]);
  
  // Modal states
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showProgressionModal, setShowProgressionModal] = useState<boolean>(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [showReadyModal, setShowReadyModal] = useState<boolean>(false);
  const [showCarouselModal, setShowCarouselModal] = useState<boolean>(false);
  const [carouselInitialMode, setCarouselInitialMode] = useState<'preview' | 'download'>('preview');
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null);
  const [exportFilename, setExportFilename] = useState<string>('savage-routine-9x16.png');
  
  // Loading & notification states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sequential 1-by-1 image generation pipeline states
  const [exercisesToGenerate, setExercisesToGenerate] = useState<Exercise[]>(tomatoPreset.exercises);
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [completedStationIds, setCompletedStationIds] = useState<string[]>([]);
  const [isAssemblingMatrix, setIsAssemblingMatrix] = useState<boolean>(false);

  // Ref to the poster DOM node for HD PNG image capture
  const posterRef = useRef<HTMLDivElement | null>(null);

  // Show temporary toast notification
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Toggle exercise completion
  const handleToggleExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const updated = { ...prev, [exerciseId]: !prev[exerciseId] };
      
      const total = currentRoutine.exercises.length;
      const doneCount = currentRoutine.exercises.filter((ex) => updated[ex.id]).length;
      
      if (doneCount === total && total > 0) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#ff6b00', '#00ff66', '#ffffff'],
        });
        showToast('100% ROUTINE COMPLETED! Maximum Savage respect.', 'success');
      }

      return updated;
    });
  };

  // Reset completion status
  const handleResetCompleted = () => {
    setCompletedExercises({});
    showToast('Session progress reset', 'info');
  };

  // Load a preset routine
  const handleLoadPreset = (presetId: string) => {
    const found = PRESET_ROUTINES.find((p) => p.id === presetId);
    if (found) {
      setCurrentRoutine(found);
      setTheme(found.theme);
      setExerciseCount(found.exerciseCount);
      setCompletedExercises({});
      showToast(`Poster loaded: ${found.title}`, 'success');
      setPosterPresentationMode('poster');
      setActiveTab('poster');
    }
  };

  // Switch to a previously saved generated routine
  const handleSelectSavedRoutine = (routine: CalisthenicsRoutine, mode: 'poster' | 'carousel' = 'poster') => {
    setCurrentRoutine(routine);
    setTheme(routine.theme);
    setExerciseCount(routine.exerciseCount || 8);
    setCompletedExercises({});
    showToast(`Rutina cargada: ${routine.title}`, 'success');
    setPosterPresentationMode(mode);
    setActiveTab('poster');
  };

  // Update a single exercise
  const handleUpdateExercise = (updated: Exercise) => {
    setCurrentRoutine((prev) => ({
      ...prev,
      exercises: prev.exercises.map((e) => (e.id === updated.id ? updated : e)),
    }));
    setSelectedExercise(updated);
    showToast(`Exercise updated: ${updated.name}`, 'success');
  };

  // Dynamic intelligent algorithm to assemble a fresh non-repeating routine
  const getFallbackRoutine = (): CalisthenicsRoutine => {
    const previous = recentExerciseNames.length > 0 
      ? recentExerciseNames 
      : currentRoutine.exercises.map((e) => e.name);

    return generateDynamicRoutine({
      focus,
      exerciseCount,
      theme,
      customPrompt,
      previousExerciseNames: previous,
    });
  };

  // Generate Routine with AI or Smart Dynamic Generator with 1-by-1 sequential image synthesis
  const handleGenerateRoutine = async () => {
    setIsGenerating(true);
    setCompletedExercises({});
    setCurrentStationIndex(0);
    setCompletedStationIds([]);
    setIsAssemblingMatrix(false);

    let candidateRoutine: CalisthenicsRoutine;

    try {
      const response = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseCount,
          focus,
          customPrompt,
          theme,
          difficulty: 'advanced',
          circuitStyle: 'savage-circuit',
          previousExercises: recentExerciseNames,
        }),
      });

      const result = await response.json();

      if (result.success && result.data && Array.isArray(result.data.exercises) && result.data.exercises.length > 0) {
        const generated = result.data;
        candidateRoutine = {
          id: `ai-routine-${Date.now()}`,
          title: generated.title || 'SAVAGE CIRCUIT',
          subtitle: generated.subtitle || `FOCUS: ${focus.toUpperCase()}`,
          theme: theme,
          exerciseCount: generated.exercises.length,
          circuitRule: generated.circuitRule || `${generated.exercises.length}-STATION CIRCUIT • REPEAT 3 ROUNDS`,
          restRule: generated.restRule || 'REST 3-5 MINS BETWEEN ROUNDS • MINIMAL PAUSE',
          globalProgressionGuide: generated.globalProgressionGuide || [
            'Week 1-2: 2 rounds with controlled rest intervals.',
            'Week 3-4: 3 complete rounds with strict technique.',
            'Week 5-6: Increase volume or add resistance load.',
          ],
          exercises: (() => {
            const seenImages = new Set<string>();
            const list: Exercise[] = [];

            for (let idx = 0; idx < generated.exercises.length; idx++) {
              const ex = generated.exercises[idx];
              let exName = (ex.name || 'BAR MUSCLE-UPS').toUpperCase();
              let exCategory = ex.category || 'Pull';
              let exLoad = ex.load || 'Load: 0 Kg';
              let exKey = ex.illustrationKey || 'muscle_up';
              let img = getAIImageForExercise(exName, exCategory, exKey);

              // If image already used in this routine, swap to an unused movement template
              if (seenImages.has(img)) {
                const unusedTemplate = EXERCISE_TEMPLATES.find((t) => {
                  const tImg = getAIImageForExercise(t.baseName, t.category, t.illustrationKey);
                  return !seenImages.has(tImg);
                });
                if (unusedTemplate) {
                  exName = unusedTemplate.baseName;
                  exCategory = unusedTemplate.category;
                  exKey = unusedTemplate.illustrationKey;
                  exLoad = unusedTemplate.loadOptions[0] || 'Load: 0 Kg';
                  img = getAIImageForExercise(exName, exCategory, exKey);
                }
              }

              seenImages.add(img);

              const aiGraphic = generateAIGraphicForExercise(exName, exCategory, exKey, {
                themeColor: theme === 'orange' ? '#ff5722' : theme === 'green' ? '#00ff66' : theme === 'cyan' ? '#00e5ff' : '#ffb700',
                load: exLoad,
              });

              list.push({
                id: `gen-${idx + 1}-${Date.now()}`,
                order: idx + 1,
                name: exName,
                category: exCategory,
                sets: ex.sets || 'Sets: 4',
                reps: ex.reps || 'Reps: 10',
                load: exLoad,
                technicalCue: ex.technicalCue || 'Strict technical execution with tight hollow body posture.',
                progressionTip: ex.progressionTip || 'Add 1 repetition every 2 workout sessions.',
                muscleTarget: ex.muscleTarget || 'Lats, core, and arms',
                illustrationKey: exKey,
                imageUrl: img,
                aiGraphicSvg: aiGraphic,
              });
            }
            return list;
          })(),
          createdAt: new Date().toISOString(),
        };
      } else {
        candidateRoutine = getFallbackRoutine();
      }
    } catch (err) {
      console.warn('AI routine generation fallback:', err);
      candidateRoutine = getFallbackRoutine();
    }

    // Set the candidate exercises so the UI displays the 8 stations immediately
    setExercisesToGenerate(candidateRoutine.exercises);

    // ONE-BY-ONE SEQUENTIAL GENERATION:
    const exList = candidateRoutine.exercises;
    for (let i = 0; i < exList.length; i++) {
      setCurrentStationIndex(i);
      await new Promise((r) => setTimeout(r, 1400));
      setCompletedStationIds((prev) => [...prev, exList[i].id]);
    }

    // MATRIX ASSEMBLY PHASE:
    setIsAssemblingMatrix(true);
    await new Promise((r) => setTimeout(r, 1200));

    // Place all 8 into the routine state
    setCurrentRoutine(candidateRoutine);
    setRecentExerciseNames((prev) => [
      ...prev.slice(-25),
      ...candidateRoutine.exercises.map((e) => e.name),
    ]);

    // SAVE INTO PERSISTENT STORAGE (Keeps last 5 generated routines)
    setSavedRoutines((prev) => {
      const filtered = prev.filter((r) => r.id !== candidateRoutine.id && r.title !== candidateRoutine.title);
      const updated = [candidateRoutine, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('savage_saved_routines_v2', JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save routine in localStorage:', err);
      }
      return updated;
    });

    setIsGenerating(false);
    setIsAssemblingMatrix(false);
    setShowReadyModal(true);
    setPosterPresentationMode('poster');
    setActiveTab('poster');

    try {
      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ff5722', '#ff6b3d', '#ff8a65', '#ffffff'],
      });
    } catch (e) {
      // ignore
    }
    showToast(`8-station routine poster assembled successfully!`, 'success');
  };

  // Download & Export the ENTIRE poster strictly in 9:16 aspect ratio (1080x1920 px Full HD)
  const handleDownloadPoster = async () => {
    if (!posterRef.current) return;

    setIsExporting(true);
    showToast('Generating vertical 9:16 poster (1080x1920)...', 'info');

    try {
      // Ensure all images are pre-loaded and decoded
      const imgElements = posterRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(imgElements).map(async (img) => {
          if (img.complete && img.naturalHeight !== 0) return;
          try {
            if (img.decode) await img.decode();
          } catch (e) {
            // ignore
          }
        })
      );

      // Save previous TikTok overlay state and force it OFF for export clean look
      const prevOverlayState = showTikTokOverlay;
      if (showTikTokOverlay) setShowTikTokOverlay(false);

      // Short tick to ensure layout and GPU paint
      await new Promise((r) => setTimeout(r, 120));

      let rawDataUrl: string;
      try {
        rawDataUrl = await toPng(posterRef.current, {
          quality: 0.98,
          pixelRatio: 2.4, // 450 * 2.4 = 1080px, 800 * 2.4 = 1920px (Strict 9:16)
          cacheBust: false,
          backgroundColor: '#06070a',
          skipFonts: true,
        });
      } catch (firstErr) {
        console.warn('Initial export issue, retrying with 2x fallback:', firstErr);
        rawDataUrl = await toPng(posterRef.current, {
          quality: 0.95,
          pixelRatio: 2.0,
          cacheBust: false,
          backgroundColor: '#06070a',
          skipFonts: true,
        });
      }

      // Restore overlay state if it was active
      if (prevOverlayState) setShowTikTokOverlay(true);

      // Strictly calibrate to exact 1080 x 1920 px (9:16 standard format)
      let finalDataUrl = rawDataUrl;
      try {
        const exportImg = new Image();
        exportImg.src = rawDataUrl;
        await new Promise<void>((resolve, reject) => {
          if (exportImg.complete) {
            resolve();
          } else {
            exportImg.onload = () => resolve();
            exportImg.onerror = reject;
          }
        });

        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.fillStyle = '#06070a';
          ctx.fillRect(0, 0, 1080, 1920);
          ctx.drawImage(exportImg, 0, 0, 1080, 1920);
          finalDataUrl = canvas.toDataURL('image/png', 0.96);
        }
      } catch (canvasErr) {
        console.warn('Canvas 9:16 normalization fallback to raw export:', canvasErr);
      }

      const fname = `savage-routine-9x16-${focus}-${Date.now()}.png`;

      // Trigger instant automatic download
      const link = document.createElement('a');
      link.download = fname;
      link.href = finalDataUrl;
      link.click();

      // Also set preview modal
      setExportedImageUrl(finalDataUrl);
      setExportFilename(fname);

      showToast('9:16 poster (1080x1920) downloaded successfully!', 'success');
    } catch (err) {
      console.error('Failed to export poster image:', err);
      showToast('Error exporting image. Please try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const completedCount = currentRoutine.exercises.filter((e) => completedExercises[e.id]).length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-orange-600 selection:text-white font-sans">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 shadow-xl text-xs sm:text-sm animate-fadeIn">
          {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {notification.type === 'info' && <Sparkles className="w-4 h-4 text-orange-400" />}
          <span className="font-medium text-slate-200">{notification.message}</span>
        </div>
      )}

      {/* Top Application Bar - Clean Corporate Identity */}
      <header className="border-b border-slate-800 bg-[#0c1017] sticky top-0 z-40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-slate-700 bg-black overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
              <SavageEmblem size={26} />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate block">
                Savage Bar Method
              </span>
              <span className="text-[11px] text-slate-400 truncate block">
                Suite Profesional de Entrenamiento & Carruseles 9:16
              </span>
            </div>
          </div>

          {/* Active Routine Indicator (Uncluttered) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400 hidden sm:inline">Rutina activa:</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-orange-400 truncate max-w-[200px] sm:max-w-xs">
              {currentRoutine.title}
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Menu Bar */}
      <NavigationMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRoutines.length}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24 md:pb-12">
        
        {/* PESTAÑA 1: GENERADOR DE RUTINAS */}
        {activeTab === 'generator' && (
          <div className="space-y-4 animate-fadeIn">
            <RoutineGeneratorControls
              exerciseCount={exerciseCount}
              setExerciseCount={setExerciseCount}
              theme={theme}
              setTheme={(t) => {
                setTheme(t);
                setCurrentRoutine((prev) => ({ ...prev, theme: t }));
              }}
              focus={focus}
              setFocus={setFocus}
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
              isGenerating={isGenerating}
              onGenerate={handleGenerateRoutine}
              onResetCompleted={handleResetCompleted}
              completedCount={completedCount}
              totalCount={currentRoutine.exercises.length}
              onLoadPreset={handleLoadPreset}
            />
          </div>
        )}

        {/* PESTAÑA 2: PÓSTER Y CARRUSEL (DOS PRESENTACIONES DE LA MISMA RUTINA) */}
        {activeTab === 'poster' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Presentation Format Switcher */}
            <div className="max-w-xl mx-auto flex items-center justify-center">
              <div className="bg-[#121622] p-1 rounded-xl border border-slate-800 flex items-center gap-1.5 w-full sm:w-auto shadow-sm">
                <button
                  onClick={() => setPosterPresentationMode('poster')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    posterPresentationMode === 'poster'
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-orange-400" />
                  <span>Póster 9:16</span>
                </button>

                <button
                  onClick={() => setPosterPresentationMode('carousel')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    posterPresentationMode === 'carousel'
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span>Carrusel (10 Diapositivas)</span>
                </button>
              </div>
            </div>

            {/* Sub-view A: Formato Póster Vertical 9:16 */}
            {posterPresentationMode === 'poster' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Toolbar for Poster Screen */}
                <div className="max-w-2xl mx-auto space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#121622] border border-slate-800 rounded-xl p-3 shadow-sm">
                    {/* View Options */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setSafeZoneMode('tiktok')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            safeZoneMode === 'tiktok'
                              ? 'bg-slate-800 text-white font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Margen TikTok (17%)
                        </button>

                        <button
                          onClick={() => setSafeZoneMode('full')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            safeZoneMode === 'full'
                              ? 'bg-slate-800 text-white font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Lienzo 9:16
                        </button>
                      </div>

                      <button
                        onClick={() => setShowTikTokOverlay(!showTikTokOverlay)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                          showTikTokOverlay
                            ? 'bg-slate-800 border-slate-600 text-orange-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {showTikTokOverlay ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-orange-400" />
                            <span>Ocultar Guía</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            <span>Simular TikTok</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Poster Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowDescriptionModal(true)}
                        title="Copiar texto para la publicación"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span>Texto</span>
                      </button>

                      <button
                        onClick={handleDownloadPoster}
                        disabled={isExporting}
                        title="Descargar este póster vertical en Full HD 1080x1920"
                        className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
                        <span>{isExporting ? 'Exportando...' : 'Descargar Póster 9:16'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Resolución Full HD (1080×1920) calibrada para Reels, Shorts y TikTok
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {currentRoutine.exercises.length} estaciones
                    </span>
                  </div>
                </div>

                {/* Poster Canvas */}
                <div className="flex justify-center">
                  <TacticalPoster
                    routine={currentRoutine}
                    completedExercises={completedExercises}
                    onToggleExercise={handleToggleExercise}
                    onSelectExercise={(ex) => setSelectedExercise(ex)}
                    posterRef={posterRef}
                    layoutMode={layoutMode}
                    showTikTokOverlay={showTikTokOverlay}
                    safeZoneMode={safeZoneMode}
                  />
                </div>
              </div>
            )}

            {/* Sub-view B: Formato Carrusel (10 Diapositivas) */}
            {posterPresentationMode === 'carousel' && (
              <div className="space-y-4 animate-fadeIn">
                <CarouselTabContent
                  routine={currentRoutine}
                  focus={focus}
                  theme={theme}
                  onOpenModalPreview={() => {
                    setCarouselInitialMode('preview');
                    setShowCarouselModal(true);
                  }}
                  onOpenDescriptionModal={() => setShowDescriptionModal(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 3: HISTORIAL DE RUTINAS GUARDADAS */}
        {activeTab === 'saved' && (
          <div className="space-y-4 animate-fadeIn">
            <SavedRoutinesHistory
              savedRoutines={savedRoutines}
              currentRoutineId={currentRoutine.id}
              onSelectRoutine={(routine) => handleSelectSavedRoutine(routine, 'poster')}
              onOpenCarousel={(routine) => {
                if (routine) handleSelectSavedRoutine(routine, 'carousel');
              }}
              onDeleteRoutine={handleDeleteSavedRoutine}
              onClearAllRoutines={handleClearAllSavedRoutines}
              onRestorePresets={handleRestoreStarterPresets}
              onGoToGenerator={() => setActiveTab('generator')}
            />

            <div className="max-w-xl mx-auto bg-[#10141f] border border-slate-800 rounded-xl p-3.5 text-center text-xs text-slate-400">
              <p className="text-slate-300 font-semibold mb-1">
                Memoria Local Persistente (Hasta 5 cupos)
              </p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Cada rutina creada se guarda en tu navegador con sus repeticiones, series, cargas y fotos, lista para verse en formato Póster o Carrusel en cualquier momento.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Video Description & Hashtags Modal for TikTok / Reels */}
      <VideoDescriptionModal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        routine={currentRoutine}
        focus={focus}
      />

      {/* Exercise Detail & Biomechanics Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        theme={currentRoutine.theme}
        isCompleted={selectedExercise ? !!completedExercises[selectedExercise.id] : false}
        onClose={() => setSelectedExercise(null)}
        onToggleCompleted={(id) => handleToggleExercise(id)}
        onUpdateExercise={handleUpdateExercise}
      />

      {/* Interactive Sequential One-by-One Generation Modal */}
      <SequentialGenerationModal
        isOpen={isGenerating}
        focus={focus}
        exercisesToGenerate={exercisesToGenerate}
        currentStationIndex={currentStationIndex}
        completedStationIds={completedStationIds}
        isAssemblingMatrix={isAssemblingMatrix}
      />

      {/* Emergent Routine Ready Popup Notification Modal */}
      <RoutineReadyModal
        isOpen={showReadyModal}
        onClose={() => setShowReadyModal(false)}
        routine={currentRoutine}
        onViewPoster={() => {
          setPosterPresentationMode('poster');
          setActiveTab('poster');
          posterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        onOpenDescription={() => setShowDescriptionModal(true)}
        onDownloadPoster={handleDownloadPoster}
        onOpenCarousel={() => {
          setShowReadyModal(false);
          setPosterPresentationMode('carousel');
          setActiveTab('poster');
        }}
        onViewSaved={() => {
          setShowReadyModal(false);
          setActiveTab('saved');
        }}
      />

      {/* Social Media Multi-Slide Carousel Studio Modal (TikTok, Instagram & YouTube) */}
      <CarouselGeneratorModal
        isOpen={showCarouselModal}
        onClose={() => setShowCarouselModal(false)}
        routine={currentRoutine}
        focus={focus}
        theme={theme}
        initialMode={carouselInitialMode}
      />

      {/* High-Resolution Single-Image Export Preview Modal */}
      <ExportPreviewModal
        isOpen={!!exportedImageUrl}
        onClose={() => setExportedImageUrl(null)}
        imageUrl={exportedImageUrl}
        filename={exportFilename}
      />

      {/* Bottom Footer */}
      <footer className="border-t border-zinc-900 bg-black/60 py-6 px-4 text-center text-xs text-zinc-600 font-mono hidden md:block">
        <p>
          SAVAGE BAR METHOD © {new Date().getFullYear()} • TIKTOK & REELS CALISTHENICS POSTER GENERATOR
        </p>
        <p className="text-[10px] text-zinc-700 mt-1">
          Strictly calibrated to vertical 9:16 format (1080x1920 px) with safe margins for TikTok, Instagram Reels, and YouTube Shorts.
        </p>
      </footer>
    </div>
  );
}
