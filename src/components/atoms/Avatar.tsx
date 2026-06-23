import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
  /** fallback text (initials) when no image */
  fallback?: string
  size?: 'sm' | 'md'
}

/** Circular avatar. Image or initials fallback on bg-control. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, src, alt = '', fallback, size = 'md', ...props },
  ref,
) {
  const dim = size === 'md' ? 'size-8' : 'size-6'
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-control',
        dim,
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <span className="font-pixform text-pixel uppercase text-fg-muted">{fallback ?? alt.slice(0, 2)}</span>
      )}
    </span>
  )
})
