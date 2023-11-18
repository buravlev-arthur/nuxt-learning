export default defineEventHandler((event) => {
    // логирование запроса
    console.log('New request: ', getRequestURL(event).pathname);
    // добавление данных в запрос
    event.context.auth = {
        user: 'admin',
        password: '123456',
    };
});
