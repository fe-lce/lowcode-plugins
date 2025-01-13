import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    // external({
    //   externals: {
    //     react: 'React',
    //   },
    // }),
    React({}),
    dts(),
    libInjectCss(),
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
      name: 'LowCodePluginUndoRedo',
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          '@alifd/next': 'Next',
          '@felce/lowcode-engine': 'AliLowCodeEngine',
        },
      },
      external: [
        'react',
        '@alifd/next',
        '@felce/lowcode-engine',
        '@felce/lowcode-types',
      ],
    },
  },
});
