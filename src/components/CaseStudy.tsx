import { isPending, type Maybe, type Project } from '../content/types'
import { Link } from '../lib/router'
import { Todo } from './Todo'
import { ExternalLink, TagList, textLinkClass } from './ui'

const parts = [
  { key: 'problem', heading: 'The problem' },
  { key: 'before', heading: 'The earlier version' },
  { key: 'built', heading: 'What I built' },
  { key: 'decisions', heading: 'Technical decisions' },
  { key: 'results', heading: 'Results' },
] as const

/** The case-study page for one project: /projects/<slug>/ */
export function CaseStudy({ project }: { project: Project }) {
  const { title, year, summary, tech, repo, demo, moreLinks, screenshots, caseStudy } = project
  const links = [
    { label: 'Live demo', link: demo },
    { label: 'GitHub', link: repo },
  ]

  return (
    <article className="max-w-3xl py-12 md:py-20">
      <Link to="/#projects" className={textLinkClass}>
        <span aria-hidden="true">← </span>All projects
      </Link>

      <h1 tabIndex={-1} className="mt-8 text-4xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      <p className="mt-2 text-muted">{isPending(year) ? <Todo note={year.todo} /> : year}</p>
      <p className="mt-6 text-xl leading-relaxed text-pretty">
        {isPending(summary) ? <Todo note={summary.todo} /> : summary}
      </p>

      <div className="mt-6">
        {isPending(tech) ? (
          <Todo note={tech.todo} />
        ) : (
          <TagList label="Technologies" items={tech} />
        )}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {links.map(({ label, link }) =>
          isPending(link) && !import.meta.env.DEV ? null : (
            <li key={label}>
              {isPending(link) ? (
                <Todo note={link.todo} />
              ) : (
                <ExternalLink href={link}>{label}</ExternalLink>
              )}
            </li>
          ),
        )}
        {moreLinks?.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          </li>
        ))}
      </ul>

      {screenshots?.map((shot) => (
        <figure key={shot.src} className="mt-10">
          <img
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl border border-line"
          />
          <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
        </figure>
      ))}

      {parts.map(({ key, heading }) => (
        <CaseStudyPart key={key} heading={heading} content={caseStudy[key]} />
      ))}
    </article>
  )
}

interface CaseStudyPartProps {
  heading: string
  /** `undefined` for an optional part the project does not have. */
  content: Maybe<string[]> | undefined
}

function CaseStudyPart({ heading, content }: CaseStudyPartProps) {
  if (content === undefined) return null
  // An unwritten part is skipped on the live site, heading included.
  if (isPending(content) && !import.meta.env.DEV) return null

  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-4 space-y-4 text-pretty">
        {isPending(content) ? (
          <Todo note={content.todo} />
        ) : (
          content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
        )}
      </div>
    </section>
  )
}
