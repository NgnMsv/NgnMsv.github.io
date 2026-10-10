import type { NavItem } from './types.ts'

/** Site-wide settings: the public URL, SEO text, and the navigation. */
export const site = {
  /** No trailing slash. Change this when you add a custom domain. */
  url: 'https://ngnmsv.github.io',
  title: 'Negin Mousavi — Frontend Developer',
  description:
    'Frontend developer (React, TypeScript) with production experience and UX research skills. M.Sc. Computer Science student in Kaiserslautern, open to working-student roles.',
  locale: 'en',
  ogImage: '/og.png',
  sourceRepo: 'https://github.com/NgnMsv/NgnMsv.github.io',
} as const

export const nav: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]
