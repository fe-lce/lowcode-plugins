import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';

export default defineConfig({
  plugins: [
    external({
      externals: {
        react: 'globalThis.React',
        '@felce/lowcode-engine': 'globalThis.AliLowCodeEngine',
      },
    }),
    React({}),
    dts(),
  ],
  server: {
    port: 4173,
    hmr: false,
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: 'src/index.ts',
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
      name: 'LowCodePluginCodeEditor',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          '@alifd/next': 'Next',
          '@felce/lowcode-engine': 'AliLowCodeEngine',
          'monaco-editor': 'MonacoEditor',
        },
      },
      external: [
        'react',
        '@alifd/next',
        'monaco-editor',
        '@felce/lowcode-engine',
      ],
    },
  },
});
