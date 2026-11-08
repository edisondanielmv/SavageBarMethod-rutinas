import React from 'react';

interface SavageEmblemProps {
  className?: string;
  size?: number;
}

export const SavageEmblem: React.FC<SavageEmblemProps> = ({ className = 'w-full h-full', size = 32 }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="emblemSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8c8b2" />
          <stop offset="50%" stopColor="#b65a39" />
          <stop offset="100%" stopColor="#732b16" />
        </linearGradient>
        <linearGradient id="emblemBalaclava" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2e3b" />
          <stop offset="60%" stopColor="#141720" />
          <stop offset="100%" stopColor="#08090d" />
        </linearGradient>
        <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Dark Tactical Circle Shield */}
      <circle cx="50" cy="50" r="47" fill="#090b10" stroke="#ff5722" strokeWidth="2.5" filter="url(#emblemGlow)" />
      <circle cx="50" cy="50" r="44" stroke="#ff5722" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />

      {/* Crossed Calisthenics Dip Bars / Calisthenics Steel Tubes */}
      <line x1="22" y1="22" x2="78" y2="78" stroke="#4a5263" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="78" x2="78" y2="22" stroke="#4a5263" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="22" x2="78" y2="78" stroke="#ff5722" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
      <line x1="22" y1="78" x2="78" y2="22" stroke="#ff5722" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />

      {/* Muscular Shoulders / Trapezius */}
      <path d="M 30 75 Q 50 62 70 75 L 75 88 Q 50 82 25 88 Z" fill="url(#emblemSkin)" stroke="#ff5722" strokeWidth="0.8" />
      {/* Pectoral Cut */}
      <line x1="50" y1="67" x2="50" y2="82" stroke="#732b16" strokeWidth="1.2" />

      {/* Tactical Balaclava Head with Warrior Gaze */}
      <path d="M 37 40 C 37 25, 63 25, 63 40 C 65 52, 60 62, 50 63 C 40 62, 35 52, 37 40 Z" fill="url(#emblemBalaclava)" stroke="#ff5722" strokeWidth="1.2" />

      {/* Visor Eye Slit */}
      <rect x="41" y="38" width="18" height="6" rx="2" fill="#000" stroke="#ff5722" strokeWidth="0.8" />
      {/* Intense Warrior Eyes in Tomato Glow */}
      <ellipse cx="46" cy="41" rx="2.5" ry="1.2" fill="#ffffff" />
      <ellipse cx="54" cy="41" rx="2.5" ry="1.2" fill="#ffffff" />
      <circle cx="46.5" cy="41" r="0.9" fill="#ff5722" />
      <circle cx="53.5" cy="41" r="0.9" fill="#ff5722" />

      {/* Top Protocol Star & HUD Text */}
      <polygon points="50,11 52,15 56,15 53,18 54,22 50,20 46,22 47,18 44,15 48,15" fill="#ff5722" />
      <text x="50" y="93" fontFamily="monospace" fontSize="7" fontWeight="900" fill="#ff5722" textAnchor="middle" letterSpacing="1">SAVAGE</text>
    </svg>
  );
};
