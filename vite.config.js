import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import restart from 'vite-plugin-restart'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl(),
    // restart({ restart: ['../static/**',] }), // Restart server on static file change
  ],
})
