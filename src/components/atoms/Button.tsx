import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS, DISABLED } from '@/lib/motion'

/** Variant logic via cva (project-wide choice, see DECISIONS S20).
 *  Token map (from Figma get_design_context):
 *   secondary → bg-control · onColor → bg-control-on-white · small/big → bg-black
 *   node → bg-oncard-red. Labels Pixform caps; big CTA Instrument serif.
 *  States (hover/active/focus/disabled) added per DECISIONS S31 (Figma has none). */
const button = cva(
  `inline-flex items-center justify-center select-none ${TRANSITION} active:scale-95 ${FOCUS} ${DISABLED}`,
  {
    variants: {
      variant: {
        // Figma-exact: Pixform text-pixel (10px), px-s (14), py-xs, h-8, rounded-full pill
        secondary: 'h-8 gap-xs rounded-full bg-control px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg hover:bg-gray active:bg-gray',
        onColor: 'h-8 gap-xs rounded-full bg-control-on-white px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg hover:bg-control active:bg-control',
        small: 'h-8 gap-xs rounded-full bg-black px-s py-xs font-pixform text-pixel uppercase tracking-widest text-surface-base hover:opacity-80',
        big: 'rounded-full bg-black px-s pt-s pb-m font-instrument text-h2 text-surface-base hover:opacity-80',
        node: 'flex-col items-start gap-xs rounded-sm bg-oncard-red p-s text-left hover:opacity-90',
        // Figma BACK button (357:35575): white pill + green stroke (color/text/green)
        outline: 'h-8 gap-xs rounded-full border border-tech-green bg-control-on-white px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg hover:bg-control',
      },
    },
    defaultVariants: { variant: 'secondary' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /** secondary text shown under the title for the `node` variant */
  subLabel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'secondary', children, subLabel, type = 'button', ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cn(button({ variant }), className)} {...props}>
      {variant === 'node' ? (
        <>
          <span className="font-accurat text-grotesk text-fg">{children}</span>
          {subLabel && <span className="font-pixform text-pixel uppercase tracking-widest text-fg">{subLabel}</span>}
        </>
      ) : (
        children
      )}
    </button>
  )
})
