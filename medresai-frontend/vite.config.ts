import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    // Generate .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
    emptyOutDir: true
  }
})
