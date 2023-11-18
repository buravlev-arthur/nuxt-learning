# Сервер

_Nitro_ - cерверный Nuxt-фреймворк позволяет разрабатывать fullstack-приложения, которые взаимодействуют с базами данных, другими серверами, предоставляют API и статический контент (RSS-ленты, Sitemap'ы и т.п.).

Внутри себя использует фреймворк _h3_. Позволяет разрабатывать изоморфные приложения, осуществлять гибридный рендеринг и т.д.

## Эндпоинты и промежуточные компоненты (middlewares)

Пример API: 

```typescript
// /server/api/count.ts

export default defineEventHandler(async (event) => {
    return {
        count: 10,
    };
});
```

```typescript
// /components/CountComponent.vue

<script lang="ts" setup>
const { data: count } = await useFetch('/api/count');
</script>

<template>
<div>Count: {{ count }}</div>
</template>
```

Сервер может отдавать текст, json, html и steam. Также поддерживает HMR и автоимпорты.

## Универсальное развертывание

_Nitro_ можно деплоить как на облочные провайдеры (Versel, Clouedflare) для которых есть готовые пресеты, так и на других runtime-машинах: Bun, Deno.

## Гибридный рендеринг

В `nuxt.config.ts` можно с помощью объекта `routeRules` можно гибко определить правила рендеринга буквально для каждой страницы приложения:

```typescript
// nuxt.config.ts

routeRules: {
    // статичная сгенерированная страница
    '/about': { prerender: true },
    // кэширование на 1 час
    '/api/*': { cache: { maxAge: 3600 }},
    // редирект на другую страницу
    '/old-page': { redirect: { to: '/login', statusCode: 302 }}, 
}
```

Некоторые правила маршрутизации специфичны для Nuxt, например: `ssr` или `experimentalNoScripts`. Правила вроде `prerender` и `redirect` оказывают эффект на поведение клиента. _Nitro_ одинаково хорошо применяется как для SSR, так и для пререндеринга страниц.


