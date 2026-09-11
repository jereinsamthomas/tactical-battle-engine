"use client";

import React, { useMemo } from "react";
import { spawnTeam } from "@/lib/formations";
import type { FormationId } from "@/lib/types";

interface TacticalDebateBoardProps {
  homeShape: FormationId;
  awayShape: FormationId;
  keyChannel?: string;
  homeAdjustment?: string;
  awayAdjustment?: string;
}

export function TacticalDebateBoard({
  homeShape = "4-3-3",
  awayShape = "5-4-1",
  keyChannel = "Zone 14 / Half-Spaces",
  homeAdjustment,
  awayAdjustment,
}: TacticalDebateBoardProps) {
  const home = useMemo(() => spawnTeam(homeShape, "home", 45), [homeShape]);
  const away = useMemo(() => spawnTeam(awayShape, "away", 25), [awayShape]);

  // Scaler from 105x68m to 380x240px SVG
  const sx = (x: number) => (x / 105) * 380;
  const sy = (y: number) => (y / 68) * 240;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950 p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sky-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            {homeShape} (Home)
          </span>
          <span className="text-zinc-600">vs</span>
          <span className="flex items-center gap-1 text-purple-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            {awayShape} (Away)
          </span>
        </div>
        <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-amber-300 font-bold">
          Focus: {keyChannel}
        </span>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-white/10 bg-emerald-950/40">
        <svg viewBox="0 0 380 240" className="w-full h-auto">
          {/* Pitch grass pattern & lines */}
          <rect width="380" height="240" fill="#062e1a" />

          {/* Half-spaces & 5-corridors overlay */}
          <line x1={0} y1={240 * 0.2} x2={380} y2={240 * 0.2} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1={0} y1={240 * 0.4} x2={380} y2={240 * 0.4} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1={0} y1={240 * 0.6} x2={380} y2={240 * 0.6} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1={0} y1={240 * 0.8} x2={380} y2={240 * 0.8} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

          {/* Pitch Outer Boundary & Halfway Line */}
          <rect x="8" y="8" width="364" height="224" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <line x1="190" y1="8" x2="190" y2="232" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          <circle cx="190" cy="120" r="32" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />

          {/* Penalty boxes */}
          <rect x="8" y="58" width="58" height="124" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <rect x="314" y="58" width="58" height="124" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Zone 14 Highlight Box */}
          <rect
            x={sx(60)}
            y={sy(20)}
            width={sx(25)}
            height={sy(28)}
            fill="rgba(250, 204, 21, 0.08)"
            stroke="rgba(250, 204, 21, 0.3)"
            strokeDasharray="4 4"
            rx="4"
          />
          <text x={sx(66)} y={sy(34)} fill="#facc15" fontSize="8" fontFamily="monospace" opacity="0.8">
            Zone 14
          </text>

          {/* Tactical Pressing Arrow Vector */}
          <path
            d={`M ${sx(70)} ${sy(34)} Q ${sx(82)} ${sy(28)} ${sx(92)} ${sy(34)}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeDasharray="3 2"
          />

          {/* Away Team Tokens */}
          {away.map((p) => (
            <g key={p.id}>
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r="7"
                fill="#a855f7"
                stroke="#ffffff"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <text
                x={sx(p.x)}
                y={sy(p.y) + 3}
                fill="#ffffff"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {p.number}
              </text>
            </g>
          ))}

          {/* Home Team Tokens */}
          {home.map((p) => (
            <g key={p.id}>
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r="7"
                fill="#0ea5e9"
                stroke="#ffffff"
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
              <text
                x={sx(p.x)}
                y={sy(p.y) + 3}
                fill="#ffffff"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {p.number}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Dynamic Adjustments Log */}
      {(homeAdjustment || awayAdjustment) && (
        <div className="space-y-1 text-[11px] font-mono border-t border-white/5 pt-2">
          {homeAdjustment && (
            <div className="text-sky-300">
              <span className="font-bold text-sky-400">Home Shift:</span> {homeAdjustment}
            </div>
          )}
          {awayAdjustment && (
            <div className="text-purple-300">
              <span className="font-bold text-purple-400">Away Counter:</span> {awayAdjustment}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
