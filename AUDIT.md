# Design System — Figma Audit (BEFORE state)

**File:** design-system — `YfjBIii1QpKraZegUif3lY`
**Audited node:** `198:64` (page "Design")
**MCP server:** claude.ai Figma (authenticated as Mike / mikki@pink-man.ru)
**Date:** 2026-06-19

---

## 1. Structure map

### Pages (2)
| Page | Contents |
|------|----------|
| **Design** | All design-system sections + product mockups (see below) |
| **Cover** | Cover page (file thumbnail) |

### Sections inside "Design" (6 top-level children)
| Section | Type | Children | Role |
|---------|------|----------|------|
| `ds-atoms` | SECTION | 16 | Atomic components |
| `ds-molecules` | SECTION | 10 | Composite components |
| `ds-organisms` | SECTION | 7 | Large components |
| `design` | SECTION | 28 | Product mockup screens (NOT DS primitives) |
| `styles` | SECTION | 6 | Visual style specimen (indents/colors/typography) |
| `Frame 1728` | FRAME | 5 | Stray legend frame (junk name) — Prepare/Styles/Atoms/Molecules/Organisms labels |

---

## 2. Variables / Tokens

**3 collections — all named "variables"** (ambiguous). Each has 2 modes: `wf` (wireframe / lo-fi placeholder) and `ds` (real brand values).

| Collection | Var count | Role |
|------------|-----------|------|
| `variables` #1 (`2006:13229`) | 58 | **Master / live** — fully referenced |
| `variables` #2 (`2006:13288`) | 1 | Cruft — single duplicate `font/family/Antiqa` (orphan) |
| `variables` #3 (`2006:13290`) | 21 | Duplicate/demo set feeding the `styles` specimen page |

**Total: 80 variables.**

### Mode semantics
- `wf` mode: colors mostly `#ffffff`, fonts all `Inter`, smaller sizes → **wireframe placeholder theme**.
- `ds` mode: real brand palette + fonts (Instrument Serif, Pixform, Akkurat LL Cyrillic) → **real design theme**.
- ⇒ For React export, **`ds` is the canonical theme**; `wf` is a lo-fi alternate.

### Master collection #1 — 58 variables (by group)
**Color (33):** Bar/On base filled, Bar/On base emty, tech/purple, tech/green, tech/red, tech/gray, black, gray, superYellow, lines, Text & icon/{On color, Primary, Secondary, Brown, Green, Yellow dark}, Controls/{Secondary/default, On Color/White, On Color/Brown, On Color/Yellow dark}, Background/Base, Background/Cards/{white, Red, green, yellow, Pink, Violet}, Background/On cads/{Red, Green, Yellow dark, Pink, Yellow, Violet}

**Spacing — `indents/` (9):** -(XS)=-8, XXXS=2, XXS=4, XS=8, S (inner)=14, M=20, L=24, X=30, XXL (out)=60/90

**Radius — `rounds/` (4):** S=4, M=4/8, L=4/12, Over=4/999

**Typography (12):** font/family/{Pixel, Grotesk, Antiqa}, font/size/{h1=44/84, h2=30/40, h3=20, description=30, M=15, text - gr=11, text - px=11/10, caps=8}, size/base with=696/830

### Collection #3 — 21 variables (duplicates of #1)
radius/L, font/family/{grotesk, antiqa, pixel} (lowercase dupes), font/size/{h1,h2,h3,description,M,text-gr,text-px,caps}, indents/{-1, XXXS, XXS, XS, S (inner), M, L, XL, XXL (out)}

