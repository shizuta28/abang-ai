<script setup lang="ts">
const { data: courses } = await useFetch('/api/courses')
useSeoMeta({ title: 'Learning area · Abang AI Hub' })
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-4xl">
      <p class="text-sm font-medium text-orange-600">Learning area</p>
      <h1 class="mt-2 font-display text-5xl font-semibold tracking-tight">Lessons in progress</h1>
      <div class="mt-10 space-y-4">
        <NuxtLink
          v-for="course in courses"
          :key="course.slug"
          :to="`/learn/${course.slug}`"
          class="flex items-center justify-between rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
        >
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">{{ course.title }}</h2>
            <p class="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">{{ course.summary }}</p>
            <p class="mt-3 text-xs text-zinc-400">{{ course.lessonCount }} lessons · {{ course.minutes }} min</p>
          </div>
          <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="course.unlocked ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'">
            {{ course.unlocked ? 'Unlocked' : 'Locked' }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
