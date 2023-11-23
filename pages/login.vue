<template>
    <p>login page</p>
    <h6>Данные авторизации:</h6>
    <!-- <p>Count: {{  data?.count }}</p> -->
    <p>Login: {{ data?.auth.user}}</p>
    <p>Password: {{ data?.auth.password }}</p>
    <p>Date: {{ data?.createdAt.toLocaleDateString() }}</p>
</template>

<script lang="ts" setup>
import superjson from 'superjson';
import type { Auth } from '~/types';

// useFetch с применением superjson
const { data } = await useFetch('/api/auth', {
    transform: (data): Auth => {
        return superjson.parse(data);
    }
});

// $fetch (ofetch library)
// const data = await $fetch('/api/auth')
//     .catch((err) => {
//         console.error(err);
//     });

// useAsyncData
// const { data } = await useAsyncData('authAndCount', async () => {
//     const [
//         { count },
//         { auth: { user, password } },
//     ] = await Promise.all([
//         $fetch('/api/count'),
//         $fetch('/api/auth'),
//     ]);

//     return {
//         count,
//         user,
//         password,
//     };
// });
</script>
