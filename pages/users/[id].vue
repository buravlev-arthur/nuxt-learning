<template>
    <div id="container">
        <p>users page</p>
        <p>userId: {{ userId }}</p>
    </div>
</template>

<script setup lang="ts">
import type { TransitionProps } from 'vue';

definePageMeta({
    validate: async (route) => {
        return Number(route.params.id) === 0;
    },
    // переопределение pageTransition
    pageTransition: {
        name: 'rotate',
        onBeforeEnter: (el) => {
            console.log('before: ', el);
        },
        onEnter: (el, done) => {
            console.log('on enter: ', el);
            done();

        },
        onAfterEnter: (el) => {
            console.log('after: ', el);
        },
    },

    // динамическое изменение межстраничного перехода
    middleware(to, from) {
        const newTransitionName = to.params.transition as string;
        (to.meta.pageTransition as TransitionProps).name = newTransitionName ? newTransitionName : 'rotate';
    },
})
const route = useRoute();

const userId = route.params.id;
</script>
