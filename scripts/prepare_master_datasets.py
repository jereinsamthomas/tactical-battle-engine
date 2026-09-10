import json
import glob
import os
import csv

# 1. Master Rules, Scenarios, and Causality Chains
master_path = 'master_data/tbe/rules/MASTER_RULES_AND_SCENARIOS.json'
with open(master_path, 'r', encoding='utf-8') as f:
    master_data = json.load(f)

print(f"Loaded master data: {len(master_data.get('rules', []))} rules, {len(master_data.get('battle_scenarios', []))} scenarios, {len(master_data.get('tactical_causality_chains', []))} chains")

# 2. Parse 14 CSV Data Models
csv_dir = 'master_data/tbe/data_model'
data_models = {}

descriptions = {
    "events.csv": "Discrete on-ball match events (passes, tackles, shots, fouls) with coordinates, timestamps, and outcomes.",
    "formations.csv": "Team shape configurations across phases (in-possession, out-of-possession, transitions) with timestamps.",
    "movements.csv": "Off-the-ball player movements tracking origin and destination zones (Z1-Z30) and tactical space created.",
    "passes.csv": "Detailed pass vectors including line-breaking, progressive metrics, start/end zones, and outcomes.",
    "player_tracking.csv": "High-frequency 2D coordinate positions, sprint velocity (mps), and body orientation angle.",
    "players.csv": "Squad rosters with primary and secondary tactical roles, preferred foot, and physical attributes.",
    "pressing.csv": "Pressing actions, pressing trigger identification, target players, and PPDA contribution metrics.",
    "set_pieces.csv": "Corner, free-kick, and throw-in deliveries with taker, delivery type, target player, and xG values.",
    "shots.csv": "Shot attempts with xG, post-shot xG (PSxG), body part, assist type, and outcome.",
    "tactical_decisions.csv": "Decision engine logs capturing candidate actions, chosen action, and tactical action value (TAV).",
    "tactical_outcomes.csv": "Realized outcomes following tactical decisions with xT delta and opponent response shifts.",
    "tactical_states.csv": "Global match context snapshots: game state, scoreline, phase, ball zone, and pressure level.",
    "team_shapes.csv": "Macro team geometric metrics: horizontal width, vertical length, centroid, and compactness.",
    "transitions.csv": "Turnover and transition phases (offensive vs defensive transitions) with start zone and duration."
}

for csv_file in sorted(glob.glob(os.path.join(csv_dir, '*.csv'))):
    name = os.path.basename(csv_file)
    with open(csv_file, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        headers = next(reader, [])
        rows = []
        for i, row in enumerate(reader):
            if i < 10 and row:
                rows.append(row)
        data_models[name] = {
            "tableName": name.replace('.csv', ''),
            "fileName": name,
            "description": descriptions.get(name, "Relational tactical data table."),
            "columns": headers,
            "sampleRows": rows
        }

# Ensure directories exist
os.makedirs('public/data', exist_ok=True)
os.makedirs('lib/data', exist_ok=True)

# Write public and lib files
with open('public/data/tactical_master.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f)

with open('lib/data/tactical_master.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f)

with open('lib/data/csv_models.json', 'w', encoding='utf-8') as f:
    json.dump(data_models, f, indent=2)

print(f"Saved tactical_master.json and csv_models.json ({len(data_models)} tables)")
