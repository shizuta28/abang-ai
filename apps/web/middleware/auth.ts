export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo(`/auth/signin?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
