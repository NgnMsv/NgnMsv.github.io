import { isPending, type Maybe, type Project, type Screenshot } from '../content/types'
import { Link } from '../lib/router'
import { caseStudyProjects, projectPath, visibleProjects } from '../lib/routes'
import { Todo } from './Todo'
import { cardClass, ExternalLink, Section, TagList, textLinkClass } from './ui'

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
          // A project with a picture gets the full width.
          <li key={project.slug} className={coverOf(project) ? 'lg:col-span-2' : undefined}>
            <ProjectCard project={project} hasCaseStudy={withCaseStudy.has(project)} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** The picture on a project card: the project's first landscape screenshot, if it has one. */
function coverOf(project: Project): Screenshot | undefined {
  return project.screenshots?.find((shot) => shot.width > shot.height)
}

function ProjectCard({ project, hasCaseStudy }: { project: Project; hasCaseStudy: boolean }) {
  const cover = coverOf(project)

  return (
    <article
      className={`${cardClass} h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lift ${
        cover ? 'grid lg:grid-cols-[1.15fr_1fr]' : ''
      }`}
    >
      {cover && (
        <div className="flex items-center border-b border-line bg-surface-2 p-4 lg:border-r lg:border-b-0 lg:p-6">
          <img
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg border border-line shadow-card"
          />
        </div>
      )}
      <ProjectText project={project} hasCaseStudy={hasCaseStudy} />
    </article>
  )
}

function ProjectText({ project, hasCaseStudy }: { project: Project; hasCaseStudy: boolean }) {
  const { title, year, summary, tech, repo, demo, slug, published } = project

  return (
    <div className="flex h-full flex-col p-6 md:p-7">
      {!published && (
        <p className="mb-3 self-start rounded bg-accent-soft px-2 py-0.5 font-mono text-xs text-fg">
          Draft — hidden on the live site
        </p>
      )}
      <h3 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">{title}</h3>
      <p className="mt-1 font-mono text-sm text-muted">
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
    </div>
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
