# Tactics OS — Next-Generation Football Tactical Intelligence & Simulation Engine

Tactics OS is a comprehensive, interactive tactical battle engine, AI football debate arena, and deep tactical intelligence suite built for coaches, analysts, and tactical enthusiasts.

Synthesizing **1,240 football tactical rules**, **300 match scenarios**, **14 tactical models**, **IFAB 2026/27 Laws of the Game**, and an **Extensible Dataset Ingestion Studio**.

---

## ⚡ Key Features & Architecture

### 1. 🛡️ Command Center (`/`)
- Unified executive dashboard with live metrics: 1,240 rules, 300 scenarios, 14 tactical models, and 17 official IFAB laws.
- Direct navigation across all operational matrices, scenarios lab, offside simulator, and tactical battle engine.

### 2. 📁 Extensible Dataset Manager & Ingestion Studio (`/datasets`)
- Real-time schema validation for custom Tactical Rules and Match Scenarios.
- JSON and CSV live ingestion pipelines with preview, schema diffing, and export functionality.
- Persists user-contributed tactical knowledge into the global state and engine runtime.

### 3. 🧪 300+ Scenarios Lab (`/scenarios`)
- Deep scenario library covering Phase of Play, Pitch Zone, State (Trailing, Defending Lead), and Defensive Schemes.
- Interactive token coordinate preview (105m × 68m standard pitch).
- Direct "Send to Battle Board" routing to immediately test and simulate solutions against the engine.

### 4. 🧠 1,240 Tactical Rules & Causality Matrix (`/knowledge`)
- Structured classification across 10 tactical dimensions: Attacking Shape, Counter-Pressing, Rest Defense, Low Block Penetration, Set Pieces, Goalkeeper Distribution, Transition Triggers, etc.
- 7-step causality chain breakdowns (Phase → Trigger → Action → Cascade → Defensive Reaction → Risk → Countermeasure).
- Search, filter by source class, and export capability.

### 5. ⚖️ IFAB 2026/27 Laws of the Game (`/laws`)
- Complete coverage of all 17 IFAB Laws updated for the 2026/27 cycle.
- **Interactive Law 11 Offside Simulator**: Real-time vector-based pitch calculating attacker, second-last defender, ball position, deliberate play vs. deflection exceptions, and half-space offside line visualization.

### 6. ⚔️ Tactical Battle Pitch (`/battle` & `/battle/setup`)
- Full 105m × 68m tactical board with drag-and-drop token controls.
- Vector drawing tools for pass, run, press vectors with dual-team physics resolution.
- Turn-based tactical simulation engine computing duel probabilities, passing lanes, press resistance, and shot creation metrics.

### 7. 🗣️ AI Persona Debate Arena (`/debate` & `/analytics`)
- Multi-perspective AI tactical analysts (The Purist, The Pragmatist, The Data Analyst, The Arbitrator).
- Radar attribute comparisons, formation matchup analytics, and counter-tactic recommendations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm / pnpm / yarn

### Installation
```bash
git clone https://github.com/<your-username>/tactical-battle-engine.git
cd tactical-battle-engine
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

Tactics OS is optimized for instantaneous zero-config deployment on Vercel:

1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository `tactical-battle-engine`.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

Alternatively, deploy directly via Vercel CLI:
```bash
npx vercel
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 + Lucide Icons + Glassmorphism UI tokens
- **State**: Zustand Reactive Global Stores
- **Pitch Engine**: HTML5 Canvas + SVG Mathematical Rendering

---

## 📄 License
MIT License. IFAB Laws summary compiled based on IFAB 2026/27 guidelines.
