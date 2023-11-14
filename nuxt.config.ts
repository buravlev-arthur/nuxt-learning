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
  }
})
