import type { Publication } from './types'

export const publications: Publication[] = [
  {
    title: 'XSS-Shield: Multi-View Canonicalization',
    date: '2025',
    venue: 'Chapter in “Advanced Decision-Making Under Uncertainty” (Springer)',
    links: [
      {
        label: 'Paper',
        href: 'https://www.researchgate.net/publication/405410098_A_Multi-view_Learning_Framework_for_Obfuscation-Resilient_XSS_Detection',
      },
      { label: 'Book', href: 'https://link.springer.com/book/9789819586950' },
    ],
  },
  {
    title: 'Data Balancing Strategies: A Systematic Survey of Resampling and Augmentation',
    date: '2025',
    venue: 'arXiv preprint',
    coAuthors: ['M. Ghatee', 'B. Yousefimehr'],
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2505.13518' }],
  },
  {
    title: 'AI-Driven Grounded-Theory Analysis of User Feedback',
    date: 'Ongoing since Dec 2025',
    links: [],
  },
]
