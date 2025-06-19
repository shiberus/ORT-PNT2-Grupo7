import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'



const manifestForPlugin = {
  registerType: 'autoUpdate',

  strategies: [],
  manifest:
  {
  name: 'TuTurno',
  short_name: 'TuTurno',
  description: 'App de turnos online',
  theme_color: '#1a1a1a',
  background_color: '#1a1a1a',
  start_url: '/',
  display: 'standalone',
  orientation: 'portrait',
  icons: [],
  },
devOptions: {
  enabled: true,
  navigateFallback: 'index.html'
}
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugin)],

  server: {
    host: true
  },
  build: {
    sourcemap: true
  }
})
