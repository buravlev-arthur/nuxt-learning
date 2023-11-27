## Обновление до последних версий

Обновление до последний стабильной версии:

```bash
bunx nuxi upgrade
```

Обновление до ночного релиза:

В `package.json` заменить текущую версию `nuxt` на "npm:nuxt-nightly@latest".

```bash
# находясь в директории проекта
rm ./bun.lockb
bun install
```

Использование _nuxi_ ночного релиза:

```bash
bunx nuxi-nightly@latest [command]
```

## Отличия Nuxt2 и Nuxt3

В _Nuxt2_ по сравнению с _Nuxt3_ отсутствуют: Composition API, Vue 3 (в Nuxt2 - Vue 2), полная поддержка ESM, поддержка "из коробки" TypeScript, авто-импорты, поддержка `<script setup>`, Webpack 5 (в Nuxt2 - 4 версия), полная поддержка Vite, Nuxi CLI.

Для миграции с Nuxt2 на Nuxt3 предусмотрена промежуточная версия _Nuxt Bridge_, которая базируется на Nuxt2, но позволяет использовать все новшества Nuxt3.
