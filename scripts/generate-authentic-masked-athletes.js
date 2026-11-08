import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './public/assets/exercises';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Tomato branding color and dark studio background
const bgStudio = { r: 7, g: 8, b: 12, alpha: 1 };

/**
 * Clean any green hue or border artifacts, replacing with dark studio #07080c,
 * and enhance Tomato #ff5722 accents.
 */
async function processFullAthleteCard(srcPath, cropBox, outFilename) {
  try {
    const rawBuffer = await sharp(srcPath)
      .extract(cropBox)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = rawBuffer;
    const channels = info.channels;
    const len = data.length;

    for (let i = 0; i < len; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Remove any green border or HUD artifacts (convert to clean dark background)
      if (g > 55 && g > r * 1.15 && g > b * 1.08) {
        data[i] = 7;
        data[i + 1] = 8;
        data[i + 2] = 12;
        data[i + 3] = 255;
      }
      // If dark pixel has greenish tint, neutralize to pure black/slate
      else if (r < 40 && b < 40 && g > 25) {
        data[i] = Math.min(r, 12);
        data[i + 1] = Math.min(g, 12);
        data[i + 2] = Math.min(b, 15);
      }
    }

    // Reconstruct sharp image, resize to high-resolution 424x212 (2:1 aspect ratio)
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .resize(424, 212, {
        fit: 'contain',
        background: bgStudio,
        kernel: sharp.kernel.lanczos3,
      })
      .modulate({
        brightness: 1.06,
        saturation: 1.18,
      })
      .sharpen({ sigma: 1.2, m1: 1.4, m2: 0.5 })
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(outDir, outFilename));

    console.log(`[SUCCESS] Full-visibility athlete render saved: ${outFilename}`);
  } catch (err) {
    console.error(`[ERROR] Processing failed for ${outFilename}:`, err.message);
  }
}

