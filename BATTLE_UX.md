# BATTLE UX — design pass (§25/§26/§38)

## Screen anatomy (desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│ MATCH STATE  72:14 · 1–1 · IN-POSSESSION · TACTICAL: ACCESS Z14      │
├──────────┬──────────────────────────────────────────┬────────────────┤
│ TACTICAL │                                          │  AI ANALYSIS   │
│ CONTROLS │                 PITCH                    │  (cards, not   │
│ persona  │            (dominates, §37)              │  chat bubbles) │
│ tools    │                                          │                │
│ overlays │                                          │  INTENTION     │
│          │                                          │  OPP RESPONSE  │
│          │                                          │  PHYSICS       │
│          │                                          │  ESTIMATES     │
│          │                                          │  VERDICT       │
│          │                                          │  NEXT DECISION │
├──────────┴──────────────────────────────────────────┴────────────────┤
│ TIMELINE  ◀ ▶ ⏸   T+0.00 ──────●────── T+1.46      [EXECUTE MOVE]   │
└──────────────────────────────────────────────────────────────────────┘
```

- **The board gets the majority of pixels.** AI text lives in a right rail of
  structured cards (§37): Opponent Response, Physical Validation, Estimates,
  Verdict, Next Decision. Never a generic chat column.
- **Match state is always visible** — minute, score, phase, objective (§25).
- **Estimates carry the "model estimate" microcopy** at all times (§16).

## Turn flow state machine

```
        ┌─────────────┐  move/draw/explain   ┌──────────────┐
        │  PLANNING   │ ───────────────────▶ │  EXECUTING   │
        │  (user)     │                      │  (validate→  │
        └──────┬──────┘                      │  counter→    │
               │ cancel / edit               │  resolve)    │
               ▼                             └──────┬───────┘
        ┌─────────────┐   REPLAY / STEP            │
        │  RESOLVED   │ ◀──────────────────────────┘
        │  (verdict   │
        │   shown)    │ ── CHALLENGE ──▶ ┌────────────────┐
        └──────┬──────┘                  │  ADJUDICATING  │
               │ AGREE                   │  claim vs arg  │
               ▼                         │  → VERDICT     │
        ┌─────────────┐                  └───────┬────────┘
        │  NEXT TURN  │ ◀────────────────────────┘
        └─────────────┘
```

- PLANNING: free manipulation; nothing is committed; control heatmap updates live.
- EXECUTING: UI locked, a progress stepper shows validate → counter → resolve —
  it makes the §2 pipeline visible instead of magic.
- RESOLVED: verdict card + animated timeline. Primary actions: AGREE /
  CHALLENGE ANALYSIS / REPLAY / TRY DIFFERENT MOVE (§17).
- CHALLENGE: textarea with the user's counterargument; result is a verdict card
  (AI_WAS_CORRECT / USER_WAS_CORRECT / BOTH_ARE_PLAUSIBLE / INSUFFICIENT_INFORMATION)
  plus a Correction History entry. The result NEVER silently changes (§17).

## Card anatomy — Physical Validation

Each check renders as a row: `✓ passing-lane — lane clear at kick`, with
numbers on hover/expand (ball 0.71s, control 0.42s, defender 0.91s, window
+0.20s). A failing check gets a red left border and is quoted verbatim inside
the Verdict card, so challenges reference exact claims.

## Verdict tone rules

- PHYSICALLY VALID → green border; outcome stated plainly.
- PHYSICALLY INVALID → red border; enumerate failed checks; offer
  "show me why" which replays the failing race on the board.
- USER_WAS_CORRECT → gold border; the engine re-runs with the corrected
  parameter and shows both results side by side (never a silent swap).

## Board interactions

- Drag player: live; heatmap recomputes on pointer-up (throttled during drag).
- Draw pass: carrier → target; lane threat dots appear along the line
  (green→red by interception race margin).
- Draw run: dashed polyline; runner's projected arrival ring shown at T+1s.
- Rewind: timeline scrubber maps to keyframes; "step" moves 0.25s (§26).

## Motion

- 150–250ms ease-out for cards; timeline animation at 20fps keyframe lerp.
- No decorative motion on the pitch itself — movement must always mean time.
