import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { testProjects } from '../test/fixtures'
import { Projects } from './Projects'

function card(title: string) {
  const article = screen.getByRole('heading', { level: 3, name: title }).closest('article')
  if (!article) throw new Error(`No card found for "${title}"`)
  return within(article)
}

describe('Projects on the live site', () => {
  function renderLive() {
    vi.stubEnv('DEV', false)
    render(<Projects projects={testProjects} includeDrafts={false} />)
  }

  it('shows only published projects', () => {
    renderLive()

    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Finished Project',
      'Bare Project',
    ])
  })

  it('shows the description, tech tags, and links of a project', () => {
    renderLive()
    const finished = card('Finished Project')

    expect(finished.getByText('A project with everything filled in.')).toBeInTheDocument()
    expect(finished.getByText('TypeScript')).toBeInTheDocument()
    expect(finished.getByRole('link', { name: /Live demo/ })).toHaveAttribute(
      'href',
      'https://example.com/finished',
    )
    expect(finished.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/ada-example/finished',
    )
    expect(finished.getByRole('link', { name: /Case study/ })).toHaveAttribute(
      'href',
      '/projects/finished/',
    )
  })

  it('leaves out links that do not exist yet, without placeholders', () => {
    renderLive()
    const bare = card('Bare Project')

    expect(bare.queryByRole('link', { name: /Live demo/ })).not.toBeInTheDocument()
    expect(bare.queryByRole('link', { name: /Case study/ })).not.toBeInTheDocument()
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument()
  })
})

describe('Projects in development', () => {
  it('also shows drafts, marked as hidden, with TODO placeholders', () => {
    render(<Projects projects={testProjects} includeDrafts />)
    const draft = card('Draft Project')

    expect(draft.getByText('Draft — hidden on the live site')).toBeInTheDocument()
    expect(draft.getByText('TODO(content): summary')).toBeInTheDocument()
  })
})
