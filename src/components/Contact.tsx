import { useEffect, useState } from 'react'
import type { Profile } from '../content/types'
import { buttonClass, ExternalLink, Section } from './ui'

type CopyState = 'idle' | 'copied' | 'failed'

const copyMessage: Record<CopyState, string> = {
  idle: '',
  copied: 'Email address copied.',
  failed: 'Could not copy. Please select the address and copy it by hand.',
}

export function Contact({ profile }: { profile: Profile }) {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  // Clear the confirmation after a few seconds.
  useEffect(() => {
    if (copyState === 'idle') return
    const timer = window.setTimeout(() => setCopyState('idle'), 4000)
    return () => window.clearTimeout(timer)
  }, [copyState])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="text-2xl font-semibold tracking-tight break-words md:text-3xl">
        <a
          href={`mailto:${profile.email}`}
          className="underline decoration-accent/50 underline-offset-8 transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a href={`mailto:${profile.email}`} className={buttonClass.primary}>
          Write an email
        </a>
        <button type="button" onClick={copyEmail} className={buttonClass.secondary}>
          Copy email
        </button>
        {/* Announced by screen readers when the text changes. */}
        <p role="status" className="text-sm text-muted">
          {copyMessage[copyState]}
        </p>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
        </li>
      </ul>
    </Section>
  )
}
