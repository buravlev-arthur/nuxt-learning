<template>
  <div>
    <h1>app.vue</h1>
    <TextField>
      Текст, переданный в slot компонента
    </TextField>
  </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleOfPage) => {
    return titleOfPage ? `Название сайта | ${titleOfPage}` : `Название сайта`;
  }
})
</script>
