/**
 * tbe_ui.js
 * ─────────────────────────────────────────────────────────────────────────
 * Wires the TBE engine (tbe_engine.js) into the "Battle Engine" page of
 * TACTICS OS: decision-engine sliders, the 300-scenario browser, the
 * 300-chain visualizer, the 1,240-rule database browser, and the
 * stamina/fatigue controller. Also updates the header stat pills and the
 * TBE sub-navigation tabs.
 *
 * Depends on window.TBE (tbe_engine.js) being loaded first.
 */
(function () {
    'use strict';

    function $(id) { return document.getElementById(id); }
    function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function humanize(s) { return String(s).replace(/_/g, ' '); }

    // ═══════════════════════════════════════════════════════════════════
    // 0. HEADER STAT PILLS + SUB-NAV TAB SWITCHING
    // ═══════════════════════════════════════════════════════════════════
    function initHeaderStats() {
        if (!window.TBE) return;
        const r = $('tbe-stat-rules'), s = $('tbe-stat-scen'), c = $('tbe-stat-chains');
        if (r) r.textContent = TBE.stats.totalRules.toLocaleString();
        if (s) s.textContent = TBE.stats.totalScenarios.toLocaleString();
        if (c) c.textContent = TBE.stats.totalChains.toLocaleString();
    }

    function initSubNav() {
        const buttons = document.querySelectorAll('.tbe-subtab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.tbe-tab-pane').forEach(p => p.classList.remove('active'));
                const target = $('tbe-pane-' + btn.dataset.tbeTab);
                if (target) target.classList.add('active');
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 1. DECISION ENGINE TAB
    // ═══════════════════════════════════════════════════════════════════
    function wireDecisionEngine() {
        const btn = $('tbe-run-engine-btn');
        if (!btn) return;

        function run() {
            const x = parseFloat($('tbe-carrier-x').value);
            const y = parseFloat($('tbe-carrier-y').value);
            const nearestDefenderDist = parseFloat($('tbe-pressure-dist').value);
            const defenderCount = parseInt($('tbe-def-count').value, 10);

            const pressure = TBE.pressureAt(null, { nearestDefenderDist, defenderCount });
            const ctx = { x, y, defenderCount, nearestDefenderDist, pressure, passingAccess: Math.max(0.2, 1 - defenderCount * 0.15) };

            const sv = TBE.spaceValue(x, y, ctx);
            const control = TBE.pitchControlAt(x, y, ctx);
            const rec = TBE.explainRecommendation(ctx);

            // Metric cards
            $('tbe-out-sv').textContent = sv.toFixed(3);
            $('tbe-out-pressure').textContent = Math.round(pressure * 100) + '%';
            const pbar = $('tbe-out-pressure-bar'); if (pbar) pbar.style.width = Math.round(pressure * 100) + '%';
            $('tbe-out-ctrl-a').textContent = Math.round(control.attacking_team * 100) + '%';
            $('tbe-out-ctrl-b').textContent = Math.round(control.defending_team * 100) + '%';

            // Explainable recommendation card
            const recCard = $('tbe-recommendation-card');
            if (recCard) {
                recCard.innerHTML = `
                    <div class="panel-title amber" style="margin-bottom:8px;">
                        <i class="fa-solid fa-bolt"></i> RECOMMENDATION: ${rec.recommendation.toUpperCase().replace(/_/g, ' ')}
                        <span style="margin-left:auto; font-size:9px; padding:2px 8px; border-radius:10px; background:rgba(139,92,246,0.15); color:var(--purple); border:1px solid rgba(139,92,246,0.3);">
                            CONFIDENCE: ${rec.confidence.toUpperCase()}
                        </span>
                    </div>
                    <div style="font-size:11px; color:var(--text2); line-height:1.7; margin-bottom:8px;">
                        ${rec.why.map(w => `<div>→ ${esc(w)}</div>`).join('')}
                    </div>
                    <div style="font-size:10px; color:var(--text3); border-top:1px solid var(--border); padding-top:8px;">
                        <strong style="color:var(--text2);">Mechanism:</strong> ${esc(rec.mechanism)}<br>
                        <strong style="color:var(--text2);">Alternative:</strong> ${esc(rec.alternative.action)} (value ${rec.alternative.tactical_action_value})
                    </div>`;
            }

            // Ranked action leaderboard table
            const tbody = $('tbe-actions-tbody');
            if (tbody) {
                tbody.innerHTML = rec.ranked.map((r, i) => `
                    <tr${i === 0 ? ' style="background:rgba(209,0,0,0.06);"' : ''}>
                        <td>${i + 1}</td>
                        <td style="font-weight:700; color:${i === 0 ? 'var(--amber)' : '#fff'};">${humanize(r.action)}</td>
                        <td>${r.tactical_action_value.toFixed(3)}</td>
                        <td>${r.progression.toFixed(2)}</td>
                        <td>${r.space_gained.toFixed(2)}</td>
                        <td>${r.chance_creation.toFixed(2)}</td>
                        <td>${(r.possession_retention * 100).toFixed(0)}%</td>
                        <td>${(r.risk * 100).toFixed(0)}%</td>
                    </tr>`).join('');
            }
        }

        btn.addEventListener('click', run);
        run(); // populate on first load with default slider values
    }

    // ═══════════════════════════════════════════════════════════════════
    // 2. BATTLE SCENARIOS TAB (300 procedurally generated)
    // ═══════════════════════════════════════════════════════════════════
    function scenarioCard(sc) {
        return `<div class="module-card" style="cursor:pointer;" onclick='TBE_UI.showScenarioDetail(${JSON.stringify(sc.scenario_id)})'>
            <div class="module-badge">${esc(sc.game_state.toUpperCase())}</div>
            <div class="module-name" style="font-size:12px;">${esc(sc.formation_a)} <span style="color:var(--text3);">vs</span> ${esc(sc.formation_b)}</div>
            <div class="module-desc">${humanize(sc.style_a)} vs ${humanize(sc.style_b)} · Zone ${sc.ball_zone} · Pressure: ${sc.pressure_level}</div>
            <div style="margin-top:8px; display:flex; gap:4px; flex-wrap:wrap;">
                <span class="tag amber">${sc.best_action_estimate.toUpperCase()}</span>
                <span class="tag blue">${sc.numerical_state.replace(/_/g, ' ')}</span>
            </div>
        </div>`;
    }

    function renderScenarios(filterText, filterForm, filterState) {
        const grid = $('tbe-scenarios-grid');
        if (!grid || !window.TBE) return;
        let list = TBE.scenarios;
        if (filterForm) list = list.filter(s => s.formation_a === filterForm || s.formation_b === filterForm);
        if (filterState) list = list.filter(s => s.game_state === filterState);
        if (filterText) {
            const kw = filterText.toLowerCase();
            list = list.filter(s => (s.formation_a + s.formation_b + s.style_a + s.style_b + s.game_state).toLowerCase().includes(kw));
        }
        $('tbe-scen-count').textContent = `Showing ${list.length} of ${TBE.scenarios.length} scenarios`;
        grid.innerHTML = list.slice(0, 60).map(scenarioCard).join('') ||
            `<div style="color:var(--text3); font-size:12px; padding:20px;">No scenarios match this filter.</div>`;
    }

    function wireScenarios() {
        const search = $('tbe-scen-search'), formSel = $('tbe-scen-form-a'), stateSel = $('tbe-scen-state');
        if (!search) return;
        const update = () => renderScenarios(search.value, formSel.value, stateSel.value);
        search.addEventListener('input', update);
        formSel.addEventListener('change', update);
        stateSel.addEventListener('change', update);
        update();
    }

    // ═══════════════════════════════════════════════════════════════════
    // 3. CAUSALITY CHAINS TAB (300 procedurally generated, 7-step timeline)
    // ═══════════════════════════════════════════════════════════════════
    function chainSteps(ch) {
        return [
            ['1 · PLAYER/MOVEMENT', ch.step_1_player_movement],
            ['2 · SPACE', ch.step_2_space],
            ['3 · OPPONENT RESPONSE', humanize(ch.step_3_opponent_response)],
            ['4 · TEAM ADAPTATION', ch.step_4_team_adaptation],
            ['5 · SECOND OPPONENT RESPONSE', humanize(ch.step_5_second_opponent_response)],
            ['6 · COUNTER', ch.step_6_counter],
            ['7 · OUTCOME', humanize(ch.step_7_outcome)],
        ];
    }

    function renderChainVisualizer(chain) {
        const el = $('tbe-chain-visualizer');
        if (!el) return;
        if (!chain) { el.innerHTML = ''; return; }
        el.innerHTML = `
            <div class="panel accent-purple" style="margin-bottom:12px;">
                <div class="panel-title purple">${esc(chain.chain_id)} — ${humanize(chain.mechanism).toUpperCase()}</div>
                <div style="font-size:10px; color:var(--text3);">Context formation: ${esc(chain.context_formation)}</div>
            </div>
            <div style="display:flex; flex-direction:column; gap:0;">
                ${chainSteps(chain).map(([label, text], i) => `
                    <div style="display:flex; gap:14px; padding:10px 0; border-bottom:1px solid var(--border);">
                        <div style="min-width:170px; font-family:var(--fm); font-size:8px; color:var(--purple); padding-top:2px;">${label}</div>
                        <div style="flex:1; font-size:12px; color:var(--text2); line-height:1.5;">${esc(text)}</div>
                    </div>`).join('')}
            </div>`;
    }

    function wireChains() {
        const select = $('tbe-chain-select');
        if (!select || !window.TBE) return;
        select.innerHTML = TBE.chains.slice(0, 300).map(ch =>
            `<option value="${ch.chain_id}">${ch.chain_id} — ${humanize(ch.mechanism)} (${ch.context_formation})</option>`
        ).join('');
        select.addEventListener('change', () => {
            const chain = TBE.chains.find(c => c.chain_id === select.value);
            renderChainVisualizer(chain);
        });
        // Show the first chain by default
        if (TBE.chains.length) { select.value = TBE.chains[0].chain_id; renderChainVisualizer(TBE.chains[0]); }
    }

    // ═══════════════════════════════════════════════════════════════════
    // 4. RULES DATABASE TAB (1,240 procedurally generated)
    // ═══════════════════════════════════════════════════════════════════
    function ruleCard(r) {
        return `<div class="module-card" style="cursor:default;">
            <div class="module-badge">${esc(r.rule_id)}</div>
            <div class="module-name" style="font-size:12px;">${humanize(r.actor)} → ${humanize(r.action)}</div>
            <div class="module-desc">${esc(r.purpose)}</div>
            <div style="margin-top:6px; font-size:9px; color:var(--text3);">
                Trigger: ${humanize(r.trigger)} · Target: ${r.target}
            </div>
        </div>`;
    }

    function renderRules(filterText, category) {
        const grid = $('tbe-rules-grid');
        if (!grid || !window.TBE) return;
        const familyMap = {
            MOVEMENT: r => r.rule_id.startsWith('MV'),
            MANIPULATION_CHAINS: r => r.rule_id.startsWith('CC'),
            PRESSING_TRIGGERS: r => r.rule_id.startsWith('PT'),
            THIRD_MAN: r => r.rule_id.startsWith('TM'),
            OVERLOAD_ISOLATION: r => r.rule_id.startsWith('OI'),
            SUCCESS_PATTERNS: r => r.rule_id.startsWith('SC'),
            FAILURE_PATTERNS: r => r.rule_id.startsWith('FL'),
        };
        let list = TBE.rules;
        if (category && category !== 'ALL' && familyMap[category]) list = list.filter(familyMap[category]);
        if (filterText) {
            const kw = filterText.toLowerCase();
            list = list.filter(r => (r.trigger + ' ' + r.actor + ' ' + r.action + ' ' + r.target + ' ' + r.purpose).toLowerCase().includes(kw));
        }
        $('tbe-rules-count').textContent = `Showing ${Math.min(list.length, 60)} of ${list.length} matching rules (${TBE.rules.length} total)`;
        grid.innerHTML = list.slice(0, 60).map(ruleCard).join('') ||
            `<div style="color:var(--text3); font-size:12px; padding:20px;">No rules match this filter.</div>`;
    }

    function wireRules() {
        const search = $('tbe-rule-search'), category = $('tbe-rule-category');
        if (!search) return;
        const update = () => renderRules(search.value, category.value);
        search.addEventListener('input', update);
        category.addEventListener('change', update);
        update();
    }

    // ═══════════════════════════════════════════════════════════════════
    // 5. STAMINA & FATIGUE TAB
    // ═══════════════════════════════════════════════════════════════════
    function wireFatigue() {
        const minSlider = $('tbe-fatigue-min'), posSel = $('tbe-fatigue-pos'), stamSlider = $('tbe-fatigue-stamina');
        if (!minSlider) return;

        function run() {
            const minute = parseInt(minSlider.value, 10);
            const position = posSel.value;
            const stamina = parseInt(stamSlider.value, 10);

            $('tbe-fatigue-min-val').textContent = minute + "' min";
            $('tbe-fatigue-stam-val').textContent = stamina;

            const result = TBE.computeFatigue(minute, stamina, position);

            $('tbe-fatigue-pct-display').textContent = result.current_fatigue_pct.toFixed(1) + '%';
            $('tbe-fatigue-band-display').textContent = humanize(result.fatigue_band).toUpperCase();
            $('tbe-fatigue-meter-fill').style.width = result.current_fatigue_pct + '%';

            const bandColor = { fresh: 'var(--accent-green, #10b981)', light_fatigue: '#a3e635', moderate_fatigue: 'var(--amber)', heavy_fatigue: '#f97316', severe_fatigue: 'var(--red)' }[result.fatigue_band];
            $('tbe-fatigue-band-display').style.color = bandColor;
            $('tbe-fatigue-meter-fill').style.background = bandColor;

            $('tbe-speed-mod').textContent = Math.round(result.physical_multiplier * 100) + '%';
            $('tbe-scan-mod').textContent = Math.round(result.mental_technical_multiplier * 100) + '%';

            const alert = $('tbe-sub-alert');
            if (alert) alert.style.display = result.substitution_advisory ? 'flex' : 'none';
        }

        minSlider.addEventListener('input', run);
        posSel.addEventListener('change', run);
        stamSlider.addEventListener('input', run);
        run();
    }

    // ═══════════════════════════════════════════════════════════════════
    // 6. DETAIL MODAL (used by scenario cards)
    // ═══════════════════════════════════════════════════════════════════
    function showScenarioDetail(scenarioId) {
        const sc = TBE.scenarios.find(s => s.scenario_id === scenarioId);
        if (!sc) return;
        $('tbe-modal-title').textContent = `Scenario ${sc.scenario_id}`;
        $('tbe-modal-body').innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:12px; color:var(--text2);">
                ${Object.entries(sc).map(([k, v]) => `<div><strong style="color:var(--text3);">${humanize(k)}:</strong> ${Array.isArray(v) ? v.join(', ') : v}</div>`).join('')}
            </div>`;
        $('tbe-detail-modal').classList.add('active');
    }

    // ═══════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════
    function init() {
        if (!window.TBE) { console.warn('TBE engine not loaded; Battle Engine page will not function.'); return; }
        initHeaderStats();
        initSubNav();
        wireDecisionEngine();
        wireScenarios();
        wireChains();
        wireRules();
        wireFatigue();
    }

    window.TBE_UI = { init, showScenarioDetail };
})();
