import type { Job, YearMonth } from '../content/types'
import { formatMonth } from '../lib/format'
import { Section } from './ui'

export function DateRange({ start, end }: { start: YearMonth; end: YearMonth | null }) {
  return (
    <>
      <time dateTime={start}>{formatMonth(start)}</time>
      {' – '}
      {end ? <time dateTime={end}>{formatMonth(end)}</time> : 'Present'}
    </>
  )
}

export function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <Section id="experience" title="Experience">
      {/* The left border is the timeline; each entry hangs a dot on it. */}
      <ol className="space-y-12 border-l border-line">
        {jobs.map((job) => (
          <li key={`${job.company}-${job.start}`} className="relative pl-6 md:pl-8">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-accent"
            />
            <h3 className="text-xl font-semibold tracking-tight">
              {job.role} <span className="font-normal text-muted">· {job.company}</span>
            </h3>
            <p className="mt-1 text-sm text-muted">
              <DateRange start={job.start} end={job.end} />
              {job.note && <> · {job.note}</>}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="text-pretty">
                  {highlight}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
