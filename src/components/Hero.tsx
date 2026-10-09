import { isPending, type Profile } from '../content/types'
import { formatList } from '../lib/format'
import { Todo } from './Todo'
import { buttonClass } from './ui'

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="hero-title" className="py-16 md:py-28">
      <p className="font-mono text-sm font-semibold tracking-widest text-accent uppercase">
        {profile.role}
      </p>
      <h1
        id="hero-title"
        tabIndex={-1}
        className="mt-4 text-5xl font-bold tracking-tight text-balance md:text-7xl"
      >
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-fg md:text-2xl md:leading-relaxed">
        {isPending(profile.pitch) ? <Todo note={profile.pitch.todo} /> : profile.pitch}
      </p>
      <p className="mt-4 text-muted">
        {profile.location} · Open to {formatList(profile.workModes)} work
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a href="#projects" className={buttonClass.primary}>
          View projects
        </a>
        {isPending(profile.cv) ? (
          <Todo note={profile.cv.todo} />
        ) : (
          <a href={profile.cv} download className={buttonClass.secondary}>
            Download CV <span className="sr-only">(PDF)</span>
          </a>
        )}
        <a href="#contact" className={buttonClass.secondary}>
          Contact
        </a>
      </div>
    </section>
  )
}
