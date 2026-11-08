import React from 'react';
import { X, Download, Share2, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  filename: string;
}

export const ExportPreviewModal: React.FC<ExportPreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  filename,
}) => {
  if (!isOpen || !imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = imageUrl;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], filename, { type: 'image/png' });
        await navigator.share({
          title: 'Savage Bar Method - Calisthenics Routine',
          text: 'Savage Bar Method calisthenics workout poster',
          files: [file],
        });
      } catch (err) {
        console.warn('Share not completed:', err);
      }
    } else {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border-2 border-orange-500/60 rounded-2xl shadow-[0_0_50px_rgba(255,107,0,0.3)] overflow-hidden font-hud text-zinc-100 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white font-orbitron">
                HIGH-RESOLUTION 9:16 POSTER EXPORT (1080x1920)
              </h2>
              <p className="text-[10px] sm:text-xs text-zinc-400">
                Vertical 9:16 Full HD format calibrated for TikTok, Reels, and Shorts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-black/80">
          <div className="relative max-h-[65vh] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
            <img
              src={imageUrl}
              alt="Savage Bar Method Exported Poster"
              className="w-auto h-full max-h-[65vh] object-contain"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-zinc-400 font-mono">
            💡 On mobile devices, tap and hold the image to save it directly to your photos.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Share</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold font-orbitron shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>SAVE PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
