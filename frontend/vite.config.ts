import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './', // or "/" depending on your routing
  build: {
    outDir: 'dist', // Make sure this is what Azure is serving
  },
  plugins: [react()],
  server: {
    port: 3016,
  },
});
