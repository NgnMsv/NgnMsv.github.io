import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { NavItem } from '../content/types'
import { Header } from './Header'

const nav: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

describe('Header', () => {
  it('links to the sections of the home page', () => {
    render(<Header name="Ada Example" nav={nav} onHome />)

    const main = screen.getByRole('navigation', { name: 'Main' })
    expect(main).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('links back to the home page sections from other pages', () => {
    render(<Header name="Ada Example" nav={nav} onHome={false} />)

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
  })

  it('has a skip link as the first focusable element', async () => {
    const user = userEvent.setup()
    render(<Header name="Ada Example" nav={nav} onHome />)

    await user.tab()

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
  })

  it('opens and closes the menu on small screens', async () => {
    const user = userEvent.setup()
    render(<Header name="Ada Example" nav={nav} onHome />)
    const menuButton = screen.getByRole('button', { name: 'Menu' })

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('switches between light and dark theme and remembers the choice', async () => {
    const user = userEvent.setup()
    render(<Header name="Ada Example" nav={nav} onHome />)

    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))

    expect(document.documentElement).toHaveClass('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })
})
