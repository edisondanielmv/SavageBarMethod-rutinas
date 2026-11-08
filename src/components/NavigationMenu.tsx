import React from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Layers, 
  History, 
  BookOpen, 
  Download,
  FileArchive
} from 'lucide-react';

export type AppTab = 'poster' | 'generator' | 'carousel' | 'saved' | 'guide';

interface NavigationMenuProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  savedCount: number;
  onQuickDownloadPoster: () => void;
  onQuickDownloadZip: () => void;
  isExporting: boolean;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onQuickDownloadPoster,
  onQuickDownloadZip,
  isExporting,
}) => {
  const navItems: { id: AppTab; label: string; shortLabel: string; icon: React.ReactNode; badge?: string | number }[] = [
    {
      id: 'poster',
      label: 'Lienzo Póster (9:16)',
      shortLabel: 'Póster',
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 'generator',
      label: 'Generador de Rutinas',
      shortLabel: 'Generador',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'carousel',
      label: 'Estudio de Carrusel',
      shortLabel: 'Carrusel',
      icon: <Layers className="w-4 h-4" />,
      badge: '10 fotos',
    },
    {
      id: 'saved',
      label: 'Historial Guardado',
      shortLabel: 'Historial',
      icon: <History className="w-4 h-4" />,
      badge: `${savedCount}/5`,
    },
    {
      id: 'guide',
      label: 'Guía de Progresión',
      shortLabel: 'Guía',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Navigation Bar - Formal, clean workspace tab bar */}
      <nav className="w-full bg-[#0c1017] border-b border-slate-800/90 backdrop-blur-md sticky top-[53px] z-30 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-2 overflow-x-auto no-scrollbar">
          
          {/* Menu Tabs */}
          <div className="flex items-center gap-1.5 flex-nowrap">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <span className={isActive ? 'text-orange-500' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-orange-500/20 text-orange-400 font-semibold' 
                        : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onQuickDownloadZip}
              title="Descargar las 10 diapositivas del carrusel en archivo .ZIP"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <FileArchive className="w-3.5 h-3.5 text-orange-400" />
              <span>Carrusel .ZIP</span>
            </button>

            <button
              onClick={onQuickDownloadPoster}
              disabled={isExporting}
              title="Descargar póster 9:16 en Full HD (1080x1920)"
              className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Exportando...' : 'Descargar Póster 9:16'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c1017]/95 border-t border-slate-800 backdrop-blur-lg px-2 py-1.5">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-colors relative ${
                  isActive
                    ? 'text-orange-400 font-semibold bg-slate-800/80'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-2.5 text-[8px] font-mono bg-orange-600 text-white px-1 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
