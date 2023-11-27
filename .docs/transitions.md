# Переходы

Переходы можно определять между страницами (`/pages`) и шаблонами (`/layouts`).

## Переходы между страницами 

Определить анимацию перехода можно глобально в `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    app: {
        // mode: default, out-in, in-out
        pageTransition: { name: 'blur', mode: 'out-in' }
    }
})
```

```css
/* app.vue */
.blur-enter-active,
.blur-leave-active {
  transition: all 0.4s;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
```

В `app.vue` можно определить стили перехода с другим именем (например, `rotate`):

```css
/* app.vue */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
```

И применить эту анимацию на отдельной странице/страницах:

```typescript
// /pages/page.vue

definePageMeta({
    pageTransition: {
        name: 'rotate'
    }
})
```

## Переходы между слоями

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    app: {
        layoutTransition: { name: 'layout', mode: 'out-in' }
    }
})
```

```css
/* app.vue */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
```

Точно также можно переопределить переход для отдельного шаблона:

```typescript
// /layouts/layout.vue
definePageMeta({
    layoutTransition: {
        name: 'rotate',
    },
})
```

## Отключение анимации переходов:

```typescript
definePageMeta({
    pageTransition: false,
    layoutTransition: false,
});
```

или глобально в `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
    app: {
        layoutTransition: false,
        pageTransition: false,
    }
})
```

## JavaScript-хуки переходов

```typescript
definePageMeta({
    pageTransition: {
        name: 'rotate',
        onBeforeEnter: (el) => {
            console.log('before: ', el);
        },
        onEnter: (el, done) => {
            console.log('on enter: ', el);
            done();
        },
        onAfterEnter: (el) => {
            console.log('after: ', el);
        },
        // множество других хуков...
    }
})
```


## Динамическое изменение анимации перехода

```typescript
definePageMeta({
    pageTransition: {
        name: 'default'
    },
    middleware(to, from) {
        const newTransitionName = to.params.transition;
        to.meta.pageTransition.name = newTransitionName ? newTransitionName : 'default';
})
```

## Определение переходов в NuxtPage

```html
<!-- app.vue -->
<!-- С помощью definePageMeta() на отдельных страницах переопределять нельзя -->
<NuxtPage :transition="{
  name: 'default',
  mode: 'out-in',
}" />
```

## View Transition API

Есть новый нативный браузерный способ организовать переходы между страницами без использованию Vue-компоненты `<Transition>`.

Опцию необходимо включить в `nuxt.config.ts`:

```typescript
experimental: {
  viewTransition: true,
}
```

И в  глобальной мидлваре `/middleware/disable-vue-transitions.global.ts` отключить Vue-реализацию переходов:

```typesccript
export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server || !document.startViewTransition) { return }
    to.meta.pageTransition = false;
    to.meta.layoutTransition = false;
});
```

У данной опции есть текущие проблемы и баги (в production-среде от неё лучше отказаться).