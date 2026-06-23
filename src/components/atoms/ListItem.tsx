import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION } from '@/lib/motion'

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  /** caps meta cells (e.g. type, author, date) */
  meta?: string[]
  action?: ReactNode
}

/** List row: title (Akkurat) + caps meta cells + optional action, divider below. */
export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { className, title, meta = [], action, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-l rounded-sm border-b border-line px-xs py-s hover:bg-surface-card', TRANSITION, className)}
      {...props}
    >
      <span className="font-accurat text-h4 text-fg">{title}</span>
      <div className="flex flex-1 items-center gap-l">
        {meta.map((m, i) => (
          <span key={i} className="font-pixform text-pixel uppercase tracking-widest text-fg-muted">
            {m}
          </span>
        ))}
      </div>
      {action}
    </div>
  )
})
