import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface BarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 fill percentage */
  value: number
  size?: 'default' | 'big'
  /** number of segments (dots) */
  segments?: number
}

/** Segmented dotted progress bar — matches Figma Bar (357:33707) / productivity
 *  reference (357:35512): rounded dots, gap-xxxs (2px), filled = tech-green,
 *  track = oncard-green. Tones/sizes all tokens; dot dims from default scale. */
export const Bar = forwardRef<HTMLDivElement, BarProps>(function Bar(
  { className, value, size = 'default', segments = 40, ...props },
  ref,
) {
  const pct = Math.max(0, Math.min(100, value))
  const filled = Math.round((pct / 100) * segments)
  const dot = size === 'big' ? 'size-3' : 'size-1'
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('flex w-full items-center gap-xxxs overflow-hidden', className)}
      {...props}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={cn('shrink-0 rounded-full', dot, i < filled ? 'bg-tech-green' : 'bg-oncard-green')}
          aria-hidden="true"
        />
      ))}
    </div>
  )
})
