import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App'
import { nav, profile, projects, site } from './content'

// These tests run the whole app with the real content, in development mode
// (drafts and TODO placeholders visible).

describe('App', () => {
  it('renders the home page with one section per navigation item', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    for (const item of nav) {
      expect(screen.getByRole('heading', { level: 2, name: item.label })).toBeInTheDocument()
      expect(document.getElementById(item.id)).toBeInTheDocument()
    }
    expect(document.title).toBe(site.title)
  })

  it('opens a case study from its project card and comes back', async () => {
    const user = userEvent.setup()
    const project = projects[0]
    if (!project) throw new Error('The content has no projects')
    render(<App />)

    await user.click(screen.getByRole('link', { name: `Case study: ${project.title}` }))

    expect(window.location.pathname).toBe(`/projects/${project.slug}/`)
    const heading = screen.getByRole('heading', { level: 1, name: project.title })
    expect(heading).toHaveFocus()
    expect(document.title).toBe(`${project.title} — ${profile.name}`)

    await user.click(screen.getByRole('link', { name: /All projects/ }))

    expect(window.location.pathname).toBe('/')
    expect(window.location.hash).toBe('#projects')
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
  })

  it('shows a not-found page for an unknown address', () => {
    window.history.replaceState(null, '', '/does-not-exist')
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/')
  })
})
