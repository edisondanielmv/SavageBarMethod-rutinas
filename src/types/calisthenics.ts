export type ExerciseCategory = 
  | 'Pull' 
  | 'Push' 
  | 'Core / Abs' 
  | 'Legs' 
  | 'Static' 
  | 'Full Body' 
  | 'Warm-Up';

export type HudTheme = 'orange' | 'green' | 'cyan' | 'gold';

export interface Exercise {
  id: string;
  order: number;
  name: string; // IN ENGLISH (e.g., 'BAR MUSCLE-UPS')
  category: ExerciseCategory;
  sets: string;
  reps: string;
  load: string;
  technicalCue: string;
  progressionTip: string;
  muscleTarget: string;
  illustrationKey: string;
  aiGraphicSvg?: string;
  imageUrl?: string;
}

export interface CalisthenicsRoutine {
  id: string;
  title: string;
  subtitle: string;
  theme: HudTheme;
  exerciseCount: number;
  circuitRule: string;
  restRule: string;
  globalProgressionGuide: string[];
  exercises: Exercise[];
  createdAt: string;
}

export type RoutineFocus = 
  | 'pecho'
  | 'espalda'
  | 'brazos'
  | 'abdomen'
  | 'piernas'
  | 'estaticos'
  | 'todo-el-cuerpo'
  | 'circuito-resistencia'
  | 'ganadora-peso-lastre';

export interface GenerateRoutineParams {
  exerciseCount: number;
  focus: RoutineFocus;
  difficulty: 'advanced' | 'elite-pro' | 'olympian-savage';
  customPrompt?: string;
  theme: HudTheme;
  circuitStyle: string;
}
