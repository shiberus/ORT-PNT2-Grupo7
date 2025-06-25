import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: {
        name: 'TuTurno',
        short_name: 'TuTurno',
        description: 'App de turnos online',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'calendary.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'calendary.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html'
      }
    })
  ],

  server: {
    host: true
  },

  build: {
    sourcemap: true
  }
})
