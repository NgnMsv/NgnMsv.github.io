# How this site works

A plain-language walkthrough of the project: what is where, how content reaches the screen, how routing and deployment work, and why each tool was chosen.

## The short version

The site is a React app written in TypeScript and built with Vite into static files (HTML, CSS, JavaScript, images). There is no server and no database. GitHub Actions checks every change and publishes the built files to GitHub Pages.

Three ideas shape the code:

1. **Content is data, components are templates.** Everything a visitor reads lives in typed files under `src/content/`. Components receive that data as props and render it.
2. **Missing content is explicit.** A value that is not written yet is a `todo('…')` marker, not an empty string or invented text. It shows as a badge in development and as nothing on the live site.
3. **Every page is a real file.** The build writes one HTML file per page, so links and refreshes work on GitHub Pages without redirect tricks.

## Folder structure

```
index.html                 The one HTML page; its %PLACEHOLDERS% are filled from content
vite.config.ts             Build and test configuration
build/static-pages.ts      Build step: fills <head>, writes per-page HTML, sitemap, robots.txt
src/
  main.tsx                 Starts React
  App.tsx                  Picks the page for the current URL and passes content to sections
  index.css                Tailwind import, colour tokens for both themes, base styles
  content/                 ALL content, as typed TypeScript
    types.ts               The shape of every content file, and the todo() marker
    profile.ts, projects.ts, experience.ts, education.ts,
    publications.ts, certificates.ts, skills.ts, site.ts
  components/              One file per section (Hero, About, Projects, …) plus tests
    ui.tsx                 Shared pieces: Section, TagList, ExternalLink, button styles
    Todo.tsx               The TODO(content) badge
  lib/
    routes.ts              Which pages exist; URL -> page (pure functions)
    router.tsx             The client-side router: usePathname(), navigate(), <Link>
    theme.ts               Light/dark theme hook
    useActiveSection.ts    Highlights the current section in the navigation
    usePointerTilt.ts      Writes the mouse position into CSS variables for the 3D effects
    format.ts              Date and list formatting
  test/                    Test setup and made-up fixture data
e2e/site.spec.ts           End-to-end tests (Playwright)
tools/og-image.ts          Draws the social preview image
.github/workflows/ci.yml   Checks and deployment
public/                    Files copied as-is: favicon, photo, og.png
```

## How content flows into components

```
src/content/*.ts  ──►  App.tsx  ──►  <Hero profile={profile} />, <Projects projects={projects} />, …
        │
        └──────────►  build/static-pages.ts  ──►  <title>, meta tags, sitemap.xml
```

- `src/content/types.ts` defines an interface for each kind of content (`Profile`, `Project`, `Job`, …). The content files must match these interfaces, so TypeScript catches a missing field or a misspelled key before the site is built.
- `App.tsx` is the only place that imports the content. It hands each section the data it needs as props.
- Sections never contain content of their own. That is why the component tests can pass in made-up data (`src/test/fixtures.ts`) and keep passing when the real content changes.

### Missing content: `Maybe<T>` and `todo()`

A field that might not be written yet has the type `Maybe<T>`, which means "either a real value or a `todo` marker":

```ts
demo: Maybe<string>                       // in the type
demo: todo('Fashion Companion: live demo link')   // in the content
```

Because the type says the value may be missing, TypeScript forces every component to handle that case. Components check with `isPending(value)` and render `<Todo />` instead. `<Todo />` shows a yellow badge when `import.meta.env.DEV` is true (the dev server and tests) and returns nothing in a production build.

The result: nothing unfinished can reach the live site by accident, and nothing is forgotten, because it is visible every time the dev server runs.

### Published and draft projects

Each project has a `published` flag. `lib/routes.ts` has two small functions that decide what exists:

- `visibleProjects(projects, includeDrafts)` — the cards in the Projects section.
- `caseStudyProjects(projects, includeDrafts)` — the projects that get their own page. On the live site a project also needs at least one written case-study part, so there is never an empty page.

`includeDrafts` is `true` in development and `false` in production. The functions take it as an argument instead of reading the environment themselves, so the exact same functions are used by the browser code, the tests, and the build step.

## Routing

