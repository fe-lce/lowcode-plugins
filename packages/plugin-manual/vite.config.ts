import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';

export default defineConfig({
  plugins: [
    // external({
    //   externals: {
    //     react: 'React',
    //   },
    // }),
    React({}),
    dts(),
  ],
  server: {
    port: 4173,
    hmr: false,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      },
      name: 'LowCodePluginSchema',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
        },
      },
      external: ['react'],
    },
  },
});
