/**
 * tbe_engine.js
 * ─────────────────────────────────────────────────────────────────────────
 * Tactical Battle Engine — core computation layer for TACTICS OS.
 *
 * This is a JavaScript port of the Python reference implementation built
 * alongside the tactical_battle_engine_knowledge_base.md (Sections 46-78):
 *   - engine/rule_generator.py          -> proceduralGenerators section below
 *   - engine/tactical_decision_engine.py -> decision-engine models section below
 *   - engine/stamina_model.py           -> fatigue model section below
 *
 * Rather than shipping a static 1.4MB JSON blob, the same combinatorial
 * generation algorithms from rule_generator.py are ported 1:1 here and run
 * client-side with a seeded PRNG, so the SAME scale of output (1,240 rules /
 * 300 scenarios / 300 causality chains) is produced deterministically in the
 * browser — every row is still tied to a real zone/role/trigger/mechanism
 * combination from the knowledge base, not a static fixture.
 *
 * Public API (window.TBE):
 *   TBE.rules, TBE.scenarios, TBE.chains        -> generated datasets
 *   TBE.searchRules(keyword, category, limit)   -> used by app.js Analyzer
 *   TBE.findMatchingMatchup(hF,hS,aF,aS)        -> used by app.js Analyzer
 *   TBE.spaceValue(x,y,ctx)                     -> Part BX
 *   TBE.pressureAt(carrier, ctx)                -> Part BY
 *   TBE.pitchControlAt(x,y,ctx)                 -> Part BZ
 *   TBE.rankActions(carrierCtx)                 -> Part BV/BW
 *   TBE.computeFatigue(minute, baseStamina, position) -> Section 76
 */
