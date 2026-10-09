import { todo, type Profile, type Project } from '../content/types'

/*
 * Made-up data for tests. Tests check that components render whatever they
 * are given, so they keep passing when the real content changes.
 */

export const testProfile: Profile = {
  name: 'Ada Example',
  role: 'Frontend Developer',
  pitch: 'I build interfaces.',
  location: 'Berlin, Germany',
  workModes: ['on-site', 'remote'],
  about: ['First paragraph.', 'Second paragraph.'],
  email: 'ada@example.com',
  linkedin: 'https://www.linkedin.com/in/ada-example/',
  github: 'https://github.com/ada-example',
  cv: '/ada-cv.pdf',
  photo: { src: '/ada-200.jpg', src2x: '/ada-400.jpg', width: 200, height: 200, alt: 'Ada.' },
  languages: [
    { name: 'English', level: 'C1' },
    { name: 'German', level: todo('German level') },
  ],
}

const emptyCaseStudy = {
  problem: todo('problem'),
  built: todo('built'),
  decisions: todo('decisions'),
  results: todo('results'),
}

export const finishedProject: Project = {
  slug: 'finished',
  title: 'Finished Project',
  year: '2024',
  published: true,
  summary: 'A project with everything filled in.',
  tech: ['React', 'TypeScript'],
  repo: 'https://github.com/ada-example/finished',
  demo: 'https://example.com/finished',
  moreLinks: [{ label: 'Earlier version', href: 'https://github.com/ada-example/old' }],
  screenshots: [
    {
      src: '/shot.webp',
      width: 800,
      height: 600,
      alt: 'The main screen.',
      caption: 'Caption of the screenshot.',
    },
  ],
  caseStudy: {
    problem: ['The problem text.'],
    before: ['The earlier version text.'],
    built: ['The build text.'],
    decisions: ['The decisions text.'],
    results: todo('results'),
  },
}

/** Published, but without a case study or demo yet. */
export const bareProject: Project = {
  slug: 'bare',
  title: 'Bare Project',
  year: '2023',
  published: true,
  summary: 'A project without a case study.',
  tech: ['React'],
  repo: 'https://github.com/ada-example/bare',
  demo: todo('demo link'),
  caseStudy: emptyCaseStudy,
}

export const draftProject: Project = {
  slug: 'draft',
  title: 'Draft Project',
  year: todo('year'),
  published: false,
  summary: todo('summary'),
  tech: todo('tech'),
  repo: todo('repo'),
  demo: todo('demo'),
  caseStudy: emptyCaseStudy,
}

export const testProjects: Project[] = [finishedProject, bareProject, draftProject]
