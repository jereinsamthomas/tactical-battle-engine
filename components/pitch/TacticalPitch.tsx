"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PITCH_LENGTH, PITCH_WIDTH, type PlayerToken, type Vec2 } from "@/lib/types";
import { ZONES } from "@/lib/pitch";
import { offsideLine, pitchControl } from "@/lib/physics";
import { useBattleStore } from "@/store/battleStore";

const PAD = 18;

function usePitchScale(w: number, h: number) {
  const sx = (w - PAD * 2) / PITCH_LENGTH;
  const sy = (h - PAD * 2) / PITCH_WIDTH;
  const toPx = (p: Vec2) => ({ x: PAD + p.x * sx, y: PAD + p.y * sy });
  const toM = (x: number, y: number) => ({
    x: Math.min(PITCH_LENGTH, Math.max(0, (x - PAD) / sx)),
    y: Math.min(PITCH_WIDTH, Math.max(0, (y - PAD) / sy)),
  });
  return { sx, sy, toPx, toM };
}

export function TacticalPitch() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 900, h: 584 });
  const {
    pitch,
    profile,
    overlays,
    tool,
    selectedId,
    select,
    moveToken,
    setBall,
    addArrow,
    passType,
    runType,
    arrows,
    animating,
    lastResult,
  } = useBattleStore();

  const { toPx, toM } = usePitchScale(size.w, size.h);
  const [drag, setDrag] = useState<{ id: string; kind: "player" | "ball" } | null>(null);
  const [drawFrom, setDrawFrom] = useState<Vec2 | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = Math.round(w * (PITCH_WIDTH / PITCH_LENGTH));
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tokens = useMemo(
    () => [...pitch.homePlayers, ...pitch.awayPlayers],
    [pitch.homePlayers, pitch.awayPlayers]
  );

  const drawTurf = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = size.w * dpr;
    c.height = size.h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size.w, size.h);

    const turf = profile.theme === "turf";
    if (turf) {
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#1f6b3a" : "#1a5c32";
        ctx.fillRect(PAD + (i * (size.w - PAD * 2)) / 12, PAD, (size.w - PAD * 2) / 12, size.h - PAD * 2);
      }
    } else {
      ctx.fillStyle = "#0b1220";
      ctx.fillRect(PAD, PAD, size.w - PAD * 2, size.h - PAD * 2);
    }

    if (overlays.voronoi) {
      const step = 10;
      for (let x = PAD; x < size.w - PAD; x += step) {
        for (let y = PAD; y < size.h - PAD; y += step) {
          const m = toM(x + step / 2, y + step / 2);
          const pc = pitchControl(pitch.homePlayers, pitch.awayPlayers, m);
          ctx.fillStyle = `rgba(59,130,246,${pc * 0.35})`;
          ctx.fillRect(x, y, step, step);
          ctx.fillStyle = `rgba(239,68,68,${(1 - pc) * 0.28})`;
          ctx.fillRect(x, y, step, step);
        }
      }
    }

    if (overlays.thirds) {
      ctx.fillStyle = "rgba(250,204,21,0.06)";
      const x0 = toPx({ x: ZONES.defensiveThird.x0, y: 0 }).x;
      const x1 = toPx({ x: 35, y: 0 }).x;
      const x2 = toPx({ x: 70, y: 0 }).x;
      const x3 = toPx({ x: 105, y: 0 }).x;
      ctx.fillRect(x0, PAD, x1 - x0, size.h - PAD * 2);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(x1, PAD, x2 - x1, size.h - PAD * 2);
      ctx.fillStyle = "rgba(56,189,248,0.07)";
      ctx.fillRect(x2, PAD, x3 - x2, size.h - PAD * 2);
    }

    if (overlays.lanes) {
      const ys = [13.6, 27.2, 40.8, 54.4];
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.setLineDash([6, 6]);
      ys.forEach((ym) => {
        const y = toPx({ x: 0, y: ym }).y;
        ctx.beginPath();
        ctx.moveTo(PAD, y);
        ctx.lineTo(size.w - PAD, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = turf ? "rgba(255,255,255,0.85)" : "rgba(148,163,184,0.9)";
    ctx.lineWidth = 2;
    const tl = toPx({ x: 0, y: 0 });
    ctx.strokeRect(tl.x, tl.y, PITCH_LENGTH * ((size.w - PAD * 2) / PITCH_LENGTH), PITCH_WIDTH * ((size.h - PAD * 2) / PITCH_WIDTH));
    const mid = toPx({ x: 52.5, y: 0 });
    ctx.beginPath();
    ctx.moveTo(mid.x, PAD);
    ctx.lineTo(mid.x, size.h - PAD);
    ctx.stroke();
    const cSpot = toPx({ x: 52.5, y: 34 });
    ctx.beginPath();
    ctx.arc(cSpot.x, cSpot.y, 9.15 * ((size.w - PAD * 2) / PITCH_LENGTH), 0, Math.PI * 2);
    ctx.stroke();

    const box = (x0: number, x1: number, y0: number, y1: number) => {
      const a = toPx({ x: x0, y: y0 });
      const b = toPx({ x: x1, y: y1 });
      ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    };
    box(0, 16.5, 13.84, 54.16);
    box(88.5, 105, 13.84, 54.16);
    box(0, 5.5, 24.84, 43.16);
    box(99.5, 105, 24.84, 43.16);

    if (overlays.offside) {
      const line = offsideLine(pitch.awayPlayers, true);
      const x = toPx({ x: line, y: 0 }).x;
      ctx.strokeStyle = "rgba(250,204,21,0.85)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, PAD);
      ctx.lineTo(x, size.h - PAD);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [size, profile.theme, overlays, pitch, toPx, toM]);

  useEffect(() => {
    drawTurf();
  }, [drawTurf]);

  function hitTest(mx: number, my: number): { id: string; kind: "player" | "ball" } | null {
    const ball = toPx(pitch.ball);
    if (Math.hypot(mx - ball.x, my - ball.y) < 12) return { id: "ball", kind: "ball" };
    for (const t of tokens) {
      const p = toPx(t);
      if (Math.hypot(mx - p.x, my - p.y) < 14) return { id: t.id, kind: "player" };
    }
    return null;
  }

  function onPointerDown(e: React.PointerEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const hit = hitTest(mx, my);
    if (tool === "select") {
      if (hit) {
        setDrag(hit);
        if (hit.kind === "player") select(hit.id);
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      } else select(null);
      return;
    }
    if (hit?.kind === "player") {
      select(hit.id);
      setDrawFrom(tokens.find((t) => t.id === hit.id)!);
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } else if (tool === "pass") {
      setDrawFrom({ x: pitch.ball.x, y: pitch.ball.y });
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag && !drawFrom) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const pos = toM(e.clientX - rect.left, e.clientY - rect.top);
    if (drag?.kind === "ball") setBall(pos);
    else if (drag?.kind === "player") moveToken(drag.id, pos);
  }

  function onPointerUp(e: React.PointerEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const pos = toM(e.clientX - rect.left, e.clientY - rect.top);
    if (drawFrom && tool !== "select") {
      addArrow({
        kind: tool === "pass" ? "pass" : tool === "run" ? "run" : "press",
        from: drawFrom,
        to: pos,
        passType: tool === "pass" ? passType : undefined,
        runType: tool === "run" ? runType : undefined,
        playerId: selectedId ?? undefined,
      });
    }
    setDrag(null);
    setDrawFrom(null);
  }

  const selected: PlayerToken | undefined = tokens.find((t) => t.id === selectedId);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <canvas ref={canvasRef} style={{ width: size.w, height: size.h }} className="block" />
      <svg
        className="absolute inset-0 touch-none"
        width={size.w}
        height={size.h}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <defs>
          <marker id="arrowPass" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#f8fafc" />
          </marker>
          <marker id="arrowRun" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#38bdf8" />
          </marker>
          <marker id="arrowPress" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#f87171" />
          </marker>
        </defs>
        {arrows.map((a) => {
          const f = toPx(a.from);
          const t = toPx(a.to);
          const dash = a.kind === "run" ? "7 6" : a.kind === "press" ? "2 4" : undefined;
          const stroke = a.kind === "pass" ? "#f8fafc" : a.kind === "run" ? "#38bdf8" : "#f87171";
          const marker =
            a.kind === "pass" ? "url(#arrowPass)" : a.kind === "run" ? "url(#arrowRun)" : "url(#arrowPress)";
          return (
            <g key={a.id}>
              {a.kind === "press" && (
                <polygon
                  points={conePoints(f, t)}
                  fill="rgba(248,113,113,0.18)"
                  stroke="none"
                />
              )}
              <line
                x1={f.x}
                y1={f.y}
                x2={t.x}
                y2={t.y}
                stroke={stroke}
                strokeWidth={a.kind === "pass" ? 2.5 : 2}
                strokeDasharray={dash}
                markerEnd={marker}
              />
            </g>
          );
        })}
        {tokens.map((t) => {
          const p = toPx(t);
          const home = t.team === "home";
          const fill = home ? profile.kitPrimary : "#ef4444";
          const active = selectedId === t.id;
          const moving = animating && lastResult?.opponentCounterAdjustment.counterMovements.some((c) => c.playerId === t.id);
          return (
            <g key={t.id} className={moving ? "transition-transform duration-700" : ""}>
              <circle cx={p.x} cy={p.y} r={active ? 13 : 11} fill={fill} stroke="#0b0f14" strokeWidth={2} />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
                {t.number}
              </text>
            </g>
          );
        })}
        {(() => {
          const b = toPx(pitch.ball);
          return (
            <circle cx={b.x} cy={b.y} r={7} fill="#fde047" stroke="#111" strokeWidth={1.5} />
          );
        })()}
      </svg>
      {selected && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-2 font-mono text-xs text-lime-200">
          {selected.team.toUpperCase()} #{selected.number} {selected.role}
          <br />
          X {selected.x.toFixed(1)}m · Y {selected.y.toFixed(1)}m · STA {selected.stamina}
        </div>
      )}
    </div>
  );
}

function conePoints(from: { x: number; y: number }, to: { x: number; y: number }) {
  const ang = Math.atan2(to.y - from.y, to.x - from.x);
  const spread = (38 * Math.PI) / 180 / 2;
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 40;
  const a1 = { x: from.x + Math.cos(ang - spread) * len, y: from.y + Math.sin(ang - spread) * len };
  const a2 = { x: from.x + Math.cos(ang + spread) * len, y: from.y + Math.sin(ang + spread) * len };
  return `${from.x},${from.y} ${a1.x},${a1.y} ${a2.x},${a2.y}`;
}
