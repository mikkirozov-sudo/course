import { forwardRef, type SVGProps } from 'react'
import { cn } from '@/lib/cn'

export const ICON_NAMES = ['play', 'user', 'more', 'arrow-down', 'close'] as const
export type IconName = (typeof ICON_NAMES)[number]

/** 16px line icons matching the Figma Icon set. Color inherits `currentColor`
 *  (drive it with a DS text-* utility). Size via `size-*` default utilities. */
const PATHS: Record<IconName, React.ReactNode> = {
  play: <path d="M5 3.5v9l7-4.5-7-4.5z" fill="currentColor" />,
  user: (
    <>
      <circle cx="8" cy="5" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  more: (
    <g fill="currentColor">
      <circle cx="3" cy="8" r="1.3" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="13" cy="8" r="1.3" />
    </g>
  ),
  'arrow-down': <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />,
  close: <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Tailwind size utility, default size-4 (16px). */
  className?: string
  title?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, className, title, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 16 16"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn('size-4 shrink-0', className)}
      {...props}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  )
})
