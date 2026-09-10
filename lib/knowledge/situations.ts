export interface Situation {
  id: string;
  situation: string;
  options: Array<{
    action: string;
    pSuccess: number;
    risk: string;
    attributes: string;
    opponent: string;
  }>;
  best: string;
}

const bases = [
  { s: "Opponent 4-4-2 high press vs your 4-3-3", opts: ["short_build_up", "long_build_up", "invert_full_back", "drop_midfielder"] },
  { s: "5-4-1 low block, ball on RW touchline", opts: ["early_cross", "cutback_recycle", "switch_far_side", "mezzala_underlap"] },
  { s: "You lead 1-0 at 82' vs 4-3-3", opts: ["drop_to_541", "keep_325", "foul_rhythm", "long_clear"] },
  { s: "Red card, you 10v11, 4-3-3", opts: ["to_441", "to_541", "high_press_bluff", "park_box"] },
  { s: "Man-oriented press on your 6", opts: ["third_man_bounce", "gk_chip", "fullback_invert", "carry_cb"] },
  { s: "Rest-defense 2+2, you lose it in Zone 14", opts: ["tactical_foul", "recover_channel", "gk_sweep", "drop_line"] },
  { s: "False nine drops, CB follows", opts: ["runner_blind_side", "recycle_switch", "shoot_38m", "overlap"] },
  { s: "Throw-in attacking third vs zonal box", opts: ["long_throw", "short_combo", "near_post_flick", "reset"] },
];

export const SITUATIONS: Situation[] = Array.from({ length: 50 }, (_, i) => {
  const b = bases[i % bases.length];
  return {
    id: `S${String(i + 1).padStart(3, "0")}`,
    situation: `${b.s} — variant ${Math.floor(i / bases.length) + 1} (minute ${20 + (i * 3) % 70}, score ${i % 3}-${i % 2}).`,
    options: b.opts.map((action, j) => ({
      action,
      pSuccess: Number((0.35 + ((i + j) % 5) * 0.1).toFixed(2)),
      risk: j === 0 ? "turnover in first line" : j === 1 ? "second ball loss" : j === 2 ? "rest-defense hole" : "offside / isolation",
      attributes: j % 2 === 0 ? "press-resistance, short passing, composure" : "pace, heading, anticipation",
      opponent: j % 2 === 0 ? "jump the free player / cover shadow the 6" : "drop into 5-4-1 and contest the aerial",
    })),
    best: b.opts[i % b.opts.length],
  };
});
