<template>
  <section id="features" class="scroll-mt-28 px-5 py-20">
    <div class="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <span class="inline-flex rounded-full bg-white px-3 py-1 text-sm text-zinc-600 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">
          Learning with structure
        </span>
        <h2 class="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl dark:text-white">
          A layout that keeps your day clear.
        </h2>
      </div>
      <p class="text-lg leading-8 text-zinc-500 dark:text-zinc-400">
        Abang AI Hub brings clarity to your routines with clean cards, realistic progress tracking, and guidance that adapts to your day.
      </p>
    </div>

    <div class="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-2">
      <article class="rounded-[32px] bg-[#ececef] p-6 sm:p-8 dark:bg-zinc-900">
        <h3 class="text-2xl font-semibold tracking-tight">Flexible access rules</h3>
        <p class="mt-3 max-w-md text-zinc-500 dark:text-zinc-400">
          Traditional course sites are too rigid. Miss a week and the whole shelf feels closed. Your files stay with the entitlement you already paid for.
        </p>
        <div class="mt-8 rounded-[28px] bg-white px-6 py-8 text-center shadow-sm dark:bg-zinc-950">
          <div class="text-5xl">🔥</div>
          <p class="mt-4 text-xl font-semibold">28 Day Streak Active</p>
          <p class="mt-1 text-sm text-zinc-500">Build honest streaks that reflect real lessons finished</p>
          <div class="mt-6 flex justify-center gap-3 text-xs">
            <div v-for="day in days" :key="day.label" class="grid justify-items-center gap-1">
              <span class="grid h-10 w-10 place-items-center rounded-full text-white" :class="day.className">{{ day.mark }}</span>
              <span class="text-zinc-400">{{ day.label }}</span>
            </div>
          </div>
        </div>
      </article>

      <article id="smart-assist" class="scroll-mt-28 overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-800 p-6 text-white sm:p-8">
        <h3 class="text-2xl font-semibold tracking-tight">Smart Daily Planner</h3>
        <p class="mt-3 max-w-md text-emerald-100/80">
          A simple view that shows only the habits that match your current time of day.
        </p>
        <div class="mt-8 rounded-[28px] bg-black/25 p-4 ring-1 ring-white/10 backdrop-blur">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-lg font-semibold">Good Morning!</p>
              <p class="text-sm text-emerald-100/70">Tuesday, 28 Sep</p>
            </div>
            <div class="text-right text-xs text-emerald-100/80">
              <span class="mr-2 rounded-full bg-black/30 px-2 py-1">15%</span>
              Completion
            </div>
          </div>
          <div class="mt-4 space-y-3">
            <div v-for="item in planner" :key="item.time" class="flex items-center justify-between rounded-2xl px-4 py-3" :class="item.className">
              <div class="flex items-center gap-3">
                <span class="text-xs text-white/70">{{ item.time }}</span>
                <span class="grid h-5 w-5 place-items-center rounded-full border border-white/40 text-[10px]">✓</span>
                <span class="text-sm font-medium">{{ item.title }}</span>
              </div>
              <span class="text-xs text-white/70">{{ item.meta }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const days = [
  { label: 'Mon', mark: '✈', className: 'bg-orange-500' },
  { label: 'Tue', mark: '13', className: 'bg-emerald-600' },
  { label: 'Wed', mark: '14', className: 'bg-emerald-600' },
  { label: 'Thu', mark: '15', className: 'bg-emerald-600' },
  { label: 'Fri', mark: '16', className: 'bg-emerald-600' },
  { label: 'Sat', mark: '17', className: 'bg-zinc-300 text-zinc-500' }
]

const planner = [
  { time: '07:30 AM', title: 'Morning outline', meta: '15 minutes', className: 'bg-emerald-600/90' },
  { time: '09:00 AM', title: 'Read one saved article', meta: 'Before 11:00 AM', className: 'bg-emerald-700/90' },
  { time: '08:15 PM', title: 'Finish one lesson', meta: 'Evening focus block', className: 'bg-zinc-950' }
]
</script>
