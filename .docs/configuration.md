# Конфигурация

## Установка и запуск

```bash
bunx nuxi@latest init project-name
cd project-name
bun run dev -o
```

## Конфигурация

`/nuxt.config.ts` - конфигурация Nuxt. Модуль экспортирует функцию: `defineNuxtConfig({...})` с объектом настроек проекта.

### Настройки окружения

```typescript
export default defineNuxtConfig({
    $production: {/*.. */},
    $development: {/*...*/},
    // конфигурация для окружения слоёв
    $meta: {/*...*/},
})
```

### Переменные окружения

Используются после сборки проекта. Не поддерживают: сложные типы JS, HMR. 

```typescript
export default defineNuxtConfig({
    runtimeConfig: {
        // доступна только на сервере
        privateKey: 'value',
        public: {
            // доступна также на клиенте
            publicKey: 'value',
        }
    }
})
```

```typescript
<script setup lang="ts">
// переменные доступны через кампосибл "useRuntimeConfig"
const runtimeVariables = useRuntimeConfig();
</script>
```

### Конфигурация переменных приложения

`/app.config.ts` - файл конфигурации приложения. Переменные приложения, в отличии от `runtimeConfig` не могут быть переопределены переменными окружения. Используются во время сборки проекта, поддерживают HMR и сложные типы JS.

```typescript
export default defineAppConfig({
    title: 'Project Name',
    theme: {
        color: '#4dss68',
        // ...
    }
})
```

```typescript
<script setup lang="ts">
// переменные доступны через кампосибл "useRuntimeConfig"
const appVariables = useAppConfig();
</script>
```

### Расширенная конфигурация

_Nuxt_ использует `nuxt.config.ts` как единственный источник, определяющий настройки приложения. Остальные инструменты необходимо конфигурировать в нём же с помощью соответствующих свойств:

`nitro: {...}` - Nitro;
`postcss: {...}` - PostCSS;
`vite: {...}` - Vite;
`webpack: {...}` - Webpack;

Для TypeScript, Vitest, TailwindCSS, ESLint, Stylelint, Prettier традиционно нужно использовать их собственные модули конфигурации.

## Vue-конфигурация

### Vite

```typescript
export default defineNuxtConfig({
    vite: {
        // для vitejs/plugin-vue
        vue: {/*...*/},
        // для vitejs/plugin-vue-jsx
        vueJsx: {/*...*/}
    },
})
```

### Webpack

```typescript
export default defineNuxtConfig({
    webpack: {
        loaders: {
            vue: {
                // доступные опции: https://github.com/vuejs/vue-loader/blob/main/src/index.ts#L32-L62
            }
        }
    }
})
```

### Эксперементальные опции Vue

```typescript
export default defineNuxtConfig({
    // независимо от сборщика
    vue: {/*...*/}
})
```
