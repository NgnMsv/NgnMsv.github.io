import type { Profile } from '../content/types'
import { ExternalLink } from './ui'

export function Footer({ profile, sourceRepo }: { profile: Profile; sourceRepo: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React, TypeScript, and Tailwind CSS.{' '}
          <ExternalLink href={sourceRepo}>Source code</ExternalLink>
        </p>
      </div>
    </footer>
  )
}
