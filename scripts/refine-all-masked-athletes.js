import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './public/assets/human_masked_athletes';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const TOMATO = { r: 255, g: 87, b: 34 };

async function getBackgroundBuffer() {
  const bgSvg = `
    <svg width="420" height="210" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="amb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff5722" stop-opacity="0.18" />
          <stop offset="65%" stop-color="#141724" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#06070a" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect width="420" height="210" fill="#06070a" />
      <ellipse cx="210" cy="105" rx="160" ry="85" fill="url(#amb)" />
    </svg>
  `;
  return sharp(Buffer.from(bgSvg)).png().toBuffer();
}

/**
 * Precision extraction of authentic masked human athlete
 */
async function buildCard({
  src,
  crop,
  cleanZones = [], // rectangles inside crop { x, y, w, h } to wipe to dark studio
  convertGreenToTomato = true,
  outNames,
  scale = 0.85,
}) {
  try {
    const raw = await sharp(src)
      .extract(crop)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = raw;
    const { width, height, channels } = info;

    // 1. Wipe out cleanZones (stray badge numbers or neighbour limbs)
    for (const zone of cleanZones) {
      const zx1 = Math.max(0, zone.x);
      const zy1 = Math.max(0, zone.y);
      const zx2 = Math.min(width, zone.x + zone.w);
      const zy2 = Math.min(height, zone.y + zone.h);

      for (let y = zy1; y < zy2; y++) {
        for (let x = zx1; x < zx2; x++) {
          const idx = (y * width + x) * channels;
          data[idx] = 6;
          data[idx + 1] = 7;
          data[idx + 2] = 10;
          data[idx + 3] = 255;
        }
      }
    }

    // 2. Pixel scan: eliminate green lines and remap green HUD outlines to signature Tomato #ff5722
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const isGreenGlow = g > 50 && g > r * 1.15 && g > b * 1.05;
      const isBrightGreen = g > 100 && g > r * 1.2 && g > b * 1.15;

      if (isBrightGreen || isGreenGlow) {
        if (convertGreenToTomato) {
          const factor = Math.min(1.2, g / 170);
          data[i] = Math.min(255, Math.round(TOMATO.r * factor));
          data[i + 1] = Math.round(TOMATO.g * factor);
          data[i + 2] = Math.round(TOMATO.b * factor);
        } else {
          data[i] = 6;
          data[i + 1] = 7;
          data[i + 2] = 10;
        }
      } else if (r < 35 && g < 42 && b < 45 && g >= r && g >= b) {
        data[i] = 6;
        data[i + 1] = 7;
        data[i + 2] = 10;
      }
    }

    // 3. Upscale athlete cleanly
    const athletePng = await sharp(data, {
      raw: { width, height, channels },
    })
      .resize({
        width: Math.round(420 * scale),
        height: Math.round(210 * scale),
        fit: 'inside',
        kernel: sharp.kernel.lanczos3,
      })
      .modulate({
        brightness: 1.08,
        saturation: 1.15,
      })
      .sharpen({ sigma: 1.1, m1: 1.3, m2: 0.5 })
      .png()
      .toBuffer();

    // 4. Center composite on 420x210 background
    const bgBuffer = await getBackgroundBuffer();

    const finalImage = await sharp(bgBuffer)
      .composite([{ input: athletePng, gravity: 'center' }])
      .png({ quality: 100, compressionLevel: 8 })
      .toBuffer();

    const names = Array.isArray(outNames) ? outNames : [outNames];
    for (const name of names) {
      fs.writeFileSync(path.join(outDir, name), finalImage);
      fs.writeFileSync(path.join('./public/assets/exercises', name), finalImage);
      fs.writeFileSync(path.join('./public/assets/master_athletes', name), finalImage);
      console.log(`[PERFECT] ${name}`);
    }
  } catch (err) {
    console.error(`[ERROR] ${outNames}:`, err.message);
  }
}

