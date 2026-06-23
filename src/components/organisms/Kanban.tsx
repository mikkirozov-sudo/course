import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Profile } from '@/components/molecules'

export interface KanbanCandidate {
  name: string
  role: string
  avatarSrc?: string
}
export interface KanbanColumn {
  title: string
  candidates: KanbanCandidate[]
}

export interface KanbanProps extends HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[]
}

/** Pipeline board: columns with serif title+count and Profile-short candidate
 *  cards. Composes Profile (bg overridden to control via className). */
export const Kanban = forwardRef<HTMLDivElement, KanbanProps>(function Kanban(
  { className, columns, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex gap-l rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      {columns.map((col) => (
        <section key={col.title} className="flex flex-1 flex-col gap-s">
          <div className="flex items-baseline justify-between">
            <h3 className="font-instrument text-h3 text-fg">{col.title}</h3>
            <span className="font-instrument text-h3 text-fg-muted">{col.candidates.length}</span>
          </div>
          <ul className="flex flex-col gap-xs">
            {col.candidates.map((c, i) => (
              <li key={i}>
                <Profile
                  variant="short"
                  name={c.name}
                  role={c.role}
                  avatarSrc={c.avatarSrc}
                  className="w-full bg-control"
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
})
