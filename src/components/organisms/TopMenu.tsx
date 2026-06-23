import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { TRANSITION, FOCUS } from '@/lib/motion'
import { Button } from '@/components/atoms'
import { MenuSwitch } from './MenuSwitch'

export type TopMenuTab = 'all' | 'templates' | 'off'

export interface TopMenuProps extends HTMLAttributes<HTMLElement> {
  brand?: string
  activeTab?: TopMenuTab
  onTab?: (tab: TopMenuTab) => void
  onReport?: () => void
}

/** Top navigation bar: brand + report Button + tab switches + account links.
 *  Composes Button + MenuSwitch. */
export const TopMenu = forwardRef<HTMLElement, TopMenuProps>(function TopMenu(
  { className, brand = 'Hired & Wired', activeTab = 'all', onTab, onReport, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      className={cn('flex w-full items-center justify-between px-s py-xs', className)}
      {...props}
    >
      <div className="flex items-center gap-xxl">
        <span className="font-instrument text-h3 text-fg">{brand}</span>
        <div className="flex items-center gap-m">
          {/* Figma header button: white pill (onColor) */}
          <Button variant="onColor" onClick={onReport}>
            Generate report
          </Button>
          <div role="tablist" className="flex items-center gap-xs">
            <MenuSwitch active={activeTab === 'all'} onClick={() => onTab?.('all')}>
              All teams
            </MenuSwitch>
            <MenuSwitch active={activeTab === 'templates'} onClick={() => onTab?.('templates')}>
              All templates
            </MenuSwitch>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-m">
        {['Profile', 'Log out'].map((l) => (
          <button
            key={l}
            type="button"
            className={cn('font-accurat text-grotesk text-fg-muted hover:text-fg', TRANSITION, FOCUS)}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
  )
})
