import type { SkillGroup } from '../content/types'
import { Section, TagList } from './ui'

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-7">
        {groups.map((group) => (
          <div key={group.category} className="grid gap-3 sm:grid-cols-[12rem_1fr]">
            <h3 className="pt-1 font-semibold">{group.category}</h3>
            <TagList label={`${group.category} skills`} items={group.skills} />
          </div>
        ))}
      </div>
    </Section>
  )
}
