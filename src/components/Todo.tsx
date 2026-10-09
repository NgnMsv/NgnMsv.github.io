/**
 * A placeholder for content that has not been written yet. Visible in
 * development so nothing is forgotten; renders nothing in production so
 * unfinished content never reaches the live site.
 */
export function Todo({ note }: { note: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <span
      data-todo
      className="inline-block rounded border border-dashed border-amber-700 bg-amber-100 px-1.5 py-0.5 font-mono text-xs text-amber-950"
    >
      TODO(content): {note}
    </span>
  )
}
