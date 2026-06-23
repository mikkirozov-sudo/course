/** /preview — live token gallery. Every swatch/scale/ramp renders from the
 *  token registries in @tokens using REAL Tailwind utility classes. Sections
 *  populate automatically as tokens land. */
import { useEffect, useState } from 'react'
import {
  colorGroups,
  spacingScale,
  radiusScale,
  fonts,
  borders,
  shadows,
  typography,
  tokenCounts,
  CONSUMPTION_RULE,
} from '@tokens'
import FontCheck from '@/components/FontCheck'
import AtomsSection from './AtomsSection'
import MoleculesSection from './MoleculesSection'
import OrganismsSection from './OrganismsSection'
import Sidebar from './Sidebar'

function Section({ id, title, count, children }: { id: string; title: string; count?: number; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-l flex-col gap-m border-t border-line pt-l">
      <div className="flex items-baseline gap-s">
        <h2 className="font-instrument text-h2">{title}</h2>
        {count !== undefined && <span className="font-accurat text-grotesk text-fg-muted">{count} tokens</span>}
      </div>
      {children}
    </section>
  )
}

/** Big visual break between top-level layers. */
function BigDivider({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mt-xl flex flex-col gap-xs border-t-4 border-fg pt-m">
      <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{eyebrow}</span>
      <h2 className="font-instrument text-h1 text-fg">{title}</h2>
    </div>
  )
}

export default function Preview() {
  const [wireframe, setWireframe] = useState(false)

  const setTheme = (on: boolean) => {
    setWireframe(on)
    document.documentElement.setAttribute('data-theme', on ? 'wireframe' : 'brand')
  }

  // allow ?theme=wireframe to preset the mode (useful for snapshots)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('theme')
    if (t === 'wireframe') setTheme(true)
  }, [])

  const colorCount = colorGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="ml-56">
      <Sidebar />
      <div className="mx-auto flex max-w-5xl flex-col gap-xl px-l py-xl">
      {/* header */}
      <header className="flex flex-col gap-m">
        <div className="flex items-center justify-between">
          <h1 className="font-instrument text-h1">Main tokens</h1>
          <button
            type="button"
            onClick={() => setTheme(!wireframe)}
            className="rounded-full border border-line bg-surface-card px-m py-xs font-accurat text-grotesk text-fg"
          >
            Theme: {wireframe ? 'wireframe' : 'brand'} — toggle
          </button>
        </div>
        <p className="font-accurat text-grotesk text-fg-muted">{CONSUMPTION_RULE}</p>
        <p className="font-accurat text-grotesk text-fg-muted">
          Figma extracted {tokenCounts.figmaExtracted} · primitives {tokenCounts.primitives} · semantic {tokenCounts.semantic}
        </p>
        <FontCheck />
      </header>

      {/* Fonts */}
      <Section id="fonts" title="Fonts" count={fonts.length}>
        <div className="flex flex-col gap-s">
          {fonts.map((f) => (
            <div key={f.token} className="flex items-baseline gap-m">
              <span className={`${f.className} text-h3 w-64`}>Ag — The quick brown fox</span>
              <code className="font-accurat text-grotesk text-fg-muted">{f.token}</code>
              <span className="font-accurat text-grotesk text-fg-muted">{f.family}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Colors */}
      <Section id="colors" title="Colors" count={colorCount}>
        <div className="flex flex-col gap-l">
          {colorGroups.map((g) => (
            <div key={g.label} className="flex flex-col gap-s">
              <h3 className="font-accurat text-h4">{g.label}</h3>
              <div className="grid grid-cols-2 gap-s sm:grid-cols-3 md:grid-cols-4">
                {g.items.map((c) => (
                  <div key={c.token} className="flex flex-col gap-xxs">
                    <div className={`h-16 rounded-md border border-line ${c.swatch}`} />
                    <code className="font-accurat text-grotesk text-fg">{c.token}</code>
                    <code className="font-accurat text-caps text-fg-muted uppercase">{c.value}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section id="typography" title="Typography" count={Object.keys(typography).length}>
        <div className="flex flex-col gap-m">
          {Object.entries(typography).map(([key, t]) => (
            <div key={key} className="flex flex-col gap-xxs border-b border-line pb-s">
              <div className="flex items-baseline gap-s">
                <code className="font-accurat text-grotesk text-fg-muted w-28">{`text-${key}`}</code>
                <span className="font-accurat text-caps text-fg-muted uppercase">
                  {t.family} · {t.sizePx}/{t.lineHeightPx} · {t.weight}
                </span>
              </div>
              <p className={t.className}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section id="spacing" title="Spacing" count={spacingScale.length}>
        <div className="flex flex-col gap-xs">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex items-center gap-s">
              <code className="font-accurat text-grotesk text-fg w-16">{s.token}</code>
              <code className="font-accurat text-caps text-fg-muted w-12">{s.value}</code>
              <div className={`h-4 ${s.sizeClass} bg-tech-purple rounded-sm`} />
            </div>
          ))}
        </div>
      </Section>

      {/* Radius */}
      <Section id="radius" title="Radius" count={radiusScale.length}>
        <div className="flex flex-wrap gap-l">
          {radiusScale.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-xxs">
              <div className={`h-20 w-20 border border-line bg-card-violet ${r.sizeClass}`} />
              <code className="font-accurat text-grotesk text-fg">{r.token}</code>
              <code className="font-accurat text-caps text-fg-muted">{r.value}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* Borders */}
      <Section id="borders" title="Borders" count={borders.length}>
        <div className="flex flex-wrap gap-l">
          {borders.map((b) => (
            <div key={b.token} className="flex flex-col items-center gap-xxs">
              <div className={`h-20 w-20 rounded-md bg-surface-card ${b.demo}`} />
              <code className="font-accurat text-grotesk text-fg">{b.token}</code>
              <code className="font-accurat text-caps text-fg-muted">{b.value}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section id="shadows" title="Shadows" count={shadows.length}>
        {shadows.length === 0 ? (
          <p className="font-accurat text-grotesk text-fg-muted">
            No shadow/effect tokens in source (0 effect styles in Figma). Section reserved for Step 3+ if shadows are introduced.
          </p>
        ) : (
          <div className="flex flex-wrap gap-l">
            {shadows.map((s) => (
              <div key={s.token} className={`h-20 w-20 rounded-md bg-surface-card ${s.demo}`} />
            ))}
          </div>
        )}
      </Section>

      <BigDivider eyebrow="Components — level 1" title="Atoms" />
      <AtomsSection />
      <BigDivider eyebrow="Components — level 2" title="Molecules" />
      <MoleculesSection />
      <BigDivider eyebrow="Components — level 3" title="Organisms" />
      <OrganismsSection />
      </div>
    </div>
  )
}
