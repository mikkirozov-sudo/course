/** Atoms gallery for /preview — every atom rendered across all variants/states,
 *  styled only with DS Tailwind utilities. Interactive atoms use local state. */
import { useState } from 'react'
import {
  Button,
  Input,
  TextArea,
  Dropdown,
  Tag,
  Status,
  Switch,
  Flag,
  Avatar,
  AvatarGroup,
  Bar,
  Graph,
  ListItem,
  ErrorMessage,
  SwitchGroup,
  Icon,
  ICON_NAMES,
  STATUS_INTENTS,
} from '@/components/atoms'

function slug(t: string) {
  return t.toLowerCase().split(/[ (]/)[0]
}
function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div id={`atom-${slug(title)}`} className="flex scroll-mt-l flex-col gap-s border-b border-line pb-l">
      <h3 className="font-accurat text-h4 text-fg">{title}</h3>
      <div className="flex flex-wrap items-end gap-m">{children}</div>
    </div>
  )
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-xxs">
      <div className="flex min-h-16 items-center">{children}</div>
      <code className="font-pixform text-caps uppercase tracking-widest text-fg-muted">{label}</code>
    </div>
  )
}

export default function AtomsSection() {
  const [sw, setSw] = useState(true)
  const [swSmall, setSwSmall] = useState(false)
  const [flag, setFlag] = useState(true)
  const [seg, setSeg] = useState('design')
  const [team, setTeam] = useState<string>('frontend')
  const [teamEmpty, setTeamEmpty] = useState<string>('')
  const TEAMS = [
    { value: 'frontend', label: 'frontend-team' },
    { value: 'backend', label: 'backend-team' },
    { value: 'design', label: 'design-team' },
  ]

  return (
    <section id="atoms" className="flex scroll-mt-l flex-col gap-l pt-l">
      <p className="font-accurat text-grotesk text-fg-muted">16 atoms · all states · DS utilities only</p>

      <Demo title="Interactive states (forced — hover over live atoms too)">
        <Cell label="rest"><Button variant="secondary">More info</Button></Cell>
        <Cell label="hover"><Button variant="secondary" className="opacity-90">More info</Button></Cell>
        <Cell label="active"><Button variant="secondary" className="scale-95 opacity-80">More info</Button></Cell>
        <Cell label="focus"><Button variant="secondary" className="outline-2 outline-offset-2 outline-fg">More info</Button></Cell>
        <Cell label="disabled"><Button variant="secondary" disabled>More info</Button></Cell>
      </Demo>

      <Demo title="Button">
        <Cell label="secondary"><Button variant="secondary">More info</Button></Cell>
        <Cell label="onColor"><Button variant="onColor">More info</Button></Cell>
        <Cell label="small (cta)"><Button variant="small">More info</Button></Cell>
        <Cell label="big (cta)"><Button variant="big">More info</Button></Cell>
        <Cell label="node"><Button variant="node" subLabel="more info">FRONTEND-TEAM</Button></Cell>
        <Cell label="outline (green)"><Button variant="outline">Back</Button></Cell>
        <Cell label="disabled"><Button variant="secondary" disabled>More info</Button></Cell>
      </Demo>

      <Demo title="Input">
        <Cell label="default"><Input label="head line" defaultValue="Michael Lee" className="w-40" /></Cell>
        <Cell label="placeholder"><Input label="head line" placeholder="type here" className="w-40" /></Cell>
        <Cell label="error"><Input label="head line" defaultValue="oops" invalid className="w-40" /></Cell>
        <Cell label="disabled"><Input label="head line" defaultValue="Michael Lee" disabled className="w-40" /></Cell>
      </Demo>

      <Demo title="TextArea">
        <Cell label="default"><TextArea label="head line" placeholder="type something here" className="w-56" /></Cell>
        <Cell label="error"><TextArea label="head line" defaultValue="bad" invalid className="w-56" /></Cell>
      </Demo>

      <Demo title="Dropdown (click to open · keyboard · blurred overlay)">
        <Cell label="default · filled"><Dropdown label="head line" options={TEAMS} value={team} onChange={setTeam} className="w-40" /></Cell>
        <Cell label="default · empty"><Dropdown label="head line" options={TEAMS} value={teamEmpty} onChange={setTeamEmpty} placeholder="frontend-team" className="w-40" /></Cell>
        <Cell label="onColor"><Dropdown variant="onColor" label="head line" options={TEAMS} value={team} onChange={setTeam} className="w-40" /></Cell>
      </Demo>

      <Demo title="Tag">
        <Cell label="control"><Tag variant="control">React</Tag></Cell>
        <Cell label="static"><Tag variant="static">React</Tag></Cell>
      </Demo>

      <Demo title="Status">
        {STATUS_INTENTS.map((i) => (
          <Cell key={i} label={i}><Status intent={i} label={i === 'stopped' ? 'failing' : 'on track'} /></Cell>
        ))}
      </Demo>

      <Demo title="Switch">
        <Cell label="big · on/off"><Switch size="big" checked={sw} onCheckedChange={setSw} /></Cell>
        <Cell label="small · on/off"><Switch size="small" checked={swSmall} onCheckedChange={setSwSmall} /></Cell>
        <Cell label="disabled"><Switch size="big" checked disabled onCheckedChange={() => {}} /></Cell>
      </Demo>

      <Demo title="Flag">
        <Cell label="toggle"><Flag pressed={flag} onPressedChange={setFlag} /></Cell>
        <Cell label="no (outline)"><Flag pressed={false} onPressedChange={() => {}} /></Cell>
      </Demo>

      <Demo title="Icon">
        {ICON_NAMES.map((n) => (
          <Cell key={n} label={n}><Icon name={n} title={n} className="text-fg" /></Cell>
        ))}
      </Demo>

      <Demo title="Avatar">
        <Cell label="fallback md"><Avatar fallback="KA" size="md" /></Cell>
        <Cell label="fallback sm"><Avatar fallback="PE" size="sm" /></Cell>
      </Demo>

      <Demo title="AvatarGroup">
        <Cell label="+overflow">
          <AvatarGroup avatars={[{ fallback: 'KA' }, { fallback: 'DO' }, { fallback: 'PE' }, { fallback: 'AL' }, { fallback: 'MI' }]} max={3} />
        </Cell>
      </Demo>

      <Demo title="Bar">
        <Cell label="default 75%"><div className="w-40"><Bar value={75} /></div></Cell>
        <Cell label="default 20%"><div className="w-40"><Bar value={20} /></div></Cell>
        <Cell label="big 75%"><div className="w-40"><Bar value={75} size="big" /></div></Cell>
        <Cell label="big 20%"><div className="w-40"><Bar value={20} size="big" /></div></Cell>
      </Demo>

      <Demo title="Graph">
        <Cell label="data"><Graph data={[4, 8, 6, 10, 5, 9]} className="w-40" /></Cell>
      </Demo>

      <Demo title="SwitchGroup">
        <Cell label="segmented">
          <SwitchGroup
            aria-label="team"
            value={seg}
            onChange={setSeg}
            options={[{ value: 'team', label: 'team' }, { value: 'design', label: 'team' }, { value: 'eng', label: 'team' }]}
          />
        </Cell>
      </Demo>

      <Demo title="ErrorMessage">
        <Cell label="alert"><ErrorMessage>Error! Add more money for salary</ErrorMessage></Cell>
      </Demo>

      <Demo title="ListItem">
        <div className="w-full">
          <ListItem
            title="Sarah Johnson"
            meta={['document', 'created by alan', '24.05.2025']}
            action={<Button variant="secondary">Edit</Button>}
          />
        </div>
      </Demo>
    </section>
  )
}
