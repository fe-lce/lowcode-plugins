import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      // external({
      //   externals: {
      //     react: 'window.React',
      //     'react-dom': 'window.ReactDOM',
      //   },
      // }),
      react(),
      dts({
        entryRoot: 'src/',
      }),
      libInjectCss(),
    ],
    define: {
      'process.env': {
        NODE_ENV: mode,
      },
    },
    server: {
      port: 4173,
      hmr: false,
    },
    build: {
      cssCodeSplit: true,
      lib: {
        entry: './src/index.ts',
        fileName: (format, entryName) => `${entryName}.${format}.js`,
        name: 'LowcodeEnginePluginOutlinePane',
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
        external: ['react', '@alifd/next', '@felce/lowcode-utils'],
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
