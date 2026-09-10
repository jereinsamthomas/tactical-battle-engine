import type { DebatePersona, DebateTopic } from "../types";

export const PERSONAS: Record<
  DebatePersona,
  { name: string; title: string; system: string }
> = {
  chair: {
    name: "The Chair",
    title: "Impartial referee",
    system: `You are The Chair, an impartial technical referee in an elite football tactics debate.
Present dilemmas clearly (score, minute, setups). Keep both sides on tactical mechanics — penalise rhetoric, clichés, and personal attacks.
Challenge the Purist on rest-defense and compact central blocks. Challenge the Anvil/Strategist on chasing a deficit and fatigue from territorial concession.
End rounds by stating the core risk/reward trade-off.`,
  },
  purist: {
    name: "The Purist",
    title: "Juego de Posición",
    system: `You are The Purist, rooted in Juego de Posición. Possession is defensive security and offensive manipulation.
Create numerical, qualitative, and positional superiorities. Geometry: 5 corridors, max 3 on a horizontal line, max 2 on a vertical line.
Counter-press within 5-6 seconds. Speak with terms: half-spaces, third-man, pausa, rest defense 3-2/2-3, pinning CBs, free 8s, inverting full-backs.
Dismiss low-block luck narratives. Analyse first phase → progression → final third. Ground claims in passing lanes, not grit.`,
  },
  anvil: {
    name: "The Anvil",
    title: "Low-block strategist",
    system: `You are The Anvil, results-obsessed: space scores goals. 70% possession outside our box is their failure.
Deny central access, touchline traps, low-value crosses into a congested box. Transitions: 2-4 vertical passes behind overcommitted full-backs.
Favour 5-3-2 / 4-4-2 / 5-4-1 with <30m compactness. Tone: cynical, practical. Highlight 0.04 xG pot-shots vs 0.35+ xG counters.`,
  },
  analyst: {
    name: "The Objective Data Analyst",
    title: "xG / PPDA / xT",
    system: `You are The Objective Data Analyst. No romance. Use xG, xT, PPDA, field tilt, rest-defense solidity, shot quality.
Cite the monthly mock layer when relevant. Separate sample-size noise from repeatable tactical effects. Challenge both ideologies with numbers.`,
  },
};

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: "pep-mourinho-2010",
    category: "historic",
    title: "Pep’s 2011 Barcelona vs Mourinho’s 2010 Inter",
    prompt:
      "Can positional superiority and a high rest-attack break a 4-2-3-1/4-5-1 mid-low block that defends the box and attacks transitions — as in Camp Nou 2010 logic extended to 2011 Barça?",
    homeShape: "4-3-3",
    awayShape: "4-2-3-1",
    radarHome: { possession: 92, ppda: 28, xgCreated: 78, restDefense: 55, pressing: 70, compactness: 48 },
    radarAway: { possession: 38, ppda: 62, xgCreated: 58, restDefense: 88, pressing: 44, compactness: 91 },
  },
  {
    id: "sacchi-flick",
    category: "historic",
    title: "Sacchi 1989 Milan vs Flick 2020 Bayern",
    prompt:
      "Is extreme compactness + man-oriented pressing (Sacchi) still the answer to a 2-3-5/3-2-5 vertical machine that attacks the half-spaces at sprint speed?",
    homeShape: "4-4-2",
    awayShape: "4-2-3-1",
    radarHome: { possession: 58, ppda: 80, xgCreated: 66, restDefense: 74, pressing: 90, compactness: 95 },
    radarAway: { possession: 72, ppda: 85, xgCreated: 88, restDefense: 60, pressing: 86, compactness: 62 },
  },
  {
    id: "zonal-vs-man-corners",
    category: "ideology",
    title: "Zonal vs man-marking on corners",
    prompt:
      "Should elite teams defend corners zonally, man-to-man, or hybrid — given screens, near-post flicks, and GK crowding?",
    homeShape: "4-4-2",
    awayShape: "5-4-1",
    radarHome: { possession: 50, ppda: 50, xgCreated: 70, restDefense: 60, pressing: 40, compactness: 80 },
    radarAway: { possession: 50, ppda: 50, xgCreated: 68, restDefense: 72, pressing: 40, compactness: 84 },
  },
  {
    id: "inverted-vs-overlap",
    category: "ideology",
    title: "Inverted full-backs vs overlapping full-backs",
    prompt:
      "Does inverting the full-back to a 3-2 rest-attack outperform the traditional overlap when the winger is a 1v1 specialist?",
    homeShape: "4-3-3",
    awayShape: "4-3-3",
    radarHome: { possession: 80, ppda: 60, xgCreated: 74, restDefense: 82, pressing: 68, compactness: 70 },
    radarAway: { possession: 64, ppda: 55, xgCreated: 76, restDefense: 58, pressing: 62, compactness: 60 },
  },
  {
    id: "lowblock-vs-highline",
    category: "ideology",
    title: "Low-block counter vs high-line possession",
    prompt:
      "When a 5-4-1 cedes 65% field tilt, is it winning the tactical battle if it generates higher xG from 4 shots than the opponent from 18?",
    homeShape: "4-3-3",
    awayShape: "5-4-1",
    radarHome: { possession: 86, ppda: 72, xgCreated: 64, restDefense: 52, pressing: 78, compactness: 50 },
    radarAway: { possession: 32, ppda: 35, xgCreated: 71, restDefense: 90, pressing: 30, compactness: 94 },
  },
  {
    id: "messi-ronaldo-impact",
    category: "modern",
    title: "Messi vs Ronaldo — tactical impact, not mythology",
    prompt:
      "Who warped team geometry more: a false-nine/inside creator who is the passing network, or a far-post penalty-box predator who demands width and service?",
    homeShape: "4-3-3",
    awayShape: "4-2-3-1",
    radarHome: { possession: 88, ppda: 58, xgCreated: 90, restDefense: 60, pressing: 50, compactness: 55 },
    radarAway: { possession: 55, ppda: 52, xgCreated: 92, restDefense: 58, pressing: 48, compactness: 62 },
  },
  {
    id: "haaland-kane",
    category: "modern",
    title: "Haaland vs Kane as system strikers",
    prompt:
      "Is the 9 who never drops (Haaland) more valuable in a 3-2-5 than the 9 who is a 10 (Kane) — once you account for pinning vs linking?",
    homeShape: "4-3-3",
    awayShape: "4-2-3-1",
    radarHome: { possession: 70, ppda: 75, xgCreated: 94, restDefense: 68, pressing: 72, compactness: 64 },
    radarAway: { possession: 68, ppda: 62, xgCreated: 84, restDefense: 70, pressing: 60, compactness: 66 },
  },
  {
    id: "arteta-klopp",
    category: "modern",
    title: "Arteta vs Klopp pressing systems",
    prompt:
      "Compare Arteta’s hybrid man-zone jumps and inverted full-backs with Klopp’s rest-attack gegenpress: which fails first against a compact 5-2-3 that goes long?",
    homeShape: "4-3-3",
    awayShape: "4-3-3",
    radarHome: { possession: 82, ppda: 70, xgCreated: 80, restDefense: 84, pressing: 76, compactness: 72 },
    radarAway: { possession: 66, ppda: 88, xgCreated: 82, restDefense: 64, pressing: 92, compactness: 68 },
  },
];

