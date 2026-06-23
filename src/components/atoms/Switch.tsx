import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: 'big' | 'small'
}

/** Accessible toggle (role=switch). Track on→bg-fg, off→bg-control; thumb bg-surface-card.
 *  Dimensions use default Tailwind utilities (no DS size token — flagged). */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked, onCheckedChange, size = 'big', disabled, ...props },
  ref,
) {
  const big = size === 'big'
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative inline-flex shrink-0 items-center rounded-full p-xxs',
        TRANSITION,
        FOCUS,
        'hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none',
        big ? 'h-8 w-14' : 'h-7 w-11',
        checked ? 'bg-fg' : 'bg-control',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-surface-card',
          TRANSITION,
          big ? 'size-6' : 'size-5',
          checked ? (big ? 'translate-x-6' : 'translate-x-4') : 'translate-x-0',
        )}
      />
    </button>
  )
})
