import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Tag } from '@/components/atoms'

export interface ProjectPreviewProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  tags: string[]
}

/** Project card: title + description + tech Tag row. Composes Tag. */
export const ProjectPreview = forwardRef<HTMLDivElement, ProjectPreviewProps>(function ProjectPreview(
  { className, title, description, tags, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-s rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      <span className="font-accurat text-h4 text-fg">{title}</span>
      <p className="font-accurat text-grotesk text-fg">{description}</p>
      <div className="flex flex-wrap gap-xs">
        {tags.map((t) => (
          <Tag key={t} variant="static">
            {t}
          </Tag>
        ))}
      </div>
    </div>
  )
})
