import { fileURLToPath, URL } from 'node:url'
export default {
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],

  dir: {
    layouts: './src/layouts',
    pages: './src/pages',
    middleware: './src/middlewares',
    plugins: './src/plugins',
  },
  components: [
    '@/components',
    { path: '@/components/core', extensions: ['vue'] }
  ],
    css: ['@/assets/css/main.scss'],
  alias: {
    '@': './src'
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
  vue: {
    compilerOptions: {
        isCustomElement: (tag: any) => tag === 'iconify-icon',
    },
},
}
