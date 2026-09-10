import type { BattleTurnRequest, BattleTurnResponse, Outcome, PlayerToken } from "./types";
import { dist, expectedThreat, inPenaltyBox, inZone14, laneAt, thirdAt, zoneLabel } from "./pitch";
import { compactnessMeters, interceptionWindow, isOffside, offsideLine, ballTransitSeconds } from "./physics";
import { FORMATION_META } from "./formations";
import type { FormationId } from "./types";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function simulateBattleTurn(req: BattleTurnRequest): BattleTurnResponse {
  const home = req.pitchState.homePlayers as PlayerToken[];
  const away = req.pitchState.awayPlayers as PlayerToken[];
  const ball = req.pitchState.ball;
  const action = req.userAction;
  const profile = req.userTacticalProfile;
  const pass = action.passVector;
  const target = pass?.targetCoordinates ?? { x: ball.x + 12, y: ball.y };
  const passType = pass?.passType ?? "GROUND_DRIVEN";
  const speed = pass?.speedMps ?? 18;
  const transit = pass ? ballTransitSeconds(ball, target, passType, speed) : 0.8;

  const intercept = interceptionWindow(away, ball, target, transit, passType);
  const line = offsideLine(away, true);
  const receiverOffside = isOffside(target, ball.x, line, true);

  const xt0 = expectedThreat(ball);
  const xt1 = expectedThreat(target);
  let xtDelta = Number((xt1 - xt0).toFixed(3));

  const awayComp = compactnessMeters(away);
  const homeBehind = home.filter((p) => p.x < ball.x - 2).length;
  const restHole = homeBehind < 4;
  const zone14Attack = inZone14(target) || action.playerRuns.some((r) => inZone14(r.trajectory.at(-1) ?? target));
  const boxAttack = inPenaltyBox(target);

  let success = 0.55;
  success += profile.pressingIntensity > 7 && thirdAt(ball.x) === "ATTACKING" ? 0.05 : 0;
  success += action.playerRuns.length * 0.04;
  success += passType === "CUTBACK" && awayComp.horizontal < 38 ? 0.08 : 0;
  success -= passType === "THROUGH_BALL" && receiverOffside ? 0.45 : 0;
  success -= intercept.id ? 0.35 : 0;
  success -= dist(ball, target) > 35 && passType === "GROUND_DRIVEN" ? 0.12 : 0;
  success += inZone14(target) ? 0.07 : 0;
  success -= restHole ? 0.08 : 0;
  if ((profile.philosophyDescription || "").toLowerCase().includes("cutback")) {
    if (passType === "CUTBACK") success += 0.06;
  }
  success = clamp01(success);

  let turnover = 0.2 + (intercept.id ? 0.35 : 0) + (restHole ? 0.18 : 0);
  turnover += awayComp.vertical < 28 && passType === "THROUGH_BALL" ? 0.1 : 0;
  turnover = clamp01(turnover);

  let outcome: Outcome = "CLEAN_PROGRESSION";
  if (receiverOffside && passType === "THROUGH_BALL") {
    outcome = "DISRUPTED";
    xtDelta = Number((xtDelta * -0.3).toFixed(3));
  } else if (intercept.id && intercept.arrives < transit) {
    outcome = restHole ? "COUNTER_ATTACK_CONCEDED" : "DISRUPTED";
    xtDelta = Number((-Math.abs(xtDelta) - 0.04).toFixed(3));
  } else if (boxAttack && success > 0.48) {
    outcome = "CHANCE_CREATED";
  } else if (success < 0.42) {
    outcome = "DISRUPTED";
  }

  const nearestAway = [...away].sort((a, b) => dist(a, target) - dist(b, target));
  const counterMovements = nearestAway.slice(0, 4).map((p, i) => {
    const actionType =
      i === 0 && intercept.id === p.id
        ? "INTERCEPT"
        : i === 0
          ? "PRESS"
          : i === 1
            ? "COVER_SHADOW"
            : restHole
              ? "DROP_DEEP"
              : "OFFSIDE_STEP";
    const nx =
      actionType === "DROP_DEEP"
        ? Math.max(8, p.x - 6)
        : actionType === "OFFSIDE_STEP"
          ? Math.min(104, p.x + 4)
          : p.x + (target.x - p.x) * 0.35;
    const ny = p.y + (target.y - p.y) * 0.4;
    return {
      playerId: p.id,
      newCoordinates: { x: Number(nx.toFixed(1)), y: Number(ny.toFixed(1)) },
      defensiveAction: actionType as BattleTurnResponse["opponentCounterAdjustment"]["counterMovements"][0]["defensiveAction"],
    };
  });

  const meta = FORMATION_META[profile.baseFormation as FormationId];
  const strengths = [
    action.playerRuns.length
      ? `${action.playerRuns.length} coordinated run(s) manipulate the ${laneAt(target.y)} corridor.`
      : "Ball progression is attempted without supporting runs — qualitative isolation only.",
    zone14Attack ? "Occupation of Zone 14 raises chance quality versus a deep block." : "Progression stays outside the highest-xT pocket.",
    homeBehind >= 5 ? "Rest-defense numbers behind the ball are adequate (≈3+2)." : "Few players are behind the ball at release.",
  ].join(" ");

  const weaknesses = [
    intercept.id ? `Physics: ${intercept.id} can enter the interception cone before ball arrival (${transit.toFixed(2)}s transit).` : "No opponent clearly wins the race to the pass lane.",
    receiverOffside ? "Receiver is beyond the second-last defender when the ball is played." : "Offside trap is not triggered.",
    restHole ? "Vacated full-back channel invites a vertical transition." : "Counter-attack lanes are occupied.",
  ].join(" ");

  const consequence =
    outcome === "COUNTER_ATTACK_CONCEDED"
      ? "Turnover plus a rest-defense hole: expect a 2-pass channel attack into the space you inverted from."
      : outcome === "CHANCE_CREATED"
        ? "The move relocates the block enough for a cutback/shot window. Convert with a late 8, not an early aerial."
        : outcome === "DISRUPTED"
          ? "The opponent’s compactness and reaction latency are enough to break the sequence. Recycle and switch."
          : "You keep the ball in a higher xT zone. Next action should attack the free lane, not the packed one.";

  const minute = Math.min(90, req.gameState.matchMinute + 2);
  const next = nextDilemma(outcome, req, target, meta?.weakZone ?? "half-space");

  return {
    resolution: {
      outcome,
      successProbability: Number(success.toFixed(3)),
      turnoverRisk: Number(turnover.toFixed(3)),
      expectedThreatDelta: xtDelta,
    },
    physicsFeedback: {
      ballTransitDurationSeconds: Number(transit.toFixed(2)),
      interceptingOpponentId: intercept.id,
      defenderReactionDelaySeconds: Number((intercept.delay ?? 0.32).toFixed(2)),
      staminaCost: Number((4 + action.playerRuns.length * 1.5 + transit).toFixed(1)),
    },
    opponentCounterAdjustment: {
      description: counterDescription(outcome, nearestAway[0], zoneLabel(target)),
      counterMovements,
    },
    coachingBreakdown: {
      strengths,
      weaknesses,
      tacticalConsequence: consequence,
    },
    nextDilemma: {
      scenarioDescription: `Match minute ${minute} | ${req.gameState.score.home}-${req.gameState.score.away}. ${next.text}`,
      recommendedConsiderations: next.tips,
    },
  };
}

