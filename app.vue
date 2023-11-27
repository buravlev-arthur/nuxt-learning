<template>
  <div>
    <h1>app.vue</h1>
    <TextField>
      Текст, переданный в slot компонента
    </TextField>
  </div>
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'layout',
      mode: 'out-in',
    }" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleOfPage) => {
    return titleOfPage ? `Название сайта | ${titleOfPage}` : `Название сайта`;
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
