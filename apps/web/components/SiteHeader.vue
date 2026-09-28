<script setup lang="ts">
const { isDark, toggle } = useTheme()
const { loggedIn, user, clear } = useUserSession()
const route = useRoute()
const belajarOpen = ref(false)
const mobileOpen = ref(false)

const links = [
  { label: 'Produk Digital', to: '/store' },
  { label: 'Artikel', to: '/articles' },
  { label: 'Percuma', to: '/articles/cara-guna-chatgpt-untuk-kerja' }
]

const belajar = [
  { label: 'Panduan permulaan', to: '/articles/cara-guna-chatgpt-untuk-kerja' },
  { label: 'Semua artikel', to: '/articles' },
  { label: 'Ruang belajar', to: '/learn' }
]

watch(() => route.fullPath, () => {
  belajarOpen.value = false
  mobileOpen.value = false
})

async function signOut() {
  mobileOpen.value = false
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <header class="fixed inset-x-0 top-4 z-50 px-3 sm:px-5">
    <div class="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2">
      <NuxtLink
        to="/"
        class="flex min-h-11 items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 shadow-float sm:pr-4 dark:bg-zinc-900 dark:ring-1 dark:ring-white/10"
      >
        <span class="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-[11px] font-bold text-white">AI</span>
        <span class="font-display text-sm font-semibold tracking-tight sm:text-[15px]">Abang AI</span>
      </NuxtLink>

      <nav class="hidden justify-self-center lg:block" aria-label="Utama">
        <div class="flex items-center gap-1 rounded-full bg-white px-2 py-1.5 shadow-float dark:bg-zinc-900 dark:ring-1 dark:ring-white/10">
          <div class="relative">
            <button
              type="button"
              class="flex min-h-11 items-center gap-1 rounded-full px-4 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              :aria-expanded="belajarOpen"
              @click="belajarOpen = !belajarOpen"
            >
              Belajar
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </button>
            <div
              v-if="belajarOpen"
              class="absolute left-0 top-12 w-56 rounded-2xl bg-white p-2 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
            >
              <NuxtLink
                v-for="item in belajar"
                :key="item.to"
                :to="item.to"
                class="block rounded-xl px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </nav>

      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-2xl bg-white text-zinc-900 shadow-float dark:bg-zinc-900 dark:text-zinc-100 dark:ring-1 dark:ring-white/10"
          :aria-label="isDark ? 'Tukar ke mod cerah' : 'Tukar ke mod gelap'"
          @click="toggle"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" d="M20 14.5A7.5 7.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
          </svg>
        </button>
        <NuxtLink
          to="/articles"
          class="grid h-11 w-11 place-items-center rounded-2xl bg-white text-zinc-900 shadow-float dark:bg-zinc-900 dark:text-zinc-100 dark:ring-1 dark:ring-white/10"
          aria-label="Cari artikel"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="6" />
            <path stroke-linecap="round" d="m20 20-3.5-3.5" />
          </svg>
        </NuxtLink>
        <NuxtLink
          v-if="!loggedIn"
          to="/auth/signin"
          class="hidden min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 shadow-float sm:inline-flex dark:bg-zinc-900 dark:text-white dark:ring-1 dark:ring-white/10"
        >
          Log Masuk
        </NuxtLink>
        <NuxtLink
          :to="loggedIn ? '/learn' : '/auth/signup'"
          class="hidden min-h-11 items-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white shadow-float sm:inline-flex"
        >
          {{ loggedIn ? (user?.name?.split(' ')[0] || 'Akaun') : 'Mula Belajar' }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-2xl bg-white text-zinc-900 shadow-float lg:hidden dark:bg-zinc-900 dark:text-zinc-100 dark:ring-1 dark:ring-white/10"
          :aria-expanded="mobileOpen"
          aria-label="Buka menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" d="M5 8h14M5 12h14M5 16h14" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="mx-auto mt-3 max-w-7xl rounded-3xl bg-white p-3 shadow-card dark:bg-zinc-900 dark:ring-1 dark:ring-white/10 lg:hidden"
    >
      <NuxtLink
        v-for="item in belajar"
        :key="item.to"
        :to="item.to"
        class="block min-h-11 rounded-2xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block min-h-11 rounded-2xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink
        v-if="!loggedIn"
        to="/auth/signin"
        class="block min-h-11 rounded-2xl px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Log Masuk
      </NuxtLink>
      <NuxtLink
        :to="loggedIn ? '/library' : '/auth/signup'"
        class="mt-1 block min-h-11 rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white"
      >
        {{ loggedIn ? 'Perpustakaan saya' : 'Mula Belajar' }}
      </NuxtLink>
      <button
        v-if="loggedIn"
        type="button"
        class="block min-h-11 w-full rounded-2xl px-4 py-3 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
        @click="signOut"
      >
        Log keluar
      </button>
    </div>
  </header>
</template>
