import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'

export interface FlagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed: boolean
  onPressedChange?: (pressed: boolean) => void
  label?: string
}

/** Bookmark toggle. yes → filled (text-fg); no → outline (text-fg-muted). */
export const Flag = forwardRef<HTMLButtonElement, FlagProps>(function Flag(
  { className, pressed, onPressedChange, label = 'Flag', disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        'inline-flex items-center justify-center rounded-sm p-xxs',
        TRANSITION,
        FOCUS,
        'hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        pressed ? 'text-fg' : 'text-fg-muted hover:text-fg',
        className,
      )}
      {...props}
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
        <path
          d="M4 2.5h8v11l-4-3-4 3v-11z"
          fill={pressed ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
})
