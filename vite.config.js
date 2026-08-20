import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: false, // we ship our own public/manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'weather-cache', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 30 } }
          },
          {
            urlPattern: /^https:\/\/geocoding-api\.open-meteo\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'geo-cache', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 } }
          },
          {
            urlPattern: /^https:\/\/air-quality-api\.open-meteo\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'aqi-cache', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 30 } }
          }
        ]
      }
    })
  ]
})
