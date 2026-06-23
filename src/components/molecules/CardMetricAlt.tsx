import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface CardMetricAltProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  label: string
}

/** Single big-number metric card (serif). */
export const CardMetricAlt = forwardRef<HTMLDivElement, CardMetricAltProps>(function CardMetricAlt(
  { className, title, value, label, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex w-44 flex-col gap-l rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      <span className="font-instrument text-h3 text-fg">{title}</span>
      <div className="flex flex-col gap-xxs">
        <span className="font-instrument text-h1 text-fg">{value}</span>
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{label}</span>
      </div>
    </div>
  )
})
