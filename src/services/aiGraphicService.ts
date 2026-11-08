/**
 * UNIFIED ATHLETE SPECIFICATION & AI GRAPHIC GENERATION ENGINE
 * 
 * Declares the unique, consistent character:
 * "TITÁN ENMASCARADO SAVAGE" - The Authentic Masked Human Calisthenics Athlete.
 * 
 * Character Blueprint:
 * - REAL HUMAN ANATOMY: Broad clavicles, sculpted 3D deltoids, striated pectoralis major
 *   with central cleavage, serratus anterior, chiseled 8-pack rectus abdominis,
 *   biceps peaks, horseshoe triceps, vascular forearms, powerful quads and calves.
 * - MASK & GAZE: Sleek matte-black tactical balaclava ski mask wrapping skull, jawline and neck.
 *   Anatomical eye aperture revealing LIVING HUMAN WARRIOR EYES (eyelids, amber/hazel irises,
 *   dark pupils, bright white specular catchlights, focused furrowed brow).
 * - ZERO STICK FIGURES / ZERO ROBOTS: Pure organic anatomical curves and muscular volumes.
 * - ATTIRE: Shirtless shredded torso, graphite/charcoal tactical cargo pants with bellow pockets
 *   and ballistic knee protectors, tactical combat boots with Savage Tomato (#ff5722) grip soles.
 * - FRAMING: 100% complete body unclipped from head to toe within 220x150 viewBox.
 * - AURA: Deep dark studio backdrop (#06070a) with Savage Tomato (#ff5722) rim lighting.
 */

export interface UnifiedCharacterProfile {
  name: string;
  codename: string;
  archetype: string;
  anatomy: {
    physique: string;
    chest: string;
    abs: string;
    arms: string;
    legs: string;
  };
  maskAndFace: {
    type: string;
    eyes: string;
    gaze: string;
  };
  outfit: {
    upperBody: string;
    trousers: string;
    footwear: string;
    gloves: string;
  };
  lighting: {
    primaryGlow: string;
    backdrop: string;
  };
}

export const UNIFIED_ATHLETE_CHARACTER: UnifiedCharacterProfile = {
  name: "Kaelen 'The Shadow Titan'",
  codename: "SAVAGE MASKED TITAN",
  archetype: "Elite Muscular Human Calisthenics Athlete",
  anatomy: {
    physique: "Athletic muscular hypertrophy shredded to 7% body fat. 100% human skeletal and muscular structure.",
    chest: "Dense, prominent pectoralis major with deep sternal cleft and sharp clavicular separation.",
    abs: "Symmetrical 8-pack abdominal grid, deep linea alba, and sharp V-taper obliques cutting down to pelvis.",
    arms: "Cannonball deltoids (all 3 heads), high bicep peaks, and thick horseshoe triceps.",
    legs: "Powerful quads with defined vastus lateralis and medialis, alongside explosive calves.",
  },
  maskAndFace: {
    type: "Sleek matte-black tactical balaclava ski mask wrapping skull, jawline, and athletic neck.",
    eyes: "Living human warrior eyes with eyelids, amber/hazel irises, dark pupils, and crisp white catchlights.",
    gaze: "Hyper-focused warrior gaze with furrowed brow and relentless determination.",
  },
  outfit: {
    upperBody: "Shirtless shredded torso showcasing real human musculature.",
    trousers: "Graphite ripstop combat cargo pants with reinforced tactical knee padding.",
    footwear: "Tactical combat boots with grip treads in Savage Tomato (#ff5722) orange.",
    gloves: "Tactical grip gloves with reinforced knuckles.",
  },
  lighting: {
    primaryGlow: "#ff5722",
    backdrop: "#06070a",
  },
};

export interface GraphicOptions {
  themeColor?: string;
  load?: string;
}

const TOMATO_COLOR = '#ff5722';

/**
 * Returns reusable anatomical gradients, shaders, and filter definitions.
 */
function getAnatomicalGradients(glowColor: string): string {
  return `
    <defs>
      <!-- Lifelike Muscular Skin Shading -->
      <linearGradient id="bodySkin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffd6c0" />
        <stop offset="25%" stop-color="#e89e80" />
        <stop offset="65%" stop-color="#b65735" />
        <stop offset="100%" stop-color="#6e2511" />
      </linearGradient>

      <!-- Muscle Highlight for Clavicles, Pec Tops, Biceps Peaks -->
      <linearGradient id="muscleHighlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff0e6" />
        <stop offset="40%" stop-color="#f2af93" />
        <stop offset="100%" stop-color="#bd5e3b" />
      </linearGradient>

      <!-- Deep Muscular Crevice Shadow (Abs, Sternum, Lats) -->
      <linearGradient id="muscleShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7a2b15" />
        <stop offset="100%" stop-color="#3b1106" />
      </linearGradient>

      <!-- Tactical Balaclava Fabric Gradient -->
      <linearGradient id="balaclavaGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a2e38" />
        <stop offset="45%" stop-color="#14161d" />
        <stop offset="100%" stop-color="#07080b" />
      </linearGradient>

      <!-- Tactical Balaclava Highlight Rim -->
      <linearGradient id="balaclavaRim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3f4554" />
        <stop offset="100%" stop-color="#121419" />
      </linearGradient>

      <!-- Authentic Human Eye Iris Gradient -->
      <radialGradient id="humanIris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#d47a28" />
        <stop offset="65%" stop-color="#80410e" />
        <stop offset="100%" stop-color="#381b04" />
      </radialGradient>

      <!-- Tactical Combat Ripstop Cargo Pants -->
      <linearGradient id="camoPants" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2c3240" />
        <stop offset="45%" stop-color="#1b1f28" />
        <stop offset="100%" stop-color="#0d0f14" />
      </linearGradient>

      <!-- Tactical Combat Boots Leather -->
      <linearGradient id="bootLeather" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#22242c" />
        <stop offset="50%" stop-color="#111216" />
        <stop offset="100%" stop-color="#050608" />
      </linearGradient>

      <!-- Calisthenics Steel Bar -->
      <linearGradient id="metalBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#6b7280" />
        <stop offset="40%" stop-color="#d1d5db" />
        <stop offset="70%" stop-color="#4b5563" />
        <stop offset="100%" stop-color="#1f2937" />
      </linearGradient>

      <!-- Cast Iron Weight Plate -->
      <radialGradient id="ironPlate" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#374151" />
        <stop offset="60%" stop-color="#1f2937" />
        <stop offset="100%" stop-color="#111827" />
      </radialGradient>

      <!-- Savage Neon Tomato Rim Light Filter -->
      <filter id="tomatoNeon" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Studio Ambient Backdrop Radial Light -->
      <radialGradient id="studioBackdrop" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.16" />
        <stop offset="55%" stop-color="#090a0f" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#040507" stop-opacity="1" />
      </radialGradient>
    </defs>
  `;
}

/**
 * Renders the authentic human masked athlete head with realistic cranial anatomy
 * and living human eyes with eyelids, amber irises, pupils, and specular highlights.
 */