### Collection #2 — 1 variable
font/family/Antiqa (duplicate of #1's, orphan)

---

## 3. Styles

| Style type | Count |
|------------|-------|
| Paint styles | **0** |
| Text styles | **0** |
| Effect styles | **0** |
| Grid styles | **0** |

⚠️ **No Figma styles exist.** The typography ramp (H1 84/76, H2 40/36, DESCRIPTION 30/27 Pixform, H3 20/18, H4 15/14, TEXT-PIXEL 10/9, text-grotesk 11/10, text--b 11/10 bold, CAPS 8/7) and the colour palette are documented only as **visual specimens + variables**, not as reusable styles.

---

## 4. Components & variants

**108 component nodes** = ~28 component sets + their variants, + standalone components. **1077 instances** on the canvas.

### ds-atoms (16 sets)
bar (4 variants), avatar (3), status (4), icons (5), switch (4), flag (2), tag (2), error (1), avatars (1), list (1), text_area (1), input (1), dropdown (4), graph (1), switch group (1), btn (5)

### ds-molecules (10 sets)
profile (3), node (1), campaign_preview (1), project_preview (1), experience_preview (1), team (1), card metric (1), Cards metrica (1), attemt (2), notify (1)

### ds-organisms (7)
second-row (2), topmenu (3), header (1), canban (standalone COMPONENT), task (2), card top (2), menu_switch (2)

### styles section
indents (COMPONENT_SET, 9 variants: size=-1 … XXL) — spacing specimen

### Instance counts (top usage)
btn 232, avatar 120, profile 91, icons 80, dropdown 58, menu_switch 50, switch 49, status 40, bar 38, tag 29, topmenu 22, second-row 22, header 21, input 17, list 16, text_area 16, error 16, campaign_preview 15, card top 15, flag 14, task 12, node 9, Cards metrica 9, avatars 7, team 6, notify 6, graph 5, card metric 4, attemt 3, project_preview 3, experience_preview 3, canban 3 + generic "Frame 1" 24, "Frame 5" 14

---

## 5. Issues

### 5a. Duplicate collections / variables
- **3 collections all named "variables"** — indistinguishable; #2 and #3 largely duplicate #1.
- **Collection #2** = a single orphan `font/family/Antiqa`, duplicate of #1 → delete.
- **Collection #3 (21)** duplicates #1: all 8 `font/size/*`, 3 `font/family/*` (lowercase), 9 `indents/*`, `radius/L`.
- **Casing duplicates** of font families: `Pixel`/`pixel`, `Grotesk`/`grotesk`, `Antiqa`(×2)/`antiqa`.
- **Same value, different name:** `indents/X` (30) == `indents/XL` (30).
- **Two radius systems:** `rounds/{S,M,L,Over}` (#1) vs `radius/L` (#3).
- **Near-duplicate components:** `card metric` vs `Cards metrica` (both metric cards).

### 5b. Inconsistent naming
- **Typos:** `On base emty` (empty), `On cads/*` (cards) ×6, `size/base with` (width), `attemt` (attempt), `canban` (kanban).
- **Ad-hoc / non-tokenic:** `Color/superYellow`, `Color/black`, `Color/gray` (raw color names, not roles).
- **Mixed casing & delimiters in tokens:** `Color/Text & icon/On color` (ampersand + spaces + Title Case), `Color/Background/On cads/Yellow dark`.
- **Mixed component naming:** `btn` (abbrev), `text_area`/`menu_switch`/`second-row` (snake/kebab), `switch group`/`card top`/`card metric`/`Cards metrica` (spaces), `topmenu` (no separator). No PascalCase.
- **Default Figma variant naming:** `Property 1=Default`, `Property 1=Variant2` everywhere (un-semantic).
- **btn variant axis muddle:** `CTA?=yes/no` boolean mixed with `type=secondary/On color/small/big/node` (style + size in one axis).
- **Junk frame names:** `Frame 1728`, plus product mockups `Frame 1450–1454`.
- **Duplicate frame names** in `design` section: `Hiring_campaign` ×3, `All_teams_campaigns` ×3, `All_teams` ×3, `Candidate` ×2, `Automation_mail-editor` ×3.

### 5c. Orphans (11 variables — no binding, not aliased)
font/size/text - px [#1], font/size/h2 [#1], font/family/Antiqa [#2], and from #3: font/size/{text-gr, h1, h2, description, h3, M, text-px, caps}.

### 5d. Missing tokenization / structure
- **0 text styles** — typography ramp not codified as reusable styles (migration gap for React typography).
- **0 paint styles** — palette lives only in variables + swatches.
- DS primitives (`ds-*`) and product mockups (`design`) live in one page → should be separate pages.
- Spacing tokens named by t-shirt size only (no numeric scale), making React `space/4`-style export lossy without the value map.

### 5e. Value-quality flags
- `wf` mode renders nearly all colors white and all fonts Inter — correct as a wireframe theme, but means single-mode export must pick `ds`.
- Several `ds` values are aliases (tech/green→Text&icon/Green, On cads/Green→Cards/green, On cads/Yellow→Cards/yellow, Controls/On Color/Yellow dark→On cads/Yellow dark) — fine, but flatten on export.

---

## Issue counts
- Duplicate collections: **2** (of 3 redundant)
- Duplicate/near-duplicate variables: **~21** (collection #3) + 1 (#2) + 3 casing pairs + 1 same-value pair
- Near-duplicate components: **1 pair** (card metric / Cards metrica)
- Naming-inconsistent variables: **~40** (all Color/* + indents/* + rounds/* + font/* need normalization)
- Naming-inconsistent components: **~28** (all sets — none PascalCase)
- Orphan variables: **11**
- Missing text styles: **9 ramp levels** uncodified
- Junk-named frames: **Frame 1728** + 6 mockup frames
