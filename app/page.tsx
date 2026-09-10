"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Swords,
  Layers,
  BookOpen,
  Scale,
  MessageSquareQuote,
  Gauge,
  Database,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getAllRules, getAllScenarios, getCustomRules, getCustomScenarios } from "@/lib/data/masterStore";
import { useBattleStore } from "@/store/battleStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const battleStore = useBattleStore();
  const [stats, setStats] = useState({
    rules: 1240,
    scenarios: 300,
    chains: 300,
    custom: 0,
  });

  useEffect(() => {
    const r = getAllRules();
    const s = getAllScenarios();
    const cr = getCustomRules();
    const cs = getCustomScenarios();
    setStats({
      rules: r.length,
      scenarios: s.length,
      chains: 300,
      custom: cr.length + cs.length,
    });
  }, []);

  function launchFeaturedScenario() {
    battleStore.loadCustomScenarioState({
      name: "Half-Space Overload vs Compact Low Block",
      formationHome: "4-3-3",
      formationAway: "5-4-1",
      ballZone: "Z14",
      dilemmaPrompt:
        "Score: 1-1, 74th minute. Opponent defending in a hyper-compact 5-4-1 deep block with 24m vertical compactness. Exploit Zone 14 or the right half-space runner before the second pivot shifts across.",
      bestAction: "cutback",
    });
    router.push("/battle");
  }

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-lime-500/15 via-zinc-950 to-sky-500/10 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black">
              Tactics OS · v2.0
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300 font-mono">
              FIFA 105×68m Pitch · 30-Zone Model · IFAB 2026/27 Grounded
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Interactive Tactical Battle Engine & Knowledge OS
          </h1>

          <p className="max-w-3xl text-sm md:text-base text-zinc-300 leading-relaxed">
            Synthesizing <strong>1,240 master tactical rules</strong>, <strong>300 simulation scenarios</strong>,{" "}
            <strong>300 7-step causality chains</strong>, <strong>14 relational data models</strong>, and the official{" "}
            <strong>IFAB Laws of the Game 2026/27</strong> into an extensible tactical intelligence platform.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 max-w-2xl">
            <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-center">
              <div className="text-2xl font-black text-lime-400 font-mono">{stats.rules.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Tactical Rules</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-center">
              <div className="text-2xl font-black text-sky-400 font-mono">{stats.scenarios.toLocaleString()}</div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Scenarios</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-center">
              <div className="text-2xl font-black text-amber-400 font-mono">{stats.chains}</div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Causality Chains</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">17 + 5</div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Laws 2026/27</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="/battle"
              className="flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-lime-400/25 transition hover:bg-lime-300"
            >
              <Swords className="h-4 w-4" /> Open 2D Battle Pitch
            </Link>
            <Link
              href="/scenarios"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/20"
            >
              <Layers className="h-4 w-4" /> Browse 300 Scenarios
            </Link>
            <Link
              href="/datasets"
              className="flex items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-lime-300 transition hover:bg-lime-400/20"
            >
              <Database className="h-4 w-4" /> Ingest & Add Datasets
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Daily Tactical Challenge */}
      <section className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-zinc-900/60 to-black p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                Featured Tactical Scenario
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Half-Space Overload vs 5-4-1 Low Block (Minute 74&apos;)
            </h2>
            <p className="max-w-2xl text-xs text-zinc-300">
              Can fluid positional play and third-man runs penetrate a 24m compact defensive wall?
              Test sprint velocities, closing defender races, and passing lane interception cones.
            </p>
          </div>
          <button
            onClick={launchFeaturedScenario}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-amber-300 shadow-md shadow-amber-400/20"
          >
            <ExternalLink className="h-4 w-4" /> Load Scenario to Pitch
          </button>
        </div>
      </section>

      {/* 6 Engine Pillars Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Tactics OS Unified Modules</h2>
            <p className="text-xs text-zinc-400">All data models, simulation engines, and debate personas fully integrated.</p>
          </div>
          <Link href="/datasets" className="text-xs font-medium text-lime-400 hover:underline">
            Manage Custom Datasets →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/battle",
              icon: Swords,
              color: "text-lime-400",
              border: "border-lime-500/20 hover:border-lime-400/50",
              title: "Interactive 2D Battle Engine",
              desc: "Drag 22 player tokens + ball on FIFA 105×68m pitch. Draw ground/chipped/cutback passes and runs with arrival vectors. Physics resolution with reaction latencies and offside lines.",
            },
            {
              href: "/scenarios",
              icon: Layers,
              color: "text-sky-400",
              border: "border-sky-500/20 hover:border-sky-400/50",
              title: "Scenarios Lab (300+ Situations)",
              desc: "Browse 300 tactical battle situations across all game states, formations, and pitch zones. Inspect pressure indices, space values, and 1-click launch to the board.",
            },
            {
              href: "/knowledge",
              icon: BookOpen,
              color: "text-emerald-400",
              border: "border-emerald-500/20 hover:border-emerald-400/50",
              title: "Knowledge Matrix & 7-Step Chains",
              desc: "Master database of 1,240 rules, 300 causality chains, and 14 relational data models. Filter by Zone Z1–Z30, Role, Phase, and confidence levels.",
            },
            {
              href: "/laws",
              icon: Scale,
              color: "text-purple-400",
              border: "border-purple-500/20 hover:border-purple-400/50",
              title: "IFAB Laws of the Game (2026/27)",
              desc: "All 17 official laws + 2026/27 protocols (sin-bins, only-the-captain, restart countdowns). Includes interactive Law 11 Offside simulator and tactical implications.",
            },
            {
              href: "/debate",
              icon: MessageSquareQuote,
              color: "text-rose-400",
              border: "border-rose-500/20 hover:border-rose-400/50",
              title: "AI Persona Debate Arena",
              desc: "The Purist (Positional Play), The Anvil (Low Block), The Analyst (xG/xT), and The Chair debating tactical dilemmas with interactive radar charts.",
            },
            {
              href: "/analytics",
              icon: Gauge,
              color: "text-amber-400",
              border: "border-amber-500/20 hover:border-amber-400/50",
              title: "Decision Engine Sandbox",
              desc: "Interactive calculators for Space Value (Part BX), Pressure Index (Part BY), Action Rankings, and Player Fatigue/Stamina degradation curves across 90 minutes.",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group flex flex-col justify-between rounded-2xl border bg-zinc-900/60 p-6 transition ${card.border} hover:bg-zinc-900/90 shadow-lg`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-6 w-6 ${card.color}`} />
                    <ArrowRight className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Dataset Ingestion Studio Spotlight */}
      <section className="rounded-2xl border border-lime-500/30 bg-gradient-to-r from-lime-500/10 via-black to-black p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded bg-lime-400/20 px-2.5 py-0.5 text-[10px] font-bold text-lime-300">
                USER EXTENSION ENGINE
              </span>
              <span className="text-xs text-zinc-400">Continuous Tactical Improvement</span>
            </div>
            <h2 className="text-xl font-bold text-white md:text-2xl">
              Add Your Own Datasets & Custom Scenarios
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Tactics OS is not a static encyclopedia. Use the Dataset Manager to contribute new movement rules, pressing triggers,
              and tactical scenarios. Upload JSON or CSV files with real-time schema validation and local persistence.
            </p>
          </div>
          <Link
            href="/datasets"
            className="flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3 text-xs font-bold text-black transition hover:bg-lime-300 shadow-lg shadow-lime-400/20"
          >
            <Database className="h-4 w-4" /> Open Dataset Manager
          </Link>
        </div>
      </section>
    </div>
  );
}