function renderMaskedHumanHead(
  cx: number,
  cy: number,
  theme: string,
  options: {
    angle?: number;
    facing?: 'forward' | 'up' | 'down' | 'profile-right' | 'profile-left';
    scale?: number;
  } = {}
): string {
  const { facing = 'forward', scale = 1, angle = 0 } = options;
  const transform = `transform="translate(${cx}, ${cy}) rotate(${angle}) scale(${scale})"`;

  if (facing === 'up') {
    // Athlete tilted head looking up toward the bar
    return `
      <g ${transform}>
        <!-- Muscular Neck & Trapezius Slope -->
        <path d="M -8 10 C -12 16, -16 22, -20 28 L 20 28 C 16 22, 12 16, 8 10 Z" fill="url(#bodySkin)" />
        <path d="M -4 12 L -7 26 M 4 12 L 7 26" stroke="#6e2511" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />

        <!-- Balaclava Jaw, Skull Dome and Chin Contour -->
        <path d="M 0 -18 C -11 -18, -14 -8, -13 0 C -12 7, -8 13, 0 14 C 8 13, 12 7, 13 0 C 14 -8, 11 -18, 0 -18 Z"
              fill="url(#balaclavaGrad)" stroke="#0d0e12" stroke-width="1.2" />
        <path d="M -11 -14 C -6 -18, 6 -18, 11 -14" stroke="url(#balaclavaRim)" stroke-width="0.9" fill="none" />

        <!-- Anatomical Mask Cutout Aperture for Eyes -->
        <path d="M -9 -7 C -4 -11, 4 -11, 9 -7 C 8 -2, -8 -2, -9 -7 Z" fill="#030406" stroke="${theme}" stroke-width="0.8" />
        
        <!-- Human Warrior Eyes (Left and Right) looking up -->
        <!-- Left Eye: Sclera + Iris + Pupil + Specular Reflection -->
        <ellipse cx="-4.5" cy="-6" rx="2.4" ry="1.4" fill="#ffffff" />
        <circle cx="-4.5" cy="-6.5" r="1.1" fill="url(#humanIris)" />
        <circle cx="-4.5" cy="-6.5" r="0.6" fill="#000000" />
        <circle cx="-4.9" cy="-6.9" r="0.35" fill="#ffffff" />

        <!-- Right Eye: Sclera + Iris + Pupil + Specular Reflection -->
        <ellipse cx="4.5" cy="-6" rx="2.4" ry="1.4" fill="#ffffff" />
        <circle cx="4.5" cy="-6.5" r="1.1" fill="url(#humanIris)" />
        <circle cx="4.5" cy="-6.5" r="0.6" fill="#000000" />
        <circle cx="4.1" cy="-6.9" r="0.35" fill="#ffffff" />

        <!-- Determined Brow Ridge / Warrior Gaze Crease -->
        <path d="M -7 -9 L -2 -7 L 2 -7 L 7 -9" stroke="${theme}" stroke-width="0.75" fill="none" opacity="0.9" />
      </g>
    `;
  }

  if (facing === 'down') {
    // Athlete head angled downward (dips, pushups, HSPU)
    return `
      <g ${transform}>
        <!-- Trapezius and Neck -->
        <path d="M -8 -8 C -14 -14, -18 -20, -22 -24 L 22 -24 C 18 -20, 14 -14, 8 -8 Z" fill="url(#bodySkin)" />
        <!-- Balaclava Head Contour -->
        <path d="M 0 -16 C -12 -16, -14 -6, -13 4 C -11 11, -7 16, 0 17 C 7 16, 11 11, 13 4 C 14 -6, 12 -16, 0 -16 Z"
              fill="url(#balaclavaGrad)" stroke="#0d0e12" stroke-width="1.2" />
        <!-- Eye Slit Opening -->
        <path d="M -8.5 2 C -4 -1, 4 -1, 8.5 2 C 7 6, -7 6, -8.5 2 Z" fill="#030406" stroke="${theme}" stroke-width="0.8" />
        <!-- Left Eye looking downward -->
        <ellipse cx="-4.2" cy="2.5" rx="2.2" ry="1.3" fill="#ffffff" />
        <circle cx="-4.2" cy="3" r="1" fill="url(#humanIris)" />
        <circle cx="-4.2" cy="3" r="0.5" fill="#000000" />
        <circle cx="-4.6" cy="2.5" r="0.3" fill="#ffffff" />
        <!-- Right Eye looking downward -->
        <ellipse cx="4.2" cy="2.5" rx="2.2" ry="1.3" fill="#ffffff" />
        <circle cx="4.2" cy="3" r="1" fill="url(#humanIris)" />
        <circle cx="4.2" cy="3" r="0.5" fill="#000000" />
        <circle cx="3.8" cy="2.5" r="0.3" fill="#ffffff" />
        <!-- Brow crease -->
        <path d="M -6.5 0 L 0 1.5 L 6.5 0" stroke="${theme}" stroke-width="0.75" fill="none" opacity="0.9" />
      </g>
    `;
  }

  // Standard forward-facing warrior head
  return `
    <g ${transform}>
      <!-- Muscular Neck & Trapezius slope connecting to torso -->
      <path d="M -7 8 C -12 14, -18 20, -22 24 L 22 24 C 18 20, 12 14, 7 8 Z" fill="url(#bodySkin)" />
      <path d="M -4 10 L -6 22 M 4 10 L 6 22" stroke="#6e2511" stroke-width="1" stroke-linecap="round" opacity="0.6" />

      <!-- Skull Dome & Contoured Jawline -->
      <path d="M 0 -17 C -11 -17, -13.5 -8, -13 0 C -12 7.5, -8 14.5, 0 15.5 C 8 14.5, 12 7.5, 13 0 C 13.5 -8, 11 -17, 0 -17 Z"
            fill="url(#balaclavaGrad)" stroke="#0c0d11" stroke-width="1.3" />
      <!-- Top Crown Highlight Curve -->
      <path d="M -9 -13 C -5 -16.5, 5 -16.5, 9 -13" stroke="url(#balaclavaRim)" stroke-width="0.9" fill="none" />

      <!-- Horizontal Mask Aperture for Eyes -->
      <path d="M -9.5 -3.5 C -5 -5.5, 5 -5.5, 9.5 -3.5 C 8.5 0.5, -8.5 0.5, -9.5 -3.5 Z" fill="#020305" stroke="${theme}" stroke-width="0.85" />

      <!-- Left Warrior Eye: Almond sclera, Iris, Pupil, Catchlight -->
      <path d="M -7 -3.5 C -6 -5, -3 -5, -2 -3.5 C -3 -2.2, -6 -2.2, -7 -3.5 Z" fill="#ffffff" />
      <circle cx="-4.5" cy="-3.5" r="1.15" fill="url(#humanIris)" />
      <circle cx="-4.5" cy="-3.5" r="0.6" fill="#000000" />
      <circle cx="-4.9" cy="-4" r="0.35" fill="#ffffff" />

      <!-- Right Warrior Eye -->
      <path d="M 2 -3.5 C 3 -5, 6 -5, 7 -3.5 C 6 -2.2, 3 -2.2, 2 -3.5 Z" fill="#ffffff" />
      <circle cx="4.5" cy="-3.5" r="1.15" fill="url(#humanIris)" />
      <circle cx="4.5" cy="-3.5" r="0.6" fill="#000000" />
      <circle cx="4.1" cy="-4" r="0.35" fill="#ffffff" />

      <!-- Intense Furrowed Brow Ridge / Warrior Gaze Focus -->
      <path d="M -7.5 -5.8 L -1.5 -3.8 L 1.5 -3.8 L 7.5 -5.8" stroke="${theme}" stroke-width="0.8" fill="none" opacity="0.9" />
    </g>
  `;
}

