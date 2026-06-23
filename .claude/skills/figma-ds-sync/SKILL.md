---
name: figma-ds-sync
description: Sync the Figma design system into the React DS docs + release notes. Detects what was changed by hand in Figma (new/removed/renamed components, changed variants/states, edited descriptions, token/text-style changes) by diffing the live Figma file against .ds-snapshot.json, then updates Figma component descriptions, appends a release-notes entry to BOTH release-notes.json and the Figma "Release Notes" page, and rewrites the snapshot. Trigger on "sync figma", "check figma for changes", or "update release notes from figma".
---

# figma-ds-sync

Keeps three things in agreement: the **Figma** design system, the React DS docs,
and the **release notes** (React `release-notes.json` + the Figma "Release Notes"
page). You are the bridge: you read Figma over MCP, a deterministic Node script
(`sync.mjs`) does the diff/snapshot/release-note logic, and you push the results
back into Figma.

**Figma file:** `5pa9lxNDLuxAdBogkHeON2`, design system on the page named `ds`.
**Project root:** the repo root (`~/code/course/`) — the single consolidated
Vite app. The snapshot, current-state, and release notes all live at root;
`sync.mjs` resolves them relative to itself.

## When to run

Trigger phrases: **"sync figma"**, **"check figma for changes"**,
**"update release notes from figma"**. Run after the user has edited the Figma DS
by hand and wants those edits reflected in the docs + release notes.

## Steps

### 1. Capture the live Figma DS → `.ds-current.json`

Run this read-only `use_figma` script (load the `figma-use` skill first), then
`Write` the returned object to `.ds-current.json` (repo root):

```js
const page = figma.root.children.find(p => p.name === 'ds');
await figma.setCurrentPageAsync(page);
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const setIds = new Set(sets.map(s => s.id));
const singles = page.findAllWithCriteria({ types: ['COMPONENT'] })
  .filter(c => !(c.parent && setIds.has(c.parent.id))); // exclude variants inside sets
const components = [...sets, ...singles].map(n => ({
  id: n.id, name: n.name, type: n.type, description: n.description || '',
  variants: n.type === 'COMPONENT_SET' ? n.children.map(c => c.name) : [],
}));
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const localVars = await figma.variables.getLocalVariablesAsync();
const tokens = localVars.map(v => ({ name: v.name, type: v.resolvedType }));
const textStyles = (await figma.getLocalTextStylesAsync()).map(s => ({ name: s.name, size: s.fontSize }));
return { capturedFrom: 'figma:5pa9lxNDLuxAdBogkHeON2', page: 'ds',
  collections: collections.map(c => c.name), components, tokens, textStyles };
```

### 2. Diff (dry run first)

```bash
node .claude/skills/figma-ds-sync/sync.mjs --dry-run
```

- `empty: true` → Figma and the snapshot match. Tell the user "no changes" and stop.
- otherwise → review `diff`, `proposedReleaseNote`, and `figmaDescriptionUpdates`.

### 3. Apply

```bash
node .claude/skills/figma-ds-sync/sync.mjs --apply
```

This appends the entry to `release-notes.json` and rewrites `.ds-snapshot.json`.
The JSON output then tells you what to push back into Figma:

1. **`figmaDescriptionUpdates`** — for each `{id, description}`, set
   `node.description` via `use_figma` (no font load needed).
2. **`figmaReleaseNoteText`** — prepend a new entry card to the Figma "Release
   Notes" page (mirror the existing card: meta line in Inter Semi Bold 14, summary
   in Inter Regular 16, FIXED width + `textAutoResize='HEIGHT'`).

Override computed fields when needed: `--type added|changed|fixed`,
`--scope <name>`, `--version x.y.z`, `--date YYYY-MM-DD`.

### First-time setup

`node .claude/skills/figma-ds-sync/sync.mjs --init` writes the baseline
snapshot from `.ds-current.json` without producing a diff. (Dry-run/apply also
auto-initialise if no snapshot exists yet.)

## Contract

`sync.mjs` never touches Figma — it only reads `.ds-current.json` (which you
produce from MCP) and writes `.ds-snapshot.json` + `release-notes.json`. All
Figma writes go through you via `use_figma`. This keeps the diff logic
deterministic and unit-testable while the agent owns the MCP I/O.
