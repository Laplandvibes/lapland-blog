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
          // Split locale COPY into its own chunk so the main entry bundle stays
          // small. Loaded in parallel with main.
          if (id.includes('/src/locales/copy') || id.includes('\\src\\locales\\copy')) return 'locales'
          return undefined
        },
      },
    },
  },
})
