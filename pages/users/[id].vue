<template>
    <div>
        <div id="container">
            <p>users page</p>
            <p>userId: {{ userId }}</p>
        </div>
        <NuxtErrorBoundary @error="logError">
            <ComponentWithError />
            <template #error="{ error }">
                <div>{{ error }}</div>
            </template>
        </NuxtErrorBoundary>
    </div>
</template>

<script setup lang="ts">
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
        if (to.meta.pageTransition && !(typeof to.meta.pageTransition === 'boolean') && 'name' in to.meta.pageTransition) {
            to.meta.pageTransition.name = newTransitionName ? newTransitionName : 'rotate';
        }
    },
})

const route = useRoute();

const userId = route.params.id;

const logError = (error: unknown) => {
    console.log('log error: ', error);
};

const toShowError = () => {
    showError({
        statusCode: 401,
        message: 'not authorized',
    });
};

</script>
