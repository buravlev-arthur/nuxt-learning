# Статические данные

## /public

Содержит данные, доступные из корня сервера (домена).

К файлу: `/public/imgs/logo.png` можно обратиться из кода:

```html
<img src="/imgs/logo.png" />
```

Или напрямую в строке браузера: `domain.name/imgs/logo.png`.

## /assets

Сборщики используют загрузчики (webpack) и плагины (vite) для обработки различных статических данных (таблицы стилей, изображения и т.п.) с целью их преобразования или кэширования.

Такие файлы в Nuxt принято хранить в директории `/assets`.

Файл `/assets/logo.png` будет доступен в коде:

```html
<img src="~/assets/logo.png" />
```

Но НЕ будет доступен глобально: `domain.name/assets/logo.png`. Для этого нужно использовать директорию `/public`.


## Импорт глобальных стилей

```typescript
// nuxt.config.ts

// ...
vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/_colors.scss" as *;',
      }
    }
  }
}
// ...
```

```scss
// /assets/_colors.scss
$text: #464632;
$bg: #e6f4f4;
```
