export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = () => true;
    if (!isAuthenticated()) {
        return navigateTo('/login');
    }
});
