# Стили

## Локальные стили

Локальные стили хранятся в `/assets`. Можно импортировать в любой конкретный компонент:

```typescript
<script lang="ts" setup>
import '~/assets/styles.css';
</script>
```

```css
@import url('~/assets/styles.css');
```

Или глобально подключить с помощью свойтва `css`:

```typescript
// nuxt.config.ts

//...
css: ['~/assets/styles.css'];
//...
```

Шрифты хранятся в `/public` (например, в `/public/fonts`) и подключаются в стилях:

```css
@font-face {
    src: url('/fonts/fontname.woff') format('woff');
}
```

### Импорт стилей, распространяемых через npm

Аналогично можно импортировать стили из npm-пакетов любым ранее продемонстрированным способом (например, `animate.css`):

Установка пакета:

```bash
bun i animate.css
```

Примеры подключения: 

```typescript
<script lang="ts" setup>
import 'animate.css';
</script>
```

```css
@import url('animate.css');
```

```typescript
// nuxt.config.ts

//...
css: ['animate.css'];
//...
```


## Внешние стили

Добавить глобально внешние стили (CDN-ссылку) можно с помощью объекта `app -> head -> link` в конфигурации Nuxt-проекта:

```typescript
export default defineNuxtConfig({
    app: {
        head: {
            link: [{
                rel: "stylesheet",
                href: "https://..."
            }]
        }
    }
});
```

Или динамически - в компоненте с помощью кампосабла `useHead`:

```typescript
<script setup lang="ts">
useHead({
    link: [{ ref: 'stylesheet', href: 'https://...' }]
});
</script>
```

Можно добавить внешние стили вручную, с помощью интерспеции генерируемого html в Nitro-плагине:

```typescript
// /server/plugins/global-styles-plugin.ts
export default defineNitroPlugin((nitro) => {
    nitro.hooks.hoot('render:html', (html, { event }) => {
        html.head.push('<link rel="stylesheet" href="https://...">');
    });
});
```

## Препроцессоры

В _Vite_ достаточно установить нужный препроцессор:

```bash
# пример установки препроцессора Sass
bun i -D sass
```

Sass-файлы и модули должны размещаться в директории `/assets`.

Импортировать можно как в конфируации:

```typescript
// nuxt.config.ts

// ...
css: ['~/assets/scss/styles.scss']
// ...
```

Так и в стилях `app.vue` или в шаблонах (layouts):

```typescript
<style lang="scss">
@use "~/assets/styles.scss";
</style>
```

Но при импорте в `app.vue`/_layouts_ не будут работать глобальные внедрения частей (описываются в следующем абзаце). Нужно импортировать самостоятельно.

Пример глобального внедрения частей/модулей в препроцессорный код (например, переменных), представлен в главе: [Импорт глобальных стилей](./assets.md#импорт-глобальных-стилей).

Приоретет импорта стилей: сначала из `nuxt.config.ts`, затем импорты в компонентах (в блоке `style`).


## Стили в Single File Components

Реактивные стили и классы можно определять прямо в шаблоне:

```html
<template>
    <!--class-->
    <div :class="someClass"></div>
    <div :class="{ active: isActive, logged: isLogged }"></div>
    <div :class="[isActive, { logged: isLogged }]"></div>

    <!--style-->
    <div :style="someStyles"></div>
    <div :style="{ fontSize: size + 'px', color: 'red' }"></div>
    <div :style="[styles, overridingStyles]"></div>
<template>
```

Можно динамически определять стили через "v-bind". Атрибут "scoped" позволяет определять стили только для текущей компоненты.

```typescript
<script setup lang="ts">
    const color = ref<string>('red');
</script>

<style scoped>
div {
    color: v-bind(color);
}
</style>
```

Есть поддержка CCS-модулей:

```html
<template>
    <div :class="$style.red"></div>
</template>

<style module>
.red {
    color: red;
}
</style>
```

Через атрибут "lang" поддерживаются различные препроцессоры: _sass_, _scss_, _less_, _stylus_:

```html
<style lang="sass">
/* ... */
</style>
```

## PostCSS

_PostCSS_ встроен в Nuxt. Поставляется с несколькими предустановленными плагинами. Может конфигурироваться в `nuxt.config.ts` и использоваться с `<style lang="postcss">` в SFC.

## Сторонние библиотеки

Для многих популярных решений (например, _Google Fonts_) существуют готовые модули для Nuxt. Остальные библиотеки можно использовать, создав плагин и/или модуль.

## Оптимизация

Для уменьшения показателя _CLS_ (максильное количество изменений макета) рекомендуется установить и подключить модуль [Fontaine](https://github.com/nuxt-modules/fontaine). 

Для улучшения показателя _LCP_ (время загрузки основного контента), нужно:

- Использовать CDN-ресуры для глобальных ресурсов;

- Для их транспортировки применять HTTP 2/3;

- Локально хранить ресурсы на том же домене (не на поддомене);

- Сжимать и минифицировать ассеты: [Brotli](https://github.com/google/brotli).

Если все стили встроены в Nuxt, можно с помощью хука "build:manifest" отключить загрузку всех внешних css, упомнутых в генерируемом HTML:

```typescript
// nuxt.config.ts

// ...
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
// ...
```
