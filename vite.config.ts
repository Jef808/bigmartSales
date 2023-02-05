import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Preview from 'vite-plugin-vue-component-preview';
import { fileURLToPath, URL } from 'node:url';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    Preview(),
    vue(),
  ],
  define: {
    'process.env': {
      BROWSER: 'chromium',
      NODE_ENV: 'development'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
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
