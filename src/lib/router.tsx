import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

/*
 * A very small client-side router built on the History API. The site has two
 * kinds of pages (home and case study), so a routing library would be more
 * code than the problem needs.
 */

const NAVIGATE_EVENT = 'app:navigate'

export type NavigationType = 'load' | 'push' | 'pop'

let lastNavigation: NavigationType = 'load'

/** How the current page was reached. Used to decide whether to reset scroll. */
export function getNavigationType(): NavigationType {
  return lastNavigation
}

function subscribe(onChange: () => void): () => void {
  const onPop = () => {
    lastNavigation = 'pop'
    onChange()
  }
  window.addEventListener('popstate', onPop)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onPop)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

function getPathname(): string {
  return window.location.pathname
}

export function usePathname(): string {
  return useSyncExternalStore(subscribe, getPathname)
}

export function navigate(to: string): void {
  lastNavigation = 'push'
  window.history.pushState(null, '', to)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

/** An internal link: a real <a href>, upgraded to a client-side navigation. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    const isPlainLeftClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (event.defaultPrevented || !isPlainLeftClick) return

    // A link to another part of the page we are already on (e.g. "#skills")
    // is left to the browser, which scrolls and updates the URL by itself.
    const target = new URL(to, window.location.href)
    if (target.pathname === window.location.pathname && target.hash) return

    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...rest} />
}
