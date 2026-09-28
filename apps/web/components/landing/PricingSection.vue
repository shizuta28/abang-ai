<script setup lang="ts">
import type { Product } from '~/types/catalog'

const props = defineProps<{
  plans: Product[]
}>()

const yearly = ref(false)
const ordered = computed(() => {
  const rank = ['plan-free', 'plan-pro', 'plan-premium']
  return [...props.plans].sort((a, b) => rank.indexOf(a.slug) - rank.indexOf(b.slug))
})

function monthlyLabel(plan: Product) {
  if (plan.price === 0) return 0
  if (yearly.value && plan.yearlyPrice) return Math.round(plan.yearlyPrice / 12)
  return plan.price
}

function href(plan: Product) {
  if (plan.price === 0) return '/auth/signup'
  const cycle = yearly.value ? 'yearly' : 'monthly'
  return `/checkout/${plan.slug}?cycle=${cycle}`
}

const badgeClass: Record<string, string> = {
  'plan-free': 'bg-cyan-500',
  'plan-pro': 'bg-emerald-500',
  'plan-premium': 'bg-orange-500'
}
</script>

<template>
  <section id="pricing" class="scroll-mt-28 px-5 py-20">
    <div class="mx-auto max-w-6xl text-center">
      <span class="inline-flex rounded-full bg-white px-3 py-1 text-sm text-zinc-500 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">
        Pricing plan
      </span>
      <h2 class="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl dark:text-white">
        Clear plans for everyone
      </h2>
      <div class="mt-8 inline-flex items-center gap-3 text-sm font-medium">
        <span :class="yearly ? 'text-zinc-400' : 'text-zinc-950 dark:text-white'">Monthly</span>
        <button
          type="button"
          class="relative h-7 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700"
          :aria-pressed="yearly"
          aria-label="Toggle yearly billing"
          @click="yearly = !yearly"
        >
          <span class="absolute top-1 h-5 w-5 rounded-full bg-zinc-950 transition dark:bg-white" :class="yearly ? 'left-6' : 'left-1'" />
        </button>
        <span :class="yearly ? 'text-zinc-950 dark:text-white' : 'text-zinc-400'">Yearly</span>
      </div>
    </div>

    <div class="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
      <article
        v-for="plan in ordered"
        :key="plan.slug"
        class="flex flex-col rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
      >
        <span class="w-fit rounded-lg px-2.5 py-1 text-xs font-semibold text-white" :class="badgeClass[plan.slug]">
          {{ plan.badge }}
        </span>
        <div v-if="plan.price > 0" class="mt-6">
          <p class="font-display text-5xl font-semibold tracking-tight">
            {{ formatRM(monthlyLabel(plan)) }}
            <span class="text-base font-medium text-zinc-400">/per month</span>
          </p>
          <p v-if="yearly && plan.yearlyPrice" class="mt-1 text-sm text-zinc-400">Billed {{ formatRM(plan.yearlyPrice) }} yearly</p>
        </div>
        <p class="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{{ plan.summary }}</p>
        <div class="my-5 h-px bg-zinc-200 dark:bg-white/10" />
        <ul class="space-y-3 text-sm">
          <li v-for="item in plan.includes" :key="item" class="flex items-start gap-2">
            <span class="mt-0.5 text-emerald-500">✓</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <NuxtLink
          :to="href(plan)"
          class="mt-8 inline-flex justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
        >
          Get started
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
