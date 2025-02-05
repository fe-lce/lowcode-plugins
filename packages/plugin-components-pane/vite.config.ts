import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    external({
      development: {
        externals: {
          react: 'React',
        },
      },
    }),
    React({}),
    dts(),
    libInjectCss(),
  ],
  server: {
    port: 4173,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
      name: 'LowCodePluginComponentsPane',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: ['react', '@alifd/next', '@felce/lowcode-types'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // https://cn.vitejs.dev/config/shared-options.html#css-preprocessoroptions
        api: 'legacy',
      },
    },
  },
});
