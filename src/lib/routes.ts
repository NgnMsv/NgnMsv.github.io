import { isPending, type Project } from '../content/types.ts'

/*
 * Pure functions that decide which projects and pages exist. They take
 * `includeDrafts` as an argument instead of reading the environment, so the
 * same code runs in the browser, in tests, and in the build step that writes
 * one HTML file per page (build/static-pages.ts).
 *
 * `includeDrafts` is true in development and false in production.
 */

export function hasCaseStudy(project: Project): boolean {
  return Object.values(project.caseStudy).some((part) => !isPending(part))
}

/** Projects shown in the Projects section. */
export function visibleProjects(all: Project[], includeDrafts: boolean): Project[] {
  return all.filter((project) => includeDrafts || project.published)
}

/**
 * Projects that get their own case-study page. On the live site a project
 * needs at least one written case-study part, so visitors never land on an
 * empty page.
 */
export function caseStudyProjects(all: Project[], includeDrafts: boolean): Project[] {
  return visibleProjects(all, includeDrafts).filter(
    (project) => includeDrafts || hasCaseStudy(project),
  )
}

export function projectPath(slug: string): string {
  return `/projects/${slug}/`
}

export type Route =
  | { name: 'home' }
  | { name: 'project'; project: Project }
  | { name: 'not-found' }

export function matchRoute(pathname: string, pages: Project[]): Route {
  // GitHub Pages serves /projects/x/ and /projects/x/index.html for the same file.
  const path = pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'home' }

  const slug = /^\/projects\/([^/]+)$/.exec(path)?.[1]
  const project = pages.find((candidate) => candidate.slug === slug)
  return project ? { name: 'project', project } : { name: 'not-found' }
}

export interface PageMeta {
  title: string
  description: string
}

export function routeMeta(
  route: Route,
  site: { title: string; description: string },
  authorName: string,
): PageMeta {
  switch (route.name) {
    case 'home':
      return { title: site.title, description: site.description }
    case 'project':
      return {
        title: `${route.project.title} — ${authorName}`,
        description: isPending(route.project.summary) ? site.description : route.project.summary,
      }
    case 'not-found':
      return { title: `Page not found — ${authorName}`, description: site.description }
  }
}
