/**
 * PRIMITIVES — raw token values (tier 1).
 * The lowest layer: literal values, no semantics. Semantic tokens reference these.
 * Mirror of the `tokens` collection (brand mode) in Figma, deduplicated by value.
 * Keep in sync with styles/tokens.css (:root --ds-* primitives).
 */
export const primitives = {
  color: {
    ink: '#000000',
    paper: '#ffffff',
    'gray-100': '#f2f2f2',
    'gray-200': '#eaeaea',
    'gray-300': '#cbcbcb',
    'gray-500': '#979797',
    sage: '#b8c6c3',
    purple: '#9747ff',
    teal: '#00867b',
    red: '#cc0000',
    yellow: '#ffe900',
    brown: '#d1a63b',
    olive: '#646905',
    'red-50': '#f7e0dd',
    'red-100': '#f5cfca',
    'green-100': '#d4eee7',
    'yellow-50': '#fffd9e',
    'yellow-100': '#e0e2a4',
    'pink-50': '#ffe3f1',
    'pink-100': '#fad5e7',
    'violet-100': '#ddd6ef',
  },
  space: {
    'neg-8': '-8px',
    '2': '2px',
    '4': '4px',
    '8': '8px',
    '14': '14px',
    '20': '20px',
    '24': '24px',
    '30': '30px',
    '90': '90px',
  },
  radius: {
    '4': '4px',
    '8': '8px',
    '12': '12px',
    '999': '999px',
  },
  fontSize: {
    '8': '8px',
    '10': '10px',
    '11': '11px',
    '15': '15px',
    '20': '20px',
    '30': '30px',
    '40': '40px',
    '84': '84px',
  },
  lineHeight: {
    '7': '7px',
    '9': '9px',
    '10': '10px',
    '14': '14px',
    '18': '18px',
    '27': '27px',
    '36': '36px',
    '76': '76px',
  },
  fontFamily: {
    instrument: "'Instrument Serif', serif",
    accurat: "'Akkurat LL', system-ui, sans-serif",
    pixform: "'Pixform', ui-monospace, monospace",
  },
  fontWeight: {
    regular: 400,
    bold: 700,
  },
  size: {
    'base-width': '830px',
  },
} as const

export type Primitives = typeof primitives
