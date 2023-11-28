<template>
    <p>This component will throw error</p>
</template>

<script setup lang="ts">
onMounted(() => {
    throw new Error('Error message');
});
</script>