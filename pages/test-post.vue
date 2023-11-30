<script lang="ts" setup>
import type { AsyncData } from 'nuxt/app';
import type { FetchError } from 'ofetch';

interface Body { key: string };

const { data: { value: { body } }, error } = await useFetch('/api/test', {
    method: 'post',
    body: {
        key: 'value',
    }
}) as AsyncData<{ body: Body }, FetchError>;

console.log(body.key);
</script>

<template>
    <div>{{ body.key }}</div>
</template>
