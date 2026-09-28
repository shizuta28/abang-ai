export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo(`/auth/signin?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  if (user.value?.role !== 'admin') {
    return navigateTo('/library')
  }
})
