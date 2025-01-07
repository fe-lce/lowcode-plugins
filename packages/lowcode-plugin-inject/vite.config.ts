/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      dts({
        entryRoot: 'src/',
      }),
    ],
    define: {
      'process.env': {
        NODE_ENV: mode,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: '../../vitest.setup.ts',
    },
    build: {
      lib: {
        entry: './src/index.tsx',
        fileName: (format, entryName) => `${entryName}.${format}.js`,
        name: 'LowcodeEnginePluginInject',
        cssFileName: 'index',
      },
      rollupOptions: {
        output: {
          exports: 'named',
          globals: {
            react: 'React',
            moment: 'moment',
            lodash: '_',
            '@alifd/next': 'Next',
            '@felce/lowcode-engine': 'AliLowcodeEngine',
            '@felce/lowcode-utils': 'LowcodeEngineUtils',
          },
        },
        external: [
          'react',
          'moment',
          'lodash',
          '@alifd/next',
          '@felce/lowcode-engine',
          '@felce/lowcode-utils',
        ],
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
  };
});
