/** Molecules gallery for /preview — each molecule composed from atoms, all
 *  variants, DS utilities only. */
import {
  Profile,
  Node,
  CampaignPreview,
  ProjectPreview,
  ExperiencePreview,
  Team,
  CardMetric,
  CardMetricAlt,
  Attempt,
  Notification,
} from '@/components/molecules'
import { Button } from '@/components/atoms'

function slug(t: string) {
  return t.toLowerCase().split(/[ (]/)[0]
}
function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div id={`mol-${slug(title)}`} className="flex scroll-mt-l flex-col gap-s border-b border-line pb-l">
      <h3 className="font-accurat text-h4 text-fg">{title}</h3>
      <div className="flex flex-wrap items-start gap-m">{children}</div>
    </div>
  )
}

const AV = [{ fallback: 'KA' }, { fallback: 'DO' }, { fallback: 'PE' }, { fallback: 'AL' }, { fallback: 'MI' }]

export default function MoleculesSection() {
  return (
    <section id="molecules" className="flex scroll-mt-l flex-col gap-l pt-l">
      <p className="font-accurat text-grotesk text-fg-muted">10 molecules · composed from atoms · DS utilities only</p>

      <Demo title="Profile (long / short / short-outlined)">
        <div className="flex w-full flex-col gap-s">
          <Profile variant="long" name="Sarah Johnson" role="Senior Developer" progress={72} />
          <div className="flex gap-m">
            <Profile variant="short" name="Sarah Johnson" role="Senior Developer" />
            <Profile variant="short-outlined" name="Sarah Johnson" role="Senior Developer" />
          </div>
        </div>
      </Demo>

      <Demo title="Node">
        <Node title="Start Trigger" subtitle="New application received" />
      </Demo>

      <Demo title="Notification">
        <Notification
          message="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip."
          action={<Button variant="onColor">More info</Button>}
        />
      </Demo>

      <Demo title="CardMetric (Health) / CardMetricAlt">
        <CardMetric title="Health" data={[8, 5]} label="Overall: Good" />
        <CardMetricAlt title="Applications" value={142} label="Total received" />
      </Demo>

      <Demo title="CampaignPreview">
        <CampaignPreview
          title="Senior DevOps"
          status={{ intent: 'green', label: 'on track' }}
          metrics={[
            { value: 142, label: 'applied' },
            { value: 89, label: 'rejected' },
            { value: 282, label: 'in progress' },
            { value: 31, label: 'final round' },
            { value: 4, label: 'offers sent' },
          ]}
        />
      </Demo>

      <Demo title="ProjectPreview">
        <ProjectPreview
          title="Full-stack e-commerce solution with React frontend and Node.js backend"
          description="Full-stack e-commerce solution with React frontend and Node.js backend"
          tags={['React', 'Node.js', 'MongoDB', 'WebSocket']}
        />
      </Demo>

      <Demo title="ExperiencePreview">
        <ExperiencePreview
          period="Jan 2022 — present (3 years)"
          title="Senior Frontend Developer"
          company="TechCorp Solutions"
          description="Led development of React applications, mentored junior developers, improved performance by 40%."
        />
      </Demo>

      <Demo title="Team">
        <Team
          name="Engineering Team"
          count={24}
          productivity={89}
          highlight="Petya was drinking too much tea this week"
          avatars={AV}
        />
      </Demo>

      <Demo title="Attempt (default / next)">
        <div className="flex w-full flex-col gap-s">
          <Attempt
            variant="default"
            title="First attempt"
            failed
            left={{ amount: '$8 750', labels: ['lead role', 'cookies', 'free education'] }}
            right={{ amount: '$12 750', labels: ['lead role', 'remote-work', 'gym'] }}
          />
          <Attempt
            variant="next"
            title="Next attempt"
            left={{ amount: '$?', labels: ['lead role', 'cookies', 'gym'] }}
            right={{ amount: '$?', labels: ['lead role', 'cookies', 'gym'] }}
          />
        </div>
      </Demo>
    </section>
  )
}
