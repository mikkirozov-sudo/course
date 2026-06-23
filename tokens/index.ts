/**
 * Token layer entry point. Re-exports primitives + semantic tokens, defines
 * ready-to-use typography presets, and a preview registry whose entries carry
 * LITERAL Tailwind class strings (so the Tailwind scanner emits those utilities
 * and /preview can auto-render every token via real classes — no inline styles).
 */
import { primitives } from './primitives'
import { semantic } from './semantic'

export { primitives } from './primitives'
export { semantic } from './semantic'
export type { Primitives } from './primitives'
export type { Semantic } from './semantic'

/** Consumption rule (recorded in DECISIONS): Tailwind utilities FIRST; raw CSS
 *  vars (var(--ds-*)) only where a utility can't express the need. */
export const CONSUMPTION_RULE =
  'Tailwind utilities first; raw CSS vars (var(--ds-*)) only where utilities cannot express it.'

/* ---- Typography presets: ready-to-use class combos for Atoms ---- */
export interface TypePreset {
  name: string
  className: string // literal Tailwind classes (family + size/line-height/weight)
  family: string
  sizePx: number
  lineHeightPx: number
  weight: number
  sample: string
}

export const typography: Record<string, TypePreset> = {
  h1: { name: 'H1', className: 'font-instrument text-h1', family: 'Instrument Serif', sizePx: 84, lineHeightPx: 76, weight: 400, sample: 'Almost before we knew it' },
  h2: { name: 'H2', className: 'font-instrument text-h2', family: 'Instrument Serif', sizePx: 40, lineHeightPx: 36, weight: 400, sample: 'Almost before we knew it' },
  description: { name: 'Description', className: 'font-pixform text-description', family: 'Pixform', sizePx: 30, lineHeightPx: 27, weight: 400, sample: 'DESCRIPTION TEXT 0123' },
  h3: { name: 'H3', className: 'font-accurat text-h3', family: 'Akkurat LL', sizePx: 20, lineHeightPx: 18, weight: 700, sample: 'Heading level three' },
  h4: { name: 'H4', className: 'font-accurat text-h4', family: 'Akkurat LL', sizePx: 15, lineHeightPx: 14, weight: 700, sample: 'Heading level four' },
  grotesk: { name: 'Text / Grotesk', className: 'font-accurat text-grotesk', family: 'Akkurat LL', sizePx: 11, lineHeightPx: 10, weight: 400, sample: 'Body grotesk text 0123456789' },
  bold: { name: 'Text / Bold', className: 'font-accurat text-bold', family: 'Akkurat LL', sizePx: 11, lineHeightPx: 10, weight: 700, sample: 'Body bold text 0123456789' },
  pixel: { name: 'Text / Pixel', className: 'font-pixform text-pixel', family: 'Pixform', sizePx: 10, lineHeightPx: 9, weight: 400, sample: 'PIXEL TEXT 0123456789' },
  caps: { name: 'Caps', className: 'font-accurat text-caps uppercase tracking-wide', family: 'Akkurat LL', sizePx: 8, lineHeightPx: 7, weight: 400, sample: 'Caps label' },
}

/* ---- Preview registries (literal class strings) ---- */
export interface Swatch { token: string; cssVar: string; value: string; swatch: string }
export interface ColorGroup { label: string; items: Swatch[] }

