import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Publication } from '../content/types'
import { Research } from './Research'

const publications: Publication[] = [
  {
    title: 'A Published Paper',
    date: '2025',
    venue: 'Some Journal',
    coAuthors: ['A. One', 'B. Two'],
    links: [{ label: 'Paper', href: 'https://example.com/paper' }],
  },
  { title: 'Work in Progress', date: 'Ongoing', links: [] },
]

describe('Research', () => {
  it('shows each publication with its venue, co-authors, and links', () => {
    render(<Research publications={publications} />)

    expect(screen.getByRole('heading', { level: 3, name: 'A Published Paper' })).toBeInTheDocument()
    expect(screen.getByText('2025 · Some Journal · With A. One and B. Two')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Paper: A Published Paper/ })).toHaveAttribute(
      'href',
      'https://example.com/paper',
    )
  })

  it('renders a publication without links', () => {
    render(<Research publications={publications} />)

    expect(screen.getByRole('heading', { level: 3, name: 'Work in Progress' })).toBeInTheDocument()
    expect(screen.getByText('Ongoing')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })
})
