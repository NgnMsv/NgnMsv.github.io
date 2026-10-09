import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Degree } from '../content/types'
import { testProfile } from '../test/fixtures'
import { About } from './About'

const education: Degree[] = [
  { degree: 'M.Sc. Things', school: 'Uni A', start: '2026-04', end: null, grade: '2.0' },
]

describe('About', () => {
  it('shows the about text, photo, education, and languages', () => {
    render(<About profile={testProfile} education={education} certificates={[]} />)

    expect(screen.getByText('First paragraph.')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Ada.' })).toHaveAttribute('src', '/ada-200.jpg')
    expect(screen.getByText('M.Sc. Things')).toBeInTheDocument()
    expect(screen.getByText(/Apr 2026/).closest('p')).toHaveTextContent(
      'Apr 2026 – Present · Grade 2.0',
    )
    expect(screen.getByText('English').closest('li')).toHaveTextContent('EnglishC1')
  })

  it('hides the certificates block while there are none', () => {
    render(<About profile={testProfile} education={education} certificates={[]} />)

    expect(screen.queryByRole('heading', { name: 'Certificates' })).not.toBeInTheDocument()
  })

  it('lists certificates when there are some', () => {
    render(
      <About
        profile={testProfile}
        education={education}
        certificates={[{ title: 'Cert X', issuer: 'Issuer', year: '2024' }]}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Certificates' })).toBeInTheDocument()
    expect(screen.getByText('Cert X')).toBeInTheDocument()
  })

  it('never shows TODO placeholders on the live site', () => {
    vi.stubEnv('DEV', false)
    render(<About profile={testProfile} education={education} certificates={[]} />)

    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument()
  })
})
