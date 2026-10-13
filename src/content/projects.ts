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
    slug: 'feedback-coder',
    title: 'Feedback Coder – LLM-Assisted Qualitative Coding',
    year: '2026',
    published: true,
    summary:
      'A Python pipeline that sorts user feedback into categories with an LLM, checks every answer before trusting it, and measures agreement with a human coder.',
    tech: ['Python', 'OpenAI API', 'Claude API', 'Pydantic', 'Prompt engineering', 'unittest / pytest', 'GitHub Actions'],
    repo: 'https://github.com/NgnMsv/feedback-coder',
    demo: 'https://ngnmsv.github.io/feedback-coder/',
    screenshots: [
      {
        src: '/images/feedback-coder/top.webp',
        width: 1100,
        height: 860,
        alt: 'The top of the report: five summary numbers (60 comments, 45 codes assigned, micro-F1 0.68, kappa 0.66, 0 sent to review) and a bar chart of comments per theme.',
        caption: 'The report opens with the summary and the themes users talk about most.',
      },
      {
        src: '/images/feedback-coder/agree.webp',
        width: 1100,
        height: 860,
        alt: 'The agreement section: a bar chart of F1 per code and a table with precision, recall, F1 and Cohen’s kappa for each of the eight codes.',
        caption: 'Agreement with the human coder, per code: precision, recall, F1 and Cohen’s kappa.',
      },
      {
        src: '/images/feedback-coder/table.webp',
        width: 1100,
        height: 760,
        alt: 'The comments table with filter buttons for each code. In each comment the quoted evidence is highlighted in yellow, next to the assigned codes and the sentiment.',
        caption: 'Every code comes with a quote from the comment. Quotes that do not exist are rejected.',
      },
    ],
    caseStudy: {
      problem: [
        'Product teams collect hundreds of app reviews, survey answers and support tickets. Sorting them into topics by hand – “coding” them, in research terms – is slow. An LLM can do it in seconds, but it is confident even when it is wrong, so its answers cannot simply be trusted.',
      ],
      built: [
        'A Python pipeline that codes 60 comments about a budgeting app with eight codes, using OpenAI or Claude, and an offline keyword baseline that needs no API key.',
        'The model receives a codebook with definitions, include and exclude rules and examples, and must answer in a fixed JSON format with an exact quote from the comment as evidence for every code.',
        'Every answer is checked before it is used, then compared with labels I coded by hand. The result is a self-contained interactive HTML report: themes with quotes, agreement per code, a human-review queue and a filterable table of all comments.',
      ],
      decisions: [
        'Verification instead of trust. Pydantic validates the JSON; if it is invalid, the exact error is sent back and the model retries. A code whose quote does not appear in the comment is dropped as a likely hallucination, an unknown code is dropped, and low confidence sends the comment to human review. Nothing is dropped silently: every decision is listed in the report.',
        'Measured, not assumed. Each code is evaluated as its own yes/no question with precision, recall and F1, plus Cohen’s kappa, the standard agreement measure between two coders in qualitative research. I wrote the formulas by hand and tested kappa against a textbook example.',
        'A baseline to compare with. A keyword coder returns the same JSON format and goes through the same checks. My first keyword lists scored 0.92 – because I had written them while reading the test comments. Rewritten from the code definitions only, the baseline scores 0.68. That data leakage taught me never to tune anything on the evaluation data.',
        'The API calls are plain HTTP with the Python standard library, so every request is visible. Answers are cached by a hash of the prompt: re-running is free, results are reproducible, and a real model run can be presented without an API key.',
      ],
      // TODO(content): add the LLM run's micro-F1 and kappa here after running it with an API key.
      results: [
        'Keyword baseline: micro-F1 0.68 and mean Cohen’s kappa 0.66. It is precise (0.89) but finds only 56% of the codes – it misses feature requests and praise without obvious keywords, which is the gap the LLM is for.',
        '42 tests that never call a real API (a fake coder and a mocked HTTP layer), covering the verification rules, the retry loop, the agreement formulas and HTML escaping. Lint, tests and an end-to-end run happen on every push.',
      ],
    },
  },
  {
    slug: 'fashion-companion',
    title: 'Fashion Companion – Intelligent Closet Manager',
    year: '2024',
    published: true,
    summary:
      'A closet manager that suggests outfits with a decision tree and shows the exact rules behind every suggestion.',
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
    ],
    repo: 'https://github.com/NgnMsv/fashion-companion',
    demo: 'https://ngnmsv.github.io/fashion-companion/',
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
      ],
      built: [
        'Fashion Companion runs entirely in the browser, so the live demo is the whole product.',
        'Outfits are chosen by a decision tree in TypeScript. It asks about occasion, season, dress level and colour, and takes the user’s style and favourite colours into account. Each outfit comes with a “Why this outfit?” panel that lists every question, its answer, and the verdict.',
        'Around that I designed the product a first-time visitor needs: onboarding in three questions, a sample wardrobe one click away, a searchable and filterable wardrobe, add and edit in one dialog, designed empty and error states, light and dark themes, and English and German.',
      ],
      decisions: [
        'The explanation is the evaluation. The engine returns the verdict together with the path it took through the tree, and the panel renders that path. There is no second piece of code describing the decision, so the explanation cannot drift from the logic.',
        'The engine is pure TypeScript with no React, no storage and no randomness: the same input always gives the same output. “Shuffle” changes a seed that reorders equally scored outfits. A test checks that each of the tree’s 14 leaves is reached.',
        'Data access sits behind a repository interface with an IndexedDB implementation (photos are stored as Blobs, which localStorage cannot do) and an in-memory one for tests. TanStack Query sits on top for caching and for refreshing every screen after a write. A real API could replace the repository without touching components.',
        'I used native elements before custom widgets: radio buttons and checkboxes under the choice pills, a native dialog for the form, a details element for the full tree. Keyboard and screen-reader behaviour comes with them.',
        'The runtime dependencies are React, TanStack Query and one self-hosted font. The router, the i18n layer and the IndexedDB wrapper are small enough to write by hand.',
      ],
      results: [
        'Lighthouse on the live demo, mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100. Performance is the median of three runs, which ranged from 98 to 100.',
        '164 unit and component tests and 8 end-to-end scenarios, run at desktop and phone size. All of them run automatically on every push, and a failure blocks the deploy.',
      ],
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
