import { isPending, type Profile } from '../content/types'
import { formatList } from '../lib/format'
import { usePointerTilt } from '../lib/usePointerTilt'
import { HeroStack } from './HeroStack'
import { Todo } from './Todo'
import { buttonClass } from './ui'

export function Hero({ profile }: { profile: Profile }) {
  // The 3D picture follows the mouse anywhere in the hero, not only on itself.
  const ref = usePointerTilt<HTMLElement>()

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="hero grid items-center gap-6 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-10"
    >
      <div>
        <div className="flex items-start gap-2.5 text-sm text-muted sm:inline-flex sm:items-center sm:rounded-full sm:border sm:border-line sm:bg-surface/70 sm:py-1.5 sm:pr-4 sm:pl-3">
          <span
            aria-hidden="true"
            className="mt-1.5 size-2 shrink-0 rounded-full bg-accent sm:mt-0"
          />
          <p>
            {profile.location} · Open to {formatList(profile.workModes)} work
          </p>
        </div>
        <p className="mt-8 font-mono text-sm font-semibold tracking-widest text-accent uppercase">
          {profile.role}
        </p>
        <h1
          id="hero-title"
          tabIndex={-1}
          className="mt-3 text-5xl font-bold tracking-tight text-balance md:text-7xl"
        >
          <span className="bg-linear-to-r from-accent to-accent-2 box-decoration-clone bg-clip-text text-transparent">
            {profile.name}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-fg md:text-2xl md:leading-relaxed">
          {isPending(profile.pitch) ? <Todo note={profile.pitch.todo} /> : profile.pitch}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className={buttonClass.primary}>
            View projects <span aria-hidden="true">↓</span>
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
      </div>
      <HeroStack />
    </section>
  )
}
