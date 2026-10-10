# Negin Mousavi — portfolio

The source of <https://ngnmsv.github.io>. Built with React, TypeScript, Vite, and Tailwind CSS, and deployed to GitHub Pages by GitHub Actions.

For how the site works and why it is built this way, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Run it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. The page reloads when you save a file.

In development you see more than visitors do:

- Unpublished projects appear, marked "Draft — hidden on the live site".
- Missing content appears as yellow `TODO(content): …` badges.

To see exactly what visitors get, build the site and serve the result:

```bash
npm run build
npm run preview   # http://localhost:4173
```

## Commands

| Command             | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run dev`       | Start the development server                                            |
| `npm run build`     | Build the site into `dist/`                                             |
| `npm run preview`   | Serve `dist/` locally                                                   |
| `npm run lint`      | Check the code with ESLint                                              |
| `npm run typecheck` | Check the types with TypeScript                                         |
| `npm run test`      | Run unit and component tests (Vitest)                                   |
| `npm run e2e`       | Run end-to-end tests (Playwright) against the build; run `build` first  |
| `npm run check`     | Everything CI runs, in the same order                                   |
| `npm run og`        | Redraw the social preview image, `public/og.png`                        |

The first time you run the end-to-end tests, install the browser: `npx playwright install chromium`.

## Edit content

All text, links, and dates live in `src/content/`. You never need to touch a component to change content.

| File              | Content                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `profile.ts`      | Name, role, hero pitch, About text, email, links, CV, photo, languages |
| `projects.ts`     | Projects and their case studies                                      |
| `experience.ts`   | Jobs                                                                 |
| `education.ts`    | Degrees                                                              |
| `publications.ts` | Research                                                             |
| `certificates.ts` | Certificates (the block is hidden while the list is empty)           |
| `skills.ts`       | Skills by category                                                   |
| `site.ts`         | Site URL, page title, meta description, navigation                   |

TypeScript checks these files, so a missing field or a typo in a field name is reported by your editor and by `npm run typecheck`.

### Fill in a `TODO(content)`

Content that is not written yet is marked with `todo('…')`:

```ts
demo: todo('Fashion Companion: live demo link'),
```

Replace the whole `todo(...)` call with the real value:

```ts
demo: 'https://example.com/demo',
```

To find everything that is still open, search the project for `todo(` or run `grep -rn "todo(" src/content`.

### Publish a project

In `src/content/projects.ts`, set `published: true`. Only published projects are on the live site.

A project gets its own case-study page at `/projects/<slug>/` once at least one of the four case-study parts (`problem`, `built`, `decisions`, `results`) is written. Each part is a list of paragraphs:

```ts
caseStudy: {
  problem: ['First paragraph.', 'Second paragraph.'],
  built: todo('…'),      // parts that are still todo() are left out on the live site
  …
}
```

### Add the CV

1. Put the PDF in `public/`, for example `public/negin-mousavi-cv.pdf`.
2. In `src/content/profile.ts`, set `cv: '/negin-mousavi-cv.pdf'`.

The "Download CV" button appears in the hero.

### Change the photo

Put two square JPEGs in `public/images/` (200 px and 400 px wide) and update `photo` in `src/content/profile.ts`.

### Change the colours

Both themes are defined at the top of `src/index.css` as a short list of variables each (`--bg`, `--fg`, `--accent`, …). Change them there and every component follows. Keep text contrast at 4.5:1 or higher; <https://webaim.org/resources/contrastchecker/> checks a pair.

## Deploy

Deployment is automatic. Every push to `main` runs `.github/workflows/ci.yml`:

1. lint, typecheck, unit tests, build, end-to-end tests
2. if all pass, the `dist/` folder is published to GitHub Pages

If a step fails, nothing is deployed and the previous version stays online. You can watch a run under the repository's **Actions** tab.

One-time setup (already needed once per repository): **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Pushes to other branches and pull requests run the checks but do not deploy.

## Add a custom domain later

1. Buy the domain and, at your DNS provider, add the records GitHub asks for:
   - for a subdomain like `www.example.com`: a `CNAME` record pointing to `ngnmsv.github.io`
   - for an apex domain like `example.com`: the four `A` records listed in [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
2. In the repository: **Settings → Pages → Custom domain**, enter the domain, save, and tick **Enforce HTTPS** once it becomes available. Because the site is deployed by GitHub Actions, no `CNAME` file is needed in the repository.
3. In `src/content/site.ts`, change `url` to the new address (no trailing slash). This updates the canonical link, the Open Graph tags, `sitemap.xml`, and `robots.txt`.
4. Run `npm run og` to redraw the preview image with the new address, then commit and push.

`base` in `vite.config.ts` stays `'/'`, because a custom domain also serves the site from the root.

## The old site

The static site that was here before is kept under the git tag `legacy-static`. To look at it: `git checkout legacy-static`.
