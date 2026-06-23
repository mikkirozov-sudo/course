import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface GraphProps extends HTMLAttributes<HTMLDivElement> {
  /** series values; rendered as proportional bars */
  data: number[]
}

/** Minimal bar graph. Bars bg-fg on a surface-card panel. Heights are
 *  data-driven (inline style), all design values from tokens. */
export const Graph = forwardRef<HTMLDivElement, GraphProps>(function Graph(
  { className, data, ...props },
  ref,
) {
  const max = Math.max(1, ...data)
  return (
    <div
      ref={ref}
      role="img"
      aria-label="bar graph"
      className={cn('flex h-20 items-end gap-xxs rounded-sm bg-surface-card p-xs', className)}
      {...props}
    >
      {data.map((v, i) => (
        <div
          key={i}
          className="w-xs rounded-sm bg-fg"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
})