/**
 * Renders the chiseled, anatomical human muscular torso:
 * Striated Pectoralis Major (left & right), Sternum Cleft,
 * Clavicles, Serratus Anterior, and 8-Pack Rectus Abdominis.
 */
function renderMuscularHumanTorso(
  cx: number,
  cy: number,
  theme: string,
  options: {
    width?: number;
    height?: number;
    chestEngagement?: 'pulled' | 'pressed' | 'arched' | 'standard';
  } = {}
): string {
  const { width = 44, height = 48 } = options;
  const hw = width / 2;

  return `
    <g transform="translate(${cx}, ${cy})">
      <!-- Main Upper Body Muscular Mass Contour -->
      <path d="M -${hw} 0 C -${hw - 4} 12, -${hw - 8} 26, -${hw - 12} ${height} 
               L ${hw - 12} ${height} 
               C ${hw - 8} 26, ${hw - 4} 12, ${hw} 0 Z" 
            fill="url(#bodySkin)" stroke="#521b0d" stroke-width="0.8" />

      <!-- Clavicle / Collarbone Bones (Left & Right) -->
      <path d="M -${hw - 2} 2 Q -10 6 0 5 Q 10 6 ${hw - 2} 2" stroke="url(#muscleHighlight)" stroke-width="1.8" fill="none" opacity="0.85" />
      <path d="M -${hw - 2} 3 Q -10 7 0 6 Q 10 7 ${hw - 2} 3" stroke="#6e2511" stroke-width="0.8" fill="none" opacity="0.7" />

      <!-- Striated Left Pectoral Slab -->
      <path d="M -${hw - 3} 4 C -${hw - 5} 15, -12 18, -2 18 C -2 10, -8 4, -${hw - 3} 4 Z"
            fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.9" />
      <!-- Left Pec Under-shadow -->
      <path d="M -${hw - 4} 16 Q -12 19 -2 18" stroke="#481507" stroke-width="1.6" fill="none" />

      <!-- Striated Right Pectoral Slab -->
      <path d="M ${hw - 3} 4 C ${hw - 5} 15, 12 18, 2 18 C 2 10, 8 4, ${hw - 3} 4 Z"
            fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.9" />
      <!-- Right Pec Under-shadow -->
      <path d="M ${hw - 4} 16 Q 12 19 2 18" stroke="#481507" stroke-width="1.6" fill="none" />

      <!-- Deep Sternal Cleavage Groove down chest center -->
      <line x1="0" y1="4" x2="0" y2="20" stroke="#3b1106" stroke-width="1.6" stroke-linecap="round" />

      <!-- Serratus Anterior "Rib Muscle Fingers" (Left and Right) -->
      <path d="M -${hw - 7} 18 L -${hw - 11} 22 M -${hw - 8} 23 L -${hw - 12} 27 M -${hw - 9} 28 L -${hw - 13} 32"
            stroke="#6e2511" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
      <path d="M ${hw - 7} 18 L ${hw - 11} 22 M ${hw - 8} 23 L ${hw - 12} 27 M ${hw - 9} 28 L ${hw - 13} 32"
            stroke="#6e2511" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />

      <!-- 8-PACK RECTUS ABDOMINIS GRID (4 Contoured Symmetrical Pairs) -->
      <!-- Linea Alba (Vertical Abdominal Center Line) -->
      <line x1="0" y1="20" x2="0" y2="${height - 2}" stroke="#3b1106" stroke-width="1.4" stroke-linecap="round" />

      <!-- Row 1 Abs (Upper Pair) -->
      <rect x="-8.5" y="21" width="7" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />
      <rect x="1.5" y="21" width="7" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />

      <!-- Row 2 Abs -->
      <rect x="-8.5" y="27.5" width="7" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />
      <rect x="1.5" y="27.5" width="7" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />

      <!-- Row 3 Abs -->
      <rect x="-8" y="34" width="6.5" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />
      <rect x="1.5" y="34" width="6.5" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />

      <!-- Row 4 Abs (Lower Pair above waist) -->
      <rect x="-7.5" y="40.5" width="6" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />
      <rect x="1.5" y="40.5" width="6" height="5" rx="1.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.6" />

      <!-- V-Cut / Adonis Belt Grooves toward waist -->
      <path d="M -${hw - 12} ${height - 2} Q -4 ${height + 2} 0 ${height + 4} Q 4 ${height + 2} ${hw - 12} ${height - 2}"
            stroke="${theme}" stroke-width="1.1" fill="none" opacity="0.8" />
    </g>
  `;
}

/**
 * Renders the lower body: Tactical Ripstop Combat Pants with cargo pockets,
 * reinforced ballistic knee protectors, and heavy assault combat boots with
 * Savage Tomato grip soles.
 */
function renderTacticalLegsAndBoots(
  lx1: number, ly1: number, lx2: number, ly2: number,
  rx1: number, ry1: number, rx2: number, ry2: number,
  theme: string
): string {
  return `
    <g>
      <!-- Left Leg Combat Pants -->
      <path d="M ${lx1} ${ly1} L ${lx2} ${ly2}" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <!-- Left Cargo Pocket Flap -->
      <rect x="${(lx1 + lx2) / 2 - 5}" y="${(ly1 + ly2) / 2 - 10}" width="7" height="9" rx="1.5" fill="#141720" stroke="#0a0c10" stroke-width="0.8" />
      <line x1="${(lx1 + lx2) / 2 - 5}" y1="${(ly1 + ly2) / 2 - 7}" x2="${(lx1 + lx2) / 2 + 2}" y2="${(ly1 + ly2) / 2 - 7}" stroke="${theme}" stroke-width="0.7" />
      <!-- Left Tactical Knee Pad -->
      <rect x="${(lx1 + lx2) / 2 - 4.5}" y="${(ly1 + ly2) / 2 + 2}" width="7" height="7" rx="2" fill="#0c0d12" stroke="${theme}" stroke-width="0.9" />
      <circle cx="${(lx1 + lx2) / 2 - 2.5}" cy="${(ly1 + ly2) / 2 + 4}" r="0.6" fill="#777" />
      <circle cx="${(lx1 + lx2) / 2 + 0.5}" cy="${(ly1 + ly2) / 2 + 4}" r="0.6" fill="#777" />

      <!-- Right Leg Combat Pants -->
      <path d="M ${rx1} ${ry1} L ${rx2} ${ry2}" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <!-- Right Cargo Pocket Flap -->
      <rect x="${(rx1 + rx2) / 2 - 2}" y="${(ry1 + ry2) / 2 - 10}" width="7" height="9" rx="1.5" fill="#141720" stroke="#0a0c10" stroke-width="0.8" />
      <line x1="${(rx1 + rx2) / 2 - 2}" y1="${(ry1 + ry2) / 2 - 7}" x2="${(rx1 + rx2) / 2 + 5}" y2="${(ry1 + ry2) / 2 - 7}" stroke="${theme}" stroke-width="0.7" />
      <!-- Right Tactical Knee Pad -->
      <rect x="${(rx1 + rx2) / 2 - 2.5}" y="${(ry1 + ry2) / 2 + 2}" width="7" height="7" rx="2" fill="#0c0d12" stroke="${theme}" stroke-width="0.9" />
      <circle cx="${(rx1 + rx2) / 2 - 0.5}" cy="${(ry1 + ry2) / 2 + 4}" r="0.6" fill="#777" />
      <circle cx="${(rx1 + rx2) / 2 + 2.5}" cy="${(ry1 + ry2) / 2 + 4}" r="0.6" fill="#777" />

      <!-- Left Assault Combat Boot -->
      <path d="M ${lx2 - 5} ${ly2 - 4} L ${lx2 + 5} ${ly2 - 4} L ${lx2 + 5} ${ly2 + 6} L ${lx2 - 5} ${ly2 + 6} Z"
            fill="url(#bootLeather)" stroke="#000" stroke-width="1" />
      <!-- Savage Tomato Tread Line -->
      <line x1="${lx2 - 6}" y1="${ly2 + 6}" x2="${lx2 + 6}" y2="${ly2 + 6}" stroke="${theme}" stroke-width="2" stroke-linecap="round" />

      <!-- Right Assault Combat Boot -->
      <path d="M ${rx2 - 5} ${ry2 - 4} L ${rx2 + 5} ${ry2 - 4} L ${rx2 + 5} ${ry2 + 6} L ${rx2 - 5} ${ry2 + 6} Z"
            fill="url(#bootLeather)" stroke="#000" stroke-width="1" />
      <!-- Savage Tomato Tread Line -->
      <line x1="${rx2 - 6}" y1="${ry2 + 6}" x2="${rx2 + 6}" y2="${ry2 + 6}" stroke="${theme}" stroke-width="2" stroke-linecap="round" />
    </g>
  `;
}

