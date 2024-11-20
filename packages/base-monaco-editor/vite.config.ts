import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'ES2018',
    lib: {
      entry: './src/index.tsx',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        exports: 'named'
      },
      external: [],
    },
  },
  plugins: [
    React({ jsxRuntime: 'classic' }),
    dts()
  ],
});
