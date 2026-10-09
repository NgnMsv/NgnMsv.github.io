import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Job } from '../content/types'
import { Experience } from './Experience'

const jobs: Job[] = [
  {
    role: 'Frontend Developer',
    company: 'Acme',
    start: '2019-08',
    end: '2021-12',
    note: 'Part-time',
    highlights: ['Built things.', 'Fixed things.'],
  },
  { role: 'Intern', company: 'Globex', start: '2024-03', end: null, highlights: ['Learned.'] },
]

describe('Experience', () => {
  it('lists each job with its role, company, dates, and highlights', () => {
    render(<Experience jobs={jobs} />)

    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Frontend Developer · Acme' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Aug 2019/).closest('p')).toHaveTextContent(
      'Aug 2019 – Dec 2021 · Part-time',
    )
    expect(screen.getByText('Fixed things.')).toBeInTheDocument()
  })

  it('shows "Present" for a job without an end date', () => {
    render(<Experience jobs={jobs} />)

    expect(screen.getByText(/Mar 2024/).closest('p')).toHaveTextContent('Mar 2024 – Present')
  })
})
