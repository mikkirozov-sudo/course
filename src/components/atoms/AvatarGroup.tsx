import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Avatar, type AvatarProps } from './Avatar'

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'fallback'>[]
  max?: number
  size?: 'sm' | 'md'
}

/** Overlapping avatar stack with +N overflow. Ring uses surface-base to separate. */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { className, avatars, max = 4, size = 'md', ...props },
  ref,
) {
  const shown = avatars.slice(0, max)
  const overflow = avatars.length - shown.length
  return (
    <div ref={ref} className={cn('flex items-center', className)} {...props}>
      {shown.map((a, i) => (
        <Avatar
          key={i}
          {...a}
          size={size}
          className={cn('ring-2 ring-surface-base', i > 0 && '-ml-xs')}
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-control ring-2 ring-surface-base -ml-xs',
            size === 'md' ? 'size-8' : 'size-6',
          )}
        >
          <span className="font-pixform text-pixel uppercase text-fg-muted">+{overflow}</span>
        </span>
      )}
    </div>
  )
})
