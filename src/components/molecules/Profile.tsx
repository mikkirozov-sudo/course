import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Avatar, Bar } from '@/components/atoms'

/** Avatar + name + role. long → full row with status Bar; short → pink chip;
 *  short-outlined → bordered chip. (Composes Avatar + Bar.) */
const wrap = cva('flex items-center gap-s', {
  variants: {
    variant: {
      long: 'w-full',
      short: 'rounded-lg bg-card-pink p-s',
      'short-outlined': 'rounded-lg border border-line bg-surface-card p-s',
    },
  },
  defaultVariants: { variant: 'long' },
})

export interface ProfileProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof wrap> {
  name: string
  role: string
  avatarSrc?: string
  /** 0–100 status bar, only shown on `long` */
  progress?: number
}

export const Profile = forwardRef<HTMLDivElement, ProfileProps>(function Profile(
  { className, variant = 'long', name, role, avatarSrc, progress = 70, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(wrap({ variant }), className)} {...props}>
      <Avatar src={avatarSrc} fallback={name.slice(0, 2)} size="md" />
      <div className="flex flex-col gap-xxxs">
        <span className="font-accurat text-h4 text-fg">{name}</span>
        <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{role}</span>
      </div>
      {variant === 'long' && (
        <div className="ml-auto w-40">
          <Bar value={progress} />
        </div>
      )}
    </div>
  )
})
