# Маршруты

Файловая структура в `/pages` повторяет маршруты приложения:

- `/pages/about.vue`: `/about`;

- `/pages/users/[id].vue`: `/users/:id`;

- `/pages/index.vue`: `/`.

## Навигация по страницам

```html
<NuxtLink to="/about">About</NuxtLink>
```

Данные навигации можно получить с помощью кампосабла "useRoute":

```typescript
<script lang="ts" setup>
const route = useRoute();
const userId = route.params.id;
</script>
```

## Промежуточные компоненты (Middlewares)

Бывают трёх типов:

- анонимные (описаны прямо в коде страницы, где используются);

- именованные (расположены в `/middleware` и преобразуются из camelCase в kebab-case);

- глобальные (расположены в `/middleware` и имеют суффикс `.global`).

Пример:

```typescript
// /midleware/auth.ts

export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = () => true;
    if (!isAuthenticated()) {
        return navigateTo('/login');
    }
});
```

```typescript
// /pages/index.vue
<script lang="ts" setup>
definePageMeta({
    middleware: ['auth'],
});
</script>
```

## Валидация

```typescript
<script lang="ts">
definePageMeta({
    validate: async (route) => {
        // если id !== 0 - ошибка 404
        return Number(route.params.id) === 0;
    },
})
</script>
```