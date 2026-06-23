import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION } from '@/lib/motion'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  invalid?: boolean
}

/** Text input. Field: bg-control rounded-sm px-s py-xs; value Pixform caps.
 *  Label: Akkurat caps. (Tokens confirmed via Figma get_design_context.) */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, invalid, id, disabled, ...props },
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
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'h-8 w-full rounded-sm bg-control px-s py-xs font-pixform text-pixel uppercase tracking-widest text-fg',
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
