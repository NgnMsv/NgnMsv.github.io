import type { YearMonth } from '../content/types'

const monthFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const listFormat = new Intl.ListFormat('en', { type: 'conjunction' })

/** "2019-08" -> "Aug 2019" */
export function formatMonth(value: YearMonth): string {
  return monthFormat.format(new Date(`${value}-01T00:00:00Z`))
}

/** ["a", "b", "c"] -> "a, b, and c" */
export function formatList(items: string[]): string {
  return listFormat.format(items)
}