// =========================================================================
// 1. ONE-ARM PULL-UPS (EACH)
// =========================================================================
function generateOneArmPullupSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- High Pull-up Bar with Tomato Accent -->
    <rect x="20" y="20" width="180" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />
    <line x1="20" y1="23.5" x2="200" y2="23.5" stroke="#fff" stroke-width="0.6" opacity="0.4" />

    <!-- Right Glove firmly gripping bar -->
    <rect x="104" y="16" width="14" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Right Arm: Massive flexed forearm, bulging biceps peak and striated deltoid -->
    <path d="M 111 23 L 110 38 L 118 52" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Biceps Peak Bulge -->
    <circle cx="111" cy="38" r="5.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />
    <!-- Deltoid Cap -->
    <circle cx="120" cy="52" r="6.5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />

    <!-- Left Arm: Tucked tightly against ribcage with clenched fist in isometric tension -->
    <path d="M 88 56 L 82 72 L 95 72" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="96" cy="72" r="4.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="0.9" />

    <!-- Masked Athlete Head looking up at bar with intense warrior eyes -->
    ${renderMaskedHumanHead(102, 36, theme, { facing: 'up', scale: 0.95, angle: -5 })}

    <!-- Ripped Muscular Torso hanging with unilateral lat engagement -->
    ${renderMuscularHumanTorso(104, 52, theme, { width: 38, height: 38 })}

    <!-- Lower Body: Legs in Tactical Cargo Pants with slight hollow body curve -->
    ${renderTacticalLegsAndBoots(98, 92, 98, 130, 110, 92, 110, 130, theme)}

    <!-- Kinetic Upward Power Indicator in Tomato Neon -->
    <path d="M 64 88 L 64 45 M 59 55 L 64 45 L 69 55" stroke="${theme}" stroke-width="2" fill="none" opacity="0.85" filter="url(#tomatoNeon)" />
    <!-- Unilateral Load Badge -->
    <text x="64" y="104" font-family="monospace" font-size="6" font-weight="900" fill="${theme}" text-anchor="middle">1-ARM</text>
  </svg>`;
}

// =========================================================================
// 2. BAR MUSCLE-UPS
// =========================================================================
function generateMuscleUpSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Horizontal Bar across athlete's waist/lower ribs -->
    <rect x="25" y="74" width="170" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />
    <line x1="25" y1="77.5" x2="195" y2="77.5" stroke="#fff" stroke-width="0.6" opacity="0.4" />

    <!-- Both Tactical Gloves pressed over top of bar in lockout transition -->
    <rect x="83" y="70" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="124" y="70" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Muscular Arms locked out in dip transition: Triceps horseshoe & vascular forearms -->
    <path d="M 89 71 L 87 46" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <path d="M 131 71 L 133 46" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <!-- Deltoid Caps -->
    <ellipse cx="86" cy="46" rx="6.5" ry="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />
    <ellipse cx="134" cy="46" rx="6.5" ry="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />

    <!-- Masked Athlete Head looking forward over the bar with warrior eyes -->
    ${renderMaskedHumanHead(110, 24, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Massive Shredded Torso fully elevated above the bar -->
    ${renderMuscularHumanTorso(110, 36, theme, { width: 44, height: 36 })}

    <!-- Tactical Combat Pants: Full legs extending below the bar -->
    ${renderTacticalLegsAndBoots(103, 76, 103, 130, 117, 76, 117, 130, theme)}

    <!-- Kinetic Vertical Thrust Arrows in Tomato -->
    <path d="M 68 85 L 68 50 M 63 60 L 68 50 L 73 60" stroke="${theme}" stroke-width="2" fill="none" opacity="0.85" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 3. WEIGHTED PARALLEL DIPS
// =========================================================================
function generateParallelBarDipsSVG(theme: string, load: string): string {
  const displayLoad = load && load.includes('Kg') ? load.replace('Load: ', '') : '+20KG';
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Parallel Dip Bars with 3D Depth -->
    <rect x="58" y="68" width="34" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />
    <line x1="75" y1="75" x2="75" y2="136" stroke="#374151" stroke-width="4.5" />
    <rect x="128" y="68" width="34" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />
    <line x1="145" y1="75" x2="145" y2="136" stroke="#374151" stroke-width="4.5" />

    <!-- Tactical Gloves on dip handles -->
    <rect x="69" y="65" width="13" height="10" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.1" />
    <rect x="138" y="65" width="13" height="10" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.1" />

    <!-- Muscular Arms in deep 90° dip flexion: Massive triceps horseshoe -->
    <path d="M 76 68 L 82 48 L 96 58" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 144 68 L 138 48 L 124 58" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Bulging Deltoid & Triceps Highlights -->
    <circle cx="82" cy="48" r="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />
    <circle cx="138" cy="48" r="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />

    <!-- Masked Athlete Head tilted slightly forward with warrior eyes -->
    ${renderMaskedHumanHead(110, 24, theme, { facing: 'down', scale: 0.95 })}

    <!-- Shredded Torso tilted forward for maximum pectoral stretch -->
    ${renderMuscularHumanTorso(110, 36, theme, { width: 44, height: 42 })}

    <!-- Legs in Tactical Pants: Bent back at 90° at knees, crossed at ankles -->
    <g>
      <path d="M 103 80 L 98 104 L 112 118" stroke="url(#camoPants)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 117 80 L 112 104 L 120 118" stroke="url(#camoPants)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Tactical Knee Protectors -->
      <rect x="94" y="99" width="6.5" height="6.5" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <rect x="108" y="99" width="6.5" height="6.5" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <!-- Crossed Assault Combat Boots -->
      <rect x="108" y="115" width="15" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.1" />
      <line x1="108" y1="123" x2="123" y2="123" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Heavy Calisthenics Dip Belt with Steel Chain & Heavy Weight Plate -->
    <path d="M 98 80 Q 110 92 122 80" stroke="#f59e0b" stroke-width="2.8" fill="none" />
    <line x1="110" y1="88" x2="110" y2="103" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" />
    <rect x="101" y="101" width="18" height="24" rx="2.5" fill="url(#ironPlate)" stroke="${theme}" stroke-width="1.4" />
    <line x1="110" y1="103" x2="110" y2="123" stroke="#4b5563" stroke-width="2" />
    <text x="110" y="116" font-family="monospace" font-size="6.5" font-weight="900" fill="${theme}" text-anchor="middle">${displayLoad}</text>
  </svg>`;
}