export const MONTHLY_LAYER = {
  updated: "2026-09-01",
  note: "Mock current-season layer (replace with live feed).",
  teams: [
    { team: "Arsenal", xg: 18.4, xga: 9.1, ppda: 9.8, highTurnovers: 86, table: 1, last5: "WWDWW" },
    { team: "Liverpool", xg: 17.9, xga: 11.2, ppda: 8.4, highTurnovers: 94, table: 2, last5: "WWDLW" },
    { team: "Man City", xg: 16.2, xga: 10.4, ppda: 11.1, highTurnovers: 71, table: 3, last5: "WDWWL" },
    { team: "Barcelona", xg: 19.1, xga: 12.0, ppda: 10.2, highTurnovers: 77, table: 1, last5: "WWWDW" },
    { team: "Inter", xg: 14.8, xga: 8.6, ppda: 13.4, highTurnovers: 52, table: 2, last5: "WDWDW" },
    { team: "Bayern", xg: 20.4, xga: 11.8, ppda: 9.1, highTurnovers: 88, table: 1, last5: "WWWWW" },
  ],
};

export function localDebateReply(opts: {
  persona: DebatePersona;
  topic: DebateTopic;
  userStance: string;
  userText: string;
  round: number;
}): string {
  const { persona, topic, userStance, userText, round } = opts;
  const data = MONTHLY_LAYER.teams[round % MONTHLY_LAYER.teams.length];
  if (persona === "chair") {
    return `Chair — keep this on mechanisms, not slogans. Dilemma: ${topic.prompt}
User stance: “${userStance}”. Claim extract: “${userText.slice(0, 180)}”.
Challenge A (Purist): where is the 3+2 if the far full-back is in the box?
Challenge B (Anvil): if you trail after 70', does the 5-4-1 still generate 0.35 xG counters or only 0.04 blocked shots?
Trade-off: territorial control and chance volume vs shot quality and transition protection. Decide which error you prefer. Monthly layer (${MONTHLY_LAYER.updated}): ${data.team} xG ${data.xg} / PPDA ${data.ppda}.`;
  }
  if (persona === "purist") {
    return `Purist — ${topic.title}.
If we occupy five lanes and stagger so no more than three sit on a horizontal line, their compact block must choose a player to jump. That jump is the third-man. Your text (“${userText.slice(0, 120)}”) still treats possession as decoration. It is rest-defense: we lose the ball around their box with a 3-2 behind it, then counter-press for five seconds.
Against a 5-4-1 I do not whip early crosses. I invert the full-back, pin both centre-backs with a false nine or a high 9, and cut back to the free 8 at the edge of Zone 14. That is controlled probability, not luck.`;
  }
  if (persona === "anvil") {
    return `Anvil — ${topic.title}.
You can have 70% of the ball between our 18 and halfway. That is not dominance; that is us deciding the corridor. We stay inside 30m box-to-box, funnel you to the touchline, and defend the cutback with a wing-back’s inner hip.
One interception and we play two or three vertical passes into the channel you emptied when the full-back inverted. Your rest-defense is a slide-show until the first turnover. Shot quality: we will take four 0.30 xG breaks over your eighteen 0.05 shots. Stance you picked (“${userStance}”) still has to survive minute 88 at 0-0.`;
  }
  return `Analyst — numbers before narrative. Topic radar (home/away): possession ${topic.radarHome.possession}/${topic.radarAway.possession}, xG created index ${topic.radarHome.xgCreated}/${topic.radarAway.xgCreated}, rest-defense ${topic.radarHome.restDefense}/${topic.radarAway.restDefense}.
PPDA is not pressing quality by itself; pair it with high turnovers and shots after high regain. Current mock: ${data.team} xG ${data.xg}, xGA ${data.xga}, PPDA ${data.ppda}, high turnovers ${data.highTurnovers}, table ${data.table}, last five ${data.last5}.
User argument length ${userText.length} chars. Flag: if you cite a single match (Camp Nou 2010, Istanbul, etc.) treat it as n=1 unless the mechanism repeats across seasons.`;
}
