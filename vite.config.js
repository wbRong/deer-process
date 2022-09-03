import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from "vite-plugin-compression";
import path from 'path'

// https://cn.vitejs.dev/config/
export default defineConfig({
  //配置插件
  plugins: [
    vue(),
    AutoImport({
      //自动导入vue和vue-router相关函数
      imports: ['vue', 'vue-router',],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: "modules",
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: "5566",
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'
    }
  }
});