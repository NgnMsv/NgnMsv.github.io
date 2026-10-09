import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'
import { profile } from '../src/content/profile.ts'
import { projects } from '../src/content/projects.ts'
import { site } from '../src/content/site.ts'
import {
  caseStudyProjects,
  projectPath,
  routeMeta,
  type PageMeta,
  type Route,
} from '../src/lib/routes.ts'

/*
 * A small Vite plugin that turns the content files into the static files a
 * multi-page site needs on GitHub Pages:
 *
 * 1. Fills the %PLACEHOLDERS% in index.html (title, description, Open Graph).
 * 2. After the build, writes one copy of index.html per page, e.g.
 *    dist/projects/fashion-companion/index.html, each with its own <head>.
 *    GitHub Pages only serves files that exist, so this is what makes deep
 *    links and page refreshes return a normal "200 OK" instead of a 404.
 * 3. Writes 404.html (for addresses that really do not exist), sitemap.xml
 *    and robots.txt.
 */

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function absoluteUrl(pagePath: string): string {
  return new URL(pagePath, `${site.url}/`).href
}

/** Rewrites the page-specific tags in <head> for one page. */
function withHead(html: string, meta: PageMeta, pagePath: string, noindex = false): string {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const url = escapeHtml(absoluteUrl(pagePath))

  const setContent = (source: string, attribute: string, value: string) =>
    source.replace(new RegExp(`(<meta ${attribute} content=")[^"]*(")`), `$1${value}$2`)

  let result = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  result = setContent(result, 'name="description"', description)
  result = setContent(result, 'property="og:title"', title)
  result = setContent(result, 'property="og:description"', description)
  result = setContent(result, 'property="og:image:alt"', title)
  result = setContent(result, 'property="og:url"', url)
  result = result.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  if (noindex) {
    result = result.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />')
  }
  return result
}

function sitemap(paths: string[]): string {
  const urls = paths.map((pagePath) => `  <url><loc>${escapeHtml(absoluteUrl(pagePath))}</loc></url>`)
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

export function staticPages(): Plugin {
  let outDir = 'dist'
  const home = routeMeta({ name: 'home' }, site, profile.name)

  return {
    name: 'static-pages',

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const values: Record<string, string> = {
          LOCALE: site.locale,
          TITLE: home.title,
          DESCRIPTION: home.description,
          NAME: profile.name,
          ROLE: profile.role,
          EMAIL: profile.email,
          URL: absoluteUrl('/'),
          OG_IMAGE: absoluteUrl(site.ogImage),
        }
        return html.replace(/%([A-Z_]+)%/g, (placeholder, key: string) =>
          key in values ? escapeHtml(values[key] ?? '') : placeholder,
        )
      },
    },

    async closeBundle() {
      // Only for real builds; `vite dev` and Vitest never get here with output.
      let indexHtml: string
      try {
        indexHtml = await readFile(path.join(outDir, 'index.html'), 'utf8')
      } catch {
        return
      }

      // `false`: the live site never includes drafts.
      const pages = caseStudyProjects(projects, false)

      for (const project of pages) {
        const route: Route = { name: 'project', project }
        const pagePath = projectPath(project.slug)
        const dir = path.join(outDir, pagePath)
        await mkdir(dir, { recursive: true })
        await writeFile(
          path.join(dir, 'index.html'),
          withHead(indexHtml, routeMeta(route, site, profile.name), pagePath),
        )
      }

      await writeFile(
        path.join(outDir, '404.html'),
        withHead(indexHtml, routeMeta({ name: 'not-found' }, site, profile.name), '/404.html', true),
      )
      await writeFile(
        path.join(outDir, 'sitemap.xml'),
        sitemap(['/', ...pages.map((project) => projectPath(project.slug))]),
      )
      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`,
      )
    },
  }
}