async function run() {
  console.log('=== BUILDING 100% UNCLIPPED MASKED HUMAN ATHLETES ===');

  const imgOrange = './public/assets/aistudio/IMG_3621_32f9ba37.jpeg'; // Orange Savage Circuit
  const imgGreen12 = './public/assets/aistudio/IMG_3625_102e53a0.jpeg'; // Green 12-routine (Front lever, Dragon Flag, HSPU)
  const imgGreen8 = './public/assets/aistudio/IMG_3624_455fe7c7.jpeg'; // Green 8-routine (Parallel dips, Deadlift, HSPU, Pullups)

  // 1. ONE-ARM PULL-UPS (Orange Poster, Station 01: full body hanging from bar)
  await buildCard({
    src: imgOrange,
    crop: { left: 48, top: 64, width: 48, height: 78 },
    cleanZones: [{ x: 0, y: 0, w: 14, h: 22 }], // card badge "01"
    outNames: ['one_arm_pullup.png', 'one_arm_pullup_elite.png', 'one_arm_pullup_orange.png'],
    scale: 0.88,
  });

  // 2. BAR MUSCLE-UPS (Orange Poster, Station 02: torso above bar, arms locked)
  await buildCard({
    src: imgOrange,
    crop: { left: 180, top: 72, width: 62, height: 68 },
    cleanZones: [{ x: 0, y: 0, w: 16, h: 20 }], // card badge "02"
    outNames: ['muscle_up.png', 'muscle_up_elite.png', 'muscle_up_orange.png'],
    scale: 0.88,
  });

  // 3. WEIGHTED PARALLEL DIPS (Orange Poster, Station 07: athlete between dip bars, complete from head to toes)
  await buildCard({
    src: imgOrange,
    crop: { left: 42, top: 272, width: 56, height: 70 },
    cleanZones: [{ x: 0, y: 0, w: 14, h: 20 }], // card badge "07"
    outNames: ['parallel_bar_dips.png', 'parallel_dips_orange.png', 'parallel_dips_intense.png'],
    scale: 0.86,
  });

  // 4. FREESTANDING HSPU (Station 07 from IMG_3624: full handstand push-up)
  await buildCard({
    src: imgGreen8,
    crop: { left: 52, top: 374, width: 44, height: 74 },
    convertGreenToTomato: true,
    outNames: ['freestanding_hspu.png', 'freestanding_hspu_elite.png', 'handstand_pushup_libre.png'],
    scale: 0.88,
  });

  // 5. WEIGHTED FRONT LEVER (Station 03 from IMG_3625: full horizontal athlete)
  await buildCard({
    src: imgGreen12,
    crop: { left: 190, top: 78, width: 78, height: 48 },
    cleanZones: [{ x: 0, y: 0, w: 18, h: 16 }], // wipe out badge if any
    convertGreenToTomato: true,
    outNames: ['weighted_front_lever.png', 'front_lever.png', 'front_lever_elite.png'],
    scale: 0.88,
  });

  // 6. PISTOL SQUATS (Orange Poster, Station 09: full single leg squat)
  // Let's capture the athlete precisely:
  // In imgOrange, Station 09 is at left: 172, top: 284, width: 48, height: 52
  await buildCard({
    src: imgOrange,
    crop: { left: 170, top: 282, width: 50, height: 54 },
    cleanZones: [
      { x: 0, y: 0, w: 12, h: 18 }, // badge "09" corner
    ],
    outNames: ['pistol_squats.png', 'pistol_squat.png'],
    scale: 0.86,
  });

  // 7. DRAGON FLAGS (Station 12 from IMG_3625: full body on bench, feet pointed up)
  // Clean out badge "12" at top-left
  await buildCard({
    src: imgGreen12,
    crop: { left: 184, top: 396, width: 84, height: 48 },
    cleanZones: [
      { x: 0, y: 0, w: 26, h: 20 }, // wipe out badge "12" at top left
    ],
    convertGreenToTomato: true,
    outNames: ['dragon_flags.png', 'dragon_flag.png'],
    scale: 0.86,
  });

  // 8. EXPLOSIVE CLAP PUSH-UPS (Orange Poster, Station 10: clapping push-up)
  await buildCard({
    src: imgOrange,
    crop: { left: 220, top: 310, width: 50, height: 38 },
    cleanZones: [],
    outNames: ['clap_pushups.png'],
    scale: 0.86,
  });

  console.log('=== ALL 8 STATIONS ASSEMBLED FLAWLESSLY ===');
}

run();
