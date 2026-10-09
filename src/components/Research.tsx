import type { Publication } from '../content/types'
import { formatList } from '../lib/format'
import { ExternalLink, Section } from './ui'

export function Research({ publications }: { publications: Publication[] }) {
  return (
    <Section id="research" title="Research">
      <ul className="space-y-10">
        {publications.map((publication) => (
          <li key={publication.title}>
            <h3 className="text-xl font-semibold tracking-tight text-balance">
              {publication.title}
            </h3>
            <p className="mt-1 text-muted">
              {[
                publication.date,
                publication.venue,
                publication.coAuthors && `With ${formatList(publication.coAuthors)}`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
            {publication.links.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {publication.links.map((link) => (
                  <li key={link.href}>
                    <ExternalLink href={link.href}>
                      {link.label}
                      <span className="sr-only">: {publication.title}</span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
