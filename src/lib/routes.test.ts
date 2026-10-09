import { describe, expect, it } from 'vitest'
import { bareProject, draftProject, finishedProject, testProjects } from '../test/fixtures'
import { caseStudyProjects, matchRoute, routeMeta, visibleProjects } from './routes'

const site = { title: 'Site title', description: 'Site description' }

describe('visibleProjects', () => {
  it('hides unpublished projects on the live site', () => {
    expect(visibleProjects(testProjects, false)).toEqual([finishedProject, bareProject])
  })

  it('includes drafts in development', () => {
    expect(visibleProjects(testProjects, true)).toContain(draftProject)
  })
})

describe('caseStudyProjects', () => {
  it('only gives a live page to published projects with a written case study', () => {
    expect(caseStudyProjects(testProjects, false)).toEqual([finishedProject])
  })

  it('gives every project a page in development', () => {
    expect(caseStudyProjects(testProjects, true)).toEqual(testProjects)
  })
})

describe('matchRoute', () => {
  const pages = [finishedProject]

  it.each(['/', '', '/index.html'])('matches the home page for %j', (pathname) => {
    expect(matchRoute(pathname, pages)).toEqual({ name: 'home' })
  })

  it.each(['/projects/finished/', '/projects/finished', '/projects/finished/index.html'])(
    'matches a case study for %j',
    (pathname) => {
      expect(matchRoute(pathname, pages)).toEqual({ name: 'project', project: finishedProject })
    },
  )

  it.each(['/projects/bare/', '/projects/', '/nope', '/projects/finished/extra'])(
    'returns not-found for %j',
    (pathname) => {
      expect(matchRoute(pathname, pages)).toEqual({ name: 'not-found' })
    },
  )
})

describe('routeMeta', () => {
  it('uses the project title and summary for a case study', () => {
    expect(routeMeta({ name: 'project', project: finishedProject }, site, 'Ada')).toEqual({
      title: 'Finished Project — Ada',
      description: 'A project with everything filled in.',
    })
  })

  it('falls back to the site description when the summary is not written yet', () => {
    const meta = routeMeta({ name: 'project', project: draftProject }, site, 'Ada')
    expect(meta.description).toBe('Site description')
  })
})
