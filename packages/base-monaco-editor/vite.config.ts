import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [React({}), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
      name: 'LowCodePluginBaseMonacoEditor',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: [],
    },
  },
});