The site has two kinds of pages: the home page (`/`) with all sections, and one case-study page per project (`/projects/<slug>/`).

### In the browser

`lib/router.tsx` is a small router of about 60 lines built on the browser's History API:

- `<Link to="…">` renders a normal `<a href>`. On a plain click it calls `history.pushState` instead of loading a new page. Ctrl/Cmd-click and "open in new tab" still work, because it is a real link.
- `usePathname()` gives a component the current path and re-renders it when the path changes. It uses React's `useSyncExternalStore`, the hook made for subscribing to something outside React (here: the URL).
- `App.tsx` calls `matchRoute(pathname, pages)` and renders the home page, a case study, or the not-found page.

After a page change, `App.tsx` scrolls to the top (or to the `#section` in the URL) and moves focus to the new page's `<h1>`, so keyboard and screen-reader users are told that the page changed.

**Why no React Router?** Two page types do not justify a dependency. Writing the router by hand keeps the bundle smaller and is something I can explain line by line.

### On GitHub Pages: why deep links and refreshes work

GitHub Pages is a plain file server. If someone opens `/projects/fashion-companion/` directly, it looks for a file at that path. A single-page app normally has only `index.html`, so the server would answer "404".

The two common workarounds are hash URLs (`/#/projects/…`), which are ugly and poor for SEO, and a `404.html` that redirects back to the app, which technically answers every deep link with an error status.

This site does neither. After Vite builds `dist/index.html`, the plugin in `build/static-pages.ts` writes a copy of it for every page:

```
dist/index.html
dist/projects/fashion-companion/index.html     (once its case study is written)
dist/404.html
dist/sitemap.xml
dist/robots.txt
```

Each copy loads the same JavaScript but has its own `<title>`, description, canonical URL, and Open Graph tags. So a deep link or a refresh finds a real file, gets a normal "200 OK", and shows the right preview when shared. The app then starts, reads the URL, and renders that page.

`404.html` is what GitHub Pages serves for an address that truly does not exist. It also loads the app, which shows the "Page not found" view. It is marked `noindex` so search engines ignore it.

The list of pages comes from the same `caseStudyProjects()` function the app uses, so the router and the generated files cannot disagree.

### `base` and the repository name

The repository is named `NgnMsv.github.io`. GitHub serves a repository with that special name at the root of the domain, `https://ngnmsv.github.io/`, so Vite's `base` is `'/'`. A repository with any other name would be served from `/<repo-name>/`, and `base`, every asset path, and the router would have to account for that prefix.

## Theme (light and dark)

- Colours are CSS variables defined once in `src/index.css`: one set under `:root` (light) and one under `.dark`. Tailwind is told about them with `@theme inline`, which creates classes like `bg-bg`, `text-muted`, and `text-accent`. Components use only these names, so no component knows which theme is active.
- A small inline script in `index.html` runs before the first paint. It adds the `dark` class if the visitor saved that choice, or, on a first visit, if their system prefers dark. Doing this before React loads prevents a flash of the wrong theme.
- `lib/theme.ts` powers the switch in the header. A click toggles the class and saves the choice in `localStorage`. Until the visitor chooses, the site keeps following the system setting.

## Styling

Tailwind CSS v4 through its Vite plugin. Styles are utility classes in the components; there is no separate stylesheet per component. Repeated class lists (buttons, text links) live as constants in `components/ui.tsx`. Fonts are the system fonts, so there is no font download and no layout shift while one loads.

## Accessibility

- Semantic HTML: one `<h1>` per page, sections labelled by their headings, lists for lists, `<time>` for dates, a real `<button>` for every action.
- A "Skip to content" link is the first focusable element.
- Every interactive element has a visible focus outline. Buttons and navigation links are at least 44 px tall for touch.
- The mobile menu button exposes `aria-expanded` and closes with Escape.
- Links that open a new tab say so to screen readers. Repeated link texts ("GitHub") carry a hidden suffix with the project name.
- The "copy email" result is announced through a `role="status"` region.
- All colour pairs meet WCAG AA contrast in both themes.
- `prefers-reduced-motion` turns off smooth scrolling and transitions.

## Performance