function counterDescription(outcome: Outcome, player: PlayerToken | undefined, zone: string) {
  if (!player) return "The block shifts as a unit toward the ball.";
  if (outcome === "COUNTER_ATTACK_CONCEDED") {
    return `${player.role} (${player.id}) intercepts and immediately attacks the vacated channel. Far-side runners sprint into the space behind your rest-defense.`;
  }
  if (outcome === "DISRUPTED") {
    return `${player.role} steps with a ${Math.round(38)}° cover shadow through ${zone}, forcing a backwards or square pass.`;
  }
  return `Opponent compactness holds; ${player.role} drops 3–5m to protect the through-ball while the line prepares an offside step.`;
}

function nextDilemma(
  outcome: Outcome,
  req: BattleTurnRequest,
  target: { x: number; y: number },
  weakZone: string
) {
  if (outcome === "COUNTER_ATTACK_CONCEDED") {
    return {
      text: `You have just lost the ball. Opponent is running at your rest-defense. How do you delay without conceding a penalty-box 2v1? Weak zone: ${weakZone}.`,
      tips: [
        "Foul only if last-man geometry is lost",
        "Nearest 6 must show inside, not dive",
        "Recovering full-back sprints to the channel not the ball",
      ],
    };
  }
  if (outcome === "CHANCE_CREATED") {
    return {
      text: `Chance window in ${zoneLabel(target)}. The block is collapsing. Finish now or recycle for a second cutback?`,
      tips: ["Late 8 at 18 yards", "Avoid hopeful high cross vs 5 defenders", "Far-post delayed run"],
    };
  }
  const style = req.userTacticalProfile.style;
  return {
    text: `Opponent has reset into a compact mid/low block (~${Math.round(28)}m). Ball in ${zoneLabel(target)}. ${style} must unlock ${weakZone} without emptying rest-defense.`,
    tips: [
      "Switch once to relocate the block",
      "Create 3v2 with mezzala underlap",
      "Keep 3+2 behind the ball at release",
    ],
  };
}

export function generateOpeningDilemma(profile: BattleTurnRequest["userTacticalProfile"], minute = 72) {
  return {
    matchMinute: minute,
    score: { home: 1, away: 1 },
    currentPhase: "FINAL_THIRD" as const,
    scenarioDescription: `Match minute ${minute} | Score 1-1. The opponent has dropped into a compact 5-4-1 low block with ~15m between lines. Your ball-side winger is trapped on the touchline by their wing-back and wide midfielder. Unlock this block without exposing ${FORMATION_META[profile.baseFormation as FormationId]?.weakZone ?? "the rest-defense"} — in the spirit of: “${profile.philosophyDescription.slice(0, 140)}”.`,
    recommendedConsiderations: [
      "Do not both full-backs fly",
      "Cutback > early aerial vs a packed box",
      "False nine drop to pin/drag a CB",
      "If you lose it, first 3 seconds decide the counter",
    ],
  };
}
