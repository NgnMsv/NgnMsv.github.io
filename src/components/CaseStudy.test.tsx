import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { finishedProject } from '../test/fixtures'
import { CaseStudy } from './CaseStudy'

describe('CaseStudy', () => {
  it('shows the project and its written case-study parts', () => {
    render(<CaseStudy project={finishedProject} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Finished Project' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'The problem' })).toBeInTheDocument()
    expect(screen.getByText('The decisions text.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /All projects/ })).toHaveAttribute('href', '/#projects')
  })

  it('marks an unwritten part as TODO in development', () => {
    render(<CaseStudy project={finishedProject} />)

    expect(screen.getByRole('heading', { level: 2, name: 'Results' })).toBeInTheDocument()
    expect(screen.getByText('TODO(content): results')).toBeInTheDocument()
  })

  it('skips an unwritten part on the live site', () => {
    vi.stubEnv('DEV', false)
    render(<CaseStudy project={finishedProject} />)

    expect(screen.queryByRole('heading', { level: 2, name: 'Results' })).not.toBeInTheDocument()
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument()
  })
})
