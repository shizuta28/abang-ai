<script setup lang="ts">
const route = useRoute()
const { loggedIn } = useUserSession()
const slug = computed(() => String(route.params.slug))
const { data: article, refresh } = await useFetch(() => `/api/articles/${slug.value}`)
const saving = ref(false)

useSeoMeta({
  title: () => article.value ? `${article.value.title} · Abang AI Hub` : 'Article'
})

async function toggleSave() {
  if (!loggedIn.value) {
    await navigateTo(`/auth/signin?redirect=/articles/${slug.value}`)
    return
  }
  saving.value = true
  try {
    await $fetch('/api/saved', { method: 'POST', body: { articleSlug: slug.value } })
    await refresh()
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  $fetch('/api/events', { method: 'POST', body: { name: 'article_read', props: { slug: slug.value } } }).catch(() => {})
})
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <article v-if="article" class="mx-auto max-w-2xl">
      <NuxtLink to="/articles" class="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white">All articles</NuxtLink>
      <p class="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">{{ article.category }} · {{ article.minutes }} min</p>
      <h1 class="mt-3 font-display text-5xl font-semibold tracking-tight">{{ article.title }}</h1>
      <p class="mt-4 text-lg text-zinc-500 dark:text-zinc-400">{{ article.excerpt }}</p>
      <div class="mt-8 space-y-5 text-base leading-8 text-zinc-700 dark:text-zinc-200">
        <p v-for="(paragraph, index) in article.body" :key="index">{{ paragraph }}</p>
      </div>
      <button
        type="button"
        class="mt-8 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-zinc-950"
        :disabled="saving"
        @click="toggleSave"
      >
        {{ article.saved ? 'Remove from library' : 'Save to library' }}
      </button>
    </article>
  </section>
</template>
