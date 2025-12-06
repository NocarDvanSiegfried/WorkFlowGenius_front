import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks для основных библиотек
          if (id.includes('node_modules')) {
            // React и React DOM
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'react-vendor'
            }
            // React Router
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor'
            }
            // Recharts - большая библиотека для графиков
            if (id.includes('recharts')) {
              return 'charts-vendor'
            }
            // Axios
            if (id.includes('axios')) {
              return 'axios-vendor'
            }
            // Zustand
            if (id.includes('zustand')) {
              return 'zustand-vendor'
            }
            // Остальные node_modules
            return 'vendor'
          }
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
  },
}) satisfies UserConfig

