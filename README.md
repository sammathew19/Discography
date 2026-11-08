# 🪩 DISCOGRAPHY — Dance Through Music History

An immersive, interactive journey through 50 years of music, dance, fashion, and nightlife culture (1970–2026).

---

## 🌟 Overview

**DISCOGRAPHY** combines an interactive digital museum, an underground nightclub, a cinematic music documentary, and experimental creative frontend engineering.

### The Five Musical Universes
1. **Era 01 · The 70s — DISCO FEVER**: Studio 54 aesthetic, interactive light-tile dance floor emulator, 12-inch vinyl single history, David Mancuso's Loft, and Philly soul origins.
2. **Era 02 · The 80s — THE SYNTH REVOLUTION**: Perspective neon wireframe grid, interactive 16-step Roland TR-808 rhythm sequencer, MTV scanlines, and Detroit techno origins.
3. **Era 03 · The 90s — UNDERGROUND RAVE CULTURE**: Gritty warehouse aesthetic, interactive Roland TB-303 acid filter simulator (cutoff/resonance), Berlin Tresor vault, and UK Criminal Justice Act history.
4. **Era 04 · The 2000s — THE Y2K POP ERA**: Liquid chrome surfaces, interactive retro iPod Mini click-wheel MP3 player simulator, Daft Punk 2006 Coachella LED pyramid tribute, and French touch/bloghouse history.
5. **Era 05 · The 2010s–2020s — THE NEW CLUB CULTURE**: Brutalist minimalist typography, interactive Boiler Room live stream simulator with real-time audio equalizers, SOPHIE synthetic sound sculpture, and Amapiano log-drum evolutions.

### Key Features
- **3D Rotating Disco Ball**: Built with Three.js / React Three Fiber with custom GLSL shaders, dynamic lighting, facet reflections, orbiting sparkle particles, and mouse parallax.
- **Procedural Audio Engine**: Web Audio API synthesizer for ambient background club pads and transition sweeps without requiring external audio files.
- **The Living Album Archive**: 50 landmark albums across 5 eras with genre/decade filtering, search, and detailed inspection modal.
- **THE MOVEMENT**: 50 years of dance culture breakdown (The Hustle, Breaking, Popping, Vogueing, Melbourne Shuffle, Liquid Dancing, Krumping, Tecktonik, and Chicago Footwork).
- **The Sound Archive**: In-depth profiles of defining artists, producers, and DJs.
- **The Grand Finale**: "MUSIC CHANGES. CULTURE EVOLVES. THE DANCE NEVER ENDS." — multi-era visual mashup and one-click voyage restart.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Enter the project directory
cd discography

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework:** React 18
- **Bundler:** Vite
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation & Motion:** GSAP, ScrollTrigger, Lenis Smooth Scroll
- **Audio:** Web Audio API (Synthesizers & Oscillators)
- **Styling:** Vanilla CSS with custom design systems per era
- **Typography:** Space Grotesk, Playfair Display, Syne, Outfit, Inter
