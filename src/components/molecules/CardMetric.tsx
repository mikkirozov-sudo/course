import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Graph } from '@/components/atoms'

export interface CardMetricProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  data: number[]
  label: string
}

/** "Health" card — green surface, title + Graph + caps summary. Composes Graph.
 *  Tokens confirmed via get_design_context. */
export const CardMetric = forwardRef<HTMLDivElement, CardMetricProps>(function CardMetric(
  { className, title, data, label, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex w-48 flex-col gap-l rounded-lg bg-card-green p-xl', className)}
      {...props}
    >
      <span className="font-accurat text-h3 text-fg">{title}</span>
      <div className="flex flex-col gap-xs">
        <Graph data={data} className="bg-transparent p-0 [&>div]:mix-blend-multiply [&>div]:bg-surface-base" />
        <span className="font-pixform text-pixel uppercase tracking-widest text-fg">{label}</span>
      </div>
    </div>
  )
})
