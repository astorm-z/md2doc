import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 3001,
    open: false // 服务器环境不需要自动打开浏览器
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'markdown-it': ['markdown-it'],
          'katex': ['katex'],
          'highlight': ['highlight.js']
        }
      }
    }
  }
})
