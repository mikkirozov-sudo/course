import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Status, Button, type StatusIntent } from '@/components/atoms'

export interface CampaignMetric {
  value: string | number
  label: string
}

export interface CampaignPreviewProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  status?: { intent: StatusIntent; label: string }
  metrics: CampaignMetric[]
  onMoreInfo?: () => void
}

/** Hiring-campaign card. EXACT Figma spec (357:35472): gap-xxl (90px) between
 *  header and metrics, numbers = Instrument text-h1 (84px), caps labels, columns
 *  justify-between flex-1. Composes Status + Button. */
export const CampaignPreview = forwardRef<HTMLDivElement, CampaignPreviewProps>(function CampaignPreview(
  { className, title, status, metrics, onMoreInfo, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-xxl rounded-lg border border-line bg-surface-card p-xl', className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between gap-s">
        <span className="font-instrument text-h2 text-fg">{title}</span>
        <div className="flex items-center gap-s">
          {status && <Status intent={status.intent} label={status.label} />}
          <Button variant="secondary" onClick={onMoreInfo}>
            More info
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-xs">
        <div className="flex w-full justify-between">
          {metrics.map((m, i) => (
            <span key={i} className="flex-1 font-instrument text-h1 text-fg">
              {m.value}
            </span>
          ))}
        </div>
        <div className="flex w-full justify-between">
          {metrics.map((m, i) => (
            <span key={i} className="flex-1 font-accurat text-caps uppercase tracking-widest text-fg-muted">
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})
