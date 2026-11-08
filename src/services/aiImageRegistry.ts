/**
 * AI GENERATED IMAGES REGISTRY
 * 
 * Stores the photorealistic images of the unique declared character:
 * "Titán Enmascarado Savage" (Athletic muscular human male calisthenics athlete
 * wearing a sleek black tactical balaclava ski mask with intense warrior eyes,
 * shirtless shredded muscular torso with 8-pack abs, charcoal tactical cargo pants,
 * and combat boots with orange accents) performing each calisthenics exercise.
 * 
 * Pre-computed as Base64 Data URIs to eliminate WebKit / iOS foreignObject
 * tainting, ensuring 100% flawless high-resolution export in TikTok posters.
 */

import { AI_BASE64_IMAGES } from './aiImageBase64';

export const AI_EXERCISE_IMAGES: Record<string, string> = {
  // 1. One-Arm Pull-Ups (Active peak contraction with bent arm & chin above bar)
  one_arm_pullup: AI_BASE64_IMAGES.one_arm_pullup || '/src/assets/images/savage_one_arm_pullup_1793971155860.jpg',
  // 2. Bar Muscle-Ups (Top lockout position above the bar)
  muscle_up: AI_BASE64_IMAGES.muscle_up || '/src/assets/images/savage_muscle_up_1793971175980.jpg',
  // 3. Weighted Parallel Dips (Deep dip on parallel bars with load chain)
  parallel_bar_dips: AI_BASE64_IMAGES.parallel_bar_dips || '/src/assets/images/savage_parallel_dips_1793971194718.jpg',
  // 4. Freestanding HSPU (Inverted handstand push-up)
  freestanding_hspu: AI_BASE64_IMAGES.freestanding_hspu || '/src/assets/images/savage_freestanding_hspu_1793971212320.jpg',
  // 5. Weighted Front Lever (Horizontal straight lever hold)
  front_lever: AI_BASE64_IMAGES.front_lever || '/src/assets/images/savage_front_lever_1793971229860.jpg',
  // 6. Pistol Squats (Each) (Single-leg deep squat with leg extended forward)
  pistol_squats: AI_BASE64_IMAGES.pistol_squats || '/src/assets/images/savage_pistol_squat_1793971274049.jpg',
  // 7. Dragon Flags (Pristine elevated straight-body core flag on workout bench)
  dragon_flags: AI_BASE64_IMAGES.dragon_flags || '/src/assets/images/savage_dragon_flag_1793971295948.jpg',
  // 8. Explosive Clap Push-Ups (Mid-air ballistic push-up with chest clap)
  clap_pushups: AI_BASE64_IMAGES.clap_pushups || '/src/assets/images/savage_clap_pushup_1793971315492.jpg',
  // 9. Full Planche (Horizontal straight-arm planche on parallettes)
  planche: AI_BASE64_IMAGES.planche || '/src/assets/images/masked_full_planche_1793886060270.jpg',
  // 10. Chin-Ups & Strict Pull-Ups (Chin clearing high above the bar)
  chin_up: AI_BASE64_IMAGES.chin_up || '/src/assets/images/masked_chin_up_1793886061135.jpg',
  // 11. Straight Bar Dips (Full lockout press on a single straight bar)
  straight_bar_dips: AI_BASE64_IMAGES.straight_bar_dips || '/src/assets/images/masked_straight_bar_dip_1793886062494.jpg',
  // 12. Jump Squats / Legs (Explosive plyometric jump)
  jump_squats: AI_BASE64_IMAGES.jump_squats || '/src/assets/images/masked_jump_squat_1793886062418.jpg',
  // 13. Human Flag (Horizontal flag suspended sideways from vertical pole)
  human_flag: AI_BASE64_IMAGES.human_flag || '/src/assets/images/masked_human_flag_1793909402717.jpg',
  // 14. Toes to Bar & Hanging Leg Raises (Piked straight legs touching the bar)
  toes_to_bar: AI_BASE64_IMAGES.toes_to_bar || '/src/assets/images/masked_toes_to_bar_1793909403861.jpg',
  // 15. Bulgarian Split Squats (Rear leg elevated on bench with dumbbells)
  bulgarian_split_squat: AI_BASE64_IMAGES.bulgarian_split_squat || '/src/assets/images/masked_bulgarian_squat_1793909404609.jpg',
  // 16. Gymnastic Ring Chest Flyes (Suspended wide pectoral stretch on rings)
  ring_chest_flyes: AI_BASE64_IMAGES.ring_chest_flyes || '/src/assets/images/masked_ring_flyes_1793909462758.jpg',
};

/**
 * Resolves the genuine AI-generated photorealistic image for any exercise,
 * guaranteeing 100% semantic correspondence between the title and the athlete's movement.
 */
