import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skills } from './Skills'

describe('Skills', () => {
  it('groups skills by category', () => {
    render(
      <Skills
        groups={[
          { category: 'Frontend', skills: ['React', 'TypeScript'] },
          { category: 'Testing', skills: ['Vitest'] },
        ]}
      />,
    )

    const frontend = within(screen.getByRole('list', { name: 'Frontend skills' }))
    expect(frontend.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'React',
      'TypeScript',
    ])
    expect(screen.getByRole('heading', { level: 3, name: 'Testing' })).toBeInTheDocument()
  })
})