// =========================================================================
// 4. FREESTANDING HANDSTAND PUSH-UP (HSPU)
// =========================================================================
function generateHspuSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Floor Line with Savage Tomato Glow -->
    <line x1="20" y1="130" x2="200" y2="130" stroke="#374151" stroke-width="2" />
    <line x1="55" y1="130" x2="165" y2="130" stroke="${theme}" stroke-width="1.8" opacity="0.8" filter="url(#tomatoNeon)" />

    <!-- Tactical Gloves flat on floor, fingers spread for balance -->
    <rect x="82" y="125" width="15" height="7" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="123" y="125" width="15" height="7" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Inverted Muscular Arms: Flexed at 90° power depth -->
    <path d="M 89 125 L 81 104 L 95 86" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 131 125 L 139 104 L 125 86" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Bulging Deltoid Shoulder Caps -->
    <ellipse cx="81" cy="104" rx="6.5" ry="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />
    <ellipse cx="139" cy="104" rx="6.5" ry="6" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />

    <!-- Inverted Masked Athlete Head hovering inches above floor -->
    ${renderMaskedHumanHead(110, 114, theme, { facing: 'forward', scale: 0.95, angle: 180 })}

    <!-- Inverted Muscular Torso: Flared Lats & V-taper pointed upward -->
    <g transform="translate(110, 68) scale(1, -1)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 44, height: 38 })}
    </g>

    <!-- Tactical Combat Pants: Full vertical legs pointed straight up to ceiling -->
    <g>
      <path d="M 105 52 L 105 20" stroke="url(#camoPants)" stroke-width="9.5" stroke-linecap="round" />
      <path d="M 115 52 L 115 20" stroke="url(#camoPants)" stroke-width="9.5" stroke-linecap="round" />
      <!-- Tactical Knee Protectors -->
      <rect x="101" y="34" width="6.5" height="6.5" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <rect x="112" y="34" width="6.5" height="6.5" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <!-- Tactical Assault Boots pointing straight up (100% inside frame) -->
      <rect x="101" y="14" width="8" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.1" />
      <rect x="111" y="14" width="8" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.1" />
      <line x1="101" y1="14" x2="119" y2="14" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Vertical Power Balance Guides in Tomato Neon -->
    <line x1="64" y1="95" x2="64" y2="35" stroke="${theme}" stroke-width="1.6" stroke-dasharray="3,3" opacity="0.85" />
    <line x1="156" y1="95" x2="156" y2="35" stroke="${theme}" stroke-width="1.6" stroke-dasharray="3,3" opacity="0.85" />
  </svg>`;
}

// =========================================================================
// 5. WEIGHTED FRONT LEVER
// =========================================================================
function generateFrontLeverSVG(theme: string, load: string): string {
  const displayLoad = load && load.includes('Kg') ? load.replace('Load: ', '') : '+10KG';
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- High Steel Pull-up Bar -->
    <rect x="15" y="20" width="190" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />
    <line x1="15" y1="23.5" x2="205" y2="23.5" stroke="#fff" stroke-width="0.6" opacity="0.4" />

    <!-- Both Tactical Gloves gripping bar -->
    <rect x="70" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="101" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Locked straight pulling arms under tremendous lat tension -->
    <line x1="76" y1="23" x2="84" y2="67" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" />
    <line x1="107" y1="23" x2="99" y2="67" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" />

    <!-- 100% UNCLIPPED RIGID HORIZONTAL ATHLETE BODY -->
    <!-- Masked Athlete Head looking up at bar -->
    ${renderMaskedHumanHead(64, 66, theme, { facing: 'up', scale: 0.9, angle: -15 })}

    <!-- Horizontal Muscular Torso facing upward: Flared lats and chiseled 8-pack abs -->
    <g transform="translate(102, 67) rotate(-90)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 38, height: 42 })}
    </g>

    <!-- Weighted Plate on waist if loaded -->
    <rect x="116" y="55" width="12" height="24" rx="2.5" fill="url(#ironPlate)" stroke="${theme}" stroke-width="1.3" />
    <text x="122" y="69.5" font-family="monospace" font-size="5.5" font-weight="900" fill="${theme}" text-anchor="middle">${displayLoad}</text>

    <!-- Complete Horizontal Legs in Tactical Combat Pants -->
    <g>
      <path d="M 124 67 L 180 67" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <rect x="144" y="62.5" width="7" height="9" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <!-- Tactical Assault Boots locked horizontally inside frame -->
      <rect x="176" y="62.5" width="14" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
      <line x1="176" y1="71.5" x2="190" y2="71.5" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Laser Guideline in Tomato Neon -->
    <line x1="60" y1="56" x2="192" y2="56" stroke="${theme}" stroke-width="1.8" opacity="0.85" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 6. PISTOL SQUATS (EACH)
// =========================================================================
function generatePistolSquatSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Floor Line -->
    <line x1="20" y1="130" x2="200" y2="130" stroke="#374151" stroke-width="2" />
    <line x1="50" y1="130" x2="170" y2="130" stroke="${theme}" stroke-width="1.6" opacity="0.75" filter="url(#tomatoNeon)" />

    <!-- Supporting Boot planted flat on floor -->
    <rect x="72" y="125" width="19" height="7" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
    <line x1="71" y1="131.5" x2="91" y2="131.5" stroke="${theme}" stroke-width="1.8" />

    <!-- Deeply Flexed Supporting Leg: Shin vertical, massive quad horizontal -->
    <path d="M 81 125 L 81 96 L 102 96" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="77" y="103" width="8" height="6" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />

    <!-- Extended Free Leg in Mid-Air Horizontally -->
    <path d="M 102 96 L 172 92" stroke="url(#camoPants)" stroke-width="10" stroke-linecap="round" />
    <rect x="132" y="87" width="8" height="6" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
    <!-- Free Boot pointing right in mid-air (100% inside frame) -->
    <rect x="168" y="87" width="14" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
    <line x1="168" y1="95.5" x2="182" y2="95.5" stroke="${theme}" stroke-width="1.8" />

    <!-- Upright Muscular Torso: Sculpted pecs and 6-pack abs -->
    ${renderMuscularHumanTorso(98, 56, theme, { width: 36, height: 40 })}

    <!-- Both Muscular Arms reaching forward for tactical balance -->
    <path d="M 98 64 L 144 64" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />
    <circle cx="144" cy="64" r="4.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1" />

    <!-- Masked Athlete Head looking forward with warrior eyes -->
    ${renderMaskedHumanHead(98, 44, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Trajectory Laser in Tomato -->
    <line x1="84" y1="40" x2="176" y2="90" stroke="${theme}" stroke-width="1.6" stroke-dasharray="3,3" opacity="0.8" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 7. DRAGON FLAGS
// =========================================================================
function generateDragonFlagSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Heavy Calisthenics Training Bench -->
    <rect x="25" y="112" width="120" height="9" rx="2.5" fill="#1f2430" stroke="#374151" stroke-width="1" />
    <line x1="45" y1="121" x2="45" y2="136" stroke="#4b5563" stroke-width="4.5" />
    <line x1="125" y1="121" x2="125" y2="136" stroke="#4b5563" stroke-width="4.5" />

    <!-- Tactical Gloves gripping bench behind head -->
    <rect x="34" y="107" width="14" height="9" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <path d="M 40 109 L 48 98 L 60 108" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />

    <!-- Masked Athlete Head resting on bench looking along the body line -->
    ${renderMaskedHumanHead(52, 108, theme, { facing: 'forward', scale: 0.9, angle: -10 })}

    <!-- Ripped Muscular Torso elevated at 45° angle with maximum abdominal tension -->
    <g transform="translate(85, 86) rotate(-40)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 36, height: 40 })}
    </g>

    <!-- Complete Straight Legs elevated in mid-air at 45° -->
    <g>
      <path d="M 112 66 L 176 24" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <rect x="134" y="42" width="7" height="7" rx="1.5" transform="rotate(-33 137 45)" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <!-- Assault Combat Boots in mid-air (100% inside frame) -->
      <rect x="172" y="17" width="13" height="9" rx="2" transform="rotate(-33 178 21)" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
      <line x1="172" y1="26" x2="183" y2="19" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Rigid 45° Guide Laser in Tomato Neon -->
    <line x1="60" y1="108" x2="182" y2="20" stroke="${theme}" stroke-width="1.8" stroke-dasharray="4,3" opacity="0.85" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 8. EXPLOSIVE CLAP PUSH-UPS
// =========================================================================
function generateClapPushupSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Floor Line -->
    <line x1="20" y1="126" x2="200" y2="126" stroke="#374151" stroke-width="2" />
    <line x1="50" y1="126" x2="170" y2="126" stroke="${theme}" stroke-width="1.5" opacity="0.75" />

    <!-- Boots pivoting on floor at rear -->
    <rect x="168" y="118" width="15" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
    <line x1="168" y1="126.5" x2="183" y2="126.5" stroke="${theme}" stroke-width="1.8" />

    <!-- Full Legs in Tactical Pants angled upward at 22° in flight -->
    <path d="M 168 120 L 92 84" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
    <rect x="124" y="96" width="7" height="7" rx="1.5" transform="rotate(22 127 99)" fill="#111" stroke="${theme}" stroke-width="0.8" />

    <!-- Muscular Chest and Torso launched in mid-air -->
    <g transform="translate(80, 74) rotate(22)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 38, height: 36 })}
    </g>

    <!-- Muscular Arms clapping together under chest in mid-air -->
    <path d="M 68 76 L 82 98 L 94 98" stroke="url(#bodySkin)" stroke-width="7" stroke-linecap="round" />
    <path d="M 68 76 L 76 100 L 94 98" stroke="url(#bodySkin)" stroke-width="7" stroke-linecap="round" />

    <!-- Clap Impact Kinetic Starburst in Tomato Neon -->
    <circle cx="96" cy="98" r="6" fill="${theme}" filter="url(#tomatoNeon)" />
    <path d="M 96 86 L 96 110 M 84 98 L 108 98" stroke="#fff" stroke-width="1.8" stroke-linecap="round" />

    <!-- Masked Athlete Head looking forward -->
    ${renderMaskedHumanHead(52, 68, theme, { facing: 'forward', scale: 0.9, angle: 15 })}
  </svg>`;
}

