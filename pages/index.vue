<script setup lang="ts">
definePageMeta({
    layout: "default",
    middleware: ['auth'],
})
</script>

<template>
    <div id="container">
        <p>main page</p>
        <h4>Статика, загруженная из /public:</h4>
        <img width="80" src="/imgs/logo.png" alt="logo of nuxt" />
        <h4>Статика, загруженная и обработнная сборщиком из /asset:</h4>
        <img width="80" src="~/assets/logo.png" alt="logo of nuxt" />
    </div>
</template>

<style lang="scss">
#container {
    background-color: $bg;
    color: $text;
}
</style>