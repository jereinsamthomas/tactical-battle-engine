"use client";

import { useMemo, useState } from "react";
import {
  Gauge,
  Sliders,
  TrendingUp,
} from "lucide-react";
import {
  expectedThreat,
  inPenaltyBox,
  inZone14,
  laneAt,
  thirdAt,
} from "@/lib/pitch";
import { playerSprintCap, PHYSICS } from "@/lib/physics";

export function AnalyticsSandbox() {
  // Carrier State
  const [carrierX, setCarrierX] = useState<number>(68);
  const [carrierY, setCarrierY] = useState<number>(34);
  const [defenderDist, setDefenderDist] = useState<number>(3.5);
  const [defenderCount, setDefenderCount] = useState<number>(2);
  const [matchMinute, setMatchMinute] = useState<number>(65);
  const [baseStamina, setBaseStamina] = useState<number>(85);

  // Computed Metrics
  const metrics = useMemo(() => {
    const pt = { x: carrierX, y: carrierY };
    const xt = expectedThreat(pt);
    const lane = laneAt(carrierY);
    const third = thirdAt(carrierX);
    const inZ14 = inZone14(pt);
    const inBox = inPenaltyBox(pt);

    // Pressure calculation
    const immediatePressure = Math.max(
      0,
      Math.min(1, 1 - (defenderDist - 0.5) / 5.5)
    );
    const pressureScore = Math.min(
      1,
      immediatePressure * 0.7 + (defenderCount / 4) * 0.3
    );

    // Space Value calculation
    const goalDist = Math.hypot(105 - carrierX, 34 - carrierY);
    const goalAngle = Math.atan2(Math.abs(carrierY - 34), 105 - carrierX);
    let spaceVal = (1 - goalDist / 105) * 0.5 + (1 - goalAngle / (Math.PI / 2)) * 0.2;
    if (lane === "LHS" || lane === "RHS") spaceVal += 0.12;
    if (inZ14) spaceVal += 0.15;
    if (inBox) spaceVal += 0.2;
    spaceVal = Math.max(0.05, Math.min(0.98, spaceVal * (1 - pressureScore * 0.4)));

    // Fatigue & Sprint calculations
    const fatigueLoss = (matchMinute / 90) * (100 - baseStamina) * 0.35;
    const currentStamina = Math.max(35, baseStamina - fatigueLoss);
    const sprintSpeed = playerSprintCap(currentStamina);
    const reactionTime =
      PHYSICS.reactionMin +
      (PHYSICS.reactionMax - PHYSICS.reactionMin) * (1 - currentStamina / 100);

    // Action Rankings
    const actions = [
      {
        action: "Line-Breaking Through Pass",
        type: "pass",
        score: Math.min(
          0.95,
          Math.max(
            0.1,
            spaceVal * 1.1 + (lane === "LHS" || lane === "RHS" ? 0.2 : 0) - pressureScore * 0.3
          )
        ),
        xtDelta: "+0.082",
        turnoverRisk: Math.min(0.7, 0.2 + pressureScore * 0.4),
      },
      {
        action: "Carry into Half-Space",
        type: "carry",
        score: Math.min(
          0.9,
          Math.max(
            0.15,
            (sprintSpeed / 9.8) * 0.5 + (1 - pressureScore) * 0.4
          )
        ),
        xtDelta: "+0.045",
        turnoverRisk: Math.min(0.55, 0.15 + pressureScore * 0.35),
      },
      {
        action: "Switch to Weak-Side Winger",
        type: "switch",
        score: Math.min(
          0.88,
          Math.max(0.2, 0.65 + (pressureScore > 0.6 ? 0.2 : -0.1))
        ),
        xtDelta: "+0.028",
        turnoverRisk: 0.12,
      },
      {
        action: "Recycle to Anchor Pivot",
        type: "recycle",
        score: Math.min(
          0.85,
          Math.max(0.25, 0.5 + pressureScore * 0.4)
        ),
        xtDelta: "-0.012",
        turnoverRisk: 0.05,
      },
      {
        action: "Direct Shot on Goal",
        type: "shot",
        score: inBox
          ? 0.85
          : inZ14
          ? 0.62
          : carrierX > 80
          ? 0.45
          : 0.1,
        xtDelta: inBox ? "+0.280" : inZ14 ? "+0.090" : "+0.020",
        turnoverRisk: 0.75,
      },
    ].sort((a, b) => b.score - a.score);

    return {
      xt,
      lane,
      third,
      inZ14,
      inBox,
      pressureScore,
      spaceVal,
      currentStamina,
      sprintSpeed,
      reactionTime,
      actions,
    };
  }, [carrierX, carrierY, defenderDist, defenderCount, matchMinute, baseStamina]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-amber-500/10 via-sky-500/5 to-transparent p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            <Gauge className="h-3.5 w-3.5" /> Conceptual Models Layer
          </span>
          <span className="text-xs text-zinc-400">Parts BX, BY, BZ, CA & Section 76</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Decision Engine Analytics Sandbox
        </h1>
        <p className="mt-1 max-w-2xl text-xs text-zinc-400">
          Simulate real-time spatial valuation (Part BX), pressure vectors (Part BY), action rankings,
          and match-minute fatigue curves governing player velocity and reaction latency.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Sliders & Controls */}
        <div className="space-y-5 rounded-xl border border-white/10 bg-black/40 p-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="h-4 w-4 text-amber-400" /> Carrier & Match Variables
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Ball Carrier X (Meters from Own Goal):</span>
                <span className="font-mono font-bold text-white">{carrierX}m ({metrics.third})</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={carrierX}
                onChange={(e) => setCarrierX(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Ball Carrier Y (Width: 0m to 68m):</span>
                <span className="font-mono font-bold text-white">{carrierY}m (Lane: {metrics.lane})</span>
              </div>
              <input
                type="range"
                min="2"
                max="66"
                value={carrierY}
                onChange={(e) => setCarrierY(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Nearest Defender Distance:</span>
                <span className="font-mono font-bold text-rose-400">{defenderDist.toFixed(1)}m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={defenderDist}
                onChange={(e) => setDefenderDist(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Defenders in Closing Radius (&lt;6m):</span>
                <span className="font-mono font-bold text-rose-400">{defenderCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={defenderCount}
                onChange={(e) => setDefenderCount(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-zinc-300">
                <span>Match Minute:</span>
                <span className="font-mono font-bold text-sky-400">{matchMinute}&apos;</span>
              </div>
              <input
                type="range"
                min="1"
                max="95"
                value={matchMinute}
                onChange={(e) => setMatchMinute(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Base Player Stamina:</span>
                <span className="font-mono font-bold text-emerald-400">{baseStamina}/100</span>
              </div>
              <input
                type="range"
                min="60"
                max="99"
                value={baseStamina}
                onChange={(e) => setBaseStamina(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Results & Calculations Display */}
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <div className="text-[10px] font-semibold uppercase text-zinc-400">Space Value (Part BX)</div>
              <div className="mt-1 text-2xl font-bold font-mono text-lime-400">
                {metrics.spaceVal.toFixed(2)}
              </div>
              <div className="mt-1 text-[10px] text-zinc-500">
                {metrics.inZ14 ? "Zone 14 Bonus Active" : metrics.lane.includes("HS") ? "Half-Space Bonus" : "Standard Zone"}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <div className="text-[10px] font-semibold uppercase text-zinc-400">Pressure Index (Part BY)</div>
              <div className="mt-1 text-2xl font-bold font-mono text-rose-400">
                {(metrics.pressureScore * 100).toFixed(0)}%
              </div>
              <div className="mt-1 text-[10px] text-zinc-500">
                {metrics.pressureScore > 0.6 ? "High Press / Swarmed" : "Contained"}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <div className="text-[10px] font-semibold uppercase text-zinc-400">Expected Threat (xT)</div>
              <div className="mt-1 text-2xl font-bold font-mono text-sky-400">
                {metrics.xt.toFixed(3)}
              </div>
              <div className="mt-1 text-[10px] text-zinc-500">Goal Probability Delta</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
              <div className="text-[10px] font-semibold uppercase text-zinc-400">Sprint Cap & Latency</div>
              <div className="mt-1 text-2xl font-bold font-mono text-amber-400">
                {metrics.sprintSpeed.toFixed(1)} m/s
              </div>
              <div className="mt-1 text-[10px] text-zinc-500">
                Reaction: {metrics.reactionTime.toFixed(2)}s
              </div>
            </div>
          </div>

          {/* Action Rankings Table (Part BV/BW) */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-lime-400" /> Action Ranking Engine (Part BV/BW)
              </h3>
              <p className="text-xs text-zinc-400">
                Ranked actions for the current spatial coordinates and pressure conditions.
              </p>
            </div>

            <div className="space-y-2.5">
              {metrics.actions.map((act, index) => (
                <div
                  key={act.action}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 ${
                    index === 0
                      ? "border-lime-400/40 bg-lime-400/10"
                      : "border-white/5 bg-black/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono font-bold ${
                        index === 0 ? "bg-lime-400 text-black" : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white">{act.action}</div>
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">{act.type}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Score</span>
                      <span className={`font-bold ${index === 0 ? "text-lime-400" : "text-zinc-300"}`}>
                        {(act.score * 100).toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">xT Δ</span>
                      <span className="text-sky-400 font-semibold">{act.xtDelta}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">Turnover</span>
                      <span className="text-rose-400 font-semibold">
                        {(act.turnoverRisk * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
