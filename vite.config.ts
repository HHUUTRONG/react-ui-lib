import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwindpostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindpostcss,
        autoprefixer
      ]
    },
    devSourcemap: true, // Enable source maps in development
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyUILibrary',
      fileName: 'my-ui-library',
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'my-ui-library.css') {
            return 'style.css'; // Rename the main CSS file
          }
          return assetInfo.name || '';
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});