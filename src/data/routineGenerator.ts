import { Exercise, CalisthenicsRoutine, RoutineFocus, HudTheme } from '../types/calisthenics';
import { generateAIGraphicForExercise } from '../services/aiGraphicService';
import { getAIImageForExercise } from '../services/aiImageRegistry';

export interface ExerciseTemplate {
  baseName: string;
  category: Exercise['category'];
  illustrationKey: string;
  muscleTarget: string;
  technicalCues: string[];
  progressionTips: string[];
  // Possible load variations
  loadOptions: string[];
  // Possible rep options
  repOptions: string[];
  // Possible sets options
  setOptions: string[];
  // Applicable categories
  applicableFoci: RoutineFocus[];
  isWeightedCandidate?: boolean;
}

export const EXERCISE_TEMPLATES: ExerciseTemplate[] = [
  // --- CHEST & PUSH FOCUS ---
  {
    baseName: 'WEIGHTED PARALLEL BAR DIPS',
    category: 'Push',
    illustrationKey: 'parallel_bar_dips',
    muscleTarget: 'Lower pectoralis major, triceps brachii, and anterior deltoids',
    technicalCues: [
      'Torso angled forward 30° for maximal chest activation. Descend until elbows break 90°.',
      'Active depressed scapulae throughout entire ROM. Controlled lockout without hyperextending elbows.',
      '2-second eccentric cadence; zero bouncing at the bottom to protect joint capsule.',
    ],
    progressionTips: [
      'Add +2.5 kg to weight belt once you complete all sets cleanly.',
      'Progress to a 1-second isometric pause at maximum depth before adding more load.',
    ],
    loadOptions: ['+15 Kg', '+20 Kg', '+25 Kg', '+30 Kg', '+10 Kg'],
    repOptions: ['Reps: 8-10', 'Reps: 12', 'Reps: 6-8', 'Reps: 15'],
    setOptions: ['Sets: 4', 'Sets: 5', 'Sets: 4 Sets Heavy'],
    applicableFoci: ['pecho', 'brazos', 'todo-el-cuerpo', 'circuito-resistencia', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'STRAIGHT BAR DIPS',
    category: 'Push',
    illustrationKey: 'straight_bar_dips',
    muscleTarget: 'Clavicular pectoral head, triceps, and shoulder girdle stabilizers',
    technicalCues: [
      'Chest positioned over the bar, legs slightly forward in hollow body.',
      'Touch sternum to the bar before pressing up with maximal acceleration.',
      'Keep elbows tracking backward without flaring excessively outward.',
    ],
    progressionTips: [
      'Start with strict bodyweight repetitions without hip swing before adding external load.',
      'Add 5 repetitions per session toward sets of 25-30 continuous reps.',
    ],
    loadOptions: ['Load: 0 Kg', '+10 Kg', '+15 Kg', 'Bodyweight'],
    repOptions: ['Reps: 20', 'Reps: 25', 'Reps: 30', 'Reps: 15'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['pecho', 'brazos', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'FLOOR RING CHEST FLYES',
    category: 'Push',
    illustrationKey: 'ring_chest_flyes',
    muscleTarget: 'Mid chest, sternal fibers, and anterior shoulder stability',
    technicalCues: [
      'Wide chest opening with locked semi-flexed elbows. Full fascial chest stretch.',
      'Squeeze pectorals on closure and maintain posterior pelvic tilt without sagging hips.',
    ],
    progressionTips: [
      'Lower ring height 5 cm each session to increase horizontal lever arm.',
      'Add a 5 to 10 kg weighted vest once you control 10 ground-level reps.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Vest', '+10 Kg', 'Bodyweight'],
    repOptions: ['Reps: 8-10', 'Reps: 10', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 3', 'Sets: 4'],
    applicableFoci: ['pecho', 'brazos', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'CLAP PUSH-UPS',
    category: 'Push',
    illustrationKey: 'clap_pushups',
    muscleTarget: 'Pectoralis major (type IIb fast twitch), triceps, and deltoids',
    technicalCues: [
      'Explosive ballistic push launching completely off floor with clean air clap and soft landing.',
      'Absorb impact instantly and cycle smoothly into the next repetition.',
    ],
    progressionTips: [
      'Progress to double clap (chest and thighs) or behind-back clap once mastering 25 reps.',
      'Minimize ground contact time on each cycle.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+5 Kg Vest'],
    repOptions: ['Reps: 20', 'Reps: 25', 'Reps: 30', 'Reps: 15'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['pecho', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'INCLINE PUSH-UPS (FEET ELEVATED)',
    category: 'Push',
    illustrationKey: 'incline_pushups',
    muscleTarget: 'Upper chest (clavicular head) and anterior deltoids',
    technicalCues: [
      'Feet on wall or box at 60-90 cm. Rigid plank posture, gaze fixed between hands.',
      'Lower forehead toward floor along a controlled diagonal trajectory.',
    ],
    progressionTips: [
      'Elevate feet higher over time toward wall handstand pushup positioning.',
      'Add a 10-15 kg weight plate onto upper back with a partner.',
    ],
    loadOptions: ['Load: 0 Kg', '+10 Kg', '+15 Kg', 'Bodyweight'],
    repOptions: ['Reps: 10-12', 'Reps: 15', 'Reps: 8'],
    setOptions: ['Sets: 4', 'Sets: 4', 'Sets: 3'],
    applicableFoci: ['pecho', 'brazos', 'todo-el-cuerpo', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'INCLINE DUMBBELL / CALISTHENICS PRESS',
    category: 'Push',
    illustrationKey: 'incline_dumbbell_press',
    muscleTarget: 'Upper pectorals, triceps, and rotator cuff',
    technicalCues: [
      'Active scapular retraction on incline bench. Vertical press with elbows at 45°.',
      'Controlled opening at the base and 1-second isometric squeeze at the apex.',
    ],
    progressionTips: [
      'Increment dumbbell weight by 2 kg every 2 weeks while holding target reps.',
    ],
    loadOptions: ['+20 Kg', '+25 Kg', '+30 Kg', '+15 Kg'],
    repOptions: ['Reps: 10', 'Reps: 12', 'Reps: 8'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['pecho', 'brazos', 'todo-el-cuerpo', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'FREESTANDING HSPU',
    category: 'Push',
    illustrationKey: 'freestanding_hspu',
    muscleTarget: 'Full deltoids, triceps, upper trapezius, and core stabilizers',
    technicalCues: [
      'Freestanding handstand without wall support. Controlled tripod formation between head and hands.',
      'Reactive vertical drive with elbows tucked inward, finishing in full shoulder lockout.',
    ],
    progressionTips: [
      'Introduce deficit by placing parallettes or wooden blocks under hands.',
      'Work 3 to 5 strict reps with 3-second eccentric tempo.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+2.5 Kg'],
    repOptions: ['Reps: 5', 'Reps: 6-8', 'Reps: 4 Heavy', 'Reps: 8'],
    setOptions: ['Sets: 4', 'Sets: 5', 'Sets: 4'],
    applicableFoci: ['pecho', 'brazos', 'estaticos', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },

  // --- BACK & PULL FOCUS ---
  {
    baseName: 'WEIGHTED PULL-UPS',
    category: 'Pull',
    illustrationKey: 'weighted_pullups',
    muscleTarget: 'Latissimus dorsi, teres major, rhomboids, biceps brachii, and brachioradialis',
    technicalCues: [
      'Overhand shoulder-width grip. Explosive pull driving upper sternum to the bar.',
      'Isometric pause with chin clearing the bar and full elbow dead-hang extension at bottom.',
    ],
    progressionTips: [
      'Add 2.5 kg to weight belt once you complete 4 sets of 10 clean reps.',
      'Run pyramid sets: 15kg -> 20kg -> 25kg -> 30kg during strength blocks.',
    ],
    loadOptions: ['+20 Kg', '+25 Kg', '+30 Kg', '+15 Kg', '+10 Kg'],
    repOptions: ['Reps: 8-10', 'Reps: 10', 'Reps: 6 Heavy', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 5', 'Sets: 4'],
    applicableFoci: ['espalda', 'brazos', 'todo-el-cuerpo', 'circuito-resistencia', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'ONE-ARM PULL-UPS (EACH)',
    category: 'Pull',
    illustrationKey: 'one_arm_pullup_elite',
    muscleTarget: 'Extreme unilateral lat strength, biceps, forearm, and scapular depressors',
    technicalCues: [
      'Free arm pinned tight to side or extended for counter-balance. Pure pull without body swing.',
      'Scapular depression initiated before elbow flexion. Lock chin securely over the wrist.',
    ],
    progressionTips: [
      'Use one-finger assistance from opposite hand on the bar if third rep fails.',
      'Increase total sets before pursuing consecutive unbroken repetitions.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+2 Kg'],
    repOptions: ['Reps: 3 Each', 'Reps: 4 Each', 'Reps: 2-3 Each', 'Reps: 5 Each'],
    setOptions: ['Sets: 4', 'Sets: 5', 'Sets: 3 Rounds'],
    applicableFoci: ['espalda', 'brazos', 'estaticos', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'BAR MUSCLE-UPS',
    category: 'Pull',
    illustrationKey: 'muscle_up_elite',
    muscleTarget: 'Explosive lats, chest, anterior deltoids, triceps, and forearms',
    technicalCues: [
      'Pull to upper ribcage / navel in clean hollow arc. Aggressive wrist snap over the bar.',
      'Press out into straight-arm dip and lower down under full control without swing.',
    ],
    progressionTips: [
      'Add a 5 kg weighted vest or dumbbell clamped between ankles.',
      'Strive for High Muscle-ups (navel clearing the bar) prior to the dip transition.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Vest', '+10 Kg', 'Bodyweight'],
    repOptions: ['Reps: 8', 'Reps: 10', 'Reps: 12', 'Reps: 6 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['espalda', 'brazos', 'pecho', 'estaticos', 'todo-el-cuerpo', 'circuito-resistencia', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'WEIGHTED CHIN-UPS',
    category: 'Pull',
    illustrationKey: 'chin_ups',
    muscleTarget: 'Biceps brachii, brachialis, mid-lats, and teres major',
    technicalCues: [
      'Narrow underhand grip. Pull chest directly into physical contact with the bar.',
      '3-second eccentric lowering to maximize biceps mechanical tension and hypertrophy.',
    ],
    progressionTips: [
      'Add weight to belt in increments of 2.5 kg to 5 kg.',
      'Incorporate a 2-second isometric pause at 90° elbow flexion during descent.',
    ],
    loadOptions: ['+15 Kg', '+20 Kg', '+25 Kg', '+10 Kg'],
    repOptions: ['Reps: 10', 'Reps: 12', 'Reps: 8', 'Reps: 15'],
    setOptions: ['Sets: 4', 'Sets: 4', 'Sets: 3 Rounds'],
    applicableFoci: ['espalda', 'brazos', 'circuito-resistencia', 'todo-el-cuerpo', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'EXPLOSIVE HIGH PULL-UPS',
    category: 'Pull',
    illustrationKey: 'weighted_pullups',
    muscleTarget: 'Fast-twitch lats, rear deltoids, traps, and hip flexors',
    technicalCues: [
      'Pull with ballistic velocity aiming for sternum or lower abdomen to touch the bar.',
      'No leg kicking; rigid hollow body to transfer 100% of pulling power.',
    ],
    progressionTips: [
      'Aim for a progressively lower marker on your torso to clear above the bar.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Vest', 'Bodyweight'],
    repOptions: ['Reps: 8', 'Reps: 10', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['espalda', 'todo-el-cuerpo', 'circuito-resistencia'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'L-SIT RING PULL-UPS',
    category: 'Pull',
    illustrationKey: 'l_sit_ring_pullups',
    muscleTarget: 'Latissimus dorsi, rectus abdominis, psoas, and quadriceps',
    technicalCues: [
      'Legs locked parallel to floor at 90° held throughout ascent and descent.',
      'Rings turned out at the apex for peak lat contraction.',
    ],
    progressionTips: [
      'If knees buckle, train with 1-2 kg ankle weights on standard pull-ups first.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Vest', 'Bodyweight'],
    repOptions: ['Reps: 8-10', 'Reps: 10', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['espalda', 'abdomen', 'estaticos', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'HEAVY DEADLIFT / BARBELL ROW',
    category: 'Legs',
    illustrationKey: 'deadlift',
    muscleTarget: 'Posterior chain, spinal erectors, glutes, trapezius, and forearms',
    technicalCues: [
      'Bar dragging tight against shins, neutral spine, and deep hip hinge.',
      'Explosive glute lockout at top without hyperextending lumbar spine.',
    ],
    progressionTips: [
      'Add 5 kg to the bar every 2 weeks as long as form is locked.',
    ],
    loadOptions: ['+40 Kg', '+50 Kg', '+60 Kg', '+30 Kg'],
    repOptions: ['Reps: 10', 'Reps: 8 Heavy', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 4', 'Sets: 5'],
    applicableFoci: ['espalda', 'piernas', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },

  // --- STATICS & ISOMETRICS ---
  {
    baseName: 'FULL PLANCHE',
    category: 'Static',
    illustrationKey: 'full_planche',
    muscleTarget: 'Anterior deltoids, distal biceps tendon, serratus anterior, and lumbar core',
    technicalCues: [
      'Arms locked perfectly straight, maximal scapular protraction and depression.',
      'Body horizontal to the floor, neutral pelvis, and pointed toes.',
    ],
    progressionTips: [
      'Add 2 seconds per set or use light resistance band assistance.',
      'Progress from straddle to full planche by closing legs incrementally.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+1.5 Kg Cuffs'],
    repOptions: ['Hold: 8-12s', 'Hold: 10-15s', 'Hold: 15s', 'Hold: 5-8s Max'],
    setOptions: ['Sets: 5', 'Sets: 4', 'Sets: 6'],
    applicableFoci: ['estaticos', 'brazos', 'pecho', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'FRONT LEVER (WEIGHTED OR STRICT)',
    category: 'Static',
    illustrationKey: 'front_lever_elite',
    muscleTarget: 'Latissimus dorsi, teres major, rectus abdominis, long head triceps, and glutes',
    technicalCues: [
      'Straight arm pull driving the bar toward hips with locked elbows.',
      'Body parallel to ground without breaking at the waist or shrugging shoulders.',
    ],
    progressionTips: [
      'Add 2.5 kg to 5 kg in ankle weights once you master 15 clean seconds.',
      'Train concentric Front Lever raises from dead-hang to horizontal.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Load', '+10 Kg', 'Bodyweight'],
    repOptions: ['Hold: 10-15s', 'Hold: 12-15s', 'Hold: 8-10s Heavy', 'Hold: 15-20s'],
    setOptions: ['Sets: 4', 'Sets: 5', 'Sets: 4'],
    applicableFoci: ['estaticos', 'espalda', 'abdomen', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'HUMAN FLAG',
    category: 'Static',
    illustrationKey: 'human_flag',
    muscleTarget: 'Internal/external obliques, lats, deltoids, and quadratus lumborum',
    technicalCues: [
      'Bottom arm drives hard into the pole with locked elbow; top arm pulls forcefully.',
      'Torso and legs aligned straight without rotation relative to the vertical.',
    ],
    progressionTips: [
      'Transition from straddle flag to legs-together full flag.',
      'Train both sides evenly alternating sets.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight'],
    repOptions: ['Hold: 8-10s Each', 'Hold: 10-12s Each', 'Hold: 12s'],
    setOptions: ['Sets: 4 Each Side', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['estaticos', 'abdomen', 'brazos', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'WEIGHTED FRONT LEVER RAISES',
    category: 'Static',
    illustrationKey: 'weighted_front_lever',
    muscleTarget: 'Latissimus dorsi, lower chest, deep abs, and pelvic stabilizers',
    technicalCues: [
      'Dynamic raise from dead hang to horizontal with extended elbows.',
      '2-second isometric pause at parallel before lowering in slow motion.',
    ],
    progressionTips: [
      'Increase ankle cuff weight from 2 kg to 5 kg while keeping legs straight.',
    ],
    loadOptions: ['+5 Kg', '+10 Kg', 'Load: 0 Kg', 'Bodyweight'],
    repOptions: ['Reps: 6-8', 'Reps: 8', 'Reps: 5 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['estaticos', 'espalda', 'abdomen'],
    isWeightedCandidate: true,
  },

  // --- CORE & ABDOMEN FOCUS ---
  {
    baseName: 'DRAGON FLAGS',
    category: 'Core / Abs',
    illustrationKey: 'dragon_flags',
    muscleTarget: 'Full rectus abdominis, transversus, latissimus dorsi, and glutes',
    technicalCues: [
      'Supported solely on upper scapulae against the bench or pole.',
      'Rigid straight-line body, slow 4-second descent without breaking hips.',
    ],
    progressionTips: [
      'Place a 5 kg plate over thighs or wear weighted ankle cuffs.',
      'Add isometric pauses at 15°, 45°, and 60° during the eccentric lowering.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg', '+10 Kg', 'Bodyweight'],
    repOptions: ['Reps: 8-10', 'Reps: 10', 'Reps: 7 Heavy', 'Reps: 12'],
    setOptions: ['Sets: 4', 'Sets: 4', 'Sets: 3 Rounds'],
    applicableFoci: ['abdomen', 'estaticos', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'TOES TO BAR',
    category: 'Core / Abs',
    illustrationKey: 'toes_to_bar',
    muscleTarget: 'Lower rectus abdominis, hip flexors, and active lats',
    technicalCues: [
      'Strict hanging dead hang without kipping swing. Simultaneous leg raise until feet touch the bar.',
      'Controlled braking on descent resisting gravity with active core.',
    ],
    progressionTips: [
      'Hold a 4-8 kg dumbbell clamped between ankles for abdominal hypertrophy.',
      'Increase reps per set toward 20 strict unbroken reps.',
    ],
    loadOptions: ['Load: 0 Kg', '+5 Kg Dumbbell', '+10 Kg', 'Bodyweight'],
    repOptions: ['Reps: 15', 'Reps: 20', 'Reps: 12', 'Reps: 25'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['abdomen', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'WEIGHTED HANGING LEG RAISES',
    category: 'Core / Abs',
    illustrationKey: 'leg_raises_orange',
    muscleTarget: 'Lower abdominals, serratus anterior, obliques, and grip endurance',
    technicalCues: [
      'Raise legs to 90° or higher with legs completely extended.',
      'Pause at apex before lowering down without pendular oscillation.',
    ],
    progressionTips: [
      'Increase load strapped to feet in 2.5 kg increments.',
    ],
    loadOptions: ['+5 Kg', '+10 Kg', '+15 Kg', 'Load: 0 Kg'],
    repOptions: ['Reps: 15', 'Reps: 20', 'Reps: 12', 'Reps: 25'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['abdomen', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'HANGING KNEE TO ELBOWS',
    category: 'Core / Abs',
    illustrationKey: 'hanging_knee_to_elbows',
    muscleTarget: 'Mid abdominals, internal obliques, and transversus abdominis',
    technicalCues: [
      'Active lat depression pulling knees into direct contact with elbows.',
      'Forced expiration at apex of peak abdominal contraction.',
    ],
    progressionTips: [
      'Hold 1 second of physical contact with elbows on every repetition.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+5 Kg Vest'],
    repOptions: ['Reps: 15', 'Reps: 20', 'Reps: 25'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['abdomen', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },

  // --- LEGS & LOWER BODY FOCUS ---
  {
    baseName: 'WEIGHTED PISTOL SQUATS (EACH)',
    category: 'Legs',
    illustrationKey: 'pistol_squats',
    muscleTarget: 'Quadriceps, gluteus maximus, ankles, and proprioceptive stability',
    technicalCues: [
      'Non-working leg extended horizontally without contacting floor. Descend to full depth.',
      'Drive pressure through entire foot maintaining heel contact throughout.',
    ],
    progressionTips: [
      'Hold a 10 kg to 20 kg kettlebell or dumbbell clamped tight against chest.',
      'Work toward 10 continuous reps per leg without wobble.',
    ],
    loadOptions: ['Load: 0 Kg', '+10 Kg', '+15 Kg', '+20 Kg', 'Bodyweight'],
    repOptions: ['Reps: 8 Each', 'Reps: 10 Each', 'Reps: 12 Each', 'Reps: 6 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['piernas', 'todo-el-cuerpo', 'circuito-resistencia', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'WEIGHTED JUMP SQUATS',
    category: 'Legs',
    illustrationKey: 'weighted_jump_squats',
    muscleTarget: 'Explosive quadriceps power, calves, glutes, and tendon elasticity',
    technicalCues: [
      'Deep 90° squat immediately followed by vertical jump with triple extension of hips, knees, ankles.',
      'Land softly in damped knee flexion and rebound into next rep instantly.',
    ],
    progressionTips: [
      'Use a weighted vest or 15 kg to 25 kg dumbbells for ballistic power overload.',
    ],
    loadOptions: ['+15 Kg', '+20 Kg', '+25 Kg', 'Load: 0 Kg', 'Bodyweight'],
    repOptions: ['Reps: 15', 'Reps: 20', 'Reps: 25', 'Reps: 12 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['piernas', 'circuito-resistencia', 'todo-el-cuerpo', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'BULGARIAN SPLIT SQUATS',
    category: 'Legs',
    illustrationKey: 'bulgarian_split_squats',
    muscleTarget: 'Gluteus medius, quadriceps, pelvic stabilizers, and hamstrings',
    technicalCues: [
      'Rear foot elevated on bench. Deep vertical descent until rear knee nearly brushes floor.',
      'Torso rigid, main drive through the heel of the front foot.',
    ],
    progressionTips: [
      'Increase dumbbell load from 10 kg to 20 kg per hand.',
    ],
    loadOptions: ['+20 Kg (2x10)', '+30 Kg (2x15)', '+10 Kg', 'Load: 0 Kg'],
    repOptions: ['Reps: 10-12 Each', 'Reps: 12 Each', 'Reps: 15 Each', 'Reps: 8 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 4', 'Sets: 3 Rounds'],
    applicableFoci: ['piernas', 'todo-el-cuerpo', 'ganadora-peso-lastre'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'EXPLOSIVE LEG COMPLEX (LUNGE TO SQUAT)',
    category: 'Legs',
    illustrationKey: 'leg_complex',
    muscleTarget: 'Leg lactic endurance, quadriceps, glutes, and adductors',
    technicalCues: [
      'Plyometric left lunge + right lunge + deep squat without pausing.',
      'Keep chest tall with rhythmic arm swing for high tempo.',
    ],
    progressionTips: [
      'Add a 10 kg weighted vest once you complete 20 consecutive combos.',
    ],
    loadOptions: ['Load: 0 Kg', '+15 Kg Vest', '+20 Kg', 'Bodyweight'],
    repOptions: ['Reps: 15 Combos', 'Reps: 20 Combos', 'Reps: 25'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['piernas', 'circuito-resistencia', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },

  // --- ARMS FOCUS ---
  {
    baseName: 'CHIN-UPS (ISOMETRIC BICEPS LOCKOUT)',
    category: 'Pull',
    illustrationKey: 'chin_ups',
    muscleTarget: 'Biceps brachii peak, brachialis, and forearm flexors',
    technicalCues: [
      'Explosive supinated pull with 3-second lockout at top of movement.',
      'Descend over 4 full seconds with maximum eccentric tension on arms.',
    ],
    progressionTips: [
      'Add weight on the belt (+15kg to +25kg) to drive mass hypertrophy.',
    ],
    loadOptions: ['+15 Kg', '+20 Kg', '+25 Kg', 'Bodyweight'],
    repOptions: ['Reps: 8-10', 'Reps: 10', 'Reps: 12', 'Reps: 6 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['brazos', 'espalda', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },
  {
    baseName: 'SINGLE-ARM FRONT RAISES / POWER PRESS',
    category: 'Push',
    illustrationKey: 'single_arm_front_raises',
    muscleTarget: 'Anterior deltoid, long head biceps, and triceps stabilizer',
    technicalCues: [
      'Strict front raise up to eye level without swaying torso.',
      'Keep wrist neutral and locked in alignment with forearm.',
    ],
    progressionTips: [
      'Increase plate or dumbbell from 10 kg to 15 kg.',
    ],
    loadOptions: ['+10 Kg', '+15 Kg', '+20 Kg', '+12 Kg'],
    repOptions: ['Reps: 10 Each', 'Reps: 12 Each', 'Reps: 8 Heavy'],
    setOptions: ['Sets: 4', 'Sets: 4'],
    applicableFoci: ['brazos', 'pecho', 'todo-el-cuerpo'],
    isWeightedCandidate: true,
  },

  // --- CONDITIONING & ENDURANCE ---
  {
    baseName: 'BURPEES (TACTICAL BURNOUT)',
    category: 'Full Body',
    illustrationKey: 'burpees',
    muscleTarget: 'Total body conditioning, metabolic power, and anaerobic endurance',
    technicalCues: [
      'Full chest-to-deck pushup, snappy hop beneath hips, vertical leap with overhead clap.',
      'Keep breathing rhythmic with 1 deep breath per cycle.',
    ],
    progressionTips: [
      'Complete repetitions in timed unbroken blocks.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+5 Kg Vest'],
    repOptions: ['Reps: 25', 'Reps: 30', 'Reps: 50', 'Reps: 40'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds', 'Sets: 4'],
    applicableFoci: ['circuito-resistencia', 'todo-el-cuerpo', 'piernas'],
    isWeightedCandidate: false,
  },
  {
    baseName: 'PLYOMETRIC JUMP SQUATS (ORANGE PROTOCOL)',
    category: 'Legs',
    illustrationKey: 'jump_squats_orange',
    muscleTarget: 'Fast-twitch leg muscle fibers and reactive jump height',
    technicalCues: [
      'Continuous ballistic jumps, minimizing ground contact time upon landing.',
    ],
    progressionTips: [
      'Aim for maximal vertical height on every single jump.',
    ],
    loadOptions: ['Load: 0 Kg', 'Bodyweight', '+10 Kg Vest'],
    repOptions: ['Reps: 20', 'Reps: 25', 'Reps: 30'],
    setOptions: ['Sets: 4', 'Sets: 3 Rounds'],
    applicableFoci: ['circuito-resistencia', 'piernas', 'todo-el-cuerpo'],
    isWeightedCandidate: false,
  },
];

// Helper to shuffle an array with Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Random item from array
function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Dynamic title configurations by focus
const TITLES_BY_FOCUS: Record<
  RoutineFocus,
  {
    titles: string[];
    subtitles: string[];
    circuitRules: string[];
    restRules: string[];
  }
> = {
  pecho: {
    titles: [
      'CHEST & TRICEPS OVERLOAD',
      'IRON CHEST PROTOCOL',
      'TITAN CHEST DEMOLITION',
      'SAVAGE PUSH OLYMPUS',
      'BRUTAL CHEST ANNIHILATION',
      'APEX PECTORAL WARFARE',
      'CHEST MATRIX DESTRUCTION',
    ],
    subtitles: [
      'HEAVY DIPS & EXPLOSIVE PUSH',
      'UPPER CHEST & RING FLYES',
      'WEIGHTED DIPS & CLAP PUSH-UPS',
      'BRUTAL SAVAGE PUSH VOLUME',
      'UNCOMPROMISING CHEST DENSITY',
    ],
    circuitRules: [
      'COMPLETE ALL PUSH STATIONS • REPEAT 4 ROUNDS TOTAL',
      'CHEST & TRICEPS CIRCUIT • 30S TRANSITION BETWEEN STATIONS',
      'SETS TO TECHNICAL FAILURE • EMPHASIS ON MAXIMAL CONTRACTION',
    ],
    restRules: [
      'REST 2-3 MINS BETWEEN ROUNDS • ACTIVE RECOVERY',
      '90 SECONDS BETWEEN HEAVY LOAD STATIONS',
      'REST 2 MINS AFTER COMPLETING EACH FULL ROUND',
    ],
  },
  espalda: {
    titles: [
      'BACK & PULL DOMINANCE',
      'SAVAGE WINGS PROTOCOL',
      'TITAN BACK ASSAULT',
      'DORSAL OVERLOAD MATRIX',
      'PULL BEAST DOMINATION',
      'APEX BACK WARRIOR',
      'IRON LATS PROTOCOL',
    ],
    subtitles: [
      'WEIGHTED PULL-UPS & UNILATERAL PULLS',
      'MUSCLE-UPS & ONE-ARM PULLS',
      'MASSIVE LATS & HEAVY CHIN-UPS',
      'HIGH-DENSITY PULL & SCAPULAR CONTROL',
      'RAW PULLING POWER ON BARS & RINGS',
    ],
    circuitRules: [
      'COMPLETE ALL PULLING STATIONS IN ORDER • 4 ROUNDS TOTAL',
      'RAW STRENGTH & HEAVY PULL CIRCUIT • 3 ELITE ROUNDS',
      'ACTIVE GRIP AND FULL DEAD HANG EXTENSION ON EVERY REP',
    ],
    restRules: [
      'REST 2-3 MINS BETWEEN ROUNDS • SHAKE OUT FOREARMS',
      'REST 2 MINUTES BETWEEN HEAVY WEIGHTED SETS',
      '90-SECOND PAUSE BETWEEN STATIONS',
    ],
  },
  brazos: {
    titles: [
      'ARMAGEDDON ARMS BEAST',
      'TITAN BICEPS & TRICEPS',
      'SAVAGE ARMS OVERLOAD',
      'IRON FOREARMS & TRICEPS',
      'BRUTAL CALISTHENICS ARMS',
      'APEX ARMS DESTRUCTION',
      'STEEL ARMS PROTOCOL',
    ],
    subtitles: [
      'BICEPS BAR LOCKOUTS & HEAVY TRICEPS',
      'DEEP PARALLEL DIPS & WEIGHTED CHIN-UPS',
      'STEEL ARMS PUMP & VASCULAR DENSITY',
      'UNILATERAL ARM STRENGTH & CRUSHING GRIP',
      'SUPERSETS OF ELBOW FLEXORS AND EXTENSORS',
    ],
    circuitRules: [
      'ALTERNATING BICEPS / TRICEPS • REPEAT 4 COMPLETE ROUNDS',
      'RUN THROUGH ARMS CIRCUIT WITH NO INTERMEDIATE BREAKS',
      'STRICT ECCENTRIC CONTROL ON EVERY REPETITION',
    ],
    restRules: [
      'REST 90-120 SECONDS AFTER EACH COMPLETE ROUND',
      '30S MINIMAL PAUSE BETWEEN ANTAGONISTIC STATIONS',
      '2 MINUTES OF RECOVERY BETWEEN HYPERTROPHY BLOCKS',
    ],
  },
  abdomen: {
    titles: [
      'DRAGON CORE DOMINATION',
      'IRON ABS MATRIX',
      'TITAN ABDOMEN PROTOCOL',
      'SAVAGE CORE FORTRESS',
      'BRUTAL CORE OLYMPUS',
      'APEX ABDOMINAL DESTRUCTION',
      'STEEL CORE WARFARE',
    ],
    subtitles: [
      'DRAGON FLAGS & WEIGHTED TOES TO BAR',
      'PELVIC LOCK & CONTROLLED LEG RAISES',
      'HOLLOW BODY TENSION & ISOMETRIC ENDURANCE',
      'ARMORED CORE FOR STATIC SKILLS',
      'ABDOMINAL STRENGTH & LUMBAR BRACING',
    ],
    circuitRules: [
      'ZERO SWING OR KIPPING • MAXIMAL CONTRACTION AT EVERY STATION',
      'REPEAT THE CORE CIRCUIT 3-4 FULL TIMES',
      'STRICT CADENCE: 2S ASCENT, 1S PAUSE, 3S DESCENT',
    ],
    restRules: [
      'REST 60-90 SECONDS BETWEEN SETS',
      'REST 2 MINS BETWEEN COMPLETE CORE ROUNDS',
      'MINIMAL PAUSE: 30S BREATHING RECOVERY',
    ],
  },
  piernas: {
    titles: [
      'EXPLOSIVE LEGS POWER',
      'TITAN LEGS PROTOCOL',
      'SAVAGE LEGS ANNIHILATION',
      'BRUTAL QUAD & GLUTE BEAST',
      'IRON LEGS POWER MATRIX',
      'APEX LOWER BODY WARFARE',
      'EXPLOSIVE SQUAT MASTERY',
    ],
    subtitles: [
      'PISTOL SQUATS & PLYOMETRIC JUMPS',
      'REACTIVE POWER & BULGARIAN SPLIT SQUATS',
      'HEAVY LEG COMPLEX & DEADLIFT',
      'UNILATERAL LEG POWER & LACTIC ENDURANCE',
      'SAVAGE METHOD LOWER BODY DENSITY',
    ],
    circuitRules: [
      'FULL DEPTH ON EVERY SQUAT • 4 ROUNDS TOTAL',
      'POWERFUL TRIPLE EXTENSION ON PLYOMETRIC JUMPS',
      'COMPLETE ALL STATIONS WITHOUT STOPPING BETWEEN EXERCISES',
    ],
    restRules: [
      'REST 2-3 MINS BETWEEN ROUNDS TO REPLENISH POWER',
      '90 SECONDS BETWEEN HEAVY UNILATERAL SETS',
      'CONTROLLED REST: 2 MINS UPON COMPLETING THE ROUND',
    ],
  },
  estaticos: {
    titles: [
      'STATIC SKILLS HIERARCHY',
      'PLANCHE & LEVER REIGN',
      'TITAN STATICS PROTOCOL',
      'SAVAGE ISOMETRIC GODS',
      'BRUTAL STATIC OVERLOAD',
      'APEX ISOMETRICS MATRIX',
      'THE OLYMPIAN STATICS',
    ],
    subtitles: [
      'FULL PLANCHE • FRONT LEVER • HUMAN FLAG',
      'MAXIMAL NEUROMUSCULAR & TENDON TENSION',
      'PURE ISOMETRICS & FREESTANDING HSPU',
      'WORLD ELITE: LESS THAN 0.01% OF POPULATION',
      'HUMAN LEVERS AND FLAWLESS JOINT LOCKOUTS',
    ],
    circuitRules: [
      'FLAWLESS FORM OR IMMEDIATE STOP • ZERO BROKEN TECHNIQUE',
      'HOLD EVERY SECOND WITH MAXIMAL WHOLE-BODY TENSION',
      'EXECUTE 4-5 SETS FOCUSING PURELY ON MOVEMENT QUALITY',
    ],
    restRules: [
      'COMPLETE 3-MINUTE REST BETWEEN ISOMETRIC SETS',
      'REST 2-3 MINS BETWEEN STATIC POSITIONS',
      'FULL CNS RECOVERY BEFORE LAUNCHING NEXT SET',
    ],
  },
  'todo-el-cuerpo': {
    titles: [
      'SAVAGE FULL BODY CIRCUIT',
      'THE PRO CHALLENGE PROTOCOL',
      'TITAN FULL BODY MATRIX',
      'CALISTHENICS WARRIOR ROUTINE',
      'APEX TOTAL WARFARE',
      'IRON TEMPLE FULL CIRCUIT',
      'SAVAGE COMPLETE PROTOCOL',
    ],
    subtitles: [
      'PUSH • PULL • LEGS • ARMORED CORE',
      'INTEGRAL STRENGTH & ENDURANCE CIRCUIT',
      'THE ULTIMATE BLEND OF STATIC SKILLS AND WORK VOLUME',
      'BALANCED HIGH-DENSITY DISTRIBUTION',
      'TACTICAL TRAINING WITH ZERO EXCUSES',
    ],
    circuitRules: [
      'GO THROUGH ALL STATIONS IN ORDER • REPEAT 3 TIMES',
      'RAPID TRANSITIONS AND STRICT FORM RETENTION',
      'DO NOT STOP UNTIL COMPLETING THE FULL CIRCUIT',
    ],
    restRules: [
      'REST 3-5 MINS BETWEEN ROUNDS • REPEAT 3-4 TIMES',
      'REST 2-3 MINS BETWEEN ROUNDS • WATER & BREATH CONTROL',
      '3-MINUTE RECOVERY BETWEEN CIRCUIT CYCLES',
    ],
  },
  'circuito-resistencia': {
    titles: [
      'SAVAGE ENDURANCE CIRCUIT',
      'THE BRUTAL RESISTANCE TEST',
      'TITAN CONDITIONING PROTOCOL',
      'HIGH-VOLUME SAVAGE WAR',
      'APEX STAMINA DEMOLITION',
      'IRON LUNGS CALISTHENICS',
      'BURNOUT EXTREME PROTOCOL',
    ],
    subtitles: [
      '3X ROUNDS - PURE STAMINA & SPEED',
      'HIGH-VOLUME REPS AND ZERO PAUSE',
      'METABOLIC EXHAUSTION & MENTAL GRIT',
      'EXTREME DENSITY: 20 TO 50 REPS PER STATION',
      'MAXIMAL PUMP AND ANAEROBIC RESILIENCE',
    ],
    circuitRules: [
      '3X ROUNDS - NO REST BETWEEN STATIONS',
      'CONTINUOUS CIRCUIT WITHOUT PAUSES • REPEAT 3 TIMES',
      'UNINTERRUPTED CADENCE AND PEAK METABOLIC INTENSITY',
    ],
    restRules: [
      'REST 3-5 MINS BETWEEN ROUNDS • DRINK WATER & REGULATE BREATHING',
      'REST ONLY UPON COMPLETING THE ENTIRE ROUND',
      '3 MINUTES RECOVERY AFTER EACH ENDURANCE BLOCK',
    ],
  },
  'ganadora-peso-lastre': {
    titles: [
      'TITAN WEIGHTED MASS GAINER',
      'SAVAGE HYPERTROPHY PROTOCOL',
      'BRUTAL WEIGHTED OVERLOAD',
      'MASS GAINER CALISTHENICS BEAST',
      'APEX WEIGHTED HYPERTROPHY',
      'IRON HEAVY BULKING ROUTINE',
      'MAX WEIGHTED MASS PROTOCOL',
    ],
    subtitles: [
      '100% MANDATORY WEIGHTED EXERCISES (+10 TO +35 KG)',
      'HEAVY PROGRESSIVE OVERLOAD & MAXIMUM HYPERTROPHY',
      'DIPS, PULL-UPS & LEGS WITH COMBAT WEIGHT',
      'LEAN MUSCLE MASS VOLUME & RAW MAXIMUM STRENGTH',
      'ZERO BODYWEIGHT: EVERY STATION WITH REAL EXTERNAL LOAD',
    ],
    circuitRules: [
      '100% WEIGHTED EXERCISES • WEIGHT BELT, VEST OR DUMBBELLS',
      '4-5 HEAVY SETS PER STATION • CONTROLLED 3S ECCENTRIC CADENCE',
      'HEAVY 6-10 REP SETS • CLOSE TO MUSCULAR FAILURE (RIR 1-2)',
    ],
    restRules: [
      'REST 2-3 MINS BETWEEN HEAVY SETS • FULL RECOVERY',
      'REST 3 MINUTES AFTER EACH WEIGHTED ROUND',
      '2 TO 3 MINS BETWEEN STATIONS TO MAINTAIN MAXIMUM LOAD',
    ],
  },
};

/**
 * Generate a genuinely fresh, non-repeating routine
 * incorporating previous exercise history to avoid duplicates.
 */
export function generateDynamicRoutine(params: {
  focus: RoutineFocus;
  exerciseCount: number;
  theme: HudTheme;
  customPrompt?: string;
  previousExerciseNames?: string[];
}): CalisthenicsRoutine {
  const {
    focus,
    exerciseCount,
    theme,
    customPrompt = '',
    previousExerciseNames = [],
  } = params;

  // Strict limit: maximum 8 exercises as requested to ensure full name fits without cuts
  const count = Math.min(Math.max(exerciseCount || 8, 6), 8);
  const config = TITLES_BY_FOCUS[focus] || TITLES_BY_FOCUS['todo-el-cuerpo'];

  // Filter templates that match the current focus
  const directMatches = EXERCISE_TEMPLATES.filter((t) =>
    t.applicableFoci.includes(focus)
  );

  // Remaining templates for variety and balance
  const otherTemplates = EXERCISE_TEMPLATES.filter(
    (t) => !t.applicableFoci.includes(focus)
  );

  // Divide into templates not seen recently vs seen recently
  const freshDirectMatches = directMatches.filter(
    (t) => !previousExerciseNames.includes(t.baseName)
  );
  const usedDirectMatches = directMatches.filter((t) =>
    previousExerciseNames.includes(t.baseName)
  );

  // Candidates prioritized: fresh direct matches, then used direct matches, then other templates
  const prioritizedCandidates = [
    ...shuffle(freshDirectMatches),
    ...shuffle(usedDirectMatches),
    ...shuffle(otherTemplates),
  ];

  // Pick exactly `count` unique exercise templates with ZERO image repetition
  const selectedTemplates: ExerciseTemplate[] = [];
  for (const candidate of prioritizedCandidates) {
    if (selectedTemplates.length >= count) break;
    const candidateImg = getAIImageForExercise(candidate.baseName, candidate.category, candidate.illustrationKey);
    const isImageDuplicate = selectedTemplates.some((st) => {
      const stImg = getAIImageForExercise(st.baseName, st.category, st.illustrationKey);
      return stImg === candidateImg;
    });
    if (!selectedTemplates.some((st) => st.baseName === candidate.baseName) && !isImageDuplicate) {
      selectedTemplates.push(candidate);
    }
  }

  // Fallback: pick remaining templates ensuring image uniqueness
  if (selectedTemplates.length < count) {
    for (const t of EXERCISE_TEMPLATES) {
      if (selectedTemplates.length >= count) break;
      const tImg = getAIImageForExercise(t.baseName, t.category, t.illustrationKey);
      const isImageDuplicate = selectedTemplates.some((st) => {
        const stImg = getAIImageForExercise(st.baseName, st.category, st.illustrationKey);
        return stImg === tImg;
      });
      if (!selectedTemplates.some((st) => st.baseName === t.baseName) && !isImageDuplicate) {
        selectedTemplates.push(t);
      }
    }
  }

  // Emergency safety fallback
  if (selectedTemplates.length < count) {
    for (const t of EXERCISE_TEMPLATES) {
      if (selectedTemplates.length >= count) break;
      if (!selectedTemplates.some((st) => st.baseName === t.baseName)) {
        selectedTemplates.push(t);
      }
    }
  }

  // Shuffle the selected templates to provide variety in station order
  const orderedTemplates = shuffle(selectedTemplates);

  // Random session token
  const sessionToken = Math.floor(100 + Math.random() * 900);
  const selectedTitle = `${pickRandom(config.titles)} #${sessionToken}`;
  const selectedSubtitle = pickRandom(config.subtitles);
  const selectedCircuitRule = pickRandom(config.circuitRules);
  const selectedRestRule = pickRandom(config.restRules);

  // Transform templates into full Exercise objects with randomized loads, sets, and reps
  const exercises: Exercise[] = orderedTemplates.map((template, index) => {
    // Determine dynamic load: alternate between weighted and bodyweight based on focus and candidate
    let chosenLoad = pickRandom(template.loadOptions);
    let chosenReps = pickRandom(template.repOptions);
    let chosenSets = pickRandom(template.setOptions);

    // SPECIAL RULE FOR GANADORA DE PESO (100% CON LASTRE):
    // Every single exercise must have a mandatory non-zero external weight load (+10 to +35 Kg)
    if (focus === 'ganadora-peso-lastre') {
      const positiveLoads = template.loadOptions.filter((l) => l.startsWith('+'));
      if (positiveLoads.length > 0) {
        chosenLoad = pickRandom(positiveLoads);
      } else {
        chosenLoad = pickRandom(['+15 Kg', '+20 Kg', '+25 Kg', '+30 Kg', '+35 Kg', '+10 Kg']);
      }
      // Force mass hypertrophy rep ranges (6-10 heavy reps)
      if (chosenReps.includes('Hold')) {
        chosenReps = 'Hold: 10-15s (+10 Kg Load)';
      } else {
        chosenReps = pickRandom(['Reps: 6-8', 'Reps: 8-10', 'Reps: 6 Heavy', 'Reps: 8', 'Reps: 10']);
      }
      chosenSets = pickRandom(['Sets: 4 Heavy', 'Sets: 4 Sets', 'Sets: 5 Sets', 'Sets: 4 Rounds']);
    } else if (focus === 'circuito-resistencia') {
      // If it's an endurance circuit, lean towards higher reps / 0kg load
      if (!chosenReps.includes('Hold')) {
        chosenReps = pickRandom(['Reps: 20', 'Reps: 25', 'Reps: 30', 'Reps: 15-20']);
      }
      chosenSets = pickRandom(['Sets: 3 Rounds', 'Sets: 4 Rounds', 'Sets: 3']);
      if (Math.random() > 0.4) {
        chosenLoad = 'Load: 0 Kg';
      }
    } else if (['pecho', 'espalda', 'brazos'].includes(focus) && template.isWeightedCandidate) {
      // If it's chest or back or arms with weight emphasis, ensure some heavy sets
      if (Math.random() > 0.3) {
        chosenLoad = pickRandom(['+15 Kg', '+20 Kg', '+25 Kg', '+30 Kg']);
        chosenReps = pickRandom(['Reps: 8-10', 'Reps: 10', 'Reps: 6-8', 'Reps: 12']);
      }
    }

    // Dynamic exercise name formatting
    let exerciseName = template.baseName;
    if (focus === 'ganadora-peso-lastre') {
      if (!exerciseName.toUpperCase().includes('WEIGHTED') && !exerciseName.toUpperCase().includes('LASTRE')) {
        exerciseName = `WEIGHTED ${exerciseName}`;
      }
    } else if (chosenLoad.startsWith('+') && !exerciseName.includes('WEIGHTED') && !exerciseName.includes('(')) {
      // e.g. "WEIGHTED PARALLEL DIPS"
      if (Math.random() > 0.5) {
        exerciseName = `WEIGHTED ${exerciseName}`;
      }
    }

    // Generate pristine AI Graphic from scratch for this exercise
    const aiGraphic = generateAIGraphicForExercise(
      exerciseName,
      template.category,
      template.illustrationKey,
      {
        themeColor: theme === 'orange' ? '#ff5722' : theme === 'green' ? '#00ff66' : theme === 'cyan' ? '#00e5ff' : '#ffb700',
        load: chosenLoad,
      }
    );

    return {
      id: `dyn-${focus}-${index + 1}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      order: index + 1,
      name: exerciseName.toUpperCase(),
      category: template.category,
      sets: chosenSets,
      reps: chosenReps,
      load: chosenLoad,
      technicalCue: pickRandom(template.technicalCues),
      progressionTip: pickRandom(template.progressionTips),
      muscleTarget: template.muscleTarget,
      illustrationKey: template.illustrationKey,
      imageUrl: getAIImageForExercise(exerciseName, template.category, template.illustrationKey),
      aiGraphicSvg: aiGraphic,
    };
  });

  // Dynamic progression guidelines
  const progressionMilestones = focus === 'ganadora-peso-lastre'
    ? [
        `Week 1-2: Calibrate base loads (+10 to +20 Kg). Lock in 6 to 8 reps with 3-second eccentric cadence.`,
        `Week 3-4: Progressive overload: add +2.5 kg to +5 kg to weight belt on heavy dips and pull-ups.`,
        `Week 5-6: Peak hypertrophy phase: 4-5 heavy sets at RIR 1-2 with 2-3 mins recovery between rounds.`,
      ]
    : [
        `Week 1-2: Master movement mechanics across all ${count} stations. Log completed reps without failure.`,
        `Week 3-4: Increase load by +2.5 kg to +5 kg on compound stations or add 2 reps per set.`,
        `Week 5-6: Reduce rest intervals between stations to 30 seconds and complete circuit in under 35 minutes.`,
      ];

  return {
    id: `routine-${focus}-${Date.now()}`,
    title: selectedTitle,
    subtitle: selectedSubtitle,
    theme: theme,
    exerciseCount: count,
    circuitRule: selectedCircuitRule,
    restRule: selectedRestRule,
    globalProgressionGuide: progressionMilestones,
    exercises,
    createdAt: new Date().toISOString(),
  };
}