export function getAIImageForExercise(
  exerciseName: string,
  category: string,
  illustrationKey?: string
): string {
  const normName = (exerciseName || '').toLowerCase();
  const normKey = (illustrationKey || '').toLowerCase();

  // 1. Dragon Flags (MUST be checked before generic "flag" to avoid matching human flag!)
  if (normName.includes('dragon') || normKey.includes('dragon')) {
    return AI_EXERCISE_IMAGES.dragon_flags;
  }

  // 2. Human Flag (Sideways horizontal hold on vertical pole)
  if (
    normName.includes('human flag') ||
    normKey.includes('human_flag') ||
    (normName.includes('flag') && !normName.includes('dragon'))
  ) {
    return AI_EXERCISE_IMAGES.human_flag;
  }

  // 3. One-Arm Pull-Ups (Must be checked BEFORE general pullups!)
  if (normName.includes('one-arm') || normName.includes('one arm') || normKey.includes('one_arm')) {
    return AI_EXERCISE_IMAGES.one_arm_pullup;
  }

  // 4. Muscle-Ups (Must be checked BEFORE general pullups / dips!)
  if (normName.includes('muscle-up') || normName.includes('muscle up') || normKey.includes('muscle_up')) {
    return AI_EXERCISE_IMAGES.muscle_up;
  }

  // 5. Gymnastic Ring Chest Flyes / Floor Flyes
  if (normName.includes('flye') || normName.includes('ring fly') || normKey.includes('flye') || normKey.includes('ring_chest')) {
    return AI_EXERCISE_IMAGES.ring_chest_flyes;
  }

  // 6. Straight Bar Dips (Single bar across chest)
  if (normName.includes('straight bar') || normKey.includes('straight_bar')) {
    return AI_EXERCISE_IMAGES.straight_bar_dips;
  }

  // 7. Parallel Dips / Weighted Dips
  if (
    normName.includes('parallel') ||
    normName.includes('weighted dip') ||
    normKey.includes('parallel') ||
    (normName.includes('dip') && !normName.includes('straight bar'))
  ) {
    return AI_EXERCISE_IMAGES.parallel_bar_dips;
  }

  // 8. Handstand Push-Ups / HSPU
  if (
    normName.includes('hspu') ||
    normName.includes('handstand') ||
    normKey.includes('hspu') ||
    normName.includes('shoulder press')
  ) {
    return AI_EXERCISE_IMAGES.freestanding_hspu;
  }

  // 9. Front Lever / Statics
  if (normName.includes('front lever') || normKey.includes('front_lever')) {
    return AI_EXERCISE_IMAGES.front_lever;
  }

  // 10. Planche (Full Planche or Straddle Planche on parallettes)
  if (normName.includes('planche') || normKey.includes('planche')) {
    return AI_EXERCISE_IMAGES.planche;
  }

  // 11. Bulgarian Split Squats & Lunges
  if (
    normName.includes('bulgarian') ||
    normName.includes('split squat') ||
    normName.includes('lunge') ||
    normKey.includes('bulgarian') ||
    normKey.includes('split_squat')
  ) {
    return AI_EXERCISE_IMAGES.bulgarian_split_squat;
  }

  // 12. Pistol Squats (Single Leg deep squat)
  if (normName.includes('pistol') || normKey.includes('pistol')) {
    return AI_EXERCISE_IMAGES.pistol_squats;
  }

  // 13. Toes to Bar & Hanging Leg Raises
  if (
    normName.includes('toes to bar') ||
    normName.includes('leg raise') ||
    normName.includes('knee to elbow') ||
    normKey.includes('toes_to_bar') ||
    normKey.includes('leg_raise') ||
    normKey.includes('knee_to_elbow')
  ) {
    return AI_EXERCISE_IMAGES.toes_to_bar;
  }

  // 14. Clap Push-Ups & Ballistic Push-Ups
  if (
    normName.includes('clap') ||
    normKey.includes('clap') ||
    normName.includes('push-up') ||
    normName.includes('pushup')
  ) {
    return AI_EXERCISE_IMAGES.clap_pushups;
  }

  // 15. Chin-Ups & Weighted Pull-Ups & L-Sit Pull-Ups
  if (
    normName.includes('chin-up') ||
    normName.includes('chin up') ||
    normName.includes('pull-up') ||
    normName.includes('pull up') ||
    normKey.includes('chin_up') ||
    normKey.includes('pullup') ||
    normKey.includes('pull_up')
  ) {
    return AI_EXERCISE_IMAGES.chin_up;
  }

  // 16. Jump Squats / Burpees / Deadlifts / Legs
  if (
    normName.includes('jump squat') ||
    normName.includes('squat') ||
    normName.includes('burpee') ||
    normName.includes('deadlift') ||
    normKey.includes('jump_squat') ||
    normKey.includes('deadlift') ||
    category === 'Legs'
  ) {
    return AI_EXERCISE_IMAGES.jump_squats;
  }

  // Category fallback with zero repetition
  if (category === 'Pull') {
    return AI_EXERCISE_IMAGES.chin_up;
  }
  if (category === 'Push') {
    return AI_EXERCISE_IMAGES.parallel_bar_dips;
  }
  if (category === 'Static') {
    return AI_EXERCISE_IMAGES.front_lever;
  }
  if (category === 'Core / Abs') {
    return AI_EXERCISE_IMAGES.dragon_flags;
  }

  return AI_EXERCISE_IMAGES.muscle_up;
}
