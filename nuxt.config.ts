// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // глобальное подключение стилей
  css: ['~/assets/styles.css', 'animate.css'],

  // глобальный импорт scss-модуля
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;',
        }
      }
    }
  },

  // глобальное подключение внешних стилей
  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
      }],
    },
  },
})
