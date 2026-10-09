import { defineConfig } from '@playwright/test'

// Not a test suite: `npm run og` uses Playwright's browser to draw the
// social-media preview image (public/og.png) from the content files.
export default defineConfig({
  testDir: '.',
  testMatch: 'og-image.ts',
  reporter: 'line',
})
