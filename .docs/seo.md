# SEO и мета-данные

## app.head

Нереактивные meta-данные для всего приложения указываются в `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            base: '',
            link: [],
            meta: [],
            style: [],
            script: [],
            noscript: [],
            htmlAttrs: {},
            bodyAttrs: {},
        }
    }
})
```

## useHead()

Компануемая компонента, позволяющая реактивно управлять мета-тегами в `head`. Определяется внутри `setup`-функции и в хуках.

```typescript
useHead({
    title: 'Title of the page',
    meta: [
        { name: 'description', content: 'text of description' },
    ],
    script: [
        { src: '/js/script.js' },
        { innerHTML: 'console.log(\'test\')' }
    ],
    bodyAttrs: {
        class: 'dark small',
    }
})
```

## useSeoMeta()

Позволяет в виде одного объекта определить все seo-данные:

```typescript
useSeoMeta({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: '',
    // ... и так далее
})
```

## Компоненты-теги

В _Nuxt_ есть набор компонент, повторяющих нативные HTML-теги: `<Head>`, `<Body>`, `<Link>`, `<Style>`, `<Title>`, `<Meta>`, `<Html>`, `<NoScript>`, `<Base>`.

## Шаблон заголовка

В `nuxt.config.ts`, или в `useHead()` можно определить `titleTemplate` (строка с `%s` или функция) для, например, добавления названия сайта к названиям страниц.

```typescript
// nuxt.config.ts

export default defineNuxtConfig({
    app: {
        head: {
            // %s будет заменено на значение "title" страницы
            titleTemplate: 'Название сайта | %s',
        }
    }
});
```

```typescript
// app.vue

useHead({
    title: 'Название страницы',
    titleTemplate: (titleOfPage) => {
        return titleOfPage ? `Название сайта | ${titleOfPage}` : `Название сайта`;
    }
})
```

## Позиция тега

Теги вроде `<script>` можно размещать в `<head>`, в начале `<body>` и в конце:

```typescript
useHead({
    script: [
        // доступные значения tagPosition: head, bodyOpen, bodyClose
        { src='/js/script.js', tagPosition: 'bodyClose' }
    ]
})
```

## definePageMeta

Внутри `/pages` можно использовать `definePageMeta()` совместно с `useHead()`:

```typescript
// /pages/page.vue

definePageMeta({
    layout: 'layout',
    title: 'Заголовок для OpenGraph разметки',
})
```

```typescript
// /layouts/layout.vue
const ruote = useRoute();
defineHead({
    meta: [{ property: 'og:title', content: `Шаблон Layout - ${route.meta.title}` }]
})
```

## Внешние скрипты и стили

Рекомендуется помимо самого скрипта/таблицы стилей предварительно устанавливать подключение к домену:

```typescript
useHead({
    link: [
        { rel: 'preconnect', href: 'https://domain.com' },
        { rel: 'stylesheet', href: 'https://domain.com/cdn/style.css' }
    ]
});
```



