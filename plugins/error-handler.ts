export default defineNuxtPlugin((nuxtApp) => {
    // обработка ошибок жизненного цикла Vue
    nuxtApp.hook('vue:error', (err, instance, info) => {
        console.error(`Vue error: ${err}, Instance: ${instance}, Info: ${info}`);
    });

    // передача информации о ошибках Vue в систему отчётов/логгирования
    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
        // логика фреймворка логгирования
    };

    // обработка ошибок запуска приложения
    nuxtApp.hook('app:error', (err) => {
        console.error(`Startup error: ${err}`);
    })
});
