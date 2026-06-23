import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Status } from '@/components/atoms'

export interface AttemptSide {
  amount: string
  labels: string[]
}

const wrap = cva('flex flex-col gap-l rounded-lg border border-line p-xl', {
  variants: {
    variant: {
      // filled/result row sits on a base surface; "next" row stays on card
      default: 'bg-surface-base',
      next: 'bg-surface-card',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface AttemptProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof wrap> {
  title: string
  left: AttemptSide
  right: AttemptSide
  /** outcome flag, e.g. failed */
  failed?: boolean
}

/** Attempt summary row: section title + two amount columns + outcome Status.
 *  Composes Status. */
export const Attempt = forwardRef<HTMLDivElement, AttemptProps>(function Attempt(
  { className, variant = 'default', title, left, right, failed, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(wrap({ variant }), className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{title}</span>
        {failed && <Status intent="red" label="failed" />}
      </div>
      <div className="flex items-start justify-between gap-xl">
        <Column side={left} align="left" />
        <Column side={right} align="right" />
      </div>
    </div>
  )
})

function Column({ side, align }: { side: AttemptSide; align: 'left' | 'right' }) {
  return (
    <div className={cn('flex flex-col gap-xs', align === 'right' && 'items-end text-right')}>
      <span className="font-instrument text-h2 text-fg">{side.amount}</span>
      <div className="flex flex-col gap-xxxs">
        {side.labels.map((l, i) => (
          <span key={i} className="font-pixform text-caps uppercase tracking-widest text-fg-muted">
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}
