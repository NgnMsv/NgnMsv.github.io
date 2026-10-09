import { Link } from '../lib/router'
import { buttonClass } from './ui'

export function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="py-24">
      <h1 id="not-found-title" tabIndex={-1} className="text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-muted">There is nothing at this address.</p>
      <Link to="/" className={`${buttonClass.primary} mt-8`}>
        Go to the home page
      </Link>
    </section>
  )
}
