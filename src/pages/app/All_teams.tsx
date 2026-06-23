/** Page: All_teams — mirrors Figma frame "All_teams" (357:58932).
 *  Header + CardTop(Variant2) + 4 metric cards + 6 Team cards.
 *  Column = max-w-base centered, section gaps = space/xxs (matches Figma 4px). */
import { useState } from 'react'
import { Header, CardTop } from '@/components/organisms'
import { CardMetric, Team } from '@/components/molecules'

const AV = [{ fallback: 'KA' }, { fallback: 'DO' }, { fallback: 'PE' }, { fallback: 'AL' }, { fallback: 'MI' }]
const METRICS = [
  { title: 'Health', tone: 'bg-card-pink', data: [8, 5], label: 'Overall: Good' },
  { title: 'Productivity', tone: 'bg-card-green', data: [6, 9], label: '89% this week' },
  { title: 'Distribution', tone: 'bg-card-violet', data: [4, 7, 5], label: 'Balanced' },
  { title: 'Hiring', tone: 'bg-card-yellow', data: [9, 3], label: '12 open roles' },
]

export default function All_teams() {
  const [view, setView] = useState('all')
  return (
    <div className="min-h-screen bg-surface-base">
      {/* full-bleed hero flush to the very top (y=0); the transparent Header floats
          on top of it via CardTop's header slot — image bleeds up behind the header */}
      <CardTop
        property1="Variant2"
        name="All teams"
        role="Overview of all teams and their performance metrics"
        image="/cardtop/variant2.png"
        header={<Header activeTab="all" />}
        actions={[{ label: 'Add team' }]}
        switchOptions={[{ value: 'all', label: 'All' }, { value: 'eng', label: 'Eng' }, { value: 'design', label: 'Design' }]}
        switchValue={view}
        onSwitch={setView}
        className="max-w-none rounded-none"
      />
      <div className="mx-auto flex w-full max-w-base flex-col gap-xxs px-l py-xxs">
        <div className="grid grid-cols-4 gap-xxs">
          {METRICS.map((m) => (
            <CardMetric key={m.title} title={m.title} data={m.data} label={m.label} className={`w-full ${m.tone}`} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-xxs">
          {Array.from({ length: 6 }).map((_, i) => (
            <Team
              key={i}
              className="w-full"
              name="Engineering Team"
              count={24}
              productivity={[89, 72, 64, 91, 55, 80][i]}
              highlight="Petya was drinking too much tea this week"
              avatars={AV}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
