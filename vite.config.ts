import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  ssr: {
    noExternal: ['styled-components'], // Ensure styled-components is not excluded in SSR
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
