import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Domyślnie strona stoi w katalogu głównym (Cloudflare Pages, własna domena).
  // Podkatalog można wymusić zmienną środowiskową, np. VITE_BASE=/klient/willa-pod-starym-debem/
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
