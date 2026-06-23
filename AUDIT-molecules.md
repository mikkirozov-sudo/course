# Molecules — Inventory & Variant Matrix

**Source node:** `357:35439` ("Molecules"), file `YfjBIii1QpKraZegUif3lY`.
**Read via:** get_metadata + get_design_context (CardMetric, Notification) + get_screenshot.
**Date:** 2026-06-20

**10 molecules**, each composed from Step-3 atoms. Token bindings confirmed for CardMetric/Notification; rest mapped from screenshot + atom tokens. Zero new tokens.

| # | Molecule | Figma variants | Composes (atoms) | Props | Key tokens |
|---|---|---|---|---|---|
| 1 | `Profile` | long, short, short-outlined | Avatar (+ Bar on long) | `variant, name, role, avatarSrc?, progress?` | short → `bg-card-pink`; outlined → `bg-surface-card border-line`; `rounded-lg p-s` |
| 2 | `Node` | Default | Icon (play, more) | `title, subtitle` | `bg-oncard-red rounded-lg p-s`; title `font-accurat text-grotesk`; sub caps |
| 3 | `CampaignPreview` | Default | Status, Button | `title, status, metrics[], onMoreInfo` | `bg-surface-card rounded-lg p-xl`; title `font-instrument text-h2`; metric value serif, label caps |
| 4 | `ProjectPreview` | Default | Tag | `title, description, tags[]` | `bg-surface-card rounded-lg p-xl`; tags = `Tag variant="static"` |
| 5 | `ExperiencePreview` | Default | — | `period, title, company, description` | `bg-surface-card rounded-lg p-xl`; period/company caps, body `text-grotesk` |
| 6 | `Team` | Default | Bar, AvatarGroup | `name, count, productivity, highlight, avatars[]` | `bg-surface-card rounded-lg p-xl`; Bar = productivity |
| 7 | `CardMetric` | Default | Graph | `title, data[], label` | `bg-card-green rounded-lg p-xl gap-l`; title `font-accurat text-h3` |
| 8 | `CardMetricAlt` | Default | — | `title, value, label` | `bg-surface-card rounded-lg p-xl`; value `font-instrument text-h1` |
| 9 | `Attempt` | Default, Variant2 | Status | `title, left, right, status?` | row card; amounts `font-instrument text-h2`; labels caps; Status failed |
| 10 | `Notification` | Default (+showBtn) | Button | `message, action?` | `bg-card-green rounded-lg p-xl`; text `font-pixform text-description text-fg-teal` |

## Confirmed token bindings (design_context)
- **CardMetric** — `bg-card-green` · `p-xl` · `gap-l` · `rounded-lg` · title `font-accurat text-h3 text-fg` · Graph bars `bg-surface-base` (mix-blend-multiply) `rounded-sm` gap-xxxs · label `font-pixform text-pixel uppercase`.
- **Notification** — `bg-card-green` · `p-xl` · `gap-s` · `rounded-lg` · text `font-pixform text-description uppercase text-fg-teal` · optional Button `onColor`.

## Token gaps (nearest existing + flagged)
- **mix-blend-multiply** on CardMetric graph bars → use `mix-blend-multiply` (a Tailwind utility, no token needed) to keep bars readable over card-green.
- **Negative letter-spacing** on serif titles/numbers (-0.4/-0.9px) → no token → default tracking (omit). Flagged.
- Reuses the Step-3 gaps (letter-spacing → `tracking-widest`, fixed dims → default utilities, focus → `outline-fg`).
