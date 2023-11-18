interface Auth {
    auth: {
        user: string;
        password: string;
    }
};

export default defineEventHandler((event) => {
    const response: Auth = {
        auth: event.context.auth
    };
    return response;
});
