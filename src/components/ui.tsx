import type { ReactNode } from 'react'

/** Small building blocks shared by the sections. */

export const buttonClass = {
  primary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-card transition hover:-translate-y-0.5 hover:shadow-lift',
  secondary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-semibold text-fg transition hover:-translate-y-0.5 hover:border-accent hover:text-accent',
} as const

/** The box around a project, a skill group, a publication, and similar. */
export const cardClass = 'rounded-2xl border border-line bg-surface shadow-card'

export const textLinkClass =
  'font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

/** A page section: heading in a left column on wide screens, content beside it. */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-line py-14 md:grid-cols-[11rem_1fr] md:gap-10 md:py-20"
    >
      {/* On wide screens the heading stays in view while its section scrolls past. */}
      <h2
        id={`${id}-title`}
        className="flex items-center gap-3 self-start font-mono text-sm font-semibold tracking-widest text-accent uppercase md:sticky md:top-24"
      >
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-surface-2 px-3 py-1 text-sm text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

interface ExternalLinkProps {
  href: string
  className?: string
  children: ReactNode
}

/** A link to another site. Opens in a new tab and says so to screen readers. */
export function ExternalLink({ href, className = textLinkClass, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
