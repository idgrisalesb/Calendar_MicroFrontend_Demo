/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/calendar/',
  plugins: [
    tailwindcss(),
    react(),
    mode !== 'test' && vitePluginSingleSpa({
      type: 'mfe',
      serverPort: 3002,
      spaEntryPoint: 'src/spa.tsx',
    }),
  ],
  server: {
    port: 3002,
  },
  build: {
    target: 'chrome89',
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
}))
