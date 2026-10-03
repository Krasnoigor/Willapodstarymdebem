import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Cloudflare Pages ustawia CF_PAGES=1 podczas builda — wtedy strona stoi w katalogu głównym
  base: process.env.CF_PAGES ? '/' : '/klient/willa-pod-starym-debem/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
