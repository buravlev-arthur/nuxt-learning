<script setup lang="ts">
definePageMeta({
    layout: "custom",
    layoutTransition: {
        name: 'rotate',
    },
})
</script>

<template>
    <div>
        <p>about page</p>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
    </div>
</template>
