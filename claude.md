# Project Rules — Course Design System

React + Tailwind v4 (CSS-first `@theme`) design system migrated from Figma
(`YfjBIii1QpKraZegUif3lY`). Source of truth = `tokens/`, `styles/`, and the
component layers `src/components/{atoms,molecules,organisms}`.

## Core rules

1. **Tokens only — zero hardcoded values.** Every color/spacing/radius/border/
   font value comes from an existing token / Tailwind utility backed by the
   `@theme`. No raw hex, no arbitrary `[..px]` brackets. If a value has no token,
   STOP, log the gap in `DECISIONS.md`, use the nearest existing token, flag it
   in `NOTES.md` — never invent a token mid-build.
2. **Compose, don't re-implement.** Molecules compose atoms; organisms compose
   molecules + atoms; pages compose organisms. Import existing components.
3. **Tailwind utilities first**, raw `var(--ds-*)` only where a utility can't
   express it (consumption rule).
4. **Accessibility**: real roles, `aria-*`, keyboard nav, visible focus
   (`outline-fg`), `prefers-reduced-motion` honored.

## NEW — Name mirroring (1:1 Figma ↔ code)

Names of frames / components / tokens / styles in Figma MUST be mirrored 1:1 in
the React design system. Figma `CardTop` → `CardTop.tsx`; Figma token
`color/bg/default` → same token name; Figma frame name → same component / page /
section / route name. **No renaming, no creative aliases.** If a Figma name is
invalid for code, apply the minimal transform (PascalCase / kebab-case) and log
the mapping in `DECISIONS.md`.
- Page routes mirror frame names: `All_teams` → `/pages/all_teams`,
  `Candidate` → `/pages/candidate`, `Hiring_campaign` → `/pages/hiring_campaign`.
- Variant props mirror Figma variant values (e.g. CardTop `property1` =
  `'Default' | 'Variant2'`).

## NEW — Release-notes page

A React release-notes page lives at `/preview/release-notes` (alias
`/release-notes`), rendering `NOTES.md` as a readable changelog. **Every future
build step appends to `NOTES.md` AND the page reflects it** (it imports
`NOTES.md?raw`, so it auto-updates). Keep this page reachable from the `/preview`
left navbar "Pages" section.

## Files maintained every step
- `DECISIONS.md` — every mapping / composition / token-gap / indent call.
- `NOTES.md` — dated entry per build step.
- `AUDIT*.md` — Figma inventories.
