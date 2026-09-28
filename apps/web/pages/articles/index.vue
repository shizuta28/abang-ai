<script setup lang="ts">
const { data: articles } = await useFetch('/api/articles')
useSeoMeta({ title: 'Articles · Abang AI Hub' })
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-3xl">
      <p class="text-sm font-medium text-orange-600">Articles</p>
      <h1 class="mt-2 font-display text-5xl font-semibold tracking-tight">Notes from the hub</h1>
      <div class="mt-10 space-y-4">
        <NuxtLink
          v-for="article in articles"
          :key="article.slug"
          :to="`/articles/${article.slug}`"
          class="block rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 transition hover:-translate-y-0.5 dark:bg-zinc-900 dark:ring-white/10"
        >
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">{{ article.category }} · {{ article.minutes }} min</p>
          <h2 class="mt-2 text-2xl font-semibold tracking-tight">{{ article.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{{ article.excerpt }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
