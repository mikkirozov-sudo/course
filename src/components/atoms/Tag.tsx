import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

/** Small label pill. control → bg-control (neutral); static → bg-card-pink. */
const tag = cva(
  'inline-flex items-center rounded-sm px-xs py-xxs font-pixform text-pixel uppercase tracking-widest text-fg',
  {
    variants: {
      variant: {
        control: 'bg-control',
        static: 'bg-card-pink',
      },
    },
    defaultVariants: { variant: 'control' },
  },
)

export interface TagProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tag> {}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, variant = 'control', ...props },
  ref,
) {
  return <span ref={ref} className={cn(tag({ variant }), className)} {...props} />
})
