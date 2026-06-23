# Design System Cleanup — Decisions Log

Every call logged with a one-line rationale. Convention locked once (Task D) and not deviated from.

## Locked naming convention (Task D)

**Tokens (Figma variables):** lowercase, `/`-delimited path `category/role/scale`, multi-word segments in `kebab-case`.
- Colors: `color/<group>/<role>` → `color/text/primary`, `color/bg/card/red`, `color/bar/on-base-empty`
- Spacing: `space/<scale>` → `space/xs`, `space/m` (t-shirt scale kept; numeric values live in the value map)
- Radius: `radius/<scale>` → `radius/s`, `radius/full` (unifies the old `rounds/*` + `radius/*`)
- Typography: `font/family/<role>`, `font/size/<role>` → `font/family/grotesk`, `font/size/h1`
- Size: `size/<role>` → `size/base-width`
- **Rationale:** Figma `/` paths export cleanly to nested React token objects (`color.text.primary`); lowercase + kebab avoids the casing-collision class entirely; t-shirt scale preserved because the components already reference these names by ID (rename is non-destructive).

**Modes:** `wf` → `wireframe`, `ds` → `brand`. **`brand` is the canonical/default theme for React export.**
- **Rationale:** "wf/ds" are opaque; `wireframe`/`brand` state intent. `brand` holds the real values.

