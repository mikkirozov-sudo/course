/**
 * SEMANTIC tokens (tier 2) — roles that point at primitives.
 * Each value references a primitive (two-tier discipline). Keys mirror the
 * Figma DS roles; the `cssVar` map exposes the matching --ds-* custom property.
 * Keep in sync with styles/tokens.css (semantic --ds-* block) and styles/theme.css.
 */
import { primitives } from './primitives'

export const semantic = {
  color: {
    // foreground / text
    fg: primitives.color.ink, // color/text/primary
    'fg-muted': primitives.color['gray-500'], // color/text/secondary
    'fg-on-color': primitives.color.paper, // color/text/on-color
    'fg-brown': primitives.color.brown, // color/text/brown
    'fg-teal': primitives.color.teal, // color/text/green
    'fg-olive': primitives.color.olive, // color/text/yellow-dark
    // surfaces / backgrounds
    'surface-base': primitives.color['gray-100'], // color/bg/base
    'surface-card': primitives.color.paper, // ergonomic alias of card-white
    'card-white': primitives.color.paper, // color/bg/card/white
    'card-red': primitives.color['red-100'],
    'card-green': primitives.color['green-100'],
    'card-yellow': primitives.color['yellow-100'],
    'card-pink': primitives.color['pink-100'],
    'card-violet': primitives.color['violet-100'],
    'oncard-red': primitives.color['red-50'],
    'oncard-green': primitives.color['green-100'], // alias of card-green in Figma
    'oncard-yellow': primitives.color['yellow-100'], // alias of card-yellow
    'oncard-yellow-dark': primitives.color['yellow-50'],
    'oncard-pink': primitives.color['pink-50'],
    'oncard-violet': primitives.color['violet-100'],
    // lines / controls
    line: primitives.color['gray-200'], // color/line
    control: primitives.color['gray-200'], // color/control/secondary-default
    'control-on-white': primitives.color.paper, // color/control/on-color-white
    'control-on-brown': primitives.color.brown, // color/control/on-color-brown
    'control-on-yellow-dark': primitives.color['yellow-50'], // color/control/on-color-yellow-dark
    // tech / status / brand
    'tech-purple': primitives.color.purple,
    'tech-red': primitives.color.red,
    'tech-green': primitives.color.teal, // alias of text/green
    'tech-gray': primitives.color['gray-300'],
    'super-yellow': primitives.color.yellow,
    'bar-filled': primitives.color.sage, // color/bar/on-base-filled
    'bar-empty': primitives.color.paper, // color/bar/on-base-empty
    black: primitives.color.ink,
    white: primitives.color.paper,
    gray: primitives.color['gray-300'],
  },
  space: {
    'neg-xs': primitives.space['neg-8'],
    xxxs: primitives.space['2'],
    xxs: primitives.space['4'],
    xs: primitives.space['8'],
    s: primitives.space['14'],
    m: primitives.space['20'],
    l: primitives.space['24'],
    xl: primitives.space['30'],
    xxl: primitives.space['90'],
  },
  radius: {
    sm: primitives.radius['4'],
    md: primitives.radius['8'],
    lg: primitives.radius['12'],
    full: primitives.radius['999'],
  },
  font: {
    antiqa: primitives.fontFamily.instrument,
    grotesk: primitives.fontFamily.accurat,
    pixel: primitives.fontFamily.pixform,
  },
  fontSize: {
    caps: primitives.fontSize['8'],
    pixel: primitives.fontSize['10'],
    grotesk: primitives.fontSize['11'],
    m: primitives.fontSize['15'],
    h3: primitives.fontSize['20'],
    description: primitives.fontSize['30'],
    h2: primitives.fontSize['40'],
    h1: primitives.fontSize['84'],
  },
  border: {
    'width-default': '1px', // assigned — no width token in Figma (see DECISIONS)
    'color-default': primitives.color['gray-200'], // color/line
  },
  size: {
    'base-width': primitives.size['base-width'], // size/base-width (layout max-width)
  },
} as const

export type Semantic = typeof semantic
