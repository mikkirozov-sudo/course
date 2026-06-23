import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface ExperiencePreviewProps extends HTMLAttributes<HTMLDivElement> {
  period: string
  title: string
  company: string
  description: string
}

/** Experience/timeline entry: caps period + title + company + body. */
export const ExperiencePreview = forwardRef<HTMLDivElement, ExperiencePreviewProps>(function ExperiencePreview(
  { className, period, title, company, description, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-xs rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{period}</span>
      <span className="font-accurat text-h4 text-fg">{title}</span>
      <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{company}</span>
      <p className="font-accurat text-grotesk text-fg">{description}</p>
    </div>
  )
})
