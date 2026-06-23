/** /preview/release-notes — renders NOTES.md as a readable changelog using DS
 *  typography tokens. Imported raw so every NOTES.md append is reflected here. */
import notes from '../../NOTES.md?raw'
import { Link } from 'react-router-dom'

function renderInline(text: string, key: number) {
  // **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <span key={key}>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**'))
          return <strong key={i} className="font-accurat text-bold text-fg">{p.slice(2, -2)}</strong>
        if (p.startsWith('`') && p.endsWith('`'))
          return <code key={i} className="rounded-sm bg-control px-xxs font-pixform text-pixel text-fg">{p.slice(1, -1)}</code>
        return p
      })}
    </span>
  )
}

export default function ReleaseNotes() {
  const lines = notes.split('\n')
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-s px-l py-xl">
      <Link to="/preview" className="font-pixform text-caps uppercase tracking-widest text-fg-muted hover:text-fg">
        ← back to preview
      </Link>
      {lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} className="mt-l font-accurat text-h3 text-fg">{renderInline(line.slice(4), i)}</h3>
        if (line.startsWith('## ')) return <h2 key={i} className="mt-xl font-instrument text-h2 text-fg">{renderInline(line.slice(3), i)}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="mt-xl font-instrument text-h1 text-fg">{renderInline(line.slice(2), i)}</h1>
        if (line.trim() === '---') return <hr key={i} className="my-m border-t-2 border-fg" />
        if (line.startsWith('- ')) return <li key={i} className="ml-m list-disc font-accurat text-grotesk text-fg">{renderInline(line.slice(2), i)}</li>
        if (line.trim() === '') return <div key={i} className="h-xxs" />
        return <p key={i} className="font-accurat text-grotesk text-fg">{renderInline(line, i)}</p>
      })}
    </div>
  )
}
