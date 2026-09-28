<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data: course, refresh } = await useFetch(() => `/api/courses/${slug.value}`)
const busy = ref('')

async function toggle(lessonId: string, completed: boolean) {
  busy.value = lessonId
  try {
    await $fetch('/api/progress', { method: 'POST', body: { lessonId, completed: !completed } })
    await refresh()
  } finally {
    busy.value = ''
  }
}
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div v-if="course" class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <NuxtLink to="/learn" class="text-sm text-zinc-500">All courses</NuxtLink>
        <h1 class="mt-4 font-display text-5xl font-semibold tracking-tight">{{ course.title }}</h1>
        <p class="mt-4 text-zinc-500 dark:text-zinc-400">{{ course.summary }}</p>
        <p v-if="!course.unlocked" class="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          This course stays locked until you have Premium or the Content Operating System.
          <NuxtLink to="/#pricing" class="font-semibold underline">See plans</NuxtLink>
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="lesson in course.lessons" :key="lesson.id" class="rounded-2xl bg-white p-4 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold">{{ lesson.title }}</p>
                <p class="mt-1 text-sm text-zinc-500">{{ lesson.summary }}</p>
                <p class="mt-2 text-xs text-zinc-400">{{ lesson.minutes }} min</p>
              </div>
              <button
                type="button"
                class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold disabled:opacity-50"
                :class="lesson.completed ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'"
                :disabled="!course.unlocked || busy === lesson.id"
                @click="toggle(lesson.id, lesson.completed)"
              >
                {{ lesson.completed ? 'Done' : 'Mark done' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="overflow-hidden rounded-[32px] bg-zinc-950 p-6 text-white">
        <p class="text-xs uppercase tracking-[0.16em] text-zinc-400">Protected playback</p>
        <div class="mt-4 grid aspect-video place-items-center rounded-3xl bg-gradient-to-br from-zinc-800 to-black">
          <div v-if="course.unlocked" class="text-center">
            <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-zinc-950">▶</span>
            <p class="mt-4 text-sm text-zinc-300">Stream slot ready for Bunny or Cloudflare Stream</p>
          </div>
          <p v-else class="px-6 text-center text-sm text-zinc-400">Playback stays closed until this course is entitled.</p>
        </div>
      </div>
    </div>
  </section>
</template>
