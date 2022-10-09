const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/component',
        views: '@/views'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        resolvers: [
          IconsResolver({
            // enabledCollections: ['mdi']
          }),
          // Auto register Element Plus components
          // 自动导入nt Plus 组件
          ElementPlusResolver()
        ]
      }),
      Icons({
        scale: 1.2, // Scale of icons against 1em
        compiler: 'vue3', // 'vue2', 'vue3', 'jsx'
        autoInstall: true
      })
    ]
  }
})