// =========================================================================
// 9. FULL PLANCHE
// =========================================================================
function generatePlancheSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <line x1="20" y1="125" x2="200" y2="125" stroke="#374151" stroke-width="2" />
    <line x1="40" y1="125" x2="180" y2="125" stroke="${theme}" stroke-width="1.6" opacity="0.8" filter="url(#tomatoNeon)" />

    <!-- Parallettes Handles -->
    <rect x="74" y="112" width="24" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="1" />
    <line x1="86" y1="119" x2="86" y2="125" stroke="#4b5563" stroke-width="4" />
    <rect x="110" y="112" width="24" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="1" />
    <line x1="122" y1="119" x2="122" y2="125" stroke="#4b5563" stroke-width="4" />

    <!-- Locked straight vertical arms under massive shoulder torque -->
    <path d="M 86 112 L 88 76" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" />
    <path d="M 122 112 L 120 76" stroke="url(#bodySkin)" stroke-width="8.5" stroke-linecap="round" />

    <!-- Protracted Scapula & Muscular Torso floating completely horizontal -->
    <g transform="translate(104, 75) rotate(-90)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 38, height: 42 })}
    </g>

    <!-- Full Legs in Tactical Pants extended horizontally in mid-air -->
    <g>
      <path d="M 118 76 L 184 74" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <rect x="146" y="69.5" width="7" height="9" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <rect x="180" y="69" width="14" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
      <line x1="180" y1="78" x2="194" y2="78" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Masked Athlete Head looking forward with warrior eyes -->
    ${renderMaskedHumanHead(74, 74, theme, { facing: 'forward', scale: 0.9, angle: -10 })}

    <!-- Upper Body Silhouette Rim Line in Tomato Neon -->
    <path d="M 68 70 Q 100 62 184 70" stroke="${theme}" stroke-width="2" fill="none" opacity="0.85" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 10. HUMAN FLAG
// =========================================================================
function generateHumanFlagSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Vertical Steel Calisthenics Pole -->
    <rect x="36" y="15" width="8" height="125" rx="4" fill="url(#metalBar)" stroke="${theme}" stroke-width="1" />
    <line x1="40" y1="15" x2="40" y2="140" stroke="#fff" stroke-width="0.8" opacity="0.4" />

    <!-- Bottom Hand pushing out, Top Hand pulling in -->
    <rect x="34" y="88" width="12" height="10" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="34" y="38" width="12" height="10" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Muscular Arms locked in opposition -->
    <path d="M 42 42 L 72 65" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <path d="M 42 92 L 72 75" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />

    <!-- Completely Horizontal Muscular Torso: Lateral obliques & lats -->
    <g transform="translate(86, 70) rotate(-90)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 36, height: 40 })}
    </g>

    <!-- Full Straight Legs in Tactical Pants held horizontally in mid-air -->
    <g>
      <path d="M 104 70 L 180 70" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
      <rect x="142" y="65.5" width="7" height="9" rx="1.5" fill="#111" stroke="${theme}" stroke-width="0.8" />
      <rect x="178" y="65.5" width="14" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
      <line x1="178" y1="74.5" x2="192" y2="74.5" stroke="${theme}" stroke-width="1.8" />
    </g>

    <!-- Masked Athlete Head looking forward out of the screen -->
    ${renderMaskedHumanHead(70, 56, theme, { facing: 'forward', scale: 0.9 })}

    <!-- Tomato Guide Line -->
    <line x1="44" y1="70" x2="192" y2="70" stroke="${theme}" stroke-width="1.8" stroke-dasharray="3,3" opacity="0.85" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 11. WEIGHTED PULL-UPS (PRONATED)
