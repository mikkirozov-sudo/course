import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Flag, ErrorMessage, Button } from '@/components/atoms'

export interface TaskProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  error?: string
  /** active (Variant2) → dark title + flagged; default → muted/done */
  active?: boolean
  onFlag?: (pressed: boolean) => void
  onOpen?: () => void
}

/** Task row: Flag + title + optional Error + action Button.
 *  Composes Flag + ErrorMessage + Button. */
export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task(
  { className, title, error, active = false, onFlag, onOpen, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex w-full flex-col gap-s border-b border-line py-s', className)} {...props}>
      <div className="flex items-center gap-s">
        <Flag pressed={active} onPressedChange={onFlag} label="flag task" />
        <span className={cn('font-accurat text-h4', active ? 'text-fg' : 'text-fg-muted')}>{title}</span>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button variant="secondary" onClick={onOpen} className="self-start">
        Job description
      </Button>
    </div>
  )
})
