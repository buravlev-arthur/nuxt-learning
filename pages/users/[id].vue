<template>
    <p>users page</p>
    <p>userId: {{ userId }}</p>
</template>

<script setup lang="ts">

definePageMeta({
    validate: async (route) => {
        return Number(route.params.id) === 0;
    },
})
const route = useRoute();

const userId = route.params.id;
</script>