export const colorGroups: ColorGroup[] = [
  {
    label: 'Foreground / Text',
    items: [
      { token: 'fg', cssVar: '--color-fg', value: semantic.color.fg, swatch: 'bg-fg' },
      { token: 'fg-muted', cssVar: '--color-fg-muted', value: semantic.color['fg-muted'], swatch: 'bg-fg-muted' },
      { token: 'fg-on-color', cssVar: '--color-fg-on-color', value: semantic.color['fg-on-color'], swatch: 'bg-fg-on-color' },
      { token: 'fg-brown', cssVar: '--color-fg-brown', value: semantic.color['fg-brown'], swatch: 'bg-fg-brown' },
      { token: 'fg-teal', cssVar: '--color-fg-teal', value: semantic.color['fg-teal'], swatch: 'bg-fg-teal' },
      { token: 'fg-olive', cssVar: '--color-fg-olive', value: semantic.color['fg-olive'], swatch: 'bg-fg-olive' },
    ],
  },
  {
    label: 'Surfaces',
    items: [
      { token: 'surface-base', cssVar: '--color-surface-base', value: semantic.color['surface-base'], swatch: 'bg-surface-base' },
      { token: 'surface-card', cssVar: '--color-surface-card', value: semantic.color['surface-card'], swatch: 'bg-surface-card' },
      { token: 'card-white', cssVar: '--color-card-white', value: semantic.color['card-white'], swatch: 'bg-card-white' },
    ],
  },
  {
    label: 'Cards',
    items: [
      { token: 'card-red', cssVar: '--color-card-red', value: semantic.color['card-red'], swatch: 'bg-card-red' },
      { token: 'card-green', cssVar: '--color-card-green', value: semantic.color['card-green'], swatch: 'bg-card-green' },
      { token: 'card-yellow', cssVar: '--color-card-yellow', value: semantic.color['card-yellow'], swatch: 'bg-card-yellow' },
      { token: 'card-pink', cssVar: '--color-card-pink', value: semantic.color['card-pink'], swatch: 'bg-card-pink' },
      { token: 'card-violet', cssVar: '--color-card-violet', value: semantic.color['card-violet'], swatch: 'bg-card-violet' },
    ],
  },
  {
    label: 'On-card',
    items: [
      { token: 'oncard-red', cssVar: '--color-oncard-red', value: semantic.color['oncard-red'], swatch: 'bg-oncard-red' },
      { token: 'oncard-green', cssVar: '--color-oncard-green', value: semantic.color['oncard-green'], swatch: 'bg-oncard-green' },
      { token: 'oncard-yellow', cssVar: '--color-oncard-yellow', value: semantic.color['oncard-yellow'], swatch: 'bg-oncard-yellow' },
      { token: 'oncard-yellow-dark', cssVar: '--color-oncard-yellow-dark', value: semantic.color['oncard-yellow-dark'], swatch: 'bg-oncard-yellow-dark' },
      { token: 'oncard-pink', cssVar: '--color-oncard-pink', value: semantic.color['oncard-pink'], swatch: 'bg-oncard-pink' },
      { token: 'oncard-violet', cssVar: '--color-oncard-violet', value: semantic.color['oncard-violet'], swatch: 'bg-oncard-violet' },
    ],
  },
  {
    label: 'Lines / Controls',
    items: [
      { token: 'line', cssVar: '--color-line', value: semantic.color.line, swatch: 'bg-line' },
      { token: 'control', cssVar: '--color-control', value: semantic.color.control, swatch: 'bg-control' },
      { token: 'control-on-white', cssVar: '--color-control-on-white', value: semantic.color['control-on-white'], swatch: 'bg-control-on-white' },
      { token: 'control-on-brown', cssVar: '--color-control-on-brown', value: semantic.color['control-on-brown'], swatch: 'bg-control-on-brown' },
      { token: 'control-on-yellow-dark', cssVar: '--color-control-on-yellow-dark', value: semantic.color['control-on-yellow-dark'], swatch: 'bg-control-on-yellow-dark' },
    ],
  },
  {
    label: 'Tech / Status / Brand',
    items: [
      { token: 'tech-purple', cssVar: '--color-tech-purple', value: semantic.color['tech-purple'], swatch: 'bg-tech-purple' },
      { token: 'tech-red', cssVar: '--color-tech-red', value: semantic.color['tech-red'], swatch: 'bg-tech-red' },
      { token: 'tech-green', cssVar: '--color-tech-green', value: semantic.color['tech-green'], swatch: 'bg-tech-green' },
      { token: 'tech-gray', cssVar: '--color-tech-gray', value: semantic.color['tech-gray'], swatch: 'bg-tech-gray' },
      { token: 'super-yellow', cssVar: '--color-super-yellow', value: semantic.color['super-yellow'], swatch: 'bg-super-yellow' },
      { token: 'bar-filled', cssVar: '--color-bar-filled', value: semantic.color['bar-filled'], swatch: 'bg-bar-filled' },
      { token: 'bar-empty', cssVar: '--color-bar-empty', value: semantic.color['bar-empty'], swatch: 'bg-bar-empty' },
      { token: 'black', cssVar: '--color-black', value: semantic.color.black, swatch: 'bg-black' },
      { token: 'white', cssVar: '--color-white', value: semantic.color.white, swatch: 'bg-white' },
      { token: 'gray', cssVar: '--color-gray', value: semantic.color.gray, swatch: 'bg-gray' },
    ],
  },
]

