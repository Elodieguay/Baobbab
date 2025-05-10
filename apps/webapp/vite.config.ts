import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@baobbab/dtos': path.resolve(__dirname, '../../packages/dtos/src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
