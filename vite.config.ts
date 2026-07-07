import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import compression from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression({ algorithms: ['brotliCompress'], threshold: 1024 })],
  resolve: {
    // Critical: shared/ lives outside this project. Without dedupe, two React
    // instances ship in the bundle and useContext returns null on shared
    // components — site renders a blank deep-night page in production.
    // See lv_critical_react_dedupe.md.
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
            if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'ui-vendor'
          }
          // NOTE: locales are now per-language lazy chunks (copy.<lang>.ts via
          // dynamic import in src/locales/copy.ts) — do NOT force them into a
          // single 'locales' chunk here, that would re-bundle all 11 languages.
          return undefined
        },
      },
    },
  },
})
