# Обработка ошибок

_Nuxt 3_, как fullstack-фреймворк, может бросать ошибки в разных контекстах:

- Ошибки жизненного цикла Vue;

- Ошибки жизненного цикла Nitro (`/server`);

- Ошибки запуска сервера и клиента приложения;

- Ошибки загрузки JS-частей (chunks);

## Ошибки жизненного цикла Vue

Можно использовать Vue-hook `onErrorCaptured`, или основанный на нём Nuxt-hook `vue:error`. Также можно с помощью `vueApp.config.errorHandler` передавать данные обо всех Vue-ошибках (даже уже обработанных) в различные фреймворки логгирования:

```typescript
// /plugins/error-handler.ts

export default defineNuxtPlugin((nuxtApp) => {
    // обработка ошибок жизненного цикла Vue
    nuxtApp.hook('vue:error', (err, instance, info) => {
        console.error(`Vue error: ${err}, Instance: ${instance}, Info: ${info}`);
    });

    // передача информации о ошибках Vue в систему отчётов/логгирования
    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
        // логика фреймворка логгирования
    };
});
```

## Ошибки запуска (сервера и клиента)

Ошибки запуска ловит хук `app:error`, который включает в обработку:

- запуск Nuxt-плагинов (`/plugins`);

- обработку хуков `app:created` и `app:beforeMount`;

- SSR-рендеринг Vue в HTML;

- Монтирование приложения на стороне клиента (нужно обрабатывать с помощью хука `vue:error`);

- обработку хука `app:mounted`;

```typescript
// /plugins/error-handler.ts

export default defineNuxtPlugin((nuxtApp) => {
    // обработка ошибок запуска приложения
    nuxtApp.hook('app:error', (err) => {
        console.error(`Startup error: ${err}`);
    })
});
```

## Ошибки загрузки JS-chunks

Такие ошибки возникают при, например, потери соединения или инвалидации кэша chunk'ов (при пересборке приложения). _Nuxt_ обрабатывает такие ошибки автоматически путём жёсткой перезагрузки приложения. Но можно изменить поведение (`false` - отключить обработку, `manual` - определять плагин для обработки вручную):

```typescript
// nuxt.config.ts

export default defineNuxtConfig({
    experimental: {
        emitRouteChunkError: "manual",
    }
});
```

## Ошибки сервера Nitro

На данный момент никаким хуком обрабатываться не могут, но могут генерировать страницу ошибки.

## Страница ошибки

При возникновении нераспознанной ошибки или ошибки со статусом `fatal: true` (на клиенте), _Nuxt_ перенаправляет на страницу с информацией об ошибке, либо отдаёт соотвествующий JSON-ответ (если указан заголовок `Accept: application/json`).

Контексты возникновения ошибки на сервере: обработка Nitro-плагинов, рендеринг HTML, ошибки в API.

Контексты на стороне клиента: обработа Nuxt-плагинов, перед монтированием (хук `app:beforeMount`), при монтировании приложения (если ошибка не обрабатывается хуком `vue:error` или нативным `onErrorCaptured`) и после инициализации и монтирования в браузере (хук `app:mounted`);

Можно определить свою страницу ошибки в `/error.vue` с ошибкой, передаваемой в пропсу `error`:

```typescript
// /error.vue

const props = defineProps({
  error: Object
});
```

Доступные свойства объекта `error`: `statusCode`, `message`, `data`, `description`, `url`, `statusMessage`.

Все кастомные поля нужно помещать в свойство `data`. Рекомендуется для кастомных ошибок использовать компануемую компоненту `onErrorCaptured()` или хук `vue:error`, описанный выше.

```typescript
throw createError({
  data: {
    myCustomField: true
  },
  // другие поля
});
```

Также обязательно необходимо использовать плагин [clearError](#clearerror) после срабатывания ошибки, иначе плагины не будут перезапущены.

## Утилиты

### useError

Возвращает объект обрабатываемой ошибки:

```typescript
const error = useError();
```

### createError

Бросает ошибку с данными, переданными в объекте:

```typescript
throw createError({
    statusCode: 401,
    statusMessage: 'Not Authorized'
});
```

На стороне сервера `createError` перенаправит на страницу с ошибкой. На стороне клиента "бросит" нефатальную ошибку (если нужна фатальная, нужно добавить в объект ошибки: `fatal: true`).

### showError

Можно программно перенаправить на страницу ошибки из мидлвары, плагина или setup-функции (на стороне клиента и сервера):

```typescript
showError({
    statusCode: 401,
    message: 'not authorized',
})
```

Это более предпочтительный способ взамен `createError({ fatal: true })`.

### clearError

Очищает Nuxt-ошибку и перенаправляет по указанному маршруту:

```typescript
clearError({ redirect: '/' })
```

## \<NuxtErrorBoundary\>

Для вывода ошибок, возникающих прямо в теле шаблона (дочерних компонентах) на стороне клиента можно использовать компоненту `NuxtErrorBoundary`:

```html
<template>
    <NuxtErrorBoundary @error="logError">
        <ComponentWithError />
        <template #error="{ error }">
            <div>{{ error }}</div>
        </template>
    </NuxtErrorBoundary>
</template>

<script lang="ts" setup>
const logError = (err: unknown): void => {
    console.log('log error: ', err);
}
</script>
```

```html
<!-- /components/ComponentWithError.vue -->
<template>
    <p>Эта компонента вызовит ошибку</p>
</template>

<script setup lang="ts">
onMounted(() => {
    throw new Error('Error message');
});
</script>
```
