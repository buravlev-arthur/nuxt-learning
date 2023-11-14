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
