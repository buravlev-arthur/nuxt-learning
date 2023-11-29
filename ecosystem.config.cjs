module.exports = {
    apps: [
        {
            name: 'TestNuxtApp',
            port: '8081',
            script: '.output/server/index.mjs',
            // распределяет приложения между всеми ядрами процессора
            instances: 'max',
            // позволяет распределить приложение между ядрами равномерно
            exec_mode: 'cluster'
        }
    ]
}