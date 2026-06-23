import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION } from '@/lib/motion'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  invalid?: boolean
}

/** Multiline input. Same token surface as Input; taller field. */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, label, invalid, id, disabled, rows = 3, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={cn('flex w-full flex-col gap-xs', disabled && 'opacity-50')}>
      {label && (
        <label htmlFor={inputId} className="font-accurat text-caps uppercase tracking-widest text-fg">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full rounded-sm bg-control px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg',
          TRANSITION,
          'placeholder:text-fg-muted hover:bg-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg',
          invalid && 'bg-oncard-red text-tech-red',
          className,
        )}
        {...props}
      />
    </div>
  )
})
