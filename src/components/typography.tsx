/**
 * Ready-to-use typography components for Atoms (Step 3). Each wraps a token
 * preset class combo from tokens/typography. Use these instead of re-deriving
 * font/size/line-height. All styling via Tailwind utilities (no inline styles).
 */
import type { ElementType, ReactNode } from 'react'
import { typography } from '@tokens'

interface TypeProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

function make(presetKey: keyof typeof typography, defaultTag: ElementType) {
  return function TypeComponent({ as, className = '', children }: TypeProps) {
    const Tag = as ?? defaultTag
    return <Tag className={`${typography[presetKey].className} ${className}`.trim()}>{children}</Tag>
  }
}

export const H1 = make('h1', 'h1')
export const H2 = make('h2', 'h2')
export const H3 = make('h3', 'h3')
export const H4 = make('h4', 'h4')
export const Description = make('description', 'p')
export const Body = make('grotesk', 'p')
export const Bold = make('bold', 'p')
export const Pixel = make('pixel', 'p')
export const Caps = make('caps', 'span')
