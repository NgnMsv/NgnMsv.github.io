import type { ReactNode } from 'react'

/** Small building blocks shared by the sections. */

export const buttonClass = {
  primary:
    'inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-fg transition-opacity hover:opacity-90',
  secondary:
    'inline-flex min-h-11 items-center justify-center rounded-md border border-fg/30 px-5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent',
} as const

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
      <h2
        id={`${id}-title`}
        className="font-mono text-sm font-semibold tracking-widest text-accent uppercase"
      >
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
          className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
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
