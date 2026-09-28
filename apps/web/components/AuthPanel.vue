<script setup lang="ts">
const props = defineProps<{
  mode: 'signin' | 'signup'
}>()

const route = useRoute()
const { data: status } = await useFetch('/api/auth/status')
const error = computed(() => route.query.error === 'google')

const title = computed(() => props.mode === 'signup' ? 'Create your account' : 'Welcome back')
const copy = computed(() => props.mode === 'signup'
  ? 'Sign up with Google to open your member library, saved articles, and courses.'
  : 'Sign in with the same Google account you used to join Abang AI Hub.')

const previewing = ref('')
const devPreview = import.meta.dev
const { fetch: refreshSession } = useUserSession()

function continueWithGoogle() {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/library'
  document.cookie = `abang_redirect=${encodeURIComponent(redirect)}; Path=/; Max-Age=600; SameSite=Lax`
  $fetch('/api/events', {
    method: 'POST',
    body: { name: 'signup_click', props: { mode: props.mode } }
  }).catch(() => {})
  window.location.href = '/auth/google'
}

async function preview(role: 'member' | 'admin') {
  previewing.value = role
  try {
    await $fetch('/api/auth/preview', { method: 'POST', body: { role } })
    await refreshSession()
    const redirect = typeof route.query.redirect === 'string'
      ? route.query.redirect
      : role === 'admin' ? '/admin' : '/library'
    await navigateTo(redirect)
  } finally {
    previewing.value = ''
  }
}
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10 lg:grid-cols-2">
      <div class="bg-[radial-gradient(ellipse_at_30%_20%,#fb923c,#9a3412_45%,#1c1917)] p-8 text-white sm:p-10">
        <p class="text-sm text-white/80">Abang AI Hub</p>
        <h1 class="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight">{{ title }}</h1>
        <p class="mt-4 text-sm leading-6 text-white/80">{{ copy }}</p>
        <ul class="mt-8 space-y-3 text-sm text-white/85">
          <li>One Google account for sign up and sign in</li>
          <li>Members open the library and learning area</li>
          <li>Admin email addresses land in the dashboard</li>
        </ul>
      </div>
      <div class="flex flex-col justify-center p-8 sm:p-10">
        <p v-if="error" class="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">
          Google could not finish that sign-in. Check the OAuth client and try again.
        </p>
        <button
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950"
          :disabled="!status?.google"
          @click="continueWithGoogle"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
            <path fill="currentColor" d="M12 11v3h5.2c-.2 1.3-1.6 3.8-5.2 3.8A6 6 0 1 1 12 6.2c1.7 0 2.8.7 3.4 1.3l2.3-2.2C16.4 3.8 14.4 3 12 3a9 9 0 1 0 0 18c5.2 0 8.6-3.6 8.6-8.7 0-.6 0-1-.1-1.3H12Z" />
          </svg>
          {{ mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google' }}
        </button>
        <p v-if="!status?.google" class="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Add <span class="font-medium text-zinc-800 dark:text-zinc-200">NUXT_OAUTH_GOOGLE_CLIENT_ID</span> and
          <span class="font-medium text-zinc-800 dark:text-zinc-200">NUXT_OAUTH_GOOGLE_CLIENT_SECRET</span>
          to <span class="font-medium">.env</span>, then restart. Redirect URI:
          <span class="break-all font-medium text-zinc-800 dark:text-zinc-200">http://localhost:3000/auth/google</span>
        </p>
        <div v-if="devPreview && !status?.google" class="mt-6 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
          <p class="text-sm font-medium">Local preview</p>
          <p class="mt-1 text-sm leading-6 text-zinc-500">Use this while Google keys are empty. It turns off once the OAuth client is set.</p>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              class="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-zinc-200 disabled:opacity-60 dark:bg-zinc-900 dark:ring-white/10"
              :disabled="previewing !== ''"
              @click="preview('member')"
            >
              {{ previewing === 'member' ? 'Opening…' : 'Preview member' }}
            </button>
            <button
              type="button"
              class="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-zinc-200 disabled:opacity-60 dark:bg-zinc-900 dark:ring-white/10"
              :disabled="previewing !== ''"
              @click="preview('admin')"
            >
              {{ previewing === 'admin' ? 'Opening…' : 'Preview admin' }}
            </button>
          </div>
        </div>
        <p class="mt-4 text-sm text-zinc-500">
          Admin access is the same Google sign-in. Put your email in
          <span class="font-medium text-zinc-800 dark:text-zinc-200">NUXT_ADMIN_EMAILS</span>.
        </p>
        <p class="mt-8 text-sm text-zinc-500">
          <template v-if="mode === 'signup'">
            Already have an account?
            <NuxtLink to="/auth/signin" class="font-semibold text-zinc-950 dark:text-white">Sign in</NuxtLink>
          </template>
          <template v-else>
            New here?
            <NuxtLink to="/auth/signup" class="font-semibold text-zinc-950 dark:text-white">Sign up</NuxtLink>
          </template>
        </p>
      </div>
    </div>
  </section>
</template>
