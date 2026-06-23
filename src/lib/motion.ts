/** Shared interaction class strings. Figma defines NO hover/active/focus state
 *  variants on atoms (only structural variants), so these states are added by
 *  design judgment using existing tokens. No motion token exists in the DS →
 *  duration-150 + ease-out are Tailwind defaults (flagged in DECISIONS S31).
 *  prefers-reduced-motion is honored globally in styles/index.css. */
export const TRANSITION =
  'transition-[color,background-color,border-color,opacity,box-shadow,transform] duration-150 ease-out'

/** Visible keyboard focus via the existing `fg` color token (no focus token). */
export const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg'

/** Pressable feedback: subtle dim on hover, press-down on active. */
export const PRESS = 'hover:opacity-90 active:scale-95 active:opacity-80'

/** Disabled treatment. */
export const DISABLED = 'disabled:opacity-50 disabled:pointer-events-none'
