import { useEffect, useRef } from 'react'
import { About } from './components/About'
import { CaseStudy } from './components/CaseStudy'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { NotFound } from './components/NotFound'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import {
  certificates,
  education,
  experience,
  nav,
  profile,
  projects,
  publications,
  site,
  skills,
} from './content'
import { getNavigationType, usePathname } from './lib/router'
import { caseStudyProjects, matchRoute, routeMeta } from './lib/routes'

// Drafts and TODO placeholders are shown while developing, never on the live site.
const includeDrafts = import.meta.env.DEV

export function App() {
  const pathname = usePathname()
  const route = matchRoute(pathname, caseStudyProjects(projects, includeDrafts))
  const { title } = routeMeta(route, site, profile.name)

  useEffect(() => {
    document.title = title
  }, [title])

  // After a client-side page change, behave like a normal page load: go to
  // the top (or to the #section in the URL) and move keyboard/screen-reader
  // focus to the new page's heading. Back/forward is left to the browser.
  const previousPathname = useRef(pathname)
  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    if (getNavigationType() !== 'push') return

    const sectionId = window.location.hash.slice(1)
    const section = sectionId ? document.getElementById(sectionId) : null
    if (section) {
      section.scrollIntoView({ behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <>
      <Header name={profile.name} nav={nav} onHome={route.name === 'home'} />
      <main id="main" className="mx-auto max-w-5xl px-5 md:px-8">
        {route.name === 'home' && (
          <>
            <Hero profile={profile} />
            <Projects projects={projects} includeDrafts={includeDrafts} />
            <Experience jobs={experience} />
            <Skills groups={skills} />
            <Research publications={publications} />
            <About profile={profile} education={education} certificates={certificates} />
            <Contact profile={profile} />
          </>
        )}
        {route.name === 'project' && <CaseStudy project={route.project} />}
        {route.name === 'not-found' && <NotFound />}
      </main>
      <Footer profile={profile} sourceRepo={site.sourceRepo} />
    </>
  )
}
