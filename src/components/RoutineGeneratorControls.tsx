import React, { useState } from 'react';
import { HudTheme, RoutineFocus } from '../types/calisthenics';
import { 
  Sparkles, 
  Flame, 
  Layers, 
  Palette, 
  RotateCcw, 
  Timer, 
  Play, 
  Pause,
  Sliders,
  Eye,
  Target,
  FileText,
  FileArchive,
  ChevronDown,
} from 'lucide-react';
import { UnifiedCharacterBadge } from './UnifiedCharacterBadge';

interface RoutineGeneratorControlsProps {
  exerciseCount: number;
  setExerciseCount: (count: number) => void;
  theme: HudTheme;
  setTheme: (theme: HudTheme) => void;
  focus: RoutineFocus;
  setFocus: (focus: RoutineFocus) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onDownloadPoster: () => void;
  onOpenDescriptionModal: () => void;
  onResetCompleted: () => void;
  onOpenCarouselModal?: (mode?: 'preview' | 'download') => void;
  layoutMode: 'grid' | 'list';
  setLayoutMode: (mode: 'grid' | 'list') => void;
  completedCount: number;
  totalCount: number;
  onLoadPreset: (presetId: string) => void;
  showTikTokOverlay: boolean;
  setShowTikTokOverlay: (show: boolean) => void;
}

