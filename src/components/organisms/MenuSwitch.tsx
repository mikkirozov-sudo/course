import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'

export interface MenuSwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

/** Tab toggle (Figma MenuSwitch on/off). on → boxed surface; off → plain text. */
export const MenuSwitch = forwardRef<HTMLButtonElement, MenuSwitchProps>(function MenuSwitch(
  { className, active = false, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        'rounded-sm px-s py-xxs font-accurat text-grotesk',
        TRANSITION,
        FOCUS,
        active ? 'border border-line bg-surface-card text-fg' : 'border border-transparent text-fg-muted hover:text-fg',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
