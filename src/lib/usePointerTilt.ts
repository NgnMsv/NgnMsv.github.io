import { useEffect, useRef } from 'react'

/**
 * Tracks the mouse over an element and writes its position to two CSS
 * variables on that element: `--px` and `--py`, each from -1 (left/top edge)
 * to 1 (right/bottom edge). The 3D tilt itself is plain CSS that reads them
 * (see `.tilt` and `.stack` in index.css).
 *
 * Does nothing for touch input, or when the visitor asked for reduced motion.
 */
export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      // At most one style update per frame, however fast the mouse moves.
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = element.getBoundingClientRect()
        const px = ((event.clientX - box.left) / box.width) * 2 - 1
        const py = ((event.clientY - box.top) / box.height) * 2 - 1
        element.style.setProperty('--px', px.toFixed(3))
        element.style.setProperty('--py', py.toFixed(3))
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      element.style.removeProperty('--px')
      element.style.removeProperty('--py')
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}