// =========================================================================
function generateWeightedPullupSVG(theme: string, load: string): string {
  const displayLoad = load && load.includes('Kg') ? load.replace('Load: ', '') : '+25KG';
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Pull-up Bar -->
    <rect x="25" y="20" width="170" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />

    <!-- Wide Pronated Tactical Grip -->
    <rect x="80" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="127" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Muscular Arms flexed in top pull: Massive lats & biceps -->
    <path d="M 86 24 L 92 48 L 100 52" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 134 24 L 128 48 L 120 52" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Masked Athlete Head over the bar -->
    ${renderMaskedHumanHead(110, 26, theme, { facing: 'up', scale: 0.95 })}

    <!-- Ripped Muscular Torso -->
    ${renderMuscularHumanTorso(110, 48, theme, { width: 44, height: 38 })}

    <!-- Tactical Combat Pants & Boots hanging with weighted dip belt -->
    ${renderTacticalLegsAndBoots(104, 86, 104, 128, 116, 86, 116, 128, theme)}

    <!-- Weighted Plate hanging from dip belt -->
    <rect x="101" y="96" width="18" height="22" rx="2.5" fill="url(#ironPlate)" stroke="${theme}" stroke-width="1.3" />
    <text x="110" y="110" font-family="monospace" font-size="6.5" font-weight="900" fill="${theme}" text-anchor="middle">${displayLoad}</text>
  </svg>`;
}

// =========================================================================
// 12. CHIN-UPS (SUPINATED BICEPS PEAK)
// =========================================================================
function generateChinUpSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <rect x="25" y="20" width="170" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />

    <!-- Close Supinated Grip (palms facing athlete) -->
    <rect x="94" y="16" width="12" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="114" y="16" width="12" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Deep Flexed Arms: Massive Biceps Peak Contraction -->
    <path d="M 100 24 L 98 44 L 105 48" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <path d="M 120 24 L 122 44 L 115 48" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <circle cx="98" cy="42" r="5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />
    <circle cx="122" cy="42" r="5" fill="url(#muscleHighlight)" stroke="#6e2511" stroke-width="0.8" />

    <!-- Masked Athlete Head cleared over the bar -->
    ${renderMaskedHumanHead(110, 24, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Muscular Torso -->
    ${renderMuscularHumanTorso(110, 46, theme, { width: 42, height: 38 })}

    <!-- Tactical Combat Pants & Boots -->
    ${renderTacticalLegsAndBoots(104, 84, 104, 128, 116, 84, 116, 128, theme)}
  </svg>`;
}

// =========================================================================
// 13. STRAIGHT BAR DIPS
// =========================================================================
function generateStraightBarDipSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <rect x="25" y="72" width="170" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />

    <!-- Both Gloves gripping straight bar -->
    <rect x="88" y="68" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="119" y="68" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Flexed Arms in straight bar dip -->
    <path d="M 94 68 L 86 48 L 98 52" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 126 68 L 134 48 L 122 52" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Masked Athlete Head looking down-forward -->
    ${renderMaskedHumanHead(110, 26, theme, { facing: 'down', scale: 0.95 })}

    <!-- Torso dipped low over the bar -->
    ${renderMuscularHumanTorso(110, 38, theme, { width: 44, height: 36 })}

    <!-- Legs in hollow body reaching slightly forward below bar -->
    ${renderTacticalLegsAndBoots(102, 74, 98, 126, 118, 74, 114, 126, theme)}
  </svg>`;
}

// =========================================================================
// 14. INCLINE PUSH-UPS
// =========================================================================
function generateInclinePushupSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <line x1="20" y1="128" x2="200" y2="128" stroke="#374151" stroke-width="2" />
    <!-- Tactical Elevated Platform on Right -->
    <rect x="145" y="86" width="55" height="42" rx="3" fill="#1b1f28" stroke="${theme}" stroke-width="1.2" />

    <!-- Gloves on platform -->
    <rect x="148" y="82" width="13" height="8" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Boots on floor on left -->
    <rect x="42" y="120" width="14" height="8.5" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />

    <!-- Muscular Plank Body in Tactical Pants angled up to platform -->
    <path d="M 44 122 L 128 88" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />

    <!-- Muscular Torso -->
    <g transform="translate(132, 84) rotate(-22)">
      ${renderMuscularHumanTorso(0, 0, theme, { width: 36, height: 36 })}
    </g>

    <!-- Arms pressing onto platform -->
    <path d="M 132 86 L 152 86" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />

    <!-- Masked Athlete Head looking forward -->
    ${renderMaskedHumanHead(146, 68, theme, { facing: 'forward', scale: 0.9, angle: -15 })}
  </svg>`;
}

