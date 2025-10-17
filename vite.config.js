import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Removed vueDevTools import as it's not needed for production build

// https://vitejs.dev/config/
export default defineConfig({
  // **CRITICAL FIX: Sets the base path for assets to the GitHub repo name**
  base: '/frontend-coursework1/',
  plugins: [
    vue(),
    // viteDevTools() removed - not needed for deployment
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})