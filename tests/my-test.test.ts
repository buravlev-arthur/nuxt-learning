import { fileURLToPath } from 'node:url';
import  { describe, it, expect } from 'vitest';
import { setup, $fetch, fetch, url, isDev } from '@nuxt/test-utils';

describe('Tests', async () => {
    // опции контекста тестов
    await setup({
        // путь к каталогу с Nuxt-приложением
        rootDir: fileURLToPath(new URL('..', import.meta.url)),
        // конфигурация Nuxt (nuxt.config.ts)
        configFile: 'nuxt.config',
        // время отведенное на выполнение setupTest (сборка, генерация файлов приложения и т.п.)
        setupTimeout: 30000,
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

    it('Check POST response', async () => {
        const html = await $fetch('/test-post');
        expect(html).toMatch('value');
    });

    it('Check Content-Type header', async () => {
        const response = await fetch('/');
        const html = await response.text();
        const contentType = response.headers.get('Content-Type');
        expect(html).toMatch('<!DOCTYPE html>');
        expect(contentType).toMatch('text/html');
    });

    it('Check response status', async () => {
        const { status } = await fetch('/');
        expect(status).toEqual(200);
    });

    it('Check URL', async () => {
        const urlData = new URL(await url('/about'));
        expect(urlData.hostname).toEqual('127.0.0.1');
        expect(urlData.port).toEqual('8080');
        expect(urlData.pathname).toEqual('/about');
    });
});
