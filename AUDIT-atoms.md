# Atoms — Inventory & Variant Matrix

**Source node:** `2010:24375` → section `357:33706` ("Atoms"), file `YfjBIii1QpKraZegUif3lY`.
**Read via:** get_metadata + get_design_context (Button, Input, Dropdown) + get_screenshot.
**Date:** 2026-06-20

**16 atoms.** Token bindings confirmed from `get_design_context` (exact `--color/* --space/* --radius/* --font/*` vars) for Button/Input/Dropdown; remaining mapped from the palette + screenshot. Every value maps to a Step-2 token — **zero new tokens**.

| # | Atom (Figma) | Component | Figma variants | React props | States |
|---|---|---|---|---|---|
| 1 | Button | `Button` | cta? × type {secondary, On color, small, big, node} | `variant: secondary\|onColor\|small\|big\|node` | hover, focus-visible, disabled |
| 2 | Input | `Input` | head?, Default | `label?, value, placeholder, invalid?, disabled` | default, focus, disabled, error |
| 3 | TextArea | `TextArea` | Default | `label?, placeholder, invalid?, disabled, rows` | default, focus, disabled, error |
| 4 | Dropdown | `Dropdown` | Property1 {default, On color} × filled {on, off} | `variant: default\|onColor`, `filled, label?, value, placeholder, disabled` | filled, empty (placeholder), disabled, focus |
| 5 | Tag | `Tag` | Property1 {control, static} | `variant: control\|static` | — |
| 6 | Status | `Status` | Property1 {purple, green, red, stopped} | `intent: purple\|green\|red\|stopped`, `label` | — |
| 7 | Switch | `Switch` | switch {on, off} × size {big, small} | `checked, onCheckedChange, size: big\|small, disabled` | on, off, disabled, focus |
| 8 | Flag | `Flag` | Property1 {no, yes} | `pressed, onPressedChange, disabled` | yes (filled), no (outline), focus |
| 9 | Icon | `Icon` | Property1 {play, user, more, arrow-down, close} | `name: play\|user\|more\|arrow-down\|close`, `size?` | — |
| 10 | Avatar | `Avatar` | Property1 {katya, dog, petya} (demo content) | `src?, alt, fallback?, size: sm\|md` | image, fallback |
| 11 | AvatarGroup | `AvatarGroup` | Default | `avatars[], max?, size` | overflow (+N) |
| 12 | Bar | `Bar` | Property1 {Default, big} × length {75%, 20%} | `value (0-100), size: default\|big` | — |
| 13 | Graph | `Graph` | Default | `data: number[]` | — |
| 14 | List | `ListItem` | Default | `title, meta[], action?` | hover |
| 15 | Error | `Error` | Default | `children` | role=alert |
| 16 | SwitchGroup | `SwitchGroup` | Default | `options[], value, onChange` | active segment, focus |

## Confirmed token bindings (from design_context)

**Button**
- secondary → `bg-control` (control/secondary-default) · `text-fg` · `rounded-full` · `px-s py-xs` · label `font-pixform text-pixel uppercase`
- onColor → `bg-control-on-white` · `text-fg`
- small (cta) → `bg-black` · text `text-surface-base` (bg/base #f2f2f2)
- big (cta) → `bg-black` · `rounded-full` · `pt-s pb-m px-s` · text `font-instrument text-h2 text-surface-base`
- node → `bg-oncard-red` · `rounded-sm` · `p-s` · flex-col `gap-xs` · name `font-accurat text-grotesk text-fg` + sub `font-pixform text-pixel uppercase`

**Input** — label `font-accurat text-caps uppercase text-fg`; field `bg-control rounded-sm px-s py-xs h-8`; value `font-pixform text-pixel uppercase text-fg`.

**Dropdown** — `default`: `bg-control`, label `text-fg`, placeholder `text-fg-muted`; `onColor`: `bg-fg-brown`, label `text-fg-brown`, value `text-fg-on-color`; unfilled `opacity-50`; both `rounded-sm px-s py-xs`, chevron = `Icon name="arrow-down"` (16px).

## Token gaps (no token home → nearest existing + flagged)
- **Letter-spacing**: Figma labels use 1.6px / values 2px tracking. No letter-spacing token exists. → use `tracking-widest` (nearest existing utility). Flagged.
- **Fixed control height 32px / avatar 30px / bar 5–12px**: no DS spacing token equals these. → use default Tailwind dimensional utilities (`h-8`=32px, `size-8`, `h-1`/`h-3`). These are existing Tailwind utilities, not arbitrary bracket values. Flagged as "dimension from default scale, not DS token".
- **Focus ring**: no focus/ring token in DS. → `focus-visible:outline-2 focus-visible:outline-fg` (existing color token `fg`). Flagged.
- **Progress/segment dynamic width %**: data-driven, not a design value → inline `style={{width}}` (allowed: data, not a token).
