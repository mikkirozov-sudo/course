import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION } from '@/lib/motion'
import { Icon } from '@/components/atoms'

export interface NodeProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle: string
}

/** Trigger node card (pink). play + title/subtitle + more menu + status dot.
 *  Composes Icon. */
export const Node = forwardRef<HTMLDivElement, NodeProps>(function Node(
  { className, title, subtitle, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex w-56 flex-col gap-s rounded-lg bg-oncard-red p-s hover:opacity-90', TRANSITION, className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Icon name="play" title="run" className="text-fg" />
        <button type="button" aria-label="more" className="text-fg hover:opacity-70">
          <Icon name="more" />
        </button>
      </div>
      <div className="flex flex-col gap-xxxs">
        <span className="font-accurat text-grotesk text-fg">{title}</span>
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{subtitle}</span>
      </div>
      <span className="size-2 self-end rounded-full bg-fg" aria-hidden="true" />
    </div>
  )
})
