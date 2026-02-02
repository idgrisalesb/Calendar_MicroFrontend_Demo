/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode !== 'test' && federation({
      name: 'mfe_calendar',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/modules/calendar/presentation/Widget.tsx',
      },
      shared: ['react', 'react-dom', 'siesa-ui-kit'],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'chrome89',
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
}))
