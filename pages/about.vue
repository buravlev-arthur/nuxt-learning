<script setup lang="ts">
definePageMeta({
    layout: "custom",
    layoutTransition: {
        name: 'rotate',
    },
})

const count = useCount();
</script>

<template>
    <div>
        <p>about page</p>
        <p>Counter: {{ count }}</p>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
    </div>
</template>
