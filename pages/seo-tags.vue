<template>
    <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
        <Style type="text/css">
            body {
                background: #eeeeee;
            }
        </Style>
    </Head>

    <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'custom',
    title: 'og-title text',
})

const title = ref<string>('SEO теги');
</script>