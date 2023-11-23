import { useRequestHeaders } from 'nuxt/app';
import superjson from 'superjson';
import type { Auth } from '~/types';


export default defineEventHandler((event) => {
    console.log(event.headers);

    const response: Auth = {
        auth: event.context.auth,
        createdAt: new Date(),
    };

    return superjson.stringify(response);
});
