# Получение данных

В _Nuxt_ поддерживаются две компануемые компоненты (composables) и одна встроенная библиотека для асинхронного получения данных с сервера:

- `useFetch()`;

- `$fetch()`;

- `useAsyncData()`.

Компануемые компоненты `useFetch` и `useAsyncData` используются для правильной доставки данных с сервера при запросе в полезной нагрузке (payload). Payload используется для предотвращения дублирования/перенаправления запросов в браузере.

_Nuxt_ использует Vue-компоненту `<Suspense>` для блокировки навигации до тех пор, пока все асинхронные данные не станут доступны для просмотра. `useFetch` и `useAsyncData` позволяют управлять этим процессом.

## useFetch

```typescript
const { data: count } = await useFetch('/api/count');
```

## $fetch (ofetch library)

Не предотвращает дублирование/перенаправление запроса в браузере. Используется для передачи данных в обработчик событий, для запросов только на стороне клиента, или комбинированно с `useAsyncData`.

```typescript
const { data } = await $fetch('/api/count')
    .catch((err) => console.error(err.data));
```

## useAsyncData

`useAsyncData(url, () => $fetch(url))` равнозначно `useFetch(url)` - самый частый кейс.

**1 параметр** - уникальный ключ для кэширования результата запроса;
**2 параметр** - асинхронная функция, возвращающая ответ на запрос.

```typescript
// используем несколько запросов, объединяем и возвращаем результаты
const { data } = await useAsyncData('authAndCount', async () => {
    const [{ count }, { auth }] = await Promise.all([
        $fetch('/api/count'),
        $fetch('/api/auth'),
    ]);
    return { count, auth };
});
```

## Опции

`useFetch` и `useAsyncData` возвращают одинаковый объект и принимают одинаковый набор опций.

```typescript
// 
const  { pending, data, execute, refresh, status } = await useFetch(url, {
    // Не блокирует навигации при ожидании ответа
    // альтернатива: useLazyFetch, useLazyAsyncData
    lazy: true,

    // Выполнять запрос только на стороне клиента
    // при первом рендеринге также нужно отслеживать pending
    // вместе с lazy позволяет грузить данные, ненужные при первом рендеринге
    server: false,

    // выбрать только нужные поля и уменьшить нагрузку
    pick: ['title', 'createdAt'],

    // более детально определить структуру возвращаемого payload'а
    transform: (data) => data
        .map(({ title, createdAt }) => { title, createdAt })),

    // ключ для кэширования ответа
    // в useAsyncData ключ передаётся первым параметров
    // получить кэш можно с помощью useNuxtData(key)
    key: 'unique key',

    // не отправлять запрос сразу, а ждать дейсвтия пользователя
    // в таком случае нужно использовать status и execute
    // status может быть: `idle`, 'pending', 'error', 'success'
    immediate: false,


})

<template>
    <div v-if="status === 'idle'">
        <button @click="execudte">Отправить запрос</button>
    </div>
    <div v-else-if="pending">
        <p>Загружается...</p>
    </div>
    <div v-else>
        // выводим данные из ответа на запрос
    </div>
</template>
```

## Передача заголовков и Cookie

В режиме SSR, "внутри" сервера `$fetch` не отправляет Cookie из браузера и не передаёт Cookie сервера.

## Сериализация

По умолчанию ответы сервера (`/server`) сериализуются с помощью `JSON.stringify`, что приводит данные к приметивным типам (например, объект Date() к строке). 

С помощью метода `toJSON()` можно заставить Nuxt учитывать передаваемые типы:

```typescript
// /server/api/foo.ts

export default defineEventHandler((event) => {
    return {
        list: ['one', 'two', 'three'],
        createdAt: new Date(),
        toJSON() {
            return {
                year: this.createdAt.getFullYear(),
                month: this.createdAt.getMonth(),
                day: this.createdAt.getDate(),
            }
        }
    }
});
```

Также можно использовать альтернативные сериализаторы, например: `superjson`:

```typescript
// /server/api/foo.ts

import superjson from 'superjson';

export default defineEventHandler((event) => {
    const response = {
        createdAt: new Date(),
    };

    return superjson.stringify(response);
});
```

```typescript
// /pages/foo.vue

import superjson from 'superjson';

const { data } = await useFetch('/api/foo', {
    transform: (data) => {
        return superjson.parse(data);
    }
});
```

