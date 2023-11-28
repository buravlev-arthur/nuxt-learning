<script setup lang="ts">
const props = defineProps({
  error: Object
})

const error = useError();
console.log('error data: ', error);

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>{{ error?.statusCode }}</h2>
    <p>{{ error?.message }}</p>
    <button @click="handleError">Clear errors</button>
  </div>
</template>