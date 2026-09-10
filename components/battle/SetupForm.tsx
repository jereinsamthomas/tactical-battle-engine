"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FORMATION_OPTIONS, STYLE_OPTIONS, useBattleStore } from "@/store/battleStore";

export function SetupForm() {
  const { profile, setProfile, applySetup } = useBattleStore();
  const router = useRouter();
  const [ok, setOk] = useState(false);

  function go() {
    applySetup();
    setOk(true);
    router.push("/battle");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Team & kit</h2>
        <label className="block text-xs text-zinc-400">
          Team name
          <input
            className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={profile.teamName}
            onChange={(e) => setProfile({ teamName: e.target.value })}
          />
        </label>
        <div className="flex gap-4">
          <label className="text-xs text-zinc-400">
            Primary
            <input
              type="color"
              className="mt-1 block h-10 w-16 cursor-pointer bg-transparent"
              value={profile.kitPrimary}
              onChange={(e) => setProfile({ kitPrimary: e.target.value })}
            />
          </label>
          <label className="text-xs text-zinc-400">
            Secondary
            <input
              type="color"
              className="mt-1 block h-10 w-16 cursor-pointer bg-transparent"
              value={profile.kitSecondary}
              onChange={(e) => setProfile({ kitSecondary: e.target.value })}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-zinc-400">
            Your formation
            <select
              className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm"
              value={profile.baseFormation}
              onChange={(e) => setProfile({ baseFormation: e.target.value as typeof profile.baseFormation })}
            >
              {FORMATION_OPTIONS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-zinc-400">
            Opponent
            <select
              className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm"
              value={profile.opponentFormation}
              onChange={(e) =>
                setProfile({ opponentFormation: e.target.value as typeof profile.opponentFormation })
              }
            >
              {FORMATION_OPTIONS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-xs text-zinc-400">
          Tactical style
          <select
            className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm"
            value={profile.style}
            onChange={(e) => setProfile({ style: e.target.value as typeof profile.style })}
          >
            {STYLE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-zinc-400">
          Pitch theme
          <select
            className="mt-1 w-full rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm"
            value={profile.theme}
            onChange={(e) => setProfile({ theme: e.target.value as "turf" | "tactical" })}
          >
            <option value="turf">Green turf</option>
            <option value="tactical">Dark tactical</option>
          </select>
        </label>
      </section>
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Philosophy ingestion</h2>
        <textarea
          rows={8}
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm leading-relaxed"
          value={profile.philosophyDescription}
          onChange={(e) => setProfile({ philosophyDescription: e.target.value })}
        />
        <Slider
          label="Defensive line height"
          hint={`${profile.lineHeight}m`}
          min={10}
          max={65}
          value={profile.lineHeight}
          onChange={(lineHeight) => setProfile({ lineHeight })}
        />
        <Slider
          label="Pressing intensity"
          hint={String(profile.pressingIntensity)}
          min={1}
          max={10}
          value={profile.pressingIntensity}
          onChange={(pressingIntensity) => setProfile({ pressingIntensity })}
        />
        <Slider
          label="Positional fluidity"
          hint={profile.positionalFluidity < 40 ? "Strict" : profile.positionalFluidity > 70 ? "Free roam" : "Hybrid"}
          min={0}
          max={100}
          value={profile.positionalFluidity}
          onChange={(positionalFluidity) => setProfile({ positionalFluidity })}
        />
        <Slider
          label="Passing directness"
          hint={profile.passingDirectness < 35 ? "Ultra-short" : profile.passingDirectness > 70 ? "Route-one" : "Mixed"}
          min={0}
          max={100}
          value={profile.passingDirectness}
          onChange={(passingDirectness) => setProfile({ passingDirectness })}
        />
        <button
          onClick={go}
          className="w-full rounded-lg bg-lime-400 py-3 text-sm font-bold text-black hover:bg-lime-300"
        >
          Enter battle arena
        </button>
        {ok && <p className="text-xs text-lime-300">Board loaded from your profile.</p>}
      </section>
    </div>
  );
}

function Slider({
  label,
  hint,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block text-xs text-zinc-400">
      <span className="flex justify-between">
        {label}
        <span className="text-lime-300">{hint}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-lime-400"
      />
    </label>
  );
}
