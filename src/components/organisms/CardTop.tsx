import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Button, Dropdown, SwitchGroup } from '@/components/atoms'

/** CardTop — profile/campaign hero. Mirrors Figma "CardTop" (357:35684).
 *  Property1=Default → golden duotone photo bg + compact dropdown-chip clusters.
 *  Property1=Variant2 → holographic full-bleed bg + black actions + SwitchGroup.
 *  Composes Dropdown(compact) + Button + SwitchGroup. Token gap: Figma golden
 *  overlay #ffb700 → super-yellow (nearest), logged S55. Fixed h-120 (480). */
const wrap = cva('relative flex h-120 w-full max-w-base flex-col overflow-clip rounded-lg p-xl', {
  variants: {
    property1: {
      Default: 'items-start justify-between',
      Variant2: 'items-center justify-start gap-xl',
    },
  },
  defaultVariants: { property1: 'Default' },
})

export interface CardTopAction {
  label: string
  onClick?: () => void
}
export interface CardTopDropdown {
  options: { value: string; label: string }[]
  value: string
  onChange?: (v: string) => void
}

export interface CardTopProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof wrap> {
  name: string
  role: string
  image: string
  topLeft?: string
  topRight?: string
  actions?: CardTopAction[]
  leftDropdowns?: CardTopDropdown[]
  rightDropdowns?: CardTopDropdown[]
  onAdd?: () => void
  switchOptions?: { value: string; label: string }[]
  switchValue?: string
  onSwitch?: (v: string) => void
  /** transparent header rendered in the hero's content flow, over the bg image
   *  (it floats on the hero and pushes the title down naturally) */
  header?: ReactNode
}

export const CardTop = forwardRef<HTMLDivElement, CardTopProps>(function CardTop(
  {
    className,
    property1 = 'Default',
    name,
    role,
    image,
    header,
    topLeft = 'TEAMS',
    topRight = 'access',
    actions = [],
    leftDropdowns = [],
    rightDropdowns = [],
    onAdd,
    switchOptions = [],
    switchValue = '',
    onSwitch,
    ...props
  },
  ref,
) {
  const isDefault = property1 === 'Default'

  return (
    <div ref={ref} className={cn(wrap({ property1 }), className)} {...props}>
      {/* full-bleed background image + overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
        {isDefault ? (
          <>
            <div className="absolute inset-0 bg-black mix-blend-color" />
            <div className="absolute inset-0 bg-super-yellow mix-blend-hard-light" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-base" />
        )}
      </div>

      {/* transparent header floats over the hero image, in flow (pushes title down).
          -mx-xl/-mt-xl cancel the wrap's p-xl so it's flush to the hero edges; self-stretch
          overrides items-center to span full width. */}
      {header && <div className="relative z-20 -mx-xl -mt-xl shrink-0 self-stretch">{header}</div>}

      {isDefault ? (
        <>
          {/* top labels */}
          <div className="relative z-10 flex w-full items-start justify-between font-pixform text-pixel uppercase tracking-widest text-fg-brown">
            <span>{topLeft}</span>
            <span>{topRight}</span>
          </div>

          {/* centered identity + action pills */}
          <div className="absolute left-1/2 top-1/2 z-10 flex w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-xl px-xl text-center">
            <span className="font-instrument text-h1 text-fg">{name}</span>
            <span className="font-pixform text-description uppercase text-fg-brown">{role}</span>
            {actions.length > 0 && (
              <div className="flex items-center gap-xxxs">
                {actions.map((a) => (
                  <Button key={a.label} variant="onColor" onClick={a.onClick}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* bottom dropdown-chip clusters */}
          <div className="relative z-10 flex w-full items-end justify-between gap-m">
            <div className="flex w-1/2 flex-wrap items-center gap-xxxs">
              {leftDropdowns.map((d, i) => (
                <Dropdown key={i} variant="onColor" size="compact" options={d.options} value={d.value} onChange={d.onChange} />
              ))}
              {leftDropdowns.length > 0 && <AddButton onClick={onAdd} />}
            </div>
            <div className="flex flex-wrap items-end justify-end gap-xxxs">
              {rightDropdowns.map((d, i) => (
                <Dropdown key={i} variant="onColor" size="compact" options={d.options} value={d.value} onChange={d.onChange} />
              ))}
              {rightDropdowns.length > 0 && <AddButton onClick={onAdd} />}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* centered identity + black action pills.
              mt-xl + the wrap's p-xl top = ~60px breathing above the title (S77). */}
          <div className="relative z-10 mt-xl flex w-full max-w-3xl flex-col items-center gap-xl px-xl text-center">
            <span className="font-instrument text-h1 text-fg">{name}</span>
            <span className="font-pixform text-description uppercase text-fg">{role}</span>
            {actions.length > 0 && (
              <div className="flex items-center gap-xxxs">
                {actions.map((a) => (
                  <Button key={a.label} variant="small" onClick={a.onClick}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {switchOptions.length > 0 && (
            <SwitchGroup className="relative z-10 mt-auto" options={switchOptions} value={switchValue} onChange={onSwitch} aria-label="view" />
          )}
        </>
      )}
    </div>
  )
})

function AddButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 items-center justify-center rounded-full bg-control-on-brown px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg-on-color transition-opacity duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
    >
      Add
    </button>
  )
}
