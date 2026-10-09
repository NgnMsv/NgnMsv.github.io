/**
 * Content that has not been written yet. Components render it as a visible
 * "TODO(content)" badge in development and render nothing in production,
 * so a missing piece can never leak onto the live site as invented text.
 */
export interface Pending {
  readonly todo: string
}

export type Maybe<T> = T | Pending

export function todo(what: string): Pending {
  return { todo: what }
}

export function isPending(value: unknown): value is Pending {
  return typeof value === 'object' && value !== null && 'todo' in value
}

/** A year and month, e.g. "2019-08". */
export type YearMonth = `${number}-${number}`

export interface Link {
  label: string
  href: string
}

export interface Photo {
  src: string
  /** Same image at 2x for high-density screens. */
  src2x: string
  width: number
  height: number
  alt: string
}

export interface Language {
  name: string
  level: Maybe<string>
}

export interface Profile {
  name: string
  role: string
  /** One sentence shown under the name in the hero. */
  pitch: Maybe<string>
  location: string
  workModes: string[]
  about: Maybe<string[]>
  email: string
  linkedin: string
  github: string
  /** Path to the CV PDF inside `public/`, e.g. "/negin-mousavi-cv.pdf". */
  cv: Maybe<string>
  photo: Maybe<Photo>
  languages: Language[]
}

export interface Job {
  role: string
  company: string
  start: YearMonth
  /** `null` means "present". */
  end: YearMonth | null
  note?: string
  highlights: string[]
}

export interface Screenshot {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface CaseStudy {
  problem: Maybe<string[]>
  /** Optional: what an earlier version of the project did. */
  before?: string[]
  built: Maybe<string[]>
  decisions: Maybe<string[]>
  results: Maybe<string[]>
}

export interface Project {
  /** Used in the URL: /projects/<slug>/ */
  slug: string
  title: string
  year: Maybe<string>
  /** Only published projects appear on the live site. */
  published: boolean
  summary: Maybe<string>
  tech: Maybe<string[]>
  repo: Maybe<string>
  demo: Maybe<string>
  /** Further links shown on the case-study page, e.g. earlier repositories. */
  moreLinks?: Link[]
  /** Shown on the case-study page, in this order. */
  screenshots?: Screenshot[]
  caseStudy: CaseStudy
}

export interface Degree {
  degree: string
  school: string
  start: YearMonth
  end: YearMonth | null
  grade: Maybe<string>
}

export interface Publication {
  title: string
  /** e.g. "2025" or "Ongoing since Dec 2025". */
  date: string
  venue?: string
  coAuthors?: string[]
  links: Link[]
}

export interface Certificate {
  title: string
  issuer: string
  year: string
  href?: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface NavItem {
  /** The id of the section on the home page. */
  id: string
  label: string
}
