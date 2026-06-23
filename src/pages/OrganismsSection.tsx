/** Organisms gallery for /preview — composed from molecules + atoms. */
import { useState } from 'react'
import { MenuSwitch, TopMenu, SecondRow, Header, Kanban, Task, CardTop, type TopMenuTab } from '@/components/organisms'

function slug(t: string) {
  return t.toLowerCase().split(/[ (]/)[0]
}
function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div id={`org-${slug(title)}`} className="flex scroll-mt-l flex-col gap-s border-b border-line pb-l">
      <h3 className="font-accurat text-h4 text-fg">{title}</h3>
      <div className="flex flex-col gap-m">{children}</div>
    </div>
  )
}

const CANDIDATES = (n: number) =>
  [
    { name: 'Michael Thompson', role: 'Product manager' },
    { name: 'Emily Carter', role: 'UX designer' },
    { name: 'James Wilson', role: 'Data analyst' },
    { name: 'Olivia Brown', role: 'Marketing specialist' },
    { name: 'Daniel Lee', role: 'Systems administrator' },
    { name: 'Laura Wilson', role: 'Product owner' },
  ].slice(0, n)

export default function OrganismsSection() {
  const [tab, setTab] = useState<TopMenuTab>('all')
  const [menu, setMenu] = useState(true)

  return (
    <section id="organisms" className="flex scroll-mt-l flex-col gap-l pt-l">
      <p className="font-accurat text-grotesk text-fg-muted">7 organisms · composed from molecules + atoms</p>

      <Demo title="MenuSwitch (on / off)">
        <div className="flex gap-s">
          <MenuSwitch active={menu} onClick={() => setMenu(true)}>All teams</MenuSwitch>
          <MenuSwitch active={!menu} onClick={() => setMenu(false)}>All teams</MenuSwitch>
        </div>
      </Demo>

      <Demo title="TopMenu (all / templates / off)">
        <TopMenu activeTab={tab} onTab={setTab} />
      </Demo>

      <Demo title="SecondRow (default / builder)">
        <SecondRow variant="default" />
        <SecondRow variant="builder" />
      </Demo>

      <Demo title="Header (TopMenu + SecondRow + stepper)">
        <Header progress={35} />
      </Demo>

      <Demo title="Kanban">
        <Kanban
          columns={[
            { title: 'Applied', candidates: CANDIDATES(4) },
            { title: 'Screening', candidates: CANDIDATES(6) },
            { title: 'Interview', candidates: CANDIDATES(3) },
            { title: 'Offer', candidates: CANDIDATES(1) },
          ]}
        />
      </Demo>

      <Demo title="Task (active / done)">
        <Task active title="Define role requirements and job description" error="Error! Some field need your attention" />
        <Task active={false} title="Define role requirements and job description" error="Error! Some field need your attention" />
      </Demo>

      <Demo title="CardTop (Default / Variant2)">
        <CardTop
          property1="Default"
          name="Sarah Mitchell"
          role="Senior Software Engineer"
          image="/cardtop/default.png"
          actions={[{ label: 'promote' }, { label: 'negotiate' }, { label: 'suspend' }, { label: 'fire' }]}
          leftDropdowns={[
            { options: [{ value: 'fe', label: 'frontend-team' }], value: 'fe' },
            { options: [{ value: 'il', label: 'Innovation Lab' }], value: 'il' },
            { options: [{ value: 'ld', label: 'Lead Developer' }], value: 'ld' },
            { options: [{ value: 'm', label: 'Member' }], value: 'm' },
          ]}
          rightDropdowns={[{ options: [{ value: 'l4', label: 'LEVEL 4 (CODE RED)' }], value: 'l4' }]}
        />
        <CardTop
          property1="Variant2"
          name="Sarah Mitchell"
          role="Senior Software Engineer"
          image="/cardtop/variant2.png"
          actions={[{ label: 'promote' }, { label: 'negotiate' }, { label: 'suspend' }, { label: 'fire' }]}
          switchOptions={[{ value: 'a', label: 'Team' }, { value: 'b', label: 'Team' }, { value: 'c', label: 'Team' }]}
          switchValue="a"
        />
      </Demo>
    </section>
  )
}
