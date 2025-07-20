import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy-api': {
        target: 'https://kurs.resenje.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy-api/, '/api')
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
