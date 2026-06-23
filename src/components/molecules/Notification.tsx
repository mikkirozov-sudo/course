import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  message: string
  action?: ReactNode
}

/** Mint notification card. Pixform description text in teal + optional action.
 *  Tokens from get_design_context. (Compose a Button via `action`.) */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  { className, message, action, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn('flex flex-col items-start gap-s rounded-lg bg-card-green p-xl', className)}
      {...props}
    >
      <p className="font-pixform text-description uppercase text-fg-teal">{message}</p>
      {action}
    </div>
  )
})
