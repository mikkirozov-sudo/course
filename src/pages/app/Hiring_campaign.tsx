/** Page: Hiring_campaign — mirrors Figma frame "Hiring_campaign" (357:59066).
 *  Header + CardTop(Default) + Task list + 3 metric cells + CampaignPreview +
 *  full-width Kanban. Section gaps = space/xxs. */
import { Header, CardTop, Task, Kanban } from '@/components/organisms'
import { CampaignPreview } from '@/components/molecules'

const TASKS = [
  { title: 'Confirm budget allocation', active: true },
  { title: 'Define role requirements and job description', active: true, error: 'Error! Some field need your attention' },
  { title: 'Post job to job boards', active: true, error: 'Error! Some field need your attention' },
  { title: 'Review applications', active: false, error: 'Error! Some field need your attention' },
  { title: 'Conduct initial interviews', active: false },
  { title: 'Onboarding paperwork', active: false, error: 'Error! Some field need your attention' },
]
const STATS = [
  { label: 'Applications', value: '142', sub: 'Total received' },
  { label: 'in Progress', value: '28', sub: 'Active candidates' },
  { label: 'Conversion Rate', value: '19.7%', sub: 'Offer ratio' },
]
const CANDS = (n: number) =>
  [
    { name: 'Michael Thompson', role: 'Product manager' },
    { name: 'Emily Carter', role: 'UX designer' },
    { name: 'James Wilson', role: 'Data analyst' },
    { name: 'Olivia Brown', role: 'Marketing specialist' },
    { name: 'Daniel Lee', role: 'Systems administrator' },
    { name: 'Laura Wilson', role: 'Product owner' },
  ].slice(0, n)

export default function Hiring_campaign() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Header activeTab="all" />
      <div className="mx-auto flex w-full max-w-base flex-col gap-xxs px-l py-xxs">
        <CardTop
          property1="Default"
          name="Senior Frontend Developer Campaign"
          role="Active Campaign"
          topLeft="CAMPAIGN"
          topRight="active"
          image="/cardtop/default.png"
          actions={[{ label: 'edit' }, { label: 'pause' }]}
          leftDropdowns={[
            { options: [{ value: 'fe', label: 'frontend-team' }], value: 'fe' },
            { options: [{ value: 'sr', label: 'Senior level' }], value: 'sr' },
          ]}
          rightDropdowns={[{ options: [{ value: 'p1', label: 'Priority 1' }], value: 'p1' }]}
        />

        {/* Tasks */}
        <div className="flex flex-col gap-l rounded-lg border border-line bg-surface-card p-xl">
          <h2 className="font-accurat text-h3 text-fg">Task</h2>
          <div className="flex flex-col">
            {TASKS.map((t) => (
              <Task key={t.title} title={t.title} active={t.active} error={t.error} />
            ))}
          </div>
        </div>

        {/* 3 metric cells */}
        <div className="grid grid-cols-3 rounded-lg border border-line bg-surface-card">
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-l p-xl ${i > 0 ? 'border-l border-line' : ''}`}>
              <span className="font-accurat text-caps uppercase tracking-widest text-fg-muted">{s.label}</span>
              <span className="font-instrument text-h1 text-fg">{s.value}</span>
              <span className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{s.sub}</span>
            </div>
          ))}
        </div>

        <CampaignPreview
          title="Funnel"
          metrics={[
            { value: 142, label: 'applied' },
            { value: 89, label: 'rejected' },
            { value: 282, label: 'in progress' },
            { value: 31, label: 'final round' },
            { value: 4, label: 'offers sent' },
          ]}
        />
      </div>

      {/* full-width Kanban */}
      <div className="mx-auto w-full px-l py-xxs">
        <h2 className="mb-m text-center font-instrument text-h1 text-fg">Pipeline</h2>
        <Kanban
          columns={[
            { title: 'Applied', candidates: CANDS(4) },
            { title: 'Screening', candidates: CANDS(6) },
            { title: 'Interview', candidates: CANDS(3) },
            { title: 'Offer', candidates: CANDS(1) },
          ]}
        />
      </div>
    </div>
  )
}
