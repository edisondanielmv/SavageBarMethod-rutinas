import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './public/assets/exercises';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Tactical dark studio background matching the poster cards exactly
const bgStudio = { r: 7, g: 8, b: 12, alpha: 1 };

async function processCrop(srcPath, extractBox, outFilename) {
  try {
    await sharp(srcPath)
      .extract(extractBox)
      // Generous 'contain' ensures full head, limbs, feet, and equipment are 100% visible
      .resize(360, 270, {
        fit: 'contain',
        background: bgStudio,
      })
      // Enhance realism: crisp muscle definition, balaclava texture, and contrast
      .sharpen({ sigma: 1.15, m1: 1.3, m2: 0.6 })
      .modulate({
        brightness: 1.05,
        saturation: 1.1,
      })
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(path.join(outDir, outFilename));

    console.log(`[SUCCESS] Saved ${outFilename} with full body & realistic enhancement`);
  } catch (err) {
    console.error(`[ERROR] Failed to process ${outFilename}:`, err.message);
  }
}

async function cropAll() {
  console.log('--- RE-GENERATING ENHANCED FULL-BODY MASKED ATHLETES ---');

  const imgOrange = './public/assets/aistudio/IMG_3621_32f9ba37.jpeg';
  const img12 = './public/assets/aistudio/IMG_3625_102e53a0.jpeg';
  const img8 = './public/assets/aistudio/IMG_3624_455fe7c7.jpeg';
  const img9 = './public/assets/aistudio/IMG_3620_f1d69469.jpeg';

  // 1. ELITE STATICS & ADVANCED PULL/PUSH
  // Front Lever (Full body horizontal on bar)
  await processCrop(img12, { left: 180, top: 60, width: 94, height: 72 }, 'weighted_front_lever.png');
  await processCrop(img12, { left: 180, top: 60, width: 94, height: 72 }, 'front_lever_elite.png');

  // Full Planche (Full body horizontal with arms locked)
  await processCrop(img9, { left: 12, top: 226, width: 88, height: 88 }, 'full_planche.png');

  // Human Flag (Full body sideways on vertical pole)
  await processCrop(imgOrange, { left: 108, top: 278, width: 80, height: 68 }, 'human_flag.png');

  // One-Arm Pull-Up (Complete hanging athlete, head to toes)
  await processCrop(imgOrange, { left: 58, top: 62, width: 74, height: 82 }, 'one_arm_pullup_elite.png');
  await processCrop(imgOrange, { left: 58, top: 62, width: 74, height: 82 }, 'one_arm_pullup_orange.png');

  // Bar Muscle-Up (Full athlete above bar, arms locked)
  await processCrop(imgOrange, { left: 172, top: 62, width: 98, height: 82 }, 'muscle_up_elite.png');
  await processCrop(imgOrange, { left: 172, top: 62, width: 98, height: 82 }, 'muscle_up_orange.png');

  // Freestanding HSPU (Full body vertical handstand)
  await processCrop(img8, { left: 18, top: 374, width: 118, height: 88 }, 'freestanding_hspu.png');
  await processCrop(img8, { left: 18, top: 374, width: 118, height: 88 }, 'freestanding_hspu_elite.png');

  // Straight Bar Dips (Full torso, head, and straight bar)
  await processCrop(imgOrange, { left: 22, top: 162, width: 98, height: 78 }, 'straight_bar_dips.png');

  // Parallel Bar Dips (Full athlete between bars, knees and feet)
  await processCrop(img8, { left: 18, top: 272, width: 118, height: 88 }, 'parallel_bar_dips.png');
  await processCrop(imgOrange, { left: 38, top: 272, width: 84, height: 72 }, 'parallel_dips_orange.png');
  await processCrop(img9, { left: 100, top: 340, width: 86, height: 94 }, 'parallel_dips_intense.png');

  // Weighted Pull-Ups / Explosive Pull-Ups (Full bar, arms, chest, legs)
  await processCrop(img8, { left: 146, top: 64, width: 118, height: 88 }, 'weighted_pullups.png');

  // Chin-Ups (Full athlete in chin-up posture)
  await processCrop(imgOrange, { left: 116, top: 372, width: 78, height: 75 }, 'chin_ups.png');

  // Clap Push-Ups (Full plank & clap action)
  await processCrop(imgOrange, { left: 182, top: 300, width: 84, height: 48 }, 'clap_pushups.png');

  // Incline Push-Ups
  await processCrop(img8, { left: 18, top: 168, width: 118, height: 88 }, 'incline_pushups.png');

  // Incline Dumbbell Press (Full bench, athlete, dumbbells)
  await processCrop(img9, { left: 100, top: 224, width: 86, height: 92 }, 'incline_dumbbell_press.png');

  // Floor Ring Chest Flyes (Full rings, arms outstretched, body)
  await processCrop(img9, { left: 14, top: 224, width: 86, height: 92 }, 'ring_chest_flyes.png');

  // Toes to Bar (Full athlete hanging, toes touching bar)
  await processCrop(imgOrange, { left: 118, top: 164, width: 70, height: 75 }, 'toes_to_bar.png');

  // Hanging Knee to Elbows
  await processCrop(img8, { left: 146, top: 374, width: 118, height: 88 }, 'hanging_knee_to_elbows.png');

  // Leg Raises (Hanging leg raises with full legs extended)
  await processCrop(imgOrange, { left: 118, top: 272, width: 68, height: 72 }, 'leg_raises_orange.png');

  // L-Sit Ring Pull-Ups (Full L-sit position with rings)
  await processCrop(img9, { left: 14, top: 340, width: 86, height: 94 }, 'l_sit_ring_pullups.png');

  // Dragon Flags (Full body raised on bench)
  await processCrop(img9, { left: 186, top: 340, width: 88, height: 94 }, 'dragon_flags.png');

  // Pistol Squats (Full single-leg squat, extended leg and arms)
  await processCrop(imgOrange, { left: 180, top: 272, width: 76, height: 74 }, 'pistol_squats.png');

  // Jump Squats (Full crouch and explosive posture)
  await processCrop(imgOrange, { left: 188, top: 164, width: 68, height: 74 }, 'jump_squats_orange.png');
  await processCrop(img9, { left: 186, top: 104, width: 86, height: 94 }, 'weighted_jump_squats.png');

  // Bulgarian Split Squats (Full bench, legs, athlete)
  await processCrop(img9, { left: 186, top: 224, width: 86, height: 94 }, 'bulgarian_split_squats.png');

  // Deadlift / Leg Complex (Full barbell and athlete)
  await processCrop(img8, { left: 146, top: 272, width: 118, height: 88 }, 'deadlift.png');
  await processCrop(img8, { left: 146, top: 168, width: 118, height: 88 }, 'leg_complex.png');

  // Single-Arm Front Raises
  await processCrop(img9, { left: 100, top: 104, width: 86, height: 94 }, 'single_arm_front_raises.png');

  // Burpees (Full push-up & jump athlete)
  await processCrop(img8, { left: 18, top: 64, width: 118, height: 88 }, 'burpees.png');
  await processCrop(img9, { left: 14, top: 104, width: 86, height: 94 }, 'burpees_intense.png');

  console.log('--- ALL FULL-BODY REALISTIC CHARACTERS EXTRACTED SUCCESSFULLY ---');
}

cropAll().catch(console.error);