- No web fonts, no UI library, no router library, no analytics. The JavaScript is React plus the site's own code.
- Content images are the portrait (two sizes via `srcset`) and one screenshot per project card. All have a fixed `width`/`height` (no layout shift) and are lazy-loaded, because they sit below the first screen.
- The glow behind the top of the page and the gradients are plain CSS, not images.
- The 3D effects use no library and no canvas. The layered page in the hero (`components/HeroStack.tsx`) is a handful of elements placed with CSS 3D transforms; cards tilt with the same technique. The only JavaScript is `lib/usePointerTilt.ts`, about 40 lines that write the mouse position into two CSS variables, at most once per frame.
- Sections fade in and the line under the header grows with CSS scroll-driven animations (`animation-timeline`). Browsers without support simply show the content; no scroll listener runs.
- With `prefers-reduced-motion`, the tilt, the floating, and the fade-in are all off.
- Vite fingerprints the CSS and JavaScript file names, so browsers can cache them for a long time.

## Testing

| Level       | Tool                           | What it covers                                                                                           |
| ----------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Unit        | Vitest                         | `lib/routes.ts`: which projects are visible, which URL maps to which page                                 |
| Component   | Vitest + React Testing Library | Each section renders its data; TODO badges appear in dev and vanish in production; menu, theme, copy button |
| Integration | Vitest + React Testing Library | The whole app with real content: all sections exist, navigation to a case study and back, not-found page |
| End-to-end  | Playwright                     | The production build in a real browser, desktop and phone size: nav links scroll to sections, theme persists, no sideways scroll, no TODO or draft leaks |

Tests find elements the way a user would — by role and visible name (`getByRole('link', { name: 'Contact' })`) — so they also act as a basic accessibility check: if a test cannot find a button by its name, neither can a screen reader.

The end-to-end tests run against `vite preview`, which serves the same `dist/` folder that gets deployed.

## Deployment

`.github/workflows/ci.yml` has two jobs:

1. **check** — runs on every push and pull request: install, lint, typecheck, unit tests, build, end-to-end tests. On `main` it then uploads `dist/` as a Pages artifact.
2. **deploy** — runs only on `main` and only if `check` passed. It uses GitHub's official `actions/deploy-pages` action to publish the artifact.

Consequences worth knowing:

- A failing test blocks the deploy; the previous version stays online.
- The built files are never committed. The repository holds only source code.
- The deploy job gets only the two permissions it needs (`pages: write`, `id-token: write`); everything else is read-only.

## Why each tool

| Tool                           | Why                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| React                          | Component model fits a page made of repeated, data-driven sections; it is the library I used in production at Nobitex    |
| TypeScript (strict, no `any`)  | The content files are checked against interfaces, and `Maybe<T>` makes "not written yet" impossible to ignore |
| Vite                           | Fast dev server, simple static build, and a plugin API small enough to write the page generator in one file |
| Tailwind CSS                   | Styles sit next to the markup; design tokens (colours) are defined once and used everywhere           |
| Vitest                         | Shares Vite's configuration, so tests compile exactly like the app                                    |
| React Testing Library          | Tests behaviour through roles and text instead of implementation details                              |
| Playwright                     | Tests the built site in a real browser at desktop and phone sizes                                     |
| ESLint + typescript-eslint     | Catches mistakes the compiler does not, such as broken rules of hooks                                 |
| GitHub Actions + GitHub Pages  | Free, lives next to the code, and every deploy is gated by the full test suite                        |

## Decisions I can explain in an interview

- **Typed content files instead of a CMS or Markdown.** The site is small and has one editor. TypeScript files give autocompletion and compile-time checks with zero extra tooling.
- **`todo()` markers instead of placeholder text.** Placeholder text can ship by accident. A typed marker cannot be rendered as content, and the compiler forces every component to deal with it.
- **A hand-written router instead of React Router.** Two page types; about 60 lines; no dependency.
- **Per-page HTML files instead of hash routing or a 404 redirect.** Real URLs, correct status codes, correct link previews, and no special handling in the app.
- **Pure functions that take `includeDrafts`.** One source of truth for "what exists", shared by the app, the tests, and the build.
- **Theme chosen before first paint.** A few lines of inline script avoid a visible flash, which a React-only solution cannot.
- **System fonts and no extra libraries.** The fastest request is the one that is never made.
