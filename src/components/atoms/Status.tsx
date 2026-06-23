import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export const STATUS_INTENTS = ['purple', 'green', 'red', 'stopped'] as const
export type StatusIntent = (typeof STATUS_INTENTS)[number]

// dot + label colour per intent (DS tech-* + muted for stopped)
const DOT: Record<StatusIntent, string> = {
  purple: 'bg-tech-purple',
  green: 'bg-tech-green',
  red: 'bg-tech-red',
  stopped: 'bg-tech-gray',
}
const TEXT: Record<StatusIntent, string> = {
  purple: 'text-tech-purple',
  green: 'text-tech-green',
  red: 'text-tech-red',
  stopped: 'text-fg-muted',
}

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  intent: StatusIntent
  label: string
}

export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  { className, intent, label, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn('inline-flex items-center gap-xs', className)} {...props}>
      <span className={cn('size-2 shrink-0 rounded-full', DOT[intent])} aria-hidden="true" />
      <span className={cn('font-pixform text-pixel uppercase tracking-widest', TEXT[intent])}>{label}</span>
    </span>
  )
})
