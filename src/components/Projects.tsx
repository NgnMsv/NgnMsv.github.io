import { isPending, type Maybe, type Project } from '../content/types'
import { Link } from '../lib/router'
import { caseStudyProjects, projectPath, visibleProjects } from '../lib/routes'
import { Todo } from './Todo'
import { ExternalLink, Section, TagList, textLinkClass } from './ui'

interface ProjectsProps {
  projects: Project[]
  /** True in development: unpublished projects are shown, marked as drafts. */
  includeDrafts: boolean
}

export function Projects({ projects, includeDrafts }: ProjectsProps) {
  const shown = visibleProjects(projects, includeDrafts)
  const withCaseStudy = new Set(caseStudyProjects(projects, includeDrafts))

  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-6 lg:grid-cols-2">
        {shown.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} hasCaseStudy={withCaseStudy.has(project)} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

function ProjectCard({ project, hasCaseStudy }: { project: Project; hasCaseStudy: boolean }) {
  const { title, year, summary, tech, repo, demo, slug, published } = project

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
      {!published && (
        <p className="mb-3 self-start rounded bg-accent-soft px-2 py-0.5 font-mono text-xs text-fg">
          Draft — hidden on the live site
        </p>
      )}
      <h3 className="text-xl font-semibold tracking-tight text-balance">{title}</h3>
      <p className="mt-1 text-sm text-muted">
        {isPending(year) ? <Todo note={year.todo} /> : year}
      </p>
      <p className="mt-4 text-pretty">
        {isPending(summary) ? <Todo note={summary.todo} /> : summary}
      </p>
      <div className="mt-5">
        {isPending(tech) ? (
          <Todo note={tech.todo} />
        ) : (
          <TagList label={`Technologies used in ${title}`} items={tech} />
        )}
      </div>

      <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
        {hasCaseStudy && (
          <li>
            <Link to={projectPath(slug)} className={textLinkClass}>
              Case study<span className="sr-only">: {title}</span>
            </Link>
          </li>
        )}
        <LinkItem link={demo} label="Live demo" title={title} />
        <LinkItem link={repo} label="GitHub" title={title} />
      </ul>
    </article>
  )
}

function LinkItem({ link, label, title }: { link: Maybe<string>; label: string; title: string }) {
  // A missing link leaves no trace on the live site, not even an empty list item.
  if (isPending(link) && !import.meta.env.DEV) return null

  return (
    <li>
      {isPending(link) ? (
        <Todo note={link.todo} />
      ) : (
        <ExternalLink href={link}>
          {label}
          <span className="sr-only">: {title}</span>
        </ExternalLink>
      )}
    </li>
  )
}
