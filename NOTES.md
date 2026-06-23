# Release Notes — Step 1: Prepare (Figma audit & cleanup)

File: design-system (`YfjBIii1QpKraZegUif3lY`). Human-readable, task-by-task.

---

## [Step 1: Prepare] — A. Connection check — 2026-06-19

- **Connection: LIVE.** Figma MCP responded; authenticated as **Mike** (`mikki@pink-man.ru`), team "PINKMAN DESIGN FORCES" (pro/expert seat).
- **MCP server:** claude.ai Figma.
- **File:** design-system — `YfjBIii1QpKraZegUif3lY`.
- **Pages (2):** `Design` (all DS sections + mockups), `Cover`.
- **Node count:** ~1300+ nodes under "Design" — 108 component nodes, 1077 instances, 80 variables, 6 top-level sections.
- Skipped/flagged: nothing — single allowed stop not triggered.

---

## [Step 1: Prepare] — B. Full inventory — 2026-06-19

- Inventoried via Plugin API (authoritative), not just `get_variable_defs`.
- **Tokens:** 80 variables across **3 collections all named "variables"** (modes `wf` + `ds`). #1=58 (live), #2=1 (cruft), #3=21 (duplicate/demo).
- **Styles:** **0** paint / **0** text / **0** effect / **0** grid — no Figma styles exist; type ramp + palette are visual specimens only.
- **Components:** ~28 component sets (108 component nodes), **1077 instances**. Grouped in `ds-atoms` (16), `ds-molecules` (10), `ds-organisms` (7) sections; `design` (28 mockup frames) + `styles` specimen.
- Counts before: **tokens 80 / styles 0 / components 108 / orphans 11**.
- Flagged: `design` section holds product mockups (not DS primitives); stray `Frame 1728`.

---

## [Step 1: Prepare] — C. Problems found — 2026-06-19

