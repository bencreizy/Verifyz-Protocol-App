
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { replit } from '@replit/vite-plugin-replit'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), replit()],
})
