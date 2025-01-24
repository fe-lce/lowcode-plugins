import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';

export default defineConfig({
  plugins: [
    React({}),
    dts(),
    external({
      development: {
        externals: {
          react: 'globalThis.React',
        },
      },
    }),
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
      name: 'LowCodePluginSetRefProp',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          '@felce/lowcode-engine': 'AliLowCodeEngine',
        },
      },
      external: ['react', '@felce/lowcode-engine'],
    },
  },
});