export const RoutineGeneratorControls: React.FC<RoutineGeneratorControlsProps> = ({
  exerciseCount,
  setExerciseCount,
  theme,
  setTheme,
  focus,
  setFocus,
  customPrompt,
  setCustomPrompt,
  isGenerating,
  onGenerate,
  onOpenDescriptionModal,
  onResetCompleted,
  onOpenCarouselModal,
  completedCount,
  totalCount,
  onLoadPreset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerLeft, setTimerLeft] = useState(90);

  // Rest Timer logic
  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0 && timerRunning) {
      setTimerRunning(false);
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerLeft]);

  const handleStartTimer = (sec: number) => {
    setTimerSeconds(sec);
    setTimerLeft(sec);
    setTimerRunning(true);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const themeConfig = {
    orange: { name: 'Savage Tomato (Oficial)', class: 'bg-[#ff5722]' },
    green: { name: 'Cyber Green', class: 'bg-[#00ff66]' },
    cyan: { name: 'Matrix Cyan', class: 'bg-[#00e5ff]' },
    gold: { name: 'Gold Elite', class: 'bg-[#ffb700]' },
  };

  const FOCUS_OPTIONS: { id: RoutineFocus; label: string; desc: string }[] = [
    { id: 'todo-el-cuerpo', label: 'Cuerpo Completo (Full Body)', desc: 'Equilibrio simétrico de empuje, tracción, tren inferior y zona media.' },
    { id: 'pecho', label: 'Pecho & Empuje Explosivo', desc: 'Fondos en paralelas, fondos en barra recta, aperturas y flexiones explosivas.' },
    { id: 'espalda', label: 'Espalda & Tracción Pesada', desc: 'Dominadas con lastre, muscle-ups, front lever y tracción unilateral.' },
    { id: 'brazos', label: 'Brazos (Bíceps y Tríceps)', desc: 'Fondos profundos, chin-ups cerradas, flexiones diamante y agarres supinos.' },
    { id: 'abdomen', label: 'Abdomen & Core Blindado', desc: 'Dragon flags, pies a la barra, elevaciones de piernas en L y planchas.' },
    { id: 'piernas', label: 'Piernas & Potencia Reactiva', desc: 'Sentadillas pistola, saltos al cajón, zancadas búlgaras y peso muerto.' },
    { id: 'estaticos', label: 'Habilidades Estáticas Élite', desc: 'Full Planche, Front Lever estricto, Bandera Humana y Pino Libre HSPU.' },
    { id: 'circuito-resistencia', label: 'Resistencia & Alto Volumen', desc: 'Series largas de 20-50 repeticiones, descansos mínimos y alta densidad.' },
    { id: 'ganadora-peso-lastre', label: 'Hipertrofia con Lastre (100% Weighted)', desc: 'Las 8 estaciones ejecutadas con sobrecarga de peso obligatoria (+10 a +35 Kg).' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 font-sans text-slate-100">
      
      {/* Primary Card */}
      <div className="bg-[#10141f] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5">
        
        {/* Row 1: Unified Character Specification */}
        <UnifiedCharacterBadge />

        {/* Row 2: Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-[#141926] p-4 rounded-xl border border-slate-800">
          
          {/* Routine Focus Category Dropdown */}
          <div className="md:col-span-8 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-orange-500" />
                <span>Grupo Muscular o Especialidad</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">9 categorías disponibles</span>
            </label>
            
            <div className="relative">
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value as RoutineFocus)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 hover:border-slate-600 focus:border-orange-500 rounded-lg text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer appearance-none pr-9 transition-colors"
              >
                {FOCUS_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-white py-1">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            
            <p className="text-xs text-slate-400 pt-0.5 leading-relaxed">
              {FOCUS_OPTIONS.find((o) => o.id === focus)?.desc}
            </p>
          </div>

          {/* Matrix & Station count */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Estaciones de Ejercicio</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono font-medium">9:16 Calibrado</span>
            </label>

            {/* Segment Selector */}
            <div className="grid grid-cols-3 gap-1.5">
              {[6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => setExerciseCount(num)}
                  className={`py-2 px-1 rounded-lg text-xs font-medium border transition-colors text-center ${
                    exerciseCount === num
                      ? 'bg-slate-800 border-slate-600 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {num === 8 ? '8 (Estándar)' : `${num} Est.`}
                </button>
              ))}
            </div>

            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Estructura: 2 col × 4 filas</span>
              <span className="text-emerald-400 font-medium">100% visible</span>
            </div>
          </div>
        </div>

        {/* Row 3: Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
          {/* Main Primary Action */}
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generando rutina paso a paso...' : 'Generar Rutina con IA'}</span>
          </button>

          {/* Secondary Actions Group */}
          <div className="flex items-center gap-2">
            {onOpenCarouselModal && (
              <button
                onClick={() => onOpenCarouselModal('preview')}
                title="Previsualizar las diapositivas ampliadas del carrusel"
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-orange-400" />
                <span>Previsualizar Carrusel</span>
              </button>
            )}

            {onOpenCarouselModal && (
              <button
                onClick={() => onOpenCarouselModal('download')}
                title="Descargar las 10 diapositivas en archivo comprimido .ZIP"
                className="px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileArchive className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Descargar .ZIP</span>
                <span className="sm:hidden">.ZIP</span>
              </button>
            )}

            <button
              onClick={onOpenDescriptionModal}
              title="Copiar texto redactado para publicación en redes"
              className="px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Texto</span>
            </button>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              title="Ajustes avanzados de tema e instrucciones"
              className={`p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                showAdvanced 
                  ? 'bg-slate-800 border-slate-600 text-orange-400' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 4: Official Presets Grid */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Plantillas Oficiales Predefinidas</span>
            </span>
            {completedCount > 0 && (
              <button
                onClick={onResetCompleted}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reiniciar progreso ({completedCount}/{totalCount})
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => onLoadPreset('savage-weighted-mass-8')}
              className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                100% Con Lastre
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">+10 a +35 Kg adicionales</p>
            </button>

            <button
              onClick={() => onLoadPreset('savage-tomato-8')}
              className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                Savage Tomato
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Reto Estándar (8 estaciones)</p>
            </button>

            <button
              onClick={() => onLoadPreset('power-routine-8-cyan')}
              className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                Potencia Beast 8
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Alta Densidad (4 rondas)</p>
            </button>

            <button
              onClick={() => onLoadPreset('static-skills-elite')}
              className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                Élite Estáticos
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">Nivel Mundial Top 0.01%</p>
            </button>
          </div>
        </div>

        {/* Row 5: Rest Timer HUD Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141926] p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Timer className="w-4 h-4 text-orange-500" />
              <span>Cronómetro de Descanso:</span>
            </div>
            <div className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 bg-slate-950 rounded-md border border-slate-700">
              {formatTimer(timerLeft)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            {[30, 60, 90, 180, 300].map((s) => (
              <button
                key={s}
                onClick={() => handleStartTimer(s)}
                className={`flex-1 sm:flex-initial px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  timerSeconds === s
                    ? 'bg-slate-800 border border-slate-600 text-orange-400 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s < 60 ? `${s}s` : `${s / 60}m`}
              </button>
            ))}

            <button
              onClick={() => setTimerRunning(!timerRunning)}
              title={timerRunning ? 'Pausar cronómetro' : 'Iniciar cronómetro'}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors ml-1"
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

      </div>

      {/* Advanced Customization Drawer */}
      {showAdvanced && (
        <div className="bg-[#10141f] border border-slate-800 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visual Palette */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paleta de Acento del Póster</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['orange', 'green', 'cyan', 'gold'] as HudTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      theme === t
                        ? 'border-slate-600 bg-slate-800 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${themeConfig[t].class}`} />
                    <span className="text-[11px] truncate">{themeConfig[t].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom AI Prompt Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Instrucciones Adicionales para la IA (Opcional)
              </label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ejemplo: Priorizar dominadas con pausa isométrica de 3s..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
