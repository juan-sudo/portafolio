import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Los intérpretes de Python y PHP se cargan desde un CDN dentro de workers con import()
  worker: { format: 'es' },
})
