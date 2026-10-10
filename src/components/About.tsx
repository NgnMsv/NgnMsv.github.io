import { isPending, type Certificate, type Degree, type Profile } from '../content/types'
import { DateRange } from './Experience'
import { Todo } from './Todo'
import { cardClass, ExternalLink, Section, Tilt } from './ui'

interface AboutProps {
  profile: Profile
  education: Degree[]
  certificates: Certificate[]
}

export function About({ profile, education, certificates }: AboutProps) {
  const { about, photo, languages } = profile

  return (
    <Section id="about" title="About">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {isPending(photo) ? (
          <Todo note={photo.todo} />
        ) : (
          <Tilt max={10} className="shrink-0 self-start rounded-3xl">
            <img
              src={photo.src}
              srcSet={`${photo.src} 1x, ${photo.src2x} 2x`}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="size-36 rounded-3xl border-4 border-surface object-cover shadow-lift ring-1 ring-line sm:size-44"
            />
          </Tilt>
        )}
        <div className="max-w-2xl space-y-4 text-lg text-pretty">
          {isPending(about) ? (
            <Todo note={about.todo} />
          ) : (
            about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className={`${cardClass} p-6`}>
          <h3 className="font-semibold">Education</h3>
          <ul className="mt-4 space-y-5">
            {education.map((degree) => (
              <li key={degree.degree}>
                <p className="font-medium">{degree.degree}</p>
                <p className="text-muted">{degree.school}</p>
                <p className="text-sm text-muted">
                  <DateRange start={degree.start} end={degree.end} />
                  {' · Grade '}
                  {isPending(degree.grade) ? <Todo note={degree.grade.todo} /> : degree.grade}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${cardClass} p-6`}>
          <h3 className="font-semibold">Languages</h3>
          <ul className="mt-4 divide-y divide-line">
            {languages.map((language) => (
              <li key={language.name} className="flex items-center justify-between gap-4 py-2.5">
                <span>{language.name}</span>
                <span className="rounded-full bg-surface-2 px-3 py-0.5 text-sm text-muted">
                  {isPending(language.level) ? <Todo note={language.level.todo} /> : language.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {certificates.length > 0 && (
          <div className={`${cardClass} p-6 sm:col-span-2`}>
            <h3 className="font-semibold">Certificates</h3>
            <ul className="mt-4 space-y-2">
              {certificates.map((certificate) => (
                <li key={certificate.title}>
                  {certificate.href ? (
                    <ExternalLink href={certificate.href}>{certificate.title}</ExternalLink>
                  ) : (
                    certificate.title
                  )}
                  <span className="text-muted">
                    {' '}
                    · {certificate.issuer} · {certificate.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  )
}
