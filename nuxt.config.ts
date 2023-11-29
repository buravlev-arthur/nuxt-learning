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
      // SEO и meta-данные
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // titleTemplate: 'Название сайта | %s',
    },
    // Переходы между страницами
    pageTransition: { name: 'page', mode: 'out-in' },
    // Переходы между шаблонами
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // отключение внешних стилей (эксперементальное):
  hooks: {
    'build:manifest': (manifest) => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css;
      if (css) {
        for (let i = css.length - 1; i >= 0; i -= 1) {
          if (css[i].startsWith('entry')) css.splice(i, 1);
        }
      }
    }
  },

  // правила рендеринга
  routeRules: {
    '/about': { prerender: true },
    // '/api/*': { cache: { maxAge: 3600 }},
    '/old-page': { redirect: { to: '/login', statusCode: 302 }}, 
  },

  // эксперементальные опции
  experimental: {
    // включение нативных барузерных анимаций переходов
    viewTransition: true,
    // способ обработки ошибок JS-chunk'ов (automatic, manual, false)
    emitRouteChunkError: "automatic",
  },

  // настройки сервера
  nitro: {
    // установка пресета для сборки и деплоя
    preset: 'node-server',

    // селективный пререндеринг страниц
    prerender: {
      crawlLinks: true,
      routes: ['/users/1', '/users/2', '/hello-from-server'],
      ignore: ['/login'],
    }
  },
});
