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
    year: '2024',
    published: true,
    summary:
      'React + Tailwind app that generates outfit recommendations with decision-tree logic.',
    tech: ['React', 'Tailwind CSS'],
    repo: 'https://github.com/NgnMsv/Smart-Closet-Backend',
    // TODO(content): Fashion Companion live demo link
    demo: todo('Fashion Companion: live demo link'),
    // TODO(content): Fashion Companion case study (all four parts)
    caseStudy: {
      problem: todo('Fashion Companion: the problem'),
      built: todo('Fashion Companion: what I built'),
      decisions: todo('Fashion Companion: technical decisions'),
      results: todo('Fashion Companion: results'),
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
