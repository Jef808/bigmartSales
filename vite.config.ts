import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Preview from 'vite-plugin-vue-component-preview';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    Preview(),
    Vue(),
  ],
  define: {
    'process.env': {
      BROWSER: 'chromium',
      NODE_ENV: 'development'
    }
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue'
    ],
  },
  server: {
    open: '/',
  },
})
