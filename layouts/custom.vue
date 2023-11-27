<template>
    <div class="custom-layout">
        <p>Custom layout</p>
        <slot />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();

useHead({
    meta: [
        { property: 'og:title', content: `Layout title - ${route.meta.title}` }
    ]
})
</script>

<style lang="scss">
@use "~/assets/styles.scss";
</style>