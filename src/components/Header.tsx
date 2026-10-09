import { useEffect, useState } from 'react'
import type { NavItem } from '../content/types'
import { Link } from '../lib/router'
import { useActiveSection } from '../lib/useActiveSection'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  name: string
  nav: NavItem[]
  /** On the home page the links scroll; on other pages they lead back to it. */
  onHome: boolean
}

export function Header({ name, nav, onHome }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(
    nav.map((item) => item.id),
    onHome,
  )

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          to="/"
          className="font-semibold tracking-tight text-fg"
          onClick={() => setMenuOpen(false)}
        >
          {name}
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main">
            {/* One list for both layouts: a row on wide screens, a dropdown panel on small ones. */}
            <ul
              id="main-menu"
              className={`${
                menuOpen ? 'flex' : 'hidden'
              } absolute inset-x-0 top-16 flex-col border-b border-line bg-bg px-5 py-3 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0`}
            >
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={onHome ? `#${item.id}` : `/#${item.id}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors hover:text-fg aria-[current]:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-fg md:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
