import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { staticPages } from './build/static-pages.ts'

export default defineConfig({
  // The repo is named <user>.github.io, so the site is served from the domain
  // root. A project repo (github.com/user/portfolio) would need '/portfolio/'.
  base: '/',
  plugins: [react(), tailwindcss(), staticPages()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
