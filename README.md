# Savage Bar Method — Calisthenics Routine & Carousel Generator

Advanced Calisthenics Routine Generator and Tactical 9:16 HUD Poster Engine designed for high-impact social media publishing (TikTok, Instagram Reels, YouTube Shorts).

## Features
- **9:16 Full HD Tactical Poster (1080×1920)**: Calibrated with TikTok and Instagram safe zones (17% top margin, 20% bottom pedestal) so video titles and UI buttons never overlap exercises.
- **10-Slide Social Media Carousel & 1-Click .ZIP**: Generates 10 individual slides (Cover, 8 Exercise cards with enlarged photos, sets, reps & biomechanics, and Final Recap) bundled in a single `.zip` download.
- **AI Routine Generator**: Generates balanced 8-station routines across 9 categories (Full Body, Chest & Explosive Push, Back & Heavy Pull, Arms, Core & Abs, Legs & Reactive Power, Elite Static Skills, Endurance Circuit, and 100% Weighted Mass).
- **Persistent Storage**: Retains the last 2 generated routines in `localStorage` for immediate recall.
- **Rest Timer & Biomechanics Guide**: Interactive workout timer and 6-week progressive overload protocol.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, @google/genai SDK
- **Graphics & Export**: html-to-image, JSZip, canvas-confetti, Lucide icons

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Server will start on http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```
