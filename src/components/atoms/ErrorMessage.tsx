import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {}

/** Inline error banner (role=alert). bg-oncard-red, text-tech-red, caps. */
export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(function ErrorMessage(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'inline-flex items-center rounded-sm bg-oncard-red px-s py-xs font-pixform text-pixel uppercase tracking-widest text-tech-red',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
