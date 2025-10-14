import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueDevTools from 'vite-plugin-vue-devtools'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export const processPath = {
  main: resolve('src/main'),
  preload: resolve('src/preload'),
  renderer: resolve('src/renderer')
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(processPath.renderer, 'src'),
        '@components': resolve(processPath.renderer, 'src/components'),
        '@assets': resolve(processPath.renderer, 'src/assets')
      }
    },
    plugins: [
      vueRouter({
        routesFolder: [
          {
            src: resolve(processPath.renderer, 'src/pages')
          }
        ],
        dts: resolve(processPath.renderer, 'src/types/typed-router.d.ts')
      }),
      vueDevTools(),
      vue(),
      AutoImport({
        dts: 'src/types/auto-imports.d.ts',
        imports: ['vue', VueRouterAutoImports, 'pinia']
      }),
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
            resolveIcons: true
          })
        ]
      })
    ]
  }
})
