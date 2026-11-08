import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import JSZip from 'jszip';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Strict requirement: Dev server must run on port 3000
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint to generate custom advanced calisthenics routine
app.post('/api/generate-routine', async (req: Request, res: Response) => {
  try {
    const {
      exerciseCount = 12,
      focus = 'full-body-circuit',
      difficulty = 'advanced',
      customPrompt = '',
      targetReps = 'mixed',
      includeLoad = true,
      circuitStyle = 'savage-circuit',
      previousExercises = [],
    } = req.body;

    const count = Math.min(Math.max(parseInt(exerciseCount, 10) || 8, 6), 8);

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback with rich default routine if key is not yet set
      return res.status(200).json({
        fallback: true,
        message: 'No GEMINI_API_KEY detected in environment; returning optimized tactical preset routine.',
      });
    }

    const focusDescriptions: Record<string, string> = {
      'pecho': 'Primary focus on CHEST (Pectoralis major, upper chest, heavy parallel bar dips, straight bar dips, ring chest flyes, and clap push-ups).',
      'espalda': 'Primary focus on BACK & PULL (Massive lats, weighted pull-ups, muscle-ups, one-arm pull-ups, front lever, and heavy chin-ups).',
      'brazos': 'Primary focus on ARMS (Triceps & Biceps with deep dips, weighted chin-ups, bar lockouts, and unilateral pulls).',
      'abdomen': 'Primary focus on ABDOMEN & CORE (Dragon Flags, Toes to Bar, weighted leg raises, L-sit ring pull-ups, and pelvic control).',
      'piernas': 'Primary focus on LEGS (Pistol squats, weighted jump squats, Bulgarian split squats, leg complexes, and deadlifts).',
      'estaticos': 'Primary focus on STATIC SKILLS (Full Planche, Front Lever, Human Flag, Freestanding HSPU, and isometric transitions).',
      'todo-el-cuerpo': 'FULL BODY ROUTINE (Balanced distribution of push, pull, legs, and core in Savage Circuit style).',
      'circuito-resistencia': 'ENDURANCE CIRCUIT (High volume of 20 to 50 reps per station, extreme density, and minimal rest).',
      'ganadora-peso-lastre': 'WEIGHT GAINER / MAXIMUM HYPERTROPHY ROUTINE (EVERY SINGLE EXERCISE MUST HAVE MANDATORY WEIGHT: Load: "+15 Kg", "+20 Kg", "+25 Kg", "+30 Kg", "+35 Kg", "+10 Kg" with weight belt, weighted vest, or dumbbells. Heavy 6-12 rep ranges for maximum hypertrophy and strength).'
    };

    const targetFocusDesc = focusDescriptions[focus] || focusDescriptions['todo-el-cuerpo'];
    const sessionToken = Date.now().toString(36).toUpperCase();

    const promptText = `
You are the master head coach for "SAVAGE BAR METHOD", an elite street workout and advanced calisthenics methodology known for masked muscular athletes performing high-intensity brutal circuits and static strength masteries.

Create a BRAND NEW, COMPLETELY UNIQUE, and FRESH advanced calisthenics training routine with EXACTLY ${count} exercises.
EVERY SINGLE PIECE OF TEXT (exercise names, descriptions, technical cues, progression tips, rules, and milestones) MUST BE STRICTLY IN ENGLISH.

CRITICAL VARIETY & DIVERSITY RULES:
1. NEVER output a repetitive or generic routine. Every generation MUST be a novel combination of exercises, rep schemes, and loads.
${focus === 'ganadora-peso-lastre' ? '2. SPECIAL RULE FOR WEIGHT GAINER: 100% OF THE EXERCISES MUST HAVE A NON-ZERO WEIGHT LOAD (e.g., "+15 Kg", "+20 Kg", "+25 Kg", "+30 Kg", "+35 Kg", "+10 Kg"). ZERO 0 Kg exercises. Prefix names with "WEIGHTED" where appropriate.' : '2. COMBINE VARIANTS: Intelligently mix weighted exercises and bodyweight movements.'}
3. EXERCISE NAMES: MUST BE IN ENGLISH and MUST BE REAL ADVANCED CALISTHENICS EXERCISES (e.g., "ONE-ARM PULL-UPS", "BAR MUSCLE-UPS", "WEIGHTED PARALLEL DIPS", "FREESTANDING HSPU", "WEIGHTED FRONT LEVER", "PISTOL SQUATS", "DRAGON FLAGS", "EXPLOSIVE CLAP PUSH-UPS").
4. Count of exercises: EXACTLY ${count}.
5. TRAINING FOCUS CATEGORY: "${focus.toUpperCase()}" -> ${targetFocusDesc}. Ensure at least 70% of the exercises directly target this muscle group or movement pattern, with complementary stabilizers.
6. Unique Session Signature: #${sessionToken}.
7. User Custom Instructions: "${customPrompt || 'Create a fresh, brutal, non-repetitive combination of weighted and bodyweight movements'}".
${Array.isArray(previousExercises) && previousExercises.length > 0 ? `8. ANTI-REPETITION CONSTRAINT: The user just trained with: [${previousExercises.slice(-15).join(', ')}]. DO NOT output these exact same exercises; combine DIFFERENT exercises, alternative grips, or novel weighted variants so every click yields a fresh challenge.` : ''}
9. For each exercise provide (ALL IN ENGLISH):
   - English Name (all uppercase)
   - Category ("Pull", "Push", "Core / Abs", "Legs", "Static", "Full Body")
   - Sets & Reps with high variety (e.g. "Sets: 4 | Reps: 8-10", "Sets: 3 Rounds | Reps: 25", "Sets: 5 | Hold: 12-15s", "Sets: 4 | Reps: 6 Heavy")
   - Load (${focus === 'ganadora-peso-lastre' ? 'MANDATORY NON-ZERO: "+15 Kg", "+20 Kg", "+25 Kg", "+30 Kg", "+35 Kg", "+10 Kg"' : 'mix of "+10 Kg", "+15 Kg", "+20 Kg", "+25 Kg", "0 Kg", "Bodyweight"'})
   - Technical Description in English (concise biomechanical cue: hollow body, lockout, active depression, grip)
   - Progression Instructions in English (how to progress session to session: increasing load, adding reps, or eccentric tempo)
   - Primary Muscles targeted in English
   - Illustration Pose Key: choose the most accurate match among:
     ["muscle_up", "one_arm_pullup", "pullup", "front_lever", "planche", "handstand_pushup", "parallel_dips", "straight_bar_dips", "dragon_flag", "human_flag", "pistol_squat", "bulgarian_split_squat", "jump_squats", "toes_to_bar", "leg_raises", "clap_pushups", "incline_pushups", "burpees", "ring_flyes", "l_sit_pullups", "front_raises", "deadlift"]

10. Header & Rules (ALL IN ENGLISH):
   - Distinctive Title: e.g. "SAVAGE ASSAULT #${sessionToken.slice(0,3)}", "TITAN PROTOCOL", "CYBER PUSH-PULL", "APEX DENSITY ROUTINE", "IRON HORSE CIRCUIT"
   - Subtitle: Dynamic subtitle reflecting the focus
   - Circuit Rule: Specific round instruction (e.g. "GO THROUGH ALL ${count} EXERCISES IN ORDER • REPEAT 3-4 ROUNDS")
   - Rest Rule: Dynamic rest protocol (e.g. "REST 2-3 MINS BETWEEN ROUNDS • 30S TRANSITION")
   - Global Progression Guide: 3-4 progression milestones across 6 weeks in English.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: 'You are the lead coach and architect for Savage Bar Method calisthenics. Output valid structured JSON strictly matching the requested schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            circuitRule: { type: Type.STRING },
            restRule: { type: Type.STRING },
            globalProgressionGuide: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  order: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  sets: { type: Type.STRING },
                  reps: { type: Type.STRING },
                  load: { type: Type.STRING },
                  technicalCue: { type: Type.STRING },
                  progressionTip: { type: Type.STRING },
                  muscleTarget: { type: Type.STRING },
                  illustrationKey: { type: Type.STRING },
                },
                required: [
                  'order',
                  'name',
                  'category',
                  'sets',
                  'reps',
                  'load',
                  'technicalCue',
                  'progressionTip',
                  'muscleTarget',
                  'illustrationKey',
                ],
              },
            },
          },
          required: [
            'title',
            'subtitle',
            'circuitRule',
            'restRule',
            'globalProgressionGuide',
            'exercises',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    const parsedData = JSON.parse(text);
    return res.status(200).json({ success: true, data: parsedData });
  } catch (error: any) {
    console.warn('Gemini API notice, initiating graceful dynamic generator fallback:', error?.message || error);
    return res.status(200).json({
      fallback: true,
      message: 'Gemini busy/unavailable, transitioning to tactical dynamic routine engine.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Full Project Source Code Backup (.ZIP) endpoint
app.get('/api/download-project-zip', async (_req: Request, res: Response) => {
  try {
    const zip = new JSZip();

    function addDirToZip(dirPath: string, zipFolder: JSZip) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        // Exclude bulky, generated, or user chat screenshot directories
        if (
          entry.name === 'node_modules' || 
          entry.name === '.git' || 
          entry.name === 'dist' || 
          entry.name === '.DS_Store' ||
          (entry.name === 'aistudio' && dirPath.endsWith('assets'))
        ) {
          continue;
        }
        if (entry.isDirectory()) {
          const subFolder = zipFolder.folder(entry.name);
          if (subFolder) addDirToZip(fullPath, subFolder);
        } else if (entry.isFile()) {
          const content = fs.readFileSync(fullPath);
          zipFolder.file(entry.name, content);
        }
      }
    }

    addDirToZip(path.resolve(__dirname), zip);

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="savage-bar-method-source-backup.zip"');
    res.send(buffer);
  } catch (error) {
    console.error('Error creating project backup zip:', error);
    res.status(500).json({ error: 'Failed to create project backup zip' });
  }
});

async function startServer() {
  // Serve public assets folder
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {

    // Mount Vite dev server middlewares (HMR disabled per constraints)
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  VITE v8.3.0  ready in 150 ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
    console.log(`\n  Savage Bar Method server running on port ${PORT}\n`);
  });
}

startServer();
