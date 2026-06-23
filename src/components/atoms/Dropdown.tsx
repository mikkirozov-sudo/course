import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'
import { Icon } from './Icon'

/** Select trigger + menu. default → bg-control; onColor → bg-fg-brown.
 *  Opens a listbox with a blurred shade overlay (backdrop-blur, animated).
 *  Keyboard: Enter/Space/ArrowDown opens; Arrow keys move; Enter selects; Esc closes. */
const field = cva(
  `flex w-full items-center justify-between rounded-sm px-s py-xs ${TRANSITION} hover:opacity-90 ${FOCUS} disabled:pointer-events-none`,
  {
    variants: {
      variant: { default: 'bg-control', onColor: 'bg-fg-brown' },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'>,
    VariantProps<typeof field> {
  label?: string
  value?: string
  placeholder?: string
  options?: DropdownOption[]
  onChange?: (value: string) => void
  /** `compact` = chip-style, hugs its label (CardTop dropdown chips) */
  size?: 'default' | 'compact'
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(function Dropdown(
  { className, variant = 'default', size = 'default', label, value, placeholder = 'select…', options = [], onChange, disabled, id, ...props },
  ref,
) {
  const compact = size === 'compact'
  const autoId = useId()
  const fieldId = id ?? autoId
  const onColor = variant === 'onColor'
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)
  const filled = !!selected
  const text = selected ? selected.label : placeholder

  // close on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const choose = (i: number) => {
    const o = options[i]
    if (o) onChange?.(o.value)
    setOpen(false)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault(); setOpen(true); return
    }
    if (open) {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)) }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active) }
    }
  }

  return (
    <div ref={rootRef} className={cn('relative flex flex-col gap-xs', compact ? 'w-auto' : 'w-full', disabled && 'opacity-50')}>
      {label && (
        <span className={cn('font-accurat text-caps uppercase tracking-widest', onColor ? 'text-fg-brown' : 'text-fg')}>
          {label}
        </span>
      )}
      <button
        ref={ref}
        type="button"
        id={fieldId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
        className={cn(field({ variant }), compact && 'h-8 w-auto justify-center gap-xxs', !filled && 'opacity-50', className)}
        {...props}
      >
        <span className={cn('font-pixform text-pixel uppercase tracking-widest', onColor ? 'text-fg-on-color' : filled ? 'text-fg' : 'text-fg-muted')}>
          {text}
        </span>
        <Icon name="arrow-down" className={cn(TRANSITION, onColor ? 'text-fg-on-color' : 'text-fg', open && 'rotate-180')} />
      </button>

      {/* blurred shade overlay (animated) */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-10 bg-fg/5 backdrop-blur-sm',
          TRANSITION,
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {options.length > 0 && (
        <ul
          role="listbox"
          aria-labelledby={fieldId}
          className={cn(
            'absolute left-0 right-0 top-full z-20 mt-xxs flex origin-top flex-col gap-xxxs rounded-sm border border-line bg-surface-card p-xxs',
            TRANSITION,
            open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
          )}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={cn(
                'cursor-pointer rounded-sm px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg',
                TRANSITION,
                (i === active || o.value === value) && 'bg-control',
              )}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
