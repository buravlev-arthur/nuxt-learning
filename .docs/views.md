# Представления

_Nuxt_ предоставляет несколько слоёв для построения интерфейса:

1. `app.vue` - входная точка для всех маршрутов приложения:

    ```html
    <template>
        <!-- контент -->
    </template>
    ```

2. Компоненты, расположенные в директории `/components`, могут переписпользоваться во множестве мест без необходимости явного импорта:
    ```html
    <!-- /components/TextField.vue -->
    <template>
        <p>
            <slot />
        </p>
    </template>
    ```

    ```html
    <!-- /app.vue -->
    <template>
        <TextField>
            Текст, который будет вставлен в слот
        </TextField>
    </template>
    ```

3. Страницы, распложенные в директории `/pages`. Если создана страница `/pages/index.vue`, тогда `/app.vue` можно удалить. Либо необходимо добавить в `/app.vue` роутер-компонент:

    ```html
    <!-- app.vue -->
    <template>
        <NuxtPage />
    </template>
    ```

    ```html
    <!-- /pages/about.vue -->
    <template>
        <p>About Page</p>
    </template>
    ```
    Маршруты совпадают с расположением и названием модулей в `/pages`. Для `/pages/about.vue` маршрутом будет: `/about`.

4. Шаблоны (layouts) расположенные в директории `/layouts`. По умолчанию используется: `/layouts/default.vue`.

    ```html
    <!-- app.vue -->
    <template>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </template>
    ```

    ```html
    <!-- /layouts/custom.vue -->
    <template>
        <div>
            <p>Custom layout</p>
            <slot />
        </div>
    </template>
    ```

    ```html
    <!-- /pages/page.vue -->
    <script lang="ts" setup>
    definePageMeta({
        layout: 'custom'
    })
    </script>
    <template>
        <!-- контент страницы -->
    </template>
    ```

## Модификация генерируемого html

Модифицировать ответ и генерируемый html можно с помощью добавления _плагина Nitro_, который регистрирует набор хуков, например: `render:html` и `render:response`: 

```typescript
// /server/plugins/extend-html.ts
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event}) => {
        // DOM генерируемого HTML
        console.log(html);
        // добавление контента в генерируемый HTML
        html.body.push('<span>Added by nitro\'s hook</span>');
    });

    nitroApp.hooks.hook('render:response', (response, { event}) => {
        // объект ответа сервера
        console.log(response);
    });
});
```
