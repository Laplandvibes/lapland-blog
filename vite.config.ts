import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Critical: shared/ lives outside this project. Without dedupe, two React
    // instances ship in the bundle and useContext returns null on shared
    // components — site renders a blank deep-night page in production.
    // See lv_critical_react_dedupe.md.
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
})
