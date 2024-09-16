import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [react(), compression({ algorithm: 'gzip' }), compression({ algorithm: 'brotliCompress', ext: '.br' })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) {
            const module = id.split('node_modules/').pop().split('/')[0];
            return `vendor-${module}`;
          }
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@api', replacement: '/src/api' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@', replacement: '/src' },
    ],
  },
  define: { global: 'window' },
});
