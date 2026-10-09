import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the middle band of the screen,
 * so the navigation can mark it. Returns null when none is.
 */
export function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // A thin horizontal band a bit above the middle of the viewport.
      { rootMargin: '-35% 0px -60% 0px' },
    )
    for (const id of key.split(',')) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [key, enabled])

  return enabled ? active : null
}
