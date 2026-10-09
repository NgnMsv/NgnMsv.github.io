import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { todo } from '../content/types'
import { testProfile } from '../test/fixtures'
import { Hero } from './Hero'

describe('Hero', () => {
  it('shows the name, role, pitch, and where the person is open to work', () => {
    render(<Hero profile={testProfile} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Ada Example' })).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('I build interfaces.')).toBeInTheDocument()
    expect(
      screen.getByText('Berlin, Germany · Open to on-site and remote work'),
    ).toBeInTheDocument()
  })

  it('links to the projects, the CV, and the contact section', () => {
    render(<Hero profile={testProfile} />)

    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /Download CV/ })).toHaveAttribute('href', '/ada-cv.pdf')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('shows a TODO placeholder for a missing CV in development', () => {
    render(<Hero profile={{ ...testProfile, cv: todo('CV PDF') }} />)

    expect(screen.queryByRole('link', { name: /Download CV/ })).not.toBeInTheDocument()
    expect(screen.getByText('TODO(content): CV PDF')).toBeInTheDocument()
  })

  it('shows nothing for a missing CV on the live site', () => {
    vi.stubEnv('DEV', false)
    render(<Hero profile={{ ...testProfile, cv: todo('CV PDF') }} />)

    expect(screen.queryByRole('link', { name: /Download CV/ })).not.toBeInTheDocument()
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument()
  })
})
