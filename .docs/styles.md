# Стили

## Локальные

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
