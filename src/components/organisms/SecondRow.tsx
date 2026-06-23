import { forwardRef, Fragment, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms'

const wrap = cva('flex w-full items-center gap-m py-s', {
  variants: { variant: { default: '', builder: '' } },
  defaultVariants: { variant: 'default' },
})

export interface SecondRowProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof wrap> {
  crumbs?: string[]
  onBack?: () => void
  onSave?: () => void
  onDeploy?: () => void
}

/** Toolbar row. default → breadcrumb; builder → Save/Deploy actions.
 *  Composes Button. */
export const SecondRow = forwardRef<HTMLDivElement, SecondRowProps>(function SecondRow(
  { className, variant = 'default', crumbs = ['Home', 'Something', 'Something'], onBack, onSave, onDeploy, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(wrap({ variant }), className)} {...props}>
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      {variant === 'default' ? (
        <nav aria-label="breadcrumb" className="flex items-center gap-xs">
          {crumbs.map((c, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-fg-muted" aria-hidden="true">•</span>}
              <span className="font-accurat text-grotesk text-fg">{c}</span>
            </Fragment>
          ))}
        </nav>
      ) : (
        <div className="ml-auto flex items-center gap-s">
          <Button variant="secondary" onClick={onSave}>
            Save
          </Button>
          <Button variant="small" onClick={onDeploy}>
            Deploy
          </Button>
        </div>
      )}
    </div>
  )
})
