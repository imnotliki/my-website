import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@theme/v3';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  define: {
    // 暂时先硬编码或者移除这个 API KEY 的动态加载，测试部署是否能过
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    hmr: true,
  },
});
