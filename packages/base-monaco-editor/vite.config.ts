import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [React({}), dts(), libInjectCss()],
  build: {
    cssCodeSplit: true,
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
        globals: {
          react: 'React',
          lodash: '_',
          'monaco-editor': 'MonacoEditor',
        },
      },
      external: ['react', 'lodash', 'monaco-editor'],
    },
  },
});
