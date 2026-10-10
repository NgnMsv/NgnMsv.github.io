import type { SkillGroup } from '../content/types'
import { cardClass, Section, TagList } from './ui'

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.category} className={`${cardClass} space-y-4 p-6`}>
            <h3 className="font-semibold">{group.category}</h3>
            <TagList label={`${group.category} skills`} items={group.skills} />
          </div>
        ))}
      </div>
    </Section>
  )
}
