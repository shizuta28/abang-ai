<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const orderId = computed(() => String(route.query.order || ''))
const { data: orders } = await useFetch('/api/orders')
const order = computed(() => orders.value?.find((item) => item.id === orderId.value))
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-lg rounded-[28px] bg-white p-8 text-center shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
      <p class="text-sm font-semibold text-emerald-600">Payment received</p>
      <h1 class="mt-3 font-display text-4xl font-semibold">Your library is open</h1>
      <p v-if="order" class="mt-3 text-sm text-zinc-500">
        {{ order.productName }} · {{ formatRM(order.amount) }} · {{ order.status }}
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <NuxtLink to="/library" class="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Open library</NuxtLink>
        <NuxtLink to="/learn" class="rounded-full px-5 py-3 text-sm font-semibold ring-1 ring-zinc-200 dark:ring-white/15">Go to lessons</NuxtLink>
      </div>
    </div>
  </section>
</template>
