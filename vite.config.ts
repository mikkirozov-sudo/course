import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// Tailwind v4 uses the Vite plugin (CSS-first @theme config — no tailwind.config.js).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@tokens': fileURLToPath(new URL('./tokens', import.meta.url)),
      '@styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@fonts': fileURLToPath(new URL('./fonts', import.meta.url)),
    },
  },
})
