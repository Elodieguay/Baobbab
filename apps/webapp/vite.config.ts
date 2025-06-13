/// <reference types="vitest" />

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
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: ['tests/tests-e2e/**', 'node_modules', 'dist'],
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