**Collections:** master set → `tokens`. Redundant sets renamed to mark them deprecated rather than deleted in place (can't move variables between collections via the Plugin API without recreate+repoint, which is risky against 1077 instances).

**Styles:** mirror the token path when styles are introduced. None exist today (0 paint/text/effect). Text-style creation is **flagged, not forced**, because the brand fonts (Pixform, Akkurat LL Cyrillic, Instrument Serif) may not be loadable in this environment and a failed font-load would abort the script. Recorded as a Step-2 follow-up.

**Components:** `PascalCase`, atomic grouping by page (Atoms / Molecules / Organisms). Variant property axes use semantic names (`Type=`, `State=`, `Size=`) not `Property 1=`.

---

## Decisions

- **D1** — Keep the dual `wf`/`brand` mode setup rather than collapsing to one. Rationale: it's an intentional wireframe-vs-brand theme; collapsing would lose the wireframe variant. Export picks `brand`.
- **D2** — Rename, do not recreate, all variables. Rationale: bindings are by ID, so renaming is 100% reference-safe against the 1077 instances; recreating would orphan every binding.
- **D3** — Collection #1 (58, live) → renamed `tokens` and fully normalized. Rationale: it's the real, referenced source of truth.
- **D4** — Collection #2 (1 orphan `font/family/Antiqa`) → delete variable; delete collection if it empties. Rationale: confirmed zero references → pure cruft.
- **D5** — Collection #3 (21, duplicate/demo) → renamed `_legacy-styles-demo`, NOT deleted. Rationale: some of its vars are bound by the `styles` specimen page's `indents` component; deleting would break the specimen. Marked deprecated so Step 2 exports from `tokens` only. 7 of its font-size vars are orphans and flagged for later deletion.
- **D6** — `indents/X` (30) and `indents/XL` (30) collapse to one name `space/xl`. Rationale: identical value, redundant name. `indents/X` (in #1) becomes `space/xl`; #3's `indents/XL` stays in the deprecated collection.
- **D7** — `rounds/Over` (999) → `radius/full`. Rationale: 999 = pill/fully-rounded; `full` is the conventional token name.
- **D8** — `color/black`, `color/gray`, `color/super-yellow` kept as raw-name tokens (lowercased only). Rationale: they ARE used as literal palette anchors; re-roling them risks breaking intent without design input. Casing normalized only.
- **D9** — Typos fixed in token names: `emty→empty`, `cads→card`, `base with→base-width`. Rationale: correctness; names become predictable for export.
- **D10** — `Background/On cads/*` → `color/bg/on-card/*` and `Background/Cards/*` → `color/bg/card/*`. Rationale: disambiguates the two background families with a clean, typo-free path.
- **D11** — Component sets renamed to PascalCase with typo fixes: `btn→Button`, `canban→Kanban`, `attemt→Attempt`, `card metric→CardMetric`, `Cards metrica→CardMetricAlt` (near-dup kept, flagged for merge), `text_area→TextArea`, `switch group→SwitchGroup`, `menu_switch→MenuSwitch`, `second-row→SecondRow`, `card top→CardTop`, `topmenu→TopMenu`, etc. Rationale: PascalCase maps 1:1 to React component names.
- **D12** — Sections reorganized into real pages: `Styles`, `Atoms`, `Molecules`, `Organisms`, `Specimens` (the `design` mockups), plus existing `Cover`. Rationale: separates DS primitives from product mockups; matches the requested Prepare/Styles/Atoms/Molecules/Organisms structure.
- **D13** — Stray `Frame 1728` (legend) renamed `Legend — Prepare` and moved to a `Prepare` page. Rationale: removes junk name, gives the Prepare step a home.
- **D14** — `card metric` / `Cards metrica` near-duplicate: NOT auto-merged. Rationale: 4 + 9 live instances respectively; merging requires confirming they're visually identical and repointing 13 instances — deferred to a reviewed step, flagged in NOTES.
- **D15** — Fallback JSON export (`tokens.brand.json`) produced as the canonical, de-duplicated, React-ready token source. Rationale: the explicit fallback for cross-collection dedupe that the Plugin API can't do safely in place; gives Step 2 a single clean file regardless of the in-Figma collection split.

---

# Step 2: Styles — React Token Layer (Tailwind v4)

Convention from Step 1 reused: `category/role/scale`, lowercase, kebab-case.

- **S1** — Stack: Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`, CSS-first `@theme`, no `tailwind.config.js`). No Next present → fonts via `@font-face`, not `next/font`. Rationale: `.gitignore` already targeted Vite; CSS-first @theme is the requested config style.
- **S2** — Routing: `react-router-dom`, `/` → redirect to `/preview`. Rationale: task wants a dedicated `/preview` route.
- **S3** — Extraction path: `get_variable_defs` returned only one mode's bound subset, so used the Plugin API full variable read (FALLBACK clause). Wrote `tokens/_raw.json`. Rationale: completeness over the limited dev-mode read.
- **S4** — Canonical set = `tokens` collection (58 vars, single `brand` mode). `_legacy-styles-demo` (13 vars, wireframe+brand) excluded from emit. Rationale: it's the deprecated demo set from Step 1; brand is the real theme.
- **S5** — Modes: the file has **no light/dark**. `:root` = brand. Added `[data-theme="wireframe"]` reconstructed from Figma's `wf` mode (fonts→system, surfaces→white) so the mode toggle is real and demonstrable. Rationale: honors "capture every mode" with the actual modes the file ships.
- **S6** — Two-tier: `primitives.ts` (raw, deduped by value) → `semantic.ts` (DS roles → primitives). CSS mirrors it: `--ds-color-<primitive>` then `--ds-color-<role>: var(--ds-color-<primitive>)`. Rationale: single source of truth, themeable at the primitive layer.
- **S7** — Font family names: antiqa→`font-instrument` (Instrument Serif), grotesk→`font-accurat` (Akkurat LL), pixel→`font-pixform` (Pixform). Rationale: ergonomic Tailwind family utilities matching the local files.
- **S8** — Tailwind color utility names are **ergonomic** (`fg`, `surface-card`, `card-red`, `tech-purple`) instead of the raw DS path (`bg/card/red`) to avoid double-prefix utilities (`bg-bg-card-red`). The DS-role→utility map is the comment on each `semantic.ts` entry. Rationale: clean `bg-*`/`text-*`/`border-*` ergonomics.
- **S9** — `@theme` resets `--color-*`, `--font-*`, `--text-*` to `initial`, then defines DS-only tokens (all as `var(--ds-*)`, no literals). Spacing/radius default scales kept as an escape hatch; DS t-shirt spacing is canonical. Rationale: tokens are the single source for color/type/family; never hardcode in @theme.
- **S10** — Typography presets bundled via Tailwind v4 `--text-<name>` + `--text-<name>--line-height` + `--text-<name>--font-weight`, producing single utilities `text-h1…text-caps`. Plus React components `H1/H2/H3/H4/Body/Bold/Pixel/Description/Caps`. Rationale: Atoms drop in one class or one component.
- **S11** — "Semibold" (H3/H4 in the specimen) mapped to **700 (Bold)**. Rationale: only Regular(400)+Bold(700) Akkurat files exist locally — no Semibold file; avoid faux-weight ambiguity by using the real available weight.
- **S12** — Line-heights/weights read from the **Styles specimen frame** (no line-height/weight variables exist in Figma). Recorded in `_raw.json.typographySpecimen`. Rationale: only available source for the type ramp's vertical metrics.
- **S13** — Border tokens **assigned** (no Figma source): `border/width-default = 1px`, `border/color-default = color/line`. Rationale: no border-width token existed; 1px is the implicit DS default. (Flagged value with no token home → assigned.)
- **S14** — Shadows/effects: **none emitted** — 0 effect styles in Figma. `/preview` Shadows section states this; no shadows invented. Rationale: don't fabricate brand tokens.
- **S15** — Opacity / z-index / breakpoints: none in source → not emitted. Rationale: nothing to extract.
- **S16** — Same-valued color roles (`card/white`, `control/on-color-white/brown/yellow-dark`) given explicit semantic tokens (not folded away) so the Figma↔token diff is 1:1. Rationale: "nothing dropped" — every one of the 58 has a home.
- **S17** — `size/base-width` (830px) kept as a token (`semantic.size`); no dedicated utility — consumed via `max-w-[var(--ds-size-base-width)]`. Rationale: one-off layout constant; consumption rule allows raw var where a utility doesn't fit.
- **S18** — Preview auto-render with **literal** Tailwind class strings stored in the token registry (`index.ts`) so the scanner emits them and there are no dynamic/un-scannable class names; `@source '../tokens'` added. Rationale: "real Tailwind classes, not inline styles" + live auto-render.
- **S19 (Consumption rule)** — **Tailwind utilities first; raw CSS vars (`var(--ds-*)`) only where utilities can't express it.** Exported as `CONSUMPTION_RULE`.

---

# Step 3: Atoms — React Components

- **S20 (variant engine)** — `class-variance-authority` (cva) for all multi-variant atoms (Button, Dropdown, Tag), `cn()` = `clsx` + `tailwind-merge` for conditional/merge logic. Rationale: typed `VariantProps`, standard, composes with the token utilities; consistent across every atom.
- **S21** — One file per atom in `src/components/atoms/`, PascalCase, `forwardRef` on every interactive/DOM-leaf atom, typed props with `as const` unions for variants. Barrel `index.ts`. Rationale: matches Figma PascalCase + clean Step-4 imports.
- **S22** — Figma `cta?` + `type` (Button) collapsed to one `variant` union `secondary|onColor|small|big|node`. Rationale: a single ergonomic prop beats a 2-axis boolean×enum for React consumers; covers all 5 Figma variants 1:1.
- **S23** — Avatar/AvatarGroup take `src`/`fallback` props (Figma's katya/dog/petya are demo content, not real variants). Rationale: atoms must be content-agnostic.
- **S24 (token gap — letter-spacing)** — Figma label tracking 1.6px / value 2px has **no token**. → used `tracking-widest` (nearest existing utility) everywhere caps text appears. Flagged; no token invented.
- **S25 (token gap — fixed dimensions)** — control height 32px, avatar 30px, bar 5/12px, switch track have **no DS spacing token**. → used default Tailwind dimensional utilities (`h-8`, `size-8`, `h-1`/`h-3`, `w-14`) — existing utilities, never arbitrary `[..px]`. Flagged as "default-scale dimension, not DS token".
- **S26 (token gap — focus ring)** — no focus/ring token. → `focus-visible:outline-2 focus-visible:outline-fg` using the existing `fg` color token. Flagged.
- **S27 (allowed inline style)** — Bar fill width % and Graph bar heights % are **data-driven** (props), not design values → `style={{width/height}}`. Rationale: utilities can't express arbitrary data %, and the consumption rule permits raw where utilities can't; all colors/radii/spacing still tokens.
- **S28** — Dropdown "On color" → `bg-fg-brown` (Figma bound `color/text/brown`); empty state `opacity-50` + placeholder `text-fg-muted`. Chevron = `Icon name="arrow-down"`. Rationale: exact `get_design_context` bindings.
- **S29** — Icons drawn as inline 16px SVG (`currentColor`) since the Figma icons are vector glyphs with no exported assets needed; color driven by DS `text-*` utilities. Rationale: zero asset deps, themeable.
- **S30** — All caps text uses the type presets `font-pixform text-pixel` (values/buttons) and `font-accurat text-caps` (labels) from Step 2 — never re-derived sizes. Rationale: HARD RULE — type from presets only.

---

# Step 3.5: Atom States  &  Step 4: Molecules

## Atom states (Part 1)
- **S31 (no Figma state variants → designed states)** — Figma atom component sets define only structural variants (type/size/on-off), **no hover/active/focus variants**. States added by judgment using existing tokens, centralized in `src/lib/motion.ts` (`TRANSITION`, `FOCUS`, `PRESS`, `DISABLED`). Rationale: states are required for usable React atoms; logged as a Figma gap, not invented tokens.
- **S32 (no motion token → Tailwind defaults)** — DS has no duration/easing token. → `duration-150 ease-out` (Tailwind defaults) on `transition-[color,background-color,border-color,opacity,box-shadow,transform]`. Flagged; no motion token created.
- **S33** — `prefers-reduced-motion: reduce` honored globally in `styles/index.css` (cuts transition/animation durations). Rationale: accessibility, one rule covers all.
- **S34** — Interaction pattern: hover `opacity-90` (or `bg-gray` on inputs), active `scale-95 + opacity-80`, focus `outline-fg`, disabled `opacity-50`. Applied to Button/Dropdown/Switch/Flag/SwitchGroup/Input/TextArea/ListItem. Static atoms (Tag/Status/Avatar/Icon/Bar/Graph/Error) get no interactive state. Rationale: token-only, consistent, matches the flat DS language.
- **S35 (forced-state preview)** — `/preview` shows a "forced states" row applying the hover/active/focus classes statically so states are visible without a mouse. Rationale: requested reviewability.

## Molecules (Part 2)
- **S36 (composition)** — Molecules import and assemble Step-3 atoms; never re-implement atom internals (Profile→Avatar+Bar, CampaignPreview→Status+Button, Team→Bar+AvatarGroup, CardMetric→Graph, ProjectPreview→Tag, Attempt→Status, Notification→Button via `action` slot). Rationale: single source of truth for atoms.
- **S37** — One file per molecule, PascalCase, `forwardRef`, cva for multi-variant (Profile, Attempt). Variant→prop mapping 1:1 with Figma. Rationale: consistent with atoms (S20–S21).
- **S38 (identity resolved via design_context)** — CardMetric = "Health" (bg-card-green + Graph); Notification = mint teal-text card; CampaignPreview = "Senior DevOps" metrics card. Rationale: metadata names were ambiguous; design_context disambiguated.
- **S39 (token gap — ProjectPreview tag colour)** — Figma renders project tags yellow, but the only Tag variants are `control` (gray) / `static` (pink). Used `Tag variant="static"` (existing) rather than add a yellow variant/token. Flagged; visual discrepancy accepted to honor "no new tokens/variants here".
- **S40** — `mix-blend-multiply` used for CardMetric graph bars over the green surface (a Tailwind utility, no token). CardMetric overrides the Graph atom's panel via `[&>div]` child selectors rather than forking the atom. Rationale: reuse the atom, restyle compositionally.

---

# Fixes + Step 5: Organisms + Preview Overhaul

## Part 1 — State/transition fixes
- **S41 (Bar rebuilt — dotted)** — Bar atom was a solid fill; Figma Bar (357:33707) / productivity ref (357:35512) is a **segmented dotted bar** (5px rounded dots, 2px gaps, filled `text/green`, track `bg/on-card/green`). Rebuilt as dots; the white 3rd tone in the 1398px instance was decorative padding → 2-tone (green/oncard-green). Flagged.
- **S42 (Button hover visible)** — generic `hover:opacity-90` was too subtle. Replaced with per-variant hovers: secondary/onColor → `hover:bg-gray`/`hover:bg-control`; black/node → `hover:opacity-80/90`. Live + forced both verified.
- **S43 (Button sizing)** — secondary/onColor/small switched to `text-caps` (8px, smaller) + `px-m` (bigger horizontal padding), font-pixform kept. Per instruction (deviates from Figma's 10px/px-s on purpose).
- **S44 (Status font)** — `font-accurat text-caps` → `font-pixform text-pixel` to match Figma (Pixform 10px).
- **S45 (Dropdown functional)** — was a static trigger; rebuilt as a real listbox: open/close, options, click-outside + Esc, Arrow/Enter keyboard, chevron rotate, and an **animated blurred shade overlay** (`bg-fg/5 backdrop-blur-sm`, fade) — backdrop-blur is a Tailwind utility (no token).
- **S46 (SwitchGroup animated)** — added an absolute **sliding `surface-card` thumb** (transition-transform, position via data-driven `translateX(index*100%)`) gliding between segments.
- **S47 (CampaignPreview indent)** — header→metrics gap was `gap-l` (wrong); Figma spec = **`gap-xxl` (90px)**; numbers corrected to **`text-h1` (84px)** Instrument, labels `text-caps` in justify-between flex-1 columns (exact 357:35472).
- **S48 (Team spacing)** — outer block spacing `gap-s` → `gap-l` to match Figma; productivity bar now the dotted Bar.

## Part 2 — Organisms
- **S49 (composition)** — organisms assemble existing atoms/molecules only: TopMenu→Button+MenuSwitch, SecondRow→Button, Header→TopMenu+SecondRow+Bar, Kanban→Profile, Task→Flag+ErrorMessage+Button, CardTop→Tag.
- **S50 (Kanban card bg)** — candidate cards = Profile `short` with `bg-control` override (Figma cards are gray, not the pink atom default); no new variant. Flagged.
- **S51 (CardTop decoration)** — Figma yellow hero has blurred decorative circles → omitted (not tokenizable); flat `bg-super-yellow`. Flagged.
- **S52 (Header stepper)** — pipeline stepper = dotted Bar (segments = stages×8) + caps stage labels in justify-between flex-1 columns.

## Part 3 — Preview overhaul
- **S53 (left navbar)** — fixed `w-56` sidebar lists all sections + per-component sub-anchors (shown when the group is active); scroll-spy via `IntersectionObserver` (rootMargin bottom -70%) highlights the active section; `scroll-mt-l` on anchors for offset.
- **S54 (big dividers)** — `BigDivider` between layers: `border-t-4 border-fg` thick rule + caps eyebrow + `text-h1` serif title (Atoms/Molecules/Organisms). Inline section h2s removed to avoid duplication.

---

# CardTop + Pages + Release Notes

## Project rules added
- **R1 (name mirroring)** — Figma names mirror 1:1 to code (components/tokens/frames/routes). Minimal transform + logged mapping only when a name is code-invalid. Added to `claude.md`.
- **R2 (release-notes page)** — `/preview/release-notes` (alias `/release-notes`) renders `NOTES.md?raw`; auto-reflects every append. Added to `claude.md` + linked from the preview sidebar "Pages" section.

## CardTop (mirrors Figma "CardTop" 357:35684)
- **S55 (token gap — golden overlay)** — Figma Default bg uses a `#ffb700` hard-light tint over the photo. No token for #ffb700 → used `bg-super-yellow` (nearest) with `mix-blend-hard-light` + `bg-black mix-blend-color`. Flagged.
- **S56** — variants mirror Figma `property1`: `'Default' | 'Variant2'` (exact values, name-mirroring R1). Default = golden duotone photo + dropdown action rows; Variant2 = holographic bg + black actions + SwitchGroup.
- **S57** — composes existing `Dropdown` (onColor), `Button`, `SwitchGroup` — no re-implementation. Background image passed via `image` prop (demo photos bundled in `public/cardtop/`).
- **S58 (card width)** — exposed the EXISTING `size/base-width` token as a Tailwind `--container-base` → `max-w-base` utility (not a new token); height `min-h-120` (480px, default scale). Fixed sub-widths (754/310/175px) → `max-w-3xl` / `w-3/5` / `w-2/5` to avoid hardcoded px.
- **S59** — Variant2 holographic bg approximated with image + `bg-gradient-to-b from-transparent to-surface-base` (Figma's multi-layer blur/gradient simplified). Flagged.

## Pages (mirror Figma frame names)
- **S60** — `All_teams` → `/pages/all_teams`, `Candidate` → `/pages/candidate`, `Hiring_campaign` → `/pages/hiring_campaign` (R1). Built strictly from existing organisms/molecules/atoms.
- **S61 (indents)** — Figma `Frame 1356` content column = `max-w-base` (830) centered; **section gaps = `space/xxs` (4px)** → `gap-xxs` throughout; metric grid `grid-cols-4 gap-xxs`, Team grid `grid-cols-2 gap-xxs`, page-3 stats `grid-cols-3` with `border-l border-line` dividers. Matches Figma 4px offsets (screenshot-verified).
- **S62 (metric card tones)** — page-1 cards (Health/Productivity/Distribution/Hiring) = `CardMetric` with `bg-card-{pink,green,violet,yellow}` override via className (no new variant). Flagged.
- **S63 (Profile tones)** — Reports-to/Mentoring `Profile variant="short"` bg overridden per person (`bg-card-{pink,green,violet}`) via className. Flagged.
- **S64** — Kanban placed full-width outside the `max-w-base` column on Hiring_campaign (mirrors Figma 1440-wide instance).

## Release-notes page
- **S65** — minimal inline markdown renderer (h1–h3, `-` lists, `**bold**`, `` `code` ``, `---` rules) styled with DS typography tokens; `*.md?raw` typed via `src/vite-env.d.ts`.

---

# Fix Pass — Header / SwitchGroup / CardTop

- **S66 (Button → Figma-exact)** — reverted Button secondary/onColor/small from `text-caps`/`px-m` (an earlier deviation) back to Figma's `text-pixel` (10px) + `px-s` (14). The header "Generate report" is a **white pill** (`onColor` = bar-empty/control-on-white), confirmed via Header design_context (357:35593). Matches Figma everywhere.
- **S67 (Header full-bleed)** — Header dropped `rounded-lg`/`border`/side-padding → full-width `bg-surface-card`, flush top (pages render `<Header>` directly, no `max-w`/`pt` wrapper). Children pad themselves (`TopMenu px-m`, `SecondRow px-m`, stepper `px-m`). TopMenu restructured to `justify-between`, brand+nav grouped with `gap-xxl` (Figma), `px-m py-s`.
- **S68 (SwitchGroup → Figma-exact)** — track `rounded-md` (8px, was full-pill) + `p-xxs`; segments `h-8 px-s rounded-sm` that **hug their own label** (removed the equal-width flex-1 + absolute sliding thumb); active = `bg-surface-card`, animated via `transition-colors`. Font `text-pixel` (10px). Per design_context 357:35421.
- **S69 (Dropdown `size` variant)** — added `size: 'default' | 'compact'` (no fork). `compact` = `inline w-auto` chip that hugs its label (`h-8 w-auto justify-center gap-xxs`), for CardTop's dropdown clusters. Logged per the "add a variant, don't fork" instruction.
- **S70 (CardTop Default rebuild)** — fixed `h-120` (480); centered identity block (name `text-h1` + role `text-description` + action pills) absolutely centered with `gap-xl`; bottom clusters use **compact dropdown chips** (`Dropdown size="compact" variant="onColor"`) wrapped in a `w-1/2` left cluster + right `LEVEL 4` chip + inline ADD pills — no longer full-width rows, no overlap with the action pills.
- **S71 (CardTop Variant2 fixes)** — full-bleed bg image (`absolute inset-0 size-full object-cover`), fixed `h-120`; added the black **"Add team"** CTA (`actions` → `small`/black Button) on All_teams; yellow SwitchGroup below. Container `items-center justify-center gap-xl`.
- Token gaps unchanged: golden overlay `#ffb700` → `super-yellow` (S55); brand 23px → `text-h3` (20, nearest; flagged). prefers-reduced-motion honored; all state changes transition.

---

# Fix Pass 2 — Header / CardTop Variant2

- **S72 (Button `outline` variant)** — added a green-stroke pill variant (`border border-tech-green` over `bg-control-on-white`, Pixform `text-pixel`) mirroring Figma's BACK button (357:35575, `color/text/green` stroke). SecondRow's BACK now uses it. Added not forked (per instruction), logged.
- **S73 (header -20% indents, token-granularity gap)** — tightened header padding by stepping one token notch: `px-m`→`px-s` (20→14) and `py-s`→`py-xs` (14→8) across TopMenu / SecondRow / stepper. Exact 80% (16px/11px) has no token → used nearest-smaller existing tokens, flagged. Proportions kept.
- **S74 (header no background)** — removed `bg-surface-card` from Header and the `border-b` divider from TopMenu → fully transparent header (Figma TopMenu has no fill; border is white/invisible).
- **S75 (CardTop Variant2 full-bleed + flush)** — on All_teams the hero now renders OUTSIDE the `max-w-base` content column at the page root (no container constraint) with `className="max-w-none rounded-none"` → 100% viewport width, flush to the very top (no top indent). The transparent Header is overlaid via `absolute inset-x-0 top-0 z-20` so it floats over the hero. Full-bleed technique = render at root (root has no max-w) + override the component's own `max-w-base`/`rounded-lg`.

---

# Fix Pass 3 — CardTop Variant2 polish

- **S76 (square top corners)** — the visible top-corner radius came from the bg image + overlay children carrying `rounded-lg`. Removed `rounded-lg` from those children; the container's `overflow-clip` now clips them to the container's own shape — so the full-bleed instance (`rounded-none` on All_teams) renders **square corners**, while the standalone/in-column instance still rounds. No per-corner hardcoding.
- **S77 (≈50-60px above title, token-granularity gap)** — the spacing scale jumps 30→90 with nothing in 50-60. Achieved the requested breathing room **token-exactly** by stacking two existing tokens: the wrap's `p-xl` (30 top) + the title block's `mt-xl` (30) = **60px** above the title (top of the requested range). Logged; no new token.
- **S78 (header stacked, not overlaid)** — the fix-pass-2 transparent-header *overlay* made "50-60px between the progress bar and the title" impossible to hit cleanly (header ≈90px tall vs the 30→90 token gap). Reverted to the header **stacked above** the full-bleed hero (matches Figma 357:58996, where the CardTop sits below the header with ~60px above its title). Hero stays **full-bleed 100% width** with **square top corners**; header remains transparent/no-bg + tightened (S73/S74).

---

# Fix Pass 4 — Header overlays CardTop (transparent float)

- **S79 (header slot on CardTop)** — added an optional `header?: ReactNode` slot to CardTop. It renders in the hero's CONTENT FLOW over the absolute bg image (`z-20`), so the header floats on the hero and naturally pushes the title down — no magic header-height offset needed and fully reusable (standalone CardTop omits it).
- **S80 (overlay layering)** — chose the **flow-over-absolute-image** technique (image `absolute inset-0` at the back; header + content in a relative flow layer on top) over absolute-positioning the header. Rationale: the header keeps its intrinsic height and the breathing gap (`gap-xl` + content `mt-xl` = ~60px) stays token-exact regardless of header height; z-order: bg image (z-0) < hero content (z-10) < header (z-20).
- **S81 (full-bleed header)** — the header wrapper uses `-mx-xl -mt-xl` to cancel the hero's `p-xl` padding (so it's flush to the hero's top/side edges) + `self-stretch` to override the wrap's `items-center` and span full width.
- **S82 (All_teams overlay)** — All_teams now passes `header={<Header activeTab="all" />}` into the Variant2 CardTop and drops the separate stacked Header. Hero is flush to y=0, full-bleed 100% width, image visible behind the transparent header. Content below (Health/Productivity/… cards) unchanged. BACK green border + tightened header indents preserved.