async function generateAllFullVisibilityAthletes() {
  console.log('=== GENERATING 100% UNCLIPPED MASKED ATHLETES (WIDE 2:1 ASPECT RATIO) ===');

  const imgOrange = './public/assets/aistudio/IMG_3621_32f9ba37.jpeg'; // Tomato 8-exercise poster
  const imgGreen8 = './public/assets/aistudio/IMG_3624_455fe7c7.jpeg'; // 8-exercise poster 2
  const img9 = './public/assets/aistudio/IMG_3620_f1d69469.jpeg';      // 9-exercise poster 3

  // --- FROM TOMATO POSTER (IMG_3621: 2 columns x 4 rows, width 286, height 512) ---
  // In each card (width ~110, height ~82):
  // Col 0: left: 22, width: 106. Col 1: left: 154, width: 106.
  // Row 0: top 70 + 10 = 80, height: 54
  // Row 1: top 160 + 10 = 170, height: 54
  // Row 2: top 250 + 10 = 260, height: 54
  // Row 3: top 340 + 10 = 350, height: 54

  // 1. ONE-ARM PULL-UPS (Tomato, Row 0 Col 0)
  await processFullAthleteCard(imgOrange, { left: 23, top: 78, width: 106, height: 56 }, 'one_arm_pullup.png');
  await processFullAthleteCard(imgOrange, { left: 23, top: 78, width: 106, height: 56 }, 'one_arm_pullup_elite.png');
  await processFullAthleteCard(imgOrange, { left: 23, top: 78, width: 106, height: 56 }, 'one_arm_pullup_orange.png');

  // 2. BAR MUSCLE-UPS (Tomato, Row 0 Col 1)
  await processFullAthleteCard(imgOrange, { left: 154, top: 78, width: 106, height: 56 }, 'muscle_up.png');
  await processFullAthleteCard(imgOrange, { left: 154, top: 78, width: 106, height: 56 }, 'muscle_up_elite.png');
  await processFullAthleteCard(imgOrange, { left: 154, top: 78, width: 106, height: 56 }, 'muscle_up_orange.png');

  // 3. STRAIGHT BAR DIPS (Tomato, Row 1 Col 0)
  await processFullAthleteCard(imgOrange, { left: 23, top: 168, width: 106, height: 56 }, 'straight_bar_dips.png');

  // 4. TOES TO BAR (Tomato, Row 1 Col 1)
  await processFullAthleteCard(imgOrange, { left: 154, top: 168, width: 106, height: 56 }, 'toes_to_bar.png');

  // 5. JUMP SQUATS (Tomato, Row 2 Col 0)
  await processFullAthleteCard(imgOrange, { left: 23, top: 258, width: 106, height: 56 }, 'jump_squats.png');
  await processFullAthleteCard(imgOrange, { left: 23, top: 258, width: 106, height: 56 }, 'jump_squats_orange.png');
  await processFullAthleteCard(imgOrange, { left: 23, top: 258, width: 106, height: 56 }, 'weighted_jump_squats.png');

  // 6. PARALLEL BAR DIPS (Tomato, Row 2 Col 1)
  await processFullAthleteCard(imgOrange, { left: 154, top: 258, width: 106, height: 56 }, 'parallel_bar_dips.png');
  await processFullAthleteCard(imgOrange, { left: 154, top: 258, width: 106, height: 56 }, 'parallel_dips_orange.png');
  await processFullAthleteCard(imgOrange, { left: 154, top: 258, width: 106, height: 56 }, 'parallel_dips_intense.png');

  // 7. LEG RAISES (Tomato, Row 3 Col 0)
  await processFullAthleteCard(imgOrange, { left: 23, top: 348, width: 106, height: 56 }, 'leg_raises.png');
  await processFullAthleteCard(imgOrange, { left: 23, top: 348, width: 106, height: 56 }, 'leg_raises_orange.png');

  // 8. PISTOL SQUATS (Tomato, Row 3 Col 1)
  await processFullAthleteCard(imgOrange, { left: 154, top: 348, width: 106, height: 56 }, 'pistol_squats.png');

  // --- FROM POSTER 2 (IMG_3624: 2 columns x 4 rows) ---
  // 9. WEIGHTED PULL-UPS (Row 0 Col 0)
  await processFullAthleteCard(imgGreen8, { left: 23, top: 78, width: 106, height: 56 }, 'weighted_pullups.png');

  // 10. FREESTANDING HANDSTAND PUSH-UPS (Row 0 Col 1)
  await processFullAthleteCard(imgGreen8, { left: 154, top: 78, width: 106, height: 56 }, 'freestanding_hspu.png');
  await processFullAthleteCard(imgGreen8, { left: 154, top: 78, width: 106, height: 56 }, 'freestanding_hspu_elite.png');
  await processFullAthleteCard(imgGreen8, { left: 154, top: 78, width: 106, height: 56 }, 'handstand_pushup_libre.png');

  // 11. INCLINE PUSH-UPS (Row 1 Col 0)
  await processFullAthleteCard(imgGreen8, { left: 23, top: 168, width: 106, height: 56 }, 'incline_pushups.png');

  // 12. LEG COMPLEX (Row 1 Col 1)
  await processFullAthleteCard(imgGreen8, { left: 154, top: 168, width: 106, height: 56 }, 'leg_complex.png');

  // 13. DEADLIFT (Row 2 Col 1)
  await processFullAthleteCard(imgGreen8, { left: 154, top: 258, width: 106, height: 56 }, 'deadlift.png');

  // 14. HANGING KNEE TO ELBOWS (Row 3 Col 1)
  await processFullAthleteCard(imgGreen8, { left: 154, top: 348, width: 106, height: 56 }, 'hanging_knee_to_elbows.png');

  // --- FROM POSTER 3 (IMG_3620: 3 columns x 3 rows) ---
  // In IMG_3620, width 286, height 512
  // Col 0: left 20, Col 1: left 104, Col 2: left 188. Card width ~78, height ~76.

  // 15. FULL PLANCHE (Row 0 Col 0)
  await processFullAthleteCard(img9, { left: 18, top: 108, width: 80, height: 58 }, 'full_planche.png');
  await processFullAthleteCard(img9, { left: 18, top: 108, width: 80, height: 58 }, 'planche.png');

  // 16. SINGLE-ARM FRONT RAISES (Row 0 Col 1)
  await processFullAthleteCard(img9, { left: 102, top: 108, width: 80, height: 58 }, 'single_arm_front_raises.png');

  // 17. CHIN-UPS (Row 0 Col 2)
  await processFullAthleteCard(img9, { left: 186, top: 108, width: 80, height: 58 }, 'chin_ups.png');

  // 18. FLOOR RING CHEST FLYES (Row 1 Col 0)
  await processFullAthleteCard(img9, { left: 18, top: 226, width: 80, height: 58 }, 'ring_chest_flyes.png');

  // 19. INCLINE DUMBBELL PRESS (Row 1 Col 1)
  await processFullAthleteCard(img9, { left: 102, top: 226, width: 80, height: 58 }, 'incline_dumbbell_press.png');

  // 20. BULGARIAN SPLIT SQUATS (Row 1 Col 2)
  await processFullAthleteCard(img9, { left: 186, top: 226, width: 80, height: 58 }, 'bulgarian_split_squats.png');

  // 21. L-SIT RING PULL-UPS (Row 2 Col 0)
  await processFullAthleteCard(img9, { left: 18, top: 342, width: 80, height: 58 }, 'l_sit_ring_pullups.png');

  // 22. DRAGON FLAGS (Row 2 Col 2)
  await processFullAthleteCard(img9, { left: 186, top: 342, width: 80, height: 58 }, 'dragon_flags.png');

  // 23. FRONT LEVER
  await processFullAthleteCard(imgGreen8, { left: 23, top: 348, width: 106, height: 56 }, 'front_lever.png');
  await processFullAthleteCard(imgGreen8, { left: 23, top: 348, width: 106, height: 56 }, 'front_lever_elite.png');
  await processFullAthleteCard(imgGreen8, { left: 23, top: 348, width: 106, height: 56 }, 'weighted_front_lever.png');

  // 24. CLAP PUSH-UPS
  await processFullAthleteCard(imgOrange, { left: 23, top: 168, width: 106, height: 56 }, 'clap_pushups.png');

  // 25. BURPEES
  await processFullAthleteCard(img9, { left: 102, top: 342, width: 80, height: 58 }, 'burpees.png');
  await processFullAthleteCard(img9, { left: 102, top: 342, width: 80, height: 58 }, 'burpees_intense.png');

  // 26. HUMAN FLAG
  await processFullAthleteCard(imgGreen8, { left: 23, top: 348, width: 106, height: 56 }, 'human_flag.png');

  console.log('=== FINISHED ALL FULL-VISIBILITY ATHLETE GENERATIONS ===');
}

generateAllFullVisibilityAthletes();
