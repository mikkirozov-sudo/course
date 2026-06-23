import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'

export interface SwitchGroupOption {
  value: string
  label: string
}

export interface SwitchGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SwitchGroupOption[]
  value: string
  onChange?: (value: string) => void
  'aria-label'?: string
}

/** Segmented control. Figma-exact (357:35421): super-yellow track `rounded-m`
 *  + `p-xxs`, segments `h-8 px-s rounded-s` that HUG their own label; the active
 *  segment fills `surface-card`. Active bg animates via transition-colors.
 *  Keyboard: arrow keys move. */
export const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(function SwitchGroup(
  { className, options, value, onChange, ...props },
  ref,
) {
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  const move = (dir: number) => {
    const next = options[(index + dir + options.length) % options.length]
    onChange?.(next.value)
  }
  return (
    <div
      ref={ref}
      role="radiogroup"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1) }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1) }
      }}
      className={cn('inline-flex items-center gap-xxxs rounded-md bg-super-yellow p-xxs', className)}
      {...props}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(o.value)}
            className={cn(
              'inline-flex h-8 items-center justify-center whitespace-nowrap rounded-sm px-s font-pixform text-pixel uppercase tracking-widest text-fg',
              TRANSITION,
              FOCUS,
              active ? 'bg-surface-card' : 'bg-transparent hover:opacity-70',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
})
