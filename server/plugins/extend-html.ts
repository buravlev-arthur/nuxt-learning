export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event}) => {
        // DOM генерируемого HTML
        // console.log(html);
        // добавление контента в генерируемый HTML
        html.body.push('<span>Added by nitro\'s hook</span>');
    });

    nitroApp.hooks.hook('render:response', (response, { event}) => {
        // объект ответа сервера
        // console.log(response);
    });
});
