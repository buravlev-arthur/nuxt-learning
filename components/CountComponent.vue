<script lang="ts" setup>
const { data } = await useFetch('/api/count');
</script>

<template>
<div>Count: {{  data?.count }}</div>
</template>
