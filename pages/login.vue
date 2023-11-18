<template>
    <p>login page</p>
    <h6>Данные авторизации:</h6>
    <p>Login: {{ data?.auth.user }}</p>
    <p>Password: {{ data?.auth.password }}</p>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/auth');
</script>
