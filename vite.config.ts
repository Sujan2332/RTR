import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/reverse-traffic-racer/', 
  build: {
    outDir: 'dist',  // Make sure this is where you want to build your files
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
