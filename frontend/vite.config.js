import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Render (and local dev) serve from the domain root; the GitHub Pages
  // preview lives at a /optiwave_website/ subpath, set only by the Pages
  // Actions workflow (.github/workflows/deploy-pages.yml).
  base: process.env.GH_PAGES === 'true' ? '/optiwave_website/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})