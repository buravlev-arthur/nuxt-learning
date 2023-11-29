# Деплой приложения

Развертыать Nuxt-приложение можно как NodeJS-сервер, статический сайт (на хостинге) или в облачных и CDN окружениях.

## Запуск Node-сервера

```bash
# сборка проекта (nuxt build)
bun run build
# запуск сервера
HOST=127.0.0.1 PORT=8080 node .output/server/index.mjs
```

Доступные переменные окружения:

- `HOST` или `NITRO_HOST`;

- `PORT` или `NITRO_PORT`;

- `NITRO_SSL_CERT` и `NITRO_SSL_KEY` (нужны обе для запуска сервера через HTTPS-протокол. Рекомендуется использовать только для тестирования и отладки).

Для запуска через _pm2_ можно описать конфигурационный файл:

```javascript
// ecosystem.config.cjs

module.exports = {
    apps: [
        {
            name: 'TestNuxtApp',
            port: '8081',
            script: '.output/server/index.mjs',
            // распределяет приложения между всеми ядрами процессора
            instances: 'max',
            // позволяет распределить приложение между ядрами равномерно
            exec_mode: 'cluster'
        }
    ]
}
```

И запустить сервер:

```bash
pm2 start ecosystem.config.cjs
```

Сборка приложения в режиме распределения воркеров между ядрами процессора:

```bash
NITRO_PRESET=node_cluster bun run build
```

## Статический сайт

Существует два подхода:

1. Генерация полностью статического сайта (`ssr: true`) с помощью команды: `nuxt generate` (SSG);

2. Пререндер статического SPA (`ssr: false`). В HTML создаётся контейнер `<div id="_nuxt"></div>` где отрабатывает Vue. Для того, чтобы не терять SEO-контент, рекомендуется динамику клиента размещать в компоненте `<ClientOnly>`.

### SSG (Static Site Generation)

```bash
# генерация статического сайта (nuxt generate)
bun run generate
# локальный запуск
bunx serve .output/public
```

Nitro-crowler создаёт HTML в корневом маршруте (`/`), все нединамические страницы кладёт в `~/[page-name]`, все динамические (не `ssr: true`) - в `nitro.prerender.routes`. Генерирует `payload.json`. Находит в HTML все ссылки (`<a href="..."></a>`) и проделывает все шаги для страниц, указанных в этих ссылках.

Важно, чтобы на все страницы, которые нужно автоматически пререндерить, были ссылки.

C `nuxt generate` правила гибридного рендеринга `routeRules` (`nuxt.config.ts`) действовать не будут.

Генерацию можно конфигурировать:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      // просматриваеть ссылки (<a>) и рендерить их HTML также
      crawlLinks: true,
      // дополнительно рендерить эти страницы
      routes: ['/users/1', '/users/2', '/hello-from-server'],
      // не рендерить эти страницы
      ignore: ['/login'],
    }
  }
});
```

### CSR (Client Side Rendering)

Для сборки классического SPA можно указать `ssr: false`. Тогда с помощью `nuxt generate` будуют сгенерированы HTML с контейнерами `<div id="_nuxt"></div>` для вставки динамического Vue-контента.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false
})
```

## Предустановки (Presets)

_Nuxt 3_ имеет набор готовых пресетов для деплоя разного назначения.

Установка пресета при запуске сборки:

```bash
NITRO_PRESET=node-server bun run build
```

Установка пресета в `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'
  }
});
```

Список рекомендуемых хостингов для деплоя Nuxt-приложений с минимальной конфигураций (или Zero-конфигурацией): [здесь](https://nuxt.com/deploy).