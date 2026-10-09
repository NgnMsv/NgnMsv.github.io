import { test } from '@playwright/test'
import { profile } from '../src/content/profile'
import { site } from '../src/content/site'

/*
 * Draws public/og.png, the 1200x630 image shown when the site is shared on
 * LinkedIn, Slack, etc. Run `npm run og` after changing your name or role.
 */
test('draw the Open Graph image', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(`
    <body style="margin:0;width:1200px;height:630px;box-sizing:border-box;padding:90px;
      background:#fbfaf8;color:#1c1917;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;
      display:flex;flex-direction:column;justify-content:center;border-left:28px solid #9f1239">
      <div style="font:600 30px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.12em;
        text-transform:uppercase;color:#9f1239">${profile.role}</div>
      <div style="font-size:112px;font-weight:700;letter-spacing:-.03em;margin-top:24px;line-height:1.05">
        ${profile.name}</div>
      <div style="font-size:36px;color:#57534e;margin-top:36px">
        ${profile.location} · ${new URL(site.url).host}</div>
    </body>`)
  await page.screenshot({ path: 'public/og.png' })
})
