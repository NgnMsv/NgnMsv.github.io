import type { Job } from './types'

/** Newest first. */
export const experience: Job[] = [
  {
    role: 'UX Research Intern',
    company: 'Aban Tether',
    start: '2023-07',
    end: '2023-09',
    highlights: [
      'Led the redesign of the developer-facing API interface in Figma and implemented UI improvements in Tailwind CSS.',
      'Identified onboarding friction through behavioral data and user interviews, then redesigned the flow to reduce drop-off.',
      'Validated changes with A/B testing; refined navigation with card sorting and usability heuristics.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Nobitex',
    start: '2019-08',
    end: '2021-12',
    note: 'Part-time, alongside B.Sc.',
    highlights: [
      'Built component-based React applications showing real-time market, transaction, and portfolio data for a cryptocurrency exchange.',
      'Integrated the Binance and Coinbase APIs.',
      'Fixed memory leaks with Chrome DevTools, reducing memory usage by 40%.',
      'Cut unnecessary re-renders by 20%.',
      'Implemented i18n, built reusable components, and ensured responsive, cross-device design.',
    ],
  },
]
