#!/usr/bin/env node
/**
 * figma-ds-sync — deterministic engine for keeping the React DS, the Figma DS,
 * and the release notes in sync.
 *
 * This script does NOT talk to Figma (it can't — MCP lives in the agent). The
 * agent reads the live Figma design system via MCP and writes it to
 * `.ds-current.json`; this script then:
 *   1. diffs `.ds-current.json` against the stored `.ds-snapshot.json`,
 *   2. prints the diff + the description updates / release note the agent must
 *      apply back into Figma (via MCP),
 *   3. (apply mode) appends a release-notes entry to src/data/release-notes.json
 *      and rewrites `.ds-snapshot.json` to the new state.
 *
 * Usage (run from anywhere; paths resolve to the repo root):
 *   node sync.mjs --init                 # first run: write snapshot, no diff
 *   node sync.mjs --dry-run              # compute + print diff, write nothing
 *   node sync.mjs --apply                # append release note + rewrite snapshot
 *   node sync.mjs --apply --date 2026-06-17 --type changed --version 0.2.0
 *
 * Flags:
 *   --current <path>   override current-state file (default .ds-current.json)
 *   --snapshot <path>  override snapshot file       (default .ds-snapshot.json)
 *   --notes <path>     override release-notes.json  (default src/data/release-notes.json)
 *   --date / --type / --version / --scope  override computed release-note fields
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// .claude/skills/figma-ds-sync/sync.mjs -> ../../.. == repo root
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

// ---------- arg parsing ----------
const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const val = (f, d) => {
  const i = argv.indexOf(f)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d
}
const MODE = has('--init') ? 'init' : has('--apply') ? 'apply' : 'dry-run'

const CURRENT = resolve(ROOT, val('--current', '.ds-current.json'))
const SNAPSHOT = resolve(ROOT, val('--snapshot', '.ds-snapshot.json'))
const NOTES = resolve(ROOT, val('--notes', 'src/data/release-notes.json'))

const today = () => new Date().toISOString().slice(0, 10)

// ---------- helpers ----------
const readJSON = (p, dflt) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : dflt)
const byId = (arr) => new Map((arr || []).map((c) => [c.id, c]))
const byName = (arr) => new Map((arr || []).map((c) => [c.name, c]))
const sameVariants = (a = [], b = []) =>
  a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|')

function diffState(snap, cur) {
  const sComp = snap.components || []
  const cComp = cur.components || []
  const sById = byId(sComp)
  const cById = byId(cComp)
  const sByName = byName(sComp)
  const cByName = byName(cComp)

  const added = []
  const removed = []
  const renamed = []
  const descChanged = []
  const variantChanged = []

  for (const c of cComp) {
    const prev = sById.get(c.id) || sByName.get(c.name)
    if (!prev) {
      added.push(c)
      continue
    }
    if (prev.name !== c.name) renamed.push({ from: prev.name, to: c.name, id: c.id })
    if ((prev.description || '') !== (c.description || ''))
      descChanged.push({ name: c.name, id: c.id, from: prev.description || '', to: c.description || '' })
    if (!sameVariants(prev.variants, c.variants))
      variantChanged.push({ name: c.name, id: c.id, from: prev.variants || [], to: c.variants || [] })
  }
  for (const c of sComp) {
    if (!cById.has(c.id) && !cByName.has(c.name)) removed.push(c)
  }

  const diffByName = (sArr = [], cArr = [], key) => {
    const s = byName(sArr)
    const c = byName(cArr)
    const a = cArr.filter((x) => !s.has(x.name)).map((x) => x.name)
    const r = sArr.filter((x) => !c.has(x.name)).map((x) => x.name)
    const changed = cArr
      .filter((x) => s.has(x.name) && JSON.stringify(s.get(x.name)[key]) !== JSON.stringify(x[key]))
      .map((x) => x.name)
    return { added: a, removed: r, changed }
  }
  const tokens = diffByName(snap.tokens, cur.tokens, 'type')
  const styles = diffByName(snap.textStyles, cur.textStyles, 'size')

  const isEmpty =
    !added.length &&
    !removed.length &&
    !renamed.length &&
    !descChanged.length &&
    !variantChanged.length &&
    !tokens.added.length && !tokens.removed.length && !tokens.changed.length &&
    !styles.added.length && !styles.removed.length && !styles.changed.length

  return { added, removed, renamed, descChanged, variantChanged, tokens, styles, isEmpty }
}

function summarize(d) {
  const parts = []
  if (d.added.length) parts.push(`added ${d.added.map((c) => c.name).join(', ')}`)
  if (d.removed.length) parts.push(`removed ${d.removed.map((c) => c.name).join(', ')}`)
  if (d.renamed.length) parts.push(`renamed ${d.renamed.map((r) => `${r.from}→${r.to}`).join(', ')}`)
  if (d.variantChanged.length)
    parts.push(`changed variants on ${d.variantChanged.map((v) => v.name).join(', ')}`)
  if (d.descChanged.length) parts.push(`updated descriptions on ${d.descChanged.map((c) => c.name).join(', ')}`)
  for (const [label, t] of [['token', d.tokens], ['text-style', d.styles]]) {
    if (t.added.length) parts.push(`new ${label}s ${t.added.join(', ')}`)
    if (t.removed.length) parts.push(`removed ${label}s ${t.removed.join(', ')}`)
    if (t.changed.length) parts.push(`changed ${label}s ${t.changed.join(', ')}`)
  }
  const s = parts.join('; ')
  return s ? s.charAt(0).toUpperCase() + s.slice(1) + '.' : 'No changes.'
}

function inferType(d) {
  if (d.removed.length || d.renamed.length || d.variantChanged.length || d.descChanged.length ||
      d.tokens.removed.length || d.tokens.changed.length || d.styles.removed.length || d.styles.changed.length)
    return 'changed'
  return 'added'
}

function inferScope(d) {
  const names = [
    ...d.added.map((c) => c.name),
    ...d.removed.map((c) => c.name),
    ...d.renamed.map((r) => r.to),
    ...d.variantChanged.map((v) => v.name),
    ...d.descChanged.map((c) => c.name),
  ]
  if (!names.length) return 'tokens'
  if (names.length > 3) return 'design-system'
  return names.join(', ')
}

function bumpPatch(notes) {
  const latest = notes[0]?.version || '0.0.0'
  const [maj, min, patch] = latest.split('.').map((n) => parseInt(n, 10) || 0)
  return `${maj}.${min}.${patch + 1}`
}

function out(obj) {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n')
}

// ---------- main ----------
if (!existsSync(CURRENT)) {
  out({ ok: false, error: `current-state file not found: ${CURRENT}. Have the agent capture Figma via MCP first.` })
  process.exit(1)
}
const current = readJSON(CURRENT)
const snapshotExists = existsSync(SNAPSHOT)

if (MODE === 'init' || !snapshotExists) {
  if (MODE !== 'init' && !snapshotExists) {
    // first ever run in dry-run/apply: treat as init so we never crash
  }
  writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2) + '\n')
  out({
    ok: true,
    mode: 'init',
    message: `Initial snapshot written to ${SNAPSHOT}.`,
    components: (current.components || []).length,
    tokens: (current.tokens || []).length,
    textStyles: (current.textStyles || []).length,
  })
  process.exit(0)
}

const snapshot = readJSON(SNAPSHOT)
const diff = diffState(snapshot, current)
const summary = summarize(diff)

if (diff.isEmpty) {
  out({ ok: true, mode: MODE, empty: true, message: 'No changes detected. Figma and snapshot are in sync.' })
  process.exit(0)
}

const entry = {
  date: val('--date', today()),
  version: val('--version', null), // filled below
  type: val('--type', inferType(diff)),
  scope: val('--scope', inferScope(diff)),
  summary,
}

// description updates the agent must push back into Figma via MCP
const figmaDescriptionUpdates = diff.descChanged.map((c) => ({ id: c.id, name: c.name, description: c.to }))

if (MODE === 'dry-run') {
  out({
    ok: true,
    mode: 'dry-run',
    empty: false,
    diff,
    proposedReleaseNote: { ...entry, version: entry.version || bumpPatch(readJSON(NOTES, [])) },
    figmaDescriptionUpdates,
    note: 'Dry run — nothing written. Re-run with --apply to commit.',
  })
  process.exit(0)
}

// ---------- apply ----------
const notes = readJSON(NOTES, [])
entry.version = entry.version || bumpPatch(notes)
notes.unshift(entry) // newest first
writeFileSync(NOTES, JSON.stringify(notes, null, 2) + '\n')
writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2) + '\n')

out({
  ok: true,
  mode: 'apply',
  empty: false,
  releaseNoteAppended: entry,
  notesFile: NOTES,
  snapshotFile: SNAPSHOT,
  figmaDescriptionUpdates,
  figmaReleaseNoteText: `${entry.date}   ·   v${entry.version}   ·   ${entry.type.toUpperCase()}   ·   ${entry.scope}\n${entry.summary}`,
  agentTodo: [
    'Apply figmaDescriptionUpdates to each component via use_figma (set node.description).',
    'Prepend figmaReleaseNoteText as a new entry card on the Figma "Release Notes" page.',
  ],
})
