import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Bar, AvatarGroup, type AvatarProps } from '@/components/atoms'

export interface TeamProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  count: number
  /** 0–100 productivity */
  productivity: number
  highlight: string
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'fallback'>[]
}

/** Team card: header + productivity Bar + week highlight + AvatarGroup.
 *  Composes Bar + AvatarGroup. */
export const Team = forwardRef<HTMLDivElement, TeamProps>(function Team(
  { className, name, count, productivity, highlight, avatars, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex w-96 flex-col gap-l rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-accurat text-h4 text-fg">{name}</span>
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{count} people</span>
      </div>
      <div className="flex flex-col gap-xxs">
        <div className="flex items-center justify-between">
          <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">productivity</span>
          <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{productivity}%</span>
        </div>
        <Bar value={productivity} />
      </div>
      <div className="flex flex-col gap-xxs">
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">week highlight</span>
        <span className="font-pixform text-pixel uppercase tracking-widest text-fg">{highlight}</span>
      </div>
      <AvatarGroup avatars={avatars} max={3} />
    </div>
  )
})
