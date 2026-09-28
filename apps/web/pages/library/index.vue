<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { user } = useUserSession()
const { data: library, refresh } = await useFetch('/api/library')
useSeoMeta({ title: 'Library · Abang AI Hub' })
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-6xl">
      <p class="text-sm font-medium text-orange-600">Member library</p>
      <h1 class="mt-2 font-display text-5xl font-semibold tracking-tight">Hello, {{ user?.name?.split(' ')[0] }}</h1>
      <p class="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
        Downloads use a temporary signed link. Courses open only after the matching entitlement is paid.
      </p>

      <div class="mt-10 grid gap-5 lg:grid-cols-3">
        <article class="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <h2 class="text-lg font-semibold">Plans</h2>
          <p v-if="!library?.plans.length" class="mt-3 text-sm text-zinc-500">No paid plan yet.</p>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="plan in library?.plans" :key="plan.slug">{{ plan.name }}</li>
          </ul>
        </article>
        <article class="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 lg:col-span-2 dark:bg-zinc-900 dark:ring-white/10">
          <h2 class="text-lg font-semibold">Downloads</h2>
          <p v-if="!library?.downloads.length" class="mt-3 text-sm text-zinc-500">
            Buy a pack from the <NuxtLink to="/store" class="font-semibold text-zinc-950 dark:text-white">store</NuxtLink> to see it here.
          </p>
          <div v-else class="mt-4 grid gap-3 sm:grid-cols-2">
            <div v-for="file in library?.downloads" :key="file.slug" class="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
              <p class="font-medium">{{ file.name }}</p>
              <a :href="`/api/downloads/${file.slug}`" class="mt-3 inline-flex text-sm font-semibold text-orange-600">Download</a>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-5 grid gap-5 lg:grid-cols-2">
        <article class="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <h2 class="text-lg font-semibold">Saved articles</h2>
          <p v-if="!library?.saved.length" class="mt-3 text-sm text-zinc-500">Save an article and it will wait here.</p>
          <NuxtLink
            v-for="article in library?.saved"
            :key="article.slug"
            :to="`/articles/${article.slug}`"
            class="mt-3 block text-sm font-medium hover:underline"
          >
            {{ article.title }}
          </NuxtLink>
        </article>
        <article class="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Courses</h2>
            <button type="button" class="text-sm text-zinc-500" @click="refresh()">Refresh</button>
          </div>
          <NuxtLink
            v-for="course in library?.courses"
            :key="course.slug"
            :to="`/learn/${course.slug}`"
            class="mt-4 flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-950"
          >
            <span>
              <span class="block font-medium">{{ course.title }}</span>
              <span class="text-xs text-zinc-500">{{ course.completed }}/{{ course.lessons }} lessons</span>
            </span>
            <span class="text-xs font-semibold" :class="course.unlocked ? 'text-emerald-600' : 'text-zinc-400'">
              {{ course.unlocked ? 'Open' : 'Locked' }}
            </span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
