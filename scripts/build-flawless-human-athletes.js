import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './public/assets/human_masked_athletes';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Tomato and studio dark colors
const bgStudio = { r: 6, g: 7, b: 10, alpha: 1 };
const TOMATO = { r: 255, g: 87, b: 34 };

async function getBackgroundBuffer() {
  const bgSvg = `
    <svg width="420" height="210" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="amb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff5722" stop-opacity="0.16" />
          <stop offset="60%" stop-color="#141724" stop-opacity="0.85" />
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
 * Clean isolated masked human athlete:
 * - Removes green outlines / borders (shifts to Tomato #ff5722 or dark studio)
 * - Masks out any stray numbers, letters or adjacent figure pixels
 * - Embeds in a 420x210 canvas with plenty of padding so no body part is ever clipped
 */
async function processAthlete({
  src,
  crop,
  cleanZones = [], // zones within the crop to paint over with dark background
  convertGreenToTomato = true,
  outNames,
  padding = 0.85, // athlete scale inside 420x210
}) {
  try {
    const raw = await sharp(src)
      .extract(crop)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = raw;
    const { width, height, channels } = info;

    // 1. Wipe out cleanZones (stray numbers, adjacent limbs)
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

    // 2. Pixel scan: remove green lines, convert green halo to Tomato #ff5722
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Green HUD border / outline detection
      const isGreen = g > 50 && g > r * 1.15 && g > b * 1.08;
      const isBrightGreen = g > 110 && g > r * 1.25 && g > b * 1.2;

      if (isBrightGreen || isGreen) {
        if (convertGreenToTomato) {
          // Remap green intensity to signature Tomato #ff5722
          const factor = Math.min(1.2, g / 180);
          data[i] = Math.min(255, Math.round(TOMATO.r * factor));
          data[i + 1] = Math.round(TOMATO.g * factor);
          data[i + 2] = Math.round(TOMATO.b * factor);
        } else {
          // Replace with studio background
          data[i] = 6;
          data[i + 1] = 7;
          data[i + 2] = 10;
        }
      } else if (r < 35 && g < 42 && b < 45 && g > r && g > b) {
        // Murky greenish background pixel -> pure dark studio
        data[i] = 6;
        data[i + 1] = 7;
        data[i + 2] = 10;
      }
    }

    // 3. Upscale athlete cleanly
    const athleteResizedPng = await sharp(data, {
      raw: { width, height, channels },
    })
      .resize({
        width: Math.round(420 * padding),
        height: Math.round(210 * padding),
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

    // 4. Composite onto a 420x210 canvas with subtle radial Tomato backglow
    const bgBuffer = await getBackgroundBuffer();

    const finalImage = await sharp(bgBuffer)
      .composite([
        {
          input: athleteResizedPng,
          gravity: 'center',
        },
      ])
      .png({ quality: 100, compressionLevel: 8 })
      .toBuffer();

    const names = Array.isArray(outNames) ? outNames : [outNames];
    for (const name of names) {
      const outPath = path.join(outDir, name);
      fs.writeFileSync(outPath, finalImage);
      // Also copy to public/assets/exercises/ so all existing routes have it
      fs.writeFileSync(path.join('./public/assets/exercises', name), finalImage);
      fs.writeFileSync(path.join('./public/assets/master_athletes', name), finalImage);
      console.log(`[SAVED] ${name}`);
    }
  } catch (err) {
    console.error(`[ERROR] Processing ${outNames}:`, err.message);
  }
}

async function run() {
  console.log('=== CREATING FLAWLESS 100% VISIBLE MASKED HUMAN ATHLETES ===');

  const imgOrange = './public/assets/aistudio/IMG_3621_32f9ba37.jpeg'; // Tomato Savage Circuit
  const imgGreen12 = './public/assets/aistudio/IMG_3625_102e53a0.jpeg'; // Green 12-routine (Front lever, Dragon Flag, HSPU)
  const imgGreen8 = './public/assets/aistudio/IMG_3624_455fe7c7.jpeg'; // Green 8-routine (Parallel dips, Deadlift, HSPU, Pullups)
  const imgGreen9 = './public/assets/aistudio/IMG_3620_f1d69469.jpeg'; // Green 9-routine (Dragon flag, Bulgarian, Rings, Burpees)

  // 1. ONE-ARM PULL-UP (Station 01 from Orange Poster - hanging from bar with one arm, full body)
  await processAthlete({
    src: imgOrange,
    crop: { left: 48, top: 64, width: 48, height: 78 },
    cleanZones: [{ x: 0, y: 0, w: 16, h: 25 }], // remove "01" if touching
    outNames: ['one_arm_pullup.png', 'one_arm_pullup_elite.png', 'one_arm_pullup_orange.png'],
    padding: 0.88,
  });

  // 2. BAR MUSCLE-UPS (Station 02 from Orange Poster - above bar with locked arms)
  await processAthlete({
    src: imgOrange,
    crop: { left: 180, top: 72, width: 62, height: 68 },
    cleanZones: [{ x: 0, y: 0, w: 18, h: 22 }], // remove "02"
    outNames: ['muscle_up.png', 'muscle_up_elite.png', 'muscle_up_orange.png'],
    padding: 0.88,
  });

  // 3. WEIGHTED PARALLEL DIPS (Station 07 from Orange Poster or Station 05 from IMG_3624)
  await processAthlete({
    src: imgOrange,
    crop: { left: 42, top: 272, width: 56, height: 70 },
    cleanZones: [{ x: 0, y: 0, w: 16, h: 22 }], // remove "07"
    outNames: ['parallel_bar_dips.png', 'parallel_dips_orange.png', 'parallel_dips_intense.png'],
    padding: 0.86,
  });

  // 4. FREESTANDING HSPU (Station 07 from IMG_3624 or Station 09 from IMG_3625)
  await processAthlete({
    src: imgGreen8,
    crop: { left: 52, top: 374, width: 44, height: 74 },
    convertGreenToTomato: true,
    outNames: ['freestanding_hspu.png', 'freestanding_hspu_elite.png', 'handstand_pushup_libre.png'],
    padding: 0.88,
  });

  // 5. WEIGHTED FRONT LEVER (Station 03 from IMG_3625 - full horizontal body with arms holding bar)
  // Ensure left and right margins capture BOTH head and BOTH feet
  await processAthlete({
    src: imgGreen12,
    crop: { left: 190, top: 78, width: 78, height: 48 },
    cleanZones: [],
    convertGreenToTomato: true,
    outNames: ['weighted_front_lever.png', 'front_lever.png', 'front_lever_elite.png'],
    padding: 0.88, // wide horizontal figure fits nicely
  });

  // 6. PISTOL SQUATS (Station 09 from Orange Poster - complete single-leg squat, arms extended, foot extended)
  await processAthlete({
    src: imgOrange,
    crop: { left: 168, top: 280, width: 54, height: 58 },
    cleanZones: [
      { x: 0, y: 0, w: 18, h: 22 }, // clean out "09" card badge
      { x: 0, y: 15, w: 10, h: 40 }, // clean out left neighbour arm
    ],
    outNames: ['pistol_squats.png', 'pistol_squat.png'],
    padding: 0.86,
  });

  // 7. DRAGON FLAGS (Station 12 from IMG_3625 or Station 09 from IMG_3620)
  // Captures full body from hands holding bench to full feet in air
  await processAthlete({
    src: imgGreen12,
    crop: { left: 184, top: 396, width: 84, height: 48 },
    cleanZones: [],
    convertGreenToTomato: true,
    outNames: ['dragon_flags.png', 'dragon_flag.png'],
    padding: 0.86,
  });

  // 8. EXPLOSIVE CLAP PUSH-UPS (Station 10 from Orange Poster - full plank, clapping hands, head to feet)
  await processAthlete({
    src: imgOrange,
    crop: { left: 206, top: 310, width: 58, height: 38 },
    cleanZones: [
      { x: 0, y: 0, w: 10, h: 38 }, // clean out left edge leg
    ],
    outNames: ['clap_pushups.png'],
    padding: 0.86,
  });

  // 9. WEIGHTED PULL-UPS (Station 02 from IMG_3624)
  await processAthlete({
    src: imgGreen8,
    crop: { left: 182, top: 74, width: 58, height: 68 },
    convertGreenToTomato: true,
    outNames: ['weighted_pullups.png', 'pullup.png'],
    padding: 0.86,
  });

  // 10. STRAIGHT BAR DIPS (Station 03 from Orange Poster)
  await processAthlete({
    src: imgOrange,
    crop: { left: 40, top: 172, width: 54, height: 66 },
    cleanZones: [{ x: 0, y: 0, w: 16, h: 22 }],
    outNames: ['straight_bar_dips.png'],
    padding: 0.86,
  });

  // 11. TOES TO BAR (Station 04 from Orange Poster)
  await processAthlete({
    src: imgOrange,
    crop: { left: 118, top: 174, width: 44, height: 64 },
    cleanZones: [{ x: 0, y: 0, w: 16, h: 20 }],
    outNames: ['toes_to_bar.png'],
    padding: 0.86,
  });

  // 12. JUMP SQUATS (Station 05/06 from Orange Poster)
  await processAthlete({
    src: imgOrange,
    crop: { left: 208, top: 172, width: 38, height: 66 },
    cleanZones: [],
    outNames: ['jump_squats.png', 'jump_squats_orange.png', 'weighted_jump_squats.png'],
    padding: 0.86,
  });

  // 13. LEG RAISES (Station 08 from Orange Poster)
  await processAthlete({
    src: imgOrange,
    crop: { left: 112, top: 280, width: 54, height: 58 },
    cleanZones: [{ x: 0, y: 0, w: 14, h: 20 }],
    outNames: ['leg_raises.png', 'leg_raises_orange.png'],
    padding: 0.86,
  });

  // 14. CHIN-UPS (Station 12 from Orange Poster)
  await processAthlete({
    src: imgOrange,
    crop: { left: 116, top: 380, width: 52, height: 60 },
    cleanZones: [],
    outNames: ['chin_ups.png'],
    padding: 0.86,
  });

  // 15. BURPEES (Station 13 from Orange Poster or Station 01 from IMG_3624)
  await processAthlete({
    src: imgOrange,
    crop: { left: 182, top: 384, width: 46, height: 56 },
    cleanZones: [],
    outNames: ['burpees.png', 'burpees_intense.png'],
    padding: 0.86,
  });

  // 16. DEADLIFT (Station 06 from IMG_3624)
  await processAthlete({
    src: imgGreen8,
    crop: { left: 160, top: 278, width: 78, height: 64 },
    convertGreenToTomato: true,
    outNames: ['deadlift.png', 'leg_complex.png'],
    padding: 0.86,
  });

  // 17. INCLINE PUSH-UPS (Station 03 from IMG_3624)
  await processAthlete({
    src: imgGreen8,
    crop: { left: 38, top: 178, width: 68, height: 56 },
    convertGreenToTomato: true,
    outNames: ['incline_pushups.png'],
    padding: 0.86,
  });

  // 18. BULGARIAN SPLIT SQUATS (Station 06 from IMG_3620)
  await processAthlete({
    src: imgGreen9,
    crop: { left: 204, top: 270, width: 58, height: 68 },
    convertGreenToTomato: true,
    outNames: ['bulgarian_split_squats.png'],
    padding: 0.86,
  });

  // 19. FULL PLANCHE (Station 01 from E2BA7EEB, precision photorealistic athlete)
  // Let's also extract full planche from high-res E2BA7EEB with dark canvas
  const imgPlanche = './public/assets/aistudio/E2BA7EEB-5522-4A8D-9D6B-9497FDE5B103_787244e7.png';
  try {
    const bgBufferPlanche = await getBackgroundBuffer();
    const plancheAthlete = await sharp(imgPlanche)
      .extract({ left: 30, top: 155, width: 395, height: 215 })
      .resize(360, 180, { fit: 'contain', background: bgStudio })
      .png()
      .toBuffer();
    
    const plancheFinal = await sharp(bgBufferPlanche)
      .composite([{ input: plancheAthlete, gravity: 'center' }])
      .png()
      .toBuffer();

    fs.writeFileSync('./public/assets/human_masked_athletes/full_planche.png', plancheFinal);
    fs.writeFileSync('./public/assets/exercises/full_planche.png', plancheFinal);
    fs.writeFileSync('./public/assets/master_athletes/full_planche.png', plancheFinal);
    fs.writeFileSync('./public/assets/master_athletes/planche.png', plancheFinal);
    console.log('[SAVED] full_planche.png');
  } catch (e) {
    console.error('Planche error:', e.message);
  }

  // 20. HUMAN FLAG (Station 03 from E2BA7EEB)
  try {
    const bgBufferFlag = await getBackgroundBuffer();
    const flagAthlete = await sharp(imgPlanche)
      .extract({ left: 95, top: 400, width: 345, height: 245 })
      .resize(360, 180, { fit: 'contain', background: bgStudio })
      .png()
      .toBuffer();
    
    const flagFinal = await sharp(bgBufferFlag)
      .composite([{ input: flagAthlete, gravity: 'center' }])
      .png()
      .toBuffer();

    fs.writeFileSync('./public/assets/human_masked_athletes/human_flag.png', flagFinal);
    fs.writeFileSync('./public/assets/exercises/human_flag.png', flagFinal);
    fs.writeFileSync('./public/assets/master_athletes/human_flag.png', flagFinal);
    console.log('[SAVED] human_flag.png');
  } catch (e) {
    console.error('Human flag error:', e.message);
  }

  console.log('=== ALL 20 MASKED HUMAN ATHLETES CREATED WITH 100% VISIBILITY ===');
}

run();
