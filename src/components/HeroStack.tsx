/*
 * The 3D picture in the hero: one small page, taken apart into three layers
 * that float above each other — the wireframe, the components, and the
 * finished interface. It is decoration only (hidden from screen readers) and
 * is built from plain elements and CSS 3D transforms; see `.stack` in
 * index.css. The hero moves it with the mouse through `--px` / `--py`.
 */

type Variant = 'wire' | 'blocks' | 'ui'

const layers: Variant[] = ['wire', 'blocks', 'ui']

export function HeroStack() {
  return (
    <div aria-hidden="true" className="scene">
      <div className="stack-float">
        <div className="stack">
          {layers.map((variant, index) => (
            <div
              key={variant}
              className={`layer layer-${variant}`}
              style={{ '--i': index } as React.CSSProperties}
            >
              <MockPage variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// How a box looks on the two lower layers. On the top layer each box has its own look.
const outline: Record<Exclude<Variant, 'ui'>, string> = {
  wire: 'border border-dashed border-fg/40',
  blocks: 'border border-accent/35 bg-accent-soft',
}

/** The same miniature page on every layer; only the look of its boxes differs. */
function MockPage({ variant }: { variant: Variant }) {
  const look = (finished: string) => (variant === 'ui' ? finished : outline[variant])

  return (
    <div className="flex size-full flex-col gap-3 p-4">
      <div className="flex items-center gap-1.5">
        <div className={`size-5 rounded-md ${look('bg-linear-to-br from-accent to-accent-2')}`} />
        <div className="flex-1" />
        <div className={`h-2 w-6 rounded-full ${look('bg-fg/15')}`} />
        <div className={`h-2 w-6 rounded-full ${look('bg-fg/15')}`} />
        <div className={`h-2 w-6 rounded-full ${look('bg-fg/15')}`} />
      </div>
      <div
        className={`mt-2 h-5 w-3/4 rounded-md ${look('bg-linear-to-r from-accent to-accent-2')}`}
      />
      <div className={`h-2 w-full rounded-full ${look('bg-fg/15')}`} />
      <div className={`h-2 w-2/3 rounded-full ${look('bg-fg/15')}`} />
      <div className="flex gap-2">
        <div className={`h-5 w-16 rounded-full ${look('bg-accent')}`} />
        <div className={`h-5 w-12 rounded-full ${look('border border-fg/25')}`} />
      </div>
      <div
        className={`mt-1 flex flex-1 flex-col gap-2 rounded-lg p-2 ${look('border border-line bg-surface-2')}`}
      >
        <div
          className={`flex-1 rounded-md ${look('bg-linear-to-br from-accent-soft to-surface')}`}
        />
        <div className={`h-2 w-3/4 rounded-full ${look('bg-fg/15')}`} />
        <div className={`h-2 w-1/2 rounded-full ${look('bg-fg/15')}`} />
      </div>
    </div>
  )
}
