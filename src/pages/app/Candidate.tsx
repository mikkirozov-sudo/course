/** Page: Candidate — mirrors Figma frame "Candidate" (357:59014).
 *  Header + CardTop(Default) + Notification + Achievements + Personal
 *  Development + Reports/Mentoring. Section gaps = space/xxs. */
import { Header, CardTop } from '@/components/organisms'
import { Notification, Profile } from '@/components/molecules'
import { Bar, Button } from '@/components/atoms'

function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-l rounded-lg border border-line bg-surface-card p-xl">{children}</div>
}

const DROPDOWNS = [
  { options: [{ value: 'fe', label: 'frontend-team' }], value: 'fe' },
  { options: [{ value: 'il', label: 'Innovation Lab' }], value: 'il' },
  { options: [{ value: 'ld', label: 'Lead Developer' }], value: 'ld' },
  { options: [{ value: 'm', label: 'Member' }], value: 'm' },
]
const ACH = [
  { name: 'Top performer', date: 'Q4 2024' },
  { name: 'Team player', date: 'Q4 2024' },
  { name: 'Innovator', date: 'Q4 2023' },
  { name: 'Mentor', date: 'Q4 2025' },
]
const STAGES = ['onboarding', 'adapting', 'performing', 'ready']
const REPORTS = [
  { name: 'Michael Lee', role: 'Product manager', bg: 'bg-card-pink' },
  { name: 'Emily Carter', role: 'UX designer', bg: 'bg-card-green' },
  { name: 'David Smith', role: 'Data analyst', bg: 'bg-card-violet' },
]
const MENTOR = [
  { name: 'Michael Thompson', role: 'Product manager', bg: 'bg-card-green' },
  { name: 'Emily Davis', role: 'UX designer', bg: 'bg-card-violet' },
  { name: 'James Wilson', role: 'Data analyst', bg: 'bg-card-pink' },
]

export default function Candidate() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Header activeTab="templates" />
      <div className="mx-auto flex w-full max-w-base flex-col gap-xxs px-l py-xxs">
        <CardTop
          property1="Default"
          name="Sarah Mitchell"
          role="Senior Software Engineer"
          image="/cardtop/default.png"
          actions={[{ label: 'promote' }, { label: 'negotiate' }, { label: 'suspend' }, { label: 'fire' }]}
          leftDropdowns={DROPDOWNS}
          rightDropdowns={[{ options: [{ value: 'l4', label: 'LEVEL 4 (CODE RED)' }], value: 'l4' }]}
        />

        <Notification
          message="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip."
          action={<Button variant="onColor">More info</Button>}
        />

        {/* Achievements */}
        <div className="flex flex-col gap-l rounded-lg bg-card-yellow p-xl">
          <h2 className="font-accurat text-h3 text-fg">Achievements</h2>
          <div className="flex flex-wrap justify-between gap-l">
            {ACH.map((a) => (
              <div key={a.name} className="flex flex-col gap-xxs">
                <span className="font-accurat text-h4 text-fg">{a.name}</span>
                <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{a.date}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" className="self-start">All achievements</Button>
        </div>

        {/* Personal Development */}
        <Card>
          <h2 className="font-accurat text-h3 text-fg">Personal Development</h2>
          <div className="flex flex-col gap-xxs">
            <Bar value={62} size="big" segments={64} />
            <div className="flex w-full justify-between">
              {STAGES.map((s) => (
                <span key={s} className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-s">
            <div className="flex flex-col gap-xxxs">
              <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">Next Level</span>
              <span className="font-accurat text-h4 text-fg">Lead Software Engineer</span>
            </div>
            <div className="flex flex-col gap-xxxs">
              <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">Prediction:</span>
              <span className="font-accurat text-h4 text-fg">February 2026</span>
            </div>
          </div>
          <Button variant="secondary" className="self-start">Details</Button>
        </Card>

        {/* Reports / Mentoring */}
        <Card>
          <div className="flex flex-col gap-s">
            <h2 className="font-accurat text-h3 text-fg">Reports to</h2>
            <div className="flex flex-wrap gap-xs">
              {REPORTS.map((p) => (
                <Profile key={p.name} variant="short" name={p.name} role={p.role} className={p.bg} />
              ))}
            </div>
            <Button variant="secondary" className="self-start">Org chart</Button>
          </div>
          <div className="flex flex-col gap-s">
            <h2 className="font-accurat text-h3 text-fg">Mentoring:</h2>
            <div className="flex flex-wrap gap-xs">
              {MENTOR.map((p) => (
                <Profile key={p.name} variant="short" name={p.name} role={p.role} className={p.bg} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
