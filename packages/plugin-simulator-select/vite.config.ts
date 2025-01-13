import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [React({}), dts(), libInjectCss()],
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
      name: 'LowCodePluginSimulatorSelect',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          '@alifd/next': 'Next',
        },
      },
      external: ['react', '@alifd/next', '@felce/lowcode-types'],
    },
  },
});