- **Duplicates:** 2 of 3 collections redundant; ~21 vars in #3 + 1 in #2 duplicate #1; 3 font-family casing pairs; `indents/X`==`indents/XL` (same value); two radius systems (`rounds/*` vs `radius/*`); near-dup components `card metric`/`Cards metrica`.
- **Naming:** typos (`emty`, `cads`×6, `base with`, `attemt`, `canban`); ad-hoc color names (`superYellow`); ampersands/spaces/Title-case in token paths; no PascalCase components; default `Property 1=` variant names; junk `Frame 1728` + duplicate mockup frame names.
- **Orphans:** 11 unbound variables (mostly `font/size/*` in #3).
- **Hardcoded/missing:** 0 text styles (ramp uncodified); `wf` mode is all-white placeholder.
- Issue counts: **dup collections 2 / dup-or-near-dup vars ~25 / dup components 1 / naming-bad vars ~40 / naming-bad components ~28 / orphans 11 / missing text styles 9**.

---

## [Step 1: Prepare] — D. Convention locked — 2026-06-19

- **Tokens:** `category/role/scale`, lowercase, kebab-case → `color/text/primary`, `space/xs`, `radius/full`, `font/size/h1`.
- **Modes:** `wf→wireframe`, `ds→brand`; **brand = export default**.
- **Collections:** master → `tokens`; redundant → `_legacy-styles-demo` (deprecated, not deleted).
- **Components:** PascalCase, grouped by Atoms/Molecules/Organisms pages; semantic variant axes.
- **Styles:** mirror token path; text-style creation flagged as Step-2 follow-up (font-load risk).
- Full rule + 15 decisions in DECISIONS.md.

## [Step 1: Prepare] — E. Cleanup applied in Figma — 2026-06-19

**What changed (plain language):**
- Renamed **all 58 live variables** to the locked convention (`color/text/primary`, `space/xs`, `radius/full`, `font/size/h1`…). Reference-safe — bindings are by ID, so all 1077 instances kept working.
- Fixed every typo in token names: `emty→empty`, `On cads→on-card` (×6), `base with→base-width`; killed ampersands/spaces/Title-case.
- Unified the two radius systems: `rounds/*` → `radius/*`; collapsed `indents/X`+`indents/XL` (both 30) into one `space/xl`.
- Renamed the master collection `variables` → **`tokens`**; renamed modes `wf→wireframe`, `ds→brand` (**brand = export default**).
- **Deleted cruft collection #2** (1 orphan `font/family/Antiqa`) and **8 orphan font-size duplicates** from collection #3.
- Marked the leftover duplicate set `variables` #3 → **`_legacy-styles-demo`** (deprecated; still feeds the spacing specimen, so kept, names normalized).
- Renamed **all 34 components** to PascalCase + fixed typos: `btn→Button`, `canban→Kanban`, `attemt→Attempt`, `card metric→CardMetric`, `Cards metrica→CardMetricAlt`, `text_area→TextArea`, etc.
- **Reorganized into real pages:** Cover · Prepare · Styles · Atoms · Molecules · Organisms · Specimens. Moved each `ds-*` section to its page, moved product mockups to **Specimens**, moved the stray `Frame 1728` legend to **Prepare** (renamed "Legend — Prepare"), and **deleted the now-empty `Design` page**.
- Exported the canonical, de-duplicated, alias-flattened **`tokens.brand.json`** (58 tokens, nested) as the Step-2 React source (fallback path, per DECISIONS D15).

**Counts before → after:**
- Tokens (variables): **80 → 71** (deleted 1 cruft + 8 orphan dupes; remaining = 58 `tokens` + 13 `_legacy-styles-demo`)
- Collections: **3 → 2** (one named `tokens`, one deprecated)
- Token-name violations: **~40 → 0** (all normalized)
- Styles: **0 → 0** (none existed; see flag)
- Components: **108 nodes / 34 sets renamed → all PascalCase** (instances intact: still 1077)
- Orphans: **11 → 2** (remaining = `font/size/h2`, `font/size/text-pixel` in `tokens` — legit unbound size tokens, kept on purpose)
- Pages: **2 (Design, Cover) → 7** (Cover + Prepare/Styles/Atoms/Molecules/Organisms/Specimens)
- Junk frame names: **Frame 1728 → "Legend — Prepare"** (moved to Prepare page)

**Skipped / flagged (for Step 2):**
- **No text styles created.** Brand fonts (Pixform, Akkurat LL Cyrillic, Instrument Serif) may not load in this env; a failed font-load aborts the script. Type ramp is fully captured in `tokens.brand.json` (`font/*`) — codify as React typography in Step 2.
- **`CardMetric` vs `CardMetricAlt` near-duplicate NOT merged** — 4 + 9 live instances; needs a visual-equivalence check + instance repoint before deleting one (DECISIONS D14).
- **`_legacy-styles-demo` (13 vars) not deleted** — still bound by the spacing specimen; export from `tokens` only. Delete once the specimen is rebuilt against `tokens`.
- **Variant property axes** still use default `Property 1=` / `CTA?=` names — cosmetic for export; normalize when wiring React props.
- `wf`/`wireframe` mode left intact (intentional lo-fi theme); React export uses `brand`.


---

# Release Notes — Step 2: Styles (Figma → React token layer, Tailwind v4)

## [Step 2: Styles] — A. /preview scaffold — 2026-06-19
- Stood up Vite + React 19 + TS + Tailwind v4 app with a live `/preview` route (`/` redirects there). Sections present from the start: Fonts, Colors, Typography, Spacing, Radius, Borders, Shadows — each auto-renders from the token registry as tokens land, using real Tailwind utility classes (no inline styles).
- Counts: Figma styles extracted 0 (none exist) → tokens emitted (pending C–E) → utilities exposed (pending E).
- Modes: brand + wireframe toggle wired. Fonts: pending B. Flagged: nothing.

## [Step 2: Styles] — B. Fonts — 2026-06-19
- Registered all local fonts from `./fonts/` via `@font-face` (no CDN): Instrument Serif (Regular+Italic), Akkurat LL (Regular+Bold), Pixform (single). Exposed as `font-instrument` / `font-accurat` / `font-pixform` in `@theme`.
- Added a font-loaded check at the top of `/preview` (`document.fonts.check`) — all three render **✓ loaded**.
- Counts: 5 font files → 3 families → 3 family utilities. Modes: both. Flagged: Akkurat has no Semibold file (see F).

## [Step 2: Styles] — C. Extract — 2026-06-19
- Pulled the full token set via the Plugin API (the `get_variable_defs` dev read only surfaced one mode's bound subset → used FALLBACK full read). Wrote `tokens/_raw.json`.
- Captured: 58 canonical `tokens` vars (brand) + 13 `_legacy-styles-demo` (wireframe+brand, excluded). 0 paint/text/effect/grid styles. No opacity/z-index/breakpoint tokens. Typography line-heights/weights read from the Styles specimen (no such variables exist).
- Counts: 71 variables extracted (58 canonical kept). Modes covered: brand (canonical), wireframe (legacy only). Flagged: no effect/paint/text styles in source.

## [Step 2: Styles] — D. Normalize — 2026-06-19
- Mapped Figma names → Step-1 convention; built two tiers: `primitives` (raw, deduped by value — 21 colors, numeric space/radius/size scales, families, weights) → `semantic` (DS roles → primitives).
- Flagged + assigned: border width (1px, no Figma token), border color (=color/line); `size/base-width` homed as a token. Same-valued color roles (`card/white`, 3× `control/on-color-*`) kept as explicit tokens so the diff is 1:1.
- Counts: 58 Figma roles → 33 color + 9 space + 4 radius + 3 family + 8 size + 1 size-layout, all homed. Flagged: shadows none (0 effect styles).

## [Step 2: Styles] — E. Emit tokens + wire Tailwind v4 — 2026-06-19
- Emitted `tokens/primitives.ts`, `tokens/semantic.ts`, `tokens/index.ts` (typed `as const`, grouped). `styles/tokens.css` holds `:root` (brand) + `[data-theme="wireframe"]` as `--ds-*` vars. `styles/theme.css` maps every token into `@theme` via the CSS vars (no literals) → utilities `bg-*`, `text-*`, `border-*`, `p-*`, `rounded-*`, `font-*`, `text-<preset>`.
- Consumption rule recorded: **Tailwind utilities first; raw CSS vars only where utilities can't express it.**
- Counts: 58 Figma → 60 typed semantic tokens (58 1:1 + surface-card + white) + 56 primitives → **~80 Tailwind utilities** (35 colors ×3 prefixes + 8 spacing + 4 radius + 3 families + 10 type presets). Build passes; CSS grep confirms utilities present. Modes: both wired.

## [Step 2: Styles] — F. Typography — 2026-06-19
- Emitted composable type tokens AND ready-to-use presets: utilities `text-h1/h2/h3/h4/description/grotesk/bold/pixel/caps` (font-size + line-height + weight bundled), plus React components `H1 H2 H3 H4 Body Bold Pixel Description Caps`.
- Counts: 9 ramp levels → 9 utilities + 9 components. Flagged: specimen "Semibold" (H3/H4) → mapped to Bold 700 (no Semibold font file).

## [Step 2: Styles] — G. Verify — 2026-06-19
- `/preview` renders (headless-Chrome screenshot confirmed): font-load check ✓✓✓, all 35 color swatches across 6 groups, full type ramp in the correct custom fonts (Instrument Serif H1/H2, Pixform Description, Akkurat body), spacing scale bars, radius, borders, shadows note — all via Tailwind classes.
- Token diff: Figma 58 canonical → 58 homed 1:1 (+2 ergonomic +2 assigned border). Nothing dropped.
- Mode toggle: `brand` ⇄ `wireframe` confirmed (wireframe collapses fonts→system, surfaces→white). No light/dark in source — documented.
- Build: `tsc -b && vite build` clean; all 5 fonts bundled.

---

# Release Notes — Step 3: Atoms (Figma → React components, Tailwind v4)

## [Step 3: Atoms] — A. Inventory — 2026-06-20
- Read node `2010:24375` (section "Atoms") via get_metadata + get_design_context (Button/Input/Dropdown for exact token bindings) + get_screenshot. Wrote `AUDIT-atoms.md` with the 16-atom variant matrix.
- Counts: **16 Figma atoms** catalogued. Modes: brand (atoms inherit the token theme). Flagged: 3 token gaps (letter-spacing, fixed dimensions, focus ring) — mapped to nearest existing utilities, no new tokens.

## [Step 3: Atoms] — B. Build — 2026-06-20
- Built all 16 atoms in `src/components/atoms/` (one file each, PascalCase, typed, `forwardRef`, cva variants, `cn()` merge): Button, Input, TextArea, Dropdown, Tag, Status, Switch, Flag, Icon, Avatar, AvatarGroup, Bar, Graph, ListItem, ErrorMessage, SwitchGroup.
- Styled **only** with Step-2 DS Tailwind utilities + type presets. Accessibility: real roles (`switch`, `radiogroup`/`radio`, `progressbar`, `alert`, `img`), `aria-*`, keyboard (SwitchGroup arrows, native button/input), visible `focus-visible` outline via `fg` token.
- Counts: 16 atoms → **16 components**; ~40 variant/state combos covered. Token gaps flagged in DECISIONS (S24–S27). Skipped: nothing.

## [Step 3: Atoms] — C. /preview — 2026-06-20
- Added an **Atoms** section to `/preview`: every atom rendered across all variants/states in labeled grids, with interactive state (Switch/Flag/SwitchGroup/Dropdown). Auto-renders alongside the token gallery; theme toggle still applies.
- Counts: 16 atoms live, all variants visible. Modes: brand + wireframe toggle both apply to atoms.

## [Step 3: Atoms] — D. Verify — 2026-06-20
- Visual: headless-Chrome screenshot of `/preview` confirms every atom matches Figma (serif "More info" big CTA, brown onColor Dropdown, segmented yellow SwitchGroup, pink Error, Status dots, Bar lengths, ListItem row).
- **Zero hardcoded values**: grep of `src/components/atoms/` → 0 hex, 0 arbitrary `[..]` bracket utilities. Only 2 inline styles, both data-driven %widths (Bar/Graph) — documented as allowed.
- Count: 16 Figma atoms → 16 components, full variant coverage. Build `tsc -b && vite build` clean (67 modules).
- Token gaps flagged (no new tokens created): letter-spacing → `tracking-widest`; fixed 32/30/5/12px dims → default Tailwind dimensional utilities; focus ring → `outline-fg`.

---

## [Step 3.5: Atom States] — 2026-06-20
- Added interactive states to every applicable atom (Button, Dropdown, Switch, Flag, SwitchGroup, Input, TextArea, ListItem): hover, active, focus-visible, disabled, plus existing checked/selected/error. Centralized in `src/lib/motion.ts`.
- **Transitions** on color/bg/border/opacity/transform via `duration-150 ease-out` (Tailwind defaults — no motion token exists, flagged S32). `prefers-reduced-motion` honored globally (S33).
- `/preview` Atoms section now shows a **forced-states row** (rest/hover/active/focus/disabled) so states are visible without mousing.
- Counts: 8 interactive atoms got full state sets; 8 static atoms unchanged (correct). Gaps flagged: no Figma hover/active variants (states designed), no motion/focus token (Tailwind defaults + `outline-fg`). Build clean, zero hardcodes.

## [Step 4: Molecules] — A. Inventory — 2026-06-20
- Read node `357:35439` via get_metadata + get_design_context (CardMetric, Notification) + get_screenshot. Wrote `AUDIT-molecules.md`.
- Counts: **10 molecules** + variants (Profile ×3, Attempt ×2). Composition mapped to atoms. Flagged: ProjectPreview tag colour (yellow in Figma vs pink Tag atom).

## [Step 4: Molecules] — B. Build — 2026-06-20
- Built all 10 in `src/components/molecules/` (PascalCase, typed, forwardRef, cva where multi-variant), each **composed from existing atoms** (no atom re-implementation): Profile, Node, CampaignPreview, ProjectPreview, ExperiencePreview, Team, CardMetric, CardMetricAlt, Attempt, Notification.
- Tailwind/token-only styling; transitions/states inherited from composed atoms + card hover where relevant. A11y: roles (`status`), semantic headings, keyboard via underlying atoms.
- Counts: 10 Figma molecules → 10 components; 12 variant states covered. Skipped: nothing. Flagged: S39 tag colour.

## [Step 4: Molecules] — C. /preview — 2026-06-20
- Added a **Molecules** section to `/preview`: every molecule + variant in labeled grids, interactive, auto-rendering, theme toggle applies.

## [Step 4: Molecules] — D. Verify — 2026-06-20
- Visual: headless screenshot confirms molecules match Figma (Notification teal card, CampaignPreview "Senior DevOps" metrics, Health card, Team, Attempt rows, Profile variants).
- **Zero hardcoded values**: grep of `src/components/` (atoms + molecules) → 0 hex, 0 arbitrary bracket utilities; only Bar/Graph data-driven % inline styles.
- Counts: 16 atoms (states added) + 10 molecules built, full variant coverage. Build `tsc -b && vite build` clean (26.6 kB CSS).
- Flagged: ProjectPreview tag colour (S39) — only existing Tag variants used, no new token/variant invented.

---

## [Fixes] — 2026-06-20 — states, transitions, indents
- **Bar** rebuilt as the Figma dotted/segmented bar (green dots + light track) — fixes Team productivity + Header stepper. **Button** hovers made visible (per-variant bg shifts) + switched secondary/onColor/small to smaller Pixform caps (`text-caps`) with bigger padding (`px-m`). **Status** → Pixform. **Dropdown** now actually opens (listbox + keyboard + click-outside + animated backdrop-blur overlay). **SwitchGroup** got an animated sliding thumb. **CampaignPreview** indent fixed to `gap-xxl` (90px) with `text-h1` numbers. **Team** spacing → `gap-l`.
- Transitions centralized (`duration-150 ease-out`, no motion token — flagged); `prefers-reduced-motion` honored. Forced + live hover both verified in /preview.

## [Step 5: Organisms] — A. Inventory — 2026-06-20
- Read node `357:35571` via get_metadata + hi-res get_screenshot + design_context. Wrote `AUDIT-organisms.md`. **7 organisms** (TopMenu, SecondRow, Header, MenuSwitch, Kanban, Task, CardTop) + variants.

## [Step 5: Organisms] — B. Build — 2026-06-20
- Built 7 in `src/components/organisms/`, each composed from existing atoms/molecules (no re-implementation). Typed, forwardRef, cva for multi-variant, a11y (nav/tablist/breadcrumb/list roles, keyboard, focus).
- Counts: 7 Figma organisms → 7 components; 11 variant states. Flagged: Kanban card bg override (S50), CardTop decorative circles omitted (S51).

## [Step 5: Organisms] — C. Verify — 2026-06-20
- Visual: headless screenshot confirms organisms match Figma (Header with dotted green stepper + stage labels, Kanban pipeline with Profile cards, Task active/done, CardTop yellow+minimal, TopMenu, SecondRow default/builder).
- **Zero hardcodes** across atoms+molecules+organisms (grep: 0 hex, 0 arbitrary brackets). Inline styles only data-driven (Graph heights, SwitchGroup thumb position). Build clean (90 modules).

## [Preview] — 2026-06-20 — navbar + dividers
- Added a fixed **left navbar** (sections + per-component sub-anchors, scroll-spy active highlight) and **big dividers** (thick rule + eyebrow + huge serif title) between Atoms / Molecules / Organisms. Every organism auto-renders, all variants/states, forced + live, theme toggle applies.

---

## [Rules] — 2026-06-20 — name-mirroring + release-notes-page rules added
- Added two project rules to `claude.md`: (1) **Name mirroring** — Figma names mirror 1:1 to React (components/tokens/frames/routes), minimal transform + logged mapping only when code-invalid; (2) **Release-notes page** — `/preview/release-notes` renders `NOTES.md` and auto-updates on every append, linked from the preview sidebar.

## [CardTop] — 2026-06-20 — variants/sizes/bg/dropdowns done
- Rebuilt `CardTop.tsx` (organisms) mirroring Figma "CardTop" with both variants: **Default** (golden duotone photo bg via mix-blend overlays + TEAMS/access labels + centered serif name + on-color button group + bottom Dropdown action rows + ADD buttons) and **Variant2** (holographic bg + centered name + black small buttons + yellow SwitchGroup). Composes existing Dropdown/Button/SwitchGroup. Bg images bundled in `public/cardtop/`. Width via existing `size/base-width` token (`max-w-base`), height `min-h-120`.
- Counts: 1 component, 2 variants, ~6 states. Token gap flagged: golden `#ffb700` → `super-yellow` (S55). /preview shows both variants live.

## [Pages] — 2026-06-20 — 3 pages built, components reused, indents verified
- Built 3 pages mirroring Figma frame names: **All_teams** (`/pages/all_teams` — Header + CardTop Variant2 + 4 metric cards + 6 Team grid), **Candidate** (`/pages/candidate` — Header + CardTop Default + Notification + Achievements + Personal Development + Reports/Mentoring), **Hiring_campaign** (`/pages/hiring_campaign` — Header + CardTop Default + Task list + 3 stat cells + CampaignPreview + full-width Kanban).
- Strictly composed from existing organisms/molecules/atoms — no new primitives. **Indents matched to Figma**: 830 centered column, section gaps = `space/xxs` (4px), grids `gap-xxs` (screenshot-compared, accurate).
- Counts: 3 pages, ~10 reused components each. Flagged: metric-card + Profile tone overrides (S62/S63), CardTop golden overlay token gap (S55), Variant2 bg simplification (S59).
- Preview sidebar gained a **Pages** section linking all 3 pages + release notes. Build clean (95 modules); zero hardcoded hex/px (only a documenting comment). Dark/wireframe theme toggle still applies.

---

## [Fix Pass] — 2026-06-20
- **01 Header** — now full-bleed (edge-to-edge) and flush at the very top (removed `max-w`/`pt` wrapper, dropped Header rounding/border). "Generate report" button corrected to Figma's **white pill** (`onColor`, Pixform `text-pixel`, `px-s`). Reverted all Button labels to Figma-exact `text-pixel`/`px-s` (S66).
- **02 SwitchGroup** — corner radius fixed to `rounded-md` track / `rounded-sm` segments (not full-pill); font `text-pixel`; **active segment now hugs its label** (removed equal-width thumb); active bg animates (S68).
- **03 CardTop Variant2** — full-size with full-bleed background image; added the missing black **"ADD TEAM"** CTA; SwitchGroup below (S71).
- **04 CardTop Default** — indents fixed (centered name/subtitle/action pills, `gap-xl`); dropdowns rebuilt as **compact chips** via a new `Dropdown size="compact"` variant (S69) arranged in a tidy bottom-left cluster + bottom-right `LEVEL 4` chip + inline ADD — no overlap with action pills (S70).
- Counts: 2 atoms (Button, SwitchGroup, +Dropdown variant), 2 organisms (Header/TopMenu, CardTop), 3 pages touched. Screenshot-compared vs Figma — header/hero/dropdowns match. Zero hardcoded hex/px (build clean). Flagged: golden `#ffb700`→`super-yellow`, brand 23px→`text-h3`.

---

## [Fix Pass 2] — 2026-06-20
- **01 Header** — tightened all header indents ~one token notch (`px-m`→`px-s`, `py-s`→`py-xs`; exact -20% isn't tokenizable, nearest-smaller used — flagged S73). Removed the header **background** (now transparent, no fill/border — S74). **BACK button** now has a **green border** via a new Button `outline` variant (white pill + `border-tech-green`, matches Figma 357:35575 — S72).
- **02 CardTop Variant2** — hero now **flush to the very top** (no indent above) and **100% viewport width** (full-bleed; escapes the `max-w-base` container by rendering at the page root + `max-w-none rounded-none` — S75). Transparent header overlays the hero top. Background image full-bleed; title / subtitle / black ADD TEAM / ALL-ENG-DESIGN SwitchGroup placed per Figma.
- Counts: 1 atom variant added (Button `outline`), 2 organisms touched (Header/TopMenu, used by CardTop overlay), 1 page (All_teams). Screenshot-compared vs 357:58994 / 357:58996 — green BACK border, transparent tighter header, full-bleed flush hero match. Zero hardcoded hex/px (build clean). Flagged: -20% token granularity (S73).

---

## [Fix Pass 3] — 2026-06-20 — CardTop Variant2: square top corners, +~60px above title
- **Square top corners** — removed `rounded-lg` from the hero's background image/overlay layers so the container's `overflow-clip` governs; the full-bleed instance now has square top corners (no radius) while standalone stays rounded (S76).
- **+~60px above the title** — no token exists in 50-60px (scale jumps 30→90), so stacked two existing tokens (`p-xl` 30 + `mt-xl` 30 = 60px, top of range) for the breathing room above the "All teams" title; token-exact, no new token (S77).
- Layout: reverted the transparent-header overlay to a **stacked** header above the full-bleed hero (the overlay made the progress-bar→title gap untokenizable; stacked matches Figma 357:58996). Hero stays full-bleed 100% width + square top corners; SwitchGroup pinned to the bottom (S78).
- Screenshot-compared vs 357:58996 — square top, ~60px above title, full-bleed. Zero hardcoded hex/px (build clean). Flagged: 50-60 token granularity (S77).

---

## [Fix Pass 4] — 2026-06-20 — header now transparent + overlapping CardTop; hero flush to top behind header
- Reworked the All_teams header/hero layering: the **CardTop Variant2 hero now starts at y=0**, full-bleed 100% width, with the **transparent Header floating on top of it** (the holographic image bleeds up behind the logo / nav / BACK / breadcrumb / progress bar). No opaque header band.
- Technique (S79–S81): added a reusable `header` slot to CardTop that renders in the hero's content flow over the absolute bg image (`z-20`), so the header keeps its height and naturally pushes the title down; `-mx-xl -mt-xl self-stretch` make it flush + full-width. Breathing above the title stays ~60px (`gap-xl` + `mt-xl`). BACK green border + −20% tighter header indents preserved.
- Verified: top-left pixel is the hero image (hero reaches y=0); header transparent over the image; cards below unshifted. Zero hardcoded hex/px (build clean). Release-notes page reflects this via `NOTES.md?raw`.
