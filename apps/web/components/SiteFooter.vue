<script setup lang="ts">
const { loggedIn, clear } = useUserSession()

async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <footer class="border-t border-zinc-200/80 bg-white dark:border-white/10 dark:bg-zinc-950">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-display text-lg font-semibold">Abang AI Hub</p>
        <p class="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Artikel, produk digital dan kelas dalam satu akaun.
        </p>
      </div>
      <div>
        <p class="text-sm font-semibold">Terokai</p>
        <div class="mt-3 grid gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <NuxtLink to="/#topik" class="hover:text-zinc-950 dark:hover:text-white">Belajar</NuxtLink>
          <NuxtLink to="/store" class="hover:text-zinc-950 dark:hover:text-white">Produk Digital</NuxtLink>
          <NuxtLink to="/articles" class="hover:text-zinc-950 dark:hover:text-white">Artikel</NuxtLink>
          <NuxtLink to="/articles/cara-guna-chatgpt-untuk-kerja" class="hover:text-zinc-950 dark:hover:text-white">Percuma</NuxtLink>
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold">Ahli</p>
        <div class="mt-3 grid gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <NuxtLink to="/library" class="hover:text-zinc-950 dark:hover:text-white">Perpustakaan</NuxtLink>
          <NuxtLink to="/learn" class="hover:text-zinc-950 dark:hover:text-white">Ruang belajar</NuxtLink>
          <NuxtLink v-if="!loggedIn" to="/auth/signin" class="hover:text-zinc-950 dark:hover:text-white">Log Masuk</NuxtLink>
          <NuxtLink v-if="!loggedIn" to="/auth/signup" class="hover:text-zinc-950 dark:hover:text-white">Mula Belajar</NuxtLink>
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold">Akaun</p>
        <p class="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          Log masuk dengan Google bila kunci OAuth sudah diisi.
        </p>
        <button
          v-if="loggedIn"
          type="button"
          class="mt-4 text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-white"
          @click="signOut"
        >
          Log keluar
        </button>
      </div>
    </div>
    <p class="border-t border-zinc-200 px-5 py-5 text-center text-xs text-zinc-400 dark:border-white/10 dark:text-zinc-500">
      Abang AI Hub · Perpustakaan, kedai, dan ruang belajar
    </p>
  </footer>
</template>
