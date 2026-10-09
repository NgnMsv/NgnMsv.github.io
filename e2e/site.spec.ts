import { expect, test, type Page } from '@playwright/test'
import { nav, profile, projects } from '../src/content'
import { caseStudyProjects, projectPath } from '../src/lib/routes'

// On small screens the navigation sits behind the "Menu" button.
async function openMenuIfCollapsed(page: Page) {
  const menuButton = page.getByRole('button', { name: 'Menu' })
  if (await menuButton.isVisible()) await menuButton.click()
}

test('the home page loads with the name and role', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible()
  await expect(page).toHaveTitle(new RegExp(profile.name))
})

test('every navigation link scrolls to its section', async ({ page }) => {
  await page.goto('/')
  const mainNav = page.getByRole('navigation', { name: 'Main' })

  for (const item of nav) {
    await openMenuIfCollapsed(page)
    await mainNav.getByRole('link', { name: item.label, exact: true }).click()

    await expect(page).toHaveURL(new RegExp(`#${item.id}$`))
    await expect(page.getByRole('heading', { level: 2, name: item.label })).toBeInViewport()
  }
})

test('the theme switch works and is remembered after a reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).not.toHaveClass(/dark/)

  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(html).toHaveClass(/dark/)

  await page.reload()
  await expect(html).toHaveClass(/dark/)
})

test('the first visit follows the system colour scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')

  await expect(page.locator('html')).toHaveClass(/dark/)
})

test('the page does not scroll sideways', async ({ page }) => {
  await page.goto('/')

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
})

test('an unknown address shows the not-found page with a way home', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')

  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await page.getByRole('link', { name: 'Go to the home page' }).click()
  await expect(page.getByRole('heading', { level: 1, name: profile.name })).toBeVisible()
})

test('the live site never shows TODO placeholders or drafts', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('TODO(content)')).toHaveCount(0)
  const projectsSection = page.locator('#projects')
  for (const project of projects.filter((candidate) => !candidate.published)) {
    await expect(projectsSection.getByRole('heading', { name: project.title })).toHaveCount(0)
  }
})

// Case-study pages exist on the live site only for projects with written content.
const liveCaseStudies = caseStudyProjects(projects, false)

test('case-study pages open from a direct link and survive a refresh', async ({ page }) => {
  test.skip(liveCaseStudies.length === 0, 'No case study has been written yet')

  for (const project of liveCaseStudies) {
    await page.goto(projectPath(project.slug))
    await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible()

    await page.reload()
    await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible()

    await page.getByRole('link', { name: /All projects/ }).click()
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Projects' })).toBeInViewport()
  }
})
