/** Fixed left navbar with scroll-spy. Lists token sections + Atoms/Molecules/
 *  Organisms with per-component sub-anchors. Active item highlights on scroll. */
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

interface NavItem {
  id: string
  label: string
  children?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'fonts', label: 'Fonts' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'borders', label: 'Borders' },
  { id: 'shadows', label: 'Shadows' },
  {
    id: 'atoms',
    label: 'Atoms',
    children: [
      'interactive', 'button', 'input', 'textarea', 'dropdown', 'tag', 'status', 'switch', 'flag', 'icon', 'avatar', 'avatargroup', 'bar', 'graph', 'switchgroup', 'errormessage', 'listitem',
    ].map((s) => ({ id: `atom-${s}`, label: s })),
  },
  {
    id: 'molecules',
    label: 'Molecules',
    children: [
      'profile', 'node', 'notification', 'cardmetric', 'campaignpreview', 'projectpreview', 'experiencepreview', 'team', 'attempt',
    ].map((s) => ({ id: `mol-${s}`, label: s })),
  },
  {
    id: 'organisms',
    label: 'Organisms',
    children: [
      'menuswitch', 'topmenu', 'secondrow', 'header', 'kanban', 'task', 'cardtop',
    ].map((s) => ({ id: `org-${s}`, label: s })),
  },
]

const TOP_IDS = NAV.map((n) => n.id)

export default function Sidebar() {
  const [active, setActive] = useState('fonts')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    )
    TOP_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col gap-xxs overflow-y-auto border-r border-line bg-surface-card px-m py-l">
      <span className="mb-s font-instrument text-h3 text-fg">DS Preview</span>
      {/* Pages — links into the app (mirror Figma frame names) + release notes */}
      <div className="mb-s mt-l flex flex-col gap-px border-t border-line pt-s">
        <span className="px-xs font-pixform text-caps uppercase tracking-widest text-fg-muted">Pages</span>
        {[
          { href: '/pages/all_teams', label: 'All_teams' },
          { href: '/pages/candidate', label: 'Candidate' },
          { href: '/pages/hiring_campaign', label: 'Hiring_campaign' },
        ].map((p) => (
          <a key={p.href} href={p.href} className="rounded-sm px-xs py-xxs font-accurat text-grotesk text-fg-muted hover:text-fg">
            {p.label}
          </a>
        ))}
        <a href="/preview/release-notes" className="rounded-sm px-xs py-xxs font-accurat text-grotesk text-fg-muted hover:text-fg">
          Release notes
        </a>
      </div>
      {NAV.map((item) => {
        const isActive = active === item.id
        return (
          <div key={item.id} className="flex flex-col">
            <a
              href={`#${item.id}`}
              className={cn(
                'rounded-sm px-xs py-xxs font-accurat text-grotesk transition-colors duration-150 ease-out',
                isActive ? 'bg-control text-fg' : 'text-fg-muted hover:text-fg',
              )}
            >
              {item.label}
            </a>
            {item.children && isActive && (
              <div className="flex flex-col gap-px py-xxs pl-s">
                {item.children.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="rounded-sm px-xs py-px font-pixform text-caps uppercase tracking-widest text-fg-muted hover:text-fg"
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
