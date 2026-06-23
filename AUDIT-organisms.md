# Organisms — Inventory & Variant Matrix

**Source node:** `357:35571` ("Organisms"), file `YfjBIii1QpKraZegUif3lY`.
**Read via:** get_metadata + get_screenshot (hi-res) + design_context (productivity ref, CampaignPreview).
**Date:** 2026-06-20

**7 organisms**, each composed from existing atoms + molecules. Zero new tokens.

| # | Organism | Figma variants | Composes | Props | Notes |
|---|---|---|---|---|---|
| 1 | `MenuSwitch` | menu on / off | — (leaf) | `active, children, onClick` | tab toggle; on = boxed `border-line bg-surface-card`, off = plain |
| 2 | `TopMenu` | all / templates / off | Button, MenuSwitch | `brand, activeTab, onTab, onReport` | navbar: brand (serif) + report Button + tabs + Profile/Log out |
| 3 | `SecondRow` | Default / builder | Button | `variant, crumbs[], onBack, onSave, onDeploy` | default = breadcrumb; builder = Save/Deploy actions |
| 4 | `Header` | default | TopMenu, SecondRow, Bar | `brand, crumbs[], stages[], progress` | TopMenu + SecondRow + dotted stage stepper |
| 5 | `Kanban` | (single) | Profile | `title, columns[]` | board: serif column title+count, Profile-short candidate cards |
| 6 | `Task` | Default / Variant2 | Flag, ErrorMessage, Button | `title, error?, done, onFlag, onOpen` | row: flag + title + error + JOB DESCRIPTION button |
| 7 | `CardTop` | Default (yellow) / Variant2 (minimal) | Tag | `variant, name, role, tags[]` | hero banner: serif name + caps role + tag row |

## Composition map (atom/molecule reuse)
- TopMenu → Button + MenuSwitch
- SecondRow → Button
- Header → TopMenu + SecondRow + Bar (dotted stepper)
- Kanban → Profile (short, bg overridden to control)
- Task → Flag + ErrorMessage + Button
- CardTop → Tag

## Token gaps (nearest existing + flagged)
- **backdrop-blur** (Dropdown overlay) and **mix-blend** — Tailwind utilities, no token needed.
- **CardTop decorative circles** (Figma yellow card has blurred circles) → omitted (decorative, not tokenizable); flat `bg-super-yellow` used. Flagged.
- Kanban candidate card bg: Profile `short` is pink in the atom; overridden to `bg-control` via className (no new variant). Flagged.
- Reuses Step-3/4 gaps (letter-spacing → `tracking-widest`, fixed dims → default utilities, focus → `outline-fg`, motion → `duration-150`).
