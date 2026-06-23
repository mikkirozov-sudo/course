import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Bar } from '@/components/atoms'
import { TopMenu, type TopMenuTab } from './TopMenu'
import { SecondRow } from './SecondRow'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  brand?: string
  crumbs?: string[]
  stages?: string[]
  /** 0–100 pipeline progress for the stepper */
  progress?: number
  activeTab?: TopMenuTab
}

/** Page header: TopMenu + SecondRow + a dotted stage stepper (Bar + caps labels).
 *  Composes TopMenu + SecondRow + Bar. */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    className,
    brand = 'Hired & Wired',
    crumbs = ['Home', 'Something', 'Something'],
    stages = ['Applied', 'Interviewed', 'Onboarding', 'Half-term', 'Common', 'Leads team', 'Minus one', 'C-level', 'Fired'],
    progress = 35,
    activeTab = 'all',
    ...props
  },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cn('flex w-full flex-col', className)}
      {...props}
    >
      <TopMenu brand={brand} activeTab={activeTab} />
      <SecondRow crumbs={crumbs} className="px-s py-xs" />
      <div className="flex flex-col gap-xs px-s py-xs">
        <Bar value={progress} segments={stages.length * 8} />
        <div className="flex w-full justify-between">
          {stages.map((s) => (
            <span key={s} className="flex-1 font-pixform text-caps uppercase tracking-widest text-fg-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
})
