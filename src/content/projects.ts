import { todo, type Project } from './types.ts'

/**
 * Shown in this order. Set `published: true` to put a project on the live
 * site. Every `todo(...)` is a piece of content that still has to be written;
 * replace it with real text or a real link.
 */
export const projects: Project[] = [
  {
    slug: 'market-dashboard',
    title: 'Real-Time Market Dashboard',
    year: todo('Market Dashboard: year'),
    // Stays unpublished until the repo and demo links exist.
    published: false,
    // TODO(content): everything below for the Market Dashboard
    summary: todo('Market Dashboard: one- or two-sentence description'),
    tech: todo('Market Dashboard: tech stack'),
    repo: todo('Market Dashboard: GitHub link'),
    demo: todo('Market Dashboard: live demo link'),
    caseStudy: {
      problem: todo('Market Dashboard: the problem'),
      built: todo('Market Dashboard: what I built'),
      decisions: todo('Market Dashboard: technical decisions'),
      results: todo('Market Dashboard: results'),
    },
  },
  {
    slug: 'fashion-companion',
    title: 'Fashion Companion – Intelligent Closet Manager',
    year: '2024 · redesigned and rebuilt from scratch in 2026',
    published: true,
    summary:
      'A closet manager that suggests outfits with a hand-written decision tree and shows the exact rules behind every suggestion. It runs entirely in the browser.',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'TanStack Query',
      'IndexedDB',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'GitHub Actions',
    ],
    repo: 'https://github.com/NgnMsv/fashion-companion',
    demo: 'https://ngnmsv.github.io/fashion-companion/',
    moreLinks: [
      { label: '2024 frontend', href: 'https://github.com/NgnMsv/Smart-Closet-Frontend' },
      { label: '2024 backend', href: 'https://github.com/NgnMsv/Smart-Closet-Backend' },
    ],
    screenshots: [
      {
        src: '/images/fashion-companion/why.webp',
        width: 1104,
        height: 1309,
        alt: 'An outfit card showing a denim jacket, white T-shirt, jeans and sneakers. Below it, the "Why this outfit?" panel lists six yes/no questions with their answers and ends in the result "Great match".',
        caption:
          '“Why this outfit?” shows every question the decision tree asked, the answer, and the verdict.',
      },
      {
        src: '/images/fashion-companion/looks.webp',
        width: 1280,
        height: 860,
        alt: 'The Looks page with controls for occasion and season, and the first of three suggested outfits.',
        caption: 'Looks for an occasion and a season, chosen from every possible combination.',
      },
      {
        src: '/images/fashion-companion/wardrobe.webp',
        width: 1280,
        height: 860,
        alt: 'The wardrobe in dark theme: a search field, four filters, and a grid of drawn garments grouped by category.',
        caption: 'The wardrobe in dark theme, with search and filters. Garments are drawn in SVG.',
      },
    ],
    caseStudy: {
      problem: [
        'Choosing an outfit from clothes you already own is a small decision that comes up every day. An app can help only if you trust its suggestions, and a suggestion without a reason is hard to trust.',
        'My 2024 version also had a practical problem: it could not be shown to anyone. It needed a Django server, a task queue and two third-party services before the first screen appeared.',
      ],
      before: [
        'The 2024 version, “Smart Closet”, was a full-stack project: a Create React App frontend with Material UI and a Django REST backend. Users uploaded photos of shirts, pants and footwear, and each item got a dominant colour and two usage tags.',
        'Users rated random outfits with like or dislike. A scheduled job trained a scikit-learn decision tree per user on those ratings, and the server then drew random outfits until the model approved one.',
        'It worked, but the model split on raw RGB numbers, so it could not explain a suggestion. It also did nothing for a new user until enough ratings existed.',
      ],
      built: [
        'I redesigned and rebuilt the project from scratch in 2026; no code, layout or styling was carried over. The new version runs entirely in the browser, so the live demo is the whole product.',
        'The learned model became a hand-written decision tree in TypeScript. It asks about occasion, season, dress level and colour, and takes the user’s style and favourite colours into account. Because the rules are written down, each outfit comes with a “Why this outfit?” panel that lists every question, its answer, and the verdict.',
        'Around that I designed the product a first-time visitor needs: onboarding in three questions, a sample wardrobe one click away, a searchable and filterable wardrobe, add and edit in one dialog, designed empty and error states, light and dark themes, and English and German.',
      ],
      decisions: [
        'The explanation is the evaluation. The engine returns the verdict together with the path it took through the tree, and the panel renders that path. There is no second piece of code describing the decision, so the explanation cannot drift from the logic.',
        'The engine is pure TypeScript with no React, no storage and no randomness: the same input always gives the same output. “Shuffle” changes a seed that reorders equally scored outfits. A test checks that each of the tree’s 14 leaves is reached.',
        'Data access sits behind a repository interface with an IndexedDB implementation (photos are stored as Blobs, which localStorage cannot do) and an in-memory one for tests. TanStack Query sits on top for caching and for refreshing every screen after a write. A real API could replace the repository without touching components.',
        'I used native elements before custom widgets: radio buttons and checkboxes under the choice pills, a native dialog for the form, a details element for the full tree. Keyboard and screen-reader behaviour comes with them.',
        'The runtime dependencies are React, TanStack Query and one self-hosted font. The router, the i18n layer and the IndexedDB wrapper are small enough to write by hand.',
      ],
      // TODO(content): replace with the scores measured on the live URL after the first deploy
      results: todo('Fashion Companion: Lighthouse scores measured on the live demo, and test counts'),
    },
  },
  {
    slug: 'xss-shield',
    title: 'XSS-Shield: Multi-View Canonicalization',
    year: '2025',
    // Listed under Research already. Publish here once there is a demo.
    published: false,
    // TODO(content): everything below for XSS-Shield
    summary: todo('XSS-Shield: one- or two-sentence description'),
    tech: todo('XSS-Shield: tech stack'),
    repo: todo('XSS-Shield: GitHub link'),
    demo: todo('XSS-Shield: live demo link'),
    caseStudy: {
      problem: todo('XSS-Shield: the problem'),
      built: todo('XSS-Shield: what I built'),
      decisions: todo('XSS-Shield: technical decisions'),
      results: todo('XSS-Shield: results'),
    },
  },
  {
    slug: 'grounded-theory-analysis',
    title: 'AI-Driven Grounded-Theory Analysis of User Feedback',
    year: 'Ongoing since Dec 2025',
    // Listed under Research already. Publish here once there is a demo.
    published: false,
    // TODO(content): everything below for the grounded-theory project
    summary: todo('Grounded-theory analysis: one- or two-sentence description'),
    tech: todo('Grounded-theory analysis: tech stack'),
    repo: todo('Grounded-theory analysis: GitHub link'),
    demo: todo('Grounded-theory analysis: live demo link'),
    caseStudy: {
      problem: todo('Grounded-theory analysis: the problem'),
      built: todo('Grounded-theory analysis: what I built'),
      decisions: todo('Grounded-theory analysis: technical decisions'),
      results: todo('Grounded-theory analysis: results'),
    },
  },
]
