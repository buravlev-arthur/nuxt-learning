# Тестирование Nuxt-приложения

Тестирование в Nuxt находится в стадии разработки. Поддерживаются библиотеки `vitest` и `jest`.

```bash
# установка vitest
bun add --dev @nuxt/test-utils vitest
```

Тестовые модули определяются в `/tests`. Шаблон названия модулей: `<name>.test.ts`.

## Настройка контекста (setup)

В callback'е `describe()` необходимо определить `setup` с конфигурацией контекста тестирования:

```typescript
import  { describe } from 'vitest';
import { setup } from '@nuxt/test-utils';
import { fileURLToPath } from 'node:url';

describe('My test', async () => {
    // опции контекста тестов
    await setup({
        // путь к каталогу с Nuxt-приложением
        rootDir: fileURLToPath(new URL('..', import.meta.url)),
        // конфигурация Nuxt (nuxt.config.ts)
        configFile: 'nuxt.config',
        // время отведенное на выполнение setupTest (сборка, генерация файлов приложения и т.п.)
        setupTimeout: 6000,
        // нужно ли запускать сервер в тестах (для ответа на запросы)
        server: true,
        // порт тестового сервера (default по умолчанию)
        port: 8080,
        // нужно ли запускать отдельные сборки для сервера и клиента
        // false - если server или browser отключен (false)
        build: true,
        // если true, будет запущен брайзер и им можно будет управлять в последующих тестах
        // используется библиотека playwright
        browser: false,
        browserOptions: {
            // chromium, firefox or webkit
            type: 'firefox',
            launch: {
                // опции playwright для запуска браузера
            }
        },
        // Движок для тестирования (jest или vitest)
        runner: 'vitest',
    })
})
```

## API

### $fetch

Возвращает HTML страницы:

```typescript
it('Check text in html', async () => {
    const html = await $fetch('/test-post');
    expect(html).toMatch('text in html');
});
```

### fetch

Возвращает response запроса:

```typescript
it('Check Content-Type header', async () => {
    const response = await fetch('/');
    const html = await response.text();
    const contentType = response.headers.get('Content-Type');
    const status = response.status;
    expect(html).toMatch('<!DOCTYPE html>');
    expect(contentType).toMatch('text/html');
    expect(status).toEqual(200);
});
```

### url

Возвращает полный адрес страницы (вместе с портом, если он указан в `setup`):

```typescript
it('Check URL', async () => {
    const urlData = new URL(await url('/about'));
    expect(urlData.hostname).toEqual('127.0.0.1');
    expect(urlData.port).toEqual('8080');
    expect(urlData.pathname).toEqual('/about');
});
```


### Тестирование в браузере

В разработке.