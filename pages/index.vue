<script setup lang="ts">
useHead({
    script: [
        { src: '/js/script.js' },
        { innerHTML: 'console.log(\'test\')', tagPosition: 'bodyOpen' }
    ],
    bodyAttrs: {
        class: 'dark small',
    },
})

useSeoMeta({
    title: 'Главная страница',
    description: 'Описание страницы',
    keywords: 'главная, страница, информация',
})

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
        <CountComponent />
    </div>
</template>

<style lang="scss">
#container {
    background-color: $bg;
    color: $text;
}
</style>