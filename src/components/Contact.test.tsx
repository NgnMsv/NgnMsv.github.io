import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { testProfile } from '../test/fixtures'
import { Contact } from './Contact'

describe('Contact', () => {
  it('links to the email address, LinkedIn, and GitHub', () => {
    render(<Contact profile={testProfile} />)

    expect(screen.getByRole('link', { name: 'ada@example.com' })).toHaveAttribute(
      'href',
      'mailto:ada@example.com',
    )
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      testProfile.linkedin,
    )
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', testProfile.github)
  })

  it('copies the email address and confirms it', async () => {
    const user = userEvent.setup() // also provides a working clipboard
    render(<Contact profile={testProfile} />)

    await user.click(screen.getByRole('button', { name: 'Copy email' }))

    expect(await navigator.clipboard.readText()).toBe('ada@example.com')
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied.')
  })

  it('tells the visitor when copying is not possible', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    render(<Contact profile={testProfile} />)

    await user.click(screen.getByRole('button', { name: 'Copy email' }))

    expect(screen.getByRole('status')).toHaveTextContent(/Could not copy/)
  })
})