// =========================================================================
// 15. RING FLYES
// =========================================================================
function generateRingFlyesSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <!-- Hanging Straps & Rings -->
    <line x1="50" y1="15" x2="50" y2="72" stroke="#9ca3af" stroke-width="1.6" />
    <circle cx="50" cy="76" r="9" fill="none" stroke="${theme}" stroke-width="2.2" />
    <line x1="170" y1="15" x2="170" y2="72" stroke="#9ca3af" stroke-width="1.6" />
    <circle cx="170" cy="76" r="9" fill="none" stroke="${theme}" stroke-width="2.2" />

    <!-- Wide Outstretched Muscular Arms holding rings in chest flye stretch -->
    <path d="M 58 76 L 94 66" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <path d="M 162 76 L 126 66" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />

    <!-- Masked Athlete Head -->
    ${renderMaskedHumanHead(110, 44, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Muscular Chest in Wide Full Stretch -->
    ${renderMuscularHumanTorso(110, 58, theme, { width: 44, height: 38 })}

    <!-- Tactical Combat Pants & Boots angled back to floor -->
    ${renderTacticalLegsAndBoots(104, 96, 102, 130, 116, 96, 118, 130, theme)}
  </svg>`;
}

// =========================================================================
// 16. TOES TO BAR / LEG RAISES
// =========================================================================
function generateLegRaisesSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <rect x="25" y="20" width="170" height="7" rx="3.5" fill="url(#metalBar)" stroke="${theme}" stroke-width="0.9" />

    <rect x="94" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="113" y="16" width="13" height="11" rx="3" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <!-- Hanging Straight Arms -->
    <line x1="100" y1="23" x2="100" y2="48" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <line x1="120" y1="23" x2="120" y2="48" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />

    <!-- Masked Athlete Head looking up at bar/feet -->
    ${renderMaskedHumanHead(110, 36, theme, { facing: 'up', scale: 0.95 })}

    <!-- Torso under maximum abdominal flexion -->
    ${renderMuscularHumanTorso(110, 48, theme, { width: 40, height: 36 })}

    <!-- Legs raised in 90° L-Sit or upward Toes-to-Bar in Tactical Pants -->
    <path d="M 110 84 L 175 84" stroke="url(#camoPants)" stroke-width="11" stroke-linecap="round" />
    <rect x="170" y="79" width="14" height="9" rx="2" fill="url(#bootLeather)" stroke="${theme}" stroke-width="1.2" />
    <line x1="170" y1="88" x2="184" y2="88" stroke="${theme}" stroke-width="1.8" />
  </svg>`;
}

// =========================================================================
// 17. JUMP SQUATS / EXPLOSIVE LEGS
// =========================================================================
function generateJumpSquatSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <line x1="20" y1="134" x2="200" y2="134" stroke="#374151" stroke-width="2" />

    <!-- Athlete launched in explosive mid-air apex -->
    <!-- Masked Athlete Head looking up with warrior eyes -->
    ${renderMaskedHumanHead(110, 28, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Shredded Torso -->
    ${renderMuscularHumanTorso(110, 42, theme, { width: 42, height: 38 })}

    <!-- Arms driving upward in kinetic leap -->
    <path d="M 90 48 L 76 30" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />
    <path d="M 130 48 L 144 30" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />

    <!-- Legs fully extended down in mid-air above the floor -->
    ${renderTacticalLegsAndBoots(104, 80, 102, 114, 116, 80, 118, 114, theme)}

    <!-- Kinetic Upward Thrust Waves in Tomato Neon -->
    <path d="M 85 130 Q 110 120 135 130" stroke="${theme}" stroke-width="2" fill="none" opacity="0.85" filter="url(#tomatoNeon)" />
    <path d="M 95 124 Q 110 116 125 124" stroke="${theme}" stroke-width="1.5" fill="none" opacity="0.6" filter="url(#tomatoNeon)" />
  </svg>`;
}

// =========================================================================
// 18. BURPEES
// =========================================================================
function generateBurpeesSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <line x1="20" y1="130" x2="200" y2="130" stroke="#374151" stroke-width="2" />

    <!-- Athlete in dynamic burpee ground thrust -->
    <rect x="74" y="125" width="14" height="6.5" rx="2" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />
    <rect x="126" y="125" width="14" height="6.5" rx="2" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.2" />

    <path d="M 80 125 L 94 92" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />
    <path d="M 132 125 L 126 92" stroke="url(#bodySkin)" stroke-width="8" stroke-linecap="round" />

    <!-- Masked Athlete Head looking forward -->
    ${renderMaskedHumanHead(110, 68, theme, { facing: 'forward', scale: 0.95 })}

    ${renderMuscularHumanTorso(110, 80, theme, { width: 42, height: 32 })}

    <!-- Legs tucked in explosive coil -->
    <path d="M 104 110 L 88 126" stroke="url(#camoPants)" stroke-width="10" stroke-linecap="round" />
    <path d="M 116 110 L 132 126" stroke="url(#camoPants)" stroke-width="10" stroke-linecap="round" />
  </svg>`;
}

// =========================================================================
// 19. DEADLIFT / GROUND HINGE
// =========================================================================
function generateDeadliftSVG(theme: string): string {
  return `<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    ${getAnatomicalGradients(theme)}
    <rect width="220" height="150" fill="url(#studioBackdrop)" />

    <line x1="20" y1="130" x2="200" y2="130" stroke="#374151" stroke-width="2" />

    <!-- Heavy Calisthenics Ground Barbell with Cast Iron Plates -->
    <line x1="45" y1="112" x2="175" y2="112" stroke="url(#metalBar)" stroke-width="4.5" />
    <rect x="42" y="94" width="10" height="36" rx="2.5" fill="url(#ironPlate)" stroke="${theme}" stroke-width="1.3" />
    <rect x="168" y="94" width="10" height="36" rx="2.5" fill="url(#ironPlate)" stroke="${theme}" stroke-width="1.3" />

    <!-- Muscular Athlete in Lockout -->
    <!-- Gloves on barbell -->
    <rect x="86" y="108" width="12" height="9" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.1" />
    <rect x="122" y="108" width="12" height="9" rx="2.5" fill="url(#balaclavaGrad)" stroke="${theme}" stroke-width="1.1" />

    <path d="M 92 110 L 98 72" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />
    <path d="M 128 110 L 122 72" stroke="url(#bodySkin)" stroke-width="7.5" stroke-linecap="round" />

    <!-- Masked Athlete Head looking forward -->
    ${renderMaskedHumanHead(110, 32, theme, { facing: 'forward', scale: 0.95 })}

    <!-- Ripped Muscular Back / Chest -->
    ${renderMuscularHumanTorso(110, 46, theme, { width: 44, height: 38 })}

    <!-- Legs in Tactical Combat Pants -->
    ${renderTacticalLegsAndBoots(104, 84, 102, 126, 116, 84, 118, 126, theme)}
  </svg>`;
}

// =========================================================================
// MASTER DISPATCHER: Maps any exercise name or key to its authentic graphic
// =========================================================================
export function generateAIGraphicForExercise(
  exerciseName: string,
  category: string,
  illustrationKey?: string,
  options?: GraphicOptions
): string {
  const normName = exerciseName.toLowerCase();
  const normKey = (illustrationKey || '').toLowerCase();
  const theme = options?.themeColor || TOMATO_COLOR;
  const loadText = options?.load || '';

  // 1. STATICS & LEVERS
  if (normName.includes('front lever') || normKey.includes('front_lever')) {
    return generateFrontLeverSVG(theme, loadText);
  }
  if (normName.includes('planche') || normKey.includes('planche')) {
    return generatePlancheSVG(theme);
  }
  if (normName.includes('human flag') || normKey.includes('human_flag')) {
    return generateHumanFlagSVG(theme);
  }

  // 2. PUSH & DIPS
  if (normName.includes('handstand') || normName.includes('hspu') || normKey.includes('hspu') || normKey.includes('handstand')) {
    return generateHspuSVG(theme);
  }
  if (normName.includes('straight bar dip') || normKey.includes('straight_bar')) {
    return generateStraightBarDipSVG(theme);
  }
  if (normName.includes('clap push') || normKey.includes('clap')) {
    return generateClapPushupSVG(theme);
  }
  if (normName.includes('incline push') || normKey.includes('incline_push')) {
    return generateInclinePushupSVG(theme);
  }
  if (normName.includes('ring') || normKey.includes('ring')) {
    return generateRingFlyesSVG(theme);
  }
  if (normName.includes('dip') || normKey.includes('dip')) {
    return generateParallelBarDipsSVG(theme, loadText);
  }

  // 3. PULL & BAR
  if (normName.includes('muscle-up') || normName.includes('muscle up') || normKey.includes('muscle_up')) {
    return generateMuscleUpSVG(theme);
  }
  if (normName.includes('one-arm') || normName.includes('one arm') || normKey.includes('one_arm')) {
    return generateOneArmPullupSVG(theme);
  }
  if (normName.includes('chin-up') || normName.includes('chin up') || normKey.includes('chin_up')) {
    return generateChinUpSVG(theme);
  }
  if (normName.includes('pull-up') || normName.includes('pullup') || normKey.includes('pullup')) {
    return generateWeightedPullupSVG(theme, loadText);
  }

  // 4. CORE & ABS
  if (normName.includes('dragon flag') || normKey.includes('dragon')) {
    return generateDragonFlagSVG(theme);
  }
  if (normName.includes('toes to bar') || normName.includes('leg raise') || normKey.includes('toes') || normKey.includes('leg_raise')) {
    return generateLegRaisesSVG(theme);
  }

  // 5. LEGS & LOWER BODY
  if (normName.includes('pistol') || normKey.includes('pistol')) {
    return generatePistolSquatSVG(theme);
  }
  if (normName.includes('jump squat') || normKey.includes('jump_squat') || normName.includes('bulgarian') || normKey.includes('bulgarian') || normName.includes('squat')) {
    return generateJumpSquatSVG(theme);
  }
  if (normName.includes('burpee') || normKey.includes('burpee')) {
    return generateBurpeesSVG(theme);
  }
  if (normName.includes('deadlift') || normKey.includes('deadlift')) {
    return generateDeadliftSVG(theme);
  }

  // Fallback by movement category
  if (category === 'Pull') {
    return generateWeightedPullupSVG(theme, loadText);
  }
  if (category === 'Push') {
    return generateParallelBarDipsSVG(theme, loadText);
  }
  if (category === 'Static') {
    return generateFrontLeverSVG(theme, loadText);
  }
  if (category === 'Core / Abs') {
    return generateDragonFlagSVG(theme);
  }
  if (category === 'Legs') {
    return generatePistolSquatSVG(theme);
  }

  return generateMuscleUpSVG(theme);
}