export interface ScaleItem { token: string; cssVar: string; value: string; sizeClass: string }

/** width utilities used to visualize the spacing scale */
export const spacingScale: ScaleItem[] = [
  { token: 'xxxs', cssVar: '--spacing-xxxs', value: semantic.space.xxxs, sizeClass: 'w-xxxs' },
  { token: 'xxs', cssVar: '--spacing-xxs', value: semantic.space.xxs, sizeClass: 'w-xxs' },
  { token: 'xs', cssVar: '--spacing-xs', value: semantic.space.xs, sizeClass: 'w-xs' },
  { token: 's', cssVar: '--spacing-s', value: semantic.space.s, sizeClass: 'w-s' },
  { token: 'm', cssVar: '--spacing-m', value: semantic.space.m, sizeClass: 'w-m' },
  { token: 'l', cssVar: '--spacing-l', value: semantic.space.l, sizeClass: 'w-l' },
  { token: 'xl', cssVar: '--spacing-xl', value: semantic.space.xl, sizeClass: 'w-xl' },
  { token: 'xxl', cssVar: '--spacing-xxl', value: semantic.space.xxl, sizeClass: 'w-xxl' },
]

export const radiusScale: ScaleItem[] = [
  { token: 'sm', cssVar: '--radius-sm', value: semantic.radius.sm, sizeClass: 'rounded-sm' },
  { token: 'md', cssVar: '--radius-md', value: semantic.radius.md, sizeClass: 'rounded-md' },
  { token: 'lg', cssVar: '--radius-lg', value: semantic.radius.lg, sizeClass: 'rounded-lg' },
  { token: 'full', cssVar: '--radius-full', value: semantic.radius.full, sizeClass: 'rounded-full' },
]

export interface FontItem { token: string; family: string; cssVar: string; className: string }
export const fonts: FontItem[] = [
  { token: 'font-instrument', family: 'Instrument Serif (antiqa)', cssVar: '--font-instrument', className: 'font-instrument' },
  { token: 'font-accurat', family: 'Akkurat LL (grotesk)', cssVar: '--font-accurat', className: 'font-accurat' },
  { token: 'font-pixform', family: 'Pixform (pixel)', cssVar: '--font-pixform', className: 'font-pixform' },
]

/** borders: width assigned (no Figma token); color from color/line */
export const borders = [
  { token: 'border-width-default', value: semantic.border['width-default'], demo: 'border border-line' },
  { token: 'border-color (line)', value: semantic.border['color-default'], demo: 'border-2 border-line' },
]

/** shadows: NONE in source (0 effect styles in Figma). Recorded for completeness. */
export const shadows: { token: string; value: string; demo: string }[] = []

/* ---- token counts (for the verify diff) ---- */
export const tokenCounts = {
  figmaExtracted: 58, // canonical 'tokens' collection vars (brand)
  primitives:
    Object.keys(primitives.color).length +
    Object.keys(primitives.space).length +
    Object.keys(primitives.radius).length +
    Object.keys(primitives.fontSize).length +
    Object.keys(primitives.lineHeight).length +
    Object.keys(primitives.fontFamily).length +
    Object.keys(primitives.fontWeight).length +
    Object.keys(primitives.size).length,
  semantic:
    Object.keys(semantic.color).length +
    Object.keys(semantic.space).length +
    Object.keys(semantic.radius).length +
    Object.keys(semantic.font).length +
    Object.keys(semantic.fontSize).length +
    Object.keys(semantic.border).length +
    Object.keys(semantic.size).length,
}

/** Reconciliation: all 58 canonical Figma tokens are homed 1:1 in semantic
 *  (33 color + 9 space + 4 radius + 3 font-family + 8 font-size + 1 size).
 *  Extras: surface-card + white (ergonomic color aliases), 2 border tokens
 *  (assigned — no Figma source). Nothing dropped. */
export const reconciliation = {
  figmaColorRoles: 33,
  figmaSpace: 9,
  figmaRadius: 4,
  figmaFontFamily: 3,
  figmaFontSize: 8,
  figmaSize: 1,
  figmaTotal: 58,
  ergonomicExtras: ['color/surface-card', 'color/white'],
  assignedExtras: ['border/width-default', 'border/color-default'],
}
