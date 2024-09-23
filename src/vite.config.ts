import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "script",
      manifest: {
        "name": "PWA Template",
        "short_name": "PWA Template",
        "icons": [
          {"src":"/TSGB/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
          {"src":"/TSGB/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}
        ],
        "theme_color": "#285db1",
        "background_color": "#ffffff",
        "display": "standalone",
        "description": "A template for Progressive Web Apps",
        "start_url": "/template/",
        "lang": "en-gb"
      },
    registerType: 'autoUpdate'
    })
  ],
  base: "/template/",
  assetsInclude: "*.png",
  server: {
    port: 1234,
  },
  build: {
    outDir: "../../dist",
    sourcemap: true
  },
})


