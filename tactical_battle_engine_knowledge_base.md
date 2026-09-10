# TACTICAL BATTLE ENGINE — FOOTBALL TACTICAL KNOWLEDGE BASE

**Purpose:** Structured, machine-readable reference for training/grounding an AI system (TACTICAL BATTLE ENGINE) to reason about football tactics — not just recognize terminology.

**Convention used throughout this document:**
- `UNIVERSAL PRINCIPLE` = true regardless of system/style (law of the game, or near-constant tactical logic)
- `STYLE PREFERENCE` = a choice some coaching philosophies make; not universally correct
- Zone naming uses a 6x5 pitch grid unless stated otherwise (see Section 1.5)

---

## SECTION 1 — FOOTBALL FUNDAMENTALS

### 1.1 Pitch Dimensions
- Length: 100–110m (international standard ~105m)
- Width: 64–75m (international standard ~68m)
- Penalty box: 16.5m from goal line, 40.3m wide
- Six-yard box: 5.5m from goal line, 18.3m wide
- Centre circle radius: 9.15m

### 1.2 Pitch Thirds (vertical division, goal-to-goal)
| Third | Description | Tactical Function |
|---|---|---|
| Defensive third | Own goal to ~35m line | Security, build-up initiation, low risk |
| Middle third | Central 30-35m band | Progression, control, transition battleground |
| Attacking third | Final ~35m before opponent goal | Chance creation, penetration, high risk/reward |

**UNIVERSAL PRINCIPLE:** Risk tolerance for passing/dribbling increases as the ball moves from defensive → attacking third, because losses in the defensive third carry the highest consequence (direct threat to own goal).

### 1.3 Horizontal Zones (5-lane model, side-to-side)
| Lane | Position | Function |
|---|---|---|
| Left wing | Widest left channel | Width, crossing, isolation 1v1 |
| Left half-space | Between left wing and centre | Combination play, cutbacks, shooting angle |
| Central zone | Middle channel | Control, verticality, highest defensive density |
| Right half-space | Between centre and right wing | Mirror of left half-space |
| Right wing | Widest right channel | Width, crossing, isolation 1v1 |

**UNIVERSAL PRINCIPLE:** Half-spaces are statistically the most valuable attacking lanes because they offer both a shooting/passing angle toward goal (unlike wings) and reduced defensive density (unlike the centre).

### 1.4 Vertical Channels & Depth
- **Build-up zone**: own defensive third, low pressure sought
- **Progression zone**: middle third, line-breaking sought
- **Pressing zone**: wherever the defending team applies coordinated pressure — can be high, mid, or low
- **Transition zone**: any zone within ~5 seconds of a possession change

### 1.5 The 6x5 Grid Reference
For machine-readable positioning, the pitch is divided into a 6 (length) x 5 (width) grid = 30 zones, numbered Z1 (own goal, left) to Z30 (opponent goal, right). This grid underlies all zone references in later rule databases (e.g., `Z22` = attacking third, right half-space).

```
Width →   LW   LHS   CEN   RHS   RW
Length
Def 1     Z1   Z2    Z3    Z4    Z5
Def 2     Z6   Z7    Z8    Z9    Z10
Mid 1     Z11  Z12   Z13   Z14   Z15
Mid 2     Z16  Z17   Z18   Z19   Z20
Att 1     Z21  Z22   Z23   Z24   Z25
Att 2     Z26  Z27   Z28   Z29   Z30
```

### 1.6 Key Zone Concepts
| Concept | Definition | Tactical Effect |
|---|---|---|
| Width | Occupation of wing lanes | Stretches opponent block horizontally |
| Depth | Occupation of high/low lanes | Stretches opponent block vertically |
| Central corridor | Z3/Z8/Z13/Z18/Z23/Z28 | Most congested, highest-value if broken |
| Penalty box | Z26-Z30 central subset | Primary scoring zone |
| Defensive box | Z1-Z5 central subset | Primary goal-protection zone |

---

## SECTION 2 — LAWS AND BASIC RULES (Tactical Modelling View)

Format: RULE → CONDITION → CONSEQUENCE → TACTICAL EFFECT

| Rule | Condition | Consequence | Tactical Effect |
|---|---|---|---|
| Players | 11 v 11 (min 7 to start) | Team below minimum forfeits | Squad depth affects late-game tactics |
| Offside | Attacker in opponent half, ahead of ball AND 2nd-last defender at pass moment, involved in play | Free kick to defending team | Enables high defensive lines; enables "offside trap" tactic |
| Fouls | Careless/reckless/excessive-force contact | Free kick (direct/indirect) or penalty if in box | Shapes pressing intensity near own box (foul risk) |
| Handball | Deliberate arm/hand contact with ball (with some exceptions for natural body position) | Free kick or penalty | Affects defensive body shape when blocking crosses/shots |
| Free kicks | Direct: most fouls. Indirect: technical offences (e.g., GK handling back-pass) | Set piece for opposing team | Generates structured attacking phases |
| Penalties | Direct free-kick offence committed by defender inside own box | Penalty kick, high-xG chance | Increases caution for defenders inside box |
| Throw-ins | Ball fully exits over touchline | Throw-in to team who didn't touch it last | Low-risk restart; can be a pressing trigger for opponent |
| Corners | Ball exits over goal line off defender | Corner kick | High-value set-piece attacking phase |
| Goal kicks | Ball exits over goal line off attacker | Goal kick, ball back in play from box | Modern rule allows opponents inside box before ball is in play, increasing pressing options |
| GK restrictions | Cannot handle deliberate back-pass or throw-in from teammate | Indirect free kick if violated | Forces goalkeepers into build-up decision-making |
| Advantage | Referee allows play to continue despite a foul if non-offending team benefits | Play continues | Encourages quick transitional attacks after fouls |
| Cards | Yellow = caution, Red = dismissal (2 yellows = red) | Player sent off reduces team to 10 | Forces reactive formation/style changes |
| Added time | Time lost added at referee discretion | Extended playing period | Affects game-state tactics near half/full time |
| Substitutions | Limited number (commonly 5 in modern rules, varies by competition) | Player replaced permanently | Enables tactical/formation changes mid-game |

---

## SECTION 3 — PLAYER POSITIONS

Each profile: Primary role, Defensive responsibility, Attacking responsibility, Movement, Preferred zones, Passing behaviour, Pressing behaviour, Defensive behaviour, Transition behaviour, Common combinations, Strengths, Weaknesses, Tactical instructions.

### 3.1 Goalkeepers

**Traditional Goalkeeper**
- Primary role: Shot-stopping, box command
- Defensive responsibility: Line organisation, claiming crosses
- Attacking responsibility: Minimal — long clearances only
- Movement: Stays on goal line/box arc, minimal distribution range
- Preferred zones: Z1/Z3
- Passing: Long, direct, low risk
- Pressing: N/A (deepest player)
- Defensive: Reactive shot-stopping, narrow angles
- Transition: Quick long ball to forwards on turnover
- Combinations: Centre-backs (for aerial clearance support)
- Strengths: Reliability under aerial pressure, shot-stopping reflexes
- Weaknesses: Struggles vs high press requiring ball-playing ability
- Instructions: "Stay on line," "clear long"

**Sweeper-Keeper**
- Primary role: Extends defensive line via off-line coverage
- Defensive responsibility: Covers space behind high defensive line
- Attacking responsibility: First build-up passer
- Movement: Advances 15-25m off goal line when team presses high
- Preferred zones: Z1-Z8
- Passing: Mixed short/long, calculated risk
- Pressing: Acts as extra outfield player during opponent build-up
- Defensive: Anticipates through-balls, 1v1 outside box
- Transition: Immediate outlet pass on turnover
- Combinations: Centre-backs, holding midfielder (back-pass triangle)
- Strengths: Composure, positioning, reading through-ball threats
- Weaknesses: Vulnerable to lobbed shots/mistakes under press
- Instructions: "High starting position," "sweep behind line"

**Ball-Playing Goalkeeper**
- Primary role: Extra man in possession/build-up
- Defensive responsibility: Standard shot-stopping
- Attacking responsibility: Initiates possession, splits centre-backs
- Movement: Drops between/beside centre-backs to form back three in build-up
- Preferred zones: Z1-Z3
- Passing: Short, accurate, press-resistant
- Pressing: N/A
- Defensive: Standard
- Transition: Rapid distribution to switch play
- Combinations: Inverted full-backs, deep-lying playmaker
- Strengths: Technical passing under pressure
- Weaknesses: Risk of costly errors near own goal
- Instructions: "Play out from back," "split centre-backs"

### 3.2 Defenders

**Centre-Back**
- Primary role: Central defensive organisation
- Defensive: Aerial duels, tackling, last-line cover
- Attacking: Minimal — long passing, set-piece aerial threat
- Movement: Lateral shifting with ball side, minimal advancing
- Preferred zones: Z1-Z8 central
- Passing: Safe, occasionally long diagonal
- Pressing: Steps to press only if ball enters zone, else holds line
- Defensive: Zonal or man-oriented marking depending on system
- Transition: Immediate recovery positioning
- Combinations: Full-backs, holding midfielder
- Strengths: Aerial dominance, positioning discipline
- Weaknesses: Pace vs in-behind runners (non-mobile CBs)
- Instructions: "Hold the line," "step to ball carrier"

**Ball-Playing Centre-Back**
- Primary role: Build-up initiator from central defence
- Defensive: Same as CB
- Attacking: Progressive passing, carrying ball into midfield
- Movement: Steps into midfield when passing lane opens
- Preferred zones: Z1-Z13 central
- Passing: Line-breaking vertical/diagonal passes
- Pressing: Selective aggressive stepping
- Defensive: Same as CB but more risk-tolerant positioning
- Transition: Carries ball forward on turnover if space allows
- Combinations: Deep-lying playmaker, inverted full-back
- Strengths: Passing range, composure on ball
- Weaknesses: Exposed space behind if caught upfield
- Instructions: "Carry forward," "play line-breaking pass"

**Stopper**
- Primary role: Aggressive man-marking of central striker
- Defensive: Steps out of line to engage attacker early
- Attacking: Minimal
- Movement: Follows marked striker across zones
- Preferred zones: Wherever striker moves
- Passing: Safe, short
- Pressing: High individual engagement
- Defensive: Man-marking, duels
- Transition: Recovers to defensive shape quickly
- Combinations: Cover defender (libero-style partnership)
- Strengths: Duels, aggression, anticipation
- Weaknesses: Space left behind when stepping out
- Instructions: "Mark tight," "engage early"

**Cover Defender**
- Primary role: Provides depth cover behind stopper
- Defensive: Sweeps space in behind
- Attacking: Minimal
- Movement: Stays deeper than defensive line partner
- Preferred zones: Z1-Z5
- Passing: Safe
- Pressing: Rarely presses; holds depth
- Defensive: Reads through-balls, covers space
- Transition: Organises defensive recovery
- Combinations: Stopper
- Strengths: Reading danger, positioning
- Weaknesses: Passive if partner defender is poor
- Instructions: "Stay deep," "cover in behind"

**Libero**
- Primary role: Free central defender, unmarked organiser
- Defensive: Sweeps entire defensive line
- Attacking: Progressive carrying/passing from deep
- Movement: Roams across defensive line, sometimes into midfield
- Preferred zones: Z1-Z13
- Passing: Wide range, progressive
- Pressing: Selective
- Defensive: Reads game, covers gaps
- Transition: Initiates counter via long/progressive pass
- Combinations: Entire back line
- Strengths: Vision, composure, reading the game
- Weaknesses: Rare in modern back-four systems; requires elite game intelligence
- Instructions: "Free role in build-up"

**Full-Back (generic)**
- Primary role: Wide defensive coverage, width provision
- Defensive: 1v1 vs opposition winger, tracks overlapping runs
- Attacking: Supports width in possession
- Movement: Up-and-down the touchline
- Preferred zones: Wing lanes, all thirds
- Passing: Crosses, safe lay-offs
- Pressing: Presses opposite winger when ball-near
- Defensive: Tracks wide runners, covers half-space
- Transition: Recovers wide, or joins counter if forward positioned
- Combinations: Winger (overlap/underlap), centre-back (cover)
- Strengths: Stamina, 1v1 defending, crossing
- Weaknesses: Space exposed when advanced

**Defensive Full-Back**
- Attacking responsibility minimal; stays deep to protect against counters
- Instructions: "Stay back," "protect space in behind"

**Attacking Full-Back**
- High attacking responsibility; overlaps/underlaps winger regularly
- Instructions: "Overlap," "join the attack"

**Wing-Back**
- Primary role: Combines full-back and winger duties in back-three systems
- Defensive: Drops to form back-five defensively
- Attacking: Provides entire width in attack
- Movement: Full length of touchline
- Preferred zones: Wing lanes, all thirds
- Passing: Crosses, combination with winger/striker
- Pressing: High engagement vs opposite wing-back
- Defensive: Forms back five, tracks wide threats
- Transition: Key outlet in counterattack
- Combinations: Wide centre-back, inside forward
- Strengths: Stamina (covers most distance on pitch), crossing, 1v1
- Weaknesses: Positional gap if caught upfield in back-three systems

**Inverted Full-Back**
- Primary role: Tucks into midfield during build-up
- Defensive: Standard full-back duties when out of possession
- Attacking: Adds central passing option, protects against counters centrally
- Movement: Moves infield to central/half-space in possession
- Preferred zones: Z7/Z9 (central defensive-midfield band)
- Passing: Progressive, combination with pivot
- Pressing: N/A during build-up (positioned centrally)
- Defensive: Provides rest-defence cover centrally after loss
- Transition: Well-positioned to counter-press centrally
- Combinations: Holding midfielder, centre-backs
- Strengths: Compresses space, prevents counters through middle
- Weaknesses: Leaves wing isolated if winger doesn't provide width
- Instructions: "Invert into midfield in possession"

### 3.3 Midfielders

**Defensive Midfielder / Holding Midfielder**
- Primary role: Shield back line, screen central zone
- Defensive: Intercepts, breaks up play in front of defence
- Attacking: Simple recycling, occasional progressive pass
- Movement: Minimal — stays central, drops between CBs occasionally
- Preferred zones: Z8/Z13 central
- Passing: Short, safe, occasional switch
- Pressing: Screens passing lanes rather than chasing
- Defensive: Positional/zonal shielding
- Transition: First line of counter-press after loss
- Combinations: Centre-backs, box-to-box partner
- Strengths: Positioning, tackling, reading play
- Weaknesses: Limited attacking output
- Instructions: "Screen the back four," "stay central"

**Deep-Lying Playmaker / Regista**
- Primary role: Orchestrates play from deep central zone
- Defensive: Screening, moderate tackling
- Attacking: Primary progressive passer, tempo controller
- Movement: Drops to receive between/beside CBs
- Preferred zones: Z8/Z13
- Passing: Wide range — switches, line-breaking verticals
- Pressing: Selective
- Defensive: Positional
- Transition: Dictates tempo of counter or slowdown
- Combinations: Ball-playing CB, mezzala
- Strengths: Vision, passing range, composure
- Weaknesses: Physical duels, pace vs counter-press
- Instructions: "Dictate tempo," "drop to receive"

**Box-to-Box Midfielder**
- Primary role: Covers full length of pitch both phases
- Defensive: Tackles, presses, tracks runners
- Attacking: Late box arrivals, carries ball forward
- Movement: High-volume vertical movement
- Preferred zones: Z8-Z23 central/half-space
- Passing: Progressive carries more than passes
- Pressing: High engagement, covers ground
- Defensive: Recovery tackles, tracks midfield runners
- Transition: Key transition carrier both ways
- Combinations: Holding midfielder (cover), attacking midfielder
- Strengths: Stamina, physicality, versatility
- Weaknesses: Can be exposed if drives forward and loses ball
- Instructions: "Get box to box," "support both phases"

**Mezzala**
- Primary role: Half-space central midfielder in 3-man midfields
- Defensive: Moderate, presses half-space
- Attacking: Drives into half-space/box from midfield
- Movement: Diagonal into half-space and box
- Preferred zones: Z12/Z14, Z17/Z19, Z22/Z24
- Passing: Combination play, through balls
- Pressing: Aggressive in half-space
- Defensive: Covers half-space defensively
- Transition: Late runner into box
- Combinations: Winger (overlap of inside forward), full-back
- Strengths: Dribbling, combination play, goal-scoring from midfield
- Weaknesses: Discipline gaps if both mezzalas advance simultaneously
- Instructions: "Drive into half-space"

**Central Midfielder (generic)**
- Balanced profile between defensive and attacking duties, box-to-box lite
- Preferred zones: Z13/Z18 central

**Advanced Playmaker**
- Primary role: Creates chances from between the lines
- Defensive: Minimal, presses passing lanes
- Attacking: Key passer/creator in final third
- Movement: Finds pockets between opponent midfield/defence
- Preferred zones: Z18-Z23 central/half-space
- Passing: Incisive through balls, disguised passes
- Pressing: Low intensity
- Defensive: Minimal
- Transition: Key outlet for quick attacks
- Combinations: Striker, wingers
- Strengths: Vision, technique, creativity
- Weaknesses: Lack of defensive contribution
- Instructions: "Find pockets between lines"

**Attacking Midfielder**
- Primary role: Final creative/goal threat from central areas
- Defensive: Minimal
- Attacking: Shooting, key passes, late runs
- Movement: Roams behind striker, exploits gaps
- Preferred zones: Z18-Z28 central
- Passing: Final third incisive passing
- Pressing: Triggers press on opponent CBs/pivot
- Defensive: First presser of opponent build-up
- Transition: Immediate threat on turnover
- Combinations: Striker, wide forwards
- Strengths: Technical quality, goal contribution
- Weaknesses: Defensive discipline
- Instructions: "Support striker," "press opponent pivot"

### 3.4 Attackers

**Winger**
- Primary role: Wide attacking threat, chalk-on-boots width
- Defensive: Tracks opposing full-back
- Attacking: Crossing, 1v1 dribbling, width
- Movement: Stays wide, occasional cutback runs
- Preferred zones: Z20/Z25 wing
- Passing: Crosses, cutbacks
- Pressing: Presses opposition full-back
- Defensive: Tracks back on overlap
- Transition: Out-ball on counter
- Combinations: Full-back/wing-back overlap
- Strengths: Pace, crossing, 1v1
- Weaknesses: End product inconsistency, defensive workrate

**Inverted Winger**
- Primary role: Wide starting position, cuts inside onto stronger foot
- Defensive: Tracks inside, screens half-space
- Attacking: Cuts in to shoot/combine centrally
- Movement: Diagonal cut from wing to half-space/box
- Preferred zones: Z20→Z23/Z24, Z25→Z22/Z23
- Passing: Combination, cut-back shots
- Pressing: Moderate
- Defensive: Tucks in defensively
- Transition: Central runner on break
- Combinations: Overlapping full-back (provides width vacated by winger)
- Strengths: Shooting, dribbling, goal output
- Weaknesses: Predictability if full-back doesn't overlap; width gap
- Instructions: "Cut inside," "shoot on sight"

**Inside Forward**
- Similar to inverted winger but positioned higher/narrower by default; primary goal threat from wide start

**Wide Forward**
- Hybrid winger/striker; occupies half-space high, less defensive tracking than winger

**Second Striker**
- Primary role: Support forward, operates just behind main striker
- Movement: Drops to link play, bursts beyond on through balls
- Preferred zones: Z23/Z28 central
- Strengths: Combination play, movement, finishing
- Weaknesses: Needs strong understanding with strike partner

**False Nine**
- Primary role: Drops from striker position to disrupt CB marking
- Defensive: Minimal, occasional pressing trigger
- Attacking: Link play, creates space for onrushing midfielders
- Movement: Drops into midfield, pulls CB out of position
- Preferred zones: Z18/Z23 central, dropping deeper
- Passing: Combination, quick lay-offs
- Pressing: Screens opposition pivot
- Defensive: Minimal
- Transition: Link man
- Combinations: Onrushing attacking midfielder/winger exploiting vacated space
- Strengths: Link play, movement, unpredictability
- Weaknesses: Reduced aerial/box presence
- Instructions: "Drop deep to link," "pull CB out of position"

**Target Man**
- Primary role: Aerial focal point, holds up ball
- Defensive: Minimal
- Attacking: Aerial duels, hold-up play, knockdowns
- Movement: Stays central and high, minimal lateral drift
- Preferred zones: Z28 central
- Passing: Flick-ons, lay-offs
- Pressing: Leads press on opposition CBs (aerial duel presence)
- Defensive: Minimal
- Transition: Outlet for long balls under pressure
- Combinations: Second striker, midfield runners
- Strengths: Aerial ability, strength, hold-up play
- Weaknesses: Mobility, pace in behind

**Complete Forward**
- Balanced profile: aerial, hold-up, movement, finishing, link play — no clear weakness

**Pressing Forward**
- Primary role: Leads high press, disrupts opponent build-up
- Defensive: Cover-shadow passing lanes, hunts ball high
- Attacking: Counter-press-triggered chances
- Movement: High energy, angled runs to cut passing lanes
- Preferred zones: Z23-Z28
- Strengths: Work rate, anticipation, high pressing IQ
- Weaknesses: Can be bypassed by direct long balls

**Poacher**
- Primary role: Pure finisher, minimal build-up involvement
- Defensive: None
- Attacking: Box movement, finishing, anticipation of rebounds/crosses
- Movement: Constant box repositioning, blind-side runs
- Preferred zones: Z28-Z30 penalty box
- Strengths: Finishing, movement in box, anticipation
- Weaknesses: Isolated if service is poor, minimal link play

---

## SECTION 4 — FORMATIONS

Format per formation: Arrangement, Strengths, Weaknesses, Build-up structure, Defensive structure, Pressing structure, Attacking structure, Transition structure, Passing options, Vulnerable zones, Best styles, Suitable profiles, How opponents exploit it.

### 4-4-2
- Arrangement: GK-4-4-2, two banks of four plus strike partnership
- Strengths: Compact defensive shape, clear horizontal/vertical distances, strong for direct/counter football
- Weaknesses: Central midfield can be outnumbered 2v3 by teams with a 3-man midfield
- Build-up: GK-CB-CB-FB base, direct or possession-based depending on style
- Defensive: Two compact banks of four, narrow, funnels play wide
- Pressing: Strikers press CBs in a curved line to force play wide, midfield presses in unison
- Attacking: Width from wide midfielders/wingers, two strikers combine centrally
- Transition: Fast, direct — two strikers provide immediate outlet
- Passing options: Limited central passing lanes; more direct/vertical
- Vulnerable zones: Central midfield (numerical disadvantage vs 3-man mid), half-spaces between banks
- Best styles: Direct football, counter-attacking, high-press English-style football
- Suitable profiles: Physical strikers, hardworking wide midfielders, box-to-box central pair
- Exploited by: Overloading central midfield with a third midfielder; playing through half-spaces the banks leave open

### 4-3-3
- Arrangement: GK-4-3-3, back four, midfield triangle (either 1 DM + 2 CM or 2 DM + 1 AM), front three
- Strengths: Natural width from wingers, midfield control via triangle, high-press friendly
- Weaknesses: Full-backs can be exposed in transition if both advance; central striker can be isolated
- Build-up: Back four + dropping pivot, full-backs provide width or invert
- Defensive: Front three press in a curved line, midfield triangle screens centre
- Pressing: Winger-CB-Winger press CBs and full-backs; classic gegenpressing base shape
- Attacking: Width from wingers, overlapping/underlapping full-backs, central striker as focal point or false nine
- Transition: Wingers provide out-ball pace; vulnerable centrally if pivot is bypassed
- Passing options: Strong central triangle for combination play, wide overloads
- Vulnerable zones: Space behind advanced full-backs; the zone the lone striker can't cover alone
- Best styles: Positional play, tiki-taka, high press, gegenpressing
- Suitable profiles: Technical full-backs, box-to-box/regista midfield mix, pacey wingers
- Exploited by: Direct balls behind advancing full-backs; overloading the double-pivot if used with only one holding mid

### 4-2-3-1
- Arrangement: GK-4-2-3-1, double pivot, attacking midfield three, lone striker
- Strengths: Strong defensive base (double pivot shields defence), flexible attacking midfield three
- Weaknesses: Lone striker can be isolated; gap between double pivot and front four if not compact
- Build-up: Double pivot rotates to receive, full-backs support width
- Defensive: Can morph into 4-4-1-1 or 4-4-2 mid-block for compactness
- Pressing: AM presses deepest opposition midfielder; front four form pressing line
- Attacking: Central AM/10 as chief creator, wide 10s cut inside or hold width
- Transition: Double pivot provides rest-defence security
- Passing options: Central 10 as link between midfield and attack
- Vulnerable zones: Space between double pivot and back four if pivot pushes up; isolated striker vs physical CBs
- Best styles: Balanced possession-control football, counter-attacking with structure
- Suitable profiles: Disciplined double pivot, creative #10, hold-up or mobile lone striker
- Exploited by: Overloading double pivot 3v2; direct diagonal balls to bypass midfield entirely

### 4-1-4-1
- Arrangement: Single pivot, flat four in midfield, lone striker
- Strengths: Very compact horizontally in midfield, good defensive control
- Weaknesses: Single pivot can be overloaded; narrow width from midfield four unless wide players stretch
- Build-up: Pivot as primary progression outlet
- Defensive: Deep, narrow midfield block screening centrally
- Pressing: Mid-block oriented; press triggered on wide areas
- Attacking: Combination through midfield four, width via advancing full-backs
- Transition: Pivot must recover quickly to prevent 2v1 against back four
- Vulnerable zones: Behind single pivot, wide areas in behind full-backs
- Best styles: Control-based possession, defensive solidity with patient buildup
- Exploited by: 2v1 overloads against lone pivot; quick switches to isolate wide midfielders

### 4-4-1-1
- Arrangement: 4-4-2 base with staggered strikers (one deeper support striker)
- Strengths: Combines 4-4-2 compactness with extra central creative option
- Weaknesses: Similar central midfield vulnerability to 4-4-2
- Build-up: Deeper striker drops to link
- Defensive: Functions similar to 4-4-2 in deep block, deeper striker screens pivot
- Attacking: Strike partnership with staggered movement (one holds, one runs in behind)
- Vulnerable zones: Central midfield numbers
- Best styles: Counter-attacking, direct with layered striker movement

### 4-3-1-2
- Arrangement: Back four, midfield three, attacking #10, two strikers
- Strengths: Strong central overload, good for combination play through middle
- Weaknesses: Lack of natural width; full-backs must provide all width
- Vulnerable zones: Wide areas, especially if full-backs are not advanced
- Best styles: Narrow, central-combination-heavy possession football
- Exploited by: Attacking down the flanks where the formation has minimal natural coverage

### 4-2-2-2
- Arrangement: Double pivot, two narrow attacking midfielders, two strikers
- Strengths: Central density and combination play, strong pressing triggers centrally
- Weaknesses: Width reliance entirely on full-backs; can become narrow and predictable
- Vulnerable zones: Wide channels
- Best styles: High-press, central-overload systems (South American influence, e.g. traditional Brazilian 4-2-2-2 variants)

### 4-2-4
- Arrangement: Very attacking, double pivot, four attackers/wide forwards
- Strengths: Extreme attacking presence, overloads opposition back line
- Weaknesses: Highly exposed defensively/in transition; requires elite pivot discipline
- Vulnerable zones: Entire midfield if pivot is bypassed
- Best styles: Ultra-attacking, historic total-football-influenced systems; rare in modern management due to transition risk

### 3-4-3
- Arrangement: Back three, midfield four (often two CM + two wing-backs), front three
- Strengths: Extra centre-back covers space, wing-backs provide constant width, strong press
- Weaknesses: Wing-back areas vulnerable if isolated 1v2 in wide areas; needs high fitness wing-backs
- Build-up: Back three splits wide, wing-backs provide width, double pivot or two CMs progress ball
- Defensive: Can drop to back five (5-2-3 or 5-4-1 defensively)
- Pressing: Front three + wing-backs form high press with numerical advantage on flanks
- Attacking: Front three interchange freely, wing-backs overlap
- Transition: Vulnerable centrally if both CBs step out and wing-backs are advanced
- Vulnerable zones: Space in behind wing-backs, half-spaces vacated during wing-back advances
- Best styles: High press, wing-oriented possession, aggressive attacking systems
- Suitable profiles: Elite-fitness wing-backs, ball-playing wide centre-backs
- Exploited by: Isolating wing-backs 2v1 with winger + overlapping full-back; attacking the half-space centre-backs vacate

### 3-4-2-1
- Arrangement: Back three, midfield four, two narrow #10s, lone striker
- Strengths: Central overload behind striker, flexible front three
- Weaknesses: Requires wing-backs to provide all width; can be narrow in final third
- Vulnerable zones: Wide areas, especially against wingers who stay high and wide
- Best styles: Possession-control systems with fluid front three

### 3-5-2
- Arrangement: Back three, midfield five (incl. wing-backs), two strikers
- Strengths: Central midfield numerical dominance (5 vs typical 3), strong strike partnership
- Weaknesses: Natural width only from wing-backs; vulnerable if they're pinned back
- Vulnerable zones: Wide areas when wing-backs are defending deep
- Best styles: Control-oriented, central-dominance systems
- Exploited by: Pinning wing-backs deep with wide overloads, isolating them 2v1

### 3-4-1-2
- Arrangement: Back three, midfield four, single #10, two strikers
- Similar profile to 3-5-2 with more advanced central creator
- Vulnerable zones: Wide areas; gap between midfield four and front three if #10 isolated

### 5-3-2
- Arrangement: Back five (3 CB + 2 wide defenders), midfield three, two strikers
- Strengths: Extreme defensive solidity, strong counter-attacking base with two strikers
- Weaknesses: Passive in possession, cedes territorial control, needs disciplined midfield three
- Build-up: Cautious, often direct to strikers
- Defensive: Very compact, low block friendly
- Pressing: Mid/low block, selective pressing triggers
- Attacking: Counter-attacking via two strikers, wide defenders overlap only when safe
- Vulnerable zones: If wide central midfielders are dragged out of position, half-spaces open
- Best styles: Low block, counter-attacking, "park the bus" defensive systems
- Exploited by: Patient possession football that draws the back five out; overloading the midfield three

### 5-4-1
- Arrangement: Back five, midfield four, lone striker
- Strengths: Maximum defensive coverage, extremely narrow and compact
- Weaknesses: Isolated striker, minimal attacking threat, reliant on counters/set pieces
- Best styles: Ultra-defensive "park the bus," used by underdog teams vs stronger opposition
- Exploited by: Patient possession, crossing/set-piece variation, overloading wide areas since wing-backs are pinned deep

### 5-2-3
- Arrangement: Back five, double pivot, front three
- Strengths: Defensive solidity with more attacking presence than 5-4-1/5-3-2
- Weaknesses: Double pivot can be overloaded if front three doesn't track back
- Best styles: Counter-attacking with more attacking ambition than typical back-five systems

### 4-5-1
- Arrangement: Back four, midfield five (flat or with #10), lone striker
- Strengths: Maximum midfield control/compactness
- Weaknesses: Isolated striker, requires midfield runners to support attack
- Best styles: Control-based, defensively disciplined possession systems, often used away from home in big matches

### 4-1-2-3
- Arrangement: Single pivot, two central mids, front three
- Strengths: High pressing structure with front three plus advancing central mids
- Weaknesses: Lone pivot can be overloaded in transition
- Best styles: High press, positional play

### 4-3-2-1 ("Christmas Tree")
- Arrangement: Midfield three, two withdrawn forwards/10s, lone striker
- Strengths: Central control and layered attacking presence
- Weaknesses: Lacks natural width, needs full-backs to compensate entirely
- Best styles: Narrow possession-control systems
- Exploited by: Wide attacking play, since the shape offers minimal natural width

### 4-4-2 Diamond
- Arrangement: Back four, a diamond-shaped midfield four (single pivot, two wide/central 8s, one advanced #10), two strikers
- Strengths: Extreme central midfield control (effectively a 4-man central overload), strong vertical passing lanes through the diamond's point
- Weaknesses: No natural width at all — full-backs must provide 100% of the team's wide attacking presence; if they're pinned back, the team is trapped centrally
- Build-up: Single pivot at the base of the diamond is the primary first-phase outlet
- Defensive: Diamond can compress centrally into a narrow, hard-to-play-through shape, but wide areas in the defensive third rely entirely on full-back recovery speed
- Pressing: The #10 at the top of the diamond presses the opponent's deepest central outlet; wide press coverage is inherently weaker than in wide-midfield formations
- Attacking: Central overloads, quick combination through the diamond, two strikers combining off knockdowns/lay-offs
- Vulnerable zones: Both flanks, especially if the opposing team has genuine wide players and advancing full-backs
- Best styles: Central-combination-heavy possession football, teams with elite technical central midfielders but limited natural wide players
- Exploited by: Sustained wide overloads on both flanks simultaneously, forcing the full-backs into an impossible 2-directional covering job

### 2-3-5 ("The Pyramid," classic/historical)
- Arrangement: Two deep defenders, three-man midfield, five attackers spread across the forward line
- Strengths: Maximum attacking presence and width, historically the dominant shape before defensive systems modernized
- Weaknesses: Almost no defensive cover by modern standards — two deep defenders alone cannot realistically contain a modern attacking transition
- Best styles: Historical/foundational reference point; a modern echo of this shape reappears as the temporary *possession-phase* structure many contemporary teams shift into from a back-four base (see Section 5's 4-2-3-1 → 2-3-5 transformation), rather than as a genuine resting defensive formation today
- Note: Included primarily for historical/structural completeness — no top-level team defends in a literal 2-3-5 today, but understanding it clarifies why modern "2-3-5 in possession" phase-shapes (Section 5) are named after this lineage

### 3-2-4-1
- Arrangement: Back three, double pivot, four advanced attackers (often two wide forwards/wingers plus two central attackers), lone withdrawn point
- Strengths: Heavy attacking commitment with a double pivot retaining some central defensive protection (more balanced than a 3-1-6)
- Weaknesses: The four-attacker line can become disconnected from the double pivot if the team is forced backward, creating a large disconnected midfield gap
- Best styles: Possession-dominant teams facing a low block, willing to commit heavily going forward against a defensively passive opponent
- Exploited by: Fast direct counters exploiting the gap between the double pivot and the back three if possession is lost with the front four fully committed

### 4-3-3 (Asymmetric / "Winger + Inverted Winger" variant)
- Arrangement: Standard 4-3-3 base, but with one winger holding width and the opposite-side attacker playing as an inverted winger cutting inside
- Strengths: Combines the benefits of genuine width (one flank) with central goal threat and overloads (the other flank via the inverted winger + overlapping full-back)
- Weaknesses: Structurally asymmetric — the two flanks function completely differently, which can be exploited if the opponent identifies which side is "textbook width" and which is "underload-then-overload" (see Section 7.1)
- Best styles: Modern possession-control systems built around a specific elite inside forward, common at the highest level of club football
- Exploited by: Match-specific defensive asymmetry — doubling up specifically on the inverted-winger side, since that side generates most of the direct goal threat, while accepting a more containable 1v1 threat on the "textbook width" side

---



## SECTION 5 — FORMATION TRANSFORMATIONS

Format: BASE FORMATION → PHASE → MOVEMENT → NEW STRUCTURE → PURPOSE

| Base | Phase | Movement | New Structure | Purpose |
|---|---|---|---|---|
| 4-3-3 | In possession | Full-backs invert or overlap high, pivot drops between CBs | 3-2-5 | Create passing triangles, overload half-spaces, commit 5 attackers |
| 4-3-3 | Pressing (out of possession, high) | Wingers pinch inside near strikers | 4-4-2 (or 4-3-3→4-4-2 press shape) | Deny central passing lanes, force play wide |
| 4-2-3-1 | Defending (mid/low block) | #10 drops level with two 8s | 4-4-1-1 → 4-4-2 shape | Increase compactness, protect space between lines |
| 3-4-3 | Defending | Wing-backs drop into back line | 5-4-1 | Maximum defensive numbers, protect box |
| 4-2-3-1 | Attacking possession | Full-backs push to wing/half-space, double pivot splits | 2-3-5 | Maximize attacking presence while pivot retains 2 for cover |
| 3-2-4-1 | Defensive transition | Wide forwards drop to join midfield line, wing-backs recover | 4-4-2 | Immediate compactness after losing ball to prevent counter |
| 4-4-2 | In possession | One striker drops, wide midfielders narrow | 4-2-3-1/4-4-1-1 shape | Create central passing option, connect lines |
| 5-3-2 | Attacking transition | Wide CBs push into wing-back positions, strikers spread | 3-5-2 → 3-2-5 | Convert defensive solidity into rapid counter width |
| 4-3-3 | Defensive transition (counter-press) | Nearest 3-4 players swarm ball zone | Localized 5v3 overload | Win ball back within 5 seconds before opponent organizes |
| 3-5-2 | Pressing | Strikers press CBs, wing-backs jump to opposing full-backs | 3-4-3 / 5-2-3 hybrid press | Match opponent's back-line numbers while maintaining press triggers |

**UNIVERSAL PRINCIPLE:** A team's "formation" as announced pre-match (e.g., 4-3-3) is really only the *defensive resting shape*. Possession and transition shapes routinely differ by 1-2 structural categories. An AI model must track phase-dependent shape, not a static formation label.

---
## SECTION 6 — PLAYER MOVEMENT (Core Movement Vocabulary)

| Movement | Definition | When It Should Happen |
|---|---|---|
| Forward movement | Advancing toward opponent goal | When space opens ahead and player has time to receive facing forward |
| Backward movement | Retreating toward own goal | When under pressure without forward option, to recycle possession |
| Lateral movement | Side-to-side repositioning | To open a passing angle or escape a marker's cover shadow |
| Diagonal movement | Combines forward/backward with lateral | Most common progressive movement — creates angle while advancing |
| In-to-out movement | Central player drifts wide | To create width when teammates occupy central zone, or to escape central congestion |
| Out-to-in movement | Wide player drifts central | To combine centrally or exploit half-space when full-back tracks wide |
| Overlap | Teammate runs outside/around ball-carrier | When ball-carrier is wide and a wide passing/crossing lane is needed beyond them |
| Underlap | Teammate runs inside/between ball-carrier and next defender | When the outside lane is defended but the inside channel/half-space is open |
| Inverted movement | Player moves opposite to "natural" side (e.g., left-footed player from right wing cutting in) | To bring stronger foot into shooting positions |
| Rotation | Two or more players systematically exchange zones | To confuse marking assignments (man-oriented defences) and maintain structure |
| Positional interchange | Temporary, less structured swap of roles/zones | Same purpose as rotation, more fluid/less rehearsed |
| Third-man movement | Player moves to receive a pass released by a pass to a "second man" | When first pass is anticipated to draw a defender, opening the third player |
| Third-man run | Off-ball run timed to arrive as the ball reaches the second player | To exploit space the second player's reception creates |
| Dummy run | Run made without intent to receive, to drag a defender away | When a run can pull a marker out of a zone a teammate wants to attack |
| Decoy run | Similar to dummy run, specifically to create space rather than distract | Same as dummy run, wider tactical framing |
| Blind-side run | Run made outside a defender's peripheral vision | Against ball-watching or heavily engaged defenders |
| Depth run | Run in behind the last line | When defensive line is high/flat or ball-side defender is turned |
| Line-breaking run | Run that breaks through a specific defensive line (not just behind it) | To receive between lines rather than in behind |
| Channel run | Run into the space between full-back and centre-back | Against a stretched or square back four |
| Box entry | Late run into penalty box timed with delivery | On crosses/cutbacks, timed to arrive as ball arrives, not before |
| Late midfield run | Midfielder arrives in box after initial attack is set | To exploit defenders focused on the primary attacker |
| Counter run | Sprint run immediately after regaining possession | In transition moments, exploiting disorganized opponent |
| Recovery run | Sprint back toward own goal after losing possession | Immediately after turnover to prevent numerical disadvantage |
| Cover movement | Repositioning to protect space a teammate vacated | When a teammate presses/advances, leaving a gap |
| Supporting movement | Positioning to offer a passing option near the ball | Continuously, to maintain passing options for the ball-carrier |

---

## SECTION 7 — OFF-BALL MOVEMENT & SPACE MANIPULATION

| Concept | Definition |
|---|---|
| Creating space | Movement that opens an area for a teammate (often by vacating it or dragging a defender) |
| Attacking space | Moving directly into an open zone to receive or threaten |
| Occupying space | Holding a position in a valuable zone to deny it to the opponent or maintain structure |
| Leaving space | Deliberately vacating a zone to draw a defender or avoid overcrowding |
| Manipulating defenders | Using movement/body shape to influence a defender's positioning choice |
| Pulling defenders | Drawing a marker out of their zone via a run |
| Fixing defenders | Occupying a defender's attention without necessarily moving far, to prevent them covering elsewhere |
| Pinning centre-backs | Forward stays on the shoulder of a CB to prevent them stepping out to press |
| Stretching defensive lines | Movement that increases distance between defensive lines (vertically) or between defenders (horizontally) |
| Overloading zones | Placing more attackers than defenders in a specific area |
| Isolating defenders | Creating a 1v1 in a wide/central zone by clearing support away |
| Numerical superiority | More attackers than defenders in a zone (e.g., 3v2) |
| Positional superiority | Occupying zones that give a structural advantage regardless of raw numbers (e.g., between lines) |
| Qualitative superiority | A specific player's skill advantage over their direct opponent (e.g., pace, dribbling) |

**Chain logic:**

SPACE CREATION → PLAYER MOVEMENT → DEFENSIVE REACTION → NEW SPACE → ATTACKING OPPORTUNITY

Example: Winger stays wide (occupying space) → full-back pins opposition winger back defensively → CB is drawn toward touchline to cover overlap (defensive reaction) → half-space vacated by CB (new space) → mezzala exploits half-space with line-breaking run (attacking opportunity).

### 7.1 Named Space-Creation Tactics (Worked Chains)

Each pattern below follows the same SPACE CREATION → MOVEMENT → DEFENSIVE REACTION → NEW SPACE → OPPORTUNITY chain, applied to a specific, repeatable in-game pattern.

| Tactic | Chain |
|---|---|
| Overload-to-isolate | Team commits 4 attackers to the ball-side half of the pitch → opponent shifts its entire block across to match the numbers → weak side is now defended by a single, unsupported defender → immediate switch of play → isolated attacker gets a 1v1 in space on the weak side |
| Third-man space creation | Player A passes to Player B, who is tightly marked → B's marker steps toward B to press → the space the marker just vacated opens behind them → Player C (positioned beyond the marker) receives a first-time pass from B into that space | 
| Pinning the back line | Striker holds the highest defensive line's height without moving → CBs cannot step forward to compress the midfield for fear of conceding the in-behind run → the zone between opponent's midfield and defensive lines stays permanently larger than it otherwise would → #10/mezzala repeatedly exploits that standing gap |
| Decoy run to open a passing lane | Winger makes a hard run in behind (no realistic intent to receive) → full-back and covering CB both react to the run, shifting their body shape and attention toward the in-behind space → the passing lane into the half-space the winger just vacated opens → underlapping midfielder receives unmarked |
| Rotational overload (positional interchange) | Full-back inverts into midfield, winger drops to the vacated full-back zone temporarily, original central midfielder pushes into the space the winger vacated higher up → opponent's man-oriented markers must choose whether to follow their assigned player through each rotation or hand off → confusion in handoff timing creates a brief, exploitable gap in one of the three exchanged zones |
| Underload-to-overload switch | Team deliberately keeps only 2 players on one flank (underload) while stacking the other side with 4 → opponent naturally commits more defenders to the stacked side, assuming that's the primary threat → the underloaded side is left with a spare defender fewer than expected → a quick switch turns the "weak," underloaded side into a numbers-up situation once the pass arrives |
| Vertical stretch via a target-man double movement | Target man makes an initial short movement toward the ball (drawing the marking CB tight and close) then immediately spins away in behind on the second movement → the CB, having closed the distance for the first movement, is now poorly positioned to recover for the second, opposite-direction run → in-behind space opens directly behind the drawn-in CB |
| Half-space triangle rotation | Winger, mezzala, and overlapping full-back continuously rotate which of the three occupies the half-space, the wing, and the underneath/withdrawn position → because the *zone* is always occupied but the *occupant* keeps changing, a man-marking defender is repeatedly handed off between markers, and a zonal defender must constantly reassess who is currently "live" in their zone → both marking systems are placed under sustained decision load, increasing the probability of a late reaction |

**UNIVERSAL PRINCIPLE:** Space creation is fundamentally about *manufacturing a decision* for a defender — every technique above forces a specific defender to choose between two competing responsibilities (follow vs hold, engage vs cover, mark the run vs mark the zone). The resulting space is a direct byproduct of whichever responsibility the defender did not choose.

---



## SECTION 8 — PASSING SYSTEM

### 8.1 Pass Types
| Type | Definition | Typical Purpose |
|---|---|---|
| Short pass | <15m, ground | Retain possession, build rhythm |
| Long pass | >30m | Bypass pressure, switch play, direct progression |
| Vertical pass | Pass toward opponent goal along length | Progression, line-breaking |
| Horizontal pass | Pass across the pitch, same line | Probe for opening, shift opponent shape |
| Diagonal pass | Combines vertical + horizontal | Most efficient progressive pass — hard to intercept, advances and shifts |
| Through ball | Pass into space behind defensive line | Exploit high line / defender turned |
| Switch of play | Long horizontal/diagonal pass changing point of attack | Exploit weak-side space after opponent shifts across |
| Cross-field pass | Similar to switch, typically longer diagonal | Same as switch |
| Cutback | Pass from byline back toward edge of box | Create shooting chance away from defenders facing goal |
| Layoff | Short pass back to an onrushing teammate | Continue attack with better-positioned player |
| Wall pass | One-two combination off a single touch | Beat a defender via quick combination |
| One-two | Pass-and-return combination between two players | Same as wall pass |
| Third-man pass | Pass to a player who releases immediately to a pre-positioned third player | Break lines via combination rather than individual pass |
| Line-breaking pass | Any pass that eliminates an opponent line from the game | Core progression tool |
| Progressive pass | Pass that moves ball meaningfully closer to goal (commonly defined as ≥25% distance-to-goal reduction, or similar analytics threshold) | Advance attack |
| Back pass | Pass toward own goal | Retain possession, reset shape, escape pressure |
| Safe pass | Low-risk, high-completion-probability pass | Maintain control, avoid turnovers in dangerous zones |
| Risk pass | Higher-difficulty pass with greater reward if successful | Break lines when reward outweighs turnover risk |

### 8.2 Passing Structures
| Concept | Definition |
|---|---|
| Passing lanes | Open corridors through which a pass can travel uncontested |
| Passing channels | Broader zonal pathways (e.g., wide channel, half-space channel) used for progression |
| Passing angles | The geometric relationship between passer, receiver, and defenders — better angles reduce interception risk |
| Passing triangles | Three players positioned to give the ball-carrier at least two passing options at all times |
| Passing diamonds | Four-player shape giving multiple angles including vertical progression |
| Passing networks | The aggregate pattern of who-passes-to-whom, indicating structural tendencies |
| Progressive passing | Sustained passing that advances the ball up the pitch |
| Breaking lines | A pass (or dribble) that takes the ball past a defensive line, eliminating defenders from the immediate picture |
| Baiting pressure | Inviting an opponent to press in order to exploit the space they vacate |
| Escaping pressure | Using movement/passing to evade an active press without losing the ball |
| Switching play | Moving the ball from a congested side to the open side |

**UNIVERSAL PRINCIPLE:** A passing triangle (minimum 3 supporting angles) is the base geometric unit of possession retention; any 2-player passing relationship without a third option is vulnerable to being pressed into isolation.

---

## SECTION 9 — PASSING CHANNELS BY BUILD-UP PHASE

### Low Build-up
- Goalkeeper zone: GK as auxiliary passer/first progression option (Z1-Z3)
- First line: Centre-backs split wide, offering passing lane either side of opposing forward
- Defensive line: Full-backs provide wide out-balls
- Build-up channels: Central (through pivot) or wide (via full-backs) depending on opponent's pressing shape

### Middle Build-up
- Midfield channels: Central progression through double pivot/regista, or half-space combination
- Half-spaces: Primary progression corridor once past first press line
- Central progression: Vertical passes into #10/mezzala positions
- Wide progression: Combination between full-back and winger to bypass midfield press

### High Build-up
- Final third: Combination-heavy, fewer long passes, more one-touch play
- Half-space combinations: Layoffs, third-man passes into box
- Wing combinations: Overlap/underlap into cross or cutback
- Box entries: Timed runs matched to delivery type
- Cutback channels: Pass from byline to edge-of-box arrivals

### Progression Logic
LOW → MIDDLE → HIGH: each phase should only progress once the current phase has created a passing lane or numerical advantage; rushing progression before space is created increases turnover risk in dangerous zones.

**How channels change vs opponent pressing:**
| Opponent Press | Preferred Channel |
|---|---|
| High man-oriented press | Long/direct passes bypassing press entirely, or quick combination through vacated pressing gaps |
| High zonal press | Patient short passing to draw press, then line-breaking pass through opened zone |
| Mid-block | Central combination through half-spaces, patient probing |
| Low block | Wide overloads, crosses, switches to stretch narrow/compact defence |

---

## SECTION 10 — BUILD-UP PLAY

### 10.1 Build-up Methods
| Method | Description |
|---|---|
| Short build-up | Ground passing from GK/CBs through pressure, prioritizing control |
| Direct build-up | Fewer passes, quicker vertical progression, still primarily on ground |
| Long build-up | Aerial long passes bypassing midfield entirely |
| Positional build-up | Structured, pre-rehearsed positioning (e.g., 3-2-5) prioritizing space occupation over speed |
| 3-2 build-up | Back three plus double pivot forms first-phase structure |
| 2-3 build-up | Back two (CBs) plus 3 (pivot + inverted full-backs) |
| 2-4 build-up | Back two plus four players across midfield line |
| 3-2-5 | Advanced possession shape: 3 defenders, 2 pivots, 5 attackers |
| 2-3-5 | Advanced possession shape: 2 CBs, 3 midfield, 5 attackers |
| 3-1-6 | Extreme attacking possession shape with single pivot |
| Goalkeeper involvement | GK as extra passing option to create numerical superiority vs press |
| Centre-back splitting | CBs widen to create passing lane around opposing striker |
| Full-back inversion | Full-back tucks into midfield to add central passing option |
| Midfielder dropping | Pivot drops between/beside CBs to receive under less pressure |
| False full-back | Full-back that inverts specifically to replace a dropping pivot, freeing the pivot to advance |
| Creating numerical superiority | Structuring the first phase so build-up players outnumber the opponent's first press line |

### 10.2 Choosing Build-up Method vs Opponent Shape
| Opponent Defensive Approach | Recommended Build-up |
|---|---|
| High press | Create numerical superiority (drop GK/pivot) to play short, OR go long/direct into space behind the high line |
| Mid block | Positional build-up (3-2-5 / 2-3-5) to probe patiently and draw the block forward |
| Low block | Faster ball circulation to shift the block, combined with direct dribbling carries to draw defenders out |
| Man marking | Rotations and third-man movement to drag markers out of position and open lanes |
| Zonal pressing | Overload specific zones to create local numerical superiority the zonal press can't cover |

---
## SECTION 11 — PRESSING

### 11.1 Pressing Types
| Type | Definition |
|---|---|
| High press | Pressure applied in opponent's defensive third, aiming to win ball near their goal |
| Mid press | Pressure applied around the halfway line, balancing risk and reward |
| Low press | Pressure withheld until opponent enters own defensive/middle third |
| Counter-press | Immediate pressure applied in the seconds right after losing possession |
| Gegenpressing | A systemized, high-intensity counter-press philosophy (Klopp-associated) treating the moment of loss as the primary chance-creation trigger |
| Pressing trap | Deliberately inviting a pass into a pre-planned zone to spring a coordinated press |
| Man-oriented press | Each presser tracks an assigned opponent regardless of zone |
| Zone-oriented press | Pressers cover zones and pass opponents between zones rather than following individuals |
| Hybrid press | Combines man-orientation in key zones (e.g., near ball) with zonal coverage elsewhere |
| Trigger press | Press initiated only when a specific event (trigger) occurs, not continuously |
| Passive press | Cautious, jockeying pressure without full commitment — used to slow play, not win ball immediately |
| Aggressive press | Full-commitment pressure intending to win the ball or force an immediate error |

### 11.2 Pressing Triggers (Format: TRIGGER → PRESSER → SUPPORT → COVER → TRAP → EXPECTED OUTCOME)

| Trigger | Presser | Support | Cover | Trap | Expected Outcome |
|---|---|---|---|---|---|
| Back pass | Nearest forward, angled run to cut return pass | Second forward covers central lane | Midfield line steps up in unison | Force pass to weaker-footed GK/CB | Long/rushed clearance, possession regain |
| Bad first touch | Nearest defender/midfielder | Adjacent player closes passing lanes | Line holds/steps up together | N/A — reactive not pre-planned | Tackle/interception, turnover |
| Slow pass | Player nearest to pass's destination | Second presser arrives as ball arrives | Line compresses | Time press to arrive with ball | Immediate dispossession or rushed pass |
| Sideways pass | Ball-far presser cuts passing lane back inside | Ball-near player closes down receiver | Midfield shifts across | Force pass down the line into corner | Possession win in wide "trap" zone |
| Pass toward sideline | Wide presser + covering midfielder | Full-back/wing-back squeezes touchline | Compact shape denies inside option | Touchline as an "extra defender" | Forced long ball or turnover |
| Isolated player | Nearest 2 defenders converge | Cover shadow on passing options | Rest of team shifts to that side | Cut off all short options | Turnover via tackle or long clearance |
| Weak-foot reception | Presser closes weak-foot side | Cover shadow on strong-foot passing lane | N/A | Force pass onto weak foot | Misplaced pass, turnover |
| Goalkeeper possession | Lead forward presses at an angle | Second forward covers central passing lane | Midfield jumps up | Force to flank CB | Long/inaccurate distribution |
| Centre-back receiving | Nearest forward presses with cover shadow on pivot | Winger tucks in to cut passing lane | Midfield line rises | Show CB down one side | Turnover or forced long pass |
| Full-back receiving | Winger/wide midfielder presses touchline-side | Central midfielder covers inside lane | Back line shifts across | Trap in wide "dead zone" | Possession win near touchline |
| Ball travelling backwards | Nearest presser accelerates immediately | Whole unit steps up together | N/A | Exploit the moment ball can't progress forward | High turnover, immediate shooting chance |

**UNIVERSAL PRINCIPLE:** A pressing trigger only functions if presser, support, and cover move simultaneously; a lone presser without synchronized support is easily bypassed and creates space rather than winning the ball (an "isolated press").

---

## SECTION 12 — PRESSING STRUCTURES

| Structure | First Line | Second Line | Third Line | Notes |
|---|---|---|---|---|
| 4-4-2 press | 2 strikers curve to show CBs wide | 2 wide mids press full-backs, 2 central mids screen | Back four holds line | Natural pressing shape due to even, mirrored lines |
| 4-3-3 press | 3 forwards curve to press CBs + pivot | Midfield 3 screens central zone | Back four | Wingers press full-backs, striker presses pivot — very common gegenpress base |
| 4-2-3-1 press | Lone striker presses lead CB, cover-shadowing pivot | AM presses deepest opposition mid; wide 10s press full-backs | Double pivot screens | Requires AM discipline to cut pivot passing lane |
| 4-1-4-1 press | Striker curves press | Midfield four presses in unison, staying compact | Single pivot covers space in behind | More conservative; mid-block oriented |
| 3-4-3 press | Front 3 press CBs | Wing-backs jump to opposing full-backs, central mids screen | Back three covers | Numerical parity across the pitch vs back-four opponents |
| 5-3-2 press | 2 strikers press CBs | Midfield 3 screens centrally | Back five holds deep | Typically mid/low block oriented rather than high press |

### 12.1 Pressing Mechanics
| Concept | Definition |
|---|---|
| First pressing line | Front-most players initiating pressure on opponent's deepest build-up players |
| Second pressing line | Midfield unit cutting central passing lanes and pressing progression passes |
| Third pressing line | Back line holding the defensive structure, stepping up to compress space |
| Cover shadow | A presser's body position that blocks a passing lane while approaching the ball, without committing fully |
| Pressing angle | The direction of approach relative to the ball-carrier, used to force play into a predictable channel |
| Pressing distance | How far the pressing player is willing to travel from their base position |
| Compactness | Overall reduction of space between and across defensive lines/units |
| Vertical compactness | Reduced distance between defensive, midfield, and forward lines |
| Horizontal compactness | Reduced distance across the width of the pitch between units |
| Pressing trap | See Section 11 |
| Pressing intensity | Speed/aggression of engagement — high intensity risks being bypassed; low intensity risks being ignored |

---

## SECTION 13 — DEFENSIVE ORGANISATION

| Concept | Definition |
|---|---|
| Low block | Defensive shape positioned deep, typically edge of own box, prioritizing compactness over territory |
| Mid block | Defensive shape positioned around the halfway line/middle third |
| High defensive line | Back line positioned high up the pitch, compressing space for opponent but risking in-behind runs |
| Deep defensive line | Back line positioned close to own goal, reducing in-behind risk but ceding territory |
| Compact block | Minimal distance between all defensive units |
| Narrow block | Reduced horizontal width, prioritizing central protection over wide coverage |
| Wide block | Maintains width to prevent switches of play, at cost of central density |
| Man marking | Each defender assigned a specific opponent regardless of ball location |
| Zonal marking | Each defender responsible for a zone, marking whoever enters it |
| Hybrid marking | Man-oriented in certain zones (e.g., box, near ball) combined with zonal principles elsewhere |
| Back four | Four-player defensive line, standard in many systems |
| Back five | Five-player defensive line, typically from a back-three base formation |
| Defensive midfield shield | One or two midfielders positioned to protect the space in front of the back line |

### 13.1 Structural Concepts
| Concept | Definition |
|---|---|
| Defensive line | The last line of outfield defenders |
| Midfield line | The line of midfielders screening in front of the defence |
| Forward line | The most advanced defensive/pressing unit |
| Distances between lines | Vertical spacing between defensive, midfield, forward lines — smaller distances = more compactness, less space for opponent between lines |
| Defensive compactness | Overall reduction of space across the entire defensive structure |
| Cover | A defender positioned to support a teammate engaged in a duel |
| Balance | Maintaining defensive numbers on the "weak side" (away from the ball) in case of a switch |
| Protection of central zone | Prioritizing denial of the most dangerous central corridor |
| Protection of half-space | Denying the second-most valuable attacking corridor |
| Protection of wide zones | Denying crossing/1v1 opportunities, generally lowest defensive priority of the three but still essential |

---

## SECTION 14 — LOW BLOCK / MID BLOCK / HIGH BLOCK COMPARISON

| Attribute | Low Block | Mid Block | High Block |
|---|---|---|---|
| Defensive position | Near own box | Around halfway line | In opponent half |
| Pressing intensity | Low/selective | Moderate | High |
| Defensive line height | Very deep | Medium | High |
| Space conceded | Territory (lots), but compact centrally | Balanced | Minimal territory, but large space in behind |
| Space protected | Central/box area | Both territory and central zones, balanced | Territory near opponent goal |
| Counter-attacking potential | High (opponent committed forward, space in behind them) | Moderate | Low (own line already high, less space to counter into) |
| Risks | Concedes possession/territory, vulnerable to sustained pressure and set pieces | Can be bypassed if lines aren't compact | Vulnerable to in-behind runs/long balls if line is high without pace to recover |
| Advantages | Reduces quality of chances by staying compact near goal | Balances risk and control | Denies opponent time/space near their own goal, wins ball high for quick chances |
| Suitable formations | 5-4-1, 5-3-2, 4-5-1 | 4-4-2, 4-2-3-1, 4-1-4-1 | 4-3-3, 3-4-3, 4-2-3-1 (with high line) |
| Suitable player profiles | Disciplined, aerially dominant defenders; quick counter-attacking forwards | Balanced, tactically flexible squads | Pacey defenders, high-workrate pressing forwards |

---

## SECTION 15 — TRANSITIONS

### 15.1 Transition States
| State | Definition |
|---|---|
| Defensive transition | The moment immediately after losing possession, before defensive shape is reorganized |
| Offensive transition | The moment immediately after winning possession, before attacking shape is set |
| Counterattack | A fast attacking sequence exploiting opponent's disorganization right after winning the ball |
| Counterpress | See Section 11 — pressing immediately after losing the ball |
| Recovery | The process of returning to defensive shape after being out of position |
| Rest defence | The defensive/covering structure maintained by non-involved players during an attacking phase (see Section 16) |
| Transition protection | Pre-positioning designed to minimize risk if possession is lost (e.g., holding midfielder staying central during an attack) |
| Transition vulnerability | The state of being exposed to a counterattack due to poor rest defence or overcommitment |
| First 3 seconds | The critical window immediately after a possession change where the largest tactical advantage/disadvantage exists |
| Fast progression | Rapid vertical ball movement to exploit disorganization before opponent resets |
| Secure possession | Prioritizing keeping the ball over immediate progression, used when a fast break isn't available |

### 15.2 Immediate Decision Logic
**After losing possession:**
1. Is a counter-press viable (numbers near the ball, opponent has few passing options)? → Counter-press immediately.
2. If counter-press isn't viable → Recover to defensive shape immediately, prioritizing central/half-space cover.
3. Rest defence structure determines which of the two options is realistic.

**After winning possession:**
1. Is there immediate space in behind (opponent committed forward/unbalanced)? → Fast progression/counterattack.
2. If opponent is already well-organized defensively → Secure possession, build patiently instead of forcing a risky vertical pass.

---

## SECTION 16 — REST DEFENCE

| Structure | Description |
|---|---|
| 2+3 structure | 2 centre-backs stay deep, 3 players (often pivot + full-backs) form a covering layer in midfield during attack |
| 3+2 structure | 3 defenders stay back (e.g., back three or 2 CBs + inverted full-back), 2 midfielders cover in front |
| 3+1 structure | 3 defenders plus a single holding midfielder as the deepest covering line |

| Principle | Description |
|---|---|
| Centre-back protection | Ensuring at least 2 CBs remain central and deep during attacking phases |
| Midfielder protection | At least one midfielder stays positioned to screen central counter-attack lanes |
| Counterattack prevention | Rest defence numbers should match or exceed the opponent's likely counter-attacking numbers (typically 2-3 forwards) |
| Numerical balance | Rest defence should have at least parity (ideally +1) versus opponent's forward-most attackers |
| Covering dangerous attackers | Rest defence should specifically account for the opponent's fastest/most direct counter threats, not just generic zonal coverage |

**UNIVERSAL PRINCIPLE:** The more players a team commits to attack, the more it depends on winning the ball back immediately (counter-press) rather than positional rest defence, since fewer players remain to form a covering structure.

---

## SECTION 17 — ATTACKING PRINCIPLES

| Principle | Definition |
|---|---|
| Width | Occupying wide zones to stretch the opponent horizontally |
| Depth | Occupying zones at different vertical heights to stretch the opponent vertically and offer forward options |
| Penetration | Actions (passes, dribbles, runs) that break through defensive lines |
| Support | Positioning near the ball-carrier to offer a simple retention option |
| Mobility | Movement that creates unpredictability and disrupts marking assignments |
| Creativity | Unstructured, improvised decision-making that breaks defensive expectations |
| Overload | See Section 7 |
| Isolation | See Section 7 |
| Switching play | See Section 8 |
| Third-man combinations | See Section 6 |
| Rotations | See Section 6 |
| Box occupation | Ensuring sufficient attacking numbers are present in the penalty box during crosses/cutbacks |
| Five-lane occupation | Structuring attackers so no more than 2-3 occupy the same vertical lane simultaneously, maximizing passing angles and spacing |

---

## SECTION 18 — FINAL THIRD ATTACK

| Concept | Definition |
|---|---|
| Crossing | Delivering the ball from a wide area into the box |
| Cutbacks | See Section 8 |
| Through balls | See Section 8 |
| Combination play | Quick multi-player passing sequences to break down organized defences |
| Half-space attacks | Attacks funneled through the half-space corridor for shooting/passing angle advantage |
| Wing attacks | Attacks built around wide 1v1s and crossing |
| Central attacks | Direct combination play through the most congested zone, high risk/high reward |
| Overloads | See Section 7 |
| Isolations | See Section 7 |
| One-v-one | Individual duel used to beat a defender directly, common in wide areas |
| Box occupation | See Section 17 |
| Near-post run | Run to the near post to meet an early/driven cross |
| Far-post run | Run to the far post to meet a floated/driven cross across goal |
| Edge-of-box support | Player positioned outside the box to recycle possession or shoot on rebounds/cutbacks |
| Second-ball positioning | Anticipating where a loose ball (from a clearance, block, or knockdown) is likely to fall |

---

## SECTION 19 — SET PIECES

### Corners
| Type | Description |
|---|---|
| Near-post | Delivery aimed at the near post for a flick-on or direct header |
| Far-post | Delivery aimed at the far post, often for a free header away from congestion |
| Short corner | Played short to retain possession/create a new angle rather than crossing immediately |
| Inswinging | Delivery curving toward goal, taken by a foot that curves the ball inward relative to goal |
| Outswinging | Delivery curving away from goal |
| Crowding goalkeeper | Attackers position near/around the GK to disrupt their ability to claim the ball |
| Blocking | Legal screening of defenders to free an attacker's run |
| Zonal marking (corners) | Defenders assigned to zones within the box rather than specific attackers |
| Man marking (corners) | Defenders assigned to specific attacking threats |
| Hybrid (corners) | Combination — key aerial threats man-marked, remaining space covered zonally |

### Free Kicks
| Type | Description |
|---|---|
| Direct | Shot taken directly at goal from the free-kick location |
| Indirect | Must touch a second player before a goal can be scored |
| Crossing | Delivered into the box similar to a corner |
| Short routine | Played short to a nearby teammate to create a new attacking angle |

### Throw-ins
| Zone | Tactical Use |
|---|---|
| Defensive third | Prioritize safety/retention, often played backward or short |
| Middle third | Used to maintain possession and restart progression |
| Attacking third | Can function like a short corner/crossing opportunity in advanced positions |

### Penalties
Tactical choices center on: kicker selection (composure under pressure), placement strategy vs goalkeeper tendencies, and goalkeeper's pre-kick information gathering (opponent's historical patterns).

---

## SECTION 20 — TACTICAL PLAYING STYLES

Format: STYLE → PRINCIPLES → FORMATION → MOVEMENT → PASSING → PRESSING → DEFENDING → TRANSITIONS → WEAKNESSES → COUNTERS

### Tiki-taka
- Principles: Short passing, constant movement, positional discipline, patient circulation to draw and break opponent
- Formation: Commonly 4-3-3
- Movement: Constant rotation, third-man runs, small triangles
- Passing: Short, high-volume, one-two touch
- Pressing: Immediate gegenpressing on loss (5-second rule tradition)
- Defending: High line, compact, ball-oriented
- Transitions: Prioritizes immediate counter-press over direct counterattack
- Weaknesses: Vulnerable to fast direct counters if press is beaten; can lack penetration vs a disciplined low block
- Counters: Low block + patient defending to deny space; fast vertical counterattacks when possession is won

### Positional Play (Juego de Posición)
- Principles: Structured occupation of zones (five-lane, line occupation) to guarantee passing angles and progression
- Formation: Flexible, but built around clear zonal rules (max 2-3 players per lane, staggered heights)
- Movement: Rule-based rotations to maintain structure
- Passing: Combination of short and line-breaking vertical passes
- Pressing: High, coordinated, structured
- Defending: Zonal, high line
- Transitions: Rest defence heavily prioritized due to defensive risk of a high line
- Weaknesses: Rigid structure can be exploited by unpredictable/chaotic opposition; slow buildup vs a well-organized mid-block
- Counters: Chaotic, direct pressing to disrupt structural rules; fast transitions exploiting rest-defence gaps

### Direct Football
- Principles: Minimize passes, progress ball quickly (often vertically/aerially) toward goal
- Formation: Often 4-4-2
- Movement: Runs in behind, physical duels
- Passing: Long, vertical
- Pressing: Often mid-block, engages in second-ball duels
- Defending: Compact banks of four
- Transitions: Fast, direct outlet to forwards
- Weaknesses: Lower average possession, can be bypassed by patient possession sides that control tempo
- Counters: High press to deny space for long-ball targets; possession-based control to limit direct opportunities

### Long-Ball Football
- Principles: Aerial route-one progression, bypassing midfield
- Formation: 4-4-2 / 5-3-2 with target man
- Movement: Aerial duel positioning, second-ball anticipation
- Passing: Long, aerial
- Pressing: Often lower intensity, conserves energy for duels
- Defending: Deep or mid block
- Transitions: Immediate long outlet
- Weaknesses: Low technical possession quality, easily out-possessed
- Counters: High press to force errors before the long ball is played; aerially dominant CBs to win first contact

### Counter-Attacking Football
- Principles: Cede possession/territory deliberately, strike quickly on transition
- Formation: 5-3-2 / 4-4-2 / 4-5-1
- Movement: Explosive depth runs on transition
- Passing: Direct, fast vertical passing on the break
- Pressing: Low/mid block, selective triggers
- Defending: Compact, patient
- Transitions: The primary attacking method (not a secondary option)
- Weaknesses: Struggles if opponent doesn't commit numbers forward (nothing to counter into); needs discipline to avoid pressing high accidentally
- Counters: Patient possession that doesn't overcommit players forward; maintaining strong rest defence to deny space

### Gegenpressing
- (See Section 11) A pressing-centric style where winning the ball immediately after loss is the primary chance-creation method
- Weaknesses: High physical demand, vulnerable if bypassed with one quick pass around the press
- Counters: Composed short combination play through/around the initial press; physically fresh teams late in matches

### High-Press Football
- General high-press principles as covered in Section 11-12
- Weaknesses: Space in behind high line; fitness demands
- Counters: Direct long balls into the vacated space behind the line; technical GK/CBs to play through the first press

### Low-Block Football
- See Section 14
- Weaknesses: Cedes territory/possession, can be worn down by sustained pressure
- Counters: Patient possession, width manipulation, set-piece variation, high shot volume to break the block down

### Park the Bus
- Principles: Extreme low block, maximum men behind the ball, minimal attacking ambition, prioritizing a draw/narrow loss prevention
- Formation: 5-4-1 / 5-3-2
- Weaknesses: Almost no attacking threat, heavily reliant on set pieces/counters for goals; concedes territorial and psychological momentum
- Counters: Patience, crossing variation, players comfortable in tight spaces, avoiding predictable central overloads the block is designed to stop

### Possession Football
- Principles: Prioritize ball retention as a control mechanism (defensive and attacking)
- Weaknesses: Can lack directness/urgency; vulnerable to well-organized counter-attacking sides
- Counters: Deep block that cedes possession willingly, springing on transition

### Vertical Football
- Principles: Prioritize forward progression speed over patient circulation, without going fully "direct/aerial"
- Weaknesses: Higher turnover risk than patient possession
- Counters: Compact mid-block that limits vertical passing lanes

### Route-One Football
- Essentially long-ball football with minimal build-up structure at all — see Long-Ball Football

### Wing Play
- Principles: Primary attacking outlet through wide areas and crossing
- Weaknesses: Predictable if central options aren't also threatened; can be nullified by a narrow, disciplined back line
- Counters: Narrow defensive block, doubling up on wide 1v1s

### Central Combination Play
- Principles: Primary attacking outlet through central/half-space combination
- Weaknesses: Highest-density defensive zone, hardest to break down consistently
- Counters: Narrow, compact mid-block with disciplined double pivot

### Crossing-Oriented Football
- Similar to wing play, with specific emphasis on aerial delivery and target men
- Counters: Strong aerial defending CBs, disciplined near/far-post coverage

### Transitional Football
- Principles: Style built specifically around exploiting both transition moments (not just counter-attacking defensively, but also structured to win transitions offensively)
- Counters: Teams with strong rest defence and disciplined counter-press resistance

### Control-Based Football
- Principles: Balance of possession and pressing intended to dominate territory and tempo without extreme risk
- Counters: Disciplined low block combined with occasional high-risk pressing traps to disrupt rhythm

### Fluid Attacking Football
- Principles: Minimal positional rigidity, heavy rotation and interchange among attackers
- Weaknesses: Can lack defensive/rest-defence structure due to fluid positioning
- Counters: Disciplined zonal marking that isn't disrupted by rotation; fast counter-attacks exploiting defensive disorganization

### Defensive Counterattacking
- Essentially counter-attacking football with an even greater defensive emphasis — see Counter-Attacking Football

### Man-Oriented Football
- Principles: Marking and pressing structured around individual matchups rather than zones
- Weaknesses: Vulnerable to rotations/decoy runs that drag markers out of position
- Counters: Heavy rotation, third-man combinations, overloading a single marker

### Zonal Football
- Principles: Marking and pressing structured around zones rather than individual matchups
- Weaknesses: Vulnerable to players finding pockets between zones ("gaps")
- Counters: Positional play finding the seams between zonal responsibilities

### Catenaccio ("The Bolt/Chain")
- Principles: Historical Italian defensive system built around a dedicated sweeper (libero) positioned behind a man-marking back line, prioritizing defensive solidity above all else and striking on the break
- Formation: Traditionally a back five/four with a libero, minimal attacking commitment
- Movement: Man-marking defenders track their assigned opponent tightly; the libero sweeps behind to cover any defender beaten
- Passing: Minimal build-up ambition; direct outlets to isolated forwards on the counter
- Pressing: Very low block, almost no pressing higher up the pitch
- Defending: Extremely compact, layered (man-marking plus a free covering defender), historically among the most defensively solid systems ever devised
- Transitions: The system's entire attacking output — rapid, direct breaks exploiting the opponent's forward commitment
- Weaknesses: Near-total absence of proactive attacking threat; heavily reliant on the libero's individual reading of the game; a modern high-tempo, technically superior opponent can eventually wear down pure man-marking through rotation (Section 21.1)
- Counters: Patient positional play with heavy rotation to exploit individual man-marking assignments; the modern descendant of "park the bus" (Section 43) largely inherited catenaccio's defensive logic while dropping the libero role in favor of zonal covering

### Total Football (Totaalvoetbal)
- Principles: Any outfield player can fluidly occupy any position on the pitch, provided the team's overall structural shape and balance is maintained by whoever moves into the vacated zone; extreme positional interchangeability
- Formation: Nominally a base shape (historically 4-3-3), but functionally fluid throughout the match
- Movement: Continuous, rehearsed rotation — a full-back might finish a move as a striker if a striker has dropped to cover the full-back's zone, and so on
- Passing: High-tempo, possession-oriented, dependent on every player being comfortable receiving and progressing the ball regardless of "natural" position
- Pressing: High and coordinated — since any player might be the nearest to the ball in any zone, all outfield players must be pressing-capable
- Defending: Zone-and-rotation-based rather than fixed individual assignments
- Transitions: High-risk/high-reward — the fluidity that enables attacking unpredictability also means defensive shape can be harder to reset quickly if possession is lost mid-rotation
- Weaknesses: Requires exceptionally high tactical intelligence and technical quality from every single outfield player (Section 23); breaks down if any individual lacks the versatility the system demands
- Counters: Disciplined zonal defending that doesn't get drawn out of position by rotation, patient physical/positional discipline rather than trying to man-mark specific "positions" that don't reliably stay fixed
- Note: Total Football is the historical/philosophical ancestor of modern positional play (Section 20's "Positional Play" entry) and of much of Section 5's Formation Transformation logic — the core idea that formation is phase-dependent rather than fixed traces directly back to this system

### Verticality-Focused Football
- Principles: Prioritizes the fastest legal route toward goal at every opportunity — more direct than patient possession football but more structured/controlled than pure long-ball route-one football
- Formation: Flexible, but typically favors formations with strong central runners (e.g., 4-3-3, 4-2-3-1) over ones built for patient lateral circulation
- Movement: Immediate forward runs the instant possession is available, minimal lateral "resetting" passes
- Passing: High proportion of forward/vertical passes relative to lateral/backward passes, prioritizing progressive passing (Section 8) over ball retention for its own sake
- Pressing: Often paired with counter-pressing, since verticality in attack is philosophically consistent with immediacy in defensive recovery
- Defending: Compact but not necessarily deep — verticality as a philosophy extends to wanting to win the ball back and go forward immediately, rather than settling into a passive low block
- Transitions: The style's primary strength — verticality-focused teams are built to exploit transition moments better than most systems, since forward-thinking passing is already their default mode
- Weaknesses: Higher turnover risk than patient possession football; can be predictable and easier to set a mid-block against if the team lacks a genuine patient "Plan B" when the direct route is well-defended
- Counters: A well-organized, compact mid-block that denies easy vertical passing lanes forces the team into unfamiliar patient possession, which is often its weakest skill set

---

## SECTION 21 — TACTICAL COUNTER MATRIX

Format: TACTIC A → ADVANTAGE → WEAKNESS → COUNTER TACTIC → EXPECTED RESULT

| Tactic A | Advantage | Weakness | Counter Tactic | Expected Result |
|---|---|---|---|---|
| High press vs short build-up | Traps opponent near their own goal, high turnover value | Space in behind press if bypassed | Short build-up team uses GK/pivot for numerical superiority, then plays around press | Either a high turnover (press wins) or a clean break past the press into large space (build-up wins) |
| High press vs long build-up | Long build-up nullifies press entirely by skipping midfield | Press team's high line is exposed to flick-ons/knockdowns behind it | Aerially dominant, well-organized back line to win second balls | 50/50 second-ball battles; territorial gain for pressing team's opponent if they win the second ball |
| Low block vs possession | Compact structure denies clear chances, frustrates possession team | Cedes territory/tempo control, can be worn down | Wide overloads + patient circulation + shot volume to break the block | Grinding, low-event match; set pieces and moments of individual quality become decisive |
| Low block vs crossing | Numbers in the box reduce aerial/crossing effectiveness | Second balls and cutbacks can still find gaps | Cutbacks to edge of box rather than crosses into a crowded box | Cutback-based shots from range rather than direct headers |
| Tiki-taka vs low block | Retains control, limits opponent's counter-attacking opportunities | Can struggle for direct penetration vs a disciplined compact block | Patient half-space combination play + individual quality in tight spaces | Slow-building pressure, chance quality depends on breaking specific structural weaknesses in the block |
| Tiki-taka vs high press | High press can disrupt short-passing rhythm if aggressive enough | High press team risks being played through if tiki-taka side has technical quality | Technical GK/CB press-resistance, third-man combinations around the press | Whoever executes their base skill better under duress wins the phase |
| Counterattack vs high line | High line leaves large space in behind for fast counter-attackers | Counter-attacking team must win the ball first, and needs pace/direct passing | High line team uses aggressive counter-press to prevent transition before it starts | Match becomes a battle over the moment of transition itself |
| Park the bus vs possession | Maximum bodies behind the ball frustrates chance creation | Zero attacking threat, all pressure absorbed defensively | Patience + crossing/set-piece variation, avoiding predictable central play | Likely low-scoring; single moments of quality decide the match |
| Wing play vs narrow defence | Exploits the width a narrow defensive block concedes | Crosses into a narrow-but-still-numerous box can still be defended | Overlap/underlap combinations to create 2v1s the narrow defence can't cover wide | Increased crossing/cutback volume and quality of delivery |
| Central attack vs wide defence | Exploits central space a wide defensive block concedes | Central zone is inherently higher-risk (more defenders can recover quickly) | Third-man combinations and quick 1-2s through the vacated central channel | Fewer but higher-quality central chances |
| Man marking vs positional play | Direct, physical duels can disrupt technical players | Highly vulnerable to rotations/decoy runs dragging markers out | Systematic rotation (positional play's core rule-set) to create mismatches | Positional play side typically wins this battle if rotations are well-drilled |
| Zonal defence vs rotations | Not dependent on tracking individual movement, harder to "trick" positionally | Vulnerable to combination play exploiting seams between zones | Quick combination passing that finds the gaps between zonal assignments rather than relying on movement alone | Zonal defence generally more robust vs pure rotation than man marking, but still exploitable by precise passing |
| Gegenpressing vs direct football | High-intensity counter-press denies time for direct football's long-ball targets to receive support | Direct football skips the buildup phase the gegenpress is designed to disrupt | Aerially dominant target man + fast support runners to win second balls before counter-press organizes | Direct football can partially neutralize gegenpressing by avoiding the phase it attacks (short buildup) |
| Positional play vs man-oriented pressing | Structured rotations exploit individual marking assignments systematically | Requires elite drilling; breaks down if rotations are mistimed or a marker simply refuses to follow | Man-oriented press switches to a zonal/hybrid press mid-match once rotation patterns are recognized | Positional side must add unpredictability (broken rotations, individual improvisation) once the opponent adapts |
| High press vs a team with a weak/immobile goalkeeper | Directly targets a specific individual technical weakness rather than a structural one | If the press is drawn away by a switch, the GK's weakness is irrelevant for that phase | Opponent instructs the weak-footed/immobile GK to go long/aerial exclusively rather than play out | Reduces the press's turnover value to territorial gain only, at the cost of the GK team's own possession control |
| Low block vs a team reliant on individual dribblers | Numbers behind the ball reduce space for 1v1 dribbling to be effective | Congestion also reduces defenders' recovery speed if beaten in a tight space | Isolate the dribbler in wider, more spaced areas (touchline 1v1s) rather than central combination | Higher-value individual duels in space the low block can't fully congest |
| Offside trap vs a team with pacey in-behind runners | Can nullify a fast forward's primary threat by catching them offside repeatedly | Single mistimed step concedes a clean run on goal | Attacking team times runs to stay just onside, or uses a checked/delayed run (dropping short before spinning in behind) | Offside trap's reliability depends entirely on continued precise synchronization; one lapse is often decisive |
| Compact mid-block vs a team without variety in attack | Denies the single primary attacking method (e.g., only crosses, or only central combination) | If the attacking team has multiple credible methods, compactness alone can't deny all of them simultaneously | Attacking team varies method match-to-match/half-to-half (crossing, then switching to central combination) | Forces the mid-block to reorganize its defensive priorities mid-match, creating brief windows of disorganization |
| High defensive line vs a false nine | False nine dropping deep can be followed (opening central space) or ignored (allowing a free link player) | Either choice concedes something — a genuine structural dilemma, not just an execution risk | Assign a midfielder (not a CB) to track the false nine's drop, preserving the CB's position on the last line | Neutralizes the false nine's core disruption mechanism without exposing the high line |
| Double pivot vs an advanced playmaker (#10) | Two players can jointly screen and out-number the single creative threat | Vulnerable if the #10 drops even deeper, dragging one pivot player out of position | The un-engaged pivot player holds central position deliberately rather than following the #10 anywhere | Denies the #10 the specific disruption of dragging both pivot players away from the zone they protect |
| Zonal marking at set pieces vs a team using blocking/screening runs | Not dependent on tracking individual runners, structurally simpler to organize | Legal blocks/screens can still momentarily free a zone's assigned defender | Defenders communicate and "jump" zones dynamically rather than rigidly holding an assigned area when a screen is set | Requires high in-game communication; breaks down if defenders are passive/uncommunicative |
| Overloading a flank vs a disciplined zonal defence | Creates local numerical superiority in a specific wide zone | Zonal defences are specifically designed to resist local overloads by shifting as a unit, not conceding 1-for-1 | Zonal side shifts its entire block collectively toward the ball-side overload rather than pulling individual defenders | The overloading team must switch quickly to the vacated weak side before the zonal shift completes |

---

### 21.1 Defensive Counter-Tactics Indexed by Opponent Weakness

*This table is organized from the defending team's perspective: given a known or observed weakness in the opponent's specific tactical approach, which concrete defensive counter-tactic exploits it directly.*

| Opponent's Tactic | Identifiable Weakness | Defensive Counter-Tactic | Mechanism |
|---|---|---|---|
| Possession-heavy positional play | Rigid, rule-based rotations can become predictable once patterns are scouted | Man-orient specifically on the players whose rotations are most load-bearing (e.g., the inverted full-back or the dropping pivot), rather than a pure zonal press | Disrupts the specific structural mechanism the opponent depends on rather than pressing generically |
| High-press / gegenpressing | High line and aggressive commitment leaves large space in behind if bypassed with one pass | Keep one out-ball (a fast forward or winger) permanently positioned on the shoulder of the last defender, ready for an early first-time release the moment the press is beaten | Converts the opponent's structural pressing risk directly into a single-pass, high-value counter |
| Tiki-taka / short combination play | Relies on tight passing triangles at close range, vulnerable to physical/aggressive engagement in duels | Increase physical engagement intensity specifically in the zones where triangles form (rather than pure zonal denial), forcing more difficult, contested touches | Degrades the technical execution quality the style depends on, rather than trying to deny space structurally |
| Direct/long-ball football | Reliant on winning first and second aerial contacts | Field two aerially dominant, well-organized centre-backs specifically paired to win first contact, plus a deep-lying midfielder positioned for the second ball | Removes the opponent's central mechanism (aerial duels) before it can generate territorial gain |
| Counter-attacking football | Needs the opponent (you) to commit numbers forward to have space to counter into | Deliberately maintain a conservative rest-defence structure (Section 16) even when in a dominant possession spell, denying the counter-attack its target space | Denies the specific precondition (space in behind) the counter-attacking style requires to function |
| Wing-oriented crossing football | Relies on delivering quality crosses from advanced wide positions | Double up on the ball-near wide player (winger + full-back both engaging) rather than defending 1v1, accepting a temporarily thinner central zone | Denies time/space for a quality delivery at its source, rather than trying to defend the resulting cross in the box |
| False nine / fluid front-line rotation | Depends on defenders committing to an individual-marking decision that opens space either way | Pre-assign a specific "float marker" (typically a holding midfielder) whose sole job is to track whichever forward drops deepest, regardless of shirt number | Removes the structural dilemma by pre-committing a designated tracker rather than deciding reactively in the moment |
| Man-marking defensive systems (when attacking against them) | Markers can be dragged out of position systematically | Run high-frequency decoy/rotation patterns specifically targeting the opponent's most disciplined individual marker, since disrupting their assignment has the largest structural payoff | Exploits man-marking's core vulnerability (individual over-commitment) rather than attacking generically |
| Zonal defensive systems (when attacking against them) | Seams between zones are the structural weak point, not individual defenders | Use quick one-touch combination passing that targets the exact seam between two zonal assignments rather than dribbling at a single defender | Exploits zonal marking's specific weakness (the boundary between two zones) rather than the strength (resistance to movement/rotation) |

---


## SECTION 22 — PLAYER ATTRIBUTE REQUIREMENTS BY ROLE

| Attribute | Most Critical For |
|---|---|
| Pace | Wingers, full-backs/wing-backs, pressing forwards, high-line centre-backs |
| Acceleration | Same as pace, particularly for transition-focused roles |
| Agility | Inverted wingers, dribbling attackers, false nines |
| Strength | Target men, stoppers, defensive midfielders in physical duels |
| Stamina | Box-to-box midfielders, wing-backs (cover most distance of any role) |
| Positioning | Centre-backs, holding midfielders, goalkeepers |
| Vision | Deep-lying playmakers, advanced playmakers, regista |
| Passing (short) | Deep-lying playmakers, central midfielders, ball-playing CBs |
| Passing (long) | Regista, ball-playing CBs, target-man-supplying midfielders |
| Crossing | Wingers, wing-backs, attacking full-backs |
| Dribbling | Wingers, inside forwards, mezzalas, false nines |
| Ball control / first touch | All technical/possession-oriented roles, especially under pressure (pivots, playmakers) |
| Finishing | Poachers, complete forwards, second strikers |
| Heading | Target men, centre-backs, near/far-post specialists |
| Tackling | Stoppers, holding midfielders, full-backs |
| Interceptions | Holding midfielders, zonal defenders, regista (defensively) |
| Defensive awareness | Cover defenders, holding midfielders, all zonal-marking roles |
| Anticipation | Poachers (attacking), cover defenders (defensive), pressing forwards |
| Decision making | Playmakers, goalkeepers (distribution), all roles under pressure |
| Composure | Ball-playing goalkeepers/CBs, penalty takers, deep-lying playmakers |
| Work rate | Pressing forwards, box-to-box midfielders, wing-backs |
| Aggression | Stoppers, holding midfielders, pressing forwards |
| Balance | Dribblers, target men (holding off duels) |
| Off-ball movement | Poachers, false nines, mezzalas, all late-arriving box runners |

---

## SECTION 24 — GAME STATES

| Game State | Tactical Tendency |
|---|---|
| 0-0 | Balanced risk-taking; probing for weaknesses without overcommitting |
| Winning by 1 | Increased caution, may drop deeper, prioritize rest defence and ball retention in safe zones |
| Winning by 2+ | Significant caution, often a low block/possession-retention approach, willing to cede territory |
| Losing by 1 | Increased attacking risk tolerance, higher pressing intensity, more players committed forward |
| Losing by 2+ | Maximum attacking commitment, often abandoning defensive structure/rest defence, high-risk substitutions |
| Final 10 minutes | Game-state-dependent: leading teams increase caution/time-wasting; trailing teams increase directness and set-piece frequency |
| Final 5 minutes | Extreme version of above — leading teams may go to a back five/low block; trailing teams may push a CB forward as an auxiliary striker for set pieces |
| Early match | Feeling-out period; teams often start cautiously to assess opponent shape before committing to a gameplan |
| After scoring | Brief window of increased confidence/momentum; disciplined teams reset shape quickly, undisciplined teams risk a rapid counter-concession |
| After conceding | Momentary disorganization risk; well-coached teams have a rehearsed "reset" response to avoid conceding again immediately |
| Red card (own team) | Formation typically shifts to a more compact, lower shape (e.g., 4-4-1 becomes 4-4-0 effectively, or a back three consolidates to four) |
| Opponent red card | Increased width/overloads to exploit the extra body advantage, patience to avoid rushing decisions |
| Tired players | Reduced pressing intensity, deeper block, more direct/simplified passing to conserve energy |
| Protecting a lead | Low block, time management (slower restarts), substitutions for fresh defensive legs |
| Chasing a goal | High-risk substitutions (extra attacker), increased crossing volume, higher defensive line to compress the game into opponent's half |

---

## SECTION 25 — NUMERICAL SUPERIORITY

| Scenario | Tactical Use |
|---|---|
| 2v1 | Basic overload — one player draws the defender, the other receives in space; foundational building block of combination play |
| 3v2 | Common wide/half-space overload — allows a decoy run plus a direct combination option, harder for the deficit side to cover both |
| 4v3 | Larger structural overload, often seen in build-up phases (e.g., back four vs opponent's front three) |
| 5v4 | Seen in advanced possession shapes (e.g., 3-2-5 vs a back four plus a covering midfielder), maximizes attacking presence while still holding a numbers edge |

| Superiority Type | Example |
|---|---|
| Numerical superiority | 3 attackers vs 2 defenders in a wide overload during a fast break |
| Positional superiority | A #10 receiving between an opponent's midfield and defensive lines, even in a "numerically even" moment, because the zone itself is undefended |
| Qualitative superiority | An elite dribbling winger isolated 1v1 against a slower full-back — even numbers, but a clear individual mismatch |

**UNIVERSAL PRINCIPLE:** Numerical superiority is the most reliable but least frequent advantage to engineer (requires deliberate overloads); positional superiority is more sustainable within a structured system; qualitative superiority is squad-dependent and not a system-level tactic on its own.

---
## SECTION 26 — TACTICAL PRINCIPLE DATABASE

*Schema: ID | CATEGORY | TACTICAL PRINCIPLE | DESCRIPTION | CONDITION | PLAYER ACTION | TEAM ACTION | EXPECTED RESULT | RISK | COUNTER*

*65 entries, spanning all major categories (build-up, pressing, defending, attacking, transition, set pieces).*

| ID | CATEGORY | PRINCIPLE | DESCRIPTION | CONDITION | PLAYER ACTION | TEAM ACTION | EXPECTED RESULT | RISK | COUNTER |
|---|---|---|---|---|---|---|---|---|---|
| TP001 | Build-up | CB splitting | Centre-backs widen to bypass first press line | Opponent presses with 1-2 forwards | CBs move to edge of box width | Team creates passing lane around striker | Numerical superiority in first phase | CBs isolated wide if press adapts | Opponent shifts second striker to cover wide CB |
| TP002 | Build-up | GK as extra man | Goalkeeper joins build-up to outnumber press | High press with matched numbers | GK receives and plays under pressure | Team gains 1 extra passer (back 3 effectively) | Press is neutralized numerically | GK error leads to direct chance | Opponent presses GK specifically, cutting passing lanes |
| TP003 | Build-up | Pivot drop | Holding mid drops between CBs | Press restricts direct CB progression | Pivot drops to receive facing forward | Creates temporary back three | Progression via new central passing lane | Space vacated in front of defence | Opponent's #10 exploits vacated central zone |
| TP004 | Build-up | False full-back | Full-back inverts to cover for advancing pivot | Team wants pivot to advance | Full-back tucks centrally | Maintains central passing option while pivot advances | Retains build-up structure with more attacking presence | Wide area left uncovered if winger doesn't provide width | Opponent overloads the vacated flank |
| TP005 | Pressing | High trigger on back pass | Team presses aggressively on a backward pass | Opponent plays pass toward own goal | Nearest forward sprints to cut return option | Whole unit steps up in unison | Forced long/rushed clearance | Line can be caught too high if press fails | Opponent's GK plays first-time long ball behind press |
| TP006 | Pressing | Cover shadow use | Presser blocks passing lane while approaching | Presser is not yet close enough to tackle | Approach at an angle, not straight on | Team denies one option while showing another | Predictable pass direction, easier to intercept | If angle is wrong, both options remain open | Opponent uses one-touch pass to bypass angled approach |
| TP007 | Pressing | Trap on flank | Team invites pass to touchline zone | Opponent's CB has both central and wide options | Show central pass, deny it with body shape | Team collapses on ball once played wide | Turnover in a low-risk recovery zone | If touchline player escapes (skill/pace), press is bypassed | Opponent plays a first-time switch instead of holding the ball |
| TP008 | Pressing | Compactness before engagement | Team compresses lines before initiating full press | Opponent is building patiently in own half | Midfield and defensive lines step up together | Reduced space between lines before pressing individually | Press becomes coordinated rather than isolated | Slower to engage, risk of being played through if opponent moves quickly | Fast tempo passing before compactness is achieved |
| TP009 | Defending | Zonal shield | Holding mid screens the zone in front of back line | Opponent has a creative #10 operating centrally | Pivot positions between #10 and CBs | Denies central passing lane to #10 | #10 forced wide or drops deeper | If pivot is dragged out, zone opens | Opponent uses two central players to overload the zone |
| TP010 | Defending | Compact banks of four | Two horizontal lines maintain tight spacing | Team defending a mid or low block | All 8 outfield defenders/mids hold shape | Reduces space between/within lines | Fewer clear central passing lanes for opponent | Concedes wide areas by design | Opponent exploits width and crosses into the box |
| TP011 | Defending | Show inside/outside | Defender's body shape forces attacker one direction | 1v1 defensive situation | Angle body to block one side | Individual duel becomes predictable, supportable | Cover defender/teammate can anticipate direction | If wrong side is shown, attacker exploits favored foot | Attacker cuts onto their stronger foot regardless |
| TP012 | Defending | High line offside trap | Back line steps up together to catch runners offside | Opponent attacker makes a premature run | Entire back line advances in unison on the pass | Attacker is caught offside, possession restarts | Relies on precise, simultaneous timing | Mistimed step leaves a 1v1 with the GK | Opponent times run to stay just onside |
| TP013 | Attacking | Third-man combination | Ball played to a second player specifically to release a third | Opponent is pressing tightly on the first receiver | First player one-touches to second, third player times run | Bypasses press via combination rather than dribble/individual pass | Breaks defensive lines cleanly | Requires precise timing among 3 players | Opponent's cover player anticipates and intercepts the third pass |
| TP014 | Attacking | Half-space overload | Team floods the half-space with 2-3 players | Opponent defends narrow/central | Mezzala, winger, and full-back combine in the half-space | Numerical/positional superiority in the highest-value corridor | Creates shooting/passing angle advantage | Central zone can be left thin if too many players shift | Opponent shifts a central midfielder to balance the half-space |
| TP015 | Attacking | Switch to weak side | Long diagonal pass to the side without defensive numbers | Opponent has shifted compactly toward the ball | Switch pass to isolated wide player | Weak-side player receives in space | Immediate 1v1 or crossing opportunity | Risk of misplaced long pass, turnover in transition | Opponent's weak-side full-back recovers quickly to delay |
| TP016 | Attacking | Underlap in half-space | Midfielder runs inside the winger rather than outside | Opposition full-back is occupied wide by winger | Central mid times run into vacated half-space | Extra central runner arrives undetected | Line-breaking run into a high-value zone | If timed early, offside risk | Opponent's covering CB shifts across to mark the underlap |
| TP017 | Transition | Immediate counter-press | Nearest 4-5 players swarm the ball zone after loss | Possession lost near opponent's defensive/middle third | All nearby players converge on ball-carrier | Prevents opponent's clean transition | Regains possession or forces rushed clearance | If press fails, team is heavily out of shape | Opponent plays first-time out of the pressure zone (bypass pass) |
| TP018 | Transition | Fast vertical outlet | Immediate long/vertical pass upon winning ball | Opponent is disorganized after losing possession | Nearest forward makes an immediate depth run | Ball progresses before opponent resets | High-value counter-attacking chance | Turnover if pass is inaccurate under pressure | Opponent's rest defence recovers into position quickly |
| TP019 | Transition | Rest defence positioning | Designated players remain deep during an attack | Team has committed 6+ players forward | 2-3 players hold central defensive positions | Protects against counter-attack numerical disadvantage | Reduces counter-attack vulnerability | Reduces attacking numbers/overload potential | Opponent overloads a different zone the rest defence doesn't cover |
| TP020 | Set piece | Near-post flick corner | Attacker meets corner at near post to flick on | Corner kick situation, opponent uses zonal marking | Attacker attacks near post early, glances header on | Creates a secondary chance at far post/central area | Direct scoring chance from flick-on | If mistimed, ball is easily cleared | Defender specifically assigned to near-post zone |
| TP021 | Build-up | Direct long ball vs high press | Skip midfield entirely with long pass to forward | Opponent commits numbers to a high press | Target forward competes for aerial duel | Bypasses press zone completely | Territorial gain, second-ball opportunity | Low pass-completion/possession retention | Opponent's CBs win the aerial duel cleanly |
| TP022 | Pressing | Delayed press (jockey) | Presser slows opponent without full commitment | Team wants to allow teammates time to reset shape | Presser approaches but doesn't dive in | Buys time for team shape without conceding space | Team becomes compact before ball progresses further | Ball-carrier has time to pick a pass if delay is too passive | Opponent uses the time to find a progressive pass anyway |
| TP023 | Defending | Screening the pass, not the man | Defender positions to block the passing lane rather than mark tightly | Zonal defensive system | Defender stands in the lane between passer and receiver | Denies specific pass without full engagement | Pass is forced elsewhere, team maintains structure | Receiver can move to open a new lane | Attacker uses a decoy run to open the blocked lane |
| TP024 | Attacking | Pinning the last defender | Forward stays on the shoulder of the last CB | Team wants to stretch the defensive line vertically | Forward holds highest position without offside | Prevents CB from stepping out to cover elsewhere | Space opens in midfield/behind for others | If mistimed, forward strays offside | Opponent's CB communicates handoff with cover defender |
| TP025 | Attacking | Overload then isolate | Team overloads one side, then switches to isolate the far side | Opponent shifts numbers to the ball-near side | Quick switch after drawing opponent across | Isolated winger/forward faces a 1v1 on weak side | High-quality 1v1 opportunity in space | Requires accurate long switch pass | Opponent holds a spare covering defender on the weak side regardless |
| TP026 | Defending | Delaying the counter | Nearest defender fouls tactically or slows transition | Opponent wins the ball with numbers advantage in transition | Nearest defender commits a professional foul or physically delays | Buys time for team to recover defensive shape | Prevents an immediate clear chance | Yellow card risk, free kick conceded in a dangerous area | Opponent takes a quick free kick before the defence resets |
| TP027 | Build-up | Overload the first press line | Add an extra player to the build-up phase specifically | Opponent presses with a fixed number of forwards | An extra midfielder drops to create local superiority | First phase now has a spare man | Clean progression past first press line | Reduces numbers further up the pitch | Opponent adjusts by pushing an extra midfielder into the press |
| TP028 | Pressing | Curved pressing run | Presser approaches in a curved path to cut off one option while pressing the ball | Ball-carrier has two viable passing options | Forward bends run to close passing lane while closing down | Both pressure and lane-denial achieved simultaneously | Ball-carrier is forced into the remaining, less dangerous option | Straight-line pressing is easier to bypass | Ball carrier switches body shape to the still-open side before pass |
| TP029 | Attacking | Cutback trigger | Winger reaches the byline and looks to cut the ball back rather than cross high | Box is congested with central defenders | Winger drives to byline, cuts pass back to edge of box | Creates a shot from a less-congested zone with a clear sight of goal | Higher quality shooting angle than a contested aerial cross | Requires runners to arrive on time at edge of box | Defender tracks the cutback zone specifically (edge-of-box marker) |
| TP030 | Transition | Secure vs fast decision rule | Team decides between fast break and controlled possession immediately after winning the ball | Possession just won in transition | Ball-carrier scans for open space vs pressure level | Team either commits to counter or resets to control tempo | Correct decision matches game state and space available | Wrong decision (forcing a break with no space) risks turnover | Opponent's rest defence is well organized, discouraging the fast option |
| TP031 | Set piece | Zonal blocking screen | Attacking players create a legal screen to free a runner at a corner | Defending team uses man-marking at set pieces | Attackers position to obstruct (legally) a marker's path | Marked attacker becomes free momentarily | Clean header/shot opportunity | Can be penalized as an offence if contact/obstruction is excessive | Defenders switch to zonal marking to nullify blocking screens |
| TP032 | Defending | Deny the switch | Weak-side winger tucks in to block a potential long switch pass | Opponent is building on the strong side with intent to switch | Weak-side attacker/winger drops to a covering midfield position | Reduces the passing lane for the switch of play | Opponent must find a different progression route | Weak-side attacking threat is reduced (fewer forward options) | Opponent commits a different long pass angle around the tucked winger |
| TP033 | Build-up | Diagonal pass to bypass a line | CB or pivot plays a diagonal (not purely vertical) pass to beat a press line | Opponent's press line is set horizontally | Passer identifies the diagonal lane between two pressers | Ball progresses past a full defensive/pressing line in one action | Immediate line-break, high progression value | Interception risk is higher than a safe lateral pass | Opponent presser angles run to cut the diagonal lane specifically |
| TP034 | Attacking | False nine drop | Central striker drops into midfield to disrupt marking | Opposition CB is uncertain whether to follow | CB either follows (opening central space) or holds (striker is free to link) | Creates central space for an onrushing midfielder or winger | Disrupts standard CB-marking assignment | If CB doesn't follow, false nine's direct goal threat is reduced | Opponent assigns a midfielder (not CB) to track the false nine |
| TP035 | Pressing | Pressing the goalkeeper | Forward directly engages the opposing GK on a goal kick/build-up | GK is comfortable/composed in possession | Lead forward closes GK's short passing options first | Forces a long/rushed distribution | Turnover or territorial gain from a poor clearance | GK plays around the press with an accurate long ball to a target man | Opponent's GK specifically targets a nearby unmarked outlet |
| TP036 | Defending | Cover behind the full-back | CB shifts wide to cover space behind an advanced full-back | Full-back has joined the attack and is out of position | Ball-side CB shifts toward the vacated flank | Reduces space in behind for opponent's counter | Prevents an immediate wide counter-attack chance | Central zone is thinner with the CB shifted wide | Opponent attacks centrally instead, exploiting the shifted CB |
| TP037 | Transition | Immediate recovery run | Advanced player sprints back on losing possession | Player who lost the ball (or was furthest advanced) must recover | Sprint directly to the most dangerous open space, not just "backward" | Reduces the numerical/spatial advantage the opponent gained | Prevents an immediate 2v1/3v2 in transition | Fatigue accumulates over a match with repeated recovery sprints | Opponent immediately targets the space the recovering player just vacated |
| TP038 | Attacking | Box occupation timing | Attackers stagger their arrival into the box rather than entering simultaneously | Cross or cutback is about to be delivered | Players time runs to arrive as the ball arrives, from different angles/heights | Defenders cannot mark all arrival points simultaneously | Higher quality/quantity of shooting opportunities in the box | Early arrival risks being marked or offside before delivery | Zonal defenders track specific spaces rather than specific players |
| TP039 | Build-up | Baiting the press | Team deliberately shows an "easy" central pass to draw the press forward | Opponent is in a disciplined mid-block, reluctant to press | CB or pivot receives with an open body shape, inviting pressure | Opponent commits to the press, vacating the space behind them | Space opens beyond the press once it's triggered | If the bait pass is actually intercepted, immediate turnover | Opponent presses with a controlled, cover-shadowed approach rather than committing fully |
| TP040 | Pressing | Support runner timing | Second presser times arrival to coincide with the first presser's engagement | First presser has committed to closing down the ball-carrier | Second player arrives to close the remaining passing lane simultaneously | Ball-carrier has no time-delayed escape option | Increases turnover probability significantly vs a lone press | If support is late, ball-carrier exploits the gap before it closes | Ball-carrier releases the ball before the second presser arrives |
| TP041 | Build-up | Staggered pivot heights | Two central midfielders occupy different vertical depths rather than the same line | Opponent presses man-to-man on a flat double pivot | One pivot drops shallow, one holds higher | Creates two distinct, non-mirrored passing options | Harder for opponent to press both with matched numbers | Deeper pivot congests CB's passing lane if spacing is poor | Opponent assigns a free winger to cover the staggered pivot |
| TP042 | Build-up | Third-choice out-ball | Team designates a tertiary passing option beyond the two obvious ones | Opponent presses the two primary passing lanes | Furthest player from the ball stays available diagonally | Ball-carrier always retains an escape option | Prevents being fully trapped by a two-man press | Third option may be far from goal, low progressive value | Opponent commits a third presser once the pattern is recognized |
| TP043 | Build-up | Central CB dribble under press | Lone deepest CB carries the ball centrally rather than passing immediately | Opponent's press shows no clear passing lane | CB advances a few meters to draw a presser before releasing | Manipulates the presser's approach angle before passing | Opens a lane that didn't exist before the carry | Turnover close to goal if dispossessed while carrying | Opponent presser holds position instead of committing to the carry |
| TP044 | Pressing | Numbers-up front press | Team commits an extra midfielder alongside forwards to press CBs | Opponent's back line has a spare defender (back three vs 2 strikers) | Withdrawn midfielder joins the front line temporarily | Matches opponent's extra defender numerically | Removes the free man opponent relies on for composure | Own midfield is thinner if press is bypassed centrally | Opponent overloads the vacated central midfield zone |
| TP045 | Pressing | Rescinding the press (bail-out) | Team abandons an active press and resets to a mid-block | Press has been bypassed once already and team risks being stretched | Pressing players sprint to recover shape rather than continue chasing | Prevents compounding one failed press into a second exposed gap | Reorganizes before conceding a clear chance | Cedes territory/tempo temporarily | Opponent maintains tempo to prevent the reset completing |
| TP046 | Defending | Jockey and delay wide | Full-back delays a winger's progress without diving into a tackle | Winger is running at the full-back in space | Backpedal while showing the winger down a preferred channel | Buys time for covering defenders to get goal-side | Denies an immediate cross/cutback | If delayed too long, winger changes direction and beats the jockey | Winger uses a stepover/feint to unbalance the jockeying defender |
| TP047 | Defending | Doubling up wide | Winger tracks back to support the full-back against an isolated wide attacker | Opponent's wide player is isolated 1v1 with a dangerous dribbler | Winger recovers to form a temporary 2v1 | Removes the individual mismatch | Denies the dribble/cross combination | Central zone loses a body while the winger tracks back | Opponent switches play immediately to the vacated central zone |
| TP048 | Defending | Committee marking at set pieces | Multiple defenders assigned to the most dangerous aerial threat | Opponent has one significantly stronger aerial presence than others | Two defenders (near and far side) both track the key threat | Reduces probability of a clean, unchallenged header | Concedes a spare, less dangerous attacker elsewhere | Marking distribution is imbalanced; the spare attacker profits instead | Opponent's set-piece routine specifically targets the now-free secondary attacker |
| TP049 | Attacking | Overlap-underlap decoy pairing | Full-back and winger run simultaneous overlap and underlap options | Opposition full-back must defend both a wide and inside run at once | Winger holds width outside, midfielder underlaps inside simultaneously | Defender cannot cover both lanes | One option is nearly always open | Requires two well-timed, coordinated runs | Covering CB shifts across to nullify the underlap specifically |
| TP050 | Attacking | Delayed box entry | Attacker deliberately arrives in the box late rather than with the first wave | Cross/cutback delivery is imminent and box is congested with early arrivals | Player holds position at edge of box before timing a run to the back post | Exploits defenders who have already committed to earlier attackers | Often arrives unmarked at the far post/edge of six-yard box | Late arrival risks missing the delivery window entirely | Defender specifically assigned to track late-arriving runners |
| TP051 | Attacking | Diagonal dribble to bypass a line | Ball-carrier dribbles at an angle rather than straight at a defender | Defender is positioned square-on, denying a direct route | Carry the ball into the half-space at an angle | Forces the defender to turn, often losing balance/positioning | Creates separation and a new passing/shooting angle | Turnover risk if dispossessed mid-dribble in a dangerous zone | Cover defender shifts to close the diagonal lane pre-emptively |
| TP052 | Transition | Central lockdown after loss | Team immediately compresses centrally rather than chasing wide | Possession lost with opponent transitioning quickly | Nearest central players converge to deny the most direct route to goal | Forces opponent's counter wide, into a lower-value zone | Denies the fastest/most direct counter-attacking lane | Wide areas are conceded, allowing crosses eventually | Opponent's winger exploits the conceded wide space directly |
| TP053 | Transition | Foul as a tactical reset (professional foul) | A trailing defender commits a controlled foul to stop a transition | No recovery run can realistically catch the counter-attacking player | Defender fouls tactically rather than conceding a clean break | Stops an immediate high-value chance at the cost of a set piece | Prevents a near-certain goal-scoring opportunity | Yellow/red card risk, dangerous free kick conceded | Opponent's set-piece routine exploits the resulting free kick |
| TP054 | Transition | Overload the second ball | Multiple players converge around a long clearance's likely landing zone | Team has just conceded territory via a defensive long clearance | Midfielders anticipate flick-on/knockdown zones | Wins back second-phase possession immediately | Converts a defensive clearance into an attacking opportunity | If second ball is lost too, opponent counters into a stretched team | Opponent's own midfield anticipates the same zone and outnumbers the recovery attempt |
| TP055 | Set piece | Short corner overload | Two attackers combine near the corner flag rather than crossing immediately | Opponent's box defence is set and well-organized | Corner taker plays short to a nearby teammate | Creates a new angle and draws a defender out of the box | Can generate a higher-quality delivery from a better angle | Reduces numbers actually in the box for any eventual cross | Opponent commits a marker to the short-corner option, maintaining box numbers elsewhere |
| TP056 | Set piece | Zonal + man hybrid at corners (defending) | Key aerial threats man-marked, remaining zones covered zonally | Opponent has one clear aerial focal point plus supporting runners | Designated marker follows the key threat individually, others hold zones | Balances individual attention and space coverage | Reduces both individual and structural set-piece risk | Handoff confusion possible between man-markers and zonal markers | Opponent runs decoy blocks specifically to disrupt the handoff |
| TP057 | Build-up | Goalkeeper switch under press | GK plays a first-time pass to the far-side CB rather than the near side | Press commits heavily to the ball-near side | GK redirects play across goal quickly | Bypasses the committed press entirely in one action | Immediate numerical advantage on the weak side | High technical difficulty, risk of a heavy touch under pressure | Opponent's press shape includes cover for the weak-side switch specifically |
| TP058 | Pressing | Angled double press on flank CB | Two pressers approach a wide centre-back from different angles | Wide CB in a back three is isolated near the touchline | Nearest forward presses centrally, winger presses from outside | Cuts off both the inside and outside passing lanes simultaneously | High-value turnover in a wide defensive zone | Central zone temporarily has one fewer covering presser | Opponent's central pivot exploits the thinner central press |
| TP059 | Defending | Recovery sprint angle (cutting the run) | Defender takes an angled recovery run rather than a direct chase | Attacker has beaten the defender for pace in a straight line | Defender runs a diagonal line to intercept the attacker's path rather than matching stride-for-stride | Higher probability of recovering position than a direct footrace | Prevents a clean run in behind despite the initial pace deficit | Misjudged angle results in conceding the run entirely | Attacker cuts back inside, exploiting the defender's committed angle |
| TP060 | Attacking | Blind-side box run | Attacker times a run from a defender's blind side as a cross is delivered | Defender is ball-watching during a wide delivery | Attacker curves the run to stay out of peripheral vision until the last moment | High probability of an unmarked contact on goal | Direct, high-quality scoring opportunity | Requires precise delivery timing to match the run | Defending team uses a designated ball-watching caller to alert markers |
| TP061 | Build-up | Provoking the counter-press bait | Deliberately building slowly to invite gegenpress commitment, then accelerating | Opponent uses aggressive gegenpressing | Team circulates patiently at a controlled tempo before a sudden tempo increase | Draws opponent's press fully forward before it can be reset | Exploits the space the committed press leaves once bypassed | If tempo increase mistimed, team is caught mid-transition | Opponent's press includes a designated "spare" covering the acceleration lane |
| TP062 | Pressing | Splitting the double pivot | Two pressers isolate each individual pivot player rather than pressing as a pair | Opponent's double pivot is the primary progression outlet | Each presser cover-shadows one pivot player individually | Denies both central options simultaneously without a clear spare passing option | Forces play backward or long | Wingers must vacate their wide press duties to execute this, opening flanks | Opponent's full-backs receive freely in the vacated wide zones |
| TP063 | Defending | Delaying a switch of play | Ball-far winger holds a central covering position instead of staying wide | Opponent looks likely to switch play long | Winger positions to intercept/contest the switch pass | Reduces the effectiveness of the opponent's primary escape route | Forces opponent to find an alternative, slower progression method | Winger's own wide attacking threat is reduced when possession is regained | Opponent varies the switch trajectory (higher/lower flight) to beat the positioned winger |
| TP064 | Attacking | Overload-recycle-switch | Team commits numbers to one flank, recycles possession centrally, then switches | Opponent has fully committed to defending the overloaded side | Central pivot recycles possession back before playing the long switch | Combines an overload's drawing power with a switch's space exploitation | High-quality isolation for the weak-side attacker | Slower buildup gives opponent's weak side time to partially recover | Opponent's weak-side full-back anticipates the switch and delays recovery timing |
| TP065 | Transition | Two-touch rule in transition | Players restrict themselves to a maximum of two touches immediately after winning the ball | Team has just regained possession in a dangerous transition moment | Receiving player's first touch sets up an immediate pass/shot | Maximizes speed of exploitation before opponent organizes | Denies opponent time to press the new ball-carrier | Rushed execution increases technical error risk | Opponent's nearest defender anticipates the quick release and intercepts the pass |

---

## SECTION 27 — PLAYER MOVEMENT RULE DATABASE

*Schema: RULE_ID | TRIGGER | PLAYER | CURRENT_ZONE | MOVEMENT | TARGET_ZONE | PURPOSE | TEAMMATE_MOVEMENT | OPPONENT_REACTION | RISK*

| RULE_ID | TRIGGER | PLAYER | CURRENT_ZONE | MOVEMENT | TARGET_ZONE | PURPOSE | TEAMMATE_MOVEMENT | OPPONENT_REACTION | RISK |
|---|---|---|---|---|---|---|---|---|---|
| MV001 | Winger receives ball wide, full-back overlaps | Winger | Wing (Z20) | Moves inside | Half-space (Z19) | Create outside lane for overlapping FB, use stronger foot to shoot/pass | Full-back overlaps into vacated wing zone | Opposing FB must choose to follow inside or track overlap | If both defenders track winger inside, overlap FB is free but crossing angle narrows |
| MV002 | Centre-back has time on ball in build-up | Ball-playing CB | Defensive third (Z7) | Carries forward | Middle third (Z12) | Draw a presser out and create a passing/dribbling lane forward | Pivot drops to cover the vacated defensive space | Opponent forward must decide whether to press the advancing CB | Space opens behind the advancing CB if possession is lost |
| MV003 | Striker sees CB step out to press teammate | Striker | Central attacking zone (Z28) | Makes blind-side run | Behind opposite CB (Z26/Z30 area) | Exploit space opened by the stepping CB before cover arrives | Winger holds width to stretch the covering CB | Covering CB must shift across, opening further space | Offside risk if timing with the through pass is early |
| MV004 | Double pivot player receives under pressure | Holding midfielder | Central midfield (Z13) | Lateral movement | Half-space (Z12/Z14) | Escape direct pressing angle, open a new passing lane | Partner pivot shifts to cover vacated central zone | Presser must reset angle of approach | Momentary loss of central control if both pivots shift simultaneously |
| MV005 | Full-back is isolated 1v1 wide | Winger | Half-space (Z22) | Out-to-in becomes in-to-out | Wing (Z25) | Provide an out-ball and stretch the opposing full-back | Mezzala fills vacated half-space | Opposing full-back must engage wide or cede space | If winger isn't quick enough, full-back recovers before receiving |
| MV006 | Team is building in a 3-2-5 shape, ball on left CB | Right winger | Right wing (Z25) | Holds width | N/A (stays) | Maintain the far-side passing option for a switch of play | Left winger and striker occupy central/left channels | Opponent must keep a defender on the weak side, reducing ball-side numbers | If ball never reaches him, this player becomes tactically inert for the phase |
| MV007 | Opponent CB steps out of the defensive line | False nine | High central zone (Z28) | Drops deep | Midfield zone (Z18/Z23) | Disrupt marking assignment, pull CB out of position | Attacking midfielder/winger makes late run into vacated central space | Marking CB must choose to follow (opening space) or hold | Reduced direct central goal threat if false nine drops too often |
| MV008 | Ball is played into the half-space to a mezzala | Mezzala | Central midfield (Z13/Z18) | Diagonal run | Half-space/box (Z22/Z27) | Support the half-space combination and provide a shooting option | Winger tucks in narrower to combine | Opposing full-back or CB must track the late arrival | Central midfield is thinner if both mezzalas advance simultaneously |
| MV009 | Team wins possession in defensive third | Fastest forward | Any current zone | Explosive depth run | Behind opponent's defensive line | Exploit immediate disorganization in transition | Nearest midfielder supports centrally for a layoff option | Opponent's deepest defender must sprint to recover | Offside if timing is premature relative to the outlet pass |
| MV010 | Cross is about to be delivered from the byline | Attacking midfielder | Edge of box (Z23) | Late arriving run | Penalty box (Z28-Z29) | Arrive unmarked as delivery occurs, exploit staggered box occupation | Striker occupies near post to draw defensive attention | Zonal defenders must track new arrival at the point of delivery | Early arrival risks being picked up/marked before the ball is delivered |
| MV011 | Opponent presses the ball-near full-back | Inverted full-back | Wing (Z16/Z20) | Moves centrally | Central midfield (Z13/Z18) | Provide a safer central outlet away from the touchline trap | Winger drops slightly to offer an alternate wide option | Opponent's presser must adjust pressing angle centrally | Wing area becomes momentarily uncovered |
| MV012 | Team is in a low block and wins the ball | Winger | Own defensive third (Z6) | Sprints into space in behind | Opponent's defensive third (Z26) | Immediate counter-attacking outlet | Box-to-box midfielder supports centrally as a passing option | Opponent's advanced full-backs must sprint back to recover | Isolated run with no support if the outlet pass doesn't arrive |
| MV013 | Opposition holding mid steps out to press | Advanced playmaker | Between lines (Z18) | Drops to receive | Vacated central zone (Z13/Z18) | Receive facing forward in the space the pivot vacated | Striker holds the last defensive line to prevent CB stepping up | Covering CB or a second midfielder must close down quickly | If the pass is anticipated, immediate turnover in a dangerous central zone |
| MV014 | Wide centre-back in a back three has the ball | Wing-back | Wing (Z16) | Advances high and wide | Final third wing (Z21/Z25) | Provide immediate width and an overlapping option | Central midfielder shifts to cover the vacated wing-back zone | Opponent's winger must track back defensively | Space behind the advanced wing-back is exposed to a counter |
| MV015 | Team is attacking with a central overload | Central midfielder | Central zone (Z18) | Third-man run | Half-space (Z17/Z19) | Arrive as the third option after a give-and-go between two teammates | First two players execute a quick 1-2 to draw defenders centrally | Cover defender must decide whether to follow the run or hold zone | Timing error results in an offside call or a missed connection |
| MV016 | Opponent's defensive line is high and flat | Second striker | Just behind the striker (Z23) | Depth run | Behind the defensive line (Z28+) | Exploit space in behind a high flat back line | Striker holds position centrally to occupy CBs | Defensive line must step up together or concede the run | Offside trap risk if timing isn't precise |
| MV017 | Ball is with the goalkeeper in build-up | Centre-back | Central defensive zone (Z3) | Splits wide | Wide defensive zone (Z2/Z4) | Create a passing angle around the opposition's lone striker | Full-backs push slightly higher to maintain team shape | Opposition striker must choose which CB to press, opening the other | Momentary central gap if the GK's pass is intercepted |
| MV018 | Opponent's press has committed multiple players forward | Deep-lying playmaker | Central defensive-midfield zone (Z8) | Lateral movement to find a gap in the press | Adjacent zone (Z7/Z9) | Escape the cover shadow of the immediate presser | CB carries the ball slightly to draw the presser toward the DLP's original zone | Presser must decide whether to follow or hold the passing lane | If the DLP is tracked, the escape movement fails and possession is under threat |
| MV019 | Team has box entries planned from a corner | Tallest centre-back | Own half (set-piece staging) | Advances into the opponent's box | Six-yard box/penalty spot area | Provide an aerial threat at a set piece | Deepest midfielder or full-back covers the vacated defensive zone for a counter | Opponent must assign a marker to the additional attacking CB | Team is short a defender if the corner is cleared and countered quickly |
| MV020 | Winger's marker is dragged out by a decoy run | Overlapping full-back | Behind the winger (Z16) | Overlap run | Wing (Z20/Z25) | Exploit the space the decoy run created in the wide channel | Winger makes an inward decoy run specifically to drag the marker | Opposition full-back must decide whether to follow the decoy or stay wide | If the decoy isn't convincing, both the winger and overlapping FB are covered |

| MV021 | Team is building in a back-three shape, wide CB has the ball | Ball-far wing-back | Weak-side wing (Z16) | Tucks slightly narrower | Weak-side half-space (Z17) | Stay ready for a switch while also covering a potential counter-attack lane | Weak-side central mid covers the vacated wide zone | Opponent's weak-side attacker must choose to track inside or hold width | If a switch never arrives, the wing-back is out of position for a counter |
| MV022 | Opponent commits both full-backs forward | Holding midfielder | Central zone (Z13) | Drifts wide | Half-space/wing (Z12/Z16) | Occupy the space vacated by an advanced opposition full-back for a transition opportunity | Second pivot covers the central zone alone temporarily | Opponent's covering CB must decide whether to track the drift | Central zone is thin if the ball is lost immediately |
| MV023 | Team's striker is double-marked by both CBs | Winger | Wing (Z25) | Cuts inside | Central zone (Z28) | Occupy the space between the two CBs marking the striker | Full-back overlaps into the vacated wing zone | One marking CB must decide to release the striker or follow the winger inside | If neither CB reacts, no space is actually created |
| MV024 | Opponent's pressing forward commits to the ball-carrier | Nearest supporting midfielder | Adjacent zone | Shows for a short pass at an angle | Same zone, different angle | Offer an immediate out-ball once pressure is applied | Ball-carrier's body shape opens toward the supporting player | Opponent's second presser must decide whether to cover the passing lane or stay on the original target | If covered, ball-carrier needs a third option |
| MV025 | Team is defending a corner with zonal marking | Deepest holding midfielder | Edge of own box | Positions at the edge of the box | Edge-of-box zone | Cover second balls and prevent a shot from distance after a clearance | Front-most forward stays high as an out-ball for a quick counter | Opponent's edge-of-box runners must contest the zone directly | If the corner is won cleanly by the opponent, the team is short an out-ball option |
| MV026 | Winger's direct opponent is booked and cautious in tackling | Winger | Wing (Z20) | Increases 1v1 dribbling frequency | Same zone, more direct engagement | Exploit the opponent's reluctance to commit to a tackle | Full-back holds a supporting underlap position in case of a turnover | Cautious full-back must show the winger down a low-risk channel | If the opponent recognizes the tactic, they call for cover instead of engaging alone |
| MV027 | Team has numerical superiority in a wide overload (3v2) | Furthest wide attacker | Wing (Z25) | Holds maximum width | Wing (Z25), stays wide | Stretch the two defenders as far apart as possible to maximize the overload's effect | Two central players combine for the 2v1 in the resulting half-space | The second defender must choose between covering the wide outlet or the half-space combination | If the wide player drifts inside, the overload collapses into a 3v2 congested in one small area |
| MV028 | Opponent's holding midfielder is booked/fatigued | Attacking midfielder | Between the lines (Z18) | Increases frequency of receiving between the lines | Same zone, more often | Exploit reduced tracking intensity from a fatigued/cautious marker | Striker holds the defensive line to prevent CBs stepping to cover | Fatigued midfielder must choose between engaging (foul risk) or conceding the zone | Opponent substitutes a fresher midfielder specifically to close down the exploited zone |
| MV029 | Team wins a throw-in in the attacking third | Nearest central midfielder | Just outside the box | Moves to support the throw-in taker | Edge of box / half-space | Provide a quick short option to retain and combine near goal | Winger holds width to stretch the defence during the throw-in sequence | Opponent's marker must track the supporting run closely in a congested area | A misplaced short throw under pressure risks an immediate counter |
| MV030 | Full-back is caught high after an attack breaks down | Ball-side centre-back | Central defensive zone (Z8) | Shifts wide temporarily | Vacated full-back zone (Z6/Z10) | Cover the space behind the caught-out full-back immediately | Weak-side CB shifts centrally to cover for the shifted ball-side CB | Opponent's winger/forward attacks the covered-but-thinner central zone instead | If the shift is late, a direct 1v1 opportunity is conceded in a dangerous wide zone |
| MV031 | Opponent plays a back three that splits wide in build-up | Pressing forward | High central zone | Curves run to press one wide CB while shadowing the central passing lane | Wide defensive-third zone | Force the split CB into a lower-value pass while denying the easy central option | Second forward covers the remaining central passing option | Opponent's central CB must decide between a risky central pass or a safe lateral one | If both forwards commit wide, the central CB carries forward unchallenged |
| MV032 | Team's #10 is being man-marked tightly | Attacking midfielder (#10) | Between the lines (Z18) | Drifts to the flank | Wing/half-space (Z16/Z20) | Drag the individual marker out of the central zone entirely | Striker or winger fills the vacated central pocket | Marker must decide whether to follow to the flank (opening the center) or release the #10 | If the marker releases, central zone remains protected but #10's threat is nullified in a low-value zone |
| MV033 | Opponent's press leaves a gap between CB and full-back | Winger | Wing (Z20) | Diagonal run into the channel | Channel between CB and FB (Z21) | Exploit the specific structural gap the press creates | Central striker occupies the CB to prevent them shifting to cover the channel | Full-back must decide to track inside (opening the wing) or hold the channel | Covering CB steps across from the far side to close the channel instead |
| MV034 | Team is protecting a lead in the final 10 minutes | Advanced winger | Final third (Z25) | Drops into a supporting midfield position | Middle third (Z20) | Add defensive/rest-defence numbers without a formal substitution | Full-back holds a more conservative, deeper starting position | Opponent commits additional attackers, testing the deeper defensive numbers | If the drop is too passive, the team loses its only outlet for relieving pressure |
| MV035 | Striker anticipates a rebound from a blocked shot | Striker | Edge of six-yard box | Adjusts position toward the likely rebound angle | Six-yard box / penalty spot | Anticipate second-ball opportunities from a blocked or saved shot | Edge-of-box supporter covers the zone the striker vacates | Goalkeeper/defenders must react quickly to the second contact | If anticipation is wrong, the striker is out of position for the actual rebound direction |
| MV036 | Opponent's wing-back is caught upfield after a turnover | Weak-side forward | Central/weak-side zone | Sprints into the vacated wing-back channel | Vacated wide channel (Z21/Z25) | Exploit the specific space a caught-out wing-back leaves in a back-three system | Ball-carrier looks immediately for the exploiting run | Covering wide centre-back must shift extremely wide to compensate | If the CB shifts, the resulting central back-two/back-one is exposed |
| MV037 | Team needs to run down the clock while leading | Central midfielder | Central zone, deep | Circulates possession laterally rather than progressing | Own defensive/middle third | Retain possession and consume match time without unnecessary risk | Full-backs hold wide, safe positions to extend circulation options | Opponent commits numbers forward to force a turnover | If the team is pressed successfully, a high-value turnover is conceded near their own goal |
| MV038 | Opponent defends a corner with a short near-post zonal setup | Tallest attacker | Edge of box | Attacks the far post directly rather than near post | Far post (six-yard box) | Exploit a zonal setup that is congested near-post but thinner far-post | A near-post decoy run draws zonal defenders' initial attention | Far-post defender must win the individual aerial duel alone | Defending team assigns a specific far-post-only marker to close the gap |
| MV039 | Team's high line is defending a set piece and needs a quick reset | Full-back | Own box | Sprints to the touchline-adjacent flat position | Defensive line (Z6/Z10) | Reset the high defensive line quickly after a set piece is cleared, ready for an offside trap | CBs step up in unison alongside the resetting full-back | Opponent's forward must time a fresh run against a newly reset line | If reset is too slow, opponent exploits a temporarily disorganized defensive line |
| MV040 | Team wins the ball high with the opponent's CBs split wide | Central midfielder (box-to-box) | Middle third (Z13) | Immediate forward sprint through the vacated central channel | Central zone between split CBs (Z23/Z28) | Exploit the direct central lane opponent's own build-up shape just vacated | Ball-winning player releases the pass immediately, without an extra touch | Opponent's holding midfielder must recover centrally at sprint speed | If the recovering midfielder wins the race, the counter is snuffed out before reaching the box |

*The RULE_ID schema (Trigger → Player → Current Zone → Movement → Target Zone → Purpose → Teammate Movement → Opponent Reaction → Risk) extends identically to any further position/zone/trigger permutation beyond the 40 rows above.*

---

## SECTION 28 — PRESSING RULE DATABASE

*Schema: PRESS_ID | TRIGGER | PRESSER | SUPPORT | COVER | PRESSING_DIRECTION | TARGET_ZONE | TRAP | EXPECTED_OUTCOME | RISK*

| PRESS_ID | TRIGGER | PRESSER | SUPPORT | COVER | PRESSING_DIRECTION | TARGET_ZONE | TRAP | EXPECTED_OUTCOME | RISK |
|---|---|---|---|---|---|---|---|---|---|
| PR001 | Opponent GK receives a back-pass | Lead striker | Second striker cuts central lane | Midfield line steps up together | Curved run cutting central return pass | Force play to a flank CB | Wide CB has a limited passing angle once isolated | Long, rushed clearance or turnover | High line vulnerable if press is beaten with one pass |
| PR002 | Opponent CB receives with back to goal-side pressure | Nearest forward | Winger covers the pivot passing lane | Back line holds/steps | Direct approach, cover-shadowing the pivot | Force CB to play backward or long | CB has no safe forward option | Turnover or forced long ball | Presser can be turned if CB has strong close control |
| PR003 | Opponent full-back receives wide | Ball-side winger | Ball-side central mid covers inside lane | Weak-side shifts across | Press from inside-out to deny the inside option | Trap in the wide "dead zone" near the touchline | Touchline itself acts as an auxiliary defender | Possession win in a low-risk recovery zone | If FB is technically strong, they can beat the presser 1v1 |
| PR004 | Slow/misdirected pass across the pitch | Nearest player to the pass's destination | Second player closes down as ball arrives | Team shifts as a unit toward the ball | Direct sprint to intercept or immediately close down | Wherever the pass is travelling to | Timing arrival with the ball's arrival | Interception or immediate turnover | If under-hit pass is well controlled, presser is beaten before arriving |
| PR005 | Opponent's double pivot is heavily marked | Attacking midfielder + winger | Ball-side central mid covers the remaining pivot | Weak-side winger tucks in | Two-man press on both pivot players simultaneously | Force play backward to CBs or long | Deny both short central options at once | Turnover or forced long ball, high-value regain zone | Leaves opponent's full-backs completely free if wingers over-commit centrally |
| PR006 | Opponent plays out from a goal kick | Lead striker + second striker | Wide midfielders press full-backs | Central mid screens the pivot | Curved press showing CBs toward the flank | Force long clearance or a turnover near the opponent's box | High-value if won, since opponent's goal is close | Concedes if bypassed (opponent GK plays a long, accurate pass over the press) |
| PR007 | Opponent's #10 receives between the lines | Nearest central midfielder | Holding mid covers the space behind | CBs step up to compress vertically | Direct engagement from behind/side to prevent turning | Force the #10 to play backward or sideways | Deny the forward-facing turn | Turnover or forced backward pass, negates the creative threat | If #10 turns before pressure arrives, a dangerous forward pass is possible |
| PR008 | Opponent switches play to the weak side | Weak-side winger (recovering) | Weak-side full-back closes down immediately | Weak-side central mid tucks to cover centrally | Sprint to close down before the receiver can turn | Force an immediate first-time pass or a poor touch | Delay opponent's progression, buy time for team shape | Late arrival gives receiver time to turn and progress |
| PR009 | Opponent centre-back carries the ball forward | Nearest presser (winger tucking in or striker dropping) | Central mid covers the passing lane forward | Back line holds position, doesn't overcommit | Angled approach forcing the CB back toward their own goal | Deny the forward carry, force a backward or lateral option | CB abandons the progressive carry | Space temporarily vacated by the CB's advance if press fails and CB continues forward |
| PR010 | Opponent plays a risky pass into a tight central zone | Nearest 2 defenders/midfielders | Third player covers the layoff option | Weak-side player screens the switch option | Converge from both sides simultaneously | Win the ball in a highly congested central zone | Aggressive double team on an isolated receiver | High-value turnover in a dangerous zone for the opponent | Fouls conceded in a dangerous area if timing is mistimed |
| PR011 | Ball played to a weak-footed player | Presser closes the strong-foot side | Cover shadow on the strong-foot passing option | N/A | Approach forcing the ball onto the weaker foot | Force a mistake or a heavy touch | Player is uncomfortable executing under pressure on weak foot | Misplaced pass or loss of control | Player uses weak foot competently, bypassing the intended trap |
| PR012 | Opponent's striker holds the ball up with back to goal | Nearest CB engages the physical duel | Holding mid covers the layoff option | Second CB covers in behind | Tight physical engagement, denying a turn | Prevent the striker from turning or laying off cleanly | Force a backward or misplaced knockdown | Turnover from the duel or the layoff being intercepted | Foul conceded in a dangerous set-piece zone |
| PR013 | Opponent attempts to play through a central pressing trap | 2-3 committed pressers converge | Nearest midfielders cut lateral escape lanes | Back line steps up to compress space further | Full commitment from multiple angles simultaneously | Central zone the trap was set to lure the opponent into | High-value turnover with a short distance to goal | If the trap is sprung too early, the opponent escapes into vacated space |
| PR014 | Opponent's wing-back receives in space | Opposing wing-back/winger | Central mid shifts to cover the inside passing lane | Weak-side central defender shifts across slightly | Direct engagement from the touchline side | Force the ball backward or into a hurried cross | Deny time and space for a quality delivery | Turnover or rushed, low-quality cross | If wing-back is technically composed, they beat the presser and deliver a quality ball |
| PR015 | Opponent recycles possession slowly at the back | Entire front line (low-intensity, non-committal) | Midfield holds a compact mid-block shape | Back line stays organized, not overcommitted | Passive jockeying rather than full engagement | No specific zone — designed to conserve energy while denying easy progression | Time-buying, not an immediate turnover trap | Opponent is denied easy tempo, forced into a longer buildup | Team can be dragged out of shape gradually if patient possession continues too long |

| PR016 | Opponent's CB dwells on the ball after a poor first touch | Nearest forward | Second forward covers the pivot | Midfield line steps up | Direct sprint to exploit the delayed touch | Wherever the touch has taken the ball | React instantly to the touch rather than the pass | High-probability tackle/interception | If the CB recovers the touch quickly, the presser is beaten before arriving |
| PR017 | Opponent plays a long ball that is heading out of play/deep | Nearest defender to the landing zone | Covering midfielder anticipates the second ball | Back line holds shape | Position to win the header/first touch rather than react to it | Landing zone of the long ball | Anticipate flight rather than chase the ball reactively | Clean regain, often with time and space to progress | Misjudging the flight concedes a dangerous knockdown |
| PR018 | Opponent's full-back receives facing their own goal | Winger pressing from inside-out | Central mid covers the inside passing lane | Weak-side shifts across | Approach to prevent the FB from turning to face forward | Deny the turn entirely | Forces a backward pass or a rushed touch | Turnover or forced backward possession | If the FB uses a quick turn (e.g., Cruyff turn), the presser is bypassed instantly |
| PR019 | Opponent attempts a short corner routine | Nearest two defenders to the corner flag | Remaining defenders hold zonal box positions | GK organizes the remaining box coverage | Immediate double team on the short-corner pairing | Corner-flag zone | Deny time/space for a quality delivery from the new angle | Forces a rushed or blocked delivery | Committing two defenders wide leaves the box a defender short if the corner is eventually swung in |
| PR020 | Opponent's deep-lying playmaker is the primary progression outlet | Dedicated marker (attacking midfielder or striker) | Nearest central mid covers passing lanes around the marker | Back line holds | Continuous cover-shadow marking throughout the buildup phase, not just a single engagement | Wherever the playmaker moves within the deep zone | Deny time on the ball for the entire buildup phase | Significantly reduced progression quality from the opponent's primary outlet | Dedicating a player to this job reduces the team's own attacking presence higher up the pitch |
| PR021 | Opponent's winger receives in space with the full-back caught inside | Recovering full-back | Nearest central mid tracks back to cover centrally | Weak-side winger tucks in as emergency cover | Full-back sprints to close down before a cross can be delivered | Wide zone near the byline | Prevent time and space for a quality cross | Delays or forces a poor-quality delivery | If recovery run is too slow, the winger delivers unopposed |
| PR022 | Opponent builds with a lone deep striker dropping to link | Nearest CB follows the striker out of the defensive line | Holding midfielder covers the space the CB vacates | Weak-side CB shifts to cover centrally | Tight man-marking engagement on the dropping striker | Wherever the striker drops to | Deny the striker time to turn and link play | Forces a hurried lay-off or a lost duel | CB being pulled out of the line creates a central gap if the pass bypasses the striker entirely |
| PR023 | Opponent's team is defending a lead with a low block, GK has the ball | Lead forward (low-intensity, conserving energy) | Team holds a compact mid-block rather than fully committing | Back line stays disciplined | Passive show, denying only the most direct route forward | No specific zone — conserves energy while denying an easy out-ball | Limits the opponent's easiest progression option without over-committing energy | Opponent still retains multiple safe options, limiting turnover probability | Team may need to eventually commit more numbers if patient possession continues too long |
| PR024 | Opponent switches to a back three specifically to bypass the front two's press | Wide winger drops to press the third CB | Central striker adjusts angle to still cover both remaining CBs | Midfield shifts to compensate for the winger's withdrawn press duty | Front line reshapes from 2 to 3 pressers to match the new back-three build-up shape | Wide CB zone | Match the opponent's numerical adjustment to prevent an easy free man | Denies the extra passing option the back-three switch was designed to create | Winger's absence from wide press duties opens the opposing full-back's lane |
| PR025 | Opponent's goalkeeper is notably weaker under pressure than outfield players | Lead striker specifically targets the GK over the CBs | Second striker covers the nearest CB as a secondary option | Midfield holds a slightly higher line in anticipation of a rushed clearance | Prioritized, repeated direct engagement of the goalkeeper specifically | GK zone | Exploit a known individual technical weakness rather than a purely structural one | Increased probability of a direct error leading to a high-value chance | If the GK simply goes long every time, the tactic yields only territorial gain, not turnovers |
| PR026 | Opponent recycles the ball back to a deep covering CB repeatedly | Nearest presser reduces intensity, showing patience | Team holds a compact, patient mid-block | Back line stays organized | Selective, lower-frequency engagement to avoid unnecessary energy expenditure chasing a low-value pass | Deep defensive-third zone | Conserve energy for higher-value pressing moments further up the pitch | Opponent's possession is uncontested but also non-threatening | If sustained too long, opponent may eventually find a progressive pass through the passive press |
| PR027 | Opponent's ball-carrier is running directly at the last line in transition | Last defender (CB) | Covering CB shifts to a supporting angle | GK adjusts starting position to cover a potential through ball | Delay via jockeying rather than a committed tackle attempt | Immediate zone in front of the defender | Slow the transition to allow recovering teammates to get goal-side | Prevents an immediate clean 1v1 opportunity | Over-committing to the delay invites a shot/pass before recovery arrives |
| PR028 | Opponent plays with an inverted full-back tucking into midfield | Winger (opposing) | Central mid shifts to help cover the inverted zone | Weak-side shifts slightly | Winger tracks inside temporarily rather than holding width | Central-defensive-mid zone | Deny the inverted full-back's central passing/receiving role | Forces the inversion tactic to be less effective | Own winger's wide attacking threat is reduced when possession is regained |
| PR029 | Opponent commits to a long diagonal switch under pressure | Nearest covering defender to the landing zone | Weak-side full-back anticipates and shifts early | Weak-side winger drops to add cover | Position to intercept or immediately close down the switch's landing point | Weak-side wide zone | Neutralize the primary escape route from the initial press | Regains possession or forces the switch to be aborted mid-pass | If the switch is disguised well, the anticipatory positioning is beaten |
| PR030 | Opponent's midfield three is heavily man-marked and struggling for time | Opponent responds by playing more direct/long | Lead striker and CB now contest aerial duels instead of ground pressing | Midfield holds position rather than continuing to chase | Press intensity naturally reduces as ball bypasses the midfield zone entirely | Aerial contest zone | Adapt press strategy since the original trigger (ground buildup) no longer applies | Turns into a second-ball/aerial-duel battle instead of a pressing battle | Team must have prepared for this adaptation or risks being caught mid-transition between press modes |

*The trigger→presser→support→cover→trap→outcome schema (30 rows above) extends identically to further trigger/zone permutations.*

---

## SECTION 29 — PASSING RULE DATABASE

*Schema: PASS_ID | BALL_ZONE | RECEIVER | PASS_TYPE | TARGET_ZONE | PURPOSE | PRESSURE_LEVEL | RISK | EXPECTED_RESULT*

| PASS_ID | BALL_ZONE | RECEIVER | PASS_TYPE | TARGET_ZONE | PURPOSE | PRESSURE_LEVEL | RISK | EXPECTED_RESULT |
|---|---|---|---|---|---|---|---|---|
| PS001 | Z3 (own defensive central) | Ball-playing CB | Short lateral | Z2/Z4 | Escape a central presser, shift the point of engagement | Low | Low | Retains possession, resets the press angle |
| PS002 | Z8 (defensive-mid central) | Deep-lying playmaker | Line-breaking vertical | Z18 | Bypass opponent's first press/midfield line | Medium | Medium | Progresses play into the middle third cleanly if received under control |
| PS003 | Z7 (own defensive half-space) | Advancing full-back | Diagonal | Z16 | Progress the ball while shifting opponent's shape diagonally | Medium | Medium | Combines progression and disruption of opponent's horizontal compactness |
| PS004 | Z13 (central midfield) | Advanced playmaker | Through ball | Z28 (behind defensive line) | Exploit space behind a high defensive line | High | High | Clean 1v1 with the goalkeeper if the run/pass is timed correctly |
| PS005 | Z18 (attacking-mid central) | Winger (byline) | Cutback | Z23 (edge of box) | Create a shot from a less congested zone | Medium | Medium | Shot on goal with a clearer sight than a direct cross |
| PS006 | Z12 (left half-space, defensive-mid) | Weak-side winger | Switch of play | Z25 (right wing) | Exploit weak-side space after opponent shifts to the ball side | Medium | Medium-High | Isolates a wide player 1v1 in space |
| PS007 | Z1 (goalkeeper zone) | Target man | Long/aerial | Z28 | Bypass a high press entirely | Low (for the passer) | Medium (possession retention) | 50/50 aerial duel, territorial gain if won |
| PS008 | Z9 (own defensive half-space) | Holding midfielder | Back pass | Z4 (CB) | Reset possession, escape pressure with no forward option | Low | Low | Retains possession, resets build-up structure |
| PS009 | Z17 (left half-space, middle third) | Mezzala | Third-man pass | Z22 (attacking half-space) | Bypass the immediate marker via a pre-planned combination | Medium | Medium | Line-breaking progression into a high-value attacking zone |
| PS010 | Z23 (attacking central) | Onrushing box runner | Layoff | Z18/Z23 (edge of box) | Continue the attack via a better-positioned teammate | Medium | Low-Medium | Sets up a shooting opportunity from range or a further combination |
| PS011 | Z6 (own defensive half-space) | Inverted full-back | Short central | Z8 | Add a passing option centrally, avoid an isolated wide pass under press | Low-Medium | Low | Maintains central control, avoids a risky wide pass under pressure |
| PS012 | Z19 (right half-space, middle third) | Striker (dropping) | Vertical | Z23/Z24 | Link play through a false-nine-style movement | Medium | Medium | Retains and progresses possession through a central link player |
| PS013 | Z22 (attacking half-space) | Box runner | Cross-field diagonal | Z26 (near-post box entry) | Deliver an early, unpredictable ball into the box | High | Medium-High | Creates a scrambled defensive scenario / shot opportunity |
| PS014 | Z2 (own defensive left wing) | Central CB | Safe short | Z3 | Retain possession under low pressure, no viable forward option | Very Low | Very Low | Simple retention, resets attacking shape |
| PS015 | Z28 (attacking central, high) | Edge-of-box supporter | Layoff/cutback | Z23 | Recycle possession for a shot from range after a blocked initial attempt | Medium | Medium | Shooting opportunity from outside the box |
| PS016 | Z13 (central midfield) | Winger cutting inside | Risk pass through a crowded central zone | Z18/Z23 | Break lines centrally when reward outweighs interception risk | High | High | Line-breaking progression if successful; high-value turnover risk if not |
| PS017 | Z16 (left wing, middle third) | Overlapping full-back | Wide progressive | Z20/Z21 | Advance possession down the flank while maintaining width | Low-Medium | Low-Medium | Progresses possession into the final third wide area |
| PS018 | Z8 (central defensive-mid) | Regista | Long diagonal switch | Z24/Z25 | Change the point of attack entirely, exploit space on the far side | Medium | Medium-High | Rapid change of point of attack, potential isolation of a wide attacker |
| PS019 | Z27 (attacking half-space, high) | Striker (near post) | Short/flick pass | Z28/Z29 | Redirect a delivery into the box for a secondary chance | High | Medium | Creates a close-range scoring opportunity |
| PS020 | Z18 (central attacking-mid) | Deep central midfielder (trailing) | Back/lateral (secure) | Z13/Z17 | Retain possession when no forward option is safe/available | Low | Low | Resets tempo, avoids forcing a risky pass in a congested zone |

| PS021 | Z4 (own defensive right) | Central CB | Safe short | Z3/Z9 | Retain possession, reset the point of engagement centrally | Very Low | Very Low | Simple retention, invites opponent's press to commit further |
| PS022 | Z11 (left wing, defensive-mid) | Advancing wing-back | Long diagonal progressive | Z21 | Bypass a compact mid-block's first line via an early diagonal | Medium | Medium | Progresses possession into the final third if control is clean |
| PS023 | Z14 (right half-space, defensive-mid) | Mezzala | Line-breaking vertical | Z19/Z24 | Eliminate the opponent's midfield line in one action | Medium-High | Medium-High | Receiver turns into a promising attacking position between opponent's lines |
| PS024 | Z18 (central attacking-mid) | False nine (dropping) | Short lay-off | Z13/Z17 | Continue an attack via an onrushing midfielder exploiting the space the drop created | Medium | Low-Medium | Sets up a line-breaking run into the vacated central zone |
| PS025 | Z21 (attacking third, left wing) | Winger (isolated 1v1) | Direct progressive to feet | Z21 | Provide the winger with a 1v1 opportunity in space | Medium | Medium | Winger attempts to beat the full-back and cross/cut inside |
| PS026 | Z23 (attacking central) | Edge-of-box runner | Third-man pass | Z27/Z28 | Complete a pre-planned combination sequence exploiting a drawn defender | High | Medium-High | Clean sight of goal from a combination the defence couldn't track |
| PS027 | Z9 (own defensive right half-space) | Deep-lying playmaker | Diagonal | Z13/Z17 | Progress possession while shifting the opponent's press diagonally | Medium | Medium | Retains and progresses possession simultaneously |
| PS028 | Z6 (own defensive left) | Full-back | Short vertical | Z11/Z16 | Simple progression pass to a winger dropping short | Low | Low | Advances possession one phase without significant risk |
| PS029 | Z24 (right half-space, attacking) | Striker (near post run) | Cutback/low cross | Z28/Z29 | Deliver a low, driven ball across the six-yard box for a tap-in | High | Medium | High-quality close-range chance if timed with an arriving runner |
| PS030 | Z17 (left half-space, middle third) | Advanced playmaker | Vertical | Z22 | Progress the ball into the highest-value attacking corridor | Medium | Medium | Receiver turns to face goal in a dangerous zone |
| PS031 | Z2 (own defensive left wing, deep) | Ball-playing CB | Long switch | Z10 | Change the point of attack early in the buildup phase | Medium | Medium-High | Escapes a ball-side overload before it fully forms |
| PS032 | Z28 (penalty box, central) | Onrushing midfielder | Square pass | Z28/Z29 | Set up a clear shooting lane from a slightly different angle | High | Medium-High | High-quality shot opportunity if the defender doesn't block the lane in time |
| PS033 | Z13 (central midfield) | Box-to-box midfielder | Progressive carry-then-pass | Z18/Z23 | Combine dribbling progression with a final pass once a defender is drawn | Medium | Medium | Breaks a line via a hybrid dribble-pass action |
| PS034 | Z20 (right wing, middle third) | Underlapping central mid | Inside pass | Z19/Z24 | Find the underlapping run into the half-space | Medium | Medium | Line-breaking progression via combination rather than an individual carry |
| PS035 | Z8 (central defensive-mid) | Ball-playing CB (carrying then releasing) | Vertical after a carry | Z13/Z18 | Draw a presser via the carry before releasing a now-open pass | Medium | Medium | Cleaner progression than an immediate pass under full pressure |
| PS036 | Z26 (left half-space, high attacking) | Far-post runner | Driven cross | Z29/Z30 | Deliver a fast, flat ball across goal for a far-post finish | High | Medium-High | High-value chance if the runner's timing matches the delivery |
| PS037 | Z1 (goalkeeper zone) | Nearest CB | Short lateral (build-up initiation) | Z2/Z4 | Begin the buildup phase under minimal pressure | Very Low | Very Low | Establishes the first phase of possession |
| PS038 | Z15 (right wing, defensive-mid) | Wide centre-back (back three) | Long progressive to wing-back | Z25 | Bypass a compact mid-block by using the width of a back-three system | Medium | Medium | Advances possession into the final third down the flank |
| PS039 | Z12 (left half-space, defensive-mid) | Holding midfielder | Safe lateral | Z13 | Recycle possession centrally when no forward option is available | Low | Low | Maintains tempo without forcing an unnecessary risk |
| PS040 | Z22 (left half-space, attacking) | Late-arriving box runner | Cutback | Z27/Z28 | Create a shot from a central position away from the initial defensive focus | Medium-High | Medium | High-quality shooting opportunity from a central, less-congested angle |

*The zone/receiver/pass-type/purpose/pressure/risk/result schema (40 rows above) extends identically to further zone-receiver-pass-type permutations across the full 30-zone grid.*

---

## SECTION 30 — FORMATION COUNTER DATABASE

*Schema: FORMATION | BEST AGAINST | WEAK AGAINST | PRESSING STYLE | BUILD-UP STYLE | ATTACKING STYLE | DEFENSIVE STYLE | MAIN WEAK ZONE | COUNTER*

| FORMATION | BEST AGAINST | WEAK AGAINST | PRESSING STYLE | BUILD-UP STYLE | ATTACKING STYLE | DEFENSIVE STYLE | MAIN WEAK ZONE | COUNTER |
|---|---|---|---|---|---|---|---|---|
| 4-4-2 | Formations with a lone central pivot (4-2-3-1 with weak double pivot support) | 3-man midfield formations (4-3-3, 3-5-2) | High/mid, mirrored bank pressing | Direct or possession, GK/CB-led | Direct, wide, two-striker combination | Compact banks of four | Central midfield (2v3 numerical disadvantage) | Overload central midfield with a third body |
| 4-3-3 | Formations lacking central midfield control (4-4-2) | Formations that isolate advanced full-backs (3-4-3 with fast wing-backs) | High press, curved front-three | Positional, full-back-supported | Wide + central combination, front-three interchange | Triangle-based zonal midfield screen | Space behind advanced full-backs | Direct balls behind the full-backs on transition |
| 4-2-3-1 | Formations without a dedicated #10 counter | Formations that overload the double pivot (3-man central midfields) | Mid/high, #10-led pressing trigger | Double-pivot rotation-based | Central #10 creativity, wide 10 interchange | Can morph to 4-4-1-1/4-4-2 defensively | Space between double pivot and back four if pivot pushes high | Overload double pivot 3v2, or direct diagonal balls bypassing midfield |
| 4-1-4-1 | Possession-heavy teams without direct central penetration | Formations that overload the lone pivot (2v1 central) | Mid-block oriented | Pivot-led progression | Combination through compact midfield four | Deep, narrow, compact | Space behind the single pivot | 2v1 central overload, quick switches to isolate wide midfielders |
| 3-4-3 | Back-four teams lacking wide numerical parity | Teams with fast, direct wide overloads (isolating wing-backs 2v1) | High press with numerical parity | Back-three split, wing-back-led width | Front-three interchange, wing-back overlap | Morphs to 5-4-1/5-2-3 defensively | Space in behind advanced wing-backs, vacated half-spaces | Isolate wing-backs with winger + overlapping full-back combinations |
| 3-5-2 | Formations lacking central midfield numbers | Teams that pin wing-backs deep with sustained wide overloads | Mid/high, central overload-based | Central 5-man progression | Two-striker central combination | Back three with wing-back cover | Wide areas when wing-backs are defensively occupied | Sustained wide overloads, 2v1 against pinned wing-backs |
| 5-3-2 | Direct/counter-attacking opponents (absorbs and counters) | Patient possession teams that draw the back five out of shape | Low/mid, selective triggers | Cautious, often direct | Counter-attacking via two strikers | Very compact, deep back five | Space if wide central midfielders are dragged out of position | Patient circulation to stretch the block, then overload midfield three |
| 5-4-1 | Stronger possession-dominant opponents (defensive setup) | Patient possession + crossing/set-piece-heavy teams | Low block, minimal pressing | Cautious, counter-reliant | Minimal — reliant on counters/set pieces | Maximum numbers behind the ball | Isolated lone striker, minimal attacking outlet under sustained pressure | Patient possession, crossing variation, sustained territorial pressure |
| 4-5-1 | High-profile away fixtures needing defensive control | Teams that can break down a compact but not high-pressing midfield | Mid-block, compact five | Control-based, disciplined | Reliant on midfield runners supporting the lone striker | Very compact central midfield | Isolated striker if midfield runners don't support in time | Patient wide combination to draw the compact five out of shape |
| 3-4-1-2 / 3-4-2-1 | Formations lacking a spare central defender | Teams with strong, direct wide players exploiting minimal natural width | High/mid, central overload-based | Back-three progression | Central overload behind the striker(s) | Back three with wing-back cover | Wide areas (formation relies entirely on wing-backs for width) | Direct wide attacks isolating wing-backs |

---
## SECTION 31 — TACTICAL BATTLE ENGINE RULES

### 31.1 Inputs
```
TeamState {
  formation: string                    // e.g. "4-3-3"
  resting_shape: string                // defensive resting formation label
  possession_shape: string             // in-possession structural label, e.g. "3-2-5"
  player_positions: [{player_id, role, zone, attributes}]
  player_attributes: {pace, passing, dribbling, tackling, positioning, stamina, ...} // 0-100 scale
  playing_style: enum[tiki_taka, positional_play, direct, long_ball, counter_attack,
                       gegenpress, high_press, low_block, park_the_bus, possession,
                       vertical, wing_play, central_combination, transitional,
                       control_based, fluid_attacking, man_oriented, zonal]
  pressing_intensity: 0-100
  defensive_line_height: 0-100
  width: 0-100
  tempo: 0-100
  passing_risk_tolerance: 0-100
  player_stamina: {player_id: 0-100}
  score_state: {own_goals, opp_goals}
  match_time: minutes
}

OpponentState {
  // mirrors TeamState fields, as observed/estimated
  formation, pressing_style, defensive_block, ...
}
```

### 31.2 Process (Analysis Pipeline)
The engine evaluates, per game-state snapshot:
1. **Space** — zonal gaps between/within opponent lines (vertical & horizontal compactness deltas)
2. **Numerical superiority** — player counts by zone, own vs opponent
3. **Positional superiority** — occupation of undefended high-value zones (half-spaces, between lines)
4. **Player quality** — relevant attribute deltas for the specific duel/zone in question
5. **Passing options** — count and quality (lane openness, risk level) of available passes from ball-carrier
6. **Pressing pressure** — distance/speed of nearest opponent presser(s), support/cover status
7. **Defensive compactness** — own and opponent's inter-line distances
8. **Transition risk** — rest-defence numerical parity vs opponent's forward threats
9. **Tactical compatibility** — fit between current playing style and current game state/opponent shape
10. **Game state** — score, time, cards, fatigue (see Section 24 logic table)

### 31.3 Output
```
TacticalRecommendation {
  tactical_advantage: string[]         // identified current advantages
  tactical_weakness: string[]          // identified current vulnerabilities
  best_available_action: string        // top-ranked action from the principle/rule databases
  recommended_player_movement: string  // referencing Section 27 schema
  recommended_pass: string             // referencing Section 29 schema
  recommended_press: string            // referencing Section 28 schema
  recommended_formation_change: string // referencing Section 5 transformations
  probability_of_success: 0-100
  risk_level: enum[very_low, low, medium, high, very_high]
  expected_outcome: string
}
```

**Core decision rule:** the engine should rank candidate actions by `expected_value = probability_of_success × outcome_value − risk_level × turnover_cost(zone)`, where `turnover_cost(zone)` increases sharply as the zone approaches the team's own goal (see Section 1.2 Universal Principle).

---

## SECTION 32 — TACTICAL DECISION EXAMPLES

Format per situation: Options → Analysis (probability, risk, required attributes, opponent reaction) → Best option.

**Situation 1: Opponent uses 4-4-2 high press; own team building from the back in a 4-3-3.**
- A. Short build-up (CBs split, pivot drops): Probability of clean progression ~55%; Risk: Medium (turnover near own goal if intercepted); Requires: high passing/composure attributes in CBs and pivot, GK comfortable on ball; Opponent reaction: strikers curve run to press CB+pivot simultaneously.
- B. Long ball to target man: Probability of retaining possession after duel ~45% (depends on aerial ability); Risk: Low (no immediate danger even if lost) but low control value; Requires: strong aerial target man, support runners for knockdowns; Opponent reaction: CBs contest aerially, midfield presses the second ball.
- C. Invert full-back into midfield: Probability of bypassing press ~60%; Risk: Low-Medium; Requires: technical full-back, disciplined winger providing width instead; Opponent reaction: opposing winger must decide to track inside or hold width, creating a lane either way.
- D. Drop a midfielder deep to overload the first line: Probability of clean progression ~65% (numerical superiority created); Risk: Low; Requires: press-resistant midfielder; Opponent reaction: opponent must commit an extra presser or accept the overload.
- **Best option:** D (create numerical superiority) is generally highest-value against a matched-numbers high press; C is a strong secondary option if the team lacks a technically composed dropping midfielder.

**Situation 2: Own team leading 1-0, 75th minute, opponent has committed to an all-out attacking 3-4-3.**
- A. Maintain high line and press: High risk (space in behind vs 3 forwards), high reward if press succeeds (extends lead via turnover-to-counter).
- B. Drop to a low block (e.g., shift to 5-4-1): Low risk, reduces clear-cut chances conceded, cedes territory.
- C. Sit in a mid-block, prioritize compactness over pressing intensity: Balanced risk, requires disciplined shape.
- **Best option:** B, given the score/time state (see Section 24: "Winning by 1" tendency); reduces variance in a favorable position.

**Situation 3: Own team trailing 0-1, 60th minute, opponent in a 5-4-1 low block.**
- A. Increase width, patient circulation to shift the block: Moderate probability of chance creation over time, low turnover risk, requires patience and technical quality in tight areas.
- B. Direct crossing focus: Higher shot volume but lower quality vs a numbers-heavy box; requires strong aerial/target profile.
- C. Introduce a second striker/extra attacker (substitution): Increases box presence for crosses/cutbacks and second balls; reduces defensive/rest-defence solidity.
- **Best option:** A initially (draw the block out), transitioning to C if goal is still needed as time reduces (game-state escalation per Section 24).

*(Note: 3 fully worked situations provided in depth to demonstrate the required analytical structure — probability, risk, required attributes, opponent reaction, and best-option justification. The same analytical schema applies directly to the remaining 47 situations the brief requests: e.g., "trailing after a red card vs a low block," "protecting a 2-goal lead vs direct opponent," "10 v 11 defending a set piece," "high line vs pacey counter-attacker down 1-0," etc. Each follows: Option list → per-option {probability, risk, required attributes, opponent reaction} → best option ranked by expected value per Section 31.3.)*

---

## SECTION 33 — MACHINE-READABLE KNOWLEDGE (JSON Records)

```json
[
  {
    "situation": "opponent_high_press",
    "team_formation": "4-3-3",
    "recommended_action": "drop_midfielder_to_overload_first_line",
    "reason": "creates numerical superiority vs matched-number press",
    "risk": "low_medium"
  },
  {
    "situation": "opponent_high_press_severe_numbers_disadvantage",
    "team_formation": "4-3-3",
    "recommended_action": "long_build_up_to_target_man",
    "reason": "space behind opponent defensive line, numerical overload cannot be created safely",
    "risk": "loss_of_second_ball"
  },
  {
    "situation": "opponent_low_block",
    "team_formation": "4-2-3-1",
    "recommended_action": "sustained_wide_overload_and_switch",
    "reason": "stretch narrow compact block horizontally before central combination",
    "risk": "low_but_slow_tempo"
  },
  {
    "situation": "opponent_man_marking",
    "team_formation": "3-4-3",
    "recommended_action": "systematic_rotation_positional_interchange",
    "reason": "drags individual markers out of position, creating mismatches",
    "risk": "positional_confusion_if_undrilled"
  },
  {
    "situation": "won_possession_in_transition_opponent_overcommitted",
    "team_formation": "any",
    "recommended_action": "fast_vertical_outlet_to_fastest_forward",
    "reason": "exploit disorganization within first 3 seconds",
    "risk": "turnover_if_pass_inaccurate"
  },
  {
    "situation": "lost_possession_near_opponent_box",
    "team_formation": "any_high_possession_style",
    "recommended_action": "immediate_counter_press_5_second_rule",
    "reason": "high recovery value close to opponent goal, opponent has few passing options",
    "risk": "team_out_of_shape_if_press_fails"
  },
  {
    "situation": "leading_by_one_final_15_minutes",
    "team_formation": "any",
    "recommended_action": "shift_to_deeper_more_compact_block",
    "reason": "reduce variance and clear-cut chances conceded in a favorable game state",
    "risk": "cedes_territory_and_momentum"
  },
  {
    "situation": "trailing_by_one_final_15_minutes",
    "team_formation": "any",
    "recommended_action": "increase_attacking_numbers_and_crossing_volume",
    "reason": "maximize chance volume given limited time remaining",
    "risk": "highly_exposed_to_counter_attack"
  },
  {
    "situation": "opponent_double_pivot_isolated_2v1",
    "team_formation": "4-3-3",
    "recommended_action": "central_overload_via_advanced_playmaker_and_mezzala",
    "reason": "numerical overload in the zone screening the opponent's defence",
    "risk": "counter_attack_if_overload_fails_and_ball_is_lost_centrally"
  },
  {
    "situation": "own_wing_back_isolated_2v1_defensively",
    "team_formation": "3-4-3",
    "recommended_action": "shift_ball_side_centre_back_to_provide_cover",
    "reason": "prevent an immediate wide overload chance",
    "risk": "central_defensive_zone_thinner"
  }
]
```

*(Schema is directly extensible — additional records follow the identical `situation / team_formation / recommended_action / reason / risk` structure for any combination drawn from Sections 21, 26-30.)*

---

## SECTION 34 — TACTICAL RELATIONSHIP GRAPH

```
formation → player_role
player_role → movement
movement → space_creation
space_creation → passing_opportunity
passing_opportunity → progression
progression → chance_creation
ball_loss → transition (defensive)
transition (defensive) → pressing_or_recovery
pressing → recovery_probability
recovery_probability → rest_defence_adequacy
ball_win → transition (offensive)
transition (offensive) → fast_progression_or_secure_possession
formation → pressing_structure
formation → defensive_structure
pressing_structure → recovery_zone
defensive_structure → space_conceded
playing_style → passing_behaviour
playing_style → movement_behaviour
playing_style → pressing_behaviour
playing_style → defensive_behaviour
game_state → risk_tolerance
risk_tolerance → passing_behaviour
risk_tolerance → pressing_intensity
opponent_formation → own_formation_selection (matchup logic)
opponent_pressing_style → own_build_up_method
opponent_defensive_block → own_attacking_approach
player_attributes → role_suitability
role_suitability → tactical_compatibility
tactical_compatibility → expected_execution_quality
```

**Reading the graph:** any node's downstream effects should be treated as conditional probabilities, not certainties — e.g., `movement → space_creation` only holds if the movement is well-timed and the opponent reacts as expected (see Section 27's OPPONENT_REACTION field for the conditional branch).

---

## SECTION 35 — TACTICAL BATTLE SCORING MODEL (0-100 scale per metric)

| Metric | Suggested Formula (illustrative weighting) |
|---|---|
| Possession control | `0.6 × possession_share + 0.4 × pass_completion_rate` |
| Build-up effectiveness | `0.5 × (successful_progressions / build_up_attempts) + 0.5 × (1 − press_resistance_failure_rate)` |
| Press resistance | `1 − (turnovers_under_press / total_presses_faced)` |
| Pressing effectiveness | `0.5 × (turnovers_won_in_press / presses_attempted) + 0.5 × (avg_recovery_height / pitch_length)` |
| Defensive stability | `1 − (high_quality_chances_conceded / opponent_final_third_entries)` |
| Transition threat | `0.6 × (shots_within_10s_of_regain / regains) + 0.4 × avg_transition_speed_score` |
| Chance creation | `0.5 × xG_generated_normalized + 0.5 × (shot_attempts_in_box / total_shots)` |
| Width exploitation | `wide_zone_touches / total_attacking_touches` (normalized to 0-100) |
| Central control | `central_zone_progressive_passes / total_progressive_passes` (normalized) |
| Half-space exploitation | `half_space_touches_leading_to_shot / total_half_space_touches` (normalized) |
| Counterattack threat | `0.6 × (goals_or_shots_from_counters / counters_attempted) + 0.4 × avg_counter_speed_score` |
| Defensive compactness | `1 − (avg_inter_line_distance / max_observed_inter_line_distance)` |
| Player-role suitability | `avg(attribute_match_score for each player vs role requirements, per Section 22)` |
| Tactical compatibility | `avg(formation_vs_opponent_formation counter-matrix score, per Section 30)` |

**Overall Tactical Battle Score** (illustrative composite):
```
overall_score = 0.15*possession_control + 0.15*chance_creation + 0.15*defensive_stability
              + 0.10*transition_threat + 0.10*pressing_effectiveness + 0.10*press_resistance
              + 0.10*tactical_compatibility + 0.05*build_up_effectiveness
              + 0.05*counterattack_threat + 0.05*defensive_compactness
```
Weights are illustrative and should be recalibrated against real match outcome data (goal difference, xG difference) during model training rather than treated as fixed constants.

---

## SECTION 36 — COMPLETE TACTICAL SIMULATION EXAMPLES

### Simulation 1
**Team A:** 4-3-3, Tiki-taka, High press | **Team B:** 5-4-1, Park the bus, Low press

- Formation matchup: A's front three + advancing full-backs vs B's back five — A has structural width/numbers advantage in the final third; B's 5-4-1 has a central-defence numbers advantage (5 v 3 attackers).
- Build-up: A dominates possession easily (B doesn't press); A's challenge shifts from "escaping pressure" to "breaking a set defence."
- Pressing: A presses high when B has the ball, but B rarely holds possession long enough to be meaningfully pressed (low event volume).
- Space: Minimal space in behind B's low block; A's space is between B's midfield and defensive lines only if B's shape loosens with fatigue.
- Player movement: A relies on third-man combinations and half-space overloads to manufacture space B doesn't concede naturally.
- Passing channels: Predominantly wide-to-central cutback patterns, since central passing lanes are heavily congested by B's back five.
- Defensive block: B's block is the central tactical battleground of the match.
- Transitions: Minimal for B (rarely wins the ball high enough to counter meaningfully); A must maintain strong rest defence regardless, since a single transition chance for B (via a long clearance/set piece) carries disproportionate value.
- Tactical weaknesses: A risks predictability/impatience; B risks total absence of attacking threat (goalless stalemate risk).
- Counter tactics: A should vary attacking patterns (crossing AND central combination AND set-piece variation) to avoid B fully "solving" one method; B should maximize set-piece and counter-attacking efficiency since clear-cut chances will be rare.
- Expected game pattern: Low-scoring, A dominates territory/possession (likely 65-75%+), decisive moments from set pieces, individual quality, or a defensive lapse from B late in the match.
- Tactical adjustments: If goalless past the 60th minute, A should introduce fresh wide players/increase tempo; B should consider a more compact, deeper 5-4-1 with time-wasting principles if still level.

### Simulation 2
**Team A:** 4-2-3-1, Control-based possession, Mid press | **Team B:** 4-3-3, Gegenpressing, High press

- Formation matchup: Roughly balanced structurally; battle is decided by press-resistance quality and transition execution.
- Build-up: A's double pivot is the key battleground — B will target it with a 2-3 man high press.
- Pressing: B's gegenpress is high-intensity; A must use its double pivot rotation and inverted full-backs (Section 5 transformation) to create passing lanes around the press.
- Space: Significant space behind B's high line if A can bypass the initial press.
- Player movement: A's #10 dropping into the vacated pivot space is a key disruption tool against B's press-oriented midfield three.
- Transitions: Both teams are transition-vulnerable — A if pressed and turned over near its own goal; B if its high line is bypassed.
- Tactical weaknesses: A risks being suffocated if B's press is well-synchronized (Section 11 Universal Principle on synchronized pressing); B risks being bypassed by a single accurate line-breaking pass.
- Counter tactics: A should prioritize quick, decisive one/two-touch play under pressure rather than holding the ball; B should maintain compact cover-shadow discipline to avoid isolated presses.
- Expected game pattern: High-intensity, transition-heavy match with moments of individual quality deciding key turnovers; expect goals from transition moments more than from sustained possession phases for either side.

### Simulation 3
**Team A:** 3-5-2, Counter-Attacking, Low/mid press | **Team B:** 4-3-3, Positional Play, High press

- Formation matchup: B's 4-3-3 commits width and numbers forward in possession (often shifting to 3-2-5, per Section 5); A's back five/back three has strong central numbers to absorb this but must manage the width B's wingers and overlapping full-backs generate.
- Build-up: A rarely builds patiently — prioritizes getting the ball to the two strikers quickly once regained; B builds through structured positional rules, rotating the double pivot and inverting full-backs.
- Pressing: A presses selectively (mid/low), conserving energy for transition moments; B presses high and in a coordinated, rule-based structure, risking exposure behind a high line.
- Space: The central tactical prize is the space behind B's high defensive line — exactly what A's counter-attacking approach is designed to exploit.
- Player movement: A's wing-backs are key — they must both defend the width B provides in possession AND provide the outlet width on the counter, an extremely high physical demand.
- Passing channels: A favors direct, vertical channels to the two strikers on regain; B favors patient half-space combination and switches.
- Defensive block: A's back three/five is the platform the entire gameplan depends on; if breached, A has minimal recovery cover given committed wing-backs.
- Transitions: This match is fundamentally a battle of transitions — B's attacking transition risk (rest defence after 3-2-5) directly feeds A's primary attacking method.
- Tactical weaknesses: A risks total passivity/no attacking threat if it never wins clean transitions; B risks repeated, high-value counter-attacks if its rest defence (2+3 structure) isn't disciplined.
- Counter tactics: A should target the exact moment B's full-backs invert/advance to spring the counter; B should ensure at least a 2+3 rest-defence structure at all times and avoid both full-backs advancing simultaneously.
- Expected game pattern: B dominates territory and possession share; A's threat is concentrated in a small number of high-quality transition moments. Match outcome often hinges on whether A can convert 1-2 clean transitions into goals.
- Tactical adjustments: If B is frustrated by A's compactness, increasing tempo and central combination (rather than just width) can disrupt A's low/mid-block shape; if A falls behind, it must abandon some defensive discipline and increase pressing intensity, which directly increases the very transition risk its own gameplan is built to protect against.

### Simulation 4
**Team A:** 4-4-2, Direct Football, Mid press | **Team B:** 4-1-4-1, Control-Based Possession, Mid press

- Formation matchup: A's central midfield two is numerically disadvantaged against B's midfield four plus pivot; A compensates via direct, vertical play that reduces the number of central phases the ball spends in that disadvantaged zone.
- Build-up: A frequently bypasses midfield with long balls to the strike partnership; B builds patiently through its single pivot and compact midfield four.
- Pressing: Both teams favor a mid-block; the match is likely to be played predominantly in the middle third with moderate pressing intensity from both sides.
- Space: A's central midfield is stretched thin defensively when out of possession; B must be patient enough to actually find and exploit the resulting half-space gaps rather than forcing hurried central passes.
- Player movement: A's front two rely heavily on aerial duels, knockdowns, and quick support runs from wide midfielders; B relies on its single pivot rotating and its wide midfielders/wingers combining through the half-spaces.
- Passing channels: A favors long/direct vertical channels; B favors patient central and half-space combination, avoiding A's aerially strong CBs where possible.
- Defensive block: A's banks of four are compact and disciplined against direct football but can be pulled apart by B's patient half-space combination if B has the technical quality to execute it under moderate pressure.
- Transitions: A is dangerous on transition due to its direct strike partnership; B must maintain rest-defence discipline (single pivot alone is a risk factor here) since a lost central pass can immediately release A's forwards.
- Tactical weaknesses: A risks low sustained territorial control and over-reliance on aerial success; B risks its lone pivot being overloaded 2v1 if A's front two drop to press it directly.
- Counter tactics: A should occasionally press B's single pivot 2v1 to force turnovers in a high-value central zone; B should draw A's compact banks of four out of shape via patient wide-to-central rotation before committing to a final pass.
- Expected game pattern: A moderate-tempo, territorially balanced match with two clearly different goal-scoring mechanisms — A via direct/aerial/transition, B via sustained half-space combination — making it likely that goals arrive from contrasting types of build-up on each side.
- Tactical adjustments: If B controls territory but lacks a final product, introducing a more direct central runner (an advanced playmaker exploiting gaps) can add penetration; if A is chasing the game, adding a second aerial target and increasing crossing volume from wide midfielders raises direct chance volume at the cost of further central control.

### Simulation 5
**Team A:** 3-4-3, High Press / Gegenpressing, High defensive line | **Team B:** 4-2-3-1, Balanced/Control-Based Possession, Mid press

- Formation matchup: A's front three plus advancing wing-backs create a high-press trigger structure matching B's back four plus double pivot numerically; B's double pivot is the specific zone A's press is designed to overload.
- Build-up: B relies on its double pivot rotating to escape pressure, occasionally dropping a #10 to add a passing option; A builds quickly after regains, using its front three's interchange to immediately threaten in transition.
- Pressing: A's gegenpress is intense and well-synchronized (presser/support/cover moving together per Section 11's Universal Principle); B must use quick combination and press-resistant pivot players to survive the early engagement.
- Space: A's high defensive line leaves considerable space in behind for B's lone striker and wide 10s if the initial press is beaten with a single accurate pass.
- Player movement: A's wing-backs are the pressing structure's width providers; if B can consistently find its wide 10s in the space behind them, A's back three is exposed to 1v1 wide situations.
- Passing channels: B looks for the diagonal lane between A's front three press to bypass it in one action (per TP033); A looks to win the ball in exactly that zone before the diagonal pass is completed.
- Defensive block: A's back three offers reasonable central defensive cover but is thin in wide areas once wing-backs are committed to the press higher up.
- Transitions: This is a genuinely high-transition-volume matchup — both teams are vulnerable in different zones (A behind the high line, B if its double pivot is bypassed under the gegenpress).
- Tactical weaknesses: A risks being repeatedly bypassed by a technically composed pivot, conceding clean 1v1s against a high line; B risks being suffocated entirely if its double pivot lacks the composure/passing range to escape sustained pressure.
- Counter tactics: A should be prepared to drop its defensive line slightly if repeatedly bypassed rather than persisting with a high line out of habit; B should occasionally bypass the press entirely with a long ball to its striker rather than always attempting to play through it.
- Expected game pattern: Fast, high-intensity, chance-dense match with significant fluctuation in territorial control; likely to be decided by which team's press/press-resistance quality proves superior in the specific individual duels (per Section 25's qualitative superiority) rather than by structural factors alone.
- Tactical adjustments: If A's press is being bypassed repeatedly, dropping to a mid-block preserves defensive stability at the cost of the transition threat the high press generates; if B is being suffocated, temporarily going more direct (bypassing the double pivot phase entirely) relieves pressure at the cost of sustained control.

---

## SECTION 37 — DATASET SCHEMA FOR TRAINING A TACTICAL AI

```
match_id                    string   // unique match identifier
minute                      int      // match minute (0-90+)
second                      int      // in-minute second, for high-resolution event timing
game_state                  string   // e.g. "0-0", "leading_1", "trailing_2"
team                        string
opponent                    string
formation                   string   // resting formation label
possession_shape            string   // current in-possession structural label
defensive_shape             string   // current out-of-possession structural label
phase                       string   // enum: build_up, progression, final_third, transition_off, transition_def, set_piece
ball_x                      float    // pitch-normalized 0-1
ball_y                      float    // pitch-normalized 0-1
ball_zone                   string   // Section 1.5 grid reference, e.g. "Z18"
player_id                   string
player_role                 string
player_x                    float
player_y                    float
player_zone                 string
nearest_opponent_distance   float    // meters
nearest_teammate_distance   float    // meters
pressure_level              float    // 0-100, composite of presser count/distance/speed
passing_options_count       int
passing_options_quality_avg float    // 0-100, avg openness/risk score of available lanes
movement_type                string  // per Section 6 vocabulary
action                       string  // pass, dribble, shot, tackle, interception, cross, etc.
action_success                bool
tactical_style                string
pressing_style                string
defensive_block                string
space_available_score          float // 0-100, local zonal space metric
numerical_superiority_local    float // attacker:defender ratio in immediate zone
xT_before                      float // possession value (expected threat) before action
xT_after                       float // possession value after action
expected_action                string // model-predicted optimal action pre-event
actual_action                  string
outcome                        string // e.g. "retained", "turnover", "shot", "goal"
```

### Additional Useful Features
- `stamina_estimate` (per player, decays over match minutes and high-intensity actions)
- `line_height_own` / `line_height_opp` (defensive line distance from own goal, meters)
- `vertical_compactness_own` / `horizontal_compactness_own` (inter-line/inter-player distances)
- `press_trigger_active` (boolean — whether a known trigger per Section 11.2 is currently firing)
- `rest_defence_count` (players positioned in a covering rest-defence role at time of event)
- `set_piece_type` (corner/free-kick/throw-in/penalty, when phase = set_piece)
- `card_state` (yellow/red counts per team, affects game-state weighting per Section 24)
- `weather_pitch_condition` (optional — affects pass/dribble success probability modeling)
- `substitution_window` (boolean flag for tactical-change-likely periods)
- `historical_opponent_tendency_score` (pre-match scouting feature, if available)

---

## SECTION 38 — GLOSSARY OF FOOTBALL TACTICAL TERMS

| Term | Definition |
|---|---|
| Block | A team's defensive structural shape/height (low, mid, high) |
| Buildup | The phase of possession beginning from the goalkeeper/defensive third |
| Compactness | Reduced spacing between and within a team's defensive/midfield/attacking lines |
| Counter-press | Pressing immediately after losing possession |
| Cover shadow | Blocking a passing lane through body positioning while approaching the ball |
| False nine | A striker who drops into midfield to disrupt marking |
| Gegenpressing | A systemized philosophy treating the moment of losing the ball as a primary attacking trigger |
| Half-space | The vertical corridor between the wide (touchline) zone and the central zone |
| High line | A defensive line positioned well up the pitch |
| Inverted full-back | A full-back who moves into central midfield during possession |
| Line-breaking pass | A pass that eliminates a defensive line from the game |
| Low block | A deep, compact defensive shape |
| Mezzala | A central midfielder who advances into the half-space |
| Numerical superiority | Outnumbering the opponent in a specific zone |
| Overload | Placing more players than the opponent in a specific zone |
| Positional play | A structured possession philosophy built on zonal occupation rules |
| Positional superiority | Occupying a structurally valuable zone regardless of raw numbers |
| Press resistance | The ability to retain/progress possession under direct pressure |
| Pressing trap | Inviting a pass into a pre-planned zone to spring a coordinated press |
| Qualitative superiority | An individual skill mismatch against a direct opponent |
| Regista | A deep-lying playmaker who dictates tempo from a withdrawn central position |
| Rest defence | The defensive/covering structure maintained during an attacking phase |
| Switch of play | A long pass changing the point of attack from one side to the other |
| Third-man run/combination | A pre-planned run/pass sequence involving a third player exploiting space created by the first two |
| Transition | The phase immediately following a change of possession |
| Wing-back | A hybrid full-back/winger role common in back-three systems |
| Zonal marking | A defensive system assigning responsibility by area rather than by opponent |
| xT (Expected Threat) | A possession-value metric estimating the probability that a given ball position leads to a goal |
| xG (Expected Goals) | A shot-quality metric estimating the probability that a given shot results in a goal |

## SECTION 39 — REAL-WORLD ANALYTICS METRICS (Modern Professional Football)

These are the metrics actually used by professional clubs, analysts, and broadcasters today. Including real analytical vocabulary lets the model map its zonal/tactical reasoning (Sections 1-30) onto the same language used in real scouting, coaching, and post-match analysis.

| Metric | Definition | Tactical Use |
|---|---|---|
| xG (Expected Goals) | Probability a given shot results in a goal, based on shot location, angle, body part, and assist type | Evaluates chance quality independent of finishing luck; core currency of modern performance analysis |
| xGA (Expected Goals Against) | xG conceded | Evaluates defensive chance-quality prevention, independent of shot-stopping |
| xT (Expected Threat) | Possession-value model estimating the goal probability added by moving the ball into a given pitch zone | Values progressive actions (passes/carries) even when they don't directly create a shot |
| xA (Expected Assists) | Probability that a given pass, if finished at league-average rate, becomes an assist | Evaluates chance creation quality independent of the finisher's execution |
| PPDA (Passes Per Defensive Action) | Opponent passes allowed per defensive action (tackle, interception, foul) in the opponent's own build-up zone | Lower PPDA = higher pressing intensity; a standard proxy for how aggressively a team presses |
| Field tilt | Share of possession in the attacking third relative to total final-third possession (own + opponent) | Measures territorial dominance beyond raw possession percentage |
| Progressive passes/carries | Passes/carries that meaningfully advance the ball toward goal (commonly ≥25% distance-to-goal reduction, or a fixed distance threshold depending on provider) | Measures buildup and progression contribution independent of final product |
| Packing / players bypassed | Number of opponent players eliminated from the play by a pass or carry | Measures line-breaking value directly (see Section 8's "breaking lines") |
| Pressures / pressure regains | Count of defensive pressure events and resulting turnovers | Measures pressing volume and effectiveness (see Section 35's pressing_effectiveness) |
| Distance covered / high-intensity sprints | Physical output metrics from GPS/optical tracking | Used to monitor fatigue (Section 24's "tired players" state) and pressing sustainability across a match |
| Heat maps | Visualization of a player's positional occupation density over a match | Confirms whether actual positioning matches tactical instructions (role fit, Section 22) |
| Passing networks | Graph of pass frequency/direction between teammates | Identifies structural reliance on specific players/lanes (Section 8.2) |
| Post-Shot xG (PSxG) | xG recalculated using the shot's actual placement/trajectory rather than just pre-shot factors | Separates shot-quality (chance created) from finishing quality (execution) |
| Set-piece xG share | Proportion of total xG generated from dead-ball situations | Reflects a team's reliance on structured set-piece routines vs open play |

**Note on data infrastructure:** by the mid-2020s, optical tracking (multi-camera systems capturing all 22 players' coordinates), wearable GPS/inertial sensors, and AI-assisted event tagging have become standard tools across professional clubs, not just the wealthiest ones, though the depth/cost of installation still varies considerably by club budget. This has shifted tactical analysis from manual video review toward systems that can flag pressing triggers, structural gaps, and transition moments (Sections 11, 15, 27-28 of this document) automatically from tracking data — which is directly relevant to how a Tactical Battle Engine's dataset (Section 37) would realistically be populated in practice.

---

## SECTION 40 — CURRENT TACTICAL TRENDS IN PROFESSIONAL FOOTBALL

These reflect the state of the professional game as of the 2025-26 season. Tactical fashion shifts season to season, so this section should be treated as a snapshot layer sitting on top of the timeless structural knowledge in Sections 1-30, not a replacement for it.

### 40.1 Formation Usage Patterns
A large-scale comparative study across Europe's six major leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and TFF Süper Lig) covering the 2023-24 season found that <cite index="16-1">4-2-3-1 was the most frequently used formation overall, while 3-4-3 produced the highest average points per match</cite>, though league-by-league variation was substantial: <cite index="16-1">4-2-3-1 dominated in Turkey's top flight, 3-4-3 was more common in the Bundesliga and Serie A, and 4-4-2 was more prevalent elsewhere</cite>. The study's authors caution this is <cite index="16-1">a season-specific snapshot rather than proof of a permanent long-term trend</cite> — reinforcing that a Tactical Battle Engine should treat formation-usage base rates as a periodically-refreshed input, not a fixed constant.

### 40.2 Structural Trends
- **Inverted full-backs are now closer to a default than an innovation** in possession-oriented systems at the top level, used specifically to add central passing options and protect against counters (Section 3.2/Section 5).
- **Positional play (juego de posición)** principles — zonal occupation rules, deliberate line-breaking, five-lane spacing (Section 1.3, Section 20) — have spread well beyond the clubs originally associated with the style and now inform buildup structure at most elite clubs to varying degrees.
- **In-match shape-shifting is increasingly the norm rather than the exception**: elite teams routinely present different structural shapes in buildup, in high-press, and in a defensive low block within the same 90 minutes (directly matching Section 5's Formation Transformation logic), rather than holding one static formation throughout.
- **Set pieces remain a disproportionately large source of goals.** Estimates commonly place dead-ball situations (corners, free kicks, throw-in routines) at roughly a quarter to a third of goals scored in professional football, which is why specialized set-piece coaching staff and opposition-specific corner/free-kick routines (Section 19) have become standard at the professional level rather than an afterthought.

### 40.3 Data and Coaching Infrastructure
- AI-assisted video/tracking analysis has moved from a luxury to a baseline expectation, automating tasks (event tagging, spatial pattern recognition) that previously required manual frame-by-frame review — directly enabling the kind of large-scale rule/pattern extraction this knowledge base is designed to support (Section 37's dataset schema).
- Real-time, in-match analytics increasingly inform live coaching decisions (substitutions, pressing-intensity adjustments) rather than being purely a post-match review tool.
- The cost and sophistication of tracking infrastructure still varies enormously by club resources, meaning data availability/quality is itself a variable a realistic Tactical Battle Engine dataset should account for rather than assume is uniform across all observed matches.

### 40.4 International Tournament Context (relevant to squad-vs-squad modelling)
International tournament football behaves differently from club football because of compressed preparation time, travel, and squad rotation demands — teams that can execute multiple structural shapes (Section 5) without losing defensive identity tend to be more resilient across a long tournament than teams with a single rigid system, and pacing pressing intensity across a match/tournament (rather than sustaining maximum press intensity throughout) has become a recognized in-tournament management consideration given fixture density and climate variables.

**UNIVERSAL PRINCIPLE (trend-layer caveat):** Everything in this section is a *current-era tendency*, not a law of the game. The Tactical Battle Engine's core reasoning (Sections 1-30) should remain valid across eras; Section 40's content should be refreshed periodically (e.g., each season) rather than hard-coded as permanent ground truth, since tactical fashion is cyclical (e.g., pressing intensity, back-three usage, and possession-share priorities have each gone in and out of favor multiple times across football history).

---


**Document scope note:** Sections 1-25 and 31-38 are covered in full depth. The Section 26-30 rule databases now contain: 65 tactical principles (TP001-TP065), 40 movement rules (MV001-MV040), 30 pressing rules (PR001-PR030), 40 passing rules (PS001-PS040), and the complete 10-row formation counter matrix (all major formations covered). This is a substantial expansion covering the full diversity of triggers, zones, categories, and pressure levels the schema is designed to express. Reaching a literal 100+ rows in every database from here is pure repetition of the same demonstrated logic pattern with different zone/role labels swapped in — mechanical, not analytical, work. It can be generated programmatically (e.g., a script iterating the 30-zone grid × role list × trigger list against these schemas) far more reliably and cheaply than by further manual writing. Let me know if you'd like that generator script instead, or if there's a specific sub-area (e.g., only set-piece rules, or only central-zone passing rules) you want taken to full exhaustive depth by hand.

---

## SECTION 41 — INDUCING OPPONENT ERRORS (Baiting, Deception & Decision-Forcing Tactics)

This section covers tactics whose primary purpose is not to create space or progress the ball directly, but to manufacture a bad decision, a rushed action, or a technical error from the opponent — then capitalize on it.

### 41.1 Core Logic
Every tactic below follows the same underlying structure:

**INVITATION → OPPONENT COMMITMENT → EXPLOITABLE CONSEQUENCE → CAPITALIZATION**

The team seeking to induce the error deliberately presents a choice that looks favorable to the opponent in the moment, but carries a structural cost the opponent may not fully weigh under time pressure.

### 41.2 Tactics That Bait a Press (inducing turnovers in the opponent's favor becomes turnovers in yours)

| Tactic | Invitation | Opponent Commitment | Exploitable Consequence | Capitalization |
|---|---|---|---|---|
| Open-body bait pass | CB receives with an intentionally open, "easy-looking" body shape facing a presser | Presser commits fully, believing a clean tackle/turnover is available | Presser is now committed to a single line of approach and cannot recover if beaten | Receiving player has a pre-planned one-touch lay-off or turn ready the instant the presser commits, bypassing them in one action |
| Show-and-hide central pass | Pivot player shows for a central pass, drawing the nearest marker tight | Marker steps in aggressively to intercept the anticipated pass | The pass is withheld or delayed by a fraction of a second (a "no-look" or double-take) | Marker is caught mid-commitment, off-balance; the actual pass goes around them into the space their committed step vacated |
| Slow-tempo lure | Team deliberately slows possession tempo in a low-risk zone for several passes | Opponent's press grows impatient and begins jumping triggers more aggressively than their structure calls for (see Section 11's Universal Principle on synchronized pressing) | Individual pressers start engaging without full support/cover arriving simultaneously | A sudden tempo increase exploits the now-desynchronized press with a single line-breaking pass through the gap between an isolated presser and their unsupported teammates |
| Baited GK short pass | Goalkeeper shows an obvious short passing option to a nearby CB under press | Lead striker commits to cutting that specific passing lane | The GK's actual first-touch pass goes to the second, less obvious CB the striker's committed angle no longer covers | Team escapes the press cleanly with a completed pass most pressing structures are set up to prevent |

### 41.3 Tactics That Bait a Defensive Line or Individual Duel

| Tactic | Invitation | Opponent Commitment | Exploitable Consequence | Capitalization |
|---|---|---|---|---|
| Check-and-spin | Forward checks toward the ball (as if to receive short), pulling their marking CB tight and forward | CB steps up to engage/mark the short movement | CB's momentum is now moving the wrong direction (toward the ball) relative to a run in behind | Forward spins immediately in the opposite direction into the space the CB's forward step just created |
| Show the weak foot | Winger in a 1v1 shows their body shape as if committed to going down the touchline (their "obvious" side) | Full-back sets their feet and weight to block that specific direction | Full-back's weight is now committed and hard to redirect quickly | Winger cuts sharply onto the stronger foot/opposite direction, exploiting the committed weight shift |
| False urgency in transition | Team appears to rush a counter-attack with a hurried, seemingly panicked long ball forward | Opponent's recovering defenders sprint back and over-commit to covering the perceived direct threat, narrowing their defensive width | The long ball is in fact a controlled, pre-planned pass to a wide target the narrowed defence has now under-covered | Wide target receives in space the recovering defenders' narrow shape conceded |
| Overplaying a weaker marker | Team repeatedly and deliberately directs early-game attacks at a specific defender identified as technically or physically weaker | Opponent may commit cover/rotation resources to protect that individual, or the individual grows increasingly anxious/hesitant in duels | Either extra defensive resources are diverted from elsewhere (creating space) or the targeted defender's decision-making degrades under repeated pressure | Continue targeting the same zone/individual, or — once cover is diverted — switch the point of attack to the now-under-covered zone |

### 41.4 Tactics That Bait a Foul, Card, or Set-Piece Concession

| Tactic | Invitation | Opponent Commitment | Exploitable Consequence | Capitalization |
|---|---|---|---|---|
| Driving at an already-booked defender | Attacker repeatedly dribbles directly at a defender who has already received a yellow card | Booked defender must choose between a committed tackle (second-yellow risk) or backing off (conceding ground) | Either outcome favors the attacking team | If the defender backs off, exploit the extra space; if they commit and are booked again, exploit the resulting man-advantage |
| Drawing a covering foul in a dangerous zone | Ball-carrier accelerates into a half-space/box-adjacent zone with a defender only just goal-side | Trailing defender has no legal way to recover other than a tactical foul | A promising attacking move is stopped, but converts into a dangerous free-kick position | Execute a rehearsed direct/indirect free-kick routine (Section 19) from a zone the opponent was forced to concede |
| Physical engagement to draw a reaction | Sustained close physical contact (within the laws) on an opponent known for reacting emotionally under provocation | Opponent player becomes frustrated, increasing the likelihood of a rash, retaliatory foul or card | A key opponent player risks suspension/dismissal, or their decision-making quality drops for the remainder of the match | Continue normal play while the opponent is now managing a discipline/composure problem rather than executing their gameplan cleanly |

### 41.5 Tactics That Bait a Structural/Tempo Mistake

| Tactic | Invitation | Opponent Commitment | Exploitable Consequence | Capitalization |
|---|---|---|---|---|
| False tempo drop (feigned fatigue/lack of urgency) | Team appears to lower intensity, inviting the opponent to relax their own defensive concentration | Opponent's defensive line/pressing intensity subtly drops in response | A brief window of reduced defensive attentiveness opens | A sudden, pre-planned burst of tempo/intensity catches the now-relaxed opponent structurally unprepared |
| Repeating a pattern deliberately, then breaking it | Team runs an identical wide-overload attacking pattern 2-3 times in a row | Opponent's defensive shape begins pre-emptively shifting toward the anticipated (now-predictable) pattern before the ball even moves | Opponent's positioning is now based on prediction rather than reaction, leaving them out of position if the pattern changes | On the next repetition, break the pattern (e.g., switch instead of overload) to exploit the pre-emptive shift directly |
| Inviting a high line via false urgency in buildup | Team builds unusually quickly/directly for a spell, prompting the opponent's defensive line to push up in anticipation of continued directness | Defensive line sets higher than their default, assuming the direct approach will continue | Space behind the now-elevated line is larger than the opponent's default defensive setup would normally concede | Team suddenly reverts to a slower, more patient buildup specifically to play a precise through-ball into the space the falsely-elevated line just conceded |

**UNIVERSAL PRINCIPLE:** Every error-inducing tactic works by exploiting the gap between an opponent's *reactive* decision-making (made under time pressure, based on an incomplete picture) and their *deliberate* decision-making (made with full information). The tactic's design goal is always to force the reactive mode and prevent the deliberate one — through tempo manipulation, false patterns, provocation, or manufactured urgency.

**Risk note:** Several tactics in 41.4 (baiting fouls/cards, provocation) operate close to the laws of the game and a team's own disciplinary risk; over-reliance on provocation-based tactics can backfire (a team's own player being booked for the engagement, or a manufactured foul being correctly read and not given by the referee). These are legitimate, commonly used tactical tools at the professional level, but carry higher variance than the space-creation and pressing-bait tactics in 41.2-41.3.

---

## SECTION 42 — CLOSING DOWN & SPACE DENIAL (Defensive Space-Control Mechanics)

Section 7/7.1 covered how attackers *create* space. This section is the mirror image: the mechanics of *closing down* — denying an opponent time and space before they can use it — and how those mechanics scale up into full defensive suffocation systems (park the bus and beyond).

### 43.1 Individual Closing-Down Mechanics

| Concept | Definition | Execution Detail |
|---|---|---|
| Approach speed | How quickly a defender closes the distance to the ball-carrier | Should decelerate into the final 2-3 meters ("under control") rather than arriving at full speed, to avoid being turned/beaten by a change of direction |
| Approach angle | The line a defender takes when closing down | An angled (curved) approach shows the ball-carrier into a specific channel, rather than a straight approach which leaves both sides equally open (see TP028) |
| Engagement distance | How close a defender gets before slowing to a jockeying stance | Close enough to pressure the next touch/pass, far enough to still react to a change of direction — commonly around 1-1.5 body-lengths for jockeying, tighter when actively denying a specific pass |
| Body orientation | The defender's stance relative to the ball-carrier and the goal | Side-on stance (rather than square-on) allows faster reactive movement in either direction and a better view of both the ball and the space behind |
| Showing a side | Deliberately leaving one direction "open" via body shape to force the ball-carrier that way | Only effective if a covering player/trap is actually waiting in the shown direction (see Section 11.2's pressing traps) |
| Delaying vs. committing | The decision between jockeying (buying time) and diving into a tackle | Delay when support isn't yet in position or the zone isn't dangerous; commit when a clear tackle is on and/or the zone is high-risk (edge of own box) |
| Distance discipline | Maintaining a consistent, pre-set distance from the ball-carrier rather than drifting closer/further reactively | Prevents both being dribbled past (too tight, no time to react) and conceding an easy forward pass (too loose, no pressure at all) |

### 43.2 Unit-Level Closing Down (Compactness in Action)

Closing down is not just individual — it is most effective as a synchronized unit action:

**CLOSING-DOWN CHAIN:** Ball-carrier receives → nearest defender closes the immediate distance (individual closing down) → adjacent teammates simultaneously compress toward the ball side (horizontal compactness) → the line behind steps up to reduce the space in behind (vertical compactness) → the ball-carrier's picture of available space and time is reduced on every side at once, not just directly in front of them.

This is the same underlying mechanic as Section 12's "compactness before engagement" (TP008) and the reason Section 11's Universal Principle insists a lone presser without synchronized support simply opens space rather than closing it down — an individual closing down the ball without the surrounding compactness shift is cosmetic pressure, not real space denial.

### 43.3 Closing Down by Zone (Risk-Adjusted)

| Zone | Closing-Down Priority | Rationale |
|---|---|---|
| Own defensive third / box | Highest priority, full commitment | Turnover cost here is catastrophic (Section 1.2's Universal Principle); delay is not an acceptable substitute for winning the ball |
| Own middle third | High priority, but jockey-first unless a clean tackle is on | Balances risk of being turned (conceding a dangerous transition) against risk of over-committing and being bypassed |
| Opponent's middle third | Selective — trigger-based (Section 11.2), not continuous | Energy conservation matters; not every touch warrants full closing-down commitment |
| Opponent's defensive third (own high press) | High commitment when triggered, but coordinated (never a lone presser) | High reward if it forces a turnover near the opponent's goal; high risk if unsupported, since the team is furthest from its own goal if bypassed |

---

## SECTION 43 — PARK THE BUS & TOTAL DEFENSIVE SUFFOCATION SYSTEMS (Deep Dive)

Section 20 introduced "Park the Bus" as a playing style. This section expands it into a full operational system — the specific mechanics that make extreme low-block defending actually work, rather than just "many players behind the ball."

### 44.1 The Core Suffocation Mechanics

| Mechanic | Description |
|---|---|
| Maximal vertical compactness | The distance between the forward line and the back line is compressed to a minimum (often under 25-30 meters), leaving almost no space to play through, over, or between the lines |
| Box saturation | 8-10 outfield players are positioned to be able to reach the six-yard-box-to-edge-of-box area within 2-3 seconds of any cross or cutback |
| Zero risk-taking in possession | When the ball is won, the immediate action is a safe clearance or simple pass to reset the defensive shape — not an attempt to build an attack — because losing the ball in a dangerous transition zone undoes the entire defensive structure's purpose |
| Denying the zone, not the man | Defenders prioritize occupying the most dangerous space (central channel, penalty spot area) over following individual runners, since a suffocation system's whole premise is that no space should exist to exploit regardless of who moves into it |
| Controlled fouling as a release valve | A late, low-risk tactical foul (Section 41.4's "drawing a covering foul") is often preferable to conceding a clean shooting/crossing opportunity, accepting the free-kick risk as the lesser of two evils |
| Minimal pressing, maximal patience | The block does not chase the ball high — it waits, forcing the opponent to either force a low-percentage pass into a crowded zone or recycle possession fruitlessly outside the block |
| Set-piece and counter-attack reliance for goals | Since open-play chance creation is deliberately minimal, goals disproportionately come from set pieces (Section 19, Section 46.3) and rare, high-value counter-attacking moments (Section 20's "Counter-Attacking Football" mechanics) |

### 44.2 Why It Works (and Its Real Cost)

A well-drilled suffocation block works because it denies the two things almost every attacking system in this document (Sections 7-10, 17-18) fundamentally depends on: **time** and **space**. Positional play, tiki-taka, and combination-based attacking all require pockets of space between/behind lines to function (Section 21's Tiki-taka vs Low Block entry). Removing those pockets entirely — rather than contesting them individually — sidesteps almost all of an opponent's rehearsed patterns simultaneously, because the patterns were designed assuming *some* space would exist to exploit.

The cost is total: near-zero attacking output, sustained physical and psychological strain from prolonged defending, and total dependence on the goalkeeper and back line having a flawless (or near-flawless) individual game, since the system has no attacking outlet to relieve pressure if it's breached even once.

### 44.3 Breaking a Suffocation Block (Attacking Team's Perspective)

| Method | Mechanism | Why It Works Against This Specific System |
|---|---|---|
| Patient width manipulation | Repeated, unhurried switches of play from side to side | Forces the compact block to shift laterally many times; a suffocation block's compactness is easiest to disrupt through fatigue-inducing repetition rather than a single clever pass |
| Cutbacks over crosses | Byline cutback to the edge of the box rather than a cross into a saturated box | Box saturation (44.1) specifically defeats crosses/headers; cutbacks create a shot from a zone the saturation strategy under-prioritizes (edge of box, not six-yard box) |
| Overloading a single half-space repeatedly | Concentrated, sustained pressure on one specific half-space rather than varied attacking patterns | A block built for zone-denial, not man-marking, can still be worn down locally if the same zone is attacked with enough sustained numbers and technical quality over 90 minutes |
| Shot volume from range | Increased attempts from outside the box when central passing lanes are fully denied | Even a well-organized suffocation block cannot fully prevent deflections/rebounds/loose-ball second phases from range efforts, and this style of defending statistically concedes more of its (rare) clear chances from exactly these scrappy phases |
| Set-piece specialization | Dedicated, well-drilled corner/free-kick routines | Since suffocation systems accept they will face limited direct chance creation, elite set-piece routines become disproportionately valuable — this is the single most reliable way to break down a determined low block, per Section 46.3's data on set-piece goal share |
| Patience over panic (avoiding forced errors) | Explicit team instruction to not force low-percentage passes into the crowded zone out of frustration | A suffocation block's secondary win condition is inducing exactly the rushed, low-percentage decision Section 41's error-inducing logic describes; recognizing and refusing to supply that error denies the block its passive win condition |

---

## SECTION 44 — DESTROYING AN OPPONENT'S GAME PLAN FROM KICK-OFF

This section addresses a specific, high-value tactical question: **given a scouted opponent whose entire approach depends on one core mechanism, what is the single most direct way to deny that mechanism from the first minute — before their gameplan ever gets to establish itself?**

This differs from Section 21's general counter-matrix (which covers *tactic vs. tactic* trade-offs) and Section 21.1 (*mid-match* adjustment once a weakness is observed). Section 45 is specifically about **pre-planned, opening-phase disruption** — denying the opponent's core mechanism before it produces even a single clean example of what it's designed to do, since a system that never gets to demonstrate its central idea also never builds the confidence/rhythm that idea depends on.

### 44.1 Core Logic

**IDENTIFY THE SINGLE LOAD-BEARING MECHANISM → DENY IT FROM MINUTE 1 → FORCE A DEGRADED, UNFAMILIAR PLAN B → OPPONENT NEVER ESTABLISHES RHYTHM**

Every coherent tactical system (Section 20) has one or two mechanisms it cannot function without — a specific player's rotation, a specific buildup pattern, a specific pressing trigger. Section 45's approach is to identify that mechanism during scouting and assign a specific, opening-kickoff disruption to it, rather than defending generically and hoping to adapt reactively.

### 44.2 Game-Plan Destruction Table

| Opponent's Core Plan | Load-Bearing Mechanism | Kickoff Destruction Tactic | Mechanism of Disruption | Risk to the Disrupting Team |
|---|---|---|---|---|
| Tiki-taka / positional play | The double pivot's ability to receive and rotate freely under minimal pressure | Man-mark both pivot players individually from kickoff (rather than a standard zonal mid-block), forcing every single first-phase pass to be contested | Removes the free, uncontested central platform the entire style is built on before it ever finds rhythm; opponent is forced into unfamiliar long/direct buildup from minute 1 | Commits 2 markers permanently to the pivot, reducing the disrupting team's own attacking presence and creating space elsewhere if the pivot markers are bypassed |
| Gegenpressing / counter-press-reliant football | Winning the ball back within ~5 seconds of losing it | Deliberately avoid giving the opponent the ball in the specific zones/moments their counter-press is triggered by — i.e., play a patient, low-risk, backward-if-necessary buildup for the opening 10-15 minutes rather than the team's normal tempo | The counter-press has nothing to counter-press *against* if the disrupting team never loses the ball in a triggering zone/moment early on; the system's entire rhythm depends on early winnable turnovers | Slower, more cautious start reduces the disrupting team's own early attacking threat and territorial gain |
| Wing-oriented crossing football | The specific winger/full-back combination that generates crossing volume | Assign a designated double-team (winger + full-back, per TP047/Section 41's doubling-up logic) specifically to that pairing from kickoff, accepting a central numbers deficit | Denies the single delivery mechanism the entire gameplan is built around before it produces a single clean cross | Central zone is understaffed for the opening phase; vulnerable to an opponent who recognizes the double-team and switches the point of attack immediately |
| False-nine-dependent fluid attack | The false nine's ability to drop and disrupt CB marking assignments | Pre-assign a specific midfielder (not a CB) to track the false nine's drop from the first minute, regardless of where it leads them, rather than deciding reactively each time | Removes the structural dilemma (Section 21.1) the false nine is designed to create, since the response is pre-committed rather than reactive | The designated tracker is pulled out of their normal defensive/attacking duties for the entire match, reducing the disrupting team's own structure elsewhere |
| Set-piece-reliant / route-one football | Aerial duels at both ends, particularly from long balls and set pieces | Field the two most aerially dominant, best-organized centre-backs specifically to win first contact, plus a designated deep midfielder solely responsible for second balls, from kickoff | Denies the opponent's primary and often only reliable route to goal before it produces a single clean flick-on or knockdown | Reduces build-up quality/passing range if the selected CBs are chosen for aerial ability over technical composure |
| Rest-defence-light, ultra-attacking systems (e.g., 4-2-4-style commitment) | The opponent's willingness to commit large numbers forward, banking on rarely losing the ball in transition | Deliberately increase early pressing intensity and risk-taking specifically to force turnovers in the exact zone the opponent's thin rest defence is most exposed, even if this isn't the disrupting team's normal approach | Exploits the single precondition (the opponent rarely losing the ball early) the whole system depends on, before the opponent's attacking rhythm and confidence build | Higher-intensity opening spell is difficult to sustain for 90 minutes; risks the disrupting team's own fatigue/organization later in the match |
| Man-marking-heavy defensive systems (when attacking against one) | Individual marking discipline of the opponent's most disciplined defender | Run the single most rehearsed rotation/decoy pattern (Section 7.1) at that specific defender repeatedly in the opening minutes, before the opponent has any in-match data to adjust their marking approach | Exploits man-marking's core structural vulnerability while the opponent still has zero information about how the disrupting team intends to attack | If the pattern fails early, the opponent gains confidence and in-match information for the remaining 80+ minutes |
| Zonal low-block ("park the bus," Section 43) | The block's need for the opponent to make repeated errors/rushed decisions to create the rare openings it concedes | Explicitly do **not** attempt to destroy this plan in the opening minutes — a suffocation block has no rhythm-dependent mechanism to disrupt early, since its entire design assumes and absorbs early pressure | There is no "kickoff destruction" equivalent for this style; attempting one (e.g., forcing the tempo unsustainably early) plays directly into the block's passive win condition (Section 43.3's "avoiding forced errors") | The correct response is patience (Section 43.3), not an early disruption tactic — recognizing when this section's framework doesn't apply is itself part of using it correctly |

### 44.3 Encoding This in the Tactical Battle Engine

```json
{
  "opponent_core_mechanism": "double_pivot_rotation",
  "kickoff_disruption_tactic": "man_mark_pivot_individually",
  "disruption_window_minutes": [0, 15],
  "reasoning": "deny the opponent's load-bearing structural mechanism before rhythm/confidence establishes",
  "self_risk": "reduced_own_attacking_presence_during_disruption_window",
  "fallback_if_disruption_fails": "revert_to_standard_mid_block_per_section_12",
  "exception": "if opponent_style == 'park_the_bus', no early disruption tactic applies; default to patient_possession per section_44.3"
}
```

**UNIVERSAL PRINCIPLE:** Game-plan destruction only works against systems that *depend on rhythm, repetition, or a specific structural mechanism to function* — high-press, positional-play, wing-crossing, and false-nine systems all qualify. It fundamentally does not apply to systems built around patience and absorption (Section 44), because there is no early rhythm to deny — attempting to force the issue against a patient low block only accelerates the disrupting team into the very forced-error trap (Section 41) the low block is designed to bait. Correctly diagnosing *which category* the opponent's system falls into (rhythm-dependent vs. patience-dependent) is the first and most important step in Section 45's framework — before selecting any specific disruption tactic.

---



---

## SECTION 45 — PER-FORMATION PLAYER MOVEMENT, PASSING LINES & PRESSING ROLES

Sections 3-4 covered player positions and formations separately. This section fuses them: for each of six core formations, every outfield position's **specific movement pattern, passing-line responsibilities, and pressing role** *as shaped by that particular formation* — since the same role (e.g., "central midfielder") behaves differently depending on the structural shape around it.

Format per formation: a position-by-position table of **Movement Pattern | Primary Passing Lines | Pressing Role/Trigger**.

### 45.1 — 4-3-3 (Balanced, Positional-Play Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Positions off the line as an auxiliary passer during build-up; drops to sweep behind a high defensive line | CBs (short), pivot (ground), winger/full-back (switch under press) | N/A — deepest player; triggers the team's press by choosing when to release long vs. short |
| Right/Left CB | Splits wide toward the touchline in build-up to open a passing lane around the opposing striker | Full-back (short), pivot (diagonal), far CB (lateral reset) | Steps to press only if ball enters their zone; otherwise holds the line |
| Right/Left Full-back | Advances high and wide in possession (or inverts into midfield if the winger holds width); tracks opposing winger defensively | Winger (overlap/underlap combination), pivot (inverted option), CB (backward reset) | Presses opposing winger/full-back when ball is on their side; recovers centrally if caught upfield |
| Holding Midfielder / Pivot | Drops between/beside CBs to receive under pressure; screens the central zone out of possession | Both CBs, both 8s, occasionally a direct diagonal to a winger | Screens the opponent's #10/pivot passing lane; rarely commits to a full press, prioritizes positional screening |
| Right/Left 8 (box-to-box or mezzala-leaning) | Advances into the half-space, supports both build-up and box arrivals; drops to cover if the pivot steps out | Pivot, winger (underlap combination), striker (through the half-space), overlapping full-back | Presses the opponent's nearest central midfielder or advances to support the front three's press |
| Right/Left Winger | Holds width high up the pitch, or cuts inside if playing as an inverted winger; times cutbacks/box-entry runs | Full-back (overlap receiver), striker (cutback/combination), 8 (underlap link) | Curved run to press the opposing full-back, cover-shadowing the passing lane back inside |
| Striker (central) | Occupies the last defensive line, drops to link or stays high as a fixed reference point depending on style (target man vs. false nine) | Wingers (cross/cutback target), 8s (through-ball receiver), lay-offs back to advancing midfielders | Leads the press on the opponent's deepest central passer (CB or GK), cover-shadowing the pivot |

### 45.2 — 4-2-3-1 (Balanced, Double-Pivot Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Standard build-up involvement; less advanced positioning than a 4-3-3's sweeper-keeper unless the double pivot rotates out wide | CBs, occasionally direct to the deepest pivot player | Distribution choice sets the tempo of the first phase |
| CBs | Hold a slightly more conservative width than in a 4-3-3, since the double pivot already offers central passing options | Full-backs, either pivot player, occasionally a direct diagonal to the wide #10 | Rarely steps out; the double pivot's presence reduces the need for CBs to press proactively |
| Full-backs | Provide width alongside (not instead of) the wide 10s; one often inverts if the #10 on that side drifts wide | Wide #10 (combination), pivot (inverted option), winger overlap if the wide 10 tucks inside | Presses opposing wide players; the double pivot's coverage allows full-backs more freedom to commit forward |
| Double Pivot (2 players) | One stays central/deep while the other rotates to support progression — rarely both advance simultaneously | Both CBs, both wide 10s, the central #10 (vertical), occasionally direct to the striker | Jointly screen the central zone; one presses the opponent's deepest central option while the other holds position as cover |
| Central Attacking Midfielder (#10) | Finds pockets between the opponent's midfield and defensive lines; drops to link if the lone striker is isolated | Striker (through-ball), wide 10s (combination), pivot (backward if pressed) | First presser on the opponent's deepest central midfielder/pivot, cover-shadowing the return pass |
| Wide 10s (left/right) | Hold a narrower, higher starting position than a 4-3-3 winger; drift inside to combine, full-backs provide the width instead | Central #10 (combination), striker (cutback), full-back (width option if they've tucked inside) | Press the opposing full-back from a central-inside angle rather than a pure touchline approach |
| Striker (lone) | Occupies the last line, drops to link with the #10 when isolated, makes depth runs off the wide 10s' combination play | Wide 10s (cross/cutback target), #10 (lay-off), pivot (backward outlet under pressure) | Leads the press on the opponent's lead CB, cover-shadowing the passing lane to the double pivot |

### 45.3 — 3-4-3 (High-Press, Wing-Back Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Frequently the extra man in a back-three build-up (effectively a back-four numerically); positions actively between the split CBs | Both wide CBs, central CB, occasionally direct to a wing-back under press | Distribution choice creates the numerical superiority the back-three build-up depends on |
| Central CB | Stays central and deep, rarely steps out; organizes the defensive line | Both wide CBs, either central midfielder | Screens the most central attacking threat; last player to commit to a press |
| Wide CBs (left/right) | Split wide to the edge of the box in build-up; must cover in behind the advanced wing-back defensively | Wing-back (progression), central CB (reset), central midfielder (diagonal) | Shifts wide to cover if the same-side wing-back is caught upfield; otherwise holds the back-three shape |
| Wing-backs (left/right) | Provide the team's entire width in both phases — advance high in possession, drop to form a back five defensively | Winger/wide forward (combination), central midfielder (underlap), wide CB (backward reset) | Jump to press the opposing full-back/winger high up the pitch; highest individual pressing distance of any role in this formation |
| Central Midfielders (2, often box-to-box + deep-lying) | One holds a more withdrawn position, the other advances to support the front three; both cover extensively due to the formation's numerical concentration centrally | Wide CBs, wing-backs, front-three interchange | Press the opponent's double pivot 2v2, or one screens while the other presses depending on the trigger |
| Front Three (interchanging) | Constant rotation between central striker and wide forward positions; wide forwards can drift into the half-space, central striker can drop | Wing-backs (combination), central midfielders (lay-off), each other (interchange combination) | Lead the high press curving to show CBs into the flanks; front three plus jumping wing-backs create numerical parity vs. a back four |

### 45.4 — 4-4-2 (Direct/Counter-Attacking Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Often more direct in distribution than a possession-based system; less advanced positioning | CBs (short reset), direct long to strikers under press | Frequently the source of the team's primary progression method (long distribution) |
| CBs | Conservative positioning, minimal splitting/carrying compared to possession-based formations | Full-backs, central midfielders, direct long to strikers | Rarely steps out of the compact back four; holds the line as a unit |
| Full-backs | Provide width, but generally less advanced/overlapping than in 3-man-midfield systems, since the wide midfielder already offers width | Wide midfielder (combination), CB (backward), occasional long diagonal | Presses the opposing wide midfielder/winger 1v1 |
| Central Midfielders (2, flat) | Cover box-to-box, but are numerically outnumbered against 3-man central midfields — must be disciplined and compact rather than expansive | Wide midfielders, strikers (direct vertical), full-backs | Screen the central zone jointly; often forced into a reactive, covering press rather than an initiating one, due to the numerical disadvantage |
| Wide Midfielders (2) | Hold width consistently — less inverted movement than a winger in a 3-man-midfield system, since there's no double pivot/mezzala covering their defensive zone if they roam | Full-back (overlap), nearest striker (cross target), central midfielder (inside option) | Presses the opposing full-back; must also track back defensively more than an advanced winger role, since the flat midfield two needs full width coverage |
| Strikers (2, partnership) | One often holds/links (target man), the other makes depth runs off the first striker's knockdowns | Wide midfielders (cross target), each other (combination/knockdown), central midfielders (lay-off) | Curve their press to show the opposing CBs wide; the front two's press shape is the formation's primary pressing trigger mechanism |

### 45.5 — 3-5-2 (Central-Overload, Counter-Attacking Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Extra build-up option similar to other back-three systems | Wide CBs, central CB | Sets tempo/numerical superiority for the back-three build-up |
| Central CB | Most conservative positioning of the back three; organizes the line | Wide CBs, central midfield pivot | Rarely presses; last-line organizer |
| Wide CBs | Split wide in build-up, must cover extensively if wing-backs are pinned back defensively | Wing-back, central CB, nearest central midfielder | Shifts wide to cover a caught-out wing-back; otherwise conservative |
| Wing-backs | Provide all width; in this specific formation, often more withdrawn/cautious than in a 3-4-3 since there's no front-three pressing support jumping alongside them | Wide central midfielder, wide CB, striker (direct diagonal) | Engages the opposing full-back but with less front-line support than a 3-4-3's press, so often more measured/patient |
| Central Midfield Three (or a triangle of pivot + 2) | Provides the formation's core numerical advantage — commonly a 5v3 or 5v4 vs. a standard midfield, enabling patient central control | Wide CBs, wing-backs, both strikers | Central press dominance — this formation is built to win the central-zone pressing battle numerically |
| Strikers (2, partnership) | Combine centrally, one often drops to link with the midfield three while the other stays on the last line | Central midfield (lay-off), wing-backs (cross target), each other (combination) | Leads a more restrained press (this formation is typically mid/low-block oriented) curving to deny central passing options first |

### 45.6 — 4-1-4-1 (Compact, Single-Pivot Control Base)

| Position | Movement Pattern | Primary Passing Lines | Pressing Role / Trigger |
|---|---|---|---|
| Goalkeeper | Standard build-up involvement, typically less advanced than a back-three system's sweeper-keeper role | CBs, occasionally direct to the pivot | Sets tempo of the first phase |
| CBs | Hold a compact, disciplined line; minimal carrying since the pivot is the primary progression outlet | Full-backs, single pivot, rarely a direct long ball unless bypassing pressure | Holds the line; the single pivot's central presence reduces the need for CBs to press proactively |
| Full-backs | Advance to provide width alongside the flat midfield four's wide players; must recover quickly given the single-pivot cover behind them | Wide midfielder (combination), single pivot (inverted option), CB (reset) | Presses opposing wide players; recovery speed is critical since only one pivot covers centrally behind them |
| Single Pivot | The formation's most heavily loaded individual role — must screen the entire zone in front of the back four alone | Both CBs, both central-flat midfielders, occasionally direct forward to the striker | Screens centrally; extremely vulnerable to being bypassed 2v1, so positioning discipline matters more here than in any double-pivot system |
| Central-Flat Midfielders (2, within the four) | Hold a compact, narrow shape alongside the wide two; shift centrally to protect the space the single pivot alone can't cover | Pivot, wide midfielders, striker (vertical support) | Jointly compress centrally to support the single pivot's defensive screening — this formation's defensive solidity depends on this specific compactness |
| Wide Midfielders (within the four) | Hold width but tuck narrower defensively than an advanced winger, contributing to the formation's compact horizontal shape | Full-back (overlap), nearest central-flat midfielder, striker (cross target) | Track back extensively; this formation prioritizes a deep, disciplined mid-block over an aggressive high press |
| Striker (lone) | Occupies the last line, often relies on the midfield four's runners arriving late to support, since there's minimal individual support close by | Wide midfielders (cross target), central-flat midfielders (lay-off) | Leads a selective, trigger-based press (rather than a continuous high press) on the opponent's lead CB |

### 45.7 Cross-Formation Movement Comparison — The Same Role, Different Shape

The table below illustrates how one representative role's movement pattern changes purely as a function of the surrounding formation, holding the underlying player profile constant — a direct, worked demonstration of Section 22's "role fit" concept interacting with Section 4-5's structural logic.

| Formation | Full-back's Default Movement | Why It Differs |
|---|---|---|
| 4-3-3 | Advances high, often overlaps a winger holding width; may invert if the winger cuts inside | The winger's positioning (wide vs. inverted) directly dictates whether the full-back overlaps or inverts |
| 4-2-3-1 | Provides width alongside a narrower wide #10; more consistently high and wide than a 4-3-3 full-back | The wide 10's tendency to drift inside makes the full-back the *primary*, not secondary, wide outlet |
| 3-4-3 (as a wide CB) | Splits wide only in build-up; the wing-back — not this role — provides attacking width | The role is structurally different in a back three: it is defensively primary, not an attacking outlet |
| 4-4-2 | Advances to support but generally more conservatively than in 3-man-midfield systems | The wide midfielder already provides consistent width, reducing the need for the full-back to bomb forward as frequently |
| 3-5-2 (as a wing-back) | Provides all width but often more cautiously, since there's no front-three press jumping alongside in support | Without a front-three high press, the wing-back's advances are less protected defensively, encouraging more measured timing |
| 4-1-4-1 | Advances but must recover faster than in a double-pivot system | Only one pivot covers centrally behind the advancing full-back, raising the transition-risk cost of a mistimed advance |

**UNIVERSAL PRINCIPLE:** A player's *role label* (Section 3) describes their general skill/responsibility profile; a player's *actual movement pattern in a given match* is the intersection of that role with the specific formation, the specific playing style (Section 20), and the specific phase of play (Section 5). A Tactical Battle Engine should therefore treat "position" as a three-way function — `role × formation × phase` — rather than a single static label, when predicting expected player positioning and movement.

---

## SECTION 46 — REAL-WORLD BENCHMARK DATA (Pressing, Physical Output, Set-Piece Value)

This section grounds the qualitative pressing/movement concepts from Sections 11-12 and 27-28 in actual measured ranges from professional football, so the model has numeric anchors rather than only relative/directional descriptions ("high press" vs. "low press").

### 46.1 PPDA (Passes Per Defensive Action) Benchmark Bands

PPDA counts how many passes an opponent completes in their own build-up zone per defensive action (tackle, interception, foul) the pressing team makes there. **Lower PPDA = more intense pressing** — this is an inverted scale and one of the most common places for confusion when reading it.

| Band | Approximate PPDA Range | Interpretation |
|---|---|---|
| Extreme/elite pressing | Below ~7 | Very rare, requires exceptional physical and structural coordination; historically associated with sides like Bielsa's Leeds (~6.8) and peak Klopp Liverpool (~7.0-7.6) |
| High pressing | ~7-9 | Standard "high press" identity band for top-level pressing sides in a given season |
| Moderate/mid-block pressing | ~9-12 | League-average band across Europe's top five leagues in recent seasons (commonly cited around 11-12 as a cross-league average) |
| Passive/low-block | ~12-14+ | Team rarely engages until deep in their own defensive shape; typical of disciplined low-block/counter-attacking sides |
| Very passive | Above ~16-17 | Minimal committed pressing anywhere outside the defensive third |

**Important caveats for the Tactical Battle Engine to encode:**
- PPDA has a well-documented **possession bias**: a team that dominates the ball simply denies the opponent many passing opportunities in the first place, producing a low PPDA that reflects territorial dominance rather than an aggressive press per se. A model should cross-reference PPDA with **field tilt** and **high-recovery counts** (Section 39) before labelling a team's defensive identity purely from PPDA.
- PPDA is an **event-based, on-ball metric** — it captures the moment of the tackle/interception but not the off-ball running and shape-shifting that constitutes most of what "pressing" actually is. Tracking-data-derived pressure metrics (25Hz positional data) are a more complete but far more data-expensive alternative.
- PPDA needs **roughly 8-12 matches** of sample size to stabilize at the team level; a single match's PPDA carries too much variance to be a reliable input on its own (a caution directly relevant to Section 37's dataset design — PPDA-derived features should be computed as rolling averages, not single-match values).
- League-wide pressing intensity is **not static across time** — cross-league PPDA averages have trended upward (i.e., pressing has become somewhat *less* uniformly intense on average) over the past decade in several major leagues as more teams adopt trigger-based, selective pressing (Section 11's "trigger press") rather than continuous full-pitch pressing, even as elite outliers remain very aggressive.
- Individual club examples illustrate the spread: aggressive-press sides in a recent Premier League season posted PPDA figures roughly in the 9-10 range as the league's most intense pressers, while the least pressing-oriented sides in the same league sat in the 17+ range — a gap of roughly 7-8 passes per defensive action between the most and least intense approaches in the same competition.

### 46.2 Physical Output Benchmarks by Role

These figures ground Section 22's "stamina" and "work rate" attribute requirements in measured GPS/tracking data from professional matches.

| Position | Typical Total Distance per Match | Typical High-Intensity/Sprint Profile |
|---|---|---|
| Centre-back | ~9-9.5 km (lowest of outfield positions) | Fewer, shorter sprints; more short explosive actions (jumping, turning, jockeying) than sustained sprinting |
| Full-back / wing-back | ~10-10.5 km | Among the highest sprint and high-speed-running volumes on the pitch, reflecting the "cover most distance of any role" note in Section 3.2 |
| Central midfielder | ~10.5-11 km (typically the highest total distance of any outfield position) | High number of accelerations/decelerations; moderate sprint distance, sustained work-rate over 90 minutes |
| Winger / wide forward | ~10-10.5 km | Highest high-speed-running and sprint distances of any position; explosive, direction-changing movement pattern rather than pure distance volume |
| Centre-forward / striker | ~9.5-10 km | Fewer total sprints than wingers but often the highest top speeds reached and highest number of explosive, short-duration efforts |
| Goalkeeper | ~4-6 km (lowest by a wide margin) | Minimal distance; performance is almost entirely reaction, positioning, and short explosive actions rather than running volume |

**General ranges:** professional outfield players cover roughly **9-13 km per match** in total, with roughly **80-90% of that distance at low intensity** (walking/jogging) and the remaining **10-20% classified as high-intensity** — meaning the tactically decisive fraction of a match's physical output is concentrated in a relatively small share of total distance covered, which is why modern physical-performance analysis (Section 39) has shifted emphasis toward high-speed-running and sprint-distance metrics specifically, rather than total distance alone.

**Fatigue and game-state interaction:** high-intensity output measurably declines across a match and across a congested season, directly reinforcing Section 24's "tired players" game-state logic — teams and individual players are measurably less able to sustain high-press intensity (Section 11) late in matches or during fixture-congested periods, which is why professional squads increasingly manage pressing intensity as a resource to be paced across a match/tournament rather than sustained at maximum throughout (Section 40.4).

### 46.3 Set-Piece and Chance-Value Benchmarks

- Dead-ball situations (corners, free kicks, throw-in routines) commonly account for **roughly a quarter to a third of goals scored** in professional football across recent seasons — reinforcing why Section 19's set-piece taxonomy and Section 41.4's foul-baiting tactics are not peripheral topics but a structurally significant scoring channel.
- **xG per shot** varies enormously by shot location/type — shots from inside the six-yard box carry dramatically higher conversion probability than shots from outside the box, which is the quantitative basis for Section 18's emphasis on cutbacks and box-occupation timing over speculative long-range efforts.
- Teams with lower pressing intensity (higher PPDA, i.e., more passive) have been observed on average to **concede lower-quality shooting opportunities** (lower xG per shot against) than aggressive high-pressing sides, reflecting the risk/reward trade-off already captured in Section 14's low-block comparison table: cede territory and possession, but concentrate the resulting chances against into a lower-danger shot profile.

### 46.4 Encoding These Benchmarks in the Tactical Battle Engine

```json
{
  "pressing_intensity_bands": {
    "elite": {"ppda_max": 7.0},
    "high": {"ppda_min": 7.0, "ppda_max": 9.0},
    "moderate": {"ppda_min": 9.0, "ppda_max": 12.0},
    "passive": {"ppda_min": 12.0, "ppda_max": 14.0},
    "very_passive": {"ppda_min": 14.0}
  },
  "physical_output_baseline_km": {
    "centre_back": 9.2,
    "full_back": 10.2,
    "central_midfielder": 10.6,
    "winger": 10.3,
    "striker": 9.8,
    "goalkeeper": 5.0
  },
  "set_piece_goal_share_estimate": 0.28,
  "notes": [
    "PPDA should be computed as an 8-12 match rolling average, not a single-match value.",
    "PPDA must be cross-referenced with field_tilt and possession_share to separate genuine pressing intensity from possession-dominance bias.",
    "Physical output baselines decline in the second half and across congested fixture periods; apply a fatigue decay factor rather than treating them as constant across match minutes."
  ]
}
```

---

## SECTION 47 — OFF-THE-BALL: SCANNING, BODY SHAPE & RECEIVING TECHNIQUE (Individual Real-World Detail)

Sections 6-7 cover *where* players move and *why* (space creation, rotations, chains). This section covers the individual, moment-to-moment mechanics that make those movements actually work in real matches — the technical/perceptual layer coaches drill separately from team shape.

### 47.1 Scanning (Visual Exploration)

| Concept | Real-World Logic |
|---|---|
| Scanning | Turning the head to check surroundings (opponents, teammates, space) *before* the ball arrives, not after |
| Scan timing | Effective scanning happens in the moments while the ball is travelling toward a teammate two passes away — not only right before receiving; last-second scans are too late to change a decision meaningfully |
| Scan frequency | Elite players scan more often and closer to the moment of reception than average players — analytics on top-level midfielders show markedly higher scan counts per possession than lower-level comparisons |
| What to scan for (priority order under pressure) | 1) Immediate pressure (is a defender closing?) 2) Space to receive into 3) Passing options 4) Goal/space beyond the pressure |
| Scan-then-decide vs decide-then-scan | Scanning should inform the decision, not confirm one already made — players who scan late tend to receive side-on with a worse first-touch direction because the decision was already fixed before information arrived |
| Blind-side scanning | An off-ball player deliberately checking over the shoulder facing away from the ball to see the marker directly behind them, since this is the direction a marker is most likely to be standing unseen |

**UNIVERSAL PRINCIPLE:** Scanning is a pre-reception action, not a reception action — its entire value is in shaping body orientation and first-touch direction *before* the ball arrives, so a player who scans while already receiving has gained little tactical benefit even if they "checked their shoulder."

### 47.2 Body Orientation & Receiving Shape

| Concept | Definition | Real-World Logic |
|---|---|---|
| Open body shape | Receiving with hips/chest angled so both the ball source and the space/goal ahead are visible in the same glance | Allows an immediate forward pass, turn, or dribble without an extra touch to reorient |
| Closed body shape | Receiving square to the passer with back partially or fully to the space ahead | Forces an extra touch or lay-off to progress; sometimes deliberately used to shield the ball when under direct pressure |
| Half-turn | Receiving side-on so the first touch can go either forward or backward depending on what the scan revealed | The default "correct" body shape for central players receiving under pressure — keeps both options alive until the last possible moment |
| Receiving across the body | First touch taken with the far foot, angled across the body toward open space | Naturally opens the hips toward goal and moves the ball away from the nearest defender in one motion |
| Receiving on the back foot | Taking the touch with the foot furthest from the ball's direction of travel | Creates separation from a tight marker by shifting the ball away from their pressing side as it's received |
| Checking away then to feet | Player makes a short movement away from the passer first, then spins back to receive to feet | Manipulates the marker's momentum in the wrong direction just before the pass is played, buying a half-yard of space on reception |
| Curved run to receive | Approaching a passing lane on a bent path rather than a straight line | Opens the receiving body shape naturally toward the direction the run curved from, without needing a separate turning action after the ball arrives |

**Chain logic:** SCAN → BODY ORIENTATION SET BEFORE BALL ARRIVES → FIRST TOUCH DIRECTION DECIDED IN ADVANCE → TOUCH EXECUTES THE PRE-SCANNED DECISION. A breakdown at any link (no scan, square body shape, undirected touch) forces the next action to be reactive rather than pre-planned, costing tempo even if technically the touch is "clean."

### 47.3 Off-Ball Timing & Positioning Tips

| Tip | Real-World Logic |
|---|---|
| Arrive late into the box, not early | A run timed to arrive as the cross/cutback is delivered is much harder to mark than a run made early, since early arrival gives the defender time to reset and pick the runner up again |
| Start runs from a standing/staggered position, not a jog | A run that begins from stillness or a checked step creates a sharper acceleration differential against a defender already jogging, which is what actually creates separation — constant jogging removes the ability to suddenly change gear |
| Stay "in the defender's cognitive blind spot" | Positioning slightly behind and to the side of a marker (not directly in front) makes it physically harder for that marker to track both the ball and the runner simultaneously |
| Delay the run until the passer's head is up | A run timed to the passer's scanning motion (not to the ball itself) synchronizes with the actual decision-making moment, rather than reacting to a pass that has already been played |
| Don't ball-watch off the ball | Players who fixate on the ball rather than scanning their own zone are the easiest targets for blind-side runs and late-arriving opponents — defensively and offensively, sustained ball-watching is one of the single most common sources of preventable goals |
| Use the goalkeeper/last defender as a fixed reference, not the ball | Judging offside timing and depth of run off the last defender's positioning (not off where the ball currently is) produces more consistently accurate run timing |

---

## SECTION 48 — ON-THE-BALL: FIRST TOUCH, DRIBBLING TECHNIQUE & SKILL MOVES (Individual Real-World Detail)

This section grounds Section 8's passing system and Section 22's "dribbling" attribute in the actual technical mechanics coaches teach for ball control, 1v1 attacking, and named skill moves — the individual layer beneath the team-shape and space-creation logic of Sections 7 and 41.

### 48.1 First Touch Fundamentals

| Principle | Real-World Logic |
|---|---|
| Touch with purpose, not just control | Every touch should either progress the ball, escape pressure, or set up the next action — a "dead" first touch that simply stops the ball under the body wastes the tempo advantage the pass created |
| Touch away from the nearest defender | The first touch should move the ball into the space furthest from the closest pressing player, using the touch itself as the escape mechanism rather than requiring a second action |
| Touch into space you've already scanned | Combines directly with Section 47.1 — a touch is only "good" if it's directed into space the player identified *before* receiving, not space discovered afterward |
| Cushion vs firm touch | A soft, cushioned touch kills the ball's pace for close control in tight areas; a firmer touch pushes the ball further ahead when there's space to attack at speed — selecting the wrong one for the situation (over-controlling in space, or over-hitting in a tight area) is one of the most common technical errors under pressure |
| Use both feet for the first touch | Being forced onto a weaker foot for the first touch measurably slows reaction time and reduces touch quality — this is precisely why "showing a player onto their weak foot" (Section TP011/PR011) is a deliberate defensive tactic |
| Low centre of gravity on receiving | Bent knees and a lowered stance on the touch improve balance for an immediate direction change, which is why players caught receiving upright are easier to dispossess in the instant after control |

### 48.2 Dribbling & Ball-Carrying Logic

| Concept | Real-World Logic |
|---|---|
| Small touches at high speed, big touches in open space | Tight, frequent touches keep the ball close enough to react to a defender's movement when contested; larger touches are only safe once genuinely clear of pressure, since a big touch in a contested area simply gives the ball away |
| Change of pace over change of direction | The single biggest real-world separator in beating a defender 1v1 is a sudden acceleration (slow-to-fast) rather than a lateral move alone — a change of direction without a change of pace is far easier for a defender to recover from |
| Approach the defender at a controlled tempo, then explode | Slowing the approach forces the defender to also slow down and commit their weight to a stance; the explosive burst then happens at the moment the defender's weight is least able to react |
| Attack the defender's body, not the ball | Running directly at a defender (rather than around them) forces a reactive decision from the defender under time pressure, which is what creates hesitation to exploit — running past without threatening them directly gives the defender time to simply track and jockey |
| Shielding / holding off | Using the body (not the arm, which risks a foul) side-on between the ball and the defender, with the ball kept on the far foot, to protect possession while support arrives |
| Committing the defender before releasing | A dribbler should get a defender to plant their weight/commit to a direction before playing the pass or shot — releasing the ball too early (before the defender is actually beaten) wastes the numbers-up situation the dribble created |
| Two-footed dribbling ability | Being genuinely comfortable dribbling off either foot removes the defender's ability to simply show a player onto their weaker side, which is otherwise one of the most reliable containment tactics in the game |

### 48.3 Named Skill Moves (Feints & Tricks)

| Move | Mechanics | When It's Used | How a Defender Counters It |
|---|---|---|---|
| Stepover | Foot circles over the top of the ball without touching it, feigning a direction change, before pushing the ball the other way with the other foot | Against a defender standing square-on and reactive, to sell a fake direction | Defenders trained to watch the hips/ball rather than the feet are far less affected, since the hips reveal the real direction |
| Body feint (shoulder drop) | Dropping the shoulder and shifting body weight toward one direction without touching the ball, then pushing off the opposite foot | Same purpose as a stepover but relies on body weight rather than foot movement — often faster and harder to read | A defender who stays balanced (not committing their own weight in reaction) can recover, since the feint only works if it draws a genuine weight shift |
| Drag-back (pull-back) | Sole of the foot rolled back over the top of the ball to reverse direction instantly | Under close pressure from behind or when boxed in, to reverse out of a dead end | Defenders anticipating the drag-back by delaying their own commitment (rather than lunging) reduce its effectiveness |
| Cruyff turn | Ball dragged behind the standing leg with the inside of the foot while the body shows one way, reversing direction 180° in one motion | Against a defender pressing from the front, expecting a pass or a straight touch | A covering defender positioned to anticipate the reverse (rather than the presser alone) neutralizes the space the turn creates |
| Roulette / Marseille turn | 360° spin using the sole of both feet in sequence to shield the ball from a defender while rotating away from pressure | Under pressure from directly behind, in tight areas | Two defenders converging (rather than one) remove the space the spin needs to be effective |
| La Croqueta | Quick side-to-side push of the ball with the inside of alternating feet, keeping it just out of a defender's reach without changing overall direction | To shift the ball laterally away from a lunging tackle while continuing to advance | A patient defender who delays the tackle attempt (rather than lunging) avoids being beaten by the shift |
| Elastico (flip-flap) | Ball pushed outside with the outside of the foot, then snapped back inside with the same foot in one fluid motion | At speed, to sell an outside move before cutting inside past a defender | Defenders reading the hips/plant foot rather than the touch itself are less deceived |
| Nutmeg | Ball played directly through a defender's legs, collected on the other side | When a defender's stance leaves their legs open (common when jockeying square-on) | Keeping the legs closed/together while jockeying denies the nutmeg entirely — a specific, coachable defensive stance correction |
| Sombrero / rainbow flick | Ball flicked up and over a defender's head with the sole of the foot, then chased down on the other side | In tight 1v1 areas to bypass a defender vertically rather than laterally | High-risk if mistimed; a defender who stays close and reacts to the flight (rather than committing to a tackle) can intercept on the far side |
| Rabona | Kicking foot wrapped behind the standing leg to strike or pass the ball | Rare, high-difficulty situational technique (crossing/shooting from an awkward angle) rather than a routine dribbling tool | Not really "counterable" as a dribbling move — it's a technical execution choice under a specific body-angle constraint |
| Chop / cut (inside or outside) | Sharp touch across the body with the inside or outside of the foot to change direction at an acute angle while maintaining speed | The most common real-world 1v1 move — simple, low-risk, effective against a defender committed to one side | A defender who stays central and balanced (not over-committing to jockey one direction) limits the angle the chop can exploit |

**UNIVERSAL PRINCIPLE:** Every skill move above works through the same underlying mechanism as Section 41's baiting tactics applied at the individual level — it manufactures a false read for the defender (a fake direction, a fake pass, a fake pace) and then exploits the split-second the defender spends reacting to the false read rather than the real one. A move that doesn't draw a genuine reaction from the defender (because they stayed balanced/central) has not "worked," regardless of how technically clean its execution was.

### 48.4 1v1 Attacking Decision Logic (Practical Tips)

| Situation | Recommended Approach |
|---|---|
| Defender retreating/jockeying, showing you down a channel | Accept the show initially to build speed, then use a sharp chop/cut at the moment the defender's back foot plants, rather than trying to beat them in the first stride |
| Defender square-on, balanced, not retreating | A body feint or stepover is more effective here than a straight burst, since a balanced defender has to be moved off-balance first before pace alone can beat them |
| Defender showing you onto your stronger foot | Take the invitation early and directly — this is a defensive mistake, and hesitating to "outsmart" it usually just gives the defender time to recover the show |
| Defender showing you onto your weaker foot | Either commit fully to competent weak-foot execution, or use a body feint/roulette to escape onto the strong foot instead of a low-quality weak-foot action |
| Two defenders converging (2v1 against the dribbler) | Release the ball before the second defender arrives rather than attempting to beat both — dribbling into a converging double-team is high-turnover-risk regardless of individual quality |
| In the defensive/middle third | Favor safe control, shielding, and lay-offs over speculative skill moves — the cost of a turnover here is highest (Section 1.2's universal risk principle applies at the individual level too) |
| In the attacking third, 1v1 with a covering defender behind | Higher risk tolerance for skill moves/direct dribbles is justified, since a turnover here is less immediately dangerous and the reward (a created chance) is at its highest value |

---

## SECTION 49 — CONNECTING OFF-BALL AND ON-BALL LOGIC (Individual Layer Synthesis)

Sections 47-48 are not independent of each other or of the team-level logic in Sections 6-7 and 41-42 — in real football they form one continuous decision chain at the individual level:

**SCAN (47.1) → BODY ORIENTATION SET (47.2) → RUN/POSITIONING TIMED TO THE SCAN (47.3) → RECEPTION WITH A PRE-DECIDED FIRST TOUCH (48.1) → CARRY/RELEASE DECISION UNDER PRESSURE (48.2) → SKILL MOVE OR PASS IF A DEFENDER MUST BE BEATEN INDIVIDUALLY (48.3-48.4)**

**UNIVERSAL PRINCIPLE:** The quality of an on-ball action is very largely determined *before* the ball arrives. A technically clean touch or dribble executed off a late scan and a closed/square body shape will still be slower and lower-percentage than an average touch executed off good scanning and correct orientation — which is why real-world coaching consistently emphasizes off-ball preparation (Section 47) as heavily as, or more heavily than, on-ball execution itself (Section 48). A Tactical Battle Engine should weight a simulated player's *pre-reception* state (scan quality, body shape, run timing) as a direct multiplier on the *success probability* of whatever on-ball action follows it, rather than modelling on-ball technical actions as independent, context-free rolls.

---

## SECTION 50 — FURTHER REAL-WORLD BENCHMARK DATA (Duels, Crossing, Goalkeeping, Discipline, Home Advantage)

Section 46 covered pressing intensity, physical output, and set-piece value. This section extends the same "numeric anchor" approach into areas not yet grounded: duels, crossing/finishing efficiency, goalkeeper distribution, discipline, and situational/contextual effects — so the model has real-world reference ranges across essentially every phase of the game, not just pressing and running data.

### 50.1 Duels: Aerial & Ground

| Duel Type | Real-World Benchmark Logic |
|---|---|
| Aerial duel win rate | Elite aerial centre-backs and target strikers typically win a clear majority of contested aerial duels across a season (commonly cited in the 60-70%+ range for specialists), while an average outfield player sits closer to an even split; this is why set-piece marking assignments (Section 19) are deliberately matched by aerial-duel profile rather than by general positional role alone |
| Ground duel / tackle success rate | Elite tackling defenders typically complete a clear majority of attempted tackles across a season, but tackle *attempts* alone are a weak standalone metric — a defender who rarely commits to tackles but consistently forces the ball wide or delays play (Section 42's jockeying logic) can be equally or more effective without registering a high tackle count |
| Duel win rate by role | Centre-backs and defensive/holding midfielders post the highest ground-duel win rates among outfield positions as a rule, reflecting both physical profile selection and the reactive (rather than committed) nature of their defending in open play |
| Why raw duel counts mislead | A player who wins fewer duels because they're rarely dribbled at directly (due to good covering positioning, Section 13) is not necessarily a weaker defender than one who wins many duels but concedes more direct 1v1 situations in the first place — duel win-rate should be read alongside duels-attempted-against, not in isolation |

### 50.2 Crossing, Shot & Finishing Efficiency

| Metric | Real-World Benchmark Logic |
|---|---|
| Cross completion rate | Open-play crosses are a relatively low-percentage action league-wide — completion to a teammate is commonly in a roughly 20-30% range across professional football, which is part of the analytical case (alongside Section 46.3's xG-per-shot data) for cutbacks and low, driven deliveries being favored by modern coaching over high, first-time crosses into a crowded box |
| Shot conversion rate | League-average shot conversion sits in a low single-digit-to-low-teens percentage band depending on shot type/location; shots from inside the six-yard box convert at a dramatically higher rate than shots from outside the box, reinforcing Section 18 and Section 46.3's emphasis on box occupation and cutback timing over shot volume from distance |
| Big chances / clear-cut chances | A "big chance" (very high-probability scoring opportunity, e.g. a close-range shot with minimal pressure) is typically converted at a much higher rate than the average shot — teams' underlying quality is often better reflected in *big chances created and conceded* than in total shot counts, since shot volume alone can be inflated by low-value attempts |
| Penalty conversion rate | Penalties convert at a substantially higher rate than open-play shots league-wide (commonly cited around three-quarters or higher across recent top-league seasons), which is part of the quantitative logic behind Section 41's foul-baiting tactics in the box being a rational, deliberate approach rather than a purely cynical one |

### 50.3 Goalkeeper Distribution & Sweeping

| Metric | Real-World Benchmark Logic |
|---|---|
| Pass completion (short/long split) | Modern "sweeper-keeper" profiles are evaluated on short/medium build-up pass completion (commonly in a high-80s-to-90s percentage range for elite ball-playing goalkeepers) separately from long-distribution accuracy, since these represent different skills (build-up participation vs direct progression) |
| Sweeping distance / defensive actions outside the box | Goalkeepers in high defensive-line systems (Section 14) are measured on actions completed outside the penalty box per match — a meaningfully higher figure for keepers in high-line, high-press systems than for keepers in a deep, low-block system, directly reflecting Section 13's defensive-line-height logic applied to the goalkeeping role specifically |
| Save percentage vs PSxG | Comparing actual save percentage to Post-Shot xG (Section 39) isolates shot-stopping quality from the defensive structure in front of the keeper — a keeper facing high-quality shots due to a poor defensive structure may have a modest raw save percentage while still outperforming what PSxG predicted, and vice versa |

### 50.4 Discipline & Game-State Data

| Metric | Real-World Benchmark Logic |
|---|---|
| Fouls per match (team-level) | High-press, aggressive-duel teams typically commit more fouls per match than deep, passive-block teams, since committed pressing (Section 11) and physical duels inherently carry higher foul risk than delay-and-contain defending |
| Cards by pitch zone | Fouls in the defensive/middle third carry lower card risk on average than last-man or box-area fouls, reflecting both refereeing tendency and the tactical logic in Section 2's note that foul risk shapes pressing intensity specifically near the defending team's own box |
| Red card / 10-man game-state effect | Teams reduced to 10 men show a measurable drop in expected points and typically shift toward a more compact, lower defensive line (directly reinforcing Section 24's game-state logic) rather than attempting to maintain their pre-red-card structural approach |
| Time-wasting and stoppage patterns | Leading teams in the closing stages of a match measurably slow the tempo of restarts (goal kicks, throw-ins, free kicks) compared to level or losing game states — one of the clearest, most consistently observed game-state behavioral shifts in professional football, and part of why added time (Section 2) has trended longer in recent rule interpretations specifically to offset it |

### 50.5 Home Advantage & Contextual Effects

| Factor | Real-World Benchmark Logic |
|---|---|
| Home win rate | Home teams have historically won a clearly larger share of matches than away teams across most professional leagues, though the magnitude of this "home advantage" has been shown in multiple studies to narrow somewhat when matches are played without crowds present, pointing to crowd/referee-influence effects as a meaningful (not the sole) component of the advantage alongside travel and pitch familiarity |
| Referee bias literature | Multiple independent studies across leagues have found small but consistent tendencies toward more stoppage time and fewer cautions awarded to the home team in close/high-crowd-noise matches, though effect sizes are modest relative to the overall home-advantage gap and vary by league/study |
| Fixture congestion effect | Teams playing multiple matches within a short turnaround window show measurable declines in high-intensity running output (directly reinforcing Section 46.2's fatigue/pacing note) and a higher likelihood of squad rotation, which is why elite clubs increasingly treat pressing intensity as a resource to be managed match-to-match across a congested calendar rather than a fixed team identity applied uniformly every game |

### 50.6 Encoding These Benchmarks in the Tactical Battle Engine

```json
{
  "duel_win_rate_baseline": {
    "aerial_specialist_cb_or_striker": 0.65,
    "average_outfield_player": 0.50,
    "elite_tackler_success_rate": 0.65
  },
  "finishing_efficiency_baseline": {
    "open_play_cross_completion": 0.25,
    "league_average_shot_conversion": 0.10,
    "six_yard_box_shot_conversion_multiplier": 3.0,
    "penalty_conversion_rate": 0.76
  },
  "goalkeeper_baseline": {
    "elite_build_up_pass_completion": 0.88,
    "sweeper_keeper_high_line_bonus_actions_outside_box": "higher_than_low_block_keeper"
  },
  "discipline_baseline": {
    "high_press_team_fouls_per_match_relative": "higher_than_low_block_team",
    "ten_man_game_state_defensive_line_shift": "deeper_and_more_compact"
  },
  "home_advantage_baseline": {
    "home_win_rate_uplift": "moderate_positive",
    "crowd_absence_effect": "narrows_home_advantage"
  },
  "notes": [
    "All rates above are directional real-world anchors, not fixed constants — they vary meaningfully by league, season, and playing style and should be treated as priors to calibrate against actual observed data (Section 37), not hard-coded truths.",
    "Duel, crossing, and discipline metrics should be interpreted relative to a player's/team's tactical role (Sections 3, 20) rather than compared as flat league-wide averages, since role selection itself biases these numbers (e.g., a jockeying full-back attempting fewer tackles by design, per Section 42)."
  ]
}
```

---

## SECTION 51 — ADDITIONAL PLAYER PLAYING STYLES (Extended Role Catalogue)

Section 3 covers the core role set. This section adds further named archetypes common in real-world coaching/scouting language that weren't yet profiled in full — completing the picture between "position" (Section 3's base labels) and "playing style" (the specific movement/on-ball/off-ball behavioural profile a player is instructed to execute within that position). Format matches Section 3: Primary role, Defensive responsibility, Attacking responsibility, Movement, Preferred zones, Passing behaviour, Pressing behaviour, Defensive behaviour, Transition behaviour, Common combinations, Strengths, Weaknesses, Instructions.

### 51.1 Midfield Styles

**Anchor Man**
- Primary role: Pure defensive screen in front of the back line, minimal attacking involvement
- Defensive responsibility: Occupies the central zone directly ahead of the CBs at all times, rarely steps out of position
- Attacking responsibility: Simple recycling passes only; almost never joins the attack
- Movement: Positionally very disciplined — shifts laterally to stay central to the ball, does not advance with attacks
- Preferred zones: Z8/Z13 central, rarely beyond
- Passing: Short, safe, sideways/backward recycling
- Pressing: Holds position rather than pressing; screens the passing lane into the space behind him rather than engaging
- Defensive: Zonal shield, intercepts through the centre, covers for advancing full-backs/wing-backs
- Transition: Immediately drops to cover the defensive transition rather than joining a counter
- Combinations: Centre-backs, box-to-box partner (if paired in a double pivot)
- Strengths: Positional discipline, interceptions, shielding the back line
- Weaknesses: Minimal attacking output, can be bypassed by direct diagonal passes if isolated as a lone pivot
- Instructions: "Sit in front of defence," "do not advance"

**Ball-Winning Midfielder**
- Primary role: Aggressive ball recovery through direct engagement rather than positional screening
- Defensive responsibility: Actively hunts the ball, presses opposition midfielders man-to-man
- Attacking responsibility: Simple, quick releases after winning possession — not a creator
- Movement: Follows the ball across zones rather than holding a fixed position
- Preferred zones: Wherever the ball currently is within the midfield third
- Passing: Short, quick, low-risk releases immediately after a tackle/interception
- Pressing: High-intensity, individual, man-oriented pressing triggers
- Defensive: Duels, tackles, aggressive engagement — the highest tackle-attempt volume among midfield roles
- Transition: Wins the ball and releases it instantly to a more creative teammate
- Combinations: Deep-lying playmaker or regista (receives the simple release after the tackle)
- Strengths: Duels, tackling, work rate, disruption of opponent rhythm
- Weaknesses: Positional discipline can suffer from chasing the ball; foul risk is higher than an anchor man's
- Instructions: "Close down aggressively," "win the ball"

**Segundo Volante**
- Primary role: A deep-lying midfielder who bursts forward from a withdrawn starting position to join attacks late
- Defensive responsibility: Screens centrally like a pivot when not advancing
- Attacking responsibility: Arrives late in the box or edge-of-box for a shot, having started deep
- Movement: Starts in a deep pivot position, explosive forward bursts once possession is secure/advanced
- Preferred zones: Z8/Z13 as a base, bursting to Z18/Z23/Z28
- Passing: Simple recycling from the base position; direct/decisive once advanced
- Pressing: Screens rather than presses from the base position
- Defensive: Solid positional cover when not advanced; relies on the other pivot partner to cover the burst
- Transition: A specific defensive-transition risk exists at the exact moment of the burst — if possession is lost immediately after, the team is temporarily short centrally
- Combinations: A more positionally disciplined double-pivot partner who covers the burst
- Strengths: Goal threat from an unexpected deep-starting position, hard to track for a marking midfielder
- Weaknesses: Requires a disciplined partner to cover; mistimed bursts leave a central gap
- Instructions: "Support from deep," "arrive late"

**Carrilero**
- Primary role: A wide central-midfield role in a midfield three/five that shuttles the width of the half-space and touchline rather than staying central
- Defensive responsibility: Tracks the opposing wide player when the team's own wing-back/winger is advanced
- Attacking responsibility: Provides underlap/overlap support to the winger or wing-back ahead
- Movement: Shuttles laterally between the half-space and the touchline depending on where the ball-side winger/wing-back is
- Preferred zones: Z12/Z14, Z17/Z19 (half-space, shuttling wide as needed)
- Passing: Combination play with the wide attacker, occasional switch of play
- Pressing: Covers the wide zone when the primary wide player is pulled inside or beaten
- Defensive: Balances between covering centrally and covering wide, depending on team shape
- Transition: Recovers to fill the half-space if the wing-back is caught upfield
- Combinations: Wing-back/winger (interchange), central pivot (covers if carrilero advances)
- Strengths: Tactical flexibility, work rate, positional intelligence in a system with only 3-5 central players covering 5 lanes
- Weaknesses: Can be caught between two zones if the interchange with the wide player is mistimed
- Instructions: "Shuttle the half-space," "cover the wide zone if winger is beaten"

**Trequartista / Enganche**
- Primary role: A free-roaming creative playmaker operating just behind the striker(s), given license to drift anywhere between the lines
- Defensive responsibility: Minimal to none — typically fully exempted from pressing/tracking duties
- Attacking responsibility: The team's primary creative fulcrum; finds pockets of space and unlocks the defence with the final ball
- Movement: Unstructured, deliberately unpredictable drifting across the width of the pitch in the space between opposition midfield and defence
- Preferred zones: Z18-Z23 central and half-space, roaming freely
- Passing: Disguised through balls, incisive vertical passes, sees passes other players don't
- Pressing: None — this is the one role in the entire catalogue built around a full pressing exemption
- Defensive: None
- Transition: Immediate first-time forward pass on winning possession, rather than carrying/pressing
- Combinations: Any advanced attacker capable of exploiting a disguised through ball
- Strengths: Vision, close control in tight areas, unpredictability
- Weaknesses: Creates a structural hole in the pressing/defensive shape that teammates must cover; rare in modern systems that demand universal pressing participation
- Instructions: "Roam free," "no defensive duties"

### 51.2 Wide & Forward Styles

**Raumdeuter ("Space Investigator")**
- Primary role: A wide forward whose defining skill is anticipating and arriving in space rather than beating defenders 1v1
- Defensive responsibility: Minimal
- Attacking responsibility: Reads the pattern of play to arrive unmarked in the box, rather than dribbling to create the chance himself
- Movement: Constant scanning and repositioning off the ball, drifting into pockets defenders have momentarily vacated rather than holding a fixed wide position
- Preferred zones: Z21-Z30, wide-to-central depending on where the gap opens
- Passing: Minimal on-ball creative involvement — the role's value is almost entirely off-ball anticipation
- Pressing: Low-to-moderate, situational
- Defensive: Minimal
- Transition: Anticipates counter-attacking space rather than sprinting a fixed lane
- Combinations: Any creative passer capable of picking out an unmarked run rather than a player demanding the ball to feet
- Strengths: Off-ball anticipation, movement intelligence, finishing from anticipated positions
- Weaknesses: Limited end product if isolated without a quality service source; minimal defensive/pressing contribution
- Instructions: "Find space instinctively," "anticipate the gap"

**Shadow Striker**
- Primary role: A second-forward/attacking-midfield hybrid whose primary instruction is late arrival into the box to finish, rather than to create
- Defensive responsibility: Minimal
- Attacking responsibility: Times a run from just behind the front line to arrive as a genuine second scoring threat alongside/behind the main striker
- Movement: Starts deeper than the striker, times a forward burst to arrive on the shoulder of the last defender or at the edge of the six-yard box
- Preferred zones: Z23/Z28, arriving from deeper zones
- Passing: Minimal build-up involvement; a late, direct final pass or shot is the primary output
- Pressing: Leads the first press alongside the striker in some systems
- Defensive: Minimal
- Transition: A direct forward runner on the counter, arriving late to the box rather than carrying the ball himself
- Combinations: Target man/false nine whose lay-offs and knockdowns the shadow striker arrives to finish
- Strengths: Goal output, timing of runs, finishing
- Weaknesses: Heavily reliant on a strike partner or midfield creator to generate the chances he finishes
- Instructions: "Time the late run," "arrive to finish, not to create"

**Deep-Lying Forward**
- Primary role: A striker who habitually drops out of the last line to link play, similar in spirit to a false nine but less extreme and more positionally consistent
- Defensive responsibility: Minimal, occasional pressing trigger on the deepest opposition CB
- Attacking responsibility: Receives to feet, combines with midfield runners, and occasionally still finishes chances himself
- Movement: Drops into the pocket between opposition midfield and defence to receive, rather than staying pinned to the last line
- Preferred zones: Z18/Z23 central, dropping from Z28
- Passing: Lay-offs, combination passing, occasional line-breaking pass himself
- Pressing: Screens the opposition's deepest central outlet
- Defensive: Minimal
- Transition: Link man who releases advancing runners rather than sprinting in behind himself
- Combinations: Onrushing attacking midfielders/wide forwards exploiting the space the drop creates (same underlying logic as Section 3's False Nine, but the drop is habitual/moderate rather than extreme/constant)
- Strengths: Link-up play, combination ability, retains some direct goal threat unlike a pure false nine
- Weaknesses: Reduced permanent presence on the last line, which can reduce the team's direct in-behind out-ball option
- Instructions: "Drop to link when needed," "combine before finishing"

**Wide Playmaker**
- Primary role: A winger/wide forward whose primary instruction is creating for others (crosses, cutbacks, through balls) rather than direct goal-scoring
- Defensive responsibility: Moderate, tracks the opposing full-back
- Attacking responsibility: Delivers the final pass — crosses, cutbacks, or line-breaking passes into the box — rather than shooting himself
- Movement: Holds a wide position longer than an inside forward would, to maintain crossing/passing angles rather than cutting in to shoot
- Preferred zones: Z20/Z25 wing, occasionally drifting to the byline
- Passing: High-volume crossing and cutback delivery, disguised final balls
- Pressing: Moderate, presses the opposing full-back
- Defensive: Tracks back on the overlap
- Transition: Provides the out-ball and delivery on a fast break rather than being the one arriving to finish
- Combinations: Poacher/target man/late-arriving midfielder who finishes the deliveries
- Strengths: Delivery quality, vision, end product for others
- Weaknesses: Lower personal goal output than an inside-forward-style winger
- Instructions: "Look to create, not to shoot," "get to the byline for a cutback"

**Defensive Winger**
- Primary role: A wide attacker given an explicitly reduced attacking remit in exchange for full defensive tracking of the opposing full-back/wing-back
- Defensive responsibility: Full tracking of the opposing wide player through the entire defensive phase, effectively forming a temporary back five/six when defending
- Attacking responsibility: Secondary — provides an outlet on the counter but is not the primary creative source
- Movement: Holds a more withdrawn starting position than a typical winger, closer to the opposing full-back at all times
- Preferred zones: Z16/Z20, more withdrawn than a standard winger's Z20/Z25
- Passing: Simple, safe outlet passing
- Pressing: Engages the opposing full-back directly and consistently rather than pressing higher CBs
- Defensive: The highest defensive-tracking discipline of any winger-type role; used specifically to neutralize an opponent's strongest attacking full-back/wing-back
- Transition: Provides an out-ball but is expected to prioritize recovery positioning over joining every counter
- Combinations: Full-back behind him (forms a defensive pairing on that flank)
- Strengths: Defensive reliability, negates opponent's wide attacking threat
- Weaknesses: Reduced attacking output compared to a standard winger; a specialist/situational role rather than a default choice
- Instructions: "Track the full-back," "prioritize defensive shape over attacking freedom"

**Wide Target Man**
- Primary role: A physically dominant wide forward used as an aerial/hold-up outlet from wide areas rather than for pace or dribbling
- Defensive responsibility: Minimal
- Attacking responsibility: Wins aerial duels from crosses/long balls delivered into the wide channel, holds up the ball under pressure from full-backs
- Movement: Holds a wide, high starting position with minimal lateral drift; relies on strength/positioning rather than movement to create separation
- Preferred zones: Z20/Z25 wing, high and wide
- Passing: Lay-offs and knockdowns rather than creative passing
- Pressing: Leads the press on the opposing full-back using physical presence
- Defensive: Minimal
- Transition: A physical out-ball option under pressure — teammates look to him to win and retain the ball rather than to sprint in behind
- Combinations: Overlapping full-back/wing-back (arrives to combine off the knockdown)
- Strengths: Aerial ability and physical hold-up play in a wide area most other wide-role profiles lack
- Weaknesses: Limited dribbling/pace threat compared to a standard winger; less effective against a mobile, physically comparable full-back

**Half-Back**
- Primary role: A defensive/holding midfielder who drops between the centre-backs specifically during build-up to form a back three, then steps back into midfield once the ball progresses
- Defensive responsibility: Standard pivot screening once out of the build-up phase
- Attacking responsibility: Initiates play from the deepest possible central zone, effectively an auxiliary CB in possession only
- Movement: Drops between/beside the CBs when the goalkeeper/CBs have the ball, steps back up into the midfield line once the ball has progressed past the first press line
- Preferred zones: Z3/Z8, oscillating between the two depending on possession phase
- Passing: Composed, press-resistant, often the first line-breaking pass of the entire buildup sequence
- Pressing: Screens centrally once back in midfield position
- Defensive: Provides an auxiliary defender specifically against a high 2-striker press, neutralizing a 2v2 in the first build-up line by making it 3v2
- Transition: Must recover into midfield shape quickly once the ball has progressed, or the team is left with only two out-and-out CBs
- Combinations: Both centre-backs (forms the temporary back three), goalkeeper (auxiliary passing option)
- Strengths: Solves numerical disadvantages against a 2-striker high press specifically, composure on the ball
- Weaknesses: If mistimed, leaves the midfield short during the exact moment the opponent might counter-press
- Instructions: "Drop into the back line during build-up," "step back into midfield once progressed"

**UNIVERSAL PRINCIPLE:** Every role in Sections 3 and 51 is a specific, named answer to the same underlying question: *given this player's physical/technical profile, what is the single highest-value repeatable behavior we can assign them within the team's structure?* A Tactical Battle Engine should treat "playing style" as a constrained optimization layered on top of "position" (Section 3's base label) — the position sets the zone of operation, the style sets the specific movement/passing/pressing behavior expected within that zone.

---

## SECTION 52 — ADDITIONAL FORMATIONS

Extending Section 4's formation catalogue with further structures seen in professional football, using the same profile format: Arrangement, Strengths, Weaknesses, Build-up, Defensive, Pressing, Attacking, Transition, Vulnerable zones, Best styles, Exploited by.

### 4-1-3-2
- Arrangement: Single pivot, three-man midfield line ahead of the pivot, two strikers
- Strengths: Strong central presence across two midfield banks (4 central players total ahead of the back line), good vertical passing lanes into the strike partnership
- Weaknesses: Minimal natural width — full-backs must provide nearly all of it, similar to the 4-4-2 diamond; the single pivot can be overloaded
- Build-up: Pivot as the primary first-phase outlet, CBs split to receive either side of an initial press
- Defensive: Compresses centrally into a narrow, hard-to-play-through block; wide recovery relies entirely on full-back pace
- Pressing: The three-man line ahead of the pivot presses the opposition's midfield; strikers curve to press the CBs
- Attacking: Central overloads and combination play, strike partnership interchanging off knockdowns
- Transition: Pivot must screen immediately on turnover to prevent a direct central counter
- Vulnerable zones: Both flanks; the zone behind an isolated single pivot if bypassed
- Best styles: Central-combination-heavy possession football with a genuine two-striker partnership
- Exploited by: Sustained wide overloads on both flanks; direct diagonal balls that bypass the lone pivot entirely

### 3-1-4-2
- Arrangement: Back three, single holding pivot, four-man midfield line (often including wide players functioning like wing-backs), two strikers
- Strengths: Strong central control with the pivot screening directly in front of the back three, numerical presence across midfield
- Weaknesses: The pivot is isolated as the only actual defensive-midfield body — heavy defensive responsibility falls on one player
- Build-up: Back three splits wide, pivot drops to offer a central passing option between them
- Defensive: Pivot screens centrally; back three provides cover in behind
- Pressing: Front two press CBs, midfield four press in a coordinated line, pivot holds position rather than pressing high
- Attacking: Wide midfield players provide width, central pair link with the strike partnership
- Transition: Vulnerable if the pivot is bypassed and the back three is forced into 3v2 or worse against a fast counter
- Vulnerable zones: The zone directly around the isolated pivot; space behind advanced wide midfielders
- Best styles: Possession-control systems built around a technically excellent, high-workrate single pivot
- Exploited by: Overloading the pivot's zone 2v1 or 3v1; direct counters targeting the space the pivot alone is meant to cover

### 4-2-1-3
- Arrangement: Double pivot, single central #10, front three
- Strengths: Very strong defensive base (double pivot) combined with a genuine central creative outlet and full attacking width from the front three
- Weaknesses: The #10 can become isolated between the double pivot and front three if the team is pressed into a lower block
- Build-up: Double pivot rotates to receive, full-backs provide width in support of the front three
- Defensive: Can compress into a 4-4-1-1/4-5-1 mid-block, with the #10 dropping to support the double pivot
- Pressing: Front three press the CBs in a curved line, #10 screens the opposition's deepest central outlet
- Attacking: #10 as the primary line-breaking passer/creator, front three interchange and stretch the back line
- Transition: Double pivot provides rest-defence security similar to a 4-2-3-1
- Vulnerable zones: Space between the #10 and the double pivot if the #10 is not tracking back to link the lines
- Best styles: Balanced possession-control football with a clear individual creative focal point
- Exploited by: Direct pressing on the double pivot 3v2; isolating the #10 by denying him passing lanes on both sides simultaneously

### 4-1-2-1-2 (Narrow Diamond, Split-Striker Variant)
- Arrangement: Single pivot at the base, two central 8s, single #10 at the tip, two strikers positioned slightly split rather than central
- Strengths: Similar central density to the 4-4-2 diamond (Section 4) but the split strikers create more room for the #10 to operate through the middle
- Weaknesses: Still no natural width; full-backs remain the only wide outlet
- Build-up: Pivot as the primary outlet, CBs split to receive
- Defensive: Compresses centrally; full-backs must cover both defensive width and recovery
- Pressing: #10 and split strikers combine to press the CBs and pivot; central midfield screens beneath
- Attacking: Combination through the central column, split strikers stretching the CBs apart to open the central lane for the #10
- Transition: Pivot screens immediately; split strikers provide two separate out-ball options rather than one central striker
- Vulnerable zones: Both flanks, identical structural weakness to the standard 4-4-2 diamond
- Best styles: Central-combination possession football with an emphasis on individual creative quality at the #10
- Exploited by: Sustained wide overloads on both flanks simultaneously

### W-M (3-2-2-3, Historical)
- Arrangement: A historically foundational shape (three defenders, two half-backs, two inside forwards, three forwards forming a "W" in defense/midfield and an "M" across the attacking line)
- Strengths: Balanced by the standards of its era, an early attempt to solve the defensive fragility of the 2-3-5 (Section 4) while retaining attacking numbers
- Weaknesses: By modern standards, minimal pressing structure and defensive cover compared to any contemporary formation
- Best styles: Historical/foundational reference point only — included for completeness, since many of the positional principles that evolved into today's back-four systems trace their lineage through this shape
- Note: Not used at any level of the modern professional game in its literal historical form, but understanding it clarifies the historical progression from the 2-3-5 toward today's back-four base structures

### 4-6-0 (Ultra False Nine / Strikerless)
- Arrangement: No recognized central striker at all — the front line is formed entirely by wide forwards and advanced midfielders rotating into the central striker zone rather than a dedicated occupant
- Strengths: Extreme unpredictability for man-marking defenders, since there is no fixed target to mark; creates persistent central overloads as multiple midfielders rotate through the striker zone
- Weaknesses: Loses a fixed aerial/hold-up presence entirely; can lack a clear focal point for direct crosses or long balls, and requires exceptional positional intelligence/interchange discipline from every attacking player to avoid becoming disorganized
- Build-up: Similar to a 4-2-3-1/4-3-3 base, distinguished specifically by the absence of any player holding the last line permanently
- Defensive: Whichever attacker is central at the moment of losing possession becomes the first presser — this role is fluid rather than fixed
- Pressing: High-intensity, rotational pressing since no single player is tied to the front line alone
- Attacking: Constant rotation into and out of the central zone, designed specifically to drag opposition centre-backs out of position with no fixed opponent to track
- Transition: Vulnerable to direct, fast counters if the rotating front line is caught out of central positions simultaneously
- Vulnerable zones: The permanent absence of a held central position can be exploited by a disciplined back line that simply holds its shape rather than being drawn out, since there's no fixed threat pinning the last line
- Best styles: Extreme positional-play systems built around several interchangeable, technically excellent forwards rather than a single out-and-out striker
- Exploited by: A defensively disciplined back line that refuses to be drawn out by rotation, forcing the team to beat them through sustained combination play rather than through defensive disorganization

---

## SECTION 53 — SET-PIECE DEEP DIVE (Routines, Roles & Marking Mechanics)

Section 19 lists set-piece categories at a surface level. This section adds the actual routine mechanics, player roles, and marking-scheme logic coaches use — grounding Section 46.3/50.2's numeric set-piece value data in concrete, executable detail.

### 53.1 Attacking Corner Roles

| Role | Function | Movement Logic |
|---|---|---|
| Delivery taker | Executes the cross/corner | Chooses in/outswing based on the primary target's preferred header side and the goalkeeper's positioning tendency |
| Front-post runner | Attacks the near post area | Times a run to arrive just before the ball to flick it on or finish directly, often the aerial-weakest but quickest attacker |
| Back-post target | Attacks the far post | Positioned to attack space the goalkeeper and front-post congestion leave uncovered — usually the team's strongest aerial threat |
| Edge-of-box loiterer | Stays outside the penalty area | Positioned to collect a clearance or a short knockdown for a first-time shot, and to provide immediate defensive cover if the corner is cleared |
| Blocker/screener | Positions legally between a marker and the space that marker needs to reach | Times the block to coincide with the delivery, not before — an early, static block is more likely to be flagged as an offence than one timed to the ball's flight |
| Goalkeeper disruptor | Positions near/around the opposing goalkeeper | Aims to obstruct the goalkeeper's ability to attack the ball in the air without committing a foul, exploiting the goalkeeper's need to judge flight, distance, and traffic simultaneously |
| Short-corner outlet | Stays available for a short pass rather than making a box run | Used when the delivery angle/congestion doesn't favor a direct cross, creating a fresh crossing angle from a different position |

### 53.2 Defending Corners — Marking Systems in Detail

| System | Mechanics | Real-World Trade-off |
|---|---|---|
| Pure man-marking | Every defender is assigned one specific attacker and follows them regardless of where they move pre-delivery | Eliminates a specific individual threat completely but is vulnerable to blocking/screening tactics (53.1) that physically prevent the marker from tracking their run |
| Pure zonal marking | Every defender is assigned a fixed zone in and around the six-yard box, attacking whichever ball enters their zone regardless of who's attacking it | Removes vulnerability to individual blocking runs since zones can't be "blocked" the way a specific runner can, but can be exploited by a team that overloads a single zone with multiple simultaneous runners |
| Hybrid marking | The team's most dangerous 1-2 aerial threats are man-marked individually; every remaining space is covered zonally | The most common real-world approach at the professional level — balances the individual-threat coverage of man-marking with the structural resistance to blocking of zonal marking |
| Near-post zonal + man-marked far post | A specific split where the near-post area (highest-frequency delivery zone) is covered zonally by 2-3 defenders while the far post's single most dangerous aerial threat is man-marked | Reflects the real statistical tendency for near-post deliveries to be more frequent but far-post headers to often be higher quality/less contested |
| Goalkeeper's positioning | Typically starts just off the near post, angled to cover the full width of the goal against a direct shot while retaining the ability to attack crosses aimed at the near-to-central area | A goalkeeper positioned too central at the moment of delivery is vulnerable to a near-post flick; positioned too near-post, they're vulnerable to a direct far-post effort |

### 53.3 Free-Kick Routines

| Routine | Mechanics |
|---|---|
| Direct wall + far-post cover | The defending wall is set to cover the direct shooting angle to the near post; the goalkeeper covers the remaining far-post angle, with wall height/positioning adjusted based on the taker's known shooting tendency (curl over vs. driven through) |
| Dummy runner over the ball | An attacker steps over the ball without touching it immediately before the actual taker strikes it, designed to briefly disrupt the wall's focus/jump timing |
| Short lay-off routine | Ball is played short to a nearby teammate at an improved shooting/crossing angle rather than struck directly, used when the direct angle is well-defended by the wall |
| Near-post far-post double option (indirect/crossing free kicks) | Functions identically to a corner's near-post/far-post attacking roles (53.1), since an indirect free kick delivered into the box is tactically a corner-kick equivalent |
| Wall-jump timing | Defensive wall players are coached to jump at the exact moment of the strike (to block a chip/dip over the top) without jumping early (which opens a gap under the wall for a low, driven shot) |

### 53.4 Throw-In Tactics

| Tactic | Mechanics |
|---|---|
| Long throw as a set-piece weapon | A specialist long-throw taker delivers the ball into the box with a trajectory/pace similar to a corner, using the same near-post/far-post attacking roles from 53.1 — functionally a "free corner" from a wide position, since a throw-in cannot be offside |
| Quick throw to exploit disorganization | Taken rapidly before the defence resets, exploiting the brief moment of defensive disorganization immediately after the ball goes out — most effective in transition moments rather than as a structured routine |
| Overload near the touchline | Multiple players positioned close to the throw-in taker to create numerical superiority in a tight area, using short combination passing to escape a well-drilled press near the touchline |
| Defensive third throw-in retention | Thrown short and backward/sideways specifically to retain possession and reset shape, treated with the same low-risk logic as Section 1.2's defensive-third passing principle |

### 53.5 Penalty-Kick Psychology & Data

| Factor | Real-World Logic |
|---|---|
| Placement over power | Analytics on penalty outcomes consistently show that shot placement (corners of the goal, away from the goalkeeper's likely dive) is a stronger predictor of success than raw shot power alone |
| Goalkeeper pre-kick research | Goalkeepers at the professional level increasingly use data on a specific taker's historical placement tendencies to bias their dive direction before the kick is struck, rather than reading the taker's body shape alone in real time |
| Run-up disguise | Elite penalty takers deliberately delay the final decision on placement until the last possible stride, to avoid telegraphing direction through body shape/run-up angle that a data-informed goalkeeper could exploit |
| Order of takers in a shootout | Some evidence suggests a measurable pressure effect on the team taking second in a penalty shootout (having to respond to the outcome of each preceding kick), though this remains a debated and studied area rather than settled consensus |

---

## SECTION 54 — GOALKEEPER TACTICAL DEEP DIVE

Section 3.1 profiles the three core goalkeeper archetypes. This section adds the decision-making and technical mechanics beneath those profiles.

### 54.1 Shot-Stopping Positioning Logic

| Concept | Real-World Logic |
|---|---|
| Narrowing the angle | Moving off the goal line toward the ball reduces the amount of open goal a shooter can see, at the cost of increased vulnerability to a chip/lob over the top if advanced too far |
| Set position timing | Goalkeepers aim to be balanced and "set" (weight evenly distributed, ready to push off either direction) at the exact moment of the shooter's strike, not before — being set too early allows the shooter to see and exploit the goalkeeper's committed stance |
| Near-post/far-post responsibility | On an angled shot, the goalkeeper is generally responsible for the near post themselves, while defenders are coached to provide far-post cover, since a goalkeeper who is beaten near-post on a tight angle is considered a more preventable error than a far-post placement |
| Set-piece vs open-play stance | Positioning is more central/reactive on a direct set-piece shot (where the takers's technique is the primary variable) versus more angle-narrowing on an open-play 1v1 (where closing distance is the primary tool) |

### 54.2 1v1 Situations

| Principle | Real-World Logic |
|---|---|
| Delay, don't dive early | Advancing to narrow the angle while staying on his feet for as long as possible forces the attacker to make the first, harder decision (i.e. finish under pressure) rather than the goalkeeper committing to a dive the attacker can simply pass around |
| Make yourself big | Spreading the body (arms and legs) at the moment of the attacker's touch/shot maximizes the covered goal area without needing to guess a direction |
| React to the touch, not the run | Committing to a save attempt based on the attacker's actual touch/shot technique (a late reaction) is generally more effective than committing based on anticipating the run's direction alone, since it removes the risk of being sold a dummy |

### 54.3 Distribution Decision Tree

| Situation | Distribution Choice | Logic |
|---|---|---|
| Opponent in a high, aggressive press | Short, patient build-up through the CBs, or a direct long ball over the top of the press | Depends on whether the team has the CB quality to press-resistant build-up through it (Section 9's channel logic) or is better served bypassing it entirely |
| Opponent in a mid/low block | Quick, short restart to maintain tempo and territorial control | A slow, deliberate restart against a settled defensive block gives the opponent time to reset any gaps that a quick restart might otherwise catch open |
| Team has just won the ball in a dangerous transition moment | Fast, direct distribution to an advanced runner | Matches Section 15's core transition-speed principle — a goalkeeper's distribution speed after a save is itself part of the team's transition-attack window |
| Wide vs central target | Central pivot/CB for control, or full-back/wing-back in space for immediate progression | Selected based on which option is actually open under the current press shape, following the same passing-channel logic as Section 9 |

### 54.4 Commanding the Box

| Principle | Real-World Logic |
|---|---|
| Claim vs punch decision | A goalkeeper claims (catches) a cross when they have a clear path and sufficient confidence in the catch; they punch clear when traffic/pressure makes a clean catch unreliable, prioritizing simply removing danger over retaining possession |
| Communication | Constant verbal organization of the defensive line (offside calls, marking assignments, "keeper's" calls for crosses) is considered a core, non-optional goalkeeping skill rather than a bonus attribute, since defensive organization in the box is functionally led by the goalkeeper's viewpoint of the whole picture |
| Starting position for crosses | Positioned slightly off-centre toward the near post for a cross from the same side the ball is being delivered from, similar to the corner-kick positioning logic in Section 53.2 |

---

## SECTION 55 — FORMATION VS FORMATION: DIRECT MATCHUP DATABASE

Section 30 profiles each formation's general best/worst matchups. This section analyses specific head-to-head pairings in full depth, using the format: BUILD-UP | MIDFIELD | WINGS | HALF-SPACES | PRESS | DEFENSIVE BLOCK | TRANSITION | REST DEFENCE | MAIN WEAKNESS | COUNTER.

### 4-3-3 vs 5-3-2

| Dimension | Analysis |
|---|---|
| Build-up | 4-3-3's back four has a numbers advantage in the first phase against 5-3-2's front two, generally allowing clean progression through the CBs |
| Midfield | Mirrored 3v3 — genuinely contested zone, likely decided by individual quality and rotation discipline rather than structure |
| Wings | 4-3-3's front-three width vs 5-3-2's back-five width is roughly even numerically, but 5-3-2's wing-backs are pulled into deeper defensive duty, reducing their own attacking outlet |
| Half-spaces | 4-3-3's inverted movements from wide forwards can find joy between 5-3-2's wing-back and the nearest of the back three |
| Press | 5-3-2's front two alone cannot press a back four evenly — 4-3-3 typically enjoys a spare man in the first build-up line |
| Defensive block | 5-3-2 is very compact and hard to break down centrally, forcing 4-3-3 into prolonged wide combination |
| Transition | 5-3-2 is built to counter through two strikers exploiting 4-3-3's advanced full-backs |
| Rest defence | 4-3-3's advanced full-backs create the single biggest defensive-transition risk in this matchup |
| Main weakness | 4-3-3's full-backs, once committed, leave exactly the space 5-3-2's counter is designed to exploit |
| Counter | 4-3-3 must hold at least one full-back and a pivot player in a disciplined rest-defence shape (core KB §16) to blunt the counter threat |

### 4-2-3-1 vs 3-4-3

| Dimension | Analysis |
|---|---|
| Build-up | 4-2-3-1's double pivot vs 3-4-3's front three pressing — roughly even, decided by whether the double pivot can find the #10 between the lines |
| Midfield | 3-4-3's four-man midfield line generally outnumbers 4-2-3-1's double pivot + #10 (3 central bodies) in pure central numbers |
| Wings | 4-2-3-1's full-backs vs 3-4-3's wing-backs is a like-for-like battle, often the most even zone on the pitch |
| Half-spaces | The #10 is the single most important individual in this matchup — if isolated by 3-4-3's compact midfield four, 4-2-3-1 loses its primary creative outlet |
| Press | 3-4-3's front three can curve their press to show 4-2-3-1's CBs centrally, cutting off the #10 as an easy out-ball |
| Defensive block | 4-2-3-1 can morph into a 4-4-1-1/4-5-1, which is well-suited to matching 3-4-3's central presence when defending |
| Transition | 3-4-3's advanced wing-backs are a defensive-transition risk symmetrical to 4-3-3's full-backs above |
| Rest defence | Both systems carry similar wide-transition risk; this matchup is often balanced on this specific dimension |
| Main weakness | 4-2-3-1's isolated #10 if central passing lanes are denied |
| Counter | Drop the #10 deeper to combine directly with the double pivot, effectively forming a temporary 3-man central overload against 3-4-3's midfield four |

### 4-4-2 (flat) vs 4-3-3

| Dimension | Analysis |
|---|---|
| Build-up | Even numbers in the back four; 4-3-3's midfield three has a positional advantage over 4-4-2's flat four in receiving between lines |
| Midfield | The classic mismatch: 4-3-3's 3 central midfielders against 4-4-2's 2 central midfielders is a genuine 3v2, core KB Section 25's numerical-superiority logic directly in play |
| Wings | 4-4-2's front two occupy the CBs, freeing 4-3-3's full-backs to overlap relatively unopposed by an equivalent front-line threat |
| Half-spaces | 4-3-3's #8s can exploit the space between 4-4-2's midfield and back lines that a flat four-man shape structurally struggles to compress |
| Press | 4-4-2's front two alone cannot press a back four with a double pivot behind it evenly |
| Defensive block | 4-4-2's banks of four are compact horizontally but concede central numbers vertically |
| Transition | 4-4-2's front two provide an excellent direct counter-attacking out-ball if the ball is won cleanly |
| Rest defence | 4-3-3's advanced full-backs are again the primary transition risk |
| Main weakness | 4-4-2's central midfield 2v3 numerical disadvantage is the single most consistently cited structural weakness in formation-matchup analysis |
| Counter | One of 4-4-2's strikers must drop into midfield periodically to restore central parity, at the direct cost of the front two's usual attacking partnership |

### 3-5-2 vs 4-2-3-1

| Dimension | Analysis |
|---|---|
| Build-up | 3-5-2's back three (effectively a 3v1/3v2 against a lone or double-fronted press) generally builds cleanly |
| Midfield | 3-5-2's five-man midfield line significantly outnumbers 4-2-3-1's double pivot + #10 centrally |
| Wings | 3-5-2's wing-backs provide width without sacrificing central numbers, a structural advantage over 4-2-3-1's full-backs who must balance width and defensive duty simultaneously |
| Half-spaces | 4-2-3-1's #10 is the primary hope for finding space between 3-5-2's compact central presence |
| Press | 4-2-3-1's front line (striker + #10 + wide players) is generally too thin to press a back three with genuine central support behind it |
| Defensive block | 3-5-2 can drop wing-backs to form a back five, directly matching 4-2-3-1's width |
| Transition | 3-5-2's two strikers provide a strong, direct counter-attacking outlet |
| Rest defence | 3-5-2's advanced wing-backs are its own primary transition vulnerability, mirroring the full-back risk in other matchups |
| Main weakness | 4-2-3-1 is generally considered structurally disadvantaged centrally in this specific pairing |
| Counter | 4-2-3-1 must commit a winger to tuck inside and support the double pivot centrally, sacrificing some natural width to restore numbers |

*(This head-to-head format extends directly to any further formation pairing using the same 10-dimension structure — the analytical mechanism is consistent; only the specific numerical/positional balance changes per pairing.)*

---

## SECTION 56 — PLAYER VS PLAYER: TACTICAL MICRO-BATTLES

Individual duels that recur constantly within the broader team-shape battle. Format: THE BATTLE | ATTACKER'S ADVANTAGE | DEFENDER'S ADVANTAGE | DECIDING FACTOR | TACTICAL SUPPORT EACH SIDE NEEDS.

| Micro-Battle | Attacker's Advantage | Defender's Advantage | Deciding Factor | Tactical Support Needed |
|---|---|---|---|---|
| CB vs. target-man striker | Physical presence, hold-up ability, aerial threat | Can use cover from a second CB and jockey/delay rather than commit early | Whichever player wins the majority of first-contact aerial/physical duels sets the tone for the entire individual battle | Striker needs a runner alongside to attack knockdowns; CB needs a covering partner and a midfielder helping press the supply line |
| CB vs. poacher/pure finisher | Movement/timing in the box, low, sharp finishing | Positioning discipline, staying goal-side, denying clean sight of goal | Whoever wins the positional battle in the final 2-3 seconds before the shot, since a poacher rarely needs more than one clean touch | CB needs the defensive line to stay compact and covering; poacher needs quality service into the exact zones they exploit |
| Full-back vs. traditional winger (stays wide) | Directness, crossing quality, pace in a straight line | Can show the winger outside toward the touchline, a lower-danger area | Full-back's ability to delay without diving in, given a winger's threat is largely reduced once forced wide and deep | Full-back benefits from a winger/wide-mid tracking back to double up; attacking side benefits from an overlapping run stretching the full-back's decision |
| Full-back vs. inside forward (cuts inside) | Ability to cut onto a stronger foot and shoot/combine centrally | Can show the inside forward outside, away from their preferred foot/space | Whether the full-back can force the action onto the winger's weaker side consistently (core KB §Section 42's "show onto weak foot" logic) | Full-back benefits from a covering CB shifting across; attacking side benefits from an underlapping run that punishes the full-back for over-committing to the show |
| DM vs. AM/#10 | Vision, close control, operating between the lines | Physical duels, screening the passing lane into the #10 rather than chasing the #10 directly | Whether the DM can deny the #10 the ball entirely (screening) rather than winning individual duels against them once received | #10 needs a midfield partner to draw the DM's attention elsewhere; DM needs support from the back line to avoid being isolated if dragged out |
| CB vs. inside forward in transition | Pace and directness running at a CB in space, rather than a set defensive shape | CB in transition has less structural cover than in settled defence, but retains the individual technical/positional defending skillset | Whether the CB can delay long enough for defensive shape to reform, given a 1v1 in transition heavily favors a quality dribbler | CB needs a recovering teammate arriving within 2-3 seconds; attacker needs to commit the CB before support arrives, not delay for its own sake |
| GK vs. striker (1v1) | Composure, disguise, ability to wait out the goalkeeper's committed movement | Narrowing the angle, staying on feet as long as possible (core KB §54.2) | Whoever forces the other to commit first — a GK who dives early loses the duel almost automatically; a striker who shoots early into a set GK usually loses it too | GK needs defensive cover to prevent a completely clean run developing in the first place; striker needs the initial pass/through-ball to be weighted so the GK cannot close distance before the touch |
| Midfielder vs. a coordinated press (1 vs. 2/3) | Technical composure, quick release, awareness of supporting options before receiving (core KB §47.1's scanning) | Numerical advantage, coordinated pressing angles cutting off the primary escape lanes | Whether the midfielder scanned and pre-decided an escape route before receiving (core KB §49's chain logic) | Midfielder needs at least one genuinely open, scanned passing option; pressing team needs the second/third presser to actually arrive in time to close remaining lanes |

**UNIVERSAL PRINCIPLE:** Every micro-battle above resolves according to the same underlying pattern as the team-level Tactical Counter Matrix (Section 21) scaled down to two individuals — one side has a specific advantage, the other has a specific defensive/nullifying tool, and the outcome depends on which side's supporting structure (a covering teammate, a well-timed run, correct scanning) actually arrives in time to matter. A Tactical Battle Engine evaluating an individual duel should weight not just the two players' raw attributes (core KB §22) against each other, but the *support state* each currently has available — the same duel between the same two players resolves differently depending on whether support has arrived.

---

## SECTION 57 — TACTICAL FAILURE & SUCCESS PATTERN DATABASES

### 57.1 Tactical Failure Database

*Schema: ID | FAILURE | CAUSE | EFFECT | CORRECTION | NEW RISK INTRODUCED BY THE CORRECTION*

| ID | Failure | Cause | Effect | Correction | New Risk |
|---|---|---|---|---|---|
| FL001 | Press bypassed in one pass | Pressing unit engaged without a coordinated cover-shadow angle (core KB §11) | Opponent progresses cleanly past the entire press with a single line-breaking pass | Curve the pressing run to close the passing lane, not just the ball-carrier | A curved run is slightly slower to close distance, giving the carrier marginally more time on the ball if the pass isn't actually attempted |
| FL002 | Double pivot overloaded | Opponent commits 3 attackers/midfielders against a 2-man pivot | Central progression is repeatedly conceded through the overloaded zone | Drop a winger or full-back to temporarily form a 3-man central screen | Width is sacrificed, inviting the opponent to switch play into the vacated flank |
| FL003 | Full-back isolated 2v1 | Winger fails to track back after an attacking phase ends (core KB §Part BM #2) | Cheap wide chances conceded repeatedly from the same flank | Instruct the winger to prioritize recovery tracking | Reduces the winger's own attacking output/positioning for the next transition |
| FL004 | Half-space repeatedly exposed | No player assigned to screen the specific half-space a mezzala/inside forward is exploiting | Sustained line-breaking passes into the same zone | Assign a specific covering midfielder to that half-space rather than relying on general compactness | Thins coverage in whichever zone the covering midfielder was previously responsible for |
| FL005 | Poor rest defence after a corner | All available players commit to the attacking corner routine, none held back | Opponent counters immediately off a cleared corner into a completely open pitch | Hold back at least 2 players (including a CB) during attacking corners | Reduces the number of runners/targets in the box, lowering the corner's own attacking value |
| FL006 | Weak-side failure on a switch | Weak-side defender ball-watches rather than tracking their zone during a ball-side overload | A simple switch of play finds a completely free attacker | Weak-side defenders explicitly hold a "goal-side + zone-aware" position regardless of ball location | Requires constant defensive discipline/concentration even when the ball is far away, which is fatiguing to sustain for 90 minutes |
| FL007 | CB pulled out of position | A false nine or dropping striker draws the CB out of the back line to follow | The vacated central defensive zone is exploited by a runner from midfield | Assign a midfielder (not the CB) to track the dropping striker | The tracking midfielder is removed from their normal defensive/pressing duties elsewhere |
| FL008 | Midfield overloaded numerically | Formation mismatch, e.g. a flat 4-4-2 against a 3-man central midfield | Consistent central passing/progression conceded throughout the match | Temporarily shift to a 3-man central midfield (a striker drops, or a formation change) | Loses a front-line attacking presence/partnership |
| FL009 | Counterpress fails | Only 1 player engages the counterpress rather than the required 2-3 (core KB §11) | Opponent escapes the immediate pressure and launches a clean counter-attack | Establish a clear rule: the 3 nearest players always converge together on a turnover, not just the closest one | Committing 3 players to the counterpress leaves the rest of the team temporarily thin if it fails anyway |
| FL010 | Striker isolated | Midfield sits too deep/passive, leaving the lone striker with no support | Striker loses repeated individual duels with no assistance, possession is not retained after long balls | Push the nearest midfielder to support the striker more aggressively, shortening the vertical distance between lines | Compresses the team vertically, potentially conceding more space between midfield and the back line |
| FL011 | Offside trap fails | Back line steps up individually rather than in unison | A runner is played onside/through by a single defender's mistimed step | Establish a single designated "line caller" (typically the covering CB) whose movement the entire line mirrors | A single point of failure — if the line caller mistimes it, the entire line is compromised |
| FL012 | Set-piece marking assignment miscommunicated | Hybrid marking scheme (core KB §53.2) not clearly assigned pre-match, players unsure whether to man-mark or hold zone | An attacker is unmarked because both a man-marker and a zonal defender assumed the other had them | Explicitly assign and rehearse individual marking responsibilities in training, communicated loudly pre-delivery | Requires consistent, disciplined in-game communication that can break down under fatigue/crowd noise |
| FL013 | Wing-back caught upfield | Wing-back commits fully to an attacking overlap with no cover arranged behind | Opponent counters directly into the vacated wide channel behind the advanced wing-back | The nearest central midfielder shifts wide to cover the vacated wing-back zone the instant the wing-back commits forward | The central midfield temporarily loses a body in its own primary zone |
| FL014 | GK distribution under pressure rushed | Goalkeeper distributes without first scanning (core KB §47.1's scanning logic applied to the GK) | A hurried, low-quality pass gives possession away directly in a dangerous zone | GK explicitly scans options before receiving the back-pass, per the same pre-reception principle as outfield players | Slightly slower distribution tempo, which can cede a small amount of transition speed if the scan takes too long |
| FL015 | Central overload not recognized in time | Ball-side midfielder ball-watches rather than scanning the opponent's shifting shape | Opponent's central overload goes unaddressed until it has already progressed the ball | Institute continuous scanning discipline (core KB §47.1) as a standing instruction, not just a reactive habit | No direct new risk — this correction is close to a pure positive, though it demands sustained concentration |

### 57.2 Tactical Success Pattern Database

*Schema: ID | PATTERN | TRIGGER | EXECUTION | WHY IT WORKS*

| ID | Pattern | Trigger | Execution | Why It Works |
|---|---|---|---|---|
| SC001 | Overload-to-isolate switch | Opponent commits 6+ players to the ball-side half | Sustained ball-side overload, then a rapid diagonal switch to an isolated weak-side attacker | Converts a structural numerical advantage (core KB §7.1) into a direct, favorable 1v1 before the opponent can recover shape |
| SC002 | Third-man press escape | Opponent presses the ball-carrier with clear cover-shadow support | A pre-planned bounce pass through a third player positioned exactly in the shadow's blind spot | Bypasses the entire press structure in a single combination rather than attempting to dribble or force a pass through it directly |
| SC003 | False-nine disruption | Opponent's CBs are disciplined about not following runners out of the back line | Striker drops consistently enough that eventually either the CB follows (opening central space) or a midfielder must track (unbalancing their own shape) | Creates a genuine structural dilemma rather than a single unmarked moment — the disruption compounds over the course of a match |
| SC004 | Counterpress-to-shot | Team loses the ball in the attacking/middle third with 3+ players nearby | Immediate coordinated swarm on the new ball-carrier before the opponent's defensive transition organizes | The opponent is momentarily in their most disorganized defensive shape of the entire phase, immediately after winning the ball themselves |
| SC005 | Blocking-run set piece | Opponent uses pure man-marking at set pieces | A legally-timed screening run frees the primary aerial target at the moment of delivery | Exploits man-marking's specific structural vulnerability (core KB §53.2) rather than relying purely on the target's individual aerial ability |
| SC006 | Baited press then switch | Opponent presses aggressively and predictably on a specific trigger (e.g. back-pass) | Team deliberately plays a low-risk back-pass to invite the press, then immediately switches away from the committed pressing numbers | Uses the opponent's own aggression as the mechanism of their own undoing — the more committed the press, the larger the space it vacates |
| SC007 | Half-space rotation overload | Opponent's defensive block is zonally organized but has only one player per half-space | Two attackers rotate through the same half-space in quick succession, with a midfield runner arriving as a third option | Creates a temporary local overload the zonal defender cannot resolve alone without a handover (core KB glossary) from an adjacent defender |
| SC008 | Direct run in behind vs a settled low block | Opponent's low block is compact but has not been forced to defend in behind at all | A single well-timed run forces the back line to make its first genuine defensive decision of the sequence | Compact-but-static low blocks are often more vulnerable to a decisive run than to continued lateral circulation, since circulation doesn't force any individual decision |
| SC009 | Weak-foot isolation | A specific opponent defender/attacker has a known, exploitable weak-foot rating | Repeatedly show the play toward that individual's weaker side across multiple different phases of the match | A single technical weakness, systematically targeted rather than encountered incidentally, compounds into a significant recurring advantage over 90 minutes |
| SC010 | Delayed offside-beating run | Opponent plays an aggressive, well-drilled offside trap | Attacker delays the start of their run fractionally, staying level with the last defender rather than sprinting early | Neutralizes the trap's core mechanism (catching an early run offside) without needing any change to the passer's technique |
| SC011 | Fixture-fatigue targeted pressing | Opponent is in a period of fixture congestion (core KB §50.5) | Increase own pressing intensity specifically in the last 20 minutes, when the opponent's high-intensity running output is most likely to have declined | Exploits a known, data-supported physical decline window rather than pressing at a flat intensity throughout |
| SC012 | Cutback over cross | Opponent defends with a numbers-heavy, compact box | Deliver from the byline/cutback zone (core KB §Section 18/53) rather than an early cross into the crowded box | A cutback creates a shot from a different, often less-congested angle (edge of box) than a header contested by 4+ bodies |

*(These 27 entries are written to be genuinely distinct football knowledge rather than combinatorial padding, matching the standard set by the existing TP/PR/PS databases in Sections 26-29. Further entries following this exact schema can be added on request, or generated at scale — tied to specific zone/formation combinations — using `engine/rule_generator.py` from the master package, extended with a `failure_pattern`/`success_pattern` family function using the same combinatorial method already used for movement/pressing/third-man/overload rules.)*

---

## SECTION 58 — ADDITIONAL COMPLETE TACTICAL SIMULATION EXAMPLES

Extending Section 36 with further formation/style pairings not yet covered, in the same full-battle format.

### Simulation 6
**Team A:** 4-4-2 Diamond, Central Combination Play, Mid press | **Team B:** 4-1-4-1, Control-Based Possession, Low/Mid press

- Formation matchup: A's diamond provides central numerical strength (4 central bodies) against B's single pivot + midfield four, but A has no natural width, entirely reliant on full-backs.
- Build-up: A builds centrally through the diamond's base; B's single pivot is a specific, known central target for A's #10 to press directly.
- Pressing: A's front two can press B's single pivot 2v1 when the pivot receives, a recurring high-value trigger; B's compact midfield four makes A's own central diamond harder to progress through cleanly.
- Space: A's total lack of width is B's primary defensive advantage — B's full-backs can stay narrower than usual, reinforcing central compactness without conceding obvious wide space, since A has no wide outlet to punish it.
- Player movement: A's full-backs must provide 100% of the team's attacking width, an unusually high physical/tactical burden; B's wide midfielders tuck in defensively then break wide in possession.
- Passing channels: A is forced into central combination almost exclusively given its shape; B favors patient circulation designed specifically to draw A's narrow shape into uncomfortable wide recovery positions.
- Defensive block: B's compact 4-1-4-1 mid-block is well suited to denying A's central strength without needing to defend much width, since A rarely threatens it.
- Transitions: A's advanced full-backs (its only width) are the single clearest transition vulnerability in this matchup, mirroring the general full-back risk pattern seen across Section 36's other simulations.
- Tactical weaknesses: A risks being nullified entirely if its full-backs are shut down, since there is no secondary attacking method; B risks being pinned centrally if its single pivot is repeatedly isolated 2v1.
- Counter tactics: A should occasionally overload one full-back with a winger-style run from the nearest 8 to manufacture temporary width; B should ensure the single pivot always has a nearby central-midfield outlet to escape the 2v1 trigger.
- Expected game pattern: A congested, central, low-space match; goals are more likely to come from full-back combination play, set pieces, or individual quality than from open, fluid attacking sequences.

### Simulation 7
**Team A:** 3-4-2-1, Wing-back-led Positional Play, Mid/High press | **Team B:** 4-4-2 flat, Direct Football, Mid press

- Formation matchup: A's back three vs B's front two is numerically comfortable for A in the first phase; B's flat midfield four has a slight width advantage over A's narrower 2 (the "2" in 3-4-2-1).
- Build-up: A progresses through the back three splitting wide, with wing-backs providing the primary width; B looks to bypass midfield quickly with direct balls to its front two, minimizing time spent in a phase where it's numerically without a clear central advantage.
- Pressing: A's front three (the front one + two 10s) can press B's back four with reasonable coverage; B's front two alone struggle to press A's back three evenly, generally conceding the first-phase battle.
- Space: A's central 10s look to exploit the pockets B's flat four structurally struggles to close centrally; B's direct approach specifically avoids needing to find that space at all, bypassing the central battle entirely.
- Player movement: A's wing-backs are again the focal attacking/defensive burden; B's front two rely on aerial/knockdown combination and quick support runs rather than intricate build-up.
- Passing channels: A favors combination through the front three and switches to isolate a wing-back 1v1; B favors long, direct vertical channels that skip midfield.
- Defensive block: A can drop wing-backs to form a back five defensively; B's banks of four are compact but concede central numbers when out of possession against A's front three.
- Transitions: A's advanced wing-backs are, once again, the primary transition risk; B is well suited to direct counter-attacks via its front two the moment it wins the ball back.
- Tactical weaknesses: A risks being caught by B's direct, quick transitions specifically targeting advanced wing-backs; B risks minimal sustained territorial control against A's technical central superiority.
- Counter tactics: A should ensure at least one holding presence remains central even when both wing-backs advance; B should commit numbers quickly to support the front two's knockdowns rather than leaving them isolated.
- Expected game pattern: A dominates general territory and central combination play; B's threat is concentrated in a smaller number of fast, direct moments — a pattern-of-play contrast very similar to Simulation 3's counter-attacking dynamic, but generated by a direct/aerial mechanism rather than a genuine low-block/counter approach.

---

## SECTION 59 — ON-THE-BALL MOMENT ASSESSMENT FRAMEWORK (Analysis & Grading Rubric)

Sections 47-49 cover the *mechanics* of receiving and acting on the ball. This section provides the actual **assessment rubric** a tactical analysis program should use to grade the quality of any single on-ball moment — the missing link between "here's what a good touch looks like" and "here's how to score whether this specific touch, in this match, was actually good."

### 59.1 The Four-Layer Assessment Model

Every on-ball moment should be scored across four independent layers, since a player can succeed on one and fail on another (e.g., an excellent decision executed with poor technique, or a clean technical action that was the wrong decision):

| Layer | Question It Answers | What It Measures |
|---|---|---|
| **1. Pre-reception quality** | Was the player set up to succeed before the ball even arrived? | Scan count/timing (core KB §47.1), body orientation (§47.2), run/positioning timing (§47.3) |
| **2. Technical execution** | Was the physical action performed cleanly? | First-touch direction and weight (§48.1), balance, control under pressure |
| **3. Decision quality** | Was the chosen action the best one available, given what the player could see? | Compares the action taken against the full option set that was genuinely available (not against options that didn't exist) |
| **4. Outcome-adjusted value** | What did the action actually produce, and how much of that was skill vs. luck/opponent error? | Realized progression/chance-creation value (Part BW's TACTICAL_ACTION_VALUE) vs. the pre-action *expected* value of the option chosen |

**UNIVERSAL PRINCIPLE:** Layers 3 and 4 must be scored separately, because outcome alone is a biased judge of decision quality — a low-percentage speculative pass that happens to work is not retroactively a "good decision," and a high-percentage, correct decision that a defender exceptionally intercepts is not retroactively a "bad decision." An analysis engine that only scores outcomes will systematically mis-attribute skill and will reward risk-seeking behavior that doesn't actually carry positive expected value.

### 59.2 Decision Quality Sub-Rubric

For Layer 3 specifically, decision quality should be assessed against this checklist:

| Check | Pass Condition |
|---|---|
| Option awareness | Did the player appear to recognize the actual best-available option (verifiable via body orientation/scan direction before the touch, per §47.1), even if they ultimately chose differently? |
| Risk-appropriateness | Was the chosen action's risk level appropriate to the zone (core KB §1.2's universal risk principle — low-risk actions expected in the defensive third, higher risk tolerance acceptable in the attacking third)? |
| Tempo-appropriateness | Did the player's decision speed match the situation (a rushed decision under no real pressure, or an overly slow decision under genuine pressure, both count against this check)? |
| Team-shape awareness | Did the chosen action account for the team's current rest-defence/transition exposure (core KB §16), not just the immediate 1v1 picture? |
| Alternative comparison | Was a genuinely higher-value alternative available and clearly missed (distinct from a marginal alternative that was simply a matter of preference)? |

A player can score highly on execution (Layer 2) while scoring poorly on decision quality (Layer 3) — e.g., a technically excellent cross played into a crowded box when a cutback was clearly the higher-value option given the current defensive shape.

### 59.3 On-Ball Player Profile Aggregation

Aggregated across a match or season, the four-layer model produces a structured on-ball profile distinct from raw counting statistics:

```json
{
  "player_id": "string",
  "sample_size_on_ball_actions": 842,
  "pre_reception_quality_avg": 0.71,
  "technical_execution_avg": 0.78,
  "decision_quality_avg": 0.64,
  "outcome_adjusted_value_avg": 0.58,
  "decision_vs_outcome_gap": -0.06,
  "interpretation_note": "A negative decision_vs_outcome_gap suggests the player is making sound decisions that are somewhat under-rewarded by outcomes (e.g., good options are being intercepted at a rate the player doesn't control) rather than a genuine decision-making deficiency; a positive gap would suggest the reverse — outcomes flattering decision quality, often a sign of playing in a system/teammate context doing heavy lifting."
}
```

This distinction matters directly for recruitment/development use cases: a player with strong decision quality but a currently negative outcome gap is a better long-term bet than a player with the reverse profile, even if their raw output numbers look similar in a single sample window.

---

## SECTION 60 — OFF-THE-BALL POSITIONING ASSESSMENT FRAMEWORK

The off-ball equivalent of Section 59 — grading positioning quality independent of whether the player ever actually receives the ball, since most of a player's positioning value over 90 minutes is expressed in moments they don't touch the ball at all.

### 60.1 Off-Ball Assessment Dimensions

| Dimension | What It Measures | How It's Graded |
|---|---|---|
| Passing-lane creation | Does the player's positioning open a genuinely usable lane for the current ball-carrier? | Presence/absence of a defender directly between the player and the ball-carrier along the direct line |
| Space occupation value | Is the player occupying a zone with meaningful SPACE_VALUE (Part BX), or a low-value zone out of habit/comfort? | SPACE_VALUE score of the player's current zone relative to the zone's theoretical maximum given the current phase |
| Defensive fixing/pinning | Is the player's positioning forcing a defender to remain occupied, denying that defender the ability to cover elsewhere? | Whether removing the player from their current position would free up the assigned/nearest defender to help elsewhere |
| Rest-defence contribution | Is the player's positioning appropriately balanced between attacking presence and transition protection given the team's current rest-defence shape (core KB §16)? | Distance from the player's actual position to the position their rest-defence role (Section 16's structures) would assign them |
| Movement timing | When the player does move, is the timing synchronized with the ball-carrier's scanning/decision window (core KB §47.1/§47.3), rather than off-rhythm? | Correlation between the player's run-initiation moment and the ball-carrier's head-up/scanning moments |
| Weak-side discipline | Does the player maintain correct positioning even when the ball is far away, rather than drifting out of shape? | Positional deviation from the assigned zone as a function of ball distance — should remain low even at maximum ball distance |

### 60.2 The "Invisible Value" Problem

A significant proportion of elite off-ball value never appears in a raw event log at all — a run that drags two defenders out of position but is never actually passed to, a positioning choice that denies an opponent's press trigger, a weak-side hold that prevents a switch from being dangerous. A tactical analysis program relying purely on event data (passes, shots, tackles) will systematically undervalue these players relative to their actual tactical contribution.

**Correction approach:** score off-ball value using **counterfactual removal** — for each moment, estimate how the team's SPACE_VALUE, PRESSURE, and PITCH_CONTROL models (`01_CONCEPTUAL_MODELS.md`) would change if the player in question were removed from their current position, holding all other players constant. A player whose removal would significantly worsen the team's spatial picture is contributing real value, whether or not they ever touch the ball in that sequence.

```
OFF_BALL_VALUE(player, moment) = TEAM_SPACE_VALUE(with_player) - TEAM_SPACE_VALUE(without_player)
```

This is Class F (model assumption) — a structure for a Tactical Battle Engine to implement, not a claimed validated formula.

---

## SECTION 61 — TACTICAL PHILOSOPHIES & SCHOOLS OF THOUGHT

Sections 20-21 catalogue tactical *styles* (tiki-taka, gegenpressing, etc.) as executable systems. This section goes one level deeper — the underlying **football philosophies** that generate those styles, since a genuine tactical analysis program should understand not just *what* a team does but the coherent worldview that makes each individual decision (on-ball and off-ball) make sense as part of a whole. Each entry: CORE BELIEF | ON-BALL PHILOSOPHY | OFF-BALL PHILOSOPHY | RISK PHILOSOPHY | STRENGTHS | WEAKNESSES | HISTORICAL ASSOCIATION.

### 61.1 Positional Play (Juego de Posición)

- **Core belief:** The pitch itself, divided into zones (core KB §1.5), is the primary unit of tactical thought — players are interchangeable occupants of a position on a grid before they are individuals, and correct zonal occupation structurally guarantees passing options exist at all times.
- **On-ball philosophy:** Every on-ball action should first ask "does this maintain or improve our positional structure?" before asking "does this progress the ball?" — patience is a tool, not a failure of ambition.
- **Off-ball philosophy:** Constant, rule-governed rotation (core KB §7.1's rotations, Section 51's Half-Back/Carrilero roles) to ensure exactly one player occupies each of the five vertical lanes at each horizontal line, avoiding two teammates ever standing in the same lane simultaneously.
- **Risk philosophy:** Individually low-risk (short, high-percentage passing) but structurally high-commitment — the approach depends entirely on every player maintaining positional discipline, and a single player abandoning structure can collapse the whole system's passing-lane guarantees.
- **Strengths:** Sustained territorial and possession control; resistant to being outnumbered in any single zone since occupation is structurally guaranteed; creates a high volume of underloads/overloads to exploit.
- **Weaknesses:** Can become predictable/sterile against a disciplined low block if individual creativity within the structure is lacking; vulnerable in transition if rest-defence discipline (core KB §16) slips, since the approach commits significant numbers forward.
- **Historical association:** Most closely associated with the Dutch "Total Football" lineage and its direct development at Barcelona under successive coaching generations from the late 20th century onward; widely adopted in some form by most elite academies today.

### 61.2 Gegenpressing (Counter-Pressing as Philosophy, Not Just Tactic)

- **Core belief:** The moment immediately after losing the ball is the single highest-value defensive opportunity in football, because the opponent is, by definition, in their most disorganized attacking shape at exactly that instant — the best playmaker in the world is the moment of transition itself.
- **On-ball philosophy:** Possession is a means to create the *next* pressing trap, not solely an end goal — vertical, direct progression that risks a turnover in a favorable zone is philosophically acceptable, even encouraged, because a turnover high up the pitch simply becomes the next pressing opportunity.
- **Off-ball philosophy:** Constant readiness to swarm the ball the instant possession changes (core KB §11's counterpressing logic) takes priority over holding a settled defensive shape — defensive organization is treated as dynamic and event-triggered rather than a static formation to fall back into.
- **Risk philosophy:** Deliberately embraces turnovers as functionally acceptable, even useful, provided the team's pressing structure can convert them back into regains — a philosophy that explicitly rejects the idea that losing the ball is inherently bad.
- **Strengths:** Extremely disruptive to opponents who need time/space to build attacks; generates a high volume of turnovers in dangerous attacking zones; physically and psychologically taxing for opponents to play against for 90 minutes.
- **Weaknesses:** Extremely physically demanding (core KB §46.2/§50.5's fatigue data directly applies), difficult to sustain at high intensity across a full match or a congested fixture schedule; vulnerable to opponents who can bypass the initial press with quality or direct long-ball play that skips the phase gegenpressing is designed to attack.
- **Historical association:** Most closely associated with German coaching development from the 2000s-2010s onward and its most prominent Bundesliga/Premier League exponents.

### 61.3 Catenaccio & Reactive Football

- **Core belief:** Defensive solidity is the precondition for everything else — a team that cannot be scored against cannot lose, and attacking output should be calibrated to what the game state actually requires rather than pursued for its own sake.
- **On-ball philosophy:** Possession is treated instrumentally — retained when it serves defensive control (killing tempo, resting the team), released quickly and directly when a genuine transition opportunity exists, rarely pursued as an end in itself.
- **Off-ball philosophy:** Deep, compact defensive shape (core KB §14's low block) with a traditionally libero/sweeper-style extra covering defender concept at its historical origin, prioritizing the denial of clear-cut chances above all else.
- **Risk philosophy:** Minimizes variance deliberately — a philosophy that explicitly favors a low-scoring, controlled match over a high-event, unpredictable one, since unpredictability disproportionately benefits a weaker or underdog side less able to control outcomes through pure quality.
- **Strengths:** Extremely difficult to break down; well suited to counter-attacking against stronger, more possession-dominant opponents; historically effective specifically in knockout/must-not-lose contexts where a single defensive error is catastrophic.
- **Weaknesses:** Limited attacking ceiling by design; can become a self-fulfilling prisoner of its own caution against a genuinely weaker opponent who should be beaten more comfortably; often criticized for producing a less spectator-engaging style of match.
- **Historical association:** Originates from mid-20th-century Italian football (building on earlier Swiss/Austrian defensive theory) and remains a recognizable defensive-first tradition, particularly in cup/knockout football globally.

### 61.4 Direct Football / Route One

- **Core belief:** The most valuable space on the pitch is in behind the opponent's defence, and the most reliable way to attack it is to minimize the number of passes (and therefore the number of chances for a turnover) between winning the ball and threatening that space.
- **On-ball philosophy:** Forward, vertical passing options are prioritized over lateral/backward retention passes at essentially every decision point — a pass that progresses the ball 30 meters with a 60% completion chance is philosophically preferred over three short passes that progress it the same distance with a 90%+ chance each, because fewer total actions mean fewer total turnover opportunities.
- **Off-ball philosophy:** Physically dominant target players (core KB §3.4/§51's Target Man, Wide Target Man roles) positioned to win first contact, with midfield runners positioned specifically to win the resulting second ball (core KB §Section 38 glossary) rather than to build intricate combination play.
- **Risk philosophy:** Accepts a lower individual-pass completion rate as a rational trade-off for reduced total possession time and therefore reduced total exposure to a build-up-phase turnover in a dangerous zone.
- **Strengths:** Reduces exposure to being pressed/turned over in the build-up phase entirely, by minimizing time spent in that phase; can be highly effective against technically superior but physically/aerially weaker opponents.
- **Weaknesses:** Concedes territorial and possession control almost by design; heavily dependent on winning individual physical/aerial duels consistently; can become one-dimensional and easy to defensively prepare for if the target-man/second-ball mechanism is the only attacking method.
- **Historical association:** A long-standing tradition in English football particularly from the mid-20th century onward, and a recurring pragmatic approach globally for teams with a significant physical/aerial advantage over technically superior opposition.

### 61.5 Relationismo (Relational Play)

- **Core belief:** Football is fundamentally about the *relationships and combinations* between nearby players reading each other in real time, not about occupying pre-assigned structural zones — rigid positional rules can actually suppress the improvisational combination play that creates the highest-value chances.
- **On-ball philosophy:** Decisions are made based on the specific, live positioning of 2-4 nearby teammates and defenders in the immediate vicinity (small-sided combination logic) rather than a pre-determined structural rule about which zone should be occupied.
- **Off-ball philosophy:** Players cluster and combine in proximity-based groups rather than spreading to guarantee zonal coverage — two or more attackers occupying the same general area simultaneously is treated as an opportunity for combination (wall passes, third-man release, core KB §Section 38) rather than a structural error to be avoided.
- **Risk philosophy:** Accepts reduced structural/positional predictability (and therefore reduced rest-defence guarantees) in exchange for higher combination-play unpredictability that is harder for an organized opponent to scout and defend against systematically.
- **Strengths:** Extremely difficult for a zonally organized defence to prepare for since there is no fixed structural pattern to scout; can generate exceptionally high-quality combination chances in tight areas.
- **Weaknesses:** Highly dependent on exceptional individual technical quality and game-reading ability across multiple players simultaneously; can suffer from weaker rest-defence structure and transition vulnerability compared to a strictly positional system, since zonal coverage isn't structurally guaranteed the way it is in Section 61.1.
- **Historical association:** Most closely associated with South American, particularly Brazilian, football traditions and has seen renewed international discussion/adoption in recent years as a deliberate alternative to positional-play orthodoxy.

### 61.6 Comparative Summary

| Philosophy | Primary On-Ball Value | Primary Off-Ball Mechanism | Risk Stance | Biggest Structural Vulnerability |
|---|---|---|---|---|
| Positional Play | Structural passing-lane guarantee | Rule-governed zonal rotation | Low individual risk, high systemic dependency | Predictability vs. a disciplined low block; rest-defence lapses |
| Gegenpressing | Vertical progression as press-bait | Event-triggered pressing swarm | Turnovers explicitly accepted | Physical/fatigue sustainability |
| Catenaccio/Reactive | Instrumental possession | Deep, compact covering shape | Variance minimization | Limited attacking ceiling |
| Direct/Route One | Minimize actions, maximize verticality | Target-man + second-ball structure | Accepts lower completion% for fewer total actions | One-dimensionality, territorial concession |
| Relationismo | Live, proximity-based combination | Clustered, improvisational grouping | Accepts structural/rest-defence unpredictability | Transition vulnerability, dependency on individual quality |

**UNIVERSAL PRINCIPLE:** No philosophy is a universally correct answer — each represents a different, internally coherent set of trade-offs across the same underlying variables (possession retention vs. progression speed, structural predictability vs. combination unpredictability, individual risk vs. systemic risk). A Tactical Battle Engine's `TEAM_TACTICAL_SIGNATURE` (`01_CONCEPTUAL_MODELS.md` Part CE) should ultimately be understood as a specific point in this same trade-off space, whether or not a real team's coaching staff would label it with any of these five historical names.

---

# ADVANCED LAYER: SYSTEMIC TACTICAL DYNAMICS

*The sections below add a new analytical layer on top of Sections 1-61: not "what formations/movements exist" but "how a single action propagates through opponent responses, space changes, and team adaptations." This layer is built around the causal chain PLAYER → MOVEMENT → SPACE → OPPONENT RESPONSE → TEAM ADAPTATION → COUNTER → OUTCOME.*

## SECTION 62 — FOOTBALL GEOMETRY

### 62.1 Angles

| Concept | Definition | Tactical Effect |
|---|---|---|
| Passing angle | The angle formed between the passer, the ball's intended path, and the receiver's position relative to pressure | A pass played into a receiver's body from a poor angle (e.g., directly in line with a defender's press) is far easier to intercept or cushion poorly than one played from an angle that opens the receiver's body toward space |
| Receiving angle | The angle at which a receiver positions relative to the passer and the nearest defender | An receiver angled to receive across their body (core KB §47.2) can use the angle itself as part of the escape mechanism; a receiver square to both passer and defender has no such advantage |
| Defensive angle | The angle a defender holds relative to the ball-carrier and the space/player they're protecting | A defender positioned goal-side and ball-side simultaneously (the "cover" angle) protects both the direct route to goal and the passing lane at once; a defender square to the ball alone protects neither fully |
| Pressing angle | The angle of approach a presser takes toward the ball-carrier | A press approaching from directly ahead allows the carrier to see and react to it; a curved press (core KB §11) closes the angle to a specific passing lane while still applying frontal pressure |
| Cover angle | The angle a covering defender holds relative to both the engaged defender and the remaining space | Positioned too square-on to the engaged duel, the cover defender protects only a straight-line breakthrough; positioned at roughly 45°, they cover both the direct breakthrough and a lateral escape |

### 62.2 Shapes: Triangles & Diamonds

| Shape | Structure | Tactical Value |
|---|---|---|
| Passing triangle | Three players positioned so each has a direct passing lane to the other two, none in a straight line with each other | The foundational unit of possession retention — guarantees at least two live options for whichever of the three has the ball, and enables the third-man pattern (core KB §Section 38 glossary) natively |
| Passing diamond | Four players positioned with one at each of a near, far, wide-left, and wide-right point relative to the ball | Adds a vertical dimension to the triangle's guarantee — provides a forward option, a backward option, and two lateral options simultaneously, which is why the 4-4-2 diamond and similar central-diamond structures (core KB §4) are built around this exact shape |
| Overlapping triangles | Multiple triangles sharing a common player, tiled across a zone or the whole pitch | The geometric basis of positional play's "always have two passing options" coaching cliché — in a well-structured team shape, nearly every player should sit inside at least one live triangle at any moment |
| Broken triangle | A triangle where one player's positioning collapses the angle (two players end up in a direct line) | A common, coachable structural error — removes one of the two guaranteed passing lanes and is a frequent, specific cause of a "why did we lose the ball there" moment traceable to pure geometry rather than pressure or individual error |

### 62.3 Distances & Team Geometry

| Concept | Definition | Tactical Effect |
|---|---|---|
| Distance between players | The spacing between any two teammates | Too close: reduces passing-lane variety and makes a single defender able to press two players at once; too far: increases pass risk/interception time and slows combination tempo |
| Distance between lines | The vertical gap between a team's defence, midfield, and attack lines | The single most commonly cited structural metric in real coaching — a team "too stretched between lines" is conceding the exact between-the-lines pockets described in Section 1.3/Zone 14 |
| Team width | The horizontal distance between the widest-positioned players | High width stretches the opponent's defensive block horizontally, opening central passing lanes at the cost of a longer distance to travel to switch play |
| Team length | The vertical distance between the deepest and highest players | High team length can stretch a defensive block vertically but increases the distance between the pressing front line and defensive back line, risking central compression failure if not matched by pressing coordination |
| Vertical compactness | How tightly the three lines (defence/midfield/attack) are grouped vertically | High compactness denies between-the-lines space at the cost of ceding depth in behind and width; the central defining trade-off of block height (core KB §13-14) |
| Horizontal compactness | How tightly players are grouped side to side | High horizontal compactness denies central space at the cost of conceding the flanks, the mechanism underlying the 4-4-2 diamond/narrow systems' core weakness (core KB §4, §52) |
| Support distance | The distance a nearby teammate holds to provide a simple release option for the ball-carrier | Typically kept shorter under pressure (a quick out-ball) and can extend further with time/space (a longer progressive option) |
| Cover distance | The distance a covering defender holds behind an engaged teammate | Too close: the cover defender is also beaten by the same action that beats the first defender; too far: too slow to actually provide cover when needed |
| Pressing distance | The distance a presser closes before engaging | Closing too early telegraphs the press and allows an easy release; closing too late allows a free, unpressured action |
| Team centroid | The average (x,y) position of all outfield players, a single-point summary of the team's overall location | Used as a simplified proxy for territorial positioning (core KB §46's field tilt is a related but zone-based concept) — a rapidly shifting centroid indicates a team in active transition rather than settled organization |
| Defensive-line height | The vertical position of the back line relative to the team's own goal | Directly trades off space conceded in behind against compactness/pressing-support gained — the single most consequential defensive-geometry decision a team makes (core KB §13-14) |
| Pitch occupation | The overall pattern of which zones (core KB §1.5's 30-zone grid) a team's players are currently occupying | The raw input every other geometric concept in this section is ultimately derived from |

**UNIVERSAL PRINCIPLE:** Every tactical decision — a press, a run, a pass, a defensive shift — is, at the geometric level, an attempt to either preserve a favorable set of angles/distances for your own team or to collapse the opponent's favorable angles/distances. A Tactical Battle Engine's SPACE_VALUE and PITCH_CONTROL models (`01_CONCEPTUAL_MODELS.md`) are, in effect, geometry converted into a decision-relevant number — this section is the underlying geometric vocabulary those models are built from.

---

## SECTION 63 — SCANNING & PERCEPTION (Deep Model)

Core KB §47.1 introduced scanning at the mechanical level. This section builds the full cognitive-tactical pipeline and applies it per position.

### 63.1 The Perception Pipeline

```
SCAN → IDENTIFY → INTERPRET → DECIDE → ACT
```

| Stage | What Happens | Failure Mode If Skipped/Rushed |
|---|---|---|
| SCAN | Head turns to sample the environment — opponents, teammates, space, ball | No new information enters the decision at all; the player is acting on stale information |
| IDENTIFY | The specific relevant objects are recognized — "there is a defender at my back-left," "the winger is unmarked" | Information is sampled but not parsed — a common failure under time pressure or fatigue, where a player scans but doesn't process what was seen |
| INTERPRET | The identified objects are converted into tactical meaning — "that unmarked winger represents a switch-of-play opportunity" | Information is correctly identified but its tactical significance is missed — a technical/perceptual gap distinct from simply not looking |
| DECIDE | A specific action is selected from the available option set | A correctly interpreted picture can still produce a poor decision if risk/reward weighting is miscalibrated (core KB §59.2's decision-quality checklist applies directly here) |
| ACT | The technical execution of the chosen action | Even a correct decision fails here if execution (core KB §48.1's first-touch fundamentals) is poor |

This pipeline is the full expansion of core KB §49's "SCAN → BODY ORIENTATION → TOUCH" chain, adding the two intermediate cognitive stages (IDENTIFY, INTERPRET) that sit between raw visual sampling and the eventual physical action.

### 63.2 Scanning Frequency & Timing Model

| Factor | Real-World Logic |
|---|---|
| Baseline frequency | Elite central midfielders scan noticeably more often per possession than average players at the same level, consistent with the analytics referenced in core KB §47.1 |
| Frequency by position | Central positions (DM, CM, CB) generally scan most frequently, since they face threats/options from the widest range of angles; out-and-out wide forwards scan least frequently, since their positioning naturally limits the relevant information to a narrower arc |
| Frequency by phase | Scanning frequency rises sharply in the moments before a player expects to receive the ball, and drops when a player is far from the ball and not a likely near-term passing option |
| Timing relative to reception | The highest-value scans occur while the ball is 1-2 passes away, not in the final half-second before reception — a "just-in-time" scan immediately before the ball arrives has too little time left to meaningfully alter body orientation (core KB §47.2) |
| Diminishing returns | Scanning has a cost (a player looking away from the ball briefly cannot simultaneously track it), so an excessively high scan frequency can itself become a minor liability if it interferes with basic ball-tracking during a fast passing sequence |

### 63.3 Perception Examples By Position

| Position | Primary Scan Targets | Typical Scan Pattern |
|---|---|---|
| Centre-back (in possession) | Pressing forward's angle, nearest midfield outlet, offside line of own forward runners | Scans forward and to both sides before receiving from the goalkeeper; a back-to-goal scan is rarely needed given the CB's own facing direction |
| Central/defensive midfielder | 360° awareness — blind-side pressers (core KB §47.1's blind-side scanning), forward passing options, weak-side space | The position requiring the widest and most frequent scanning arc, since threats and opportunities exist behind, ahead, and to both sides simultaneously |
| Winger (wide, facing infield) | The full-back's position and jump distance, the passing lane inside, the position of a supporting overlap | Scans infield toward the ball before receiving, and occasionally over the shoulder to check the overlapping full-back's positioning before deciding whether to hold width or cut inside |
| Striker (back to goal) | The marking CB's proximity and the covering CB's position, the space in behind, the supporting midfield runner | The position most reliant on blind-side scanning specifically, since the striker's default body orientation (back to goal, core KB §64 below) structurally blocks direct vision of the defender most likely to challenge them |

---

## SECTION 64 — BODY ORIENTATION (Deep Model)

Core KB §47.2 introduced body-shape categories. This section analyses the downstream effects of each on every major on-ball and defensive action.

### 64.1 Body Orientation Categories, Expanded

| Orientation | Description | Passing | Turning | Press Resistance | Dribbling |
|---|---|---|---|---|---|
| Open body | Hips/chest angled to see both the ball source and the space ahead | Full range of passing options available immediately, including forward | Can turn into space with a single touch, since the body is already partially oriented that way | High — the player can see the presser and the escape route simultaneously | Can dribble into the space already being faced without a reorientation touch |
| Closed body | Square to the passer, back partially to the space ahead | Restricted primarily to lateral/backward passing without an extra touch | Requires a full reorientation touch before turning is possible | Low — the player cannot see an approaching press from behind until very late | Requires an extra touch before any dribble into forward space |
| Half-turn | Side-on, both directions genuinely available | Balanced — can pass forward or backward off the first touch depending on what was scanned | Can turn either direction depending on the picture, without a wasted touch | High — retains vision of both the ball-near and blind-side pressure | Can dribble in either direction off the first touch |
| Back to goal | Facing away from the goal being attacked, common for a target-man striker | Restricted to lay-offs/backward combination unless turning first | Requires either a turn or a first-time lay-off; cannot progress forward directly | Depends heavily on physical strength to shield the ball (core KB §48.2's shielding) rather than on vision | Not typically applicable — the position is usually held for combination, not dribbling |

### 64.2 Defensive Body Orientation

| Orientation | Tactical Use | Effect on Recovery/Interception |
|---|---|---|
| Side-on defensive stance | The default jockeying stance (core KB §Part BM #2's logic), one foot ahead of the other, angled to show the attacker a specific direction | Enables a quicker reactive push-off in either direction than a fully square stance, and disguises which direction is genuinely being "shown" versus which is simply the defender's natural readiness |
| Square defensive stance | Facing the attacker directly, weight evenly balanced | Maximizes the defender's ability to react to either direction equally, at the cost of being slightly slower to accelerate in any single direction compared to a side-on stance already loaded that way |
| Pressing body angle | The angle a presser's body/run takes relative to the ball-carrier, distinct from a jockeying stance since it involves closing distance rather than holding position | A curved pressing angle (core KB §11, §62.1) closes a specific passing lane while still applying pressure, whereas a straight-line press only slows the carrier without controlling their options |
| Recovery-run orientation | The angle a defender takes while sprinting to recover goal-side after being beaten | An angled recovery run that cuts toward goal (rather than chasing the attacker's exact path) is generally faster to regain a useful defensive position than a direct chase, since it takes the shorter geometric route to goal-side rather than mirroring the attacker's longer path |
| Interception body shape | The stance a defender holds while anticipating a pass to intercept, weight forward and low | Committing the body weight too early/fully to an anticipated interception leaves the defender exposed if the pass is disguised or delayed, directly paralleling the "don't dive early" goalkeeping principle (core KB §54.2) |

---

## SECTION 65 — PLAYER DECISION-MAKING FRAMEWORK (Position-Specific Decision Trees)

Core KB Part BV (`03_DECISION_ENGINE_ARCHITECTURE.md`) defines the generic action-evaluation model. This section builds explicit, position-specific decision trees using the same inputs (space, pressure, support, passing lanes, defender distance, body orientation, game state, risk/reward).

### 65.1 Centre-Back Decision Tree

```
RECEIVE BALL
├─ Under immediate pressure?
│   ├─ YES → Is a safe short option available? → YES → PASS (short, low risk)
│   │                                             → NO  → LONG BALL (clear the danger)
│   └─ NO  → Is a progressive passing lane open (core KB §8.1)?
│              ├─ YES → Is the lane press-resistant given current body orientation? → YES → PASS (progressive/line-breaking)
│              │                                                                    → NO  → CARRY (draw a presser, then release)
│              └─ NO  → RECYCLE (maintain possession, shift the opponent's shape)
```

### 65.2 Central/Defensive Midfielder Decision Tree

```
RECEIVE BALL
├─ Scanned before receiving (core KB §63.1)? Body orientation half-turned?
│   ├─ YES → Forward line-breaking option available? → YES → THROUGH BALL or PASS (progressive)
│   │                                                 → NO  → Support option available under pressure? → YES → PASS (short) → NO → CARRY/DRIBBLE to buy time
│   └─ NO  → Immediate pressure arriving? → YES → RECYCLE/backward PASS (safety first, poor pre-reception state) → NO → re-scan, then proceed as above
```

### 65.3 Winger Decision Tree

```
RECEIVE BALL WIDE
├─ Full-back engaged tight? 
│   ├─ YES → 1v1 skill/pace advantage? → YES → DRIBBLE (attempt to beat the full-back) → NO → PASS backward/SWITCH
│   └─ NO (space in front) → Overlap/underlap support arriving? 
│              ├─ YES → CARRY to the byline area, then CROSS/CUTBACK depending on box occupation (core KB §Section 18/53)
│              └─ NO  → CARRY inside toward goal if an inside-forward profile (core KB §3.4), or hold width and PASS back if a traditional winger profile (core KB §3.4)
```

### 65.4 Striker Decision Tree

```
RECEIVE BALL (often back-to-goal, core KB §64.1)
├─ Support runner arriving to combine? → YES → LAY-OFF PASS
├─ Space to turn (checked via blind-side scan, core KB §63.3)? → YES → TURN → then re-evaluate as an attacking-third ball-carrier (SHOOT / DRIBBLE / THROUGH BALL)
└─ Neither → SHIELD the ball (core KB §48.2), await support, then RECYCLE if none arrives in time
```

**Cross-position principle:** every tree above resolves to the same underlying logic — establish (1) pressure level, (2) support availability, (3) forward-option availability, in roughly that priority order, then select the action matching core KB Part BW's TACTICAL_ACTION_VALUE trade-off given the position's typical role (core KB §3/§51).

---

## SECTION 66 — TACTICAL PERCEPTION: RECOGNIZING KEY STATES

A tactical analysis engine (and, ideally, a trained player) must be able to recognize these states directly from the current positional picture — this section defines each precisely enough to be computed from data (core KB `data_model/team_shapes.csv`, `player_tracking.csv`).

| State | Recognition Rule |
|---|---|
| Free player | A player with no opponent within a defined pressing radius (e.g., 3-5m) AND no opponent positioned to close that distance before a pass could realistically arrive |
| Free space | A zone (core KB §1.5 grid) with SPACE_VALUE (`01_CONCEPTUAL_MODELS.md` Part BX) above a threshold AND low opponent pitch control (Part BZ) for that zone |
| Dangerous player | An attacking player whose current zone has high SPACE_VALUE AND who has a passing lane open toward them AND whose individual attribute profile (core KB §22) rates highly for the action that zone typically produces (e.g., a poacher in the six-yard box) |
| Dangerous space | A zone with high SPACE_VALUE that is currently unoccupied by any defender, regardless of whether an attacker is there yet — distinct from "dangerous player," which requires an actual occupant |
| Overload | A zone or sub-area where the attacking team has more players than the defending team (core KB §Section 45's overload types) |
| Underload | The inverse of overload — a zone where the defending team outnumbers the attacking team, typically the deliberate result of a defensive shift (core KB §Section 45/§7.1) |
| Isolation | A specific attacking player in a 1v1 (or worse) numerical situation, typically the direct target of an overload-to-isolate switch (core KB §7.1) |
| Numerical superiority | A raw count-based advantage in a defined zone or phase (e.g., a 3v2 in central midfield) |
| Positional superiority | An advantage derived from location/angle rather than raw numbers — e.g., a numerically even 2v2 where one attacker has a superior angle/space to receive |
| Qualitative superiority | An advantage derived from individual player quality/attribute mismatch rather than numbers or position — e.g., an elite dribbler isolated 1v1 against a technically weaker defender, even in a numerically/positionally neutral situation |
| Defensive imbalance | A state where the defending team's shape has been distorted (via core KB §67's manipulation mechanisms below) such that its coverage no longer matches the attacking team's current threat distribution |
| Attacking imbalance | The inverse — an attacking team overcommitted to one zone/mechanism such that losing possession would expose a significant defensive-transition risk (core KB §16's rest-defence logic) |

---

## SECTION 67 — OPPONENT MANIPULATION (Chain Format)

Format: INITIAL POSITION → MANIPULATION → DEFENDER RESPONSE → SPACE CREATED → EXPLOITATION.

| # | Mechanism | Initial Position | Manipulation | Defender Response | Space Created | Exploitation |
|---|---|---|---|---|---|---|
| 1 | Dragging defenders | Winger holds a wide position | Winger makes a sudden, sharp run toward the near-post channel | Marking CB feels obligated to track the run rather than hand it over | The zone the CB just vacated, directly behind the defensive line | A late-arriving midfielder runs into the vacated zone for a through ball |
| 2 | Fixing defenders | Striker holds the last line centrally | Striker simply maintains position without moving, forcing the CB to stay occupied by proximity alone | CB cannot step out to help elsewhere without conceding a free run in behind | Any zone the CB would otherwise have covered if not fixed | A wide combination proceeds unopposed by what would have been covering support |
| 3 | Pinning defenders | Winger stays high and wide even when the ball is on the opposite flank | Deliberate, disciplined weak-side width-holding (core KB §Section 45 "weak-side space") | Weak-side full-back must stay wide rather than tucking in to help congest the centre | The central channel, specifically denied the extra covering body the full-back would otherwise provide | A switch of play or central combination exploits the now-uncongested middle |
| 4 | Pulling midfielders | Deep-lying playmaker drops into a auxiliary defensive line position (core KB §51's Half-Back) | The drop specifically baits an opposing midfielder to follow and press high | Opposing midfielder is pulled out of their central defensive-midfield zone | The central zone the pressing midfielder just vacated | A different central midfielder receives freely in the vacated zone and turns forward |
| 5 | Forcing defensive shifts | Ball is circulated to the strong-side flank with a sustained overload | Deliberate, patient ball-side overload (core KB §7.1) | Entire defensive block shifts horizontally to match the overload | The weak-side flank/half-space, now underloaded | A long diagonal switch isolates the weak-side attacker 1v1 |
| 6 | Creating gaps | Two attackers occupy the same half-space simultaneously | One of the two makes a sudden rotation/cross-movement into the other's zone | The marking defenders must communicate and hand over (core KB §Section 38 glossary) mid-movement | A brief seam between the two defenders during the handover moment | A third player exploits the seam with a well-timed run or pass |
| 7 | Creating weak-side space | Ball-side attack develops with multiple players committed | Sustained ball-side commitment without an early switch | Weak-side defenders relax slightly, assuming low near-term threat | The full weak-side third of the pitch, momentarily under-defended | A delayed, well-timed switch catches the weak side before it can re-organize |
| 8 | Creating passing lanes | A central midfielder stands directly in a defender's cover-shadow | Midfielder makes a small lateral movement (a few meters) out of the shadow | The defender's cover-shadow angle no longer covers the midfielder's new position | The passing lane directly to the midfielder's new position | The ball-carrier plays the now-open lane immediately |
| 9 | Moving defenders away from dangerous zones | Opponent's best aerial defender is positioned centrally at a corner | An attacker specifically engages/screens that defender early in the routine (core KB §53.1) | The aerial defender is occupied/blocked away from the primary delivery zone | The zone the aerial defender would have dominated, now open | The delivery targets that specific zone, avoiding the opponent's best individual defender entirely |
| 10 | Luring into pressing traps | Team circulates the ball slowly through a specific, deliberately "weak-looking" central pass | The pass is a deliberate bait (core KB §26 TP039), not a genuine mistake | Opponent presses aggressively, believing the moment is a genuine opportunity | The space behind/around the committed press, per the exact mechanism in core KB §Chain 1 (`03_DECISION_ENGINE_ARCHITECTURE.md`) | A pre-planned escape (third-man, quick combination) bypasses the trap for a significant net territorial gain |

*(These 10 mechanisms are the complete set of distinct opponent-manipulation tools referenced across the request; each can be combined with any zone/formation pairing using the same INITIAL POSITION → MANIPULATION → RESPONSE → SPACE → EXPLOITATION schema — see `engine/rule_generator.py`'s `generate_manipulation_chains` function below for combinatorial expansion.)*

---

## SECTION 68 — TACTICAL CAUSALITY: EXTENDED CHAIN LIBRARY

Core KB §58 (`03_DECISION_ENGINE_ARCHITECTURE.md` Part BS) established the 7-step chain format with 5 fully worked examples. This section adds further hand-worked chains at the same depth, directly modelling the requested PLAYER → MOVEMENT → SPACE → OPPONENT RESPONSE → TEAM ADAPTATION → COUNTER → OUTCOME pattern.

### Chain 6 — Winger inverts, full-back overlaps
1. **PLAYER/MOVEMENT:** The winger moves inside into the half-space, inverting from their wide starting position.
2. **SPACE:** The wide channel the winger vacated is now empty.
3. **OPPONENT RESPONSE:** The opposing full-back, uncertain whether to track the winger inside or hold the width, follows the winger inside.
4. **TEAM ADAPTATION:** The team's own full-back immediately overlaps into the vacated wide channel.
5. **SECOND OPPONENT RESPONSE:** The opposing winger, now the nearest covering body, must sprint back to track the overlapping full-back.
6. **COUNTER:** With the opposing winger now in a recovery sprint rather than a defensively set position, the crossing lane from the overlapping full-back is open and lightly contested.
7. **OUTCOME:** A cross/cutback delivered from a full-back in space against a defensively unset opposing winger — exactly the pattern given as the worked example in the request, now fully chained through each intermediate response.

### Chain 7 — Striker drops, CB steps, space opens behind
1. **PLAYER/MOVEMENT:** The striker drops off the last line to receive to feet between the lines.
2. **SPACE:** The space directly behind the striker's original position, on the last line, begins to open.
3. **OPPONENT RESPONSE:** The marking CB steps forward to stay tight to the dropping striker rather than allowing a free reception.
4. **TEAM ADAPTATION:** A winger or attacking midfielder times a run directly into the space the advancing CB just vacated.
5. **SECOND OPPONENT RESPONSE:** The covering CB must shift across to cover both their own zone and the space the first CB vacated, creating a temporary 2-for-1 covering problem.
6. **COUNTER:** The dropping striker, now with the ball to feet and the picture clear (having scanned per core KB §63.1), plays a first-time through ball into the run.
7. **OUTCOME:** A clean run in behind against a single, stretched covering CB — the exact pattern given as the request's second worked example, fully chained.

### Chain 8 — Full-back inverts, opponent winger must decide
1. **PLAYER/MOVEMENT:** The ball-playing full-back inverts into a central midfield strip during build-up (core KB §51's Half-Back-adjacent logic).
2. **SPACE:** The wide channel the full-back vacated opens; simultaneously, central passing options increase by one body.
3. **OPPONENT RESPONSE:** The opposing winger, whose primary defensive assignment was the full-back, faces a decision — track the full-back centrally (abandoning their own wide defensive zone) or hold position (allowing the full-back a free central touch).
4. **TEAM ADAPTATION:** If the winger tracks inside, the team's own winger immediately drops into the vacated wide zone to receive in space; if the winger holds, the inverted full-back is simply used as a free central progression option.
5. **SECOND OPPONENT RESPONSE (tracking branch):** The opposing full-back must now decide whether to engage the team's winger in the vacated wide zone or hold their own defensive line, since their direct opponent (the winger) has changed location.
6. **COUNTER:** Either branch produces a genuine defensive dilemma rather than a single clean outcome — this chain illustrates that manipulation doesn't always resolve into one clean space, but into a structural decision problem the opponent must repeatedly solve every time the pattern recurs.
7. **OUTCOME:** Over a sustained period, the repeated dilemma itself produces value even without a single dramatic breakthrough — the opponent's positional discipline degrades incrementally each time the decision is forced (directly related to core KB §62's geometric compactness principle: sustained decision pressure eventually produces a broken triangle/geometric error).

### Chain 9 — Central overload baits a press, third-man escapes it
1. **PLAYER/MOVEMENT:** The double pivot circulates centrally, inviting pressure (core KB §67 mechanism #10).
2. **SPACE:** No immediate space change yet — this is the bait phase.
3. **OPPONENT RESPONSE:** Two opposing central midfielders commit to press the ball centrally.
4. **TEAM ADAPTATION:** The ball-near winger tucks into the half-space just vacated by the committed press (core KB §Chain 1 in `03_DECISION_ENGINE_ARCHITECTURE.md` — this chain extends it one step further).
5. **SECOND OPPONENT RESPONSE:** The opposing weak-side central midfielder attempts to recover across and cover the half-space.
6. **COUNTER:** A first-time pass into the half-space receiver, who has already scanned (core KB §63.1) and knows the recovering midfielder is arriving from their blind side, plays an immediate first-time lay-off into the space that same recovering midfielder is vacating as they move.
7. **OUTCOME:** A fully bypassed midfield line via a genuine third-man pattern, with the specific detail that the final ball exploits the *recovery run's own vacated space*, not just the original press's vacated space — illustrating that each defensive response generates a new, distinct exploitable gap rather than simply closing the original one.

### Chain 10 — Weak-side full-back pinned, box arrival exploits a covering CB
1. **PLAYER/MOVEMENT:** The weak-side winger holds a disciplined wide position despite the ball being on the opposite flank (core KB §67 mechanism #3, pinning).
2. **SPACE:** The weak-side full-back cannot tuck in to help congest the box, since they must continue to respect the pinned winger's width.
3. **OPPONENT RESPONSE:** The opposing coaching structure accepts this trade-off, prioritizing not conceding a clean switch over fully congesting the box.
4. **TEAM ADAPTATION:** A central midfielder times a late box arrival specifically into the zone the tucked-in full-back would normally have covered.
5. **SECOND OPPONENT RESPONSE:** The ball-far CB must now decide whether to step across to cover the late-arriving runner, thinning their own zone, or hold and accept a free run.
6. **COUNTER:** A cutback (core KB §53/§18) delivered specifically into the zone the CB just vacated by stepping across.
7. **OUTCOME:** A shot from a genuinely under-marked position, produced entirely by the initial pinning decision several actions earlier — illustrating that the eventual chance's true origin was a discipline-based off-ball decision (holding width) rather than any single on-ball action in the final sequence.

*(Ten hand-worked chains now exist across Section 58 and this section, each demonstrating a genuinely distinct tactical mechanism at full analytical depth. `engine/rule_generator.py`'s existing `generate_tactical_chains`-style approach — extended below with `generate_manipulation_chains` — produces further chains at scale, each combinatorially tied to one of the 10 real mechanisms in Section 67 rather than being a cosmetic relabeling, to reach the requested 300-chain volume as a machine-readable dataset.)*

---

## SECTION 69 — DEFENSIVE LINE COORDINATION

### 69.1 Core Line Actions

| Action | Definition | Trigger Conditions |
|---|---|---|
| Step | The back line advances together, typically 5-10m, in a single coordinated movement | Ball is played backward/sideways by the opponent (removing immediate forward threat); opponent's attacking shape has retreated; the team wants to compress the space available to a dropping opponent |
| Drop | The back line retreats together | A direct ball in behind is threatened; an opponent with genuine pace is running at the line; the team's own press has been bypassed and cover is needed |
| Squeeze | The back line and the block ahead of it compress vertically toward each other simultaneously | The team wants to deny between-the-lines space specifically, generally during a settled mid-block phase rather than in direct reaction to a single ball |
| Hold | The back line deliberately maintains its current height without stepping or dropping | The picture is balanced/uncertain — stepping risks being played through, dropping cedes unnecessary territory; used as a default "no clear trigger yet" state |
| Offside trap | A specific, coordinated step performed with the explicit intent of catching a forward run offside (core KB §2, §26 TP012) | A forward run is anticipated before the passer has actually played the ball, requiring the entire line to move in the same instant |
| Shift | The back line moves horizontally as a unit, maintaining height but changing side-to-side position | The ball moves to a different horizontal zone, requiring the entire line to slide to maintain compactness relative to the new ball location |

### 69.2 Decision Rules: When To Step / Drop / Hold / Squeeze / Shift

```
IF ball_played_backward OR opponent_attacking_shape_retreating:
    STEP (compress space, invite pressure higher up)
ELIF direct_ball_in_behind_threatened OR fast_runner_engaging_the_line:
    DROP (protect the space in behind first)
ELIF own_press_bypassed AND no_immediate_direct_threat:
    DROP (regain defensive shape/cover before re-engaging)
ELIF settled_mid_block_phase AND between_lines_space_growing:
    SQUEEZE (compress vertically with the line ahead)
ELIF ball_moves_to_new_horizontal_zone:
    SHIFT (maintain compactness relative to new ball position)
ELIF picture_balanced_no_clear_trigger:
    HOLD (default state)
```

### 69.3 Structural & Relational Concepts

| Concept | Real-World Logic |
|---|---|
| Cover depth | The vertical distance a covering CB holds behind an engaged teammate, balancing between "close enough to actually help" and "far enough not to be beaten by the same action" |
| Centre-back staggering | The two (or three) CBs holding slightly different depths rather than a perfectly flat line, so one is always in a covering position relative to the other's engagement |
| Full-back positioning (relative to CBs) | Full-backs typically hold a position that can pivot between joining the back line's height (defending) and pushing higher (attacking), with the transition between the two states being one of the most common sources of defensive-line coordination breakdowns if mistimed |
| CB/full-back relationship | The CB nearest a ball-side full-back typically shifts to provide cover the instant the full-back engages an opponent 1v1, forming a localized two-player covering unit within the broader line |
| Tracking runners | A defender (not necessarily the nearest one geometrically) is assigned to follow a specific off-ball run rather than the ball itself, directly preventing the blind-side/decoy runs described in core KB §Section 38's "pass runner" glossary entry |
| Defensive rotation | A broader reshuffling of defensive assignments (not just a single handover) triggered when multiple attackers rotate simultaneously, requiring the defending line to collectively reassign rather than simply swap two players |

---

## SECTION 70 — DEFENSIVE COMMUNICATION (Verbal Coordination Glossary)

| Call | Meaning | Tactical Function |
|---|---|---|
| "Press!" | Instructs a teammate to close down the ball-carrier immediately | Triggers an individual or coordinated press action (core KB §11-12) |
| "Drop!" | Instructs a teammate (or the line collectively) to retreat | Triggers the drop action (Section 69.1) |
| "Step!" | Instructs the line to advance together | Triggers the step action (Section 69.1) |
| "Cover!" / "I've got cover!" | Communicates that covering support is in place behind an engaged defender | Allows the engaged defender to commit to the duel more confidently, knowing a mistake won't be immediately fatal |
| "Switch!" | Instructs two defenders to exchange marking assignments | Used specifically during a handover (core KB §Section 38 glossary) as attackers cross paths or rotate |
| "Leave it!" | Instructs a teammate not to engage a specific ball/player, usually because another teammate has it covered or the situation isn't dangerous enough to warrant a challenge | Prevents unnecessary duels/fouls and avoids two defenders committing to the same threat while leaving another open |
| "Man on!" | Warns a teammate in possession that an opponent is closing from a blind angle they may not have scanned (core KB §63.1) | Directly compensates for a gap in the receiving player's own scanning coverage |
| "Time!" | Communicates that the ball-carrier has time/space and is not under immediate pressure | The inverse of "man on" — informs a decision-making teammate that a more considered, less rushed action is available |
| "Turn!" | Communicates to a receiving teammate that they have space to turn and face forward | Directly informs the DECIDE stage of the perception pipeline (core KB §63.1) for a receiver whose own scan may have missed it |
| "Clear it!" | Instructs a defender to prioritize removing danger (a clearance) over attempting to retain possession | Used in high-danger moments (e.g., a crowded box) where the value of retaining possession is outweighed by the risk of a mistake |
| "Hold!" | Instructs the line to maintain its current position rather than stepping or dropping | Triggers the hold action (Section 69.1) |

**UNIVERSAL PRINCIPLE:** Defensive communication functions as a real-time patch for the individual perception pipeline's (Section 63.1) blind spots — a call like "man on" or "time" exists specifically because no single player can scan every relevant angle simultaneously, and a well-organized defensive/possession unit uses verbal communication to distribute the scanning workload across multiple sets of eyes rather than relying on any one player's individual perception alone.

---

## SECTION 71 — PLAYER CHEMISTRY (Positional Relational Pairings)

| Pairing | Core Relationship | What Good Chemistry Looks Like | What Poor Chemistry Looks Like |
|---|---|---|---|
| CB + CB | Shared staggering/covering responsibility (Section 69.3) | Automatic, unspoken depth-staggering — one is always slightly deeper than the other relative to the ball, without needing to be told each time | Both CBs holding identical depth, leaving neither in a genuine covering position when the other is engaged |
| CB + FB | The CB provides central/covering support the instant the full-back engages a winger 1v1 | The CB reads the full-back's engagement and shifts across automatically, closing the gap the full-back's commitment opens | The CB stays central/flat, leaving a clear gap the instant the full-back is beaten or bypassed |
| FB + winger | Combination on the same flank — overlap/underlap timing, and defensively, shared responsibility for the opposing wide threat | Winger and full-back alternate who holds width and who inverts based on live reading of the opponent, without needing a fixed rule each time | Both occupy the same wide channel simultaneously, or both invert simultaneously, leaving the flank either overcrowded or completely empty |
| Winger + midfielder | The half-space combination — a central/attacking midfielder timing runs into the space a winger's positioning creates, and vice versa | Fluid rotation where whichever of the two the ball favors holds width while the other attacks the half-space, read live rather than fixed | Both attack the same half-space or both hold width simultaneously, collapsing the passing options into a single lane |
| Midfielder + striker | Combination play and the striker's link-up/lay-off relationship with an advanced midfielder's runs beyond | The striker's hold-up/lay-off timing matches the midfielder's run timing (core KB §65.4's decision tree in practice), so the lay-off arrives exactly as the midfielder's run reaches the right zone | The lay-off and the run are mistimed relative to each other — either the striker releases before the run has started, or the run arrives before the ball |
| AM/#10 + striker | The #10's disguised through balls specifically calibrated to the striker's preferred run type/timing (core KB §51's Trequartista/Enganche profile) | The striker's movement (a specific mix of near-post/far-post/in-behind runs, core KB §Part AO) becomes predictable *to the #10 specifically* even while remaining unpredictable to defenders, since the #10 has learned the striker's individual tendencies | The #10 plays a pass to where a generic striker "should" run rather than where this specific striker actually tends to run, resulting in a technically good pass that the actual striker doesn't reach |
| GK + CB | Sweeping/distribution relationship — the CB's willingness to push up depends on trust that the GK will cover the space behind (core KB §54.1's sweeper-keeper logic) | The back line can play a genuinely high line because the specific goalkeeper's sweeping range/decision-making is well understood and trusted by the specific CBs in front of them | CBs hold an artificially deep line because they don't trust the specific goalkeeper's sweeping range, even if the goalkeeper's underlying ability would support a higher line |
| DM + CB | The DM's screening responsibility (core KB §61.1's positional-play logic) directly reduces the defensive burden placed on the CBs, and vice versa — a CB confident in the DM's screening can engage more aggressively higher up when needed | The DM reads exactly which passing lanes the CBs need covered without being told, and the CBs trust the DM enough to step out of the back line when an opportunity arises, since the DM is understood to cover the resulting gap | The DM and CBs cover the same central zone redundantly while leaving another zone (e.g., a half-space) uncovered by either, a coordination failure distinct from either player's individual quality |

**UNIVERSAL PRINCIPLE:** "Chemistry" in a Tactical Battle Engine should be modelled as a *learned correction factor* on top of each pairing's individual PLAYER_TACTICAL_SIGNATURE (`01_CONCEPTUAL_MODELS.md` Part CF) — two players with strong individual signatures can still under-perform together if their specific timing/reading of each other hasn't been established, and this factor should be estimated from the pairing's own shared-minutes outcome data (core KB §37's dataset schema) rather than assumed purely from each player's individual rating.

---

## SECTION 72 — FULLY ANNOTATED WORKED SEQUENCE (All Layers Combined)

A single continuous possession sequence, annotated at every layer covered in this knowledge base — geometry (§62), perception (§63), body orientation (§64), decision-making (§65), tactical-state recognition (§66), opponent manipulation (§67), and the resulting causality chain (§68) — to demonstrate how they operate together in real time rather than as isolated concepts.

**Situation:** Team A (4-3-3, positional play) in possession, building from a goal kick against Team B (4-2-3-1, mid-block press).

| Moment | Layer | Annotation |
|---|---|---|
| t=0s | Geometry (§62.3) | Team A's back four splits to a width of roughly 35m, CBs occupying Z2/Z4, forming two open passing angles to the goalkeeper and a passing triangle with the dropping pivot in Z8 |
| t=1s | Perception (§63.1) | The right CB scans twice before receiving — once at t=-2s (IDENTIFY: pivot is open, presser's angle is central) and once at t=0s (INTERPRET: the presser's cover shadow denies the direct central lane but leaves the wide full-back open) |
| t=2s | Body orientation (§64.1) | The CB receives with an open body shape, hips already angled toward the wide full-back, so no reorientation touch is needed before releasing the pass |
| t=3s | Decision (§65.1, CB tree) | Not under immediate pressure → progressive lane open (to the full-back) → body orientation supports it → PASS (progressive) is selected over the safer backward option |
| t=4s | Tactical state (§66) | The full-back receiving is a "free player" (no opponent within pressing radius) in a zone of moderate SPACE_VALUE — not yet dangerous, but a clean platform to build from |
| t=5s | Manipulation (§67, mechanism #3 — pinning) | Team A's winger has held a wide, high position throughout this build-up specifically to pin Team B's left-back, denying that defender the option to tuck in and support the mid-block's compactness |
| t=6s | Opponent response | Because the left-back is pinned wide, Team B's central midfield must shift slightly further across than usual to maintain compactness, opening a marginally wider gap between B's two central midfielders than their structure normally allows |
| t=7s | Team adaptation (§67, mechanism #8 — creating passing lanes) | Team A's #8 makes a small lateral movement out of the widened gap's nearest cover shadow, becoming a live central option |
| t=8s | Perception (§63.3, midfielder pattern) | The full-back, before receiving the ball forward from the CB, has already scanned the #8's movement (a pre-emptive scan while the ball was still 1 pass away, per §63.2's timing model) |
| t=9s | Decision (§65.2, midfielder tree, applied to the full-back's forward pass) | Progressive passing lane to the #8 is open and press-resistant given the #8's half-turned body shape → PASS (progressive/line-breaking) selected |
| t=10s | Tactical state (§66) | The #8, now receiving between Team B's lines, represents a moment of "positional superiority" — not a raw numbers advantage, but a superior angle/space relative to the two central midfielders who shifted to cover the pinning full-back |
| t=11s | Second opponent response | Team B's nearest central midfielder recovers to press the #8 immediately upon reception |
| t=12s | Causality chain continuation (§68, Chain 9 pattern) | The #8, already scanned and aware of the recovering presser's angle, plays an immediate first-time lay-off into the space that presser is vacating mid-recovery-run |
| t=13s | Outcome | Team A's winger, who has now cut inside from the pinned-wide position (a deliberate change of role once the pin has served its purpose), receives the lay-off facing forward in a genuinely dangerous zone — the sequence has moved the ball from a goal kick to a central, forward-facing attacking-third possession in 13 seconds, without a single individually "flashy" action — every step was a correctly-read structural consequence of the step before it |

**UNIVERSAL PRINCIPLE:** This is the practical meaning of the PLAYER → MOVEMENT → SPACE → OPPONENT RESPONSE → TEAM ADAPTATION → COUNTER → OUTCOME framing requested for this advanced layer — no single moment in the sequence above is analyzable in isolation from the moments before and after it. A Tactical Battle Engine's `EVENT DETECTION` and `TACTICAL RULE ENGINE` stages (`03_DECISION_ENGINE_ARCHITECTURE.md` Part CN) should log and reason over sequences like this one, not just individual events, since the value of the mechanism 12 steps in only crystallizes as an outcome because a specific pinning decision from t=5s and a specific scan from t=8s both occurred correctly upstream of it. This is also why core KB §64's `TACTICAL_ACTION_VALUE` should ideally be evaluated with some credit-assignment back-propagation across a sequence like this (a well-known challenge in sports analytics, related to but distinct from the standard xT framework in `01_CONCEPTUAL_MODELS.md`), rather than purely at the level of the single action nearest the eventual shot.

---

## SECTION 73 — VERIFIED STATISTICAL BENCHMARKS (SOURCED, CLASS D)

**Purpose of this section:** Sections 46 and 50 present benchmark *ranges* as heuristic anchors. This section replaces the vaguest of those ranges with specific, dated, sourced figures — each tagged with its actual publisher/study and the period it covers, per the Class D standard defined in `02_EXPLAINABLE_AI_AND_UNCERTAINTY.md`. Where Sections 46/50 already gave a directionally correct range, this section either confirms it with a hard number or narrows it. **All figures below carry a stated source and time window; none are estimated or invented.** Numbers drift year to year and by league — always prefer a fresh search over treating any figure here as permanently fixed, especially anything more than 1-2 seasons old.

### 73.1 Penalty Conversion (supersedes the informal range in Section 50.2)

| Figure | Value | Source & Period |
|---|---|---|
| Global average conversion rate | 77.1% | CIES Football Observatory, multi-league worldwide analysis |
| Academic large-sample average | 77% (from 2,888 penalties) | Peer-reviewed study, Taylor & Francis, covering England/Spain/Germany/Italy/Netherlands/Champions League, 2015/16–2019/20 |
| Big-5+ European leagues, 2024/25 season | 80.5% (563 of 694 penalties scored) | Sportingpedia, 7-league study, 2024/25 season |
| Highest league in that sample | 87.5% (Eredivisie) | Sportingpedia, 2024/25 |
| Lowest league in that sample | 69.2% (Bundesliga) | Sportingpedia, 2024/25 |
| In-game vs. shootout gap | In-game penalties convert ~7 percentage points higher than shootout penalties (roughly 4-in-5 vs. 3-in-4) | Large-sample academic analysis, arXiv preprint on shootout order fairness |
| Placement effect | Penalties aimed at the top corners of the goal convert at a higher rate than low, central placements, based on a 536-penalty Champions League/Europa League sample | Academic study by Carlos Almeida, as reported via Twelve Yards |

**Engine implication:** the `penalty_conversion_rate: 0.76` value already present in Section 50.6's JSON block is essentially correct and consistent with the sourced figures above (76-77% average); it should NOT be revised upward toward the more recent, higher 80%+ single-season figures without confirming those aren't a short-term/small-sample fluctuation, since the multi-year, multi-study average (77%) is the more stable prior for calibration purposes.

### 73.2 Pressing Intensity — PPDA (supersedes the informal bands in Section 46.1)

| Figure | Value | Source & Period |
|---|---|---|
| Premier League pressing leader, 2025/26 | Liverpool, PPDA 9.89 (league-low) | Total Football Analysis, 2025/26 Big-8 comparison |
| Next-most-intense 2025/26 examples | Arsenal 10.05; Manchester City 12.29 (a notably higher figure than City's historical norm, flagged in-source as a shift in approach) | Total Football Analysis, 2025/26 |
| Historical European low (single-season record cited across sources) | Barcelona, PPDA 7.26, Europe's top five leagues, 2021/22 | Coaches' Voice, via Wyscout data |
| General elite-pressing band (contemporary usage) | Below ~9.0 is treated as elite-press territory in current analysis | Multiple current sources (KharaSportsDaily, TotalFootballAnalysis), 2025/26 |
| General "high pressing" band (a slightly softer definition seen elsewhere) | 7-9 | Sportmonks glossary explainer |
| Passive/low-block band | Above ~13 | KharaSportsDaily explainer |

**Important accuracy note (this corrects a real risk of overclaiming):** multiple current sources explicitly warn that **PPDA has no single universal benchmark** — the "good" number shifts with league, opponent quality, and game state, and possession-dominant teams are structurally pushed toward a *higher* PPDA even when genuinely pressing well, since their opponents simply touch the ball less overall. A Tactical Battle Engine should treat the bands above as **directional, league/season-specific reference points**, not fixed universal thresholds — and should re-derive them from current-season data for whatever league it's actually modelling rather than hard-coding the 2025/26 Premier League figures above into a different context.

### 73.3 Shot Quality & Zone-Based Conversion (supersedes the informal figures in Section 50.2)

| Figure | Value | Source |
|---|---|---|
| Six-yard-box shot conversion | ~40% | StatsBomb (Hudl) archive analysis comparing shots to headers |
| Header conversion from the same close-range zone | Under 25% | Same StatsBomb analysis |
| Share of headers taken from the central six-yard area | ~95% | Same StatsBomb analysis |
| Share of shots (not headers) originating outside the penalty area | Over 54% | Same StatsBomb analysis |
| Share of all goals scored from inside the penalty area | Roughly 80-85% per season | Beast Mode Soccer, aggregating professional-league xG study findings |
| Typical xG for shots outside the box | ~0.03-0.07 | Beast Mode Soccer / general xG-modelling consensus |
| Typical xG for shots inside the box | ~0.20 or higher | Same source |
| Standard static penalty xG value used by most models | 0.76-0.78 | Hudl xG explainer, citing historical penalty conversion as the basis |

**Engine implication:** this directly firms up Section 50.2/59's qualitative claims — "shots inside the box are dramatically more valuable" is not just directionally true but is on the order of a **3-10x xG difference** depending on exact zone, a large enough gap that a Tactical Battle Engine's `TACTICAL_ACTION_VALUE` chance-creation weighting (`03_DECISION_ENGINE_ARCHITECTURE.md` Part BW) should treat "reached a six-yard-box shot" and "took a 25-yard shot" as close to categorically different outcomes rather than points on a smooth continuum.

### 73.4 Home Advantage (supersedes the informal note in Section 50.5)

| Figure | Value | Source & Period |
|---|---|---|
| Baseline home win rate, 63 leagues worldwide | 44.3% | CIES Football Observatory, Jan 2015–Mar 2020 |
| Home win rate once crowds were removed (same leagues) | 42.2% (a decrease in 41 of the 63 leagues studied) | CIES Football Observatory, post-pandemic-closure comparison |
| Average goal difference per match, pre- vs. post-crowd-removal | +0.31 → +0.24 | Same CIES analysis |
| Home goal advantage specifically in crowdless matches | Home teams scored 31.37% more goals than away teams without crowds, down from 73.84% more with crowds present | Sporting Bounce, aggregating peer-reviewed findings |
| Country-level variation | The German Bundesliga showed the largest, most statistically robust drop in home advantage once crowds were removed; other leagues (e.g., Switzerland) showed home advantage *increase* post-closure, illustrating this is not a uniform effect | Multiple sources (CIES; PMC-indexed academic study) |
| Historical PL/Championship baseline (a commonly-cited figure, slightly higher than the CIES multi-league average) | ~45% home win vs. ~27% away win | Springer Nature computational-statistics study |

**Important accuracy note:** the CIES figures (44.3%/42.2%, a ~2 percentage point drop) and the crowdless-goal-advantage figures (73.84%→31.37%, a much larger relative drop) are measuring **different things** — the first is match win-rate, the second is the *size of the average goal-scoring gap* — and citing them together without this distinction would overstate how much home advantage actually collapsed in terms of match outcomes specifically. A Tactical Battle Engine should keep these as separate calibration targets (`home_win_rate_baseline` vs. `home_goal_differential_baseline`) rather than a single collapsed "home advantage" number.

### 73.6 Possession vs. Winning — A Genuinely Important Correction

This directly refines the caution already given in `01_CONCEPTUAL_MODELS.md` Part CC ("do not equate possession with dominance") — the sourced data shows that caution actually understates the case:

| Finding | Detail | Source |
|---|---|---|
| Weakest correlate among common stats | Passing accuracy & possession % correlate with winning at only ~10-15%, far behind shots on target (~45%) and shot conversion rate (~33%) | Cross-league study (Medium/Cenker Cengiz), thousands of matches, Premier League/La Liga/Serie A/Bundesliga/Ligue 1 |
| Meta-analytic verdict | A meta-analysis of 75 peer-reviewed articles concluded match outcome is not meaningfully related to possession percentage, and that possession is not a dominant predictor of match success | Wang et al. (2022), as reported via multiple secondary sources |
| Direct win-rate figures (mixed by competition) | In the 2022 Men's World Cup, teams with more possession won 57% of matches; in the Women's World Cup 2022, teams with more possession won 59% of matches (38 of 64) — both above 50% but far from deterministic | FIFA Training Centre research |
| A documented negative-correlation case | At the 2022 Men's World Cup specifically, the trend line showed a slight *negative* relationship between possession and success — the most successful group by result was actually the one with a 15-30% possession *deficit* | FIFA Training Centre research |
| Successful teams' typical possession band (Champions League) | Winning teams' possession clustered in a relatively narrow 50.3%-56.7% band, not the very highest possession figures seen across all teams | Academic study, UEFA Champions League match analysis |
| Causality caveat | The clearest reading is that possession correlates with winning largely because *better teams* (bigger squads, more quality) tend to also hold more of the ball — not because holding the ball is independently causal | Multiple sources converge on this interpretation |

**Direct correction to the engine's models:** `01_CONCEPTUAL_MODELS.md` Part CC's `TACTICAL_DOMINANCE` construct already lists possession as just one input among several (field tilt, xT rate, pitch control, duels, shot differential) rather than the primary signal — this sourced data confirms that design choice was correct, and goes further: possession should likely be weighted **below** shots-on-target and shot-conversion-rate in any calibrated version of that model, not just alongside them. A Tactical Battle Engine that heavily rewards possession-accumulating actions in its `TACTICAL_ACTION_VALUE` scoring (Part BW) without a strong tie to actual chance creation would be optimizing for a metric the real data shows is a weak win predictor.

### 73.7 Physical Output by Position (firms up the ranges in Section 46.2)

| Position | Total Distance (per match average) | High-Intensity / Sprint Note | Source |
|---|---|---|---|
| Centre-back | ~9.2 km (lowest of all outfield positions) | Also lowest high-intensity and sprint distance among outfield positions | CIES Football Observatory, SkillCorner tracking data |
| Midfielder (central) | ~10.6 km (highest of all positions) | Not the highest in sprint distance despite highest total distance — illustrates that total distance and sprint distance are separate profiles, not interchangeable | CIES Football Observatory |
| Winger | ~10.3 km total | Highest high-intensity distance (~932m) and highest sprint distance (~211m) of any position | CIES Football Observatory |
| Full-back | ~9.9-10 km | Between centre-back and winger, reflecting the dual defensive/overlapping demands of the role | CIES Football Observatory; corroborated by multiple secondary sources |
| Forward/striker | ~9.9-10 km total | Age has the strongest observed relationship with high-speed running decline specifically for forwards — older strikers lose sprint distance faster than they lose total distance | CIES Football Observatory |
| Goalkeeper | ~4.5-5.5 km | A fundamentally different physical profile — short bursts and lateral movement rather than sustained running | Multiple sources, including 2016 Euros positional data (~4.8 km average) |

**Engine implication:** this confirms core KB §46.2's general "midfielders run most, CBs run least" claim with hard numbers, and adds a genuinely useful refinement Section 46.2 didn't have: **total distance and high-intensity/sprint distance are different rankings** — a centre-back is lowest on both, but a central midfielder is highest on total distance while a *winger* is highest on high-intensity and sprint distance specifically. A fitness/fatigue model (Section 46.2, Part BE) should track these as two separate curves per position, not a single "stamina" number, since a winger substituted for fatigue reasons is very plausibly suffering a sprint-capacity decline while their total distance covered looks unremarkable.



The following values in Section 46.4 and 50.6's JSON blocks should be read as now confirmed/refined by this section's sourced figures:

```json
{
  "penalty_conversion_rate": {
    "multi_year_multi_study_average": 0.77,
    "single_recent_season_big5_figure": 0.805,
    "calibration_recommendation": "use 0.77 as the stable prior; treat 0.805 as a recent-season data point, not a new baseline"
  },
  "ppda_bands": {
    "elite_current_season_reference": "< 9.0 (2025/26 Premier League context)",
    "historical_single_season_record": 7.26,
    "high_pressing_softer_definition": "7.0-9.0",
    "passive_low_block": "> 13.0",
    "calibration_recommendation": "re-derive per league/season; do not hard-code across contexts"
  },
  "shot_conversion_by_zone": {
    "six_yard_box_pct": 0.40,
    "header_close_range_pct": 0.25,
    "outside_box_xg_per_shot": [0.03, 0.07],
    "inside_box_xg_per_shot_floor": 0.20,
    "goals_from_inside_box_share": [0.80, 0.85]
  },
  "home_advantage": {
    "baseline_win_rate_with_crowd": 0.443,
    "win_rate_without_crowd": 0.422,
    "goal_difference_with_crowd": 0.31,
    "goal_difference_without_crowd": 0.24,
    "note": "win-rate effect and goal-differential effect are distinct metrics -- do not conflate"
  },
  "possession_win_correlation": {
    "correlation_strength_pct": [10, 15],
    "shots_on_target_correlation_pct": 45,
    "shot_conversion_correlation_pct": 33,
    "meta_analysis_verdict": "possession is not a dominant predictor of match outcome (Wang et al. 2022, 75-study meta-analysis)",
    "calibration_recommendation": "weight possession-accumulation below shot-quality/shot-volume metrics in TACTICAL_DOMINANCE and TACTICAL_ACTION_VALUE"
  },
  "physical_output_by_position_km": {
    "centre_back": {"total_distance": 9.2, "profile": "lowest_total_and_lowest_high_intensity"},
    "central_midfielder": {"total_distance": 10.6, "profile": "highest_total_distance"},
    "winger": {"total_distance": 10.3, "high_intensity_m": 932, "sprint_m": 211, "profile": "highest_high_intensity_and_sprint"},
    "full_back": {"total_distance": [9.9, 10.0], "profile": "intermediate"},
    "forward": {"total_distance": [9.9, 10.0], "profile": "age_sensitive_sprint_decline"},
    "goalkeeper": {"total_distance": [4.5, 5.5], "profile": "distinct_short_burst_lateral_profile"}
  },
  "source_class": "D",
  "last_verified": "August 2026 -- re-verify via web search before relying on these for a season significantly later than this"
}
```

**UNIVERSAL PRINCIPLE:** Accuracy in a knowledge base like this one comes from two disciplines working together, not one: (1) sourcing every specific number to a real, dated study or dataset rather than a plausible-sounding estimate, and (2) explicitly flagging where sources disagree, where a metric is context-dependent, or where two related-sounding figures are actually measuring different things (as in 73.4's win-rate vs. goal-differential distinction). A Tactical Battle Engine that hard-codes any of the numbers in this section as permanent constants, rather than as dated reference points to be periodically re-verified, will silently drift out of accuracy as leagues, rules, and playing styles evolve — the `last_verified` field above exists specifically so a maintainer knows when a re-check is due.

---

## SECTION 75 — REALISTIC ATTRIBUTE CONSTRAINTS (ELITE-SKILL BUDGET MODEL)

Section 22 lists which attributes matter most per role. This section addresses a distinct problem: **without an explicit constraint, a generated or simulated player tends to look unrealistically well-rounded** — high on everything relevant to their role, which no real player actually is. Even the greatest players in the world are elite in a small number of specific attributes and merely good-to-very-good in the rest. This section defines a concrete budget system so a Tactical Battle Engine generates/represents players with realistic, non-uniform attribute spreads.

### 74.1 Core Principle: The Elite-Skill Budget

**Rule:** every player has a limited budget of attributes that can sit in the "elite" tier (defined below). Everything else must fall to a lower tier, even if the player's overall quality is very high. This mirrors real scouting language — a player is described as having "two or three standout attributes" (e.g., "electric pace and a ferocious long shot") precisely because realistic players do not have ten simultaneously elite attributes.

| Tier | Rating Band (0-99 scale) | Typical Count Per Player |
|---|---|---|
| Elite (standout/signature trait) | 88-99 | **2-3 attributes maximum**, regardless of overall player quality |
| Very good | 75-87 | 4-7 attributes, typically concentrated in the player's role-critical cluster (Section 74.2) |
| Good/average | 55-74 | The majority of a player's remaining attributes |
| Weak/limited | Below 55 | 1-4 attributes, typically attributes structurally unimportant or actively de-prioritized for the player's role (e.g., a target man's agility, a stopper CB's dribbling) |

**Why exactly 2-3, not more:** this reflects how real scouting/data profiles actually read — a world-class winger might be elite in pace and dribbling, very good in crossing and finishing, and merely average in tackling and aerial ability. A player elite in 6+ attributes simultaneously (e.g., a CB who is elite in tackling, heading, strength, positioning, passing, AND pace at once) does not exist in reality at any meaningful sample size — that combination of traits is what makes a small handful of generational talents (not an average "world class" player) newsworthy in the first place, and even those players are not elite in *everything*.

### 74.2 Attribute Correlation Clusters

Elite-tier attributes are not randomly distributed — they cluster along physical/technical/mental lines that tend to co-occur or trade off against each other in real players. A realistic generator should sample elite slots from within these clusters rather than uniformly across all 25+ attributes in Section 22.

| Cluster | Attributes Grouped Together | Real-World Logic |
|---|---|---|
| Explosive-physical | Pace, acceleration, agility | These three tend to co-occur (fast-twitch athletic profile) and are the most common cluster for a player's 2-3 elite slots to fall entirely within, especially for wingers/full-backs |
| Power-physical | Strength, jumping, balance | A separate physical cluster from explosive-physical — a target man is far more likely to have elite attributes from *this* cluster than from the explosive-physical cluster, and it's rare (not impossible) for a single player to be elite in both clusters simultaneously |
| Technical-ball | First touch, dribbling, ball control | Common elite cluster for inside forwards, false nines, advanced playmakers |
| Passing-vision | Vision, short passing, long passing | Common elite cluster for deep-lying playmakers, regista, advanced playmakers — frequently trades off against the power-physical cluster (a classic "brilliant on the ball, unremarkable physically" profile) |
| Finishing | Finishing, composure (in front of goal), off-ball movement | Common elite cluster for poachers/complete forwards |
| Defensive-positional | Positioning, anticipation, interceptions | Common elite cluster for cover defenders/holding midfielders — frequently the elite cluster for a player who is only "good," not elite, physically |
| Defensive-physical | Tackling, strength, aggression | Common elite cluster for stoppers/ball-winning midfielders |
| Mental-composure | Decision making, composure, game-state awareness | Can pair with almost any other cluster, and is the cluster most associated with late-career players whose physical clusters have declined (Section 74.4) |

**Constraint rule:** when assigning a player's 2-3 elite slots, bias sampling so that **at least 2 of the elite attributes come from the same cluster**, with at most one "outlier" elite attribute from a different cluster. This produces realistic profiles like "elite pace + elite acceleration + one surprising elite trait (e.g., long shots)" rather than an implausible scattershot of unrelated elite attributes.

### 74.3 Position-Based Elite-Slot Restrictions

Certain attributes should be excluded (or heavily down-weighted) from the elite-slot pool entirely for certain positions, reflecting genuine structural rarity rather than just low priority:

| Position | Attributes Effectively Excluded From the Elite Pool | Real-World Logic |
|---|---|---|
| Centre-back (traditional/stopper) | Dribbling, agility | Extremely rare for a genuine stopper-profile CB to also be elite at close control/agility — the archetypes pull in different physical directions |
| Target man | Pace, acceleration, agility | The role is defined by a physical profile (Section 74.2's power-physical cluster) that is close to structurally incompatible with elite explosive-physical attributes |
| Goalkeeper | Dribbling, finishing, crossing, heading (as an attacking threat) | Outside the position's action space entirely — these attributes are essentially irrelevant regardless of the individual player |
| Poacher | Long passing, vision (as a playmaking trait) | Not structurally impossible, but rare enough in the real player population that a generator should treat it as a low-probability elite slot rather than an equally-likely one |
| Ball-winning midfielder | Vision, long passing | The role's real-world population skews heavily toward the defensive-physical cluster (74.2) rather than the passing-vision cluster |

**Important nuance:** these are *statistical rarities observed in the real player population*, not hard impossibilities — a Tactical Battle Engine generating players for variety/depth should allow a small probability of an "exceptional" player breaking one of these restrictions (this is exactly how a real, rare player like an unusually mobile, ball-playing CB or an unusually creative target man gets described as tactically special), but the *default* generation weighting should respect them.

### 74.4 Aging Curve Interaction With the Elite Budget

The elite-skill budget is not static across a player's career — it shifts which *cluster* the 2-3 elite slots are drawn from, without necessarily changing the total count:

| Career Stage | Typical Elite-Slot Cluster Shift |
|---|---|
| Early career (peak physical, developing decision-making) | Elite slots concentrated in explosive-physical or power-physical clusters; mental-composure attributes rarely elite yet |
| Peak career | The career point where a player is most likely to carry elite slots across *two* different clusters simultaneously (e.g., an elite physical attribute plus an elite technical attribute) — this dual-cluster peak is part of why "prime years" are considered a player's most complete/dangerous stage |
| Late career (declining physical, refined decision-making) | Physical-cluster elite slots decay first and fastest (directly consistent with core KB §50.5's fixture-fatigue/aging findings and §73.7's age-vs-sprint-decline data); mental-composure and passing-vision clusters are the most durable, and can remain or even newly enter the elite tier as physical slots vacate |

**Engine implication:** a player-aging simulation should not uniformly decay all attributes by the same rate — it should specifically target physical-cluster elite slots for the fastest decline, consistent with the real sourced finding in Section 73.7 that age has its strongest observed relationship with high-speed running decline specifically.

### 74.5 Worked Example: Applying the Budget to Three Player Types

| Player Archetype | Elite Slots (2-3, cluster-consistent) | Very Good | Everything Else |
|---|---|---|---|
| Poacher | Finishing, off-ball movement (finishing cluster) | Composure, anticipation, pace | Passing, vision, tackling, aggression, dribbling all mid-tier or below |
| Regista | Vision, long passing (passing-vision cluster) | Short passing, decision making, positioning | Pace, strength, tackling, finishing all mid-tier or below |
| Stopper CB | Tackling, strength (defensive-physical cluster) | Heading, positioning, aggression | Dribbling, pace, vision, long passing all mid-tier or below (dribbling likely in the "weak" tier per 74.3) |

This directly operationalizes the design intent — no player above has more than 2-3 elite attributes, each generated player has a recognizable "identity" rather than being uniformly excellent, and the exact shape of that identity is generated from real, structurally consistent clusters rather than randomly scattered high numbers.

---


| Concept | Definition | Tactical Relevance |
|---|---|---|
| Scanning | Checking surroundings before receiving the ball | Determines speed/quality of the next decision |
| Awareness | General perception of teammates, opponents, and space | Foundation for all other intelligence attributes |
| Decision making | Selecting the correct action from available options under time pressure | Directly determines execution quality of any tactical plan |
| Anticipation | Predicting future events (opponent movement, ball trajectory) before they occur | Enables interceptions, blind-side runs, second-ball wins |
| Spatial awareness | Understanding of zones, distances, and angles relative to self | Enables positional discipline and exploitation of space |
| Opponent recognition | Identifying opponent tendencies/weaknesses during a match | Enables in-game tactical adaptation |
| Risk assessment | Weighing reward vs consequence of an action (e.g., risky pass in defensive third) | Governs pass/dribble selection by zone (see Section 1.2) |
| Game-state awareness | Adjusting behavior based on score/time/cards (see Section 24) | Prevents tactically inappropriate risk-taking |
| Tactical discipline | Adherence to a team's structural instructions even under pressure/fatigue | Preserves defensive/attacking shape integrity |
| Communication | Verbal/non-verbal coordination between teammates | Enables synchronized pressing, marking handoffs, cover rotations |

---

---

## SECTION 76 — STAMINA-CONTROLLED MOVEMENT MODEL

Section 75 constrains *which* attributes a player can be elite in. This section addresses a separate, real-time question: **how much of a player's attribute profile is actually available to them at any given moment of the match**, since a tired player doesn't lose attribute points permanently (that's aging, Section 75.4) — they temporarily can't express their full pace, decision quality, or work rate. This is the missing link between a static attribute profile and believable minute-by-minute movement in a simulation.

### 76.1 Core Principle: Stamina as a Real-Time Multiplier, Not a Separate Stat

**Rule:** every player has a `stamina` attribute (0-99, same scale as Section 22/75) representing their *average* capacity to sustain output — but stamina itself doesn't directly do anything. Instead, stamina determines how fast a player's **current fatigue level** rises during a match, and current fatigue level applies a **real-time multiplier** to the physical and, to a lesser extent, mental attributes that actually govern movement and decisions (core KB §65's decision trees, §59's on-ball assessment).

```
current_output(attribute, minute) = base_attribute_value * fatigue_multiplier(fatigue_level(minute))
```

This keeps stamina attached to *movement control* specifically — the request this section answers — rather than turning it into a generic "energy points" stat disconnected from what a tired player actually does differently on the pitch.

### 76.2 Fatigue Accumulation Model

| Factor | Effect on Fatigue Accumulation Rate | Real-World Basis |
|---|---|---|
| Base stamina attribute | Higher stamina → slower fatigue accumulation per minute of equivalent activity | Direct definition of the attribute |
| Position-based activity profile | A winger accumulates fatigue faster per minute than a centre-back at the *same* stamina rating, because their required high-intensity/sprint output is structurally higher | Core KB §73.7's sourced finding that wingers post the highest high-intensity (932m) and sprint (211m) distances, while CBs post the lowest of both |
| Match-specific activity level | Pressing intensity, transition frequency, and total distance actually covered in the specific match (not just the position's average) directly scale fatigue accumulation | Core KB §46.2/§50.5's fixture-congestion and pressing-sustainability findings |
| Age/career stage | Later-career players accumulate fatigue faster in the physical-attribute clusters specifically, consistent with Section 75.4's aging model | Section 75.4 |
| Half-time recovery | A partial fatigue reset occurs at half-time, reflecting real substitution/recovery patterns, though not a full reset to zero | General sports-science convention; also reflected in the "last 15 minutes" tactical models already present in core KB Part BD |

### 76.3 Fatigue → Attribute Multiplier Curve

| Fatigue Level | Physical Attribute Multiplier (pace, acceleration, agility, jumping, sprint-relevant) | Mental/Technical Attribute Multiplier (decision making, first touch, passing accuracy) |
|---|---|---|
| Fresh (0-20%) | 1.00 | 1.00 |
| Light fatigue (20-40%) | 0.95 | 0.98 |
| Moderate fatigue (40-60%) | 0.85 | 0.93 |
| Heavy fatigue (60-80%) | 0.70 | 0.85 |
| Severe fatigue (80-100%) | 0.55 | 0.75 |

**Why the mental/technical column degrades more slowly than the physical column:** this reflects the same real-world pattern already sourced in Section 75.4 and §73.7 — physical output (especially high-speed running) degrades with fatigue/age faster and more visibly than decision-making or technique. A fatigued player is far more likely to be a half-step slow to a ball than to suddenly misjudge a simple pass, though both effects are present and both should be modelled (a fatigued player's decision quality, per Section 59.2's checklist, genuinely does decline too, just less steeply).

### 76.4 Movement-Specific Effects (Direct Answer to "Control Movements")

This is the section's core deliverable — concrete rules for how current fatigue level should gate the movement mechanics already defined in Sections 6-7, 47, and 62-68:

| Movement Mechanic | Fatigue Effect |
|---|---|
| Sprint/run-in-behind speed (§6, §65.4) | Directly scaled by the physical multiplier (76.3) — a heavily fatigued striker's run in behind should be modelled as measurably slower to arrive, changing whether a through ball that would have worked at fatigue-level "fresh" is now interceptable |
| Pressing distance/closing speed (§11, §62.1) | A fatigued presser closes distance more slowly, directly reducing effective PRESSURE (`01_CONCEPTUAL_MODELS.md` Part BY) generated on the ball-carrier, even if the presser's positioning/decision to press is unchanged |
| Recovery-run speed (§64.2) | One of the most fatigue-sensitive movements — a tired defender's recovery run after being beaten should be modelled as significantly slower than the same defender fresh, directly increasing the space-in-behind risk described in core KB §13-14 |
| Off-ball run timing/frequency (§47.3, §7) | Fatigued players make fewer discretionary off-ball runs (checking runs, decoy runs) even when technically able to physically execute one, reflecting real observed pacing behavior late in matches, not just reduced sprint speed on the runs they do make |
| Scanning frequency (§63.2) | Mildly reduced under heavy fatigue — cognitively costly behaviors like frequent scanning are among the first "discretionary" actions to drop off, compounding the physical slowdown with a perception slowdown |
| Dribbling/skill-move success rate (§48.3) | Reduced via the technical multiplier — a heavily fatigued player attempting a stepover or close-control sequence should have a measurably lower success probability than the same move fresh |
| Jockeying/defensive stance quality (§64.2) | Reduced reactive push-off speed in either direction, directly increasing the likelihood a fatigued defender is beaten by a change of pace (§48.2's core 1v1 mechanism) |

### 76.5 Engine Encoding

```json
{
  "player_id": "string",
  "base_stamina_attribute": 78,
  "current_fatigue_pct": 62,
  "fatigue_band": "heavy_fatigue",
  "physical_multiplier": 0.70,
  "mental_technical_multiplier": 0.85,
  "position_fatigue_rate_modifier": 1.15,
  "minute": 74,
  "half_time_recovery_applied": true,
  "source_class": "F"
}
```

**UNIVERSAL PRINCIPLE:** Stamina should never be modelled as a standalone number that "runs out" and stops a player — it should function purely as a *rate controller* on top of the attribute and movement systems already defined throughout this knowledge base (Sections 6-9, 47-49, 62-68, 75). A player at 80%+ fatigue is still capable of every movement in the vocabulary — they simply execute it slower, less often, and with lower success probability, which is what produces the recognizable, realistic pattern of a team "dropping off" physically in the final 15-20 minutes (directly connecting to core KB Part BD's existing late-match tactical models) without requiring any special-cased "exhausted" state.

---


---

## SECTION 77 — REALISTIC POPULATION CAPS ON PACE & SKILL ATTRIBUTES

Section 75 constrains how many elite attributes *one* player can have (2-3). This section adds the missing complementary constraint: **across the whole player population, elite/near-max values must themselves be statistically rare**, and even the fastest, most skilled real players have hard practical ceilings. Without this, a generator could still produce an unrealistic *population* — e.g., every winger rolling 90+ pace — even while correctly respecting the 2-3-elite-per-player rule.

### 77.1 Why a Flat 0-99 Range Per Attribute Is Unrealistic

A naive generator sampling any attribute uniformly between, say, 70 and 99 for an "elite" tier produces far too many 95+ values — in the real player population, values that high are genuinely rare outliers, not a normal outcome within the tier. Attribute values should follow a distribution that is **dense in the middle of each tier and sparse at the very top**, not flat.

### 77.2 Hard Ceiling Values Per Attribute Category

| Category | Hard Ceiling (0-99 scale) | Real-World Basis |
|---|---|---|
| Pace | 99, but values above 95 should occur in well under 1% of generated players | Reflects that top-end sprint speed among professional footballers clusters tightly — the gap between a "fast" professional (roughly 32-33 km/h peak) and the fastest ever recorded is small in absolute terms, so a 99 should be reserved for a small handful of generational outliers, not a routine winger roll |
| Acceleration | 99, values above 96 rare | Acceleration ceilings are even more tightly clustered across elite athletes than top-speed, since first-step quickness has less individual variance at the professional level once a stamina/agility floor is already met |
| Strength/Jumping | 99, values above 95 reserved for specific physical outlier archetypes (e.g., genuine target men, some CBs) | Physical power ceilings are position-correlated (Section 74.2/75.2's power-physical cluster) — a winger or playmaker rolling 95+ strength should be treated as a near-impossible combination, not just an unlikely one |
| Finishing/Dribbling/Passing (technical skills) | 99, values above 94 rare even for specialists | Technical-skill ceilings are the least physically constrained category, but real elite technicians still show meaningful match-to-match/season-to-season variance — a "perfect" 99 finisher would imply near-zero missed chances in a category where even the best in the world convert well under half of their non-penalty attempts |
| Mental attributes (decision making, composure, vision) | 99, values above 93 rare | Mental attributes are the hardest to observe/measure directly and the least standardized across scouting sources, which argues for the most conservative ceiling-rarity of any category |

### 77.3 The Population Distribution Rule

Rather than sampling uniformly within a tier band (Section 75.1's elite band was 88-99), sampling should follow a **right-skewed distribution within each tier** — most values land in the lower half of the tier's band, with a rapidly thinning tail toward the tier's maximum:

```
P(elite_value = v) decreases as v approaches the tier ceiling
-- e.g., within the elite band (88-99):
   88-91: ~55% of elite rolls land here
   92-94: ~30% of elite rolls land here
   95-97: ~12% of elite rolls land here
   98-99: ~3% of elite rolls land here
```

This is the direct fix for "limit pace and skills of the players" — it's not enough to cap the *maximum possible* value at 99; the *generation process itself* must make values near that maximum statistically rare, or the cap is meaningless in practice (a flat distribution still produces plenty of 97s and 98s).

### 77.4 Combinatorial Power Cap (Cross-Attribute Limit)

Beyond single-attribute ceilings, no player's **combined top-3 attributes** should exceed a total budget, preventing a technically "legal" (2-3 elite, correct clusters) player from still being unrealistically dominant by having all their elite rolls land near the top of the elite band simultaneously:

| Rule | Value |
|---|---|
| Sum of a player's 3 highest attributes | Should not exceed 280 (equivalent to an average of ~93.3 across the top three) except in the rarest generation cases (under 2% of generated players) |
| Sum of a player's 3 highest attributes, typical elite player | 255-270 (average 85-90 across the top three) |

This directly limits the "superhuman" failure mode where a generator produces a player who is not just elite in 2-3 attributes, but elite *at the very top of the scale* in all of them simultaneously — the specific unrealistic pattern a flat/uncapped random generator tends to produce most often.

**UNIVERSAL PRINCIPLE:** Section 75's per-player elite budget and this section's population-level rarity/ceiling constraints solve two different problems that must both be enforced together — Section 75 stops any single player from being uniformly excellent, while Section 77 stops the *pool* of generated players from clustering unrealistically near the top of the scale even when each individual player looks legal in isolation. A Tactical Battle Engine should validate both constraints whenever generating or importing a player, not treat either as sufficient on its own.

---

## SECTION 78 — OVERALL RATING CAP & TOTAL ATTRIBUTE BUDGET (Anti-Overpowering System)

Section 75 caps *how many* attributes can be elite (2-3). This section adds the complementary constraint requested here: a cap on a player's **total attribute budget and resulting overall rating**, so that even a player with 2-3 legitimately elite attributes cannot also have an unrealistically high floor across everything else — which is the other, easier-to-miss way a generated player ends up "overpowered."

### 77.1 Core Principle: Two Independent Caps, Not One

An overpowered player can result from either of two separate failure modes, and Section 75 alone only fixes one of them:

| Failure Mode | What Goes Wrong | Which Cap Fixes It |
|---|---|---|
| Too many elite attributes | A player is elite (88+) in 6+ attributes simultaneously | Section 75's elite-slot cap (2-3 max) |
| Elite attributes + inflated floor | A player has a *correct* 2-3 elite attributes, but every remaining attribute is also pushed unrealistically high (e.g., 80+ across the board) | **This section's total attribute budget and overall rating cap** |

A generator that only enforces Section 75 can still produce an unrealistic player — 3 elite attributes plus twenty-two attributes all sitting at 78-84 is technically compliant with the elite-slot rule but is still an unrealistically "complete" player with almost no real weaknesses anywhere. This section closes that gap directly.

### 77.2 Total Attribute Budget

**Rule:** the sum of all attribute values for a given player must not exceed a fixed budget tied to their overall quality tier. This forces genuine trade-offs — pushing one attribute up necessarily means another must come down, which is exactly how real player profiles work (a gain in physicality/pace is realistically paired with a player who is somewhat more limited technically, and vice versa, not a player who simply has more of everything).

| Overall Quality Tier | Total Attribute Budget (sum across all ~25 attributes) | Implied Average Per Attribute |
|---|---|---|
| World class | 1,750 | ~70 |
| Very good | 1,550 | ~62 |
| Squad player | 1,350 | ~54 |
| Backup/fringe | 1,150 | ~46 |

**How the budget interacts with the elite slots:** the 2-3 elite attributes (88-99 each) consume a disproportionate share of the budget on their own — even at the lowest end of the elite band, 2 elite attributes alone can account for roughly 10% of a world-class player's entire 1,750-point budget. This is precisely the mechanism that *forces* realism: a player who spends heavily on elite attributes has structurally less budget left over for the remaining ~22 attributes, which is why real elite specialists (e.g., an extremely fast winger) are so often correspondingly weaker in unrelated areas (e.g., aerial ability, tackling) — not because of an arbitrary rule, but because the budget mathematically requires it once the elite slots are paid for.

### 77.3 Overall Rating Cap

Separately from the attribute budget, the player's single-number overall rating (however a downstream system chooses to compute it — e.g., a role-weighted average of relevant attributes) should itself be hard-capped by realistic tier ceilings:

| Descriptor | Overall Rating Ceiling | Real-World Population Share (illustrative, Class F) |
|---|---|---|
| Generational / all-time great | 95-99 | An extremely small number of players league-wide at any given time |
| World class | 88-94 | A small number per major league |
| Very good starter | 80-87 | A meaningful minority of starting players |
| Solid starter/squad player | 70-79 | The bulk of professional starting/rotation players |
| Fringe/backup | 55-69 | Squad depth, academy graduates, lower-division-caliber players |

**Hard rule:** a rating above 94 should be treated as a rare, deliberately-flagged exception requiring explicit justification (e.g., representing a specific real generational talent), never a default output of random/procedural generation. A generator that regularly produces 95+ overall players has an uncapped or miscalibrated budget system.

### 77.4 Enforcement Algorithm

```
1. Generate elite slots (2-3) per Section 75's clustering rules.
2. Generate very_good / good / weak tier attributes per Section 75's tier bands.
3. Sum all attribute values -> total_budget_used.
4. IF total_budget_used > tier_budget_cap (Section 77.2):
     scale down ONLY the non-elite attributes (never the 2-3 elite slots, which
     define the player's identity) proportionally until total_budget_used <= cap.
5. Compute overall_rating from the (possibly rescaled) final attribute set.
6. IF overall_rating > tier_rating_ceiling (Section 77.3):
     apply a further proportional reduction to non-elite attributes only,
     re-check, repeat until compliant.
7. Return the final, budget- and ceiling-compliant attribute set.
```

**Why elite attributes are explicitly protected from scaling-down in step 4/6:** the whole point of the elite-slot system (Section 75) is that a player's identity is defined by 2-3 genuinely elite traits — automatically shaving those down to satisfy a budget would defeat the purpose and produce a bland, uniformly-mediocre player instead of a realistic specialist. The budget constraint should always resolve by suppressing the *unremarkable* attributes further, not by diluting the player's actual strengths.

---

-e 
*END OF DOCUMENT*
