<script setup lang="ts">
withDefaults(defineProps<{
  screen?: 'overview' | 'stacks'
}>(), {
  screen: 'overview'
})
</script>

<template>
  <div class="w-[280px] rounded-[2.2rem] bg-zinc-950 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/10">
    <div class="overflow-hidden rounded-[1.8rem] bg-zinc-950 text-white">
      <div class="flex items-center justify-between px-5 pt-3 text-[11px] text-zinc-300">
        <span>19:02</span>
        <span class="flex gap-1">
          <span class="h-2 w-3 rounded-sm bg-zinc-300" />
          <span class="h-2 w-2 rounded-full bg-zinc-300" />
        </span>
      </div>

      <div v-if="screen === 'overview'" class="px-4 pb-5 pt-4">
        <p class="text-[15px] font-semibold">Weekly Overview</p>
        <p class="text-[11px] text-zinc-400">Your progress across the week</p>
        <div class="mt-4 flex items-end justify-between">
          <p class="text-sm font-medium">86% this week</p>
          <span class="rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300">Last week</span>
        </div>
        <svg viewBox="0 0 240 110" class="mt-2 h-28 w-full">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fb923c" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#fb923c" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M0 78 C20 70 30 40 48 48 C70 58 78 20 100 28 C122 36 130 62 150 50 C172 36 180 22 204 34 C220 42 230 58 240 52 L240 110 L0 110 Z" fill="url(#chartFill)" />
          <path d="M0 78 C20 70 30 40 48 48 C70 58 78 20 100 28 C122 36 130 62 150 50 C172 36 180 22 204 34 C220 42 230 58 240 52" fill="none" stroke="#fb923c" stroke-width="3" />
          <circle cx="132" cy="56" r="5" fill="#fff" />
        </svg>
        <div class="mt-1 flex justify-between px-1 text-[10px] text-zinc-500">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>

      <div v-else class="px-4 pb-4 pt-3">
        <div class="rounded-2xl bg-zinc-900 p-3">
          <p class="text-[13px] font-semibold">Weekly Overview</p>
          <p class="text-[10px] text-zinc-500">Your progress across the week</p>
          <svg viewBox="0 0 220 70" class="mt-2 h-16 w-full">
            <path d="M0 48 C18 44 28 20 46 30 C66 42 74 16 96 22 C118 28 126 46 146 36 C166 26 176 18 198 26 C208 30 214 40 220 36" fill="none" stroke="#fb923c" stroke-width="3" />
          </svg>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <div class="rounded-2xl bg-white px-3 py-3 text-zinc-950">
            <p class="font-display text-2xl font-semibold leading-none">12</p>
            <p class="mt-1 text-[10px] text-zinc-500">Streaks completed</p>
          </div>
          <div class="rounded-2xl bg-white px-3 py-3 text-zinc-950">
            <p class="font-display text-2xl font-semibold leading-none">07</p>
            <p class="mt-1 text-[10px] text-zinc-500">Focus sessions</p>
          </div>
        </div>
        <p class="mb-2 mt-4 text-xs font-medium text-zinc-300">Routine Stacks</p>
        <div class="grid grid-cols-3 gap-2 text-[10px]">
          <div class="rounded-2xl bg-emerald-200 p-2 text-emerald-950">
            <p class="font-semibold">Morning Start</p>
            <p class="mt-1 text-emerald-800">Read, outline</p>
          </div>
          <div class="rounded-2xl bg-violet-200 p-2 text-violet-950">
            <p class="font-semibold">Evening Reset</p>
            <p class="mt-1 text-violet-800">Review, save</p>
          </div>
          <div class="rounded-2xl bg-sky-200 p-2 text-sky-950">
            <p class="font-semibold">Focus</p>
            <p class="mt-1 text-sky-800">One lesson</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