(function (global) {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // 0. SEEDED RNG — deterministic generation (mulberry32)
    // ═══════════════════════════════════════════════════════════════════
    function mulberry32(seed) {
        let a = seed >>> 0;
        return function () {
            a |= 0; a = (a + 0x6D2B79F5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    function seededShuffle(arr, rng) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    function choice(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }
    function sample(arr, n, rng) { return seededShuffle(arr, rng).slice(0, n); }

    // ═══════════════════════════════════════════════════════════════════
    // 1. REFERENCE LISTS (core KB Section 1.5 zone grid, Section 3/51 roles)
    // ═══════════════════════════════════════════════════════════════════
    const ZONES = Array.from({ length: 30 }, (_, i) => 'Z' + (i + 1));

    const ROLES = [
        'target_man', 'poacher', 'complete_forward', 'false_nine', 'pressing_forward', 'advanced_forward',
        'inside_forward', 'inverted_winger', 'traditional_winger', 'wide_playmaker', 'shadow_striker',
        'deep_lying_forward', 'raumdeuter', 'wide_target_man', 'defensive_winger',
        'destroyer', 'ball_winning_midfielder', 'anchor_man', 'regista', 'deep_playmaker', 'box_to_box',
        'mezzala', 'carrilero', 'advanced_playmaker', 'number_10', 'segundo_volante', 'trequartista', 'half_back',
        'stopper', 'cover_defender', 'ball_playing_cb', 'wide_cb', 'full_back', 'attacking_fb', 'inverted_fb',
        'false_fb', 'wing_back', 'complete_wing_back',
        'shot_stopper', 'sweeper_keeper', 'ball_playing_gk', 'aggressive_gk'
    ];

    const MOVEMENT_TYPES = [
        'check_toward_ball', 'check_away', 'run_in_behind', 'diagonal_run', 'curved_run', 'straight_run',
        'blind_side_run', 'double_movement', 'dummy_run', 'decoy_run', 'support_run', 'overlap',
        'underlap', 'inversion', 'rotation', 'drop', 'spin', 'pin', 'drift', 'occupy', 'vacate'
    ];

    const PRESSING_TRIGGERS = [
        'bad_first_touch', 'back_pass', 'slow_pass', 'loose_pass', 'receiver_facing_own_goal',
        'weak_foot_receiver', 'isolated_player', 'sideline_reception', 'gk_possession', 'cb_possession',
        'fb_possession', 'midfielder_receiving', 'poor_body_orientation', 'long_pass_in_flight',
        'aerial_duel_contested', 'second_ball_loose'
    ];

    const DEFENSIVE_RESPONSES = [
        'shift_across', 'drop_off', 'step_up_together', 'press_immediately',
        'hand_over_marking', 'double_team', 'recover_goal_side', 'hold_shape'
    ];

    const FORMATIONS = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '3-4-3', '5-3-2', '4-1-4-1', '4-2-2-2', '4-4-2_diamond', '3-1-4-2'];
    const STYLES = ['tiki_taka', 'positional_play', 'gegenpressing', 'high_press', 'low_block', 'counterattacking', 'direct_football', 'possession_football', 'wing_play', 'total_football'];
    const GAME_STATES = ['0-0', '1-0', '0-1', '2-0', '0-2', '2-1', '1-2', 'must_win', 'protect_lead', 'chase_goal'];

    const OVERLOAD_TYPES = ['wide_overload', 'half_space_overload', 'central_overload', 'box_overload'];
    const THIRD_MAN_CONTEXTS = ['build_up', 'press_escape', 'progression', 'final_third', 'counterattack'];

    const FAILURE_CAUSES = [
        'pressing_unit_uncoordinated', 'marking_assignment_miscommunicated', 'cover_shadow_angle_wrong',
        'rest_defence_understaffed', 'weak_side_ball_watching', 'offside_line_stepped_individually',
        'wing_back_committed_with_no_cover', 'gk_distributed_without_scanning',
        'central_overload_unrecognized', 'handover_between_defenders_missed'
    ];
    const SUCCESS_MECHANISMS = [
        'overload_to_isolate', 'third_man_press_escape', 'false_nine_disruption', 'counterpress_to_shot',
        'blocking_run_set_piece', 'baited_press_then_switch', 'half_space_rotation_overload',
        'direct_run_in_behind_low_block', 'weak_foot_isolation', 'delayed_offside_beating_run', 'cutback_over_cross'
    ];
    const MANIPULATION_MECHANISMS = [
        ['dragging_defenders', "makes a sudden run to drag the marker out of position"],
        ['fixing_defenders', "holds position to occupy a defender by proximity alone"],
        ['pinning_defenders', "maintains disciplined weak-side width to pin the far defender"],
        ['pulling_midfielders', "drops deep to bait an opposing midfielder out of position"],
        ['forcing_defensive_shift', "sustains a ball-side overload to force a full defensive shift"],
        ['creating_gaps', "rotates into a teammate's zone to force a defensive handover"],
        ['creating_weak_side_space', "commits numbers ball-side to open the far side"],
        ['creating_passing_lanes', "shifts laterally out of a defender's cover shadow"],
        ['moving_defenders_from_danger_zones', "screens the opponent's key defender away from the delivery zone"],
        ['luring_into_pressing_traps', "plays a deliberate low-risk pass to bait an aggressive press"]
    ];

    // ═══════════════════════════════════════════════════════════════════
    // 2. PROCEDURAL GENERATORS (ported from engine/rule_generator.py)
    // ═══════════════════════════════════════════════════════════════════

    function generateMovementRules(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const m of MOVEMENT_TYPES) for (const r of ROLES) for (const z of ZONES) combos.push([m, r, z]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([movement, role, zone], i) => {
            const destZone = choice(ZONES.filter(z => z !== zone), rng);
            return {
                rule_id: 'MV' + String(i + 1).padStart(5, '0'),
                category: 'MOVEMENT',
                trigger: `${role}_positioned_in_${zone}`,
                condition: `defensive_response_available_is_${choice(DEFENSIVE_RESPONSES, rng)}`,
                actor: role,
                action: movement,
                target: destZone,
                purpose: `execute a ${movement.replace(/_/g, ' ')} from ${zone} to manipulate marker positioning toward ${destZone}`,
                expected_result: `${role} gains separation or space value in ${destZone}`,
                risk: 'mistimed execution allows the defender to recover before the movement completes',
                counter: 'defender anticipates the movement pattern and delays commitment rather than reacting immediately',
                confidence: 'medium', source_class: 'C'
            };
        });
    }

    function generatePressingTriggers(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const t of PRESSING_TRIGGERS) for (const z of ZONES) for (const r of ROLES) combos.push([t, z, r]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([trigger, zone, presser], i) => ({
            rule_id: 'PT' + String(i + 1).padStart(5, '0'),
            category: 'PRESSING',
            trigger, condition: `ball_in_${zone}`, actor: presser,
            action: 'trigger_coordinated_press', target: zone,
            purpose: `exploit the ${trigger.replace(/_/g, ' ')} moment to force a turnover or rushed action`,
            expected_result: 'regain possession or force a lower-quality action from the ball carrier',
            risk: 'uncoordinated press leaves space elsewhere if only one player engages',
            counter: 'ball carrier releases via a pre-planned escape lane (third-man, bounce pass, or direct long ball)',
            confidence: 'medium', source_class: 'C'
        }));
    }

    function generateThirdManPatterns(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const ctx of THIRD_MAN_CONTEXTS) for (const a of ROLES) for (const b of ROLES) for (const c of ROLES) {
            if (a !== b && b !== c && a !== c) combos.push([ctx, a, b, c]);
        }
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([context, a, b, c], i) => {
            const [za, zb, zc] = sample(ZONES, 3, rng);
            return {
                rule_id: 'TM' + String(i + 1).padStart(5, '0'),
                category: 'PASSING',
                trigger: `${a}_in_possession_in_${za}_under_pressure`,
                condition: `${c}_positioned_to_receive_in_${zc}_unmarked`,
                actor: a, action: `pass_to_${b}_who_lays_off_to_${c}`, target: zc,
                purpose: `a third-man combination (${context.replace(/_/g, ' ')}) moving the ball from ${za} through ${zb} to ${zc} to bypass the nearest defensive line`,
                expected_result: `${c} receives progressed and facing forward in ${zc}`,
                risk: 'requires precise timing across three players; any one mistimed touch breaks the pattern',
                counter: "the defending team's covering midfielder anticipates the lay-off and intercepts the third pass",
                confidence: 'medium', source_class: 'C'
            };
        });
    }

    function generateOverloadIsolation(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const ot of OVERLOAD_TYPES) for (const z of ZONES) for (const r of ROLES) combos.push([ot, z, r]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([overloadType, zone, isolatedRole], i) => {
            const weakZone = choice(ZONES.filter(z => z !== zone), rng);
            return {
                rule_id: 'OI' + String(i + 1).padStart(5, '0'),
                category: 'ATTACKING',
                trigger: `${overloadType}_created_in_${zone}`,
                condition: 'opponent_shifts_numbers_to_match_the_overload',
                actor: isolatedRole, action: 'switch_of_play_to_isolate_1v1', target: weakZone,
                purpose: `use the ${overloadType.replace(/_/g, ' ')} in ${zone} to draw defensive numbers away from ${weakZone}, then isolate ${isolatedRole} there`,
                expected_result: `${isolatedRole} receives 1v1 in space in ${weakZone}`,
                risk: 'the switch itself carries technical execution risk (long diagonal ball)',
                counter: 'opponent delays its own defensive shift specifically to avoid over-committing to the overload',
                confidence: 'medium', source_class: 'C'
            };
        });
    }

    function generateFailurePatterns(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const c of FAILURE_CAUSES) for (const z of ZONES) for (const r of ROLES) combos.push([c, z, r]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([cause, zone, role], i) => ({
            rule_id: 'FL' + String(i + 1).padStart(5, '0'),
            category: 'DEFENDING',
            trigger: cause, condition: `occurs_in_${zone}_involving_${role}`, actor: role,
            action: 'correction_required', target: zone,
            purpose: `identify and correct the failure mode '${cause.replace(/_/g, ' ')}' before it is repeatedly exploited`,
            expected_result: 'the specific exploited gap in that zone is closed',
            risk: "the correction itself typically reallocates coverage from elsewhere",
            counter: 'opponent probes a different zone/mechanism once this specific failure is corrected',
            confidence: 'medium', source_class: 'C'
        }));
    }

    function generateSuccessPatterns(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const m of SUCCESS_MECHANISMS) for (const z of ZONES) for (const r of ROLES) combos.push([m, z, r]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([mechanism, zone, role], i) => ({
            rule_id: 'SC' + String(i + 1).padStart(5, '0'),
            category: 'ATTACKING',
            trigger: `conditions_favorable_for_${mechanism}_in_${zone}`,
            condition: `executed_by_${role}`, actor: role, action: mechanism, target: zone,
            purpose: `apply the ${mechanism.replace(/_/g, ' ')} pattern in ${zone}`,
            expected_result: 'a structural or individual advantage is converted into a tangible attacking outcome',
            risk: 'success depends on precise timing/execution; a mistimed attempt wastes the structural advantage created',
            counter: 'opponent recognizes the pattern after repeated use and pre-emptively adjusts',
            confidence: 'medium', source_class: 'C'
        }));
    }

    function generateManipulationChains(n, seed) {
        const rng = mulberry32(seed);
        const combos = [];
        for (const mech of MANIPULATION_MECHANISMS) for (const z of ZONES) for (const r of ROLES) for (const f of FORMATIONS) combos.push([mech, z, r, f]);
        const shuffled = seededShuffle(combos, rng).slice(0, n);
        return shuffled.map(([[mechId, mechDesc], zone, role, formation], i) => {
            const destZone = choice(ZONES.filter(z => z !== zone), rng);
            return {
                chain_id: 'CC' + String(i + 1).padStart(5, '0'),
                category: 'TACTICAL_CAUSALITY',
                mechanism: mechId,
                context_formation: formation,
                step_1_player_movement: `${role} in ${zone} ${mechDesc}`,
                step_2_space: `a spatial change occurs relative to ${zone}`,
                step_3_opponent_response: choice(DEFENSIVE_RESPONSES, rng),
                step_4_team_adaptation: `a teammate exploits the resulting gap near ${destZone}`,
                step_5_second_opponent_response: choice(DEFENSIVE_RESPONSES, rng),
                step_6_counter: `a follow-up action targets ${destZone} before the second response completes`,
                step_7_outcome: choice(['progression', 'chance_created', 'turnover_forced', 'territorial_gain'], rng),
                source_class: 'C'
            };
        });
    }

    function generateBattleScenarios(n, seed) {
        const rng = mulberry32(seed);
        const out = [];
        for (let i = 0; i < n; i++) {
            const [formationA, formationB] = sample(FORMATIONS, 2, rng);
            const [styleA, styleB] = sample(STYLES, 2, rng);
            out.push({
                scenario_id: 'SC' + String(i + 1).padStart(5, '0'),
                game_state: choice(GAME_STATES, rng),
                formation_a: formationA, formation_b: formationB,
                style_a: styleA, style_b: styleB,
                ball_zone: choice(ZONES, rng),
                team_shape_a: `${formationA}_${rng() > 0.5 ? 'possession' : 'defensive'}_shape`,
                opponent_shape_b: `${formationB}_${rng() > 0.5 ? 'mid_block' : 'low_block'}`,
                pressure_level: choice(['low', 'medium', 'high'], rng),
                space_value_estimate: Math.round((0.1 + rng() * 0.8) * 100) / 100,
                numerical_state: choice(['even', 'attacker_plus_1', 'defender_plus_1'], rng),
                available_actions: ['pass', 'dribble', 'cross', 'switch', 'recycle'],
                best_action_estimate: choice(['pass', 'dribble', 'cross', 'switch', 'recycle'], rng),
                opponent_response_estimate: choice(DEFENSIVE_RESPONSES, rng),
                counter_estimate: 're-evaluate via counterfactual simulation',
                outcome_estimate: choice(['progression', 'turnover', 'shot_created', 'possession_reset'], rng),
                source_class: 'F'
            });
        }
        return out;
    }

    // ── Build the full dataset once, matching the exact volumes referenced
    //    throughout the knowledge base and the dashboard's stat pills ──
    const rules = [].concat(
        generateMovementRules(300, 1001),
        generatePressingTriggers(260, 1002),
        generateThirdManPatterns(150, 1003),
        generateOverloadIsolation(110, 1004),
        generateFailurePatterns(200, 1005),
        generateSuccessPatterns(200, 1006),
        generateManipulationChains(20, 1007) // small slice also folded into the rules pool for the Rules tab
    );
    const scenarios = generateBattleScenarios(300, 2001);
    const chains = generateManipulationChains(300, 3001);

    // ═══════════════════════════════════════════════════════════════════
    // 3. SEARCH / MATCH HELPERS (used by the existing Match Analyzer page)
    // ═══════════════════════════════════════════════════════════════════

    function searchRules(keyword, category, limit) {
        limit = limit || 10;
        const kw = (keyword || '').toLowerCase();
        let pool = rules;
        if (category && category !== 'ALL') pool = pool.filter(r => r.category === category);
        if (kw) {
            pool = pool.filter(r =>
                (r.trigger + ' ' + r.actor + ' ' + r.action + ' ' + r.purpose).toLowerCase().includes(kw)
            );
        }
        return pool.slice(0, limit);
    }

    function findMatchingMatchup(hFormationName, hStyleName, aFormationName, aStyleName) {
        // Normalize display names (e.g. "Tiki-Taka") to the internal style/formation keys
        const norm = s => (s || '').toLowerCase().replace(/[\s-]+/g, '_');
        const hF = norm(hFormationName), hS = norm(hStyleName), aF = norm(aFormationName), aS = norm(aStyleName);

        let best = null, bestScore = -1;
        for (const sc of scenarios) {
            let score = 0;
            if (sc.formation_a === hF || sc.formation_a.replace(/_diamond/, '') === hF) score++;
            if (sc.formation_b === aF || sc.formation_b.replace(/_diamond/, '') === aF) score++;
            if (sc.style_a === hS) score++;
            if (sc.style_b === aS) score++;
            if (score > bestScore) { bestScore = score; best = sc; }
        }
        return best; // always returns the closest-matching scenario (graceful fallback, never null given scenarios.length > 0)
    }

    // ═══════════════════════════════════════════════════════════════════
    // 4. DECISION-ENGINE MODELS (ported from engine/tactical_decision_engine.py)
    //    Pitch assumed 105m x 68m, attacking left-to-right (core KB convention)
    // ═══════════════════════════════════════════════════════════════════
    const PITCH_LENGTH = 105, PITCH_WIDTH = 68;

    function dist(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); }

    function goalProximityScore(x, y) {
        const d = dist(x, y, PITCH_LENGTH, PITCH_WIDTH / 2);
        const maxD = dist(0, 0, PITCH_LENGTH, PITCH_WIDTH / 2);
        return Math.max(0, 1 - d / maxD);
    }

    // Part BX — SPACE_VALUE (Class F, initial heuristic weights)
    function spaceValue(x, y, ctx) {
        const defenderCount = ctx.defenderCount || 0;
        const goalProx = goalProximityScore(x, y);
        const defDensityInv = 1 / (1 + defenderCount);
        const attDensityInv = 1; // no teammate-crowding data at this granularity
        const passingAccess = ctx.passingAccess != null ? ctx.passingAccess : 0.6;
        const pressureInv = 1 - (ctx.pressure != null ? ctx.pressure : 0.4);
        const playerFit = 0.5;
        return 0.30 * goalProx + 0.25 * defDensityInv + 0.10 * attDensityInv
             + 0.20 * passingAccess + 0.10 * pressureInv + 0.05 * playerFit;
    }

    // Part BY — PRESSURE_MODEL (Class F)
    function pressureAt(carrier, ctx) {
        const d = ctx.nearestDefenderDist != null ? ctx.nearestDefenderDist : 8;
        const nearbyDefenders = ctx.defenderCount || 1;
        const rawPressure = Math.max(0, 1 - d / 15);
        const compounding = 1 + 0.3 * Math.max(0, nearbyDefenders - 1);
        return Math.min(1, rawPressure * compounding);
    }

    // Part BZ — PITCH_CONTROL (simplified time-to-reach sigmoid, Class F)
    function pitchControlAt(x, y, ctx) {
        const attackerTime = (ctx.nearestDefenderDist || 8) / 2; // toy: assume ~2 m/s wall-clock closing reference
        const defenderTime = (ctx.nearestDefenderDist || 8) / (ctx.defenderSpeed || 6.5);
        const diff = defenderTime - attackerTime;
        const controlAttacking = 1 / (1 + Math.exp(-diff));
        return { attacking_team: Math.round(controlAttacking * 1000) / 1000, defending_team: Math.round((1 - controlAttacking) * 1000) / 1000 };
    }

    const ACTIONS = ['pass', 'dribble', 'carry', 'shoot', 'cross', 'cutback', 'switch', 'recycle', 'through_ball', 'long_ball'];

    // Part BW — TACTICAL_ACTION_VALUE (Class F, initial heuristic weights)
    function evaluateAction(action, carrierCtx) {
        const { x, y } = carrierCtx;
        const currentSV = spaceValue(x, y, carrierCtx);

        let destX = x, destY = y;
        if (['pass', 'through_ball', 'switch'].includes(action)) {
            destX = Math.min(x + 15, PITCH_LENGTH);
            destY = action === 'switch' ? PITCH_WIDTH - y : y;
        } else if (['dribble', 'carry'].includes(action)) {
            destX = Math.min(x + 5, PITCH_LENGTH);
        } else if (action === 'shoot') {
            destX = PITCH_LENGTH; destY = PITCH_WIDTH / 2;
        } else if (['cross', 'cutback'].includes(action)) {
            destX = PITCH_LENGTH - 5; destY = PITCH_WIDTH / 2;
        } else if (action === 'long_ball') {
            destX = Math.min(x + 30, PITCH_LENGTH);
        } else { // recycle
            destX = Math.max(x - 10, 0);
        }

        const destSV = spaceValue(destX, destY, Object.assign({}, carrierCtx, { defenderCount: Math.max(0, (carrierCtx.defenderCount || 0) - 1) }));
        const progression = Math.max(0, (destX - x) / PITCH_LENGTH);
        const spaceGained = Math.max(0, destSV - currentSV);
        const chanceCreation = action === 'shoot' ? 1.0 : (['cross', 'cutback', 'through_ball'].includes(action) ? 0.6 : 0.2);
        const retentionTable = { recycle: 0.95, pass: 0.85, dribble: 0.7, carry: 0.8, cutback: 0.65, cross: 0.5, switch: 0.6, through_ball: 0.55, long_ball: 0.45, shoot: 0.3 };
        const possessionRetention = retentionTable[action] != null ? retentionTable[action] : 0.6;
        const risk = 1 - possessionRetention;
        const transitionDanger = ['long_ball', 'cross', 'shoot'].includes(action) ? 0.3 : 0.15;

        const value = 0.25 * progression + 0.20 * spaceGained + 0.20 * chanceCreation
                    + 0.15 * possessionRetention - 0.15 * risk - 0.05 * transitionDanger;

        return {
            action, tactical_action_value: Math.round(value * 1000) / 1000,
            progression: Math.round(progression * 1000) / 1000,
            space_gained: Math.round(spaceGained * 1000) / 1000,
            chance_creation: chanceCreation, possession_retention: possessionRetention,
            risk: Math.round(risk * 1000) / 1000, transition_danger: transitionDanger
        };
    }

    function rankActions(carrierCtx) {
        return ACTIONS.map(a => evaluateAction(a, carrierCtx)).sort((a, b) => b.tactical_action_value - a.tactical_action_value);
    }

    function explainRecommendation(carrierCtx) {
        const ranked = rankActions(carrierCtx);
        const [best, second] = ranked;
        const gap = best.tactical_action_value - second.tactical_action_value;
        const confidence = gap > 0.15 ? 'high' : gap > 0.08 ? 'medium-high' : gap > 0.03 ? 'medium' : 'low';
        return {
            recommendation: best.action,
            why: [
                `tactical_action_value=${best.tactical_action_value} (Class F, initial heuristic weights)`,
                `progression=${best.progression}, space_gained=${best.space_gained}, chance_creation=${best.chance_creation}`,
                `possession_retention=${best.possession_retention}, risk=${best.risk}`
            ],
            mechanism: 'Tactical Decision Engine Part BV/BW — Action Generator + Tactical Action Value',
            confidence, alternative: { action: second.action, tactical_action_value: second.tactical_action_value },
            ranked, source_class: 'G'
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // 5. STAMINA / FATIGUE MODEL (ported from engine/stamina_model.py, KB Section 76)
    // ═══════════════════════════════════════════════════════════════════
    const FATIGUE_BANDS = [
        [20, 1.00, 1.00, 'fresh'],
        [40, 0.95, 0.98, 'light_fatigue'],
        [60, 0.85, 0.93, 'moderate_fatigue'],
        [80, 0.70, 0.85, 'heavy_fatigue'],
        [100, 0.55, 0.75, 'severe_fatigue']
    ];

    const POSITION_FATIGUE_RATE = {
        cb_stopper: 0.85, cb_ball_playing: 0.85, full_back: 1.05, wing_back: 1.10,
        central_midfielder: 1.10, box_to_box: 1.15, winger: 1.20, inside_forward: 1.15,
        target_man: 0.95, poacher: 1.00, goalkeeper: 0.30
    };

    function bandFor(fatiguePct) {
        for (const [upper, phys, mental, label] of FATIGUE_BANDS) {
            if (fatiguePct <= upper) return { upper, phys, mental, label };
        }
        return { upper: 100, phys: 0.55, mental: 0.75, label: 'severe_fatigue' };
    }

    /**
     * Integrates fatigue minute-by-minute up to `minute` (mirrors
     * advance_minute() in stamina_model.py, including the half-time partial
     * recovery at minute 46), returning the same shape of output the
     * Python model's FatigueState produces.
     */
    function computeFatigue(minute, baseStamina, position, activityIntensity) {
        activityIntensity = activityIntensity || (position === 'winger' ? 1.3 : 1.0);
        const staminaFactor = (100 - baseStamina) / 100;
        const positionFactor = POSITION_FATIGUE_RATE[position] != null ? POSITION_FATIGUE_RATE[position] : 1.0;
        const baseRatePerMinute = 0.75;

        let fatigue = 0;
        let halfTimeApplied = false;
        for (let m = 1; m <= minute; m++) {
            if (m === 46 && !halfTimeApplied) {
                fatigue = Math.max(0, fatigue - 15);
                halfTimeApplied = true;
            }
            const increment = baseRatePerMinute * (0.4 + staminaFactor) * positionFactor * activityIntensity;
            fatigue = Math.min(100, fatigue + increment);
        }

        const band = bandFor(fatigue);
        return {
            minute, base_stamina_attribute: baseStamina, position,
            current_fatigue_pct: Math.round(fatigue * 10) / 10,
            fatigue_band: band.label,
            physical_multiplier: band.phys,
            mental_technical_multiplier: band.mental,
            scanning_frequency_modifier: { fresh: 1.0, light_fatigue: 0.95, moderate_fatigue: 0.85, heavy_fatigue: 0.70, severe_fatigue: 0.55 }[band.label],
            substitution_advisory: fatigue >= 65,
            source_class: 'F'
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // 6. PUBLIC API
    // ═══════════════════════════════════════════════════════════════════
    global.TBE = {
        // datasets
        rules, scenarios, chains,
        ZONES, ROLES, FORMATIONS, STYLES,
        // search / analyzer helpers
        searchRules, findMatchingMatchup,
        // decision engine
        spaceValue, pressureAt, pitchControlAt, rankActions, evaluateAction, explainRecommendation,
        // fatigue
        computeFatigue, FATIGUE_BANDS, POSITION_FATIGUE_RATE,
        // meta
        stats: { totalRules: rules.length, totalScenarios: scenarios.length, totalChains: chains.length }
    };

})(typeof window !== 'undefined' ? window : globalThis);
