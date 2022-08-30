import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

// https://vitejs.dev/config/
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
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 代理
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'
    }
  }
});