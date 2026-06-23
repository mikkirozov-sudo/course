/** Font-loaded check shown at the top of /preview. Verifies each local
 *  @font-face family actually resolved (not a system fallback). */
import { useEffect, useState } from 'react'

const FAMILIES = [
  { label: 'Instrument Serif', css: "16px 'Instrument Serif'", className: 'font-instrument' },
  { label: 'Akkurat LL', css: "16px 'Akkurat LL'", className: 'font-accurat' },
  { label: 'Pixform', css: "16px 'Pixform'", className: 'font-pixform' },
]

type Status = 'loading' | 'loaded' | 'missing'

export default function FontCheck() {
  const [status, setStatus] = useState<Record<string, Status>>(
    Object.fromEntries(FAMILIES.map((f) => [f.label, 'loading'])),
  )

  useEffect(() => {
    let active = true
    document.fonts.ready.then(() => {
      if (!active) return
      const next: Record<string, Status> = {}
      for (const f of FAMILIES) {
        next[f.label] = document.fonts.check(f.css) ? 'loaded' : 'missing'
      }
      setStatus(next)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="flex flex-wrap gap-xs">
      {FAMILIES.map((f) => {
        const s = status[f.label]
        const tone =
          s === 'loaded'
            ? 'bg-card-green text-fg'
            : s === 'missing'
              ? 'bg-card-red text-fg'
              : 'bg-control text-fg-muted'
        return (
          <div key={f.label} className={`flex items-center gap-xs rounded-md px-s py-xs ${tone}`}>
            <span className={`text-h4 ${f.className}`}>Ag</span>
            <span className="font-accurat text-grotesk">
              {f.label}: {s === 'loaded' ? '✓ loaded' : s === 'missing' ? '✗ missing' : '… loading'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
